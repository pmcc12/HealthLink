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

const useStyles = makeStyles((theme) => ({
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      }
    }
  }));

const Home = ({authorization}) => {
    
    const classes = useStyles();
    
    const [videoCall, setvideoCall] = useState(false);
    
    const toggle = () => {
      const buffer = videoCall;
      setvideoCall(!buffer);
      console.log(videoCall);
    } ;
    
    if(!authorization){
        return <Redirect to="login"/>;
    }

    return (
        <div>
            <Button onClick={toggle}>toggle videochat</Button> 
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
        <MarkerMap />
        </Container>       

        </div>
    )
}

export default Home;