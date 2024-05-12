import React, {useState} from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Link,
  CircularProgress
} from '@mui/material';

import {useSelector} from 'react-redux';
import {registration} from './usersThunk.ts';
import {errorRegistration, loadingRegistration} from './usersSlice.ts';
import {useAppDispatch} from '../../src/app/hooks.ts';

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationMutation} from '../types/user.types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from '../components/FileInput/FileInput';
import {routes} from "../constants.routes.ts";
import PhoneInput from 'react-phone-input-2'

import 'react-phone-input-2/lib/material.css'

const RegisterForm = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useSelector(errorRegistration);

  const isRegistration = useSelector(loadingRegistration);



  const [register, setRegister] = useState<RegistrationMutation>({
    username: '',
    firstName: '',
    lastName: '',
    surName: '',
    phoneNumber: '',
    displayName: '',
    email: '',
    password: '',
    avatar: null,
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegister(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const phoneInput = (value: string) => {
    setRegister(prevState => {
      return {
        ...prevState, phoneNumber: value
      };
    });
  };


  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(registration(register)).unwrap();
      navigate('/');
    } catch (e) {
      //error
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setRegister(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
      <>
        <Container maxWidth="sm">
          <CssBaseline/>
          <Box
              sx={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                      required
                      id="firstName"
                      type="firstName"
                      name="firstName"
                      value={register.firstName}
                      label="Имя"
                      onChange={inputChange}
                      error={Boolean(getFieldError('firstName'))}
                      helperText={getFieldError('firstName')}
                      margin="normal"
                      autoComplete="new-firstName"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      required
                      id="lastName"
                      type="lastName"
                      name="lastName"
                      value={register.lastName}
                      label="Фамилия"
                      onChange={inputChange}
                      error={Boolean(getFieldError('lastName'))}
                      helperText={getFieldError('lastName')}
                      margin="normal"
                      autoComplete="new-lastName"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      id="surName"
                      type="surName"
                      name="surName"
                      value={register.surName}
                      label="Отчество"
                      onChange={inputChange}
                      error={Boolean(getFieldError('surName'))}
                      helperText={getFieldError('surName')}
                      margin="normal"
                      autoComplete="new-surName"
                      autoFocus
                  />
                </Grid>
              </Grid>
              <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  name="email"
                  value={register.email}
                  label="E-mail"
                  onChange={inputChange}
                  error={Boolean(getFieldError('email'))}
                  helperText={getFieldError('email')}
                  margin="normal"
                  autoComplete="new-email"
                  autoFocus
              />
              <TextField
                  required
                  fullWidth
                  id="username"
                  type="username"
                  name="username"
                  value={register.username}
                  label="Введите ваш никнейм"
                  onChange={inputChange}
                  error={Boolean(getFieldError('username'))}
                  helperText={getFieldError('username')}
                  margin="normal"
                  autoComplete="new-username"
                  autoFocus
              />

              <PhoneInput
                  country="kg"
                  masks={{
                    kg: '(...) ..-..-..',
                    ru: '(...) ...-..-..',
                    uz: '(...) ...-..-..',
                    kz: '(...) ..-....',
                    by: '(...) ...-..-..',
                    tj: '(....) .-..-..'
              }}
                  onlyCountries={['kg', 'ru', 'uz', 'kz', 'by', 'tj']}
                  value={register.phoneNumber}
                  onChange={phoneInput}
                  specialLabel="Введите номер телефона*"
              />

              {/*<TextField*/}
              {/*    // required*/}
              {/*    fullWidth*/}
              {/*    id="phoneNumber"*/}
              {/*    type="phoneNumber"*/}
              {/*    name="phoneNumber"*/}
              {/*    value={register.phoneNumber}*/}
              {/*    label="Введите номер телефона"*/}
              {/*    onChange={inputChange}*/}
              {/*    error={Boolean(getFieldError('phoneNumber'))}*/}
              {/*    helperText={getFieldError('phoneNumber')}*/}
              {/*    margin="normal"*/}
              {/*    autoComplete="new-phoneNumber"*/}
              {/*    autoFocus*/}
              {/*/>*/}

              <TextField
                  // required
                  fullWidth
                  id="password"
                  type="password"
                  name="password"
                  value={register.password}
                  label="Введите пароль"
                  onChange={inputChange}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                  margin="normal"
                  autoComplete="new-password"
              />
              <Grid item xs marginTop={1}>
                <FileInput
                    label="Enter your avatar"
                    name="avatar"
                    onChange={fileInputChangeHandler}
                />
              </Grid>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2}}
                  disabled={isRegistration}
              >
                {isRegistration ? <CircularProgress/> : 'Регистрация'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to={routes.login} variant="body2">
                    у вас есть аккаунт? Можете войти!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>

      </>
  );
};

export default RegisterForm;