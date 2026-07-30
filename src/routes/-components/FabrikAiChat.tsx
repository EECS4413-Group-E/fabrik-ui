import * as React from 'react';
import {
  Chat,
  Conversation,
  Composer,
  Message,
  MessageGroup,
  MessageList,
} from '@mui/x-chat/headless';
import type { ChatMessage, ChatUser } from '@mui/x-chat/headless';

import { chatAdapter } from './chatAdapter';
import { fabrikColors } from '../../theme';
import { Box, } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

// ---------------------------------------------------------------------------
// Intercom-style brand tokens
// ---------------------------------------------------------------------------
const intercom = {
  bg: '#ffffff',
  headerBg: '#ffffff',
  headerBorder: '#e8e8e8',
  bubbleAssistant: '#f4f4f4',
  bubbleUser: fabrikColors.terracotta,
  textPrimary: '#1a1a1a',
  textSecondary: '#737373',
  textOnUser: '#ffffff',
  border: '#e8e8e8',
  inputBg: '#ffffff',
  accent: '#ff7a45',
  radius: 16,
  footerText: '#a3a3a3',
} as const;

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------
function createAvatarDataUrl(label: string, bg: string, fg = '#ffffff') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="${bg}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="600" fill="${fg}">${label}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const finAgent: ChatUser = {
  id: 'fab',
  displayName: 'Fab',
  avatarUrl: createAvatarDataUrl('F', fabrikColors.terracotta),
};

const you: ChatUser = {
  id: 'you',
  displayName: 'You',
  avatarUrl: createAvatarDataUrl('Y', fabrikColors.mutedCharcoal, '#ffffff'),
};

const conversation = {
  id: 'intercom',
  title: 'Fab',
  subtitle: 'What are we shopping for today?',
  participants: [you, finAgent],
  readState: 'read' as const,
  unreadCount: 0,
  lastMessageAt: '2026-03-15T12:04:00.000Z',
};

