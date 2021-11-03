import React, {useRef, useEffect} from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useCall } from '../context/CallContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridContainer: {
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    container: {
      width: '600px',
      margin: '35px 0',
      padding: 0,
      [theme.breakpoints.down('xs')]: {
        width: '80%',
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      padding: '10px 20px',
      border: '2px solid black',
    },
  }));

  const Options = ({children, callFunc, appointmentId, endMyCall}) => {
    const {me, callAccepted, name, setName, callEnded,endCall, callUser, deleteAppointment,getAppointment} = useCall();

    const classes = useStyles();
    
    const hangUp = () => {
      console.log('appointment id at options: ',appointmentId);
      endCall();
      deleteAppointment(appointmentId);
      endMyCall();
    }

    return(
        <Container className={classes.container}>
            {/* elevation is to give the impression that it's raised */}
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant="h6">Account Info</Typography>
                            <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            {callAccepted && !callEnded ? (
                                <Button onClick={hangUp} className={classes.margin} variant="contained" color="secondary" fullWidth startIcon={<PhoneDisabled fontSize="large"/>}>
                                    Hang Up
                                </Button>
                            ) : (
                                <Button onClick={() => callFunc(callUser, getAppointment)} className={classes.margin} variant="contained" color="primary" fullWidth startIcon={<Phone fontSize="large"/>}>
                                    Call
                                </Button>
                            )
                            }
                        </Grid>
                    </Grid>
                </form>
            {children}
            </Paper>
        </Container>
    )
}

export default Options