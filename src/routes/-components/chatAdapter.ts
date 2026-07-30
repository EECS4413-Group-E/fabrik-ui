import type { ChatAdapter } from '@mui/x-chat/headless';
import { sendChatMessage } from '../../Api';
import type { ChatMessage } from '../../models/ChatMessage';
import type { ChatResponse } from '../../models/ChatResponse';

function textToChunkStream(messageId: string, text: string): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue({ type: 'text-start', id: messageId });
      controller.enqueue({ type: 'text-delta', id: messageId, delta: text });
      controller.enqueue({ type: 'text-end', id: messageId });
      controller.close();
    },
  });
}

// Pulls the plain-text content out of the MUI ChatMessage the composer sends.
// MUI messages are `{ role, parts: [{ type: 'text', text }, ...] }`.
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  return message.parts?.find((part) => part.type === 'text')?.text ?? '';
}

export const chatAdapter: ChatAdapter = {
  async sendMessage({ message, conversationId, signal }) {
    const userText = getMessageText(message);    

    const chatRequest: ChatMessage = {
      conversationId: conversationId ?? message.conversationId,
      message: userText,
    } as ChatMessage;

    const response = await sendChatMessage(chatRequest, signal);

    const replyText = (response as ChatResponse).answer;
    
    return textToChunkStream(`response-${message.id}`, replyText);
  },
};
