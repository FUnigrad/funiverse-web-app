import ArrowRight from '@mui/icons-material/ArrowRight';
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
import { useRouter } from 'next/router';
import { useCreatePostCommentMutation, useUserMeQuery } from 'queries';
import { useEffect, useRef, useState } from 'react';
import { FaCaretRight } from 'react-icons/fa';
export default function PostCardHeader({
  data,
  visibleGroup = false,
}: {
  data: Post;
  visibleGroup?: boolean;
}) {
  const {
    owner: { name, id: ownerId },
    createdDateTime,
    group,
  } = data;
  const router = useRouter();
  const userMeQuery = useUserMeQuery({ enabled: false });

  const formatCreatedDateTime = dayjs(createdDateTime).format('MMMM D [at] HH:mm');

  const currentUserId = userMeQuery.data?.id;
  const nameLinkHref = currentUserId === ownerId ? '/me' : `/user/${ownerId}`;

  return (
    <Box sx={{ display: 'flex', gap: '0 8px', alignItems: 'center' }}>
      <Avatar sx={{ cursor: 'pointer' }} onClick={() => router.push(nameLinkHref)}>
        {name.charAt(0)}
      </Avatar>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h4"
            fontWeight={600}
            component={Link}
            href={nameLinkHref}
            sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {name}
          </Typography>
          {visibleGroup && (
            <>
              <FaCaretRight fontSize={18} style={{ transform: 'translateY(1px)' }} />
              <Typography
                sx={{
                  transition: 'all .1s linear',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                variant="h4"
                fontWeight={600}
                component={Link}
                href={`/groups/${group.id}`}
              >
                {group.name}
              </Typography>
            </>
          )}
        </Box>
        <Typography variant="body2">{formatCreatedDateTime}</Typography>
      </Box>
    </Box>
  );
}
