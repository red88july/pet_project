import React, {useState} from 'react';

import {Box, Button, Card, CardContent, CardMedia, Dialog, Typography} from '@mui/material';

import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {apiURL} from "../../../utils/constants.url.ts";

interface Props {
    id: string;
    city: string;
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

const OccasionCategoryItems: React.FC<Props> = ({
                                           id, city, address, title, location,
                                           date, time, price, restrictions, duration, image,
                                       }) => {

    const [open, setOpen] = useState(false);
    let coverImage = imageNotAvailable;

    if (image) {
        coverImage = apiURL + '/' + image;
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card id={id} sx={{maxWidth: 350}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CardContent>
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

export default OccasionCategoryItems;
