import React from 'react';
import {useAppSelector} from "../../app/hooks.ts";
import {isLoadingOccasion, selectOccasion} from "../../features/occasion/occasionSlice.ts";
import {Link as RouterLink} from "react-router-dom";
import {Box, Button, CircularProgress, Container, Typography} from "@mui/material";
import {styleCategoryMenuLink} from "../../style.ts";

const CategoryMenu: React.FC = () => {
    const categories = useAppSelector(selectOccasion);
    const uniqueCategories = new Set(categories.map(category => category.category));
    const categoryName = Array.from(uniqueCategories);

    const loading = useAppSelector(isLoadingOccasion);

    return (
        <>
            <Container
                maxWidth="lg"
                component="main">
                {loading && <Box sx={{display: 'flex', justifyContent: 'left'}}>
                    <CircularProgress size={20}/></Box>}
                {categoryName.map(category => (
                    <Button
                        sx={styleCategoryMenuLink}
                        component={RouterLink}
                        to={`occasion?category=${category}`}>
                        <Typography style={{textAlign: 'center'}} variant="body2">
                            {category}
                        </Typography>
                    </Button>
                ))}
            </Container>
        </>
    );
};

export default CategoryMenu;
