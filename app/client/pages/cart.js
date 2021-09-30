import Cart from '../components/Cart';
import withSession from '../lib/session';
import fetchJson from '../lib/fetchJson';

const cart = () => {
  // console.log('Page/cart');

  return <Cart />;
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=cart',
        permanent: false,
      },
    };
  }
  const api = process.env.API_URL + '/carts';
  const { token } = req.session.get('user');
  let { cart } = await fetchJson({
    url: api,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (cart === null) {
    cart = {
      productItems: [],
    };
  }
  return {
    props: {
      data: cart,

      reduxData: {
        reducerName: 'cart',
        fieldName: 'cart',
      },
    },
  };
});
export default cart;
