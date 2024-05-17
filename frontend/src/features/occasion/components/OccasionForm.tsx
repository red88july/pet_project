import React, {useState} from 'react';
import {
    Box,
    Button, CardMedia, CircularProgress,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import FileInput from '../../../components/FileInput/FileInput';
import {selectUser} from "../../users/usersSlice.ts";
import {OccasionMutation} from "../../../types/occasion.types";
import {occasionCreate} from "../occasionThunk.ts";
import {isErrorLoadingOccasions, isLoadingOccasion} from "../occasionSlice.ts";
import picturePlanner from '../../../../src/assets/images/ic-planner.png';
import {checkForBadWords} from "../../../utils/BadWordCheck.ts";

const OccasionForm = () => {
    const user = useSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(isErrorLoadingOccasions);
    const loading = useAppSelector(isLoadingOccasion);

    const [occasion, setOccasion] = useState<OccasionMutation>({
        user: user?._id,
        city: '',
        address: '',
        location: '',
        title: '',
        date: '',
        time: '',
        price: '',
        description: '',
        restrictions: '',
        duration: '',
        category: '',
        image: null,
    });

    const [priceLabel, setPriceLabel] = useState<string>('');
    const [isValidPrice, setValidPrice] = useState<boolean | undefined>(undefined);

    const [validateTitle, setValidateTitle] = useState<string>('');
    const [validateLocation, setValidateLocation] = useState<string>('');
    const [validateAddress, setValidateAddress] = useState<string>('');
    const [validateCity, setValidateCity] = useState<string>('');
    const [validateDescription, setValidateDescription] = useState<string>('');
    const [validateCategory, setValidateCategory] = useState<string>('');

    const [titleValid, setTitleValid] = useState<boolean | undefined>(undefined);
    const [locationValid, setLocationValid] = useState<boolean | undefined>(undefined);
    const [addressValid, setAddressValid] = useState<boolean | undefined>(undefined);
    const [cityValid, setCityValid] = useState<boolean | undefined>(undefined);
    const [descriptionValid, setDescriptionValid] = useState<boolean | undefined>(undefined);
    const [categoryValid, setCategoryValid] = useState<boolean | undefined>(undefined);

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        if (occasion.price.length > 5) {
            setPriceLabel('Цена превышает максимальное число символов')
            setValidPrice(false)
        }

        const isBadWord = checkForBadWords(name, value);

        if (name === 'title') {
            setTitleValid(!isBadWord);
            setValidateTitle(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }
        if (name === 'location') {
            setLocationValid(!isBadWord);
            setValidateLocation(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }
        if (name === 'city') {
            setCityValid(!isBadWord);
            setValidateCity(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }
        if (name === 'address') {
            setAddressValid(!isBadWord);
            setValidateAddress(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }
        if (name === 'description') {
            setDescriptionValid(!isBadWord);
            setValidateDescription(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }
        if (name === 'category') {
            setCategoryValid(!isBadWord);
            setValidateCategory(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }

        setOccasion(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(occasionCreate(occasion)).unwrap();
            navigate('/');
        } catch (e) {
            //error
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setOccasion(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    return (
        <>
            <Container maxWidth="md">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 7,
                    }}>
                    <CardMedia
                        component="img"
                        alt='Картинка календаря'
                        sx={{width: 100}}
                        image={picturePlanner}
                    />
                    <Typography component="h1" variant="h5">
                        Форма добавления мероприятия
                    </Typography>
                    <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
                        <TextField
                            required
                            fullWidth
                            id="title"
                            type="title"
                            name="title"
                            value={occasion.title}
                            label="Название мероприятия"
                            onChange={inputChange}
                            error={Boolean(getFieldError('title') || titleValid === false)}
                            helperText={getFieldError('title') ? getFieldError('title') : validateTitle}
                            margin="normal"
                            autoComplete="new-title"
                            autoFocus
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="location"
                                    type="location"
                                    name="location"
                                    value={occasion.location}
                                    label="Место проведения"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('location') || locationValid === false)}
                                    helperText={getFieldError('location') ? getFieldError('location') : validateLocation}
                                    margin="normal"
                                    autoComplete="new-location"/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    id="city"
                                    type="city"
                                    name="city"
                                    value={occasion.city}
                                    label="Город"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('city') || cityValid === false)}
                                    helperText={getFieldError('city') ? getFieldError('city') : validateCity}
                                    margin="normal"
                                    autoComplete="new-city"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    id="address"
                                    type="address"
                                    name="address"
                                    value={occasion.address}
                                    label="Адрес"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('address') || addressValid === false)}
                                    helperText={getFieldError('address') ? getFieldError('address') : validateAddress}
                                    margin="normal"
                                    autoComplete="new-lastName"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            id="date"
                            type="date"
                            name="date"
                            value={occasion.date}
                            label="Дата проведения"
                            onChange={inputChange}
                            error={Boolean(getFieldError('date'))}
                            helperText={getFieldError('date')}
                            margin="normal"
                            autoComplete="new-date"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            required
                            fullWidth
                            id="time"
                            type="time"
                            name="time"
                            value={occasion.time}
                            label="Время проведения"
                            onChange={inputChange}
                            error={Boolean(getFieldError('time'))}
                            helperText={getFieldError('time')}
                            margin="normal"
                            autoComplete="new-time"
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            id="description"
                            type="description"
                            name="description"
                            value={occasion.description}
                            label="Описание мероприятия"
                            onChange={inputChange}
                            error={Boolean(getFieldError('description') || descriptionValid === false)}
                            helperText={getFieldError('description') ? getFieldError('description') : validateDescription}
                            margin="normal"
                            autoComplete="new-description"
                        />
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="duration"
                                    type="duration"
                                    name="duration"
                                    value={occasion.duration}
                                    label="Продолжительность"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('duration'))}
                                    helperText={getFieldError('duration')}
                                    margin="normal"
                                    autoComplete="new-duration"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    id="restrictions"
                                    type="restrictions"
                                    name="restrictions"
                                    value={occasion.restrictions}
                                    label="Возрастное ограничение"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('restrictions'))}
                                    helperText={getFieldError('restrictions')}
                                    margin="normal"
                                    autoComplete="new-restrictions"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="price"
                                    type="price"
                                    name="price"
                                    value={occasion.price}
                                    label="Цена"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('price') || isValidPrice === false)}
                                    helperText={getFieldError('price') ? getFieldError('price') : priceLabel}
                                    margin="normal"
                                    autoComplete="new-price"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            id="category"
                            type="category"
                            name="category"
                            value={occasion.category}
                            label="Какая категория"
                            onChange={inputChange}
                            error={Boolean(getFieldError('category') || categoryValid === false)}
                            helperText={getFieldError('category') ? getFieldError('category') : validateCategory}
                            margin="normal"
                            autoComplete="new-category"
                        />
                        <Grid item xs marginTop={1}>
                            <FileInput
                                label="Постер мероприятия"
                                name="image"
                                onChange={fileInputChangeHandler}/>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={loading}>
                            {loading ? (<CircularProgress/>) : 'Добавить мероприятие'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default OccasionForm;