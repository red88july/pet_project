import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';

import {Alert, Box, CircularProgress} from '@mui/material';

import {isErrorToLoadOccasion, isLoadingOccasion, selectOccasion} from "./occasionSlice.ts";
import {getOccasion} from "./occasionThunk.ts";
import OccasionList from "./components/OccasionList.tsx";

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
            {loading && <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress size={100}/></Box>}
            {error && (<Alert severity="error">Упс! Что-то пошло не так!</Alert>)}
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '10px'}}>
                {occasion.map(item => (
                    <OccasionList
                        key={item._id}
                        id={item._id}
                        user={item.user._id}
                        city={item.city}
                        address={item.address}
                        location={item.location}
                        title={item.title}
                        date={item.date}
                        time={item.time}
                        price={item.price}
                        restrictions={item.restrictions}
                        duration={item.duration}
                        image={item.image}
                    />
                ))}
            </Box>
        </>
    );
};

export default Occasion;