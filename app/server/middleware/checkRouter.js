const checkRouter = (req, res, next) => {
  console.log('From cart Router', req.body);
  next();
};

module.exports = checkRouter;
