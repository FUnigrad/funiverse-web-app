import { useRouter } from 'next/router';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useLayoutEffect } from 'react';
import ActiveLink from 'components/ActiveLink';
import PostCard from 'components/PostCard';
import dynamic from 'next/dynamic';
import { AppLayout } from 'layout';
import { NextPageWithLayout } from 'pages/_app';
import { useModalContext } from 'contexts';
export const IMG_SRC =
  'https://images.unsplash.com/photo-1673908495930-aa64c3fd2638?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

const GROUP_TABS = [
  { href: '/groups/[gid]', label: 'Posts' },
  { href: '/groups/[gid]/members', label: 'Member' },
  { href: '/groups/[gid]/media', label: 'Media' },
  { href: '/groups/[gid]/academic', label: 'Academic' },
];
export function getGroupDetailLayout(page: React.ReactElement) {
  return <GroupDetailLayout>{page}</GroupDetailLayout>;
}
export function withGroupDetailLayout(Component: NextPageWithLayout) {
  Component.getNestedLayout = getGroupDetailLayout;
  return Component;
}
function GroupDetailLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { dispatch } = useModalContext();

  const {
    query: { gid },
    pathname,
  } = router;

  const [tabIndex, setTabIndex] = React.useState(0);

  useLayoutEffect(() => {
    const initialTabIndex = GROUP_TABS.findIndex((tab) => tab.href.includes(pathname));
    setTabIndex(initialTabIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTabChange(event: React.SyntheticEvent, newTabIndex: number) {
    setTabIndex(newTabIndex);
  }

  function handleInviteClick() {
    dispatch({
      type: 'open',
      payload: {
        title: 'Add members',
        content: () => <div>add members</div>,
      },
      onCreateOrSave: () => {},
    });
  }
  return (
    <>
      <Box sx={{ border: '1px solid #ccc' }}>
        <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
          <Image
            src={IMG_SRC}
            alt="Background of group"
            fill={true}
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </Box>
      </Box>

      <Paper>
        <Box sx={{ p: 2 }}>
          <Typography variant="h2" fontWeight={600} gutterBottom>
            Phòng ban {gid}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AvatarGroup max={20}>
              <Avatar src={IMG_SRC} />
              <Avatar src={IMG_SRC} />
              <Avatar src={IMG_SRC} />
              <Avatar src={IMG_SRC} />
              <Avatar src={IMG_SRC} />
              <Avatar src={IMG_SRC} />
            </AvatarGroup>
            <Button variant="contained" size="medium" onClick={handleInviteClick}>
              + Invite
            </Button>
          </Box>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Tabs value={tabIndex} onChange={handleTabChange}>
              {GROUP_TABS.map(({ label, href }) => (
                <Tab
                  key={label}
                  component={NextLink}
                  href={{ pathname: href, query: { gid } }}
                  label={label}
                />
              ))}
            </Tabs>
            <Box>
              <IconButton>
                <Search />
              </IconButton>
            </Box>
          </Stack>
        </Box>
      </Paper>
      <Box sx={{ my: '24px' }}>{children}</Box>
    </>
  );
}

export default GroupDetailLayout;
