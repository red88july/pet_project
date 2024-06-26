import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Dialog, Link, Typography} from "@mui/material";

import {apiURL} from "../../../utils/constants.url.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../users/usersSlice.ts";
import {isDeleteOccasion} from "../occasionSlice.ts";
import {deleteOccasion, getOccasion} from "../occasionThunk.ts";

import imageNotAvailable from '../../../assets/images/image_not_available.png';
import CancelIcon from '@mui/icons-material/Cancel';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import {LoadingButton} from "@mui/lab";
import {Link as RouterLink} from "react-router-dom";

interface Props {
    id: string;
    city: string;
    user: string;
    address: string;
    location: string
    title: string;
    date: string;
    time: string;
    price: number;
    restrictions: number;
    duration: string;
    image: string | null;
}

const OccasionList: React.FC<Props> = ({
                                           id, city, address, title, location, user,
                                           date, time, price, restrictions, duration, image,
                                       }) => {
    const getUser = useAppSelector(selectUser);
    const isDelete = useAppSelector(isDeleteOccasion);
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getOccasion())
    }, [dispatch]);

    let coverImage = imageNotAvailable;

    if (image) {
        coverImage = apiURL + '/' + image;
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const nandleDelete = async () => {
        await dispatch(deleteOccasion(id))
        await dispatch(getOccasion());
    };

    return (
        <>
            <Card id={id} sx={{maxWidth: 350, marginTop: 4}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CardContent>
                        <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                            {(getUser?._id === user) && (
                                <Box>
                                    <Link component={RouterLink} to={`occasion/update/${id}`} variant="body2">
                                        <SystemUpdateAltIcon/>
                                    </Link>
                                </Box>
                            )}
                            <Box
                                sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: '5px', padding: '5px'}}>
                                {(getUser && getUser?.role === 'admin' || getUser && getUser?.role === 'manager') && (
                                    <LoadingButton
                                        disabled={isDelete}
                                        loading={isDelete}
                                        onClick={nandleDelete}
                                        sx={{minWidth: '29px', padding: '3px', borderRadius: '50%'}}
                                        color="error">
                                        <CancelIcon/>
                                    </LoadingButton>
                                )}
                            </Box>
                        </Box>
                        <CardMedia
                            onClick={handleOpen}
                            component="img"
                            alt={title}
                            sx={{width: 300, borderRadius: '10px'}}
                            image={coverImage}/>
                        <Dialog open={open}>
                            <CardMedia
                                component="img"
                                alt={title}
                                sx={{width: 600}}
                                image={coverImage}
                            />
                            <Button
                                style={{color: 'black'}}
                                onClick={handleClose}>
                                Close
                            </Button>
                        </Dialog>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography gutterBottom variant="h6">
                                {title}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '7px'}}>
                            <Typography variant="body2" color="text.secondary">
                                <b>Место проведения: </b>{location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Адрес: </b>{city} {address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Дата: </b>{date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Время: </b>{time}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Цена: </b><i>{price}</i>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Продолжительность: </b>{duration}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <b>Возрастное ограничение: </b> {restrictions}+
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </>
    );
};

export default OccasionList;