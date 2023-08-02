// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_HASHCHADS = '/hashchads';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_HASHCHADS = {
  root: ROOTS_HASHCHADS,
  general: {
    overview: '/',
    // overview: path(ROOTS_HASHCHADS, '/overview'),
    ecommerce: path(ROOTS_HASHCHADS, '/ecommerce'),
    analytics: path(ROOTS_HASHCHADS, '/analytics'),
    banking: path(ROOTS_HASHCHADS, '/banking'),
    booking: path(ROOTS_HASHCHADS, '/booking'),
  },
  tokens: {
    root: path(ROOTS_HASHCHADS, '/tokens'),
    view: (tokenId) => path(ROOTS_HASHCHADS, `/tokens/${tokenId}`),
  },
  pairs: {
    root: path(ROOTS_HASHCHADS, '/pairs'),
    view: (contractId) => path(ROOTS_HASHCHADS, `/pairs/${contractId}`),
  },
  calendar: path(ROOTS_HASHCHADS, '/calendar'),
  kanban: path(ROOTS_HASHCHADS, '/kanban'),
  permissionDenied: path(ROOTS_HASHCHADS, '/permission-denied'),
  user: {
    root: path(ROOTS_HASHCHADS, '/user'),
    new: path(ROOTS_HASHCHADS, '/user/new'),
    list: path(ROOTS_HASHCHADS, '/user/list'),
    cards: path(ROOTS_HASHCHADS, '/user/cards'),
    profile: path(ROOTS_HASHCHADS, '/user/profile'),
    account: path(ROOTS_HASHCHADS, '/user/account'),
    edit: (name) => path(ROOTS_HASHCHADS, `/user/${name}/edit`),
    demoEdit: path(ROOTS_HASHCHADS, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_HASHCHADS, '/e-commerce'),
    shop: path(ROOTS_HASHCHADS, '/e-commerce/shop'),
    list: path(ROOTS_HASHCHADS, '/e-commerce/list'),
    checkout: path(ROOTS_HASHCHADS, '/e-commerce/checkout'),
    new: path(ROOTS_HASHCHADS, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_HASHCHADS, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_HASHCHADS, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_HASHCHADS, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_HASHCHADS, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_HASHCHADS, '/invoice'),
    list: path(ROOTS_HASHCHADS, '/invoice/list'),
    new: path(ROOTS_HASHCHADS, '/invoice/new'),
    view: (id) => path(ROOTS_HASHCHADS, `/invoice/${id}`),
    edit: (id) => path(ROOTS_HASHCHADS, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_HASHCHADS, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_HASHCHADS, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_HASHCHADS, '/blog'),
    posts: path(ROOTS_HASHCHADS, '/blog/posts'),
    new: path(ROOTS_HASHCHADS, '/blog/new'),
    view: (title) => path(ROOTS_HASHCHADS, `/blog/post/${title}`),
    demoView: path(ROOTS_HASHCHADS, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