const initialMessages: ChatMessage[] = [
  {
    id: 'ic-a1',
    conversationId: 'intercom',
    role: 'assistant',
    status: 'sent',
    createdAt: '2026-03-15T12:00:00.000Z',
    author: finAgent,
    parts: [
      {
        type: 'text',
        text: "Hey, I'm Fab, an AI assistant. I noticed you've been looking at our products! How can I help you today?",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Slot components
// ---------------------------------------------------------------------------
const IntercomMessageGroup = React.forwardRef(function IntercomMessageGroup(
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
    ownerState?: { isFirst?: boolean };
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, ownerState, style, ...other } = props;
  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gap: 4,
        marginTop: ownerState?.isFirst ? 16 : 10,
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
});

const IntercomAuthorName = React.forwardRef(function IntercomAuthorName(
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
    ownerState?: { role?: string };
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, ownerState, style, ...other } = props;
  if (ownerState?.role === 'user') {
    return null;
  }
  return (
    <div
      ref={ref}
      style={{
        display: 'none',
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
});

const IntercomMessageRoot = React.forwardRef(function IntercomMessageRoot(
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
    ownerState?: { role?: string };
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, ownerState, style, ...other } = props;
  const isUser = ownerState?.role === 'user';
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 0,
        alignItems: 'flex-end',
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
});

const markdownComponents: Components = {
  p: ({ children }) => (
    <p style={{ margin: 0 }}>{children}</p>
  ),
  strong: ({ children }) => (
    <strong style={{ fontWeight: 700 }}>{children}</strong>
  ),
  em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'currentColor', textDecoration: 'underline' }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: '4px 0', paddingLeft: 20 }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: '4px 0', paddingLeft: 20 }}>{children}</ol>
  ),
  li: ({ children }) => <li style={{ marginTop: 2 }}>{children}</li>,
  h1: ({ children }) => (
    <div style={{ fontSize: 17, fontWeight: 700, margin: '4px 0' }}>
      {children}
    </div>
  ),
  h2: ({ children }) => (
    <div style={{ fontSize: 16, fontWeight: 700, margin: '4px 0' }}>
      {children}
    </div>
  ),
  h3: ({ children }) => (
    <div style={{ fontSize: 15, fontWeight: 700, margin: '4px 0' }}>
      {children}
    </div>
  ),
  code: ({ children, className }) => {
    const isBlock = Boolean(className);
    return (
      <code
        style={{
          background: 'rgba(127,127,127,0.2)',
          borderRadius: 4,
          padding: isBlock ? '8px 10px' : '2px 4px',
          display: isBlock ? 'block' : 'inline',
          overflowX: isBlock ? 'auto' : undefined,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontSize: 13,
          whiteSpace: isBlock ? 'pre' : 'pre-wrap',
        }}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => <pre style={{ margin: '4px 0' }}>{children}</pre>,
  blockquote: ({ children }) => (
    <blockquote
      style={{
        margin: '4px 0',
        paddingLeft: 10,
        borderLeft: '3px solid rgba(127,127,127,0.4)',
        opacity: 0.85,
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid rgba(127,127,127,0.4)',
        margin: '8px 0',
      }}
    />
  ),
};
function renderMarkdownText(text: string) {
  return <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>;
}

const IntercomBubble = React.forwardRef(function IntercomBubble(
  props: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> & {
    ownerState?: { role?: string };
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const { children, ownerState, style, ...other } = props;
  const isUser = ownerState?.role === 'user';
  return (
    <div
      ref={ref}
      style={{
        padding: '12px 16px',
        borderRadius: isUser
          ? `${intercom.radius}px ${intercom.radius}px 4px ${intercom.radius}px`
          : `${intercom.radius}px ${intercom.radius}px ${intercom.radius}px 4px`,
        background: isUser ? intercom.bubbleUser : intercom.bubbleAssistant,
        color: isUser ? intercom.textOnUser : intercom.textPrimary,
        maxWidth: '85%',
        fontSize: 14,
        lineHeight: 1.5,
        whiteSpace: isUser ? 'pre-wrap' : 'normal',
        ...style,
      }}
      {...other}
    >
      {children}
    </div>
  );
});


const IntercomComposerRoot = React.forwardRef(function IntercomComposerRoot(
  props: React.PropsWithChildren<React.FormHTMLAttributes<HTMLFormElement>> & {
    ownerState?: unknown;
  },
  ref: React.Ref<HTMLFormElement>,
) {
  const { children, ownerState, style, ...other } = props;
  return (
    <form
      ref={ref}
      style={{
        display: 'grid',
        gap: 8,
        padding: '12px 16px',
        borderTop: `1px solid ${intercom.headerBorder}`,
        background: intercom.bg,
        ...style,
      }}
      {...other}
    >
      {children}
    </form>
  );
});

const IntercomTextArea = React.forwardRef(function IntercomTextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ownerState?: unknown;
  },
  ref: React.Ref<HTMLTextAreaElement>,
) {
  const { ownerState, style, ...other } = props;
  return (
    <textarea
      ref={ref}
      style={{
        width: '100%',
        minHeight: 40,
        maxHeight: 160,
        resize: 'none',
        border: 'none',
        background: 'transparent',
        color: intercom.textPrimary,
        padding: 0,
        fontFamily: 'inherit',
        fontSize: 15,
        outline: 'none',
        boxSizing: 'border-box',
        ...style,
      }}
      {...other}
    />
  );
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function FabrikAiChat() {
  const [messages, setMessages] = React.useState(initialMessages);

  return (
    <Chat.Root
      adapter={chatAdapter}
      conversations={[conversation]}
      initialActiveConversationId="intercom"
      messages={messages}
      onMessagesChange={setMessages}
      slotProps={{
        root: {
          style: {
            background: intercom.bg,
            borderRadius: 6,
            border: `1px solid ${intercom.border}`,
            overflow: 'hidden',
            maxWidth: 400,
            margin: '0 auto',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'grid',
            gridTemplateRows: 'auto minmax(0, 1fr) auto auto',
            height: 560,
          },
        },
      }}
    >
      {/* Header */}
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          borderBottom: `1px solid ${intercom.headerBorder}`,
        }}
      >

        <img
          alt="Fab"
          src={finAgent.avatarUrl}
          style={{ width: 32, height: 32, borderRadius: '50%' }}
        />
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Box
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: intercom.textPrimary,
            }}
          >
            Fab
          </Box>
          <Box style={{ fontSize: 12, color: intercom.textSecondary }}>
            What are we shopping for today?
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Conversation.Root
        slotProps={{
          root: {
            style: {
              minHeight: 0,
              display: 'grid',
              gridTemplateRows: 'minmax(0, 1fr)',
            },
          },
        }}
      >
        <MessageList.Root
          estimatedItemSize={100}
          renderItem={({ id, index }) => (
            <MessageGroup
              index={index}
              key={id}
              messageId={id}
              slots={{
                authorName: IntercomAuthorName,
                group: IntercomMessageGroup,
              }}
            >
              <Message.Root messageId={id} slots={{ root: IntercomMessageRoot }}>
                <Message.Content
                  slots={{ bubble: IntercomBubble }}
                  partProps={{ text: { renderText: renderMarkdownText } }}
                />
              </Message.Root>
            </MessageGroup>
          )}
          slotProps={{
            messageList: {
              style: { paddingRight: 0 },
            },
            messageListScroller: {
              style: { padding: '0 16px' },
            },
          }}
        >
        </MessageList.Root>
      </Conversation.Root>

      {/* Composer */}
      <Composer.Root slots={{ root: IntercomComposerRoot }}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Composer.TextArea
            aria-label="Message"
            placeholder="Message…"
            slots={{ input: IntercomTextArea }}
            />
          <Box
            style={{
              display: 'flex',
              gap: 12,
              color: intercom.textSecondary,
              fontSize: 18,
            }}
          >
          </Box>
          <Composer.SendButton
            style={{
              color: intercom.textSecondary,
              fontSize: 18,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}>
            <ArrowCircleUpIcon
            sx={{
              color: intercom.textSecondary,
              fontSize: 36,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              '&:hover': { color: fabrikColors.terracotta },
            }}
            />
          </Composer.SendButton>
        </Box>
      </Composer.Root>

      {/* Footer */}
      <Box
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: intercom.footerText,
          padding: '8px 16px',
        }}
      >
        Powered by Gemini
      </Box>
    </Chat.Root>
  );
}