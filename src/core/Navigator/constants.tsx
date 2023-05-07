import {
  Home as HomeIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

export const categories = [
  {
    id: 'Main',
    children: [
      {
        id: 'Home',
        icon: <HomeIcon />,
        to: '/',
      },
      { id: 'User panel', icon: <PersonIcon />, to: '/user' },
    ],
  },
  {
    id: 'Manage',
    children: [
      { id: 'Admin panel', icon: <AdminPanelSettingsIcon />, to: '/admin' },
    ],
  },
];

export const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

export const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};
