import React from 'react';
import {useCall} from '../context/CallContext'
import {Grid, Typography, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const VideoChat = () => {
    const {call,callAccepted,callEnded,myVideo,userVideo,stream,name,me} = useCall();

    const classes = useStyles();
    return(
        <Grid container className={classes.gridContainer}>
            {/* conditional rendering, if stream exists */}
            {stream && (
                <Paper className={classes.paper}>
                    {/* takes the full screen in mobile devices (xs) and on medium and larger devices (md) will take half of the screen*/}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{name || 'Name'} is {me}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
            )}
            {/* conditional rendering, if call was accepted and is not finished yet */}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    {/* takes the full screen in mobile devices (xs) and on medium and larger devices (md) will take half of the screen*/}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
            )}
        </Grid>
    )

}

export default VideoChat;