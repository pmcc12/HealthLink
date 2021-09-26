import {useRef, useState} from 'react'
import { Button, Container } from "@material-ui/core";
import VideoChat from './components/VideoChat';
import Options from './components/Options';
import Notifications from './components/Notification';
import MarkerMap from './components/MarkerMap';
import { CallContextProvider } from './context/CallContext';
import { makeStyles } from '@material-ui/core/styles';
import SignInSide from './components/EntrySignIn';
import SignUp from './components/SignUp'

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

// import myMap from './components/Map';

const App = () => {

  const classes = useStyles();

  const [videoCall, setvideoCall] = useState(false);

  const toggle = () => {
    const buffer = videoCall;
    setvideoCall(!buffer);
    console.log(videoCall);
  } ;

  return (
    <div className="App">
     {/* <Button onClick={toggle}>toggle videochat</Button> 
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
     </Container>       */}
     <SignInSide />
     <SignUp />
    </div>
  );
}

export default App;
