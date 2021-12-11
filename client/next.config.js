const withPwa = require('next-pwa');
module.exports = withPwa({
  pwa: {
    dest: 'public',
    swSrc: 'service-worker.js',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },   {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },},);
