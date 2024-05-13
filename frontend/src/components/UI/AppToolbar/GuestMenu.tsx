import {Button, IconButton} from '@mui/material';
import { NavLink } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';

const GuestMenu = () => {
    return (
        <>
            <Button component={NavLink} to="/register" color="inherit">
                <IconButton color='inherit'>
                    <PersonAddIcon/>
                </IconButton>
                Sign Up
            </Button>
            <Button component={NavLink} to="/login" color="inherit">
                <IconButton color='inherit'>
                    <LoginIcon/>
                </IconButton>
                Sign In
            </Button>
        </>
    );
};

export default GuestMenu;