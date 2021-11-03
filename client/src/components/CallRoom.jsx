import React, { useEffect } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Callmodal from "./CallModal";


const CallRoom = () => {
  
    let history = useHistory();
    let location = useLocation();
    const {isDoctor} = useUser();
    const myAppointment = useRef({})

    const [readyForCall, setReadyForCall] = useState(false);

    // if(!authorization){
    //   console.log('not authorized!')
    //     return <Redirect to="/"/>;
    // }

    const callmyUser = async(callUser, getAppointment) => {

      myAppointment.current = await getAppointment(location.state.appointment.id)
      console.log(myAppointment)
      if(isDoctor){
        if(myAppointment.current.peeridpatient){
          callUser(myAppointment.current.peeridpatient);
        } else {
          setReadyForCall(true);
        }
      } else {
        if(myAppointment.current.peeriddoctor){
          callUser(myAppointment.current.peeriddoctor);
        } else {
          console.log('will set to true the ready to call')
          setReadyForCall(true);
        }
      }

    }

    const endMyCall = () => {
      return <Redirect to="/"/>    
    }

    return (
      <div>
        {readyForCall ? (<Callmodal setReadyForCall={setReadyForCall}/>) : (null)}
        <ButtonAppBar/>

          <Container>
            <CallContextProvider>
              <VideoChat />          
              <Options callFunc={callmyUser} appointmentId={location.state.appointment.id} endMyCall={endMyCall}>
                <Notifications />
              </Options>
            </CallContextProvider>
          </Container>
      </div>
    )
}

export default CallRoom;