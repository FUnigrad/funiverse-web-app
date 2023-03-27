import Paper from '@mui/material/Paper';
import { withGroupDetailLayout } from 'layout';
import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SearchInput from 'components/SearchInput';
import { Avatar, Button, IconButton } from '@mui/material';
import ChatBubble from '@mui/icons-material/ChatBubble';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { IoChatbubbleSharp } from 'react-icons/io5';
import dayjs from 'dayjs';
function MembersPage() {
  return (
    <Paper sx={{ width: 568, mx: 'auto', p: 2 }}>
      <SectionHeader amount={2} subContent="View and find new and existing members of the group.">
        Members
      </SectionHeader>
      <SearchInput placeholder="Find a member" />
      <Divider sx={{ my: 3 }} />
      <SectionHeader amount={1}>Admins & moderators</SectionHeader>

      <MemberCard isAdmin />

      <SectionHeader>
        Recently added
        <Typography variant="body2" fontSize={13}>
          Newest members of the group appear first. This list also includes people who have been
          invited and who are previewing the group.
        </Typography>
      </SectionHeader>
      <MemberCard subContent={`Joined about ${dayjs().subtract(32, 'day').fromNow()}`} />
      <MemberCard subContent={'Added by nguyenthpde150009 today'} />
      <MemberCard subContent={'Created group on March 16, 2023'} />
    </Paper>
  );
}

export default withGroupDetailLayout(MembersPage);

function MemberCard({
  subContent,
  isAdmin = false,
}: {
  subContent?: React.ReactNode;
  isAdmin?: boolean;
}) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 10px', mb: 3 }}>
      <Avatar sx={{ width: 56, height: 56, fontSize: 24 }}>N</Avatar>
      <Box>
        <Typography variant="h6" color="initial">
          Nguyen Tran
        </Typography>
        {subContent && (
          <Typography variant="body2" fontSize={13} fontWeight={500}>
            {subContent}
          </Typography>
        )}
      </Box>
      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: '0 8px' }}>
        {!isAdmin && (
          <Button startIcon={<IoChatbubbleSharp />} variant="contained" color="inherit">
            Message
          </Button>
        )}
        <Button
          sx={{ px: '0px', height: '36px', minWidth: '48px', '& .MuiButton-startIcon': { m: 0 } }}
          startIcon={<MoreHoriz />}
          variant="contained"
          color="inherit"
        ></Button>
        {/* <IconButton color="inherit">
          <MoreHoriz />
        </IconButton> */}
      </Box>
    </Box>
  );
}
function SectionHeader({
  children,
  amount,
  subContent,
}: {
  children: React.ReactNode;
  amount?: number;
  subContent?: string;
}) {
  return (
    <Box>
      <Typography variant="h4" color="initial" fontWeight={600}>
        {children}
        {amount && (
          <span color="inherit" style={{ fontWeight: '500' }}>
            {' '}
            · {amount}
          </span>
        )}
      </Typography>
      <Typography variant="body2" fontSize={16} sx={{ mb: 2 }}>
        {subContent}
      </Typography>
    </Box>
  );
}
