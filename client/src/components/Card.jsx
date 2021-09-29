import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../context/UserContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Dr.{user.name}
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Schedule a Meeting</Button>
//     </CardActions>
//   </React.Fragment>
// );


export default function OutlinedCard({user, chooseDoctor}) {
  
  const handleMeetingSchedule = () => {
    chooseDoctor(user);
  } 

  return (
    <Box sx={{ minWidth: 100 }}>
        <Card variant="outlined">
        <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
          Dr.{user.name}
        </Typography>
        <Typography variant="h6">
          Hi
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleMeetingSchedule} size="small">Schedule a Meeting</Button>
      </CardActions>
    </React.Fragment>
      </Card>
    </Box>
  );
}
