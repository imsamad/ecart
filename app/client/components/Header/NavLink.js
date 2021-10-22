import React from 'react';
import IconButton from '@mui/material/IconButton';

const index = ({ children, onClick }) => {
  return (
    <IconButton
      sx={{
        border: 2,
        borderRadius: 2,
        borderColor: 'grey.50',
        color: 'grey.50',
        p: 1,
        mr: 2,
      }}
      size="small"
      onClick={onClick && onClick}
    >
      {children}
    </IconButton>
  );
};

export default index;
