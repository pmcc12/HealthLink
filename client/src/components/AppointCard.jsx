import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom' 
import { useUser } from '../context/UserContext';

export default function MiddleDividers({isDoctor, appointment}) {

  console.log('my appointment id: ',appointmentId);
  let history = useHistory();
  const {appointmentId, setAppointmentId} = useUser()

  const handleCall = () => {
    setAppointmentId(appointment.id);
    history.push({
      pathname: '/call',
      state: {appointment : appointment}
    });
  }

  return (
    <>
    {isDoctor ? 
      (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  {appointment.Patient.name} in {appointment.id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6" component="div">
                  {appointment.price} € 
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              Appointment is scheduled for {appointment.date}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>
            <Typography gutterBottom variant="body1">
              Selected appointment format 
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Remote" color={appointment.remoteappointment ? 'primary' : 'default'} />
              <Chip label="On-site" color={appointment.onsiteappointment ? 'primary' : 'default'} />
            </Stack>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button onClick={handleCall} variant="outlined" disabled={appointment.onsiteappointment}>Start Appointment</Button>
          </Box>
        </Box>
      ) : 
      (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  Dr.{appointment.Doctor.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6" component="div">
                  {appointment.price} €
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              Appointment is scheduled for {appointment.date}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>
            <Typography gutterBottom variant="body1">
              Selected appointment format
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Remote" color={appointment.remoteappointment ? 'primary' : 'default'} />
              <Chip label="On-site" color={appointment.onsiteappointment ? 'primary' : 'default'} />
            </Stack>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button onClick={handleCall} variant="outlined" disabled={appointment.onsiteappointment}>Start Appointment</Button>
          </Box>
        </Box>
        )}
      </>
  );
}