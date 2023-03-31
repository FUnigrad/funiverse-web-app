import { useUserMeQuery } from 'queries';
import React from 'react';
import Avatar, { AvatarProps } from '@mui/material/Avatar';
import CircularProgress from 'components/CircularProgress';
import { UserMe } from '@types';

function UserAvatar({ ...props }: AvatarProps) {
  const userMeQuery = useUserMeQuery({ enabled: false });
  if (userMeQuery.isLoading) return <CircularProgress />;

  const { name } = userMeQuery.data as UserMe;
  return <Avatar {...props}>{name.charAt(0)}</Avatar>;
}

export default UserAvatar;
