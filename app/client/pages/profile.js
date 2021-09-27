import withSession from '../lib/session';

const profile = ({ user: { username, email } }) => {
  return (
    <div>
      Profile
      <h4>Name:- {username}</h4>
      <h4>Email:- {email}</h4>
    </div>
  );
};
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get('user');
  if (!user) {
    return {
      redirect: {
        destination: '/login?redirectTo=check',
        permanent: false,
      },
    };
  }
  const { username, email } = req.session.get('user');
  return {
    props: { user: { username, email } },
  };
});
export default profile;
