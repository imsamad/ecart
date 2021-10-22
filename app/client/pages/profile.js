import Profile from '../components/Profile';

import withSession from '../lib/session';
const profile = () => {
  return <Profile />;
};

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');

  const { token } = user;
  if (!token) {
    return {
      redirect: {
        destination: '/login?redirectTo=profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: user,
      reduxData: {
        reducerName: 'profile',
        fieldName: 'user',
      },
    },
  };
});

export default profile;
