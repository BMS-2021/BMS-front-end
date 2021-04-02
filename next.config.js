/* eslint-disable no-undef */
module.exports = {
  /* config your next.js here */
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'https://ralxyz.dev.zjuqsc.com/api/:slug*',
      },
    ];
  },
};
