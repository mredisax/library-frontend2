import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  TextField,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { Paperbase } from '../../core';

export const HomePage = () => {
  return (
    <Paperbase>
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search through books by title or author"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton>
                    <SearchIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          <h1>Home</h1>
        </Typography>
      </Paper>
    </Paperbase>
  );
};
