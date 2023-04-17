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
import Link from 'next/link';
import { useCreatePostCommentMutation, useUserMeQuery } from 'queries';
import { useEffect, useRef, useState } from 'react';
const defaultButtonStyle: ButtonProps = {
  size: 'small',
  variant: 'text',
  sx: {
    ':hover': {
      backgroundColor: 'unset',
      textDecoration: 'underline',
    },
    color: '#65676B',
    fontWeight: 600,
    width: 'fit-content',
    minWidth: 'unset',
    height: '20px',
    p: 0,
  },
  disableTouchRipple: true,
};
export default function PostComment({ data }: { data: Comment }) {
  const { owner, content, createdDateTime } = data;
  const formatCreatedDate = dayjs(createdDateTime).fromNow();

  const userMeQuery = useUserMeQuery({ enabled: false });

  const currentUserId = userMeQuery.data?.id;
  const nameLinkHref = currentUserId === owner.id ? '/me' : `/user/${owner.id}`;

  return (
    <Box sx={{ marginTop: 2 }}>
      <Box sx={{ display: 'flex', gap: '0 8px' }}>
        <UserAvatar sx={{ width: 32, height: 32 }} user={owner} />
        <Box>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F2F3F5',
              p: 1,
              pr: 2,
              pt: 0.5,
              borderRadius: 4,
            }}
          >
            <Typography
              variant="body1"
              fontWeight={600}
              component={Link}
              href={nameLinkHref}
              sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {owner.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: content.replaceAll('&nbsp;', ' ') ?? '' }}
            />
          </Paper>
          <ButtonGroup>
            <Button {...defaultButtonStyle}>Like</Button>
            <Button {...defaultButtonStyle}>Reply</Button>
            <Button
              {...defaultButtonStyle}
              sx={{ ...defaultButtonStyle.sx, fontWeight: 400, ml: '12px !important' }}
            >
              {formatCreatedDate}
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
