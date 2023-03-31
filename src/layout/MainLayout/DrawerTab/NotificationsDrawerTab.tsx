import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
enum NotificationsMode {
  Read,
  Unread,
}

const notificationsTabs = [{ label: 'All' }, { label: 'Unread' }];
function NotificationsDrawerTab() {
  const [notificationsMode, setNotificationsMode] = useState(NotificationsMode.Read);
  return (
    <Box sx={{ p: 2, pt: 3 }}>
      <Typography
        variant="h4"
        color="initial"
        sx={{ mb: 2, fontSize: 20, fontWeight: 700, color: '#000' }}
      >
        Notifications
      </Typography>
      <Tabs
        value={notificationsMode}
        onChange={(event, value: number) => setNotificationsMode(value)}
        aria-label=""
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {notificationsTabs.map(({ label }) => (
          <Tab
            key={label}
            label={label}
            disableRipple
            sx={{
              '&.Mui-selected': { backgroundColor: '#E7F3FF' },
              borderRadius: '18px',
              fontWeight: '700 !important',
              px: '12px !important',
            }}
          />
        ))}
      </Tabs>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 10px' }}>
        <Button
          variant="contained"
          color="inherit"
          sx={{ borderRadius: '18px', p: '6px 2px', minWidth: '40px' }}
          size="small"
        >
          All
        </Button>
        <Button
          variant="contained"
          color="inherit"
          sx={{ borderRadius: '18px', p: '6px 2px', minWidth: '70px' }}
          size="small"
        >
          Unread
        </Button>
      </Box> */}
    </Box>
  );
}

export default NotificationsDrawerTab;
