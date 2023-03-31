import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useTalk } from 'hooks';
import { talkInstance } from 'services';
import { useUserMeQuery } from 'queries';

function ChatsDrawerTab() {
  const userMeQuery = useUserMeQuery();
  // console.log('🚀 ~ userMeQuery:', userMeQuery.data);
  const isTalkLoaded = useTalk();
  useEffect(() => {
    if (isTalkLoaded && userMeQuery.data) {
      const { id, name, personalMail, avatar, role } = userMeQuery.data;
      const currentUser = talkInstance.createUser({
        id: userMeQuery.data.id,
        name,
        email: personalMail,
        photoUrl: '',
        // welcomeMessage: 'Hello!',
        role,
      });

      // const otherUser = talkInstance.createUser({
      //   id: '2',
      //   name: 'Jessica Wells',
      //   email: 'jessicawells@example.com',
      //   photoUrl: 'jessica.jpeg',
      //   welcomeMessage: 'Hello!',
      //   role: 'default',
      // });

      const session = talkInstance.createSession(currentUser);
      return () => session.destroy();
    }
  }, [isTalkLoaded, userMeQuery.data]);

  return (
    <Box sx={{ p: 2, pt: 3 }}>
      <Typography
        variant="h4"
        color="initial"
        sx={{ mb: 1, fontSize: 20, fontWeight: 700, color: '#000' }}
      >
        Chats
      </Typography>
    </Box>
  );
}

export default ChatsDrawerTab;
