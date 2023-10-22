const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/hashchads/overview',
        permanent: true,
      },
    ]
  },
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://minimal-assets-api-dev.vercel.app',
    // BASE_URL: "https://hashchads.app",
    API_URL: 'https://hashchads.app/api',
    // SOCKET_URL: "https://hashchads.app/prices",
    MIRROR_NODE_URL: "https://mainnet-public.mirrornode.hedera.com",
    NEXT_PUBLIC_GOOGLE_ANALYTICS: 'G-BLH2FRPRLN',
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
  },
  compiler: {
    styledComponents: true
  }
});
