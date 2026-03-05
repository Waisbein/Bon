export const telegramApiRequest = async (token, method, payload, isFormData = false) => {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const result = await response.json();
  if (!result.ok) {
    throw new Error(`Telegram API error on ${method}: ${JSON.stringify(result)}`);
  }

  return result.result;
};

export const sendTelegramMessage = async (token, chatId, text, options = {}) => {
  return telegramApiRequest(token, 'sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    ...options,
  });
};

export const getTelegramFile = async (token, fileId) => {
  const result = await telegramApiRequest(token, 'getFile', { file_id: fileId });
  if (!result.file_path) {
    throw new Error('Telegram file_path is missing');
  }

  const fileUrl = `https://api.telegram.org/file/bot${token}/${result.file_path}`;
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to download Telegram file: ${response.status}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  return {
    bytes,
    filePath: result.file_path,
  };
};
