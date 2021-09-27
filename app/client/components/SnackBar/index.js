import * as React from 'react';

import { Snackbar, Alert as MuiAlert } from '@mui/material';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function index({
  open,
  handleClose,
  snake: {
    position: { h, v },
    body,
    type,
  },
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: v, horizontal: h }}
      open={open}
      autoHideDuration={6000}
      key={v + h + Math.random()}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {body}
      </Alert>
    </Snackbar>
  );
}

// error
// warning
// info
// success
