import AccountCircle from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlined from '@mui/icons-material/ChatBubbleOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
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
import ListSubheader from '@mui/material/ListSubheader';
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
import React from 'react';
import ActiveLink from 'components/ActiveLink';
import { useRouter } from 'next/router';
import ArrowCircleLeftOutlined from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlined from '@mui/icons-material/ArrowCircleRightOutlined';
import SearchInput from 'components/SearchInput';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { useModalContext } from 'contexts/ModalContext';
import { IMG_SRC } from 'layout/GroupDetailLayout';
import { useLayoutContext } from 'contexts';
const SIDE_BAR_MENU = [
  { label: 'Posts', href: '/' },
  { label: 'Learning Path', href: '/learning-path' },
  { label: 'Courses', href: '/courses' },
  { label: 'Chats', href: '/chats' },
];
const SIDE_BAR_GROUPS = [
  { label: 'Group 1', href: '/groups/1' },
  { label: 'Group 2', href: '/groups/2' },
  { label: 'Group 3', href: '/groups/3' },
  { label: 'Group 4', href: '/groups/4' },
];
function HomeDrawerTab() {
  const theme = useTheme();
  const { dispatch } = useModalContext();
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  function handleCreateGroupClick() {
    dispatch({
      type: 'open',
      payload: {
        title: 'Create Group',
        content: () => <div>test</div>,
      },
      onCreateOrSave: () => {},
    });
  }
  return (
    <>
      <Box sx={{ p: 2 }}>
        <SearchInput />
      </Box>
      <List
        component="div"
        subheader={
          <ListSubheader disableSticky sx={{ mb: 1, fontSize: 20, fontWeight: 700, color: '#000' }}>
            Home
          </ListSubheader>
        }
      >
        {SIDE_BAR_MENU.map(({ label, href }, index) => (
          <ListItem
            key={label}
            disablePadding
            sx={{ display: 'block' }}
            component={ActiveLink}
            href={href}
            activeClassName="active-link"
          >
            <ListItemButton
              sx={{ minHeight: 48, justifyContent: sidebarOpen ? 'initial' : 'center', px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: sidebarOpen ? 3 : 'auto', justifyContent: 'center' }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader disableSticky sx={{ mb: 1, fontSize: '16px', fontWeight: 500 }}>
            Groups
          </ListSubheader>
        }
      >
        {SIDE_BAR_GROUPS.map(({ label, href }, index) => (
          <ListItem
            key={label}
            disablePadding
            sx={{ display: 'block' }}
            component={ActiveLink}
            href={href}
            activeClassName="active-link"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: sidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: sidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ opacity: sidebarOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding
          sx={{ display: 'block', color: theme.palette.primary.main }}
          onClick={handleCreateGroupClick}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: sidebarOpen ? 'initial' : 'center',
              px: 2.5,
              width: '100%',
            }}
            component={Button}
            color="primary"
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: sidebarOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AddOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={'Create group'}
              sx={{ opacity: sidebarOpen ? 1 : 0, color: 'inherit' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default HomeDrawerTab;
