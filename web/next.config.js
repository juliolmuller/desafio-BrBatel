module.exports = {
  async redirects() { // eslint-disable-line require-await
    return [
      {
        source: '/',
        destination: '/companies',
        permanent: true,
      },
    ]
  },
}
