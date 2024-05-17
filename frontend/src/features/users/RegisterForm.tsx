import React, {useState} from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link,  CircularProgress } from '@mui/material';

import {useSelector} from 'react-redux';
import {registration} from './usersThunk.ts';
import {errorRegistration, loadingRegistration} from './usersSlice.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';

import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegistrationMutation} from '../../types/user.types';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from '../../components/FileInput/FileInput.tsx';
import {routes} from "../../constants/constantsPage.routes.ts";

import {MuiTelInput} from 'mui-tel-input'
import {badWords} from "../../utils/badword.library.ts";

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isRegistration = useSelector(loadingRegistration);
    const error = useAppSelector(errorRegistration);

    const [passLabel, setPassLabel] = useState<string>('Не используйте короткие пароли!');
    const [isValidPass, setValidPass] = useState<boolean | undefined>(undefined);

    const [userNameLabel, setUserNameLabel] = useState<string>('Введите имя которое будет отображатся при входе на сайт');
    const [nickNameValid, setNameValid] = useState<boolean | undefined>(undefined);

    const [phoneLabel, setPhoneLabel] = useState<string>('Выберите телефонный код вашей страны и введите номер');
    const [isValidPhone, setValidPhone] = useState<boolean | undefined>(undefined)

    const [register, setRegister] = useState<RegistrationMutation>({
        username: '',
        firstName: '',
        lastName: '',
        surName: '',
        phoneNumber: '',
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
            if (register.password.length >= 1 && register.password.length < 8) {
                setPassLabel('Пароль слишком короткий');
                setValidPass(false);
                return;
            }

            if (badWords.check(register.username)) {
                setUserNameLabel('В ваших данных присутствует не нормативная лексика!');
                setNameValid(false);
                return;
            }

            if (register.phoneNumber.length > 18) {
                setPhoneLabel('Слишком большой номер!')
                setValidPhone(false)
                return;
            }
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
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{m: 1, bgColor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация
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
                                    margin="normal"
                                    autoComplete="new-surName"/>
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
                            error={Boolean(getFieldError('username') || nickNameValid === false)}
                            helperText={getFieldError('username') ? getFieldError('username') : userNameLabel}
                            margin="normal"
                            autoComplete="new-username"
                        />
                        <TextField
                            required
                            fullWidth
                            id="password"
                            type="password"
                            name="password"
                            value={register.password}
                            label="Введите пароль"
                            onChange={inputChange}
                            error={Boolean(getFieldError('password') || isValidPass === false)}
                            helperText={getFieldError('password') ? getFieldError('password') : passLabel}
                            margin="normal"
                            autoComplete="new-password"
                        />
                        <MuiTelInput
                            required
                            fullWidth
                            defaultCountry="KG"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={register.phoneNumber}
                            onChange={phoneInput}
                            error={Boolean(getFieldError('phoneNumber') || isValidPhone === false)}
                            helperText={getFieldError('phoneNumber') ? getFieldError('phoneNumber') : phoneLabel}
                            margin="normal"
                            autoComplete="new-phoneNumber"
                            label="Введите номер телефона"
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