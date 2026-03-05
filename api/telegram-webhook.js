import { CONFIG, validateRuntimeConfig } from './_lib/config.js';
import {
  encodeBytesToBase64,
  encodeUtf8ToBase64,
  readJsonFile,
  readRepoFile,
  upsertRepoFile,
} from './_lib/github.js';
import { getTelegramFile, sendTelegramMessage } from './_lib/telegram.js';

const EMPTY_STATE = {
  sessions: {},
  drafts: [],
};

const SECTION_OPTIONS = [
  { key: 'coffee', titleRu: 'Кофе' },
  { key: 'breakfast', titleRu: 'Завтраки' },
  { key: 'serving', titleRu: 'Новая подача' },
  { key: 'news', titleRu: 'Новинки' },
  { key: 'decaf', titleRu: 'Без кофеина' },
  { key: 'bakery', titleRu: 'Выпечка' },
  { key: 'dessert', titleRu: 'Десерты' },
];

const MAIN_KEYBOARD = {
  keyboard: [
    [{ text: '/new' }, { text: '/drafts' }],
    [{ text: '/cancel' }],
  ],
  resize_keyboard: true,
};

const SECTION_KEYBOARD = {
  keyboard: [
    [{ text: 'Кофе' }, { text: 'Завтраки' }],
    [{ text: 'Новая подача' }, { text: 'Новинки' }],
    [{ text: 'Без кофеина' }, { text: 'Выпечка' }],
    [{ text: 'Десерты' }],
  ],
  resize_keyboard: true,
  one_time_keyboard: true,
};

const toNumber = (value) => {
  const cleaned = String(value || '').replace(/\s+/g, '').replace(/,/g, '.').replace(/[^0-9.]/g, '');
  if (!cleaned) return null;
  const number = Number(cleaned);
  if (!Number.isFinite(number) || number <= 0) return null;
  return Math.round(number);
};

const nowIso = () => new Date().toISOString();

const createDraftId = () => {
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `d-${Date.now()}-${random}`;
};

const normalize = (value) => String(value || '').trim().toLowerCase();

const escapeHtml = (value) => {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const detectSection = (rawInput) => {
  const input = normalize(rawInput);
  if (!input) return null;

  const direct = SECTION_OPTIONS.find((option) => option.key === input);
  if (direct) return direct;

  return SECTION_OPTIONS.find((option) => normalize(option.titleRu) === input) || null;
};

const formatDraftLine = (draft) => {
  const section = draft.sectionTitle || draft.category;
  return `• <b>${escapeHtml(draft.id)}</b> | ${escapeHtml(draft.nameRu)} | ${escapeHtml(draft.price)} сум | ${escapeHtml(section)}`;
};

const loadState = async () => {
  const { value, sha } = await readJsonFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: CONFIG.botStatePath,
    branch: CONFIG.githubDraftBranch,
    fallbackValue: EMPTY_STATE,
  });

  return {
    state: {
      sessions: value?.sessions && typeof value.sessions === 'object' ? value.sessions : {},
      drafts: Array.isArray(value?.drafts) ? value.drafts : [],
    },
    sha,
  };
};

const saveState = async (state, sha, commitMessage) => {
  const serialized = `${JSON.stringify(state, null, 2)}\n`;

  await upsertRepoFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: CONFIG.botStatePath,
    branch: CONFIG.githubDraftBranch,
    message: commitMessage,
    contentBase64: encodeUtf8ToBase64(serialized),
    sha,
  });

  const updated = await readRepoFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: CONFIG.botStatePath,
    branch: CONFIG.githubDraftBranch,
  });

  return updated?.sha;
};

const extractBestPhotoFileId = (message) => {
  const photos = message?.photo;
  if (!Array.isArray(photos) || photos.length === 0) return null;
  return photos[photos.length - 1]?.file_id || null;
};

const getExtension = (filePath) => {
  const match = String(filePath || '').match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : 'jpg';
};

