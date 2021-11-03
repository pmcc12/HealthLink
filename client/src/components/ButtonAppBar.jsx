import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useUser } from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import LogoutModal from './LogoutModal';

export default function ButtonAppBar() {

  const {Logout} = useUser();
  const [isOut, setIsOut] = useState(false);

  const logout = () => {
    Logout()
    .then(res => {
      if(res.status === 200){
        setIsOut(true);
      }}
      );
  }

  return (
    <>
    {isOut ? (<LogoutModal />) 
    : 
    (null)}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}
