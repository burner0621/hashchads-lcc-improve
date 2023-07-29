// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Stack, Container, Typography, Breadcrumbs as MBreadcrumbs } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIBreadcrumbs.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIBreadcrumbs() {
  return (
    <Page title="Components: Breadcrumbs">
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
              heading="Breadcrumbs"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Breadcrumbs' }]}
              moreLink="https://mui.com/components/breadcrumbs"
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={3}>
            <Block title="Text" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MBreadcrumbs>
                <Link color="inherit" href="#">
                  Material-UI
                </Link>
                <Link color="inherit" href="#">
                  Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
              </MBreadcrumbs>
            </Block>

            <Block title="With Icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MBreadcrumbs>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="eva:home-fill" sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Material-UI
                </Link>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="eva:camera-fill" sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Core
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary',
                  }}
                >
                  <Iconify icon="eva:bell-fill" sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Breadcrumb
                </Typography>
              </MBreadcrumbs>
            </Block>

            <Block title="Customized" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs
                links={[
                  {
                    name: 'Home',
                    href: '#',
                    icon: <Iconify icon="eva:home-fill" />,
                  },
                  { name: 'Link1', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                  { name: 'Link2', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                  { name: 'Link3', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                  { name: 'Link4', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                  { name: 'Link5', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                ]}
              />
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
