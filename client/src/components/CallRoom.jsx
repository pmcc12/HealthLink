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
import { Box, margin } from "@mui/system";
import { Paper } from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Typography } from "@mui/material";
import { AppBar } from "@mui/material";
import OutlinedCard from "./Card";
import Grid from '@mui/material/Grid';
import BasicDateTimePicker from "./BasicDateTimePicker";
import { useHistory } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


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

const CallRoom = () => {
  
    let history = useHistory();

    const classes = useStyles();

    const [videoCall, setvideoCall] = useState(false);
    
    const toggle = () => {
      const buffer = videoCall;
      setvideoCall(!buffer);
      console.log(videoCall);
    } ;

    // if(!authorization){
    //   console.log('not authorized!')
    //     return <Redirect to="/"/>;
    // }

    const handleMeetingSubmit = () => {


      history.push("/");
    }

    // const handleClick = () => {
    //   setRemoteAppointment(!remoteAppointment);
    // }

    return (
        <div>
             <Button onClick={toggle}>Start Call</Button> 
             <Container>
             {videoCall ? (
                             <CallContextProvider>
                             <VideoChat />
                             <Options>
                                 <Notifications />
                             </Options>
                             </CallContextProvider>
                           ) : null}
             </Container>
             <Container className={classes.container}>
             </Container>
        </div>
    )
}

export default CallRoom;