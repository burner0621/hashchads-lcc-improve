// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Container, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoScrollbar.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoScrollbar() {
  return (
    <Page title="Components: Scrollbar">
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
              heading="Scrollbar"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Scrollbar' }]}
            />
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              alignItems: 'flex-start',
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              },
            }}
          >
            <Card>
              <CardHeader title="Vertical" />
              <CardContent sx={{ height: 320 }}>
                <Scrollbar>
                  Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. Suspendisse nisl
                  elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus
                  consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat
                  pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut,
                  faucibus non, euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada
                  fames ac turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper
                  velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent porttitor,
                  nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Donec mi odio,
                  faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. Suspendisse nisl elit, rhoncus
                  eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. Proin sapien ipsum, porta a, auctor
                  quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer
                  vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium
                  libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non,
                  euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                  turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit.
                  Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent porttitor, nulla
                  vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum.
                </Scrollbar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Horizontal" />
              <CardContent>
                <Scrollbar>
                  <Box sx={{ width: '200%' }}>
                    Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. Suspendisse nisl
                    elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. Proin sapien ipsum,
                    porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus
                    consectetuer vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat
                    pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut,
                    faucibus non, euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis
                    ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent
                    porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Donec
                    mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. Suspendisse nisl elit,
                    rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. Proin sapien ipsum, porta a,
                    auctor quis, euismod ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer
                    vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium
                    libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus
                    non, euismod id, nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
                    ac turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper
                    velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent porttitor,
                    nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum.
                  </Box>
                </Scrollbar>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
