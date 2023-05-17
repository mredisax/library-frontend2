import {
  AppBar,
  Toolbar,
  Grid,
  Tooltip,
  IconButton,
  Avatar,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

import { IHeaderProps } from './Header.types';
import { useContext, useRef, useState } from 'react';
import { useLocalStorageUser } from '../localStorage';
import { UserContext } from '../context/UserContext';

const lightColor = 'rgba(255, 255, 255, 0.7)';

export const Header = (props: IHeaderProps) => {
  const { onDrawerToggle } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const { logout: localStorageLogout } = useLocalStorageUser();
  const { setUser, user } = useContext(UserContext);

  const logout = () => {
    localStorageLogout();
    setUser(null);
    setIsMenuOpen(false);
  };

  return (
    <AppBar color="primary" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Link
              href="/"
              variant="body2"
              sx={{
                textDecoration: 'none',
                color: lightColor,
                '&:hover': {
                  color: 'common.white',
                },
              }}
              rel="noopener noreferrer"
              target="_blank"
            >
              Regulamin
            </Link>
          </Grid>
          {/* <Grid item>
            <Tooltip title="Alerts • No alerts">
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Grid> */}
          {user && (
            <Grid item>
              <IconButton
                color="inherit"
                sx={{ p: 0.5 }}
                ref={profileButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Toolbar>

      <Menu
        anchorEl={profileButtonRef.current}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};
