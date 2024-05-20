import React, {useState} from 'react';
import {
    Box,
    Button,
    CardMedia,
    CircularProgress,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from '@mui/material';

import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
import {isErrorLoadingOccasions, isUpdateOccasion, selectOccasion} from "../occasionSlice.ts";
import {checkForBadWords} from "../../../utils/BadWordCheck.ts";
import {updateOccasion} from "../occasionThunk.ts";
import {UpdateStateOccasion} from "../../../types/occasion.types";
import {routes} from "../../../constants/constantsPage.routes.ts";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import picturePlanner from '../../../assets/images/icons/ic-planner.png';
import { fieldAddress,  fieldCategory, fieldCity, fieldDate, fieldDescription, fieldHall, fieldTime } from "../../../style.ts";

const UpdateForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(isErrorLoadingOccasions);
    const update = useAppSelector(isUpdateOccasion);
    const {id} = useParams();
    const occasions = useAppSelector(selectOccasion);

    const occasion = occasions.find(occasion => occasion._id === id);
    const [state, setState] = useState<UpdateStateOccasion>({
        city: occasion?.city,
        address: occasion?.address,
        date: occasion?.date,
        time: occasion?.time.toString(),
        description: occasion?.description,
        category: occasion?.category,
        location: occasion?.location,
    });

    const [validateAddress, setValidateAddress] = useState<string>('');
    const [validateCity, setValidateCity] = useState<string>('');
    const [validateDescription, setValidateDescription] = useState<string>('');
    const [validateCategory, setValidateCategory] = useState<string>('');
    const [validateLocation, setValidateLocation] = useState<string>('');

    const [addressValid, setAddressValid] = useState<boolean | undefined>(undefined);
    const [cityValid, setCityValid] = useState<boolean | undefined>(undefined);
    const [descriptionValid, setDescriptionValid] = useState<boolean | undefined>(undefined);
    const [categoryValid, setCategoryValid] = useState<boolean | undefined>(undefined);
    const [locationValid, setLocationValid] = useState<boolean | undefined>(undefined);

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        const isBadWord = checkForBadWords(name, value);

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

        if (name === 'location') {
            setLocationValid(!isBadWord);
            setValidateLocation(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
        }

        setState(prevState => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(updateOccasion({id, occasionMutation: state})).unwrap();
            navigate(routes.home);
        } catch (e) {
            //error
        }
    };

    return (
        <>
            <Container maxWidth="md">
                <CssBaseline/>
                <Button startIcon={<ArrowBackIcon/>} component={RouterLink} to={routes.home}>
                    <Typography style={{textAlign: 'center'}} variant="body2">
                        Вернутся назад
                    </Typography>
                </Button>
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
                        Форма обновления мероприятия
                    </Typography>
                    <Box component="form" onSubmit={submitForm} sx={{mt: 1}}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    sx={fieldCity}
                                    inputProps={{style: {paddingLeft: "3rem"}}}
                                    id="city"
                                    type="city"
                                    name="city"
                                    value={state.city}
                                    label="Город"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('city') || cityValid === false)}
                                    helperText={getFieldError('city') ? getFieldError('city') : validateCity}
                                    margin="normal"
                                    autoComplete="new-city"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    sx={fieldAddress}
                                    inputProps={{style: {paddingLeft: "3rem"}}}
                                    id="address"
                                    type="address"
                                    name="address"
                                    value={state.address}
                                    label="Адрес"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('address') || addressValid === false)}
                                    helperText={getFieldError('address') ? getFieldError('address') : validateAddress}
                                    margin="normal"
                                    autoComplete="new-lastName"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    sx={fieldCategory}
                                    inputProps={{style: {paddingLeft: "3rem"}}}
                                    id="category"
                                    type="category"
                                    name="category"
                                    value={state.category}
                                    label="Какая категория"
                                    onChange={inputChange}
                                    error={Boolean(getFieldError('category') || categoryValid === false)}
                                    helperText={getFieldError('category') ? getFieldError('category') : validateCategory}
                                    margin="normal"
                                    autoComplete="new-category"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            sx={fieldHall}
                            inputProps={{style: {paddingLeft: "3rem"}}}
                            id="location"
                            type="location"
                            name="location"
                            value={state.location}
                            label="Место проведения"
                            onChange={inputChange}
                            error={Boolean(getFieldError('location') || locationValid === false)}
                            helperText={getFieldError('location') ? getFieldError('location') : validateLocation}
                            margin="normal"
                            autoComplete="new-location"
                        />
                        <TextField
                            required
                            fullWidth
                            sx={fieldDate}
                            inputProps={{style: {paddingLeft: "3rem"}}}
                            id="date"
                            name="date"
                            type="text"
                            value={state.date}
                            label="Дата проведения"
                            placeholder="ДД.ММ.ГГ"
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
                            sx={fieldTime}
                            inputProps={{style: {paddingLeft: "3rem"}}}
                            id="time"
                            name="time"
                            type="text"
                            value={state.time}
                            label="Время проведения"
                            placeholder="ЧЧ:ММ"
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
                            sx={fieldDescription}
                            rows={4}
                            id="description"
                            type="description"
                            name="description"
                            value={state.description}
                            label="Описание мероприятия"
                            inputProps={{style: {paddingLeft: "2rem"}}}
                            onChange={inputChange}
                            error={Boolean(getFieldError('description') || descriptionValid === false)}
                            helperText={getFieldError('description') ? getFieldError('description') : validateDescription}
                            margin="normal"
                            autoComplete="new-description"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={update}>
                            {update ? (<CircularProgress />) : 'Обновить мероприятие'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default UpdateForm;