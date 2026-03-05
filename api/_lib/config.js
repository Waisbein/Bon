const parseAdminIds = (raw) => {
  return new Set(
    String(raw || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value))
  );
};

export const CONFIG = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramWebhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET || '',
  telegramAdminIds: parseAdminIds(process.env.TELEGRAM_ADMIN_IDS || ''),

  githubToken: process.env.GITHUB_TOKEN || '',
  githubRepoOwner: process.env.GITHUB_REPO_OWNER || '',
  githubRepoName: process.env.GITHUB_REPO_NAME || '',
  githubTargetBranch: process.env.GITHUB_TARGET_BRANCH || 'main',
  githubDraftBranch: process.env.GITHUB_DRAFT_BRANCH || process.env.GITHUB_TARGET_BRANCH || 'main',

  botStatePath: process.env.BOT_STATE_PATH || '.bot/menu-drafts.json',
  menuDataPath: process.env.MENU_DATA_PATH || 'public/menu/admin-items.json',
  menuUploadDir: process.env.MENU_UPLOAD_DIR || 'public/menu/uploads',

  openaiApiKey: process.env.OPENAI_API_KEY || '',
  openaiTranscriptionModel: process.env.OPENAI_TRANSCRIPTION_MODEL || 'whisper-1',
};

export const validateRuntimeConfig = () => {
  const missing = [];

  if (!CONFIG.telegramBotToken) missing.push('TELEGRAM_BOT_TOKEN');
  if (!CONFIG.githubToken) missing.push('GITHUB_TOKEN');
  if (!CONFIG.githubRepoOwner) missing.push('GITHUB_REPO_OWNER');
  if (!CONFIG.githubRepoName) missing.push('GITHUB_REPO_NAME');
  if (CONFIG.telegramAdminIds.size === 0) missing.push('TELEGRAM_ADMIN_IDS');

  return missing;
};
