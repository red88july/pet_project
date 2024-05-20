import {NavLink} from 'react-router-dom';
import {AppBar, Box, CardMedia, Container, Grid, styled, Toolbar, Typography} from '@mui/material';
import {routes} from "../../../constants/constantsPage.routes.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import UserMenu from "./UserMenu.tsx";
import GuestMenu from "./GuestMenu.tsx";
import {selectUser} from "../../../features/users/usersSlice.ts";

import logo from '../../../assets/images/icons/ic-plannerLogo.png';
import {imgStyleAppToolbar, styleLinkBoxAppToolbar} from "../../../style.ts";

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    if (user === undefined) {
        return null;
    }

    return (
        <>
            <AppBar position="sticky" sx={{marginBottom: "40px", padding: '5px'}}>
                <Container maxWidth="lg">
                    <Toolbar>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                <Link to={routes.home}>
                                    <Box sx={styleLinkBoxAppToolbar}>
                                        <CardMedia
                                            component="img"
                                            src={logo}
                                            sx={imgStyleAppToolbar}/>
                                        <Box>
                                            <Typography variant='h4' sx={{lineHeight: '1.0', fontSize: '2.3rem'}}>
                                                🅶🆄🆁🆄
                                            </Typography>
                                            <Typography sx={{fontSize: '1.3rem', marginTop: '0'}}>
                                                ₘₐₛₜₑᵣ₋ₚₗₐₙₙₑᵣ
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Typography>
                            {user ? (
                                <UserMenu user={user}/>
                            ) : (
                                <GuestMenu/>
                            )}
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default AppToolbar;