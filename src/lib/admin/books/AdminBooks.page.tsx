import {
  AppBar,
  Toolbar,
  Paper,
  Grid,
  TextField,
  Tooltip,
  IconButton,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  handlePassValidation,
  handlePassRptValidation,
  handleNameValidation,
  handleLastnameValidation,
  handlePhoneValidation,
} from '../../../core/textFieldValidators';
import { Paperbase } from '../../../core';
import React from 'react';
import { MuiTelInput } from 'mui-tel-input';
import { LoadingButton } from '@mui/lab';
import { RegisterFormValidation } from '../../authentication/register/Register.types';

export const AdminBooksPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] = React.useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = React.useState(false);
  const [snackbarSuccessMsg, setSnackbarSuccessMsg] = React.useState('');
  const [snackbarErrorMsg, setSnackbarErrorMsg] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dispError, setDispError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const [validation, setValidation] = React.useState<RegisterFormValidation>(
    new RegisterFormValidation()
  );

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleEdit = () => {
    setSnackbarErrorOpen(true);
    setSnackbarErrorMsg('Edit not implemented!');
  };

  const handleClickDeleteUser = () => {
    setSnackbarSuccessOpen(true);
    setSnackbarSuccessMsg('Edit not implemented, but still its success');
  };

  const handleCloseSnackbarSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarSuccessOpen(false);
  };

  const handleCloseSnackbarError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarErrorOpen(false);
  };

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
                  placeholder="Search by title"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add book
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleClickDeleteUser}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={handleClickOpenDialog}
                >
                  <EditIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" />
          </ListItem>
        </List>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>User edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit fields or leave blank for no action.
            </DialogContentText>
            <Stack spacing={1}></Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <LoadingButton
              size="small"
              onClick={handleEdit}
              loading={loading}
              variant="contained"
            >
              Edit
            </LoadingButton>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarSuccessOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbarSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbarSuccess}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarSuccessMsg}
          </Alert>
        </Snackbar>

        <Snackbar
          open={snackbarErrorOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbarError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseSnackbarError}
            severity="error"
            sx={{ width: '100%' }}
          >
            {snackbarErrorMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </Paperbase>
  );
};
