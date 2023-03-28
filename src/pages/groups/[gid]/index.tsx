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
import React from 'react';
import ActiveLink from 'components/ActiveLink';
import PostCard from 'components/PostCard';
import dynamic from 'next/dynamic';
import { AppLayout, getGroupDetailLayout, withGroupDetailLayout } from 'layout';
import { useUsersNotInGroupQuery } from 'queries';
const DynamicPostCard = dynamic(() => import('../../../components/PostCard'), {
  ssr: false,
});

function GroupDetail() {
  const router = useRouter();
  const { gid } = router.query;
  const usersNotInGroupQuery = useUsersNotInGroupQuery(gid as string);

  return (
    <>
      <DynamicPostCard />
      <DynamicPostCard />
      <DynamicPostCard />
      <DynamicPostCard />
    </>
  );
}

export default GroupDetail;
//WARN: withGroupDetailLayout not working @@
GroupDetail.getNestedLayout = (page: React.ReactElement) => getGroupDetailLayout(page);
