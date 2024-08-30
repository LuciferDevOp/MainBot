
import { masterId, botToken, LogGroupId } from './vars.js';

export async function sendMessage(to_chatId, text, replyMarkup, parsemode = "Markdown") {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: to_chatId,
    text,
    parse_mode: parsemode
  });
  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function copyMessage(from_chatId, messageId, to_chat, replyMarkup) {

  const apiUrl = `https://api.telegram.org/bot${botToken}/copyMessage`;
  const params = new URLSearchParams({
    chat_id: to_chat,
    from_chat_id: from_chatId,
    message_id: messageId,
    allow_sending_without_reply: true,
  });

  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function copyToMaster(from_chatId, messageId, to_chat = masterId, replyMarkup) {

  const apiUrl = `https://api.telegram.org/bot${botToken}/copyMessage`;
  const params = new URLSearchParams({
    chat_id: to_chat,
    from_chat_id: from_chatId,
    message_id: messageId,
    allow_sending_without_reply: true,
  });

  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function replyMessage(to_chatId, messageId, text, replyMarkup) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: to_chatId,
    text: text,
    parse_mode: "Markdown",
    reply_to_message_id: messageId,
  });

  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function deleteMessage(chatId, messageId) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/deleteMessage`;
  const params = new URLSearchParams({
    chat_id: chatId,
    message_id: messageId,
  });

  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function answerCallbackQuery(queryId, text) {
  const apiUrl = `https://api.telegram.org/bot${botToken}/answerCallbackQuery`;
  const params = new URLSearchParams({
    callback_query_id: queryId,
    text: text,
    show_alert: true,
  });

  await fetch(`${apiUrl}?${params.toString()}`);
}

export async function editMessageText(chatId, messageId, newText, replyMarkup, parsemode = "Markdown") {
  const apiUrl = `https://api.telegram.org/bot${botToken}/editMessageText`;
  const params = new URLSearchParams({
    chat_id: chatId,
    message_id: messageId,
    text: newText,
    parse_mode: parsemode,
  });

  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }

  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}

export async function sendLogs(text, msgThreadId, replyMarkup, parsemode = "Markdown") {
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = new URLSearchParams({
    chat_id: LogGroupId,
    text,
    parse_mode: parsemode,
    message_thread_id: msgThreadId,
  });

  if (replyMarkup) {
    params.append("reply_markup", JSON.stringify(replyMarkup));
  }
  const response = await fetch(`${apiUrl}?${params.toString()}`);
  return response.json();
}