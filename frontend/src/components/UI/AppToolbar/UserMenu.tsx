import React, { useState } from 'react';
import {Box, Button, CardMedia, Menu, MenuItem} from '@mui/material';

import noAvatar from '../../../assets/images/ic-noavatar.png';
import {apiURL} from '../../../constants/constants.url.ts';
import {logout} from "../../../features/users/usersThunk.ts";
import {useAppDispatch} from "../../../app/hooks.ts";
import {User} from "../../../types/user.types";
import {useNavigate} from "react-router-dom";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Box>
        <CardMedia
          component="img"
          sx={{width: 50, height: 50, borderRadius: '10px', border: '3px solid black'}}
          image={user.avatar ? apiURL + '/' + user.avatar : noAvatar}
          alt={user.username}
        />
      </Box>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
