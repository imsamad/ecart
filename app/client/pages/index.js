import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

import fetchJson from '../lib/fetchJson';
import ProductCard from '../components/ProductCard';

export default function Index() {
  const { products } = useSelector((state) => state.products);
  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      {products?.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export const getStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  const {
    data: { products },
  } = await fetchJson(`${apiUrl}/products`);
  return {
    props: {
      data: products,
      reduxData: {
        reducerName: 'products',
        fieldName: 'products',
      },
    },
  };
};
