import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Comment, CreatePostCommentPayload, Post } from '@types';
import Editor from 'components/Editor';
import UserAvatar from 'components/UserAvatar';
import dayjs from 'dayjs';
import { useWindowValue } from 'hooks';
import { useCreatePostCommentMutation, useUserMeQuery } from 'queries';
import { useEffect, useRef, useState } from 'react';
export default function PostCardHeader({ data }: { data: Post }) {
  const {
    owner: { name },
    createdDateTime,
  } = data;
  const formatCreatedDateTime = dayjs(createdDateTime).format('MMMM D [at] HH:mm');
  return (
    <Box sx={{ display: 'flex', gap: '0 8px', alignItems: 'center' }}>
      <Avatar>{name.charAt(0)}</Avatar>
      <Box>
        <Typography variant="h4" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2">{formatCreatedDateTime}</Typography>
      </Box>
    </Box>
  );
}
