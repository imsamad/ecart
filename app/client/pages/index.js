import HomePage from '../components/Home';
import axios from 'axios';
export default function Index({ products }) {
  return <HomePage products={products.data} />;
}
export const getStaticProps = async () => {
  const apiUrl = process.env.API_URL;
  const { data } = await axios.get(`${apiUrl}/products`);
  return { props: { products: data } };
};
