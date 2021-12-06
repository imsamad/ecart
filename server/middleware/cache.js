const NodeCache = require("node-cache");
const version = process.env.VERSION;
const cache = new NodeCache();

const excluded = [`/api/${version}/auth`, `/api/${version}/orders`];

const haveUrl = (val) => {
  let flag = false;
  for (var i = 0; i < excluded.length; i++) {
    if (val.includes(excluded[i])) flag = true;
  }
  return flag;
};

module.exports = (duration) => (req, res, next) => {
  // Not cache parameterised url.
  // if (Object.keys(req.query).length !== 0) return next();

  console.log("cache ");
  const key = req.originalUrl;

  if (req.method !== "GET" || haveUrl(key)) return next();

  const cacheResponse = cache.get(key);

  if (cacheResponse) {
    console.log("From cache");
    return res.send(cacheResponse);
  } else {
    res.originalSend = res.send;
    res.send = (body) => {
      cache.set(key, body, duration);
      res.originalSend(body);
    };
  }

  next();
};
