import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldAcceptFromMeMessage } from './message-filter.js';

test('bot mode accepts fromMe messages only in the owner self-chat', () => {
  assert.equal(
    shouldAcceptFromMeMessage({
      mode: 'bot',
      chatId: '159480910242036@lid',
      isGroup: false,
      botIds: ['61410861889@s.whatsapp.net', '159480910242036@lid'],
    }),
    true,
  );

  assert.equal(
    shouldAcceptFromMeMessage({
      mode: 'bot',
      chatId: '97027673333881@lid',
      isGroup: false,
      botIds: ['61410861889@s.whatsapp.net', '159480910242036@lid'],
    }),
    false,
  );
});

test('self-chat mode keeps existing self-chat-only behavior', () => {
  assert.equal(
    shouldAcceptFromMeMessage({
      mode: 'self-chat',
      chatId: '61410861889@s.whatsapp.net',
      isGroup: false,
      botIds: ['61410861889@s.whatsapp.net', '159480910242036@lid'],
    }),
    true,
  );
  assert.equal(
    shouldAcceptFromMeMessage({
      mode: 'self-chat',
      chatId: '120363401601435263@g.us',
      isGroup: true,
      botIds: ['61410861889@s.whatsapp.net', '159480910242036@lid'],
    }),
    false,
  );
});
