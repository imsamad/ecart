import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';

const index = ({ open, handleClose }) => {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Manage Order</DialogTitle>
      <Button onClick={handleClose}> Close </Button>
    </Dialog>
  );
};

export default index;
