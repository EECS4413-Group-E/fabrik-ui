import { Box, Collapse, IconButton } from '@mui/material';
import FabrikAiChat from './FabrikAiChat';
import { fabrikColors } from '../../theme';
import { useEffect, useState } from 'react';

import ChatIcon from '@mui/icons-material/Chat';

import { useMatches } from '@tanstack/react-router';

function useChatVisibility() {
  const matches = useMatches();
  return !matches.some((m) => m.staticData?.hideChat);
}

function closeChatBoxIfNeeded(showChat: boolean, setChatBoxOpen: (open: boolean) => void) {
  if (!showChat) {
    setChatBoxOpen(false);
  }
}

const ToggleChat = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const showChat = useChatVisibility(); // called unconditionally, top-level

  useEffect(() => {
    closeChatBoxIfNeeded(showChat, setChatBoxOpen);
  }, [showChat]);
  return (
    <Box sx={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1000 }}>
      <Collapse in={chatBoxOpen} timeout="auto">
        <FabrikAiChat />
      </Collapse>
      <Box
        sx={{
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {showChat && (

          <IconButton
          sx={{
            my: 2,
            height: 65,
            width: 65,
            color: 'white',
            backgroundColor: fabrikColors.mutedCharcoal,
            '&:hover': { backgroundColor: fabrikColors.charcoal },
          }}
          aria-label="Chat with us"
          onClick={() => setChatBoxOpen(!chatBoxOpen)}
          >
          <ChatIcon />
        </IconButton>
        )}
      </Box>
    </Box>
  );
};
export default ToggleChat;
