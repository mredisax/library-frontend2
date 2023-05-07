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

export const RegisterPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [dispError, setDispError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passRepeat, setPassRepeat] = React.useState('');
  const [authors, setAuthors] = React.useState([]);

  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);

    axios
      .post('http://localhost:2137/register', {
        email,
        password,
        name,
        lastname,
        phone,
        address_id,
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

  axios
    .get('http://localhost:2137/author')
    .then((resAuthors) => {
      setAuthors(resAuthors);
    })
    .catch((err) => {});

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
                <TextField
                  id="password-repeat"
                  label="Repeat password"
                  type="password"
                  variant="outlined"
                  value={pass}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(event.target.value);
                  }}
                />
                <TextField
                  id="lastname"
                  label="lastname"
                  variant="outlined"
                  value={pass}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(event.target.value);
                  }}
                />
                <TextField
                  id="phone"
                  label="phone"
                  variant="outlined"
                  value={pass}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(event.target.value);
                  }}
                />

                <TextField
                  id="name"
                  label="name"
                  variant="outlined"
                  value={pass}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPass(event.target.value);
                  }}
                />

                <LoadingButton
                  size="small"
                  onClick={handleRegister}
                  loading={loading}
                  variant="contained"
                >
                  Register
                </LoadingButton>
                {dispError ? <Alert severity="error">{errorMsg}</Alert> : <></>}
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
