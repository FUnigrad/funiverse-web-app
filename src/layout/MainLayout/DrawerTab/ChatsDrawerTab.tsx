import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import { useTalk, useTalkSession } from 'hooks';
import { talkInstance } from 'services';
import { useUserMeQuery } from 'queries';
import { Session } from 'talkjs/all';
import { UserMe } from '@types';
import Talk from 'talkjs';
import { useRouter } from 'next/router';
import { useTalkContext } from 'contexts';

function ChatsDrawerTab() {
  // const isTalkLoaded = useTalk();
  const inboxEle = useRef<HTMLElement>(null);
  const [talkSession] = useTalkSession();
  const router = useRouter();

  useEffect(() => {
    if (!talkSession) return;
    const inbox = talkSession.createInbox({
      selected: null,
    });
    inbox.onSelectConversation((event) => {
      event.preventDefault();
      router.push(`/chat/${event.conversation.id}`);
      // dispatchTalk({ type: 'SELECT_CONVERSATION', payload: event.others });
    });
    inbox.mount(inboxEle.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talkSession]);

  return (
    <Box sx={{ pt: 3, height: '100%' }}>
      <Typography
        variant="h4"
        color="initial"
        sx={{ mb: 2, fontSize: 20, fontWeight: 700, color: '#000', px: 2 }}
      >
        Chats
      </Typography>
      <Box ref={inboxEle} sx={{ height: 'calc(100% - 48px)' }}></Box>
    </Box>
  );
}

export default ChatsDrawerTab;
