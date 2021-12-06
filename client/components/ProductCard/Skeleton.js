import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';

export default function CardSkeleton() {
  return (
    <Card sx={{ border: 0.1, borderColor: 'grey.400' }} sx={{ p: 0 }}>
      <Skeleton variant="rectangular" width={300} height={250} sx={{ m: 0 }} />
      <Skeleton variant="text" height={30} sx={{ mx: 2 }} />
      <Skeleton variant="text" height={50} sx={{ mx: 2 }} />
    </Card>
  );
}
