import HomePage from '../components/Home';
import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Index() {
  const state = useSelector((state) => state);
  // console.log('state', state);
  return <HomePage />;
}
export const getStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  const { data: products } = await axios.get(`${apiUrl}/products`);
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
