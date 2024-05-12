import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import {routes} from "../../../constants.routes.ts";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUserLog} from "../../../users/usersSlice.ts";
import UserMenu from "./UserMenu.tsx";
import GuestMenu from "./GuestMenu.tsx";
const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

const AppToolbar = () => {
    const user = useAppSelector(selectUserLog);

    if (user === undefined) {
        return null;
    }

    return (
        <AppBar sx={{mb: 2}}>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to={routes.home}>Guru master-planner</Link>
                    </Typography>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : (
                        <GuestMenu/>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;