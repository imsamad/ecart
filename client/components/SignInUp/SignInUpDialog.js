import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Slide,
  TextField,
} from '@mui/material';

const Slider = React.forwardRef(function Slider(props, ref) {
  return <Slide id="true" direction="left" ref={ref} {...props} />;
});

export default function LoginForm({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Slider}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>{'Login'}</DialogTitle>
        <DialogContent>
          <Box sx={{ m: 1 }} component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              id="name1"
              label="Email"
              variant="standard"
            />
            <TextField
              fullWidth
              margin="normal"
              id="email1"
              label="Password"
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: 4 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Submit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
        <Box sx={{ pb: 2 }} />
      </Dialog>
    </div>
  );
}
