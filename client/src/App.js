import {useRef, useState} from 'react'
import { Button } from "@material-ui/core";
import VideoChat from './components/VideoChat';
import Options from './components/Options';
import Notifications from './components/Notification';

const App = () => {

  const [videoCall, setvideoCall] = useState(false);

  const toggle = () => {
    const buffer = videoCall;
    setvideoCall(!buffer);
  } ;

  return (
    <div className="App">
     {/* <Button onClick={toggle}>toggle videochat</Button>
     {console.log(videoCall)}
     {videoCall & (
      <div> */}
        <VideoChat />
        <Options>
          <Notifications />
        </Options>    
      {/* </div>         
     )
     } */}
    </div>
  );
}

export default App;
