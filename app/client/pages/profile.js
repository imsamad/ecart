import withSession from '../lib/session';

const profile = ({ user: { name, email } }) => {
  return (
    <div>
      Profile
      <h4>Name:- {name}</h4>
      <h4>Email:- {email}</h4>
    </div>
  );
};
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=/profile',
        permanent: false,
      },
    };
  }
  const { name, email } = req.session.get('user');
  return {
    props: { user: { name, email } },
  };
});
export default profile;