const transcriptVoice = async (voiceFileId) => {
  if (!CONFIG.openaiApiKey) return null;

  const voiceFile = await getTelegramFile(CONFIG.telegramBotToken, voiceFileId);
  const ext = getExtension(voiceFile.filePath);

  const formData = new FormData();
  formData.append('model', CONFIG.openaiTranscriptionModel);
  formData.append('file', new Blob([voiceFile.bytes], { type: 'audio/ogg' }), `voice.${ext}`);

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CONFIG.openaiApiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OpenAI transcription failed (${response.status})`);
  }

  const data = await response.json();
  const text = String(data?.text || '').trim();
  return text || null;
};

const uploadDraftImageToGithub = async (draft) => {
  const telegramImage = await getTelegramFile(CONFIG.telegramBotToken, draft.photoFileId);
  const ext = getExtension(telegramImage.filePath);
  const imageRepoPath = `${CONFIG.menuUploadDir}/${draft.id}.${ext}`;

  const existingImage = await readRepoFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: imageRepoPath,
    branch: CONFIG.githubTargetBranch,
  });

  await upsertRepoFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: imageRepoPath,
    branch: CONFIG.githubTargetBranch,
    message: `chore(menu): upload image for ${draft.id}`,
    contentBase64: encodeBytesToBase64(telegramImage.bytes),
    sha: existingImage?.sha,
  });

  return `/${imageRepoPath.replace(/^public\//, '')}`;
};

const publishDraft = async (draft, state, stateSha) => {
  const imageUrl = await uploadDraftImageToGithub(draft);

  const menuDataFile = await readJsonFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: CONFIG.menuDataPath,
    branch: CONFIG.githubTargetBranch,
    fallbackValue: [],
  });

  const existingItems = Array.isArray(menuDataFile.value) ? menuDataFile.value : [];

  const menuItemId = `admin-${draft.id}`;
  const newMenuItem = {
    id: menuItemId,
    name: {
      ru: draft.nameRu,
      uz: draft.nameRu,
    },
    longDescription: {
      ru: draft.descriptionRu,
      uz: draft.descriptionRu,
    },
    price: draft.price,
    category: draft.category,
    section: draft.sectionTitle,
    image: imageUrl,
  };

  existingItems.push(newMenuItem);

  await upsertRepoFile({
    token: CONFIG.githubToken,
    owner: CONFIG.githubRepoOwner,
    repo: CONFIG.githubRepoName,
    path: CONFIG.menuDataPath,
    branch: CONFIG.githubTargetBranch,
    message: `feat(menu): publish ${draft.id}`,
    contentBase64: encodeUtf8ToBase64(`${JSON.stringify(existingItems, null, 2)}\n`),
    sha: menuDataFile.sha,
  });

  const draftIndex = state.drafts.findIndex((entry) => entry.id === draft.id);
  if (draftIndex >= 0) {
    state.drafts[draftIndex] = {
      ...state.drafts[draftIndex],
      status: 'published',
      publishedAt: nowIso(),
      publishedMenuItemId: menuItemId,
      image: imageUrl,
    };
  }

  const updatedStateSha = await saveState(state, stateSha, `chore(bot): mark ${draft.id} as published`);
  return { updatedStateSha, menuItemId };
};

