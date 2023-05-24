import {
  Alert,
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import { Box, Container, Stack } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { UserContext } from '../../../core/context/UserContext';
import { serverAddress } from '../../../core/config/server';
import { useLocalStorageUser } from '../../../core/localStorage';

export const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [dispError, setDispError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const { setUser } = useContext(UserContext);
  const { saveUserToLocalStorage } = useLocalStorageUser();

  const handleLogin = () => {
    setLoading(true);

    axios
      .post(
        `${serverAddress}/auth/login`,
        {
          email: mail,
          password: pass,
        },
        { validateStatus: (status) => status < 500 }
      )
      .then((res) => {
        if (res.status === 200) {
          saveUserToLocalStorage(res.data.user);
          setUser(res.data.user);
          setLoading(false);
        } else {
          setErrorMsg(`Błąd logowania: ${res.statusText}`);
          setDispError(true);
          setLoading(false);
        }
      })
      .catch((err: AxiosError) => {
        setErrorMsg(`Błąd logowania: ${err.message}`);
        setDispError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Container>
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Hello, please login</Typography>
              <TextField
                id="email"
                label="Email address"
                variant="outlined"
                value={mail}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setMail(event.target.value);
                }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={pass}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPass(event.target.value);
                }}
              />
              <LoadingButton
                size="small"
                onClick={handleLogin}
                loading={loading}
                variant="contained"
              >
                Login
              </LoadingButton>
              <Typography margin="normal">
                No account?
                <Link href="register" underline="always">
                  Register
                </Link>
              </Typography>
              {dispError ? <Alert severity="error">{errorMsg}</Alert> : <></>}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};
