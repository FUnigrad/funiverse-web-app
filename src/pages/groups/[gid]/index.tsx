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
import React, { useEffect, useState } from 'react';
import ActiveLink from 'components/ActiveLink';
import PostCard from 'components/PostCard';
import dynamic from 'next/dynamic';
import { AppLayout, getGroupDetailLayout, withGroupDetailLayout } from 'layout';
import {
  useCreatePostMutation,
  useGroupDetailQuery,
  useGroupPostsQuery,
  useUserMeQuery,
  useUsersNotInGroupQuery,
} from 'queries';
import { useWindowValue } from 'hooks/useWindowValue';
import { useModalContext } from 'contexts';
import Editor from 'components/Editor';
import { Callback, CreatePostPayload } from '@types';
import { useRefState } from 'hooks';
// const DynamicPostCard = dynamic(() => import('../../../components/PostCard'), { ssr: false });

function GroupDetail() {
  const router = useRouter();
  const { gid } = router.query as { gid: string };

  const usersNotInGroupQuery = useUsersNotInGroupQuery(gid);
  const groupDetailQuery = useGroupDetailQuery(gid);
  const groupPostsQuery = useGroupPostsQuery(gid);
  return (
    <Box>
      <PostWrite />
      {groupPostsQuery.data?.map((post, index) => (
        <PostCard key={index} data={post} />
      ))}
    </Box>
  );
}

export default GroupDetail;
//WARN: withGroupDetailLayout not working @@
GroupDetail.getNestedLayout = (page: React.ReactElement) => getGroupDetailLayout(page);

function PostWrite() {
  const router = useRouter();
  const { gid } = router.query;
  const { dispatch } = useModalContext();
  const screenWidth = useWindowValue({ path: 'screen.width', initialValue: 1200 });
  const [editorValueRef, setEditorValue] = useRefState('');

  const userMeQuery = useUserMeQuery();
  const createPostMutation = useCreatePostMutation();

  function handleOnEditerChange(value: string) {
    setEditorValue(value);
  }

  function handleWritePostClick() {
    dispatch({
      type: 'open',
      payload: {
        title: 'Create post',
        saveTitle: 'Post',
        content: () => (
          <Box sx={{ height: 300 }}>
            <Editor onChange={handleOnEditerChange} autoFocus />
          </Box>
        ),
      },
      onCreateOrSave: () => {
        const body: CreatePostPayload = {
          content: editorValueRef.current,
          groupId: +(gid as string),
          ownerId: userMeQuery.data!.id,
        };
        createPostMutation.mutate(body);
      },
    });
  }
  return (
    <Paper sx={{ mb: 3, width: `calc((${screenWidth}px - 240px) / 2)`, mx: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 10px' }}>
        <Avatar>N</Avatar>
        <Box
          onClick={handleWritePostClick}
          sx={{
            cursor: 'pointer',
            borderRadius: '20px',
            p: '12.5px',
            pl: 2,
            flexGrow: 1,
            backgroundColor: '#F0F2F5',
            color: '#1c1e21',
            userSelect: 'none',
            '&:hover': { backgroundColor: 'rgba(228, 230, 232, 0.7)' },
            '&:active': { backgroundColor: 'rgb(228, 230, 232)' },
            fontSize: 14,
          }}
        >
          Write something...
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
    </Paper>
  );
}
