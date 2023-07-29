// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, AppBar, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
import { NAVBAR } from '../../../config';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  MenuConfig,
  MegaMenuMobile,
  MegaMenuDesktopHorizon,
  MegaMenuDesktopVertical,
} from '../../../components/mega-menu';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoMegaMenu.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoMegaMenu() {
  return (
    <Page title="Mega Menu">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Mega Menu"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Mega Menu' }]}
            />
          </Container>
        </Box>

        <AppBar
          position="static"
          color="transparent"
          sx={{
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          <Container sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu Horizon
            </Typography>
            <MegaMenuDesktopHorizon navConfig={MenuConfig} />
          </Container>
        </AppBar>

        <Container sx={{ mt: 10 }}>
          <MegaMenuMobile navConfig={MenuConfig} />

          <Stack direction="row" spacing={3} mt={5}>
            <Card sx={{ width: NAVBAR.BASE_WIDTH, flexShrink: 0, overflow: 'unset', zIndex: 9 }}>
              <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Iconify icon={'eva:list-fill'} sx={{ mr: 1, width: 24, height: 24 }} /> Menu Vertical
              </Typography>
              <MegaMenuDesktopVertical navConfig={MenuConfig} />
            </Card>

            <Image
              alt="any photo"
              src="https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_8.jpg"
              ratio="21/9"
              sx={{ borderRadius: 1 }}
            />
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
