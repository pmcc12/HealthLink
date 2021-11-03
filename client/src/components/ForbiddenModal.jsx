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
import { useHistory } from 'react-router-dom' 


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

export default function ForbiddenModal() {
  const [open, setOpen] = React.useState(true);
  let history = useHistory();

  const handleClose = () => {
      setOpen(false);
      history.push("/login");
      window.location.reload();
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
                Forbiden Access
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Not authenticated. Please Login again.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Go to Login
                </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}