import React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
const index = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={4} sx={{ p: 2 }}>
        <Card sx={{ py: 6, px: 4, bgcolor: 'grey.300' }}>
          <Link href="/admin/userslist">
            <a>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Manage Users{' '}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </a>
          </Link>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ p: 2 }}>
        <Card sx={{ py: 6, px: 4, bgcolor: 'grey.300' }}>
          <Link href="/admin/orderslist">
            <a>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Manage Orders
                  </Typography>
                </CardContent>
              </CardActionArea>
            </a>
          </Link>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ p: 2 }}>
        <Card sx={{ py: 6, px: 4, bgcolor: 'grey.300' }}>
          <Link href="/admin/productslist">
            <a>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Manage Products
                  </Typography>
                </CardContent>
              </CardActionArea>
            </a>
          </Link>
        </Card>
      </Grid>
    </Grid>
  );
};

export default index;
