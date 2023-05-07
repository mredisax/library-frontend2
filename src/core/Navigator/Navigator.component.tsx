import {
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  DrawerProps,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { categories, item, itemCategory } from './constants';

export const Navigator = (props: DrawerProps) => {
  const { ...other } = props;
  const location = useLocation();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}
        >
          Library
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
              <Link to={to} style={{ textDecoration: 'none' }} key={childId}>
                <ListItem disablePadding>
                  <ListItemButton selected={location.pathname === to} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};
