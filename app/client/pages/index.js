import HomePage from '../components/Home';
import fetchJson from '../lib/fetchJson';
export default function Index() {
  return <HomePage />;
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
