import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ChatsDrawerTab() {
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