const handleCommand = async ({ chatId, userId, text, state, stateSha }) => {
  const parts = text.split(/\s+/);
  const command = parts[0].toLowerCase();

  if (command === '/start') {
    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Админ-бот меню готов. Команды:\n/new - создать черновик\n/drafts - список черновиков\n/publish <id> - опубликовать\n/cancel - отменить текущий ввод',
      { reply_markup: MAIN_KEYBOARD }
    );
    return stateSha;
  }

  if (command === '/cancel') {
    delete state.sessions[userId];
    const nextSha = await saveState(state, stateSha, `chore(bot): cancel flow for ${userId}`);

    await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Текущий сценарий отменен.', {
      reply_markup: MAIN_KEYBOARD,
    });

    return nextSha;
  }

  if (command === '/new') {
    state.sessions[userId] = {
      step: 'await_photo',
      draft: {
        id: createDraftId(),
        createdAt: nowIso(),
        createdBy: Number(userId),
        status: 'draft',
      },
    };

    const nextSha = await saveState(state, stateSha, `chore(bot): start new draft for ${userId}`);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Шаг 1/5: пришлите фото блюда одним сообщением.',
      { reply_markup: MAIN_KEYBOARD }
    );

    return nextSha;
  }

  if (command === '/drafts') {
    const drafts = state.drafts.filter((entry) => entry.status === 'draft');
    if (drafts.length === 0) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Черновиков пока нет.', {
        reply_markup: MAIN_KEYBOARD,
      });
      return stateSha;
    }

    const lines = drafts.slice(-20).reverse().map(formatDraftLine).join('\n');
    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      `<b>Черновики:</b>\n${lines}\n\nДля публикации: <code>/publish ID</code>`,
      { reply_markup: MAIN_KEYBOARD }
    );

    return stateSha;
  }

  if (command === '/publish') {
    const draftId = parts[1];
    if (!draftId) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Укажите ID: /publish d-...');
      return stateSha;
    }

    const draft = state.drafts.find((entry) => entry.id === draftId);
    if (!draft) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, `Черновик ${draftId} не найден.`);
      return stateSha;
    }

    if (draft.status === 'published') {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, `Черновик ${draftId} уже опубликован.`);
      return stateSha;
    }

    await sendTelegramMessage(CONFIG.telegramBotToken, chatId, `Публикую ${draftId}...`);
    const publishResult = await publishDraft(draft, state, stateSha);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      `Готово: ${draftId} опубликован как <code>${publishResult.menuItemId}</code>.\nVercel запустит автодеплой.`,
      { reply_markup: MAIN_KEYBOARD }
    );

    return publishResult.updatedStateSha;
  }

  await sendTelegramMessage(
    CONFIG.telegramBotToken,
    chatId,
    'Неизвестная команда. Используйте /new, /drafts, /publish <id>, /cancel.',
    { reply_markup: MAIN_KEYBOARD }
  );

  return stateSha;
};

