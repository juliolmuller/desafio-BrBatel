module.exports = {
  images: {
    domains: ['localhost'],
  },
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
