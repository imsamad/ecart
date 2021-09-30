import React from 'react';
import Buy from '../components/Buy';
import withSession from '../lib/session';
const buy = () => {
  return <Buy />;
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=buy',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
export default buy;
