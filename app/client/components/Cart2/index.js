import { Grid, Box } from '@mui/material';
import Invoice from './Invoice';
import CartTable from './CartTable';
import { useSelector } from 'react-redux';

const index = () => {
  const { cart, incDecLoading, incDecSucess, incDecProduct, incDecUpdatedQty } =
    useSelector((state) => state.cart);

  const { productItems, ...rest } = cart;
  return (
    // <Grid container>
    //   <Grid xs={12} item>
    //     <Box>

    <CartTable
      products={productItems}
      details={rest}
      incDecProduct={incDecProduct}
      incDecUpdatedQty={incDecUpdatedQty}
      incDecLoading={incDecLoading}
      incDecSucess={incDecSucess}
    />

    //     </Box>
    //   </Grid>
    //   <Grid xs={12} sx={{ display: { sm: 'block', md: 'none' } }} item>
    //     <Box>{/* <Invoice details={rest} /> */}</Box>
    //   </Grid>
    // </Grid>
  );
};

export default index;