const handleSessionStep = async ({ chatId, userId, message, state, stateSha }) => {
  const session = state.sessions[userId];
  if (!session) {
    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Нет активного сценария. Напишите /new, чтобы создать черновик.',
      { reply_markup: MAIN_KEYBOARD }
    );
    return stateSha;
  }

  if (session.step === 'await_photo') {
    const photoFileId = extractBestPhotoFileId(message);
    if (!photoFileId) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Нужна фотография. Отправьте фото блюда.');
      return stateSha;
    }

    session.draft.photoFileId = photoFileId;
    session.step = 'await_name';
    const nextSha = await saveState(state, stateSha, `chore(bot): save photo for ${session.draft.id}`);

    await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Шаг 2/5: напишите название блюда (RU).');
    return nextSha;
  }

  if (session.step === 'await_name') {
    const text = String(message.text || '').trim();
    if (!text) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Нужен текст: отправьте название блюда.');
      return stateSha;
    }

    session.draft.nameRu = text;
    session.step = 'await_price';
    const nextSha = await saveState(state, stateSha, `chore(bot): save name for ${session.draft.id}`);

    await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Шаг 3/5: отправьте цену (только число, например 68000).');
    return nextSha;
  }

  if (session.step === 'await_price') {
    const price = toNumber(message.text);
    if (!price) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Цена не распознана. Пример: 68000');
      return stateSha;
    }

    session.draft.price = price;
    session.step = 'await_description';
    const nextSha = await saveState(state, stateSha, `chore(bot): save price for ${session.draft.id}`);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Шаг 4/5: отправьте описание/состав текстом. Можно голосовым, если задан OPENAI_API_KEY.'
    );
    return nextSha;
  }

  if (session.step === 'await_description') {
    let description = String(message.text || '').trim();

    if (!description && message.voice?.file_id) {
      if (!CONFIG.openaiApiKey) {
        await sendTelegramMessage(
          CONFIG.telegramBotToken,
          chatId,
          'Для голосовых пока не задан OPENAI_API_KEY. Отправьте описание обычным текстом.'
        );
        return stateSha;
      }

      try {
        description = await transcriptVoice(message.voice.file_id);
      } catch (error) {
        await sendTelegramMessage(
          CONFIG.telegramBotToken,
          chatId,
          `Голос не распознан: ${error.message}. Отправьте описание текстом.`
        );
        return stateSha;
      }

      if (!description) {
        await sendTelegramMessage(
          CONFIG.telegramBotToken,
          chatId,
          'Голос получен, но текст пустой. Отправьте описание обычным текстом.'
        );
        return stateSha;
      }
    }

    if (!description) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Нужно описание: текстом или голосом.');
      return stateSha;
    }

    session.draft.descriptionRu = description;
    session.step = 'await_section';

    const nextSha = await saveState(state, stateSha, `chore(bot): save description for ${session.draft.id}`);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Шаг 5/5: выберите раздел (кнопкой или текстом ключа: coffee/breakfast/serving/news/decaf/bakery/dessert).',
      { reply_markup: SECTION_KEYBOARD }
    );

    return nextSha;
  }

  if (session.step === 'await_section') {
    const chosen = detectSection(message.text);
    if (!chosen) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Раздел не распознан. Выберите кнопкой или отправьте ключ категории.', {
        reply_markup: SECTION_KEYBOARD,
      });
      return stateSha;
    }

    session.draft.category = chosen.key;
    session.draft.sectionTitle = chosen.titleRu;

    const finalizedDraft = {
      ...session.draft,
      status: 'draft',
      updatedAt: nowIso(),
    };

    state.drafts.push(finalizedDraft);
    delete state.sessions[userId];

    const nextSha = await saveState(state, stateSha, `feat(bot): save draft ${finalizedDraft.id}`);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      `Черновик сохранен:\n${formatDraftLine(finalizedDraft)}\n\nПубликация: <code>/publish ${finalizedDraft.id}</code>`,
      { reply_markup: MAIN_KEYBOARD }
    );

    return nextSha;
  }

  await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Сценарий в неизвестном состоянии. Напишите /cancel и начните заново.');
  return stateSha;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const missingConfig = validateRuntimeConfig();
    if (missingConfig.length > 0) {
      res.status(500).json({ ok: false, error: `Missing env: ${missingConfig.join(', ')}` });
      return;
    }

    if (CONFIG.telegramWebhookSecret) {
      const secret = req.headers['x-telegram-bot-api-secret-token'];
      if (secret !== CONFIG.telegramWebhookSecret) {
        res.status(401).json({ ok: false, error: 'Invalid webhook secret' });
        return;
      }
    }

    const update = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const message = update?.message || update?.edited_message;
    if (!message) {
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    const chatId = message?.chat?.id;
    const userId = message?.from?.id;
    if (!chatId || !userId) {
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    if (!CONFIG.telegramAdminIds.has(Number(userId))) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'У вас нет прав для работы с админ-ботом.');
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    const { state, sha: initialStateSha } = await loadState();
    let stateSha = initialStateSha;

    const text = String(message.text || '').trim();
    if (text.startsWith('/')) {
      stateSha = await handleCommand({ chatId, userId, text, state, stateSha });
    } else {
      stateSha = await handleSessionStep({ chatId, userId, message, state, stateSha });
    }

    res.status(200).json({ ok: true, stateSha });
  } catch (error) {
    console.error('telegram-webhook error', error);
    res.status(500).json({ ok: false, error: error.message || 'Unexpected error' });
  }
}
