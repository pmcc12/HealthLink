import {useRef, useState} from 'react'
import { Button, Container } from "@material-ui/core";
import VideoChat from './components/VideoChat';
import Options from './components/Options';
import Notifications from './components/Notification';
import { CallContextProvider } from './context/CallContext';

const callView = () => {

  return (
    <div>
     {/* <Button onClick={toggle}>toggle videochat</Button> */}
     {/* <Container> */}
      {/* {videoCall ? ( */}
      <CallContextProvider>
          <VideoChat />
          <Options>
            <Notifications />
          </Options>
      </CallContextProvider>
      {/* ) : null} */}
      {/* </Container>       */}
    </div>
  );
}

export default callView;
