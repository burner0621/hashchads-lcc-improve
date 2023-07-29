// @mui
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
import { NAVBAR } from '../../../config';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { NavSectionVertical } from '../../../components/nav-section';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoNavigationBar.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoNavigationBar() {
  return (
    <Page title="Components: Navigation Bar">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Navigation Bar"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Navigation Bar' }]}
            />
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              py: 5,
              borderRadius: 2,
              maxWidth: NAVBAR.BASE_WIDTH,
              bgcolor: 'background.default',
              boxShadow: (theme) => theme.customShadows.z24,
            }}
          >
            <NavSectionVertical navConfig={NAV_ITEMS} />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    subheader: 'Marketing',
    items: [
      {
        title: 'Landing',
        path: '#',
        icon: <Iconify icon="carbon:bat" />,
      },
      {
        title: 'Services',
        path: '#',
        icon: <Iconify icon="carbon:cyclist" />,
      },
      {
        title: 'Case Studies',
        path: '#',
        icon: <Iconify icon="carbon:3d-cursor-alt" />,
        children: [
          { title: 'Case Studies', path: '#' },
          { title: 'Case Study', path: '#' },
        ],
      },
      {
        title: 'Blog',
        path: '#',
        icon: <Iconify icon="carbon:3d-mpr-toggle" />,
        children: [
          { title: 'Blog Posts', path: '#' },
          { title: 'Blog Post', path: '#' },
        ],
      },
      {
        title: 'About',
        path: '#',
        icon: <Iconify icon="carbon:airport-01" />,
      },
      {
        title: 'Contact',
        path: '#',
        icon: <Iconify icon="carbon:battery-full" />,
      },
      {
        title: 'Tours',
        path: '#',
        icon: <Iconify icon="carbon:basketball" />,
        children: [
          { title: 'Tours', path: '#' },
          { title: 'Tour', path: '#' },
        ],
      },
      {
        title: 'Checkout',
        path: '#',
        icon: <Iconify icon="carbon:area" />,
        children: [
          { title: 'Checkout', path: '#' },
          { title: 'Checkout Complete', path: '#' },
        ],
      },
    ],
  },
  {
    subheader: 'Travel',
    items: [
      {
        title: 'Level 1',
        path: '#',
        icon: <Iconify icon="carbon:play" />,
        children: [
          { title: 'Level 2.1', path: '#' },
          { title: 'Level 2.2', path: '#' },
          {
            title: 'Level 2.3',
            path: '#',
            children: [
              { title: 'Level 3.1', path: '#' },
              { title: 'Level 3.2', path: '#' },
            ],
          },
        ],
      },
    ],
  },
];
