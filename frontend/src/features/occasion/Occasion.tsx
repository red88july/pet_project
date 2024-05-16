import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';

import {Alert, Box, CircularProgress, Grid} from '@mui/material';

import {isErrorToLoadOccasion, isLoadingOccasion, selectOccasion} from "./occasionSlice.ts";
import {getOccasion} from "./occasionThunk.ts";
import OccasionList from "./containers/OccasionList.tsx";

const Occasion: React.FC = () => {
    const dispatch = useAppDispatch();
    const occasion = useAppSelector(selectOccasion);
    const loading = useAppSelector(isLoadingOccasion);
    const error = useAppSelector(isErrorToLoadOccasion);

    useEffect(() => {
        dispatch(getOccasion());
    }, [dispatch]);

    return (
        <>
            <Grid container marginTop={5}>
                <Grid item container marginTop={7} gap={1}>
                    {loading && <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress size={100}/></Box>}
                    {error && (<Alert severity="warning">Упс! Что-то пошло не так!</Alert>)}
                    {occasion.map(occasion => (
                        <OccasionList
                            key={occasion._id}
                            id={occasion._id}
                            user={occasion.user}
                            city={occasion.city}
                            address={occasion.address}
                            title={occasion.title}
                            date={occasion.date}
                            time={occasion.time}
                            price={occasion.price}
                            description={occasion.description}
                            restrictions={occasion.restrictions}
                            duration={occasion.duration}
                            category={occasion.category}
                            image={occasion.image}
                        />
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default Occasion;