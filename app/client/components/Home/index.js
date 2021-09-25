import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Card from '../ProductCard';

const index = () => {
  const { products } = useSelector((state) => state.productsList);
  console.log('Home Page');
  return (
    <Grid container spacing={2}>
      {products?.data?.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
          <Card product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default index;
