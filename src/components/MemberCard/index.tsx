import Paper from '@mui/material/Paper';
import { withGroupDetailLayout } from 'layout';
import React, { useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SearchInput from 'components/SearchInput';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChatBubble from '@mui/icons-material/ChatBubble';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import Close from '@mui/icons-material/Close';
import { IoChatbubbleSharp } from 'react-icons/io5';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useGroupUsersQuery, useUserMeQuery, useUsersQuery } from 'queries';
import CircularProgress from 'components/CircularProgress';
import { Callback, GroupUser } from '@types';

interface MemberCardProps {
  data: GroupUser;
  subContent?: React.ReactNode;
  onCloseClick?: (data: GroupUser) => void;
}
function MemberCard({ data, subContent, onCloseClick }: MemberCardProps) {
  const userMeQuery = useUserMeQuery({ enabled: false });
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 10px', mb: 3 }}>
      <Avatar sx={{ width: 56, height: 56, fontSize: 24 }}>{data.name.charAt(0)}</Avatar>
      <Box>
        <Typography variant="h6" color="initial">
          {data.name}
        </Typography>
        {subContent && (
          <Typography variant="body2" fontSize={13} fontWeight={500}>
            {subContent}
          </Typography>
        )}
      </Box>
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: '0 8px' }}>
        {!Boolean(onCloseClick) && userMeQuery.data!.id !== data.id && (
          <Button startIcon={<IoChatbubbleSharp />} variant="contained" color="inherit">
            Message
          </Button>
        )}
        {!Boolean(onCloseClick) && (
          <Button
            sx={{ px: '0px', height: '36px', minWidth: '48px', '& .MuiButton-startIcon': { m: 0 } }}
            startIcon={<MoreHoriz />}
            variant="contained"
            color="inherit"
          />
        )}
        {Boolean(onCloseClick) && (
          <IconButton onClick={() => onCloseClick!(data)} color="inherit">
            <Close />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
export default React.memo(MemberCard);
