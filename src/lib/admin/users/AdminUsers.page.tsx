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
} from '@mui/material';
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  handleMailValidation,
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

export const AdminUsersPage = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dispError, setDispError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const [validation, setValidation] = React.useState<RegisterFormValidation>(
    new RegisterFormValidation()
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleMailValidation(event.target.value, validation);
    setValidation({ ...validation });
  };

  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePassValidation(event.target.value, validation);
    setValidation({ ...validation });
  };

  const handlePassRptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlePassRptValidation(event.target.value, validation);
    setValidation({ ...validation });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleNameValidation(event.target.value, validation);
    setValidation({ ...validation });
  };

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleLastnameValidation(event.target.value, validation);
    setValidation({ ...validation });
  };

  const handlePhoneChange = (value: string) => {
    handlePhoneValidation(value, validation);
    setValidation({ ...validation });
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
                  placeholder="Search by username"
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
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
          <List>
            <ListItem
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={handleClickOpen}
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

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextField
                id="email"
                label="Email address"
                variant="outlined"
                value={validation.email.value}
                type={'email'}
                onChange={handleMailChange}
                error={validation.email.isErr}
                helperText={validation.email.errMsg}
              />

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={validation.pass.value}
                  error={validation.passRepeat.isErr}
                  onInput={handlePassChange}
                  sx={{ width: '100%' }}
                />
                <TextField
                  id="password-repeat"
                  label="Repeat password"
                  type="password"
                  variant="outlined"
                  value={validation.passRepeat.value}
                  onChange={handlePassRptChange}
                  error={validation.passRepeat.isErr}
                  helperText={validation.passRepeat.errMsg}
                  sx={{ width: '100%' }}
                />
              </Stack>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <TextField
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={validation.name.value}
                  onChange={handleNameChange}
                  error={validation.name.isErr}
                  helperText={validation.name.errMsg}
                  sx={{ width: '100%' }}
                />
                <TextField
                  id="lastname"
                  label="Lastname"
                  variant="outlined"
                  value={validation.lastname.value}
                  onChange={handleLastnameChange}
                  error={validation.lastname.isErr}
                  helperText={validation.lastname.errMsg}
                  sx={{ width: '100%' }}
                />
              </Stack>

              <MuiTelInput
                id="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                value={validation.phone.value}
                onChange={handlePhoneChange}
                defaultCountry="PL"
                inputProps={{ maxLength: '9' }}
                error={validation.phone.isErr}
                helperText={validation.phone.errMsg}
                disableFormatting
                forceCallingCode
                disableDropdown
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
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
        </AppBar>
      </Paper>
    </Paperbase>
  );
};
