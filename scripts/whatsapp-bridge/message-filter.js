export function normalizeWhatsAppId(value) {
  if (!value) return '';
  return String(value).replace(':', '@');
}

export function whatsappIdNumber(value) {
  return normalizeWhatsAppId(value).replace(/:.*@/, '@').replace(/@.*/, '');
}

export function isOwnSelfChat(chatId, botIds = []) {
  const chatNumber = whatsappIdNumber(chatId);
  if (!chatNumber) return false;
  return botIds.some((id) => whatsappIdNumber(id) === chatNumber);
}

export function shouldAcceptFromMeMessage({ mode, chatId, isGroup, botIds = [] }) {
  if (isGroup || String(chatId || '').includes('status')) return false;
  if (mode === 'bot') {
    // In bot mode, most fromMe messages are echoes of Hermes replies and are
    // filtered later by reply prefix / recently-sent message id. But a linked
    // WhatsApp account can also send commands to its own self-chat; allow only
    // that self-chat through so the owner can use Hermes from WhatsApp too.
    return isOwnSelfChat(chatId, botIds);
  }
  return isOwnSelfChat(chatId, botIds);
}
