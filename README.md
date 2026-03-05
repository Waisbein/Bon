<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1S0cRS59NM46ZwXHLHRiosrceiRtJVk5g

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Telegram Admin Workflow (Draft -> Publish)

This repo now includes a Telegram admin bot webhook for menu updates:

- endpoint: `/api/telegram-webhook`
- helper endpoint to register webhook: `/api/setup-telegram-webhook`
- published menu file: `public/menu/admin-items.json`
- uploaded images folder: `public/menu/uploads/`
- bot draft/state file: `.bot/menu-drafts.json`

### 1. Configure env vars in Vercel

Create these variables in Vercel Project Settings (copy names from `.env.example`):

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET`
- `TELEGRAM_ADMIN_IDS` (comma-separated IDs, e.g. `467914417`)
- `GITHUB_TOKEN`
- `GITHUB_REPO_OWNER` (`Waisbein`)
- `GITHUB_REPO_NAME` (`Bon`)
- `GITHUB_TARGET_BRANCH` (`main`)
- `APP_BASE_URL` (your Vercel app URL)

Optional:

- `OPENAI_API_KEY` for voice transcription
- `GITHUB_DRAFT_BRANCH` if you want drafts/state in a separate branch

### 2. Register webhook once

After deploy, call:

`POST https://<your-vercel-domain>/api/setup-telegram-webhook`

Example:

`curl -X POST https://<your-vercel-domain>/api/setup-telegram-webhook`

### 3. Bot commands (admin only)

- `/new` - create draft in 5 steps (photo -> name -> price -> description -> section)
- `/drafts` - list saved drafts
- `/publish <id>` - publish selected draft to live menu
- `/cancel` - cancel active flow

At step 5 you can either pick an existing section from keyboard or type a brand-new section name.

On publish, Vercel autodeploy will update the menu automatically.
