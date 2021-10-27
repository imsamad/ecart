import React from 'react';
import withSession from '../lib/session';

import Checkout from '../components/Checkout';

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
