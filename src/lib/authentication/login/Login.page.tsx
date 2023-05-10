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
import React from 'react';
import axios, { AxiosError } from 'axios';

export const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [dispError, setDispError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);

    axios
      .post('https://io.qqbit.pl/login', {
        email: mail,
        password: pass,
      })
      .then(() => {
        navigate('/home');
      })
      .catch((err: AxiosError) => {
        setErrorMsg(`Błąd logowania: ${err.message}`);
        setDispError(true);
        setLoading(false);
      });
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
      </Box>
    </>
  );
};
