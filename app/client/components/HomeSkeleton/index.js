import Skeleton from '../ProductCard/Skeleton';

const index = () =>
  Array.from(Array(12).keys()).map((v) => (
    <Grid key={v} item xs={12} sm={6} md={4} lg={3}>
      <Skeleton />
    </Grid>
  ));
export default index;
