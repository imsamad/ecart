import HomePage from '../components/Home';
import axios from 'axios';
export default function Index() {
  return <HomePage />;
}
export const getStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  const { data: products } = await axios.get(`${apiUrl}/products`);
  return {
    props: {
      data: products,
      reduxData: {
        reducerName: 'productsList',
        fieldName: 'products',
      },
    },
  };
};
