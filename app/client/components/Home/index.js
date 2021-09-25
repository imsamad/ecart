import { Grid } from '@mui/material';
import Card from '../ProductCard';

const index = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
          <Card product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default index;
