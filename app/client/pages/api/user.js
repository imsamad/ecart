import withSession from '../../lib/session';

export default withSession(async (req, res) => {
  const method = req.method;
  switch (method) {
    case 'GET':
      const user = req.session.get('user');
      if (user)
        return res.json({
          isLoggedIn: true,
          ...user,
        });
      else {
        return res.json({
          isLoggedIn: false,
        });
      }
      break;
    case 'POST':
      const { token, username, email, role } = req.body;
      if (token && username && email && role) {
        req.session.set('user', { token, username, email, role });
        await req.session.save();
        return res.json({ token, username, email, role });
      }
      break;
  }
});
