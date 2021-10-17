import React from 'react';
import Checkout from '../components/Checkout';
import withSession from '../lib/session';
const checkout = () => {
  return <Checkout />;
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=checkout',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
export default checkout;
