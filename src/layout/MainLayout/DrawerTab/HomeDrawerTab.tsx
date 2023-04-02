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
import TextField from '@mui/material/TextField';
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
import React, { useEffect } from 'react';
import ActiveLink from 'components/ActiveLink';
import { useRouter } from 'next/router';
import ArrowCircleLeftOutlined from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlined from '@mui/icons-material/ArrowCircleRightOutlined';
import SearchInput from 'components/SearchInput';
import AddOutlined from '@mui/icons-material/AddOutlined';
import { useModalContext } from 'contexts/ModalContext';
import { IMG_SRC } from 'layout/GroupDetailLayout';
import { useLayoutContext } from 'contexts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateGroupMutation, useGroupsQuery } from 'queries';
import CircularProgress from 'components/CircularProgress';
import { BsPostcard } from 'react-icons/bs';
import { MdOutlineGroups } from 'react-icons/md';

const SIDE_BAR_MENU = [
  { label: 'Posts', href: '/' },
  // { label: 'Learning Path', href: '/learning-path' },
  // { label: 'Courses', href: '/courses' },
  // { label: 'Chats', href: '/chats' },
];
const SIDE_BAR_GROUPS = [
  { label: 'Group 1', href: '/groups/1' },
  { label: 'Group 2', href: '/groups/2' },
  { label: 'Group 3', href: '/groups/3' },
  { label: 'Group 4', href: '/groups/4' },
];
function HomeDrawerTab() {
  const theme = useTheme();
  const { dispatch } = useModalContext();
  const { sidebarOpen, setSidebarOpen } = useLayoutContext();
  const groupsQuery = useGroupsQuery();
  function handleCreateGroupClick() {
    dispatch({
      type: 'open',
      payload: {
        title: 'Create group',
        saveTitle: 'Create',
        content: () => <CreateGroupForm />,
      },
      onCreateOrSave: () => {},
    });
  }
  if (groupsQuery.isLoading) return <CircularProgress />;
  return (
    <>
      <Box sx={{ p: 2 }}>
        <SearchInput />
      </Box>
      <List
        component="div"
        subheader={
          <ListSubheader disableSticky sx={{ mb: 1, fontSize: 20, fontWeight: 700, color: '#000' }}>
            Home
          </ListSubheader>
        }
      >
        {SIDE_BAR_MENU.map(({ label, href }, index) => (
          <ListItem
            key={label}
            disablePadding
            sx={{ display: 'block' }}
            component={ActiveLink}
            href={href}
            activeClassName="active-link"
          >
            <ListItemButton
              sx={{ minHeight: 48, justifyContent: sidebarOpen ? 'initial' : 'center', px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: sidebarOpen ? 3 : 'auto', justifyContent: 'center' }}
              >
                <BsPostcard fontSize={24} color="#5569ff" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{
                  opacity: sidebarOpen ? 1 : 0,
                  '& .MuiTypography-root': {
                    fontWeight: '600',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader
            disableSticky
            sx={{ mb: 1, fontSize: '16px', fontWeight: 500, color: 'rgba(34, 51, 84)' }}
          >
            Groups
          </ListSubheader>
        }
      >
        {groupsQuery.data?.map(({ name, id }, index) => (
          <ListItem
            key={id}
            disablePadding
            sx={{ display: 'block' }}
            component={ActiveLink}
            href={`/groups/${id}`}
            activeClassName="active-link"
          >
            <ListItemButton
              sx={{ minHeight: 48, justifyContent: sidebarOpen ? 'initial' : 'center', px: 2.5 }}
            >
              <ListItemIcon
                sx={{ minWidth: 0, mr: sidebarOpen ? 3 : 'auto', justifyContent: 'center' }}
              >
                <MdOutlineGroups fontSize={24} color="#009198" />
              </ListItemIcon>
              <ListItemText
                primary={name}
                sx={{
                  opacity: sidebarOpen ? 1 : 0,
                  '& .MuiTypography-root': {
                    fontWeight: '600',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem
          disablePadding
          sx={{ display: 'block', color: theme.palette.primary.main }}
          onClick={handleCreateGroupClick}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: sidebarOpen ? 'initial' : 'center',
              px: 2.5,
              width: '100%',
            }}
            component={Button}
            color="primary"
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: sidebarOpen ? 3 : 'auto', justifyContent: 'center' }}
            >
              <AddOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={'Create group'}
              sx={{ opacity: sidebarOpen ? 1 : 0, color: 'inherit' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default HomeDrawerTab;

interface CreateGroupFormProps {
  defaultValues?: any;
}
const CreateGroupSchema = z.object({
  name: z.string().min(1),
});
type GroupFormInputs = z.infer<typeof CreateGroupSchema>;
type GroupFormBody = GroupFormInputs & { id?: number };
function CreateGroupForm({ defaultValues }: CreateGroupFormProps) {
  // const { dispatch, onConfirm, onCreateOrSave } = useContext(ModalContext);
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const mutation = useMutation<Group, unknown, typeof defaultValues, unknown>({
  //   mutationFn: (body) => (body.id ? groupApis.updateGroup(body) : groupApis.createGroup(body)),
  //   onSuccess: () => {
  //     toast.success(`${defaultValues?.id ? 'Update' : 'Create'} Group successfully!`);
  //     queryClient.invalidateQueries({ queryKey: [QueryKey.Groups, 'slug'] });
  //     if (!defaultValues?.id) {
  //       queryClient.invalidateQueries({ queryKey: [QueryKey.Groups] });
  //     }
  //     dispatch({ type: 'close' });
  //   },
  // });
  const {
    register,
    handleSubmit,
    control,
    watch,
    unregister,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const createGroupMutation = useCreateGroupMutation();

  function onSubmit(data: GroupFormInputs) {
    const body: GroupFormBody = {
      ...data,
    };
    if (defaultValues?.id) body.id = defaultValues.id;

    // mutation.mutate(body);
    createGroupMutation.mutate(body);
  }

  return (
    <>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        id="entityForm"
        autoComplete="off"
        noValidate
        sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, height: 80 }}
      >
        {
          <TextField
            label="Name"
            required
            error={Boolean(errors.name)}
            helperText={errors.name?.message as string}
            {...register('name')}
          />
        }
      </Box>
    </>
  );
}
