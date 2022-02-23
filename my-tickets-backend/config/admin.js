module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'bd90da4756ba98834c1d51970b58868e'),
  },
  watchIgnoreFiles: [
    '**/config/sync/**',
  ]
});
