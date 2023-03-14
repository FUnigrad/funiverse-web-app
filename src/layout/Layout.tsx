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
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
const SIDE_BAR_MENU = [
  { label: 'Groups', href: '/groups' },
  { label: 'Learning Path', href: '/learning-path' },
  { label: 'Courses', href: '/courses' },
  { label: 'Chats', href: '/chats' },
];
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
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

const TabDrawer = styled(MuiDrawer)(() => ({}));

//L-TODO: Refactor this component to Header and Sidebar
function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { pathname } = useRouter();
  const trigger = useScrollTrigger({
    //Height: header + background + groundInfoheader = 64 + 400 + btw(188)
    threshold: 550,
  });
  const isRenderSubHeader = pathname.includes('groups') && trigger;
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderMenu = (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      // id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Funiverse
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
          {renderMenu}
        </AppBar> */}
        {isRenderSubHeader ? (
          <div>123</div>
        ) : // <Box
        //   sx={{
        //     position: 'absolute',
        //     top: theme.mixins.toolbar.height,
        //     left: open ? 0 : theme.spacing(8),
        //     right: 0,
        //     border: '1px solid red',
        //     height: 60,
        //     // p: 2,
        //     pl: 2,
        //     pr: 2,
        //     backgroundColor: 'inherit',
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'space-between',
        //   }}
        // >
        //   <Stack
        //     direction="row"
        //     justifyContent="space-between"
        //     alignItems="center"
        //     flex={1}
        //     sx={{ height: '100%' }}
        //   >
        //     {/* <Tabs value={value} onChange={handleChange}>
        //         <Tab component={NextLink} href="/#home" label="Home" />
        //         <Tab component={NextLink} href="/#featured" label="Featured" />
        //       </Tabs> */}
        //     <Typography
        //       variant="subtitle1"
        //       color="info"
        //       sx={{
        //         flexBasis: '70%',
        //         textAlign: 'left',
        //         userSelect: 'none',
        //         cursor: 'pointer',
        //         pl: 2,
        //         transition: '.1s ease-in',
        //         height: '100%',
        //         display: 'flex',
        //         alignItems: 'center',
        //         ':hover': {
        //           backgroundColor: '#ccc',
        //         },
        //       }}
        //       onClick={() => {
        //         window.scrollTo({ top: 0, behavior: 'smooth' });
        //       }}
        //     >
        //       Group Name
        //     </Typography>
        //     <Box>
        //       <IconButton>
        //         <Search />
        //       </IconButton>
        //     </Box>
        //   </Stack>
        // </Box>
        null}
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, position: 'relative' }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default Layout;
