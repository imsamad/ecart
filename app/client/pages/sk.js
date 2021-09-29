import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Stack, Box } from '@mui/material';

export default function Variants() {
  return (
    <Box sx={{ position: 'relative', zIndex: 2 }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati odio
      veritatis, officiis amet aspernatur recusandae maiores officia! Explicabo,
      impedit pariatur. Aliquid beatae animi exercitationem, quaerat magni
      adipisci ut a dignissimos?
      <Stack
        spacing={1}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          top: 0,
          left: 0,
          zIndex: 3,
        }}
      >
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    </Box>
  );
}
