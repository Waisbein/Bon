import { CONFIG, validateRuntimeConfig } from './_lib/config.js';
import { telegramApiRequest } from './_lib/telegram.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  try {
    const missing = validateRuntimeConfig().filter((entry) => entry !== 'TELEGRAM_ADMIN_IDS');
    if (missing.length > 0) {
      res.status(500).json({ ok: false, error: `Missing env: ${missing.join(', ')}` });
      return;
    }

    const baseUrl = process.env.APP_BASE_URL;
    if (!baseUrl) {
      res.status(500).json({ ok: false, error: 'Missing env: APP_BASE_URL' });
      return;
    }

    const webhookUrl = `${baseUrl.replace(/\/$/, '')}/api/telegram-webhook`;
    const result = await telegramApiRequest(CONFIG.telegramBotToken, 'setWebhook', {
      url: webhookUrl,
      secret_token: CONFIG.telegramWebhookSecret || undefined,
      drop_pending_updates: true,
    });

    res.status(200).json({ ok: true, webhookUrl, result });
  } catch (error) {
    console.error('setup-telegram-webhook error', error);
    res.status(500).json({ ok: false, error: error.message || 'Unexpected error' });
  }
}
