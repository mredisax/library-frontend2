import {
  Alert,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios, { AxiosError } from 'axios';
import { MuiTelInput } from 'mui-tel-input';
import { RegisterFormValidation } from './Register.types';
import {
  handleMailValidation,
  handlePassValidation,
  handlePassRptValidation,
  handleNameValidation,
  handleLastnameValidation,
  handlePhoneValidation,
} from '../../../core/textFieldValidators';

export const RegisterPage = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dispError, setDispError] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const [validation, setValidation] = React.useState<RegisterFormValidation>(
    new RegisterFormValidation()
  );

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!validation.isValid()) {
      setErrorMsg(`Popraw błędy w formularzu`);
      setDispError(true);
      return;
    }

    setLoading(true);
    axios
      .post('https://io.qqbit.pl/register', {
        email: validation.email.value,
        password: validation.pass.value,
        name: validation.name.value,
        lastname: validation.lastname.value,
        phone: validation.phone.value,
        address_id: 0, // TODO: change to select?
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err: AxiosError) => {
        setErrorMsg(`Błąd rejestracji: ${err.message}`);
        setDispError(true);
        setLoading(false);
      });
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
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          background: '#DDDDDD',
        }}
      >
        <Container>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h4">New account</Typography>
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

                <LoadingButton
                  size="small"
                  onClick={handleRegister}
                  loading={loading}
                  variant="contained"
                >
                  Register
                </LoadingButton>
                <Typography margin="normal">
                  Have an account?
                  <Link href="login" underline="always">
                    Login
                  </Link>
                </Typography>
                {dispError ? <Alert severity="error">{errorMsg}</Alert> : <></>}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
