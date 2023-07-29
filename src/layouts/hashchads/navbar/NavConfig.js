// routes
import { PATH_HASHCHADS } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'overview', path: PATH_HASHCHADS.general.overview, icon: ICONS.dashboard },
      { title: 'tokens', path: PATH_HASHCHADS.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'pairs', path: PATH_HASHCHADS.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_HASHCHADS.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_HASHCHADS.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_HASHCHADS.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_HASHCHADS.user.profile },
  //         { title: 'cards', path: PATH_HASHCHADS.user.cards },
  //         { title: 'list', path: PATH_HASHCHADS.user.list },
  //         { title: 'create', path: PATH_HASHCHADS.user.new },
  //         { title: 'edit', path: PATH_HASHCHADS.user.demoEdit },
  //         { title: 'account', path: PATH_HASHCHADS.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  //     {
  //       title: 'ecommerce',
  //       path: PATH_HASHCHADS.eCommerce.root,
  //       icon: ICONS.cart,
  //       children: [
  //         { title: 'shop', path: PATH_HASHCHADS.eCommerce.shop },
  //         { title: 'product', path: PATH_HASHCHADS.eCommerce.demoView },
  //         { title: 'list', path: PATH_HASHCHADS.eCommerce.list },
  //         { title: 'create', path: PATH_HASHCHADS.eCommerce.new },
  //         { title: 'edit', path: PATH_HASHCHADS.eCommerce.demoEdit },
  //         { title: 'checkout', path: PATH_HASHCHADS.eCommerce.checkout },
  //       ],
  //     },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_HASHCHADS.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_HASHCHADS.invoice.list },
  //         { title: 'details', path: PATH_HASHCHADS.invoice.demoView },
  //         { title: 'create', path: PATH_HASHCHADS.invoice.new },
  //         { title: 'edit', path: PATH_HASHCHADS.invoice.demoEdit },
  //       ],
  //     },

  //     // BLOG
  //     {
  //       title: 'blog',
  //       path: PATH_HASHCHADS.blog.root,
  //       icon: ICONS.blog,
  //       children: [
  //         { title: 'posts', path: PATH_HASHCHADS.blog.posts },
  //         { title: 'post', path: PATH_HASHCHADS.blog.demoView },
  //         { title: 'create', path: PATH_HASHCHADS.blog.new },
  //       ],
  //     },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_HASHCHADS.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     { title: 'chat', path: PATH_HASHCHADS.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_HASHCHADS.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_HASHCHADS.kanban, icon: ICONS.kanban },
  //   ],
  // },

  // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'item_by_roles',
  //       path: PATH_HASHCHADS.permissionDenied,
  //       icon: ICONS.menuItem,
  //       roles: ['admin'],
  //       caption: 'only_admin_can_see_this_item',
  //     },
  //     {
  //       title: 'menu_level_1',
  //       path: '#/hashchads/menu_level_1',
  //       icon: ICONS.menuItem,
  //       children: [
  //         { title: 'menu_level_2a', path: '#/hashchads/menu_level_1/menu_level_2a' },
  //         {
  //           title: 'menu_level_2b',
  //           path: '#/hashchads/menu_level_1/menu_level_2b',
  //           children: [
  //             {
  //               title: 'menu_level_3a',
  //               path: '#/hashchads/menu_level_1/menu_level_2b/menu_level_3a',
  //             },
  //             {
  //               title: 'menu_level_3b',
  //               path: '#/hashchads/menu_level_1/menu_level_2b/menu_level_3b',
  //               children: [
  //                 {
  //                   title: 'menu_level_4a',
  //                   path: '#/hashchads/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4a',
  //                 },
  //                 {
  //                   title: 'menu_level_4b',
  //                   path: '#/hashchads/menu_level_1/menu_level_2b/menu_level_3b/menu_level_4b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     { title: 'item_disabled', path: '#disabled', icon: ICONS.menuItem, disabled: true },
  //     {
  //       title: 'item_label',
  //       path: '#label',
  //       icon: ICONS.menuItem,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'item_caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     { title: 'item_external_link', path: 'https://www.google.com/', icon: ICONS.menuItem },
  //   ],
  // },
];

export default navConfig;
