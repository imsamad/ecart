import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  const { token, name, email } = req.body;
  if (user)
    return res.json({
      isLoggedIn: true,
      ...user,
    });
  if (token && name && email) {
    await req.session.save();
    return res.json({ token, name, email });
  } else
    res.json({
      isLoggedIn: false,
    });
});
