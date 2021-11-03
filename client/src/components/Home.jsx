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
import {useHistory} from 'react-router-dom'

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

const Home = ({authorization}) => {
  
    let history = useHistory();

    const {user,isDoctor} = useUser();
    const classes = useStyles();
    
    
    
    if(!authorization){
      console.log('not authorized in Home!')
        // return <Redirect to="login"/>;
        history.push("/login")
    } else {
      //cleaning last code status (using local storage to save last code status, which will get lost due to the page reload in case in un-authorized access (last if -> history.push("/login")))
      localStorage.removeItem('lastcode');
    }


    const visualizeUserAppointments = () => {
      history.push("/check")
    }

    const createNewAppointement =  () => {
      console.log('button clicked.. going to fetch all docs')

      history.push("/new");
    }

    return (
        <div>
          <ButtonAppBar />
          
          <Container component="main" maxWidth="md">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              
              <Button variant="contained" onClick={visualizeUserAppointments}>Visualize my Appointments</Button>
              { isDoctor ? null : <Button variant="contained" onClick={createNewAppointement}>Create a new Appointment</Button>
              }

              
            </Box>
        </Container>
        </div>
    )
}

export default Home;
