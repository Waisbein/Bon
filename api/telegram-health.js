import { CONFIG, validateRuntimeConfig } from './_lib/config.js';
import { readJsonFile } from './_lib/github.js';

const fetchTelegram = async (method, token) => {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`);
  const data = await response.json();
  return data;
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const missing = validateRuntimeConfig();
    const hasToken = Boolean(CONFIG.telegramBotToken);

    let getMe = null;
    let webhookInfo = null;
    let github = null;
    if (hasToken) {
      getMe = await fetchTelegram('getMe', CONFIG.telegramBotToken);
      webhookInfo = await fetchTelegram('getWebhookInfo', CONFIG.telegramBotToken);
    }

    try {
      const state = await readJsonFile({
        token: CONFIG.githubToken,
        owner: CONFIG.githubRepoOwner,
        repo: CONFIG.githubRepoName,
        path: CONFIG.botStatePath,
        branch: CONFIG.githubDraftBranch,
        fallbackValue: { sessions: {}, drafts: [] },
      });

      github = {
        ok: true,
        repo: `${CONFIG.githubRepoOwner}/${CONFIG.githubRepoName}`,
        branch: CONFIG.githubDraftBranch,
        stateFilePath: CONFIG.botStatePath,
        stateFileSha: state.sha || null,
      };
    } catch (error) {
      github = {
        ok: false,
        repo: `${CONFIG.githubRepoOwner}/${CONFIG.githubRepoName}`,
        branch: CONFIG.githubDraftBranch,
        stateFilePath: CONFIG.botStatePath,
        error: error.message || 'Unknown GitHub error',
      };
    }

    res.status(200).json({
      ok: true,
      env: {
        missing,
        hasTelegramBotToken: hasToken,
        hasWebhookSecret: Boolean(CONFIG.telegramWebhookSecret),
        adminIdsCount: CONFIG.telegramAdminIds.size,
        appBaseUrl: process.env.APP_BASE_URL || null,
      },
      telegram: {
        getMe,
        webhookInfo,
      },
      github,
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message || 'Unexpected error' });
  }
}
