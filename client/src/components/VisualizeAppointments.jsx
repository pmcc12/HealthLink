import React from "react";
import {useRef, useState} from 'react'
import { Button, Container } from "@material-ui/core";
import { CallContextProvider } from "../context/CallContext";
import VideoChat from './VideoChat';
import Options from './Options';
import Notifications from './Notification';
import MarkerMap from "./MarkerMap";
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom' 
import { useUser } from "../context/UserContext";
import ButtonAppBar from "./ButtonAppBar";
import { Box } from "@mui/system";
import { Paper } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import OutlinedCard from "./Card";
import Grid from '@mui/material/Grid';


const useStyles = makeStyles((theme) => ({
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      }
    },
    mypaper: {
      borderRadius: 10
    },
    mycard: {
      fontWeight: "bold"
    }
  }));

const AppointmentsVisualizer = ({authorization}) => {
    
    if(!authorization){
      console.log('not authorized!')
        return <Redirect to="login"/>;
    }

    return (
        <div>
          <ButtonAppBar />
          
          <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Grid item xs={12}>
                    <MarkerMap />   
                  </Grid>
            </Box>
        </Container>
        </div>
    )
}

export default AppointmentsVisualizer;