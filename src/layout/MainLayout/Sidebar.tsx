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
import HomeDrawerTab from './DrawerTab/HomeDrawerTab';
import { useLayoutContext } from 'contexts';
import NotificationsDrawerTab from './DrawerTab/NotificationsDrawerTab';
import ChatsDrawerTab from './DrawerTab/ChatsDrawerTab';
import { IoChatbubbleOutline, IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineHome } from 'react-icons/ai';
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

enum TabDrawerIndexEnum {
  Home,
  Notifications,
  Chats,
}

const TAB_MENU = [
  // { icon: <HomeOutlined fontSize="large" /> },
  { icon: <AiOutlineHome fontSize="35px" /> },
  { icon: <IoNotificationsOutline fontSize="35px" /> },
  { icon: <IoChatbubbleOutline fontSize="35px" /> },
];
const drawerWidth = 300;
const drawerTabWidth = 90;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  left: `${drawerTabWidth + 1}px`,
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  // width: `calc(${theme.spacing(7)} + 1px)`,
  width: 0,
  [theme.breakpoints.up('sm')]: {
    // width: `calc(${theme.spacing(8)} + 1px)`,
    width: 0,
  },
  zIndex: 6,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const DrawerTab = styled(MuiDrawer)(({ theme }) => ({
  width: drawerTabWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: 10,
  '& .MuiDrawer-paper': {
    zIndex: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    paddingBottom: '16px',
    width: 90,
  },
}));
function Sidebar() {
  const [tabIndex, setTabIndex] = React.useState<TabDrawerIndexEnum>(TabDrawerIndexEnum.Home);
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();

  function handleDrawerToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  function handleTabChange(event: React.SyntheticEvent, newTabIndex: number) {
    setTabIndex(newTabIndex);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <DrawerTab variant="permanent">
        <Tabs orientation="vertical" value={tabIndex} onChange={handleTabChange} aria-label="">
          {TAB_MENU.map(({ icon }, index) => (
            <Tab
              key={index}
              icon={icon}
              sx={{
                width: 86,
                height: 60,
                ':hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  transition: 'background-color .1s linear',
                },
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ mb: 4 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ width: '40px', marginTop: 8 }}>
            {sidebarOpen ? <ArrowCircleLeftOutlined /> : <ArrowCircleRightOutlined />}
          </IconButton>
        </Box>
        <Box>
          <IconButton size="medium">
            <Avatar src={IMG_SRC} sx={{ width: 42, height: 42 }} />
          </IconButton>
        </Box>
      </DrawerTab>
      <Drawer variant="permanent" open={sidebarOpen}>
        {/* <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </DrawerHeader> */}
        {tabIndex === TabDrawerIndexEnum.Home && <HomeDrawerTab />}
        {tabIndex === TabDrawerIndexEnum.Notifications && <NotificationsDrawerTab />}
        {tabIndex === TabDrawerIndexEnum.Chats && <ChatsDrawerTab />}
      </Drawer>
    </Box>
  );
}

export default Sidebar;
