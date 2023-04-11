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
  const userMeQuery = useUserMeQuery({ enabled: false });
  const isTalkLoaded = useTalk();
  const inboxEle = useRef<HTMLElement>(null);
  // const { session: talkSession, dispatchTalk } = useTalkContext();
  const talkSession = useTalkSession();
  const router = useRouter();

  useEffect(() => {
    if (!talkSession) return;
    const { id, name, personalMail, avatar, role } = userMeQuery.data!;

    const currentUser = talkInstance.createUser({
      id: id,
      name,
      email: personalMail,
      // photoUrl: '',
      // welcomeMessage: 'Hello!',
      // role,
    });
    //TODO: Refactor this
    const otherUser = talkInstance.createUser({
      id: 5,
      name: 'Kien Ho',
      email: 'jessicawells@example.com',
      // photoUrl: 'jessica.jpeg',
      // welcomeMessage: 'Hello!',
      // role,
    });

    // const talkSession = talkInstance.createSession(currentUser);
    // const conversationId = talkInstance.createOneOnOneConversation({ currentUser, otherUser });
    // const conversation = talkSession.getOrCreateConversation(conversationId);
    // conversation.setParticipant(currentUser);
    // conversation.setParticipant(otherUser);
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
