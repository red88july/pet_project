import React, {useEffect} from 'react';
import {getByOccasionByCategory} from "./occasionThunk.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {selectOccasion} from "./occasionSlice.ts";
import OccasionCategoryItems from "./components/OccasionCategoryItems.tsx";
import {Box, Button, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {routes} from "../../constants/constantsPage.routes.ts";

const OccasionCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    const occasion = useAppSelector(selectOccasion);

    useEffect(() => {
        if (category) {
            dispatch(getByOccasionByCategory(category));
        }
    }, [dispatch]);

    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 4}}>
                <Button startIcon={<ArrowBackIcon/>} component={RouterLink} to={routes.home}>
                    <Typography style={{textAlign: 'center'}} variant="body2">
                        Вернутся назад
                    </Typography>
                </Button>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '10px'}}>
                {occasion.map((item) => (
                    <OccasionCategoryItems
                        key={item._id}
                        id={item._id}
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
            <Box sx={{display: 'flex', justifyContent: 'flex-start', marginTop: 4}}>
                <Button startIcon={<ArrowBackIcon/>} component={RouterLink} to={routes.home}>
                    <Typography style={{textAlign: 'center'}} variant="body2">
                        Вернутся назад
                    </Typography>
                </Button>
            </Box>
        </>
    );
};

export default OccasionCategory;