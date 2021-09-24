import { useCall } from "../context/CallContext";
import { Button } from "@material-ui/core";

const Notifications = () => {
    const {answerCall, call, callAccepted} = useCall();
        return(
            <>
                {/* if we have a receiving call and it hasn't yet been accepted */}
                {console.log('is received? '+call.isReceivedCall+' and accepted?'+callAccepted)}
                {call.isReceivedCall && !callAccepted && (
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <h1>{call.name} is calling:</h1>
                        <Button onClick={answerCall} color="primary" variant="contained">
                            Answer
                        </Button>
                    </div>
                )}
            </>
        )
    }
    
    export default Notifications