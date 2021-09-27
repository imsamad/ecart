import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  const { token, username, email } = req.body;
  if (user)
    return res.json({
      isLoggedIn: true,
      ...user,
    });
  if (token && username && email) {
    req.session.set('user', { token, username, email });
    await req.session.save();
    return res.json({ token, username, email });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
