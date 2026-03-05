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
const BUILTIN_SECTION_KEYS = new Set(SECTION_OPTIONS.map((option) => option.key));

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
const canonicalizeSectionTitle = (value) => {
  return normalize(value)
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const escapeHtml = (value) => {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const buildCustomSectionKey = (sectionTitle) => {
  const normalizedTitle = canonicalizeSectionTitle(sectionTitle);
  if (!normalizedTitle) return null;

  const encoded = encodeURIComponent(normalizedTitle)
    .replace(/%/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 48);

  if (!encoded) return null;
  return `custom-${encoded}`;
};

const addKnownSection = (knownByKey, key, titleRu) => {
  const safeKey = String(key || '').trim();
  const safeTitle = String(titleRu || '').trim();
  if (!safeKey || !safeTitle) return;
  if (knownByKey.has(safeKey)) return;
  knownByKey.set(safeKey, {
    key: safeKey,
    titleRu: safeTitle,
    isCustom: !BUILTIN_SECTION_KEYS.has(safeKey),
  });
};

const getKnownSections = async (state) => {
  const knownByKey = new Map();

  SECTION_OPTIONS.forEach((option) => addKnownSection(knownByKey, option.key, option.titleRu));

  const stateDrafts = Array.isArray(state?.drafts) ? state.drafts : [];
  stateDrafts.forEach((draft) => {
    addKnownSection(knownByKey, draft?.category, draft?.sectionTitle || draft?.category);
  });

  try {
    const menuDataFile = await readJsonFile({
      token: CONFIG.githubToken,
      owner: CONFIG.githubRepoOwner,
      repo: CONFIG.githubRepoName,
      path: CONFIG.menuDataPath,
      branch: CONFIG.githubTargetBranch,
      fallbackValue: [],
    });

    const existingItems = Array.isArray(menuDataFile.value) ? menuDataFile.value : [];
    existingItems.forEach((item) => {
      addKnownSection(knownByKey, item?.category, item?.section || item?.category);
    });
  } catch {
    // Если чтение меню временно недоступно, продолжаем с уже известными разделами.
  }

  return Array.from(knownByKey.values());
};

const levenshteinDistance = (left, right) => {
  if (left === right) return 0;
  if (!left) return right.length;
  if (!right) return left.length;

  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[rows - 1][cols - 1];
};

const findLikelyExistingSection = (inputCanonical, knownSections) => {
  if (!inputCanonical || inputCanonical.length < 6) return null;

  let bestMatch = null;
  for (const section of knownSections) {
    const candidateCanonical = canonicalizeSectionTitle(section.titleRu);
    if (!candidateCanonical || candidateCanonical === inputCanonical) continue;

    const distance = levenshteinDistance(inputCanonical, candidateCanonical);
    const maxLen = Math.max(inputCanonical.length, candidateCanonical.length);
    const similarity = 1 - distance / maxLen;
    const probablyTypo = distance <= 1 || (distance <= 2 && similarity >= 0.9);

    if (!probablyTypo) continue;
    if (!bestMatch || similarity > bestMatch.similarity || (similarity === bestMatch.similarity && distance < bestMatch.distance)) {
      bestMatch = { section, distance, similarity };
    }
  }

  return bestMatch ? bestMatch.section : null;
};

const resolveSection = (rawInput, knownSections) => {
  const rawValue = String(rawInput || '').trim();
  const input = normalize(rawValue);
  const canonicalInput = canonicalizeSectionTitle(rawValue);
  if (!input) return null;

  const byKey = knownSections.find((section) => normalize(section.key) === input);
  if (byKey) return { ...byKey, matchedByTypo: false };

  const byExactTitle = knownSections.find((section) => canonicalizeSectionTitle(section.titleRu) === canonicalInput);
  if (byExactTitle) return { ...byExactTitle, matchedByTypo: false };

  const byTypo = findLikelyExistingSection(canonicalInput, knownSections);
  if (byTypo) return { ...byTypo, matchedByTypo: true };

  const customKey = buildCustomSectionKey(rawValue);
  if (!customKey) return null;

  return { key: customKey, titleRu: canonicalInput ? rawValue.replace(/\s+/g, ' ').trim() : rawValue, isCustom: true, matchedByTypo: false };
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
      'Админ-бот меню готов. Команды:\n/new - создать черновик\n/drafts - список черновиков\n<code>/publish ID</code> - опубликовать\n/cancel - отменить текущий ввод\n\nНа шаге раздела можно ввести новый раздел текстом.',
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
      `✅ Блюдо добавлено в меню.\nПозиция: <code>${publishResult.menuItemId}</code>\nСтатус: данные опубликованы, Vercel обновляет сайт.`,
      { reply_markup: MAIN_KEYBOARD }
    );

    return publishResult.updatedStateSha;
  }

  await sendTelegramMessage(
    CONFIG.telegramBotToken,
    chatId,
    'Неизвестная команда. Используйте /new, /drafts, <code>/publish ID</code>, /cancel.',
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
      'Шаг 4/5: отправьте описание/состав текстом.'
    );
    return nextSha;
  }

  if (session.step === 'await_description') {
    const description = String(message.text || '').trim();

    if (!description) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Нужно описание текстом.');
      return stateSha;
    }

    session.draft.descriptionRu = description;
    session.step = 'await_section';

    const nextSha = await saveState(state, stateSha, `chore(bot): save description for ${session.draft.id}`);

    await sendTelegramMessage(
      CONFIG.telegramBotToken,
      chatId,
      'Шаг 5/5: выберите раздел кнопкой или введите новый текстом (например: Сезонные напитки).',
      { reply_markup: SECTION_KEYBOARD }
    );

    return nextSha;
  }

  if (session.step === 'await_section') {
    const knownSections = await getKnownSections(state);
    const chosen = resolveSection(message.text, knownSections);
    if (!chosen) {
      await sendTelegramMessage(CONFIG.telegramBotToken, chatId, 'Раздел не распознан. Выберите кнопку или введите название нового раздела.', {
        reply_markup: SECTION_KEYBOARD,
      });
      return stateSha;
    }

    session.draft.category = chosen.key;
    session.draft.sectionTitle = chosen.titleRu;

    if (chosen.matchedByTypo) {
      await sendTelegramMessage(
        CONFIG.telegramBotToken,
        chatId,
        `Чтобы не создать дубль, использую существующий раздел: <b>${escapeHtml(chosen.titleRu)}</b>.`
      );
    }

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
