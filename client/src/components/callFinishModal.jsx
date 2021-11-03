import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useUser } from "../context/UserContext";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CallFinishModal({setReadyForCall}) {
  const [open, setOpen] = React.useState(true);
  const {isDoctor} = useUser();


  const handleClose = () => {
    setReadyForCall(false);
    setOpen(false);
  };

  return (
    <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {isDoctor ? 'Patient' : 'Doctor'} is not ready. Please wait.
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please wait, you'll get reached.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}