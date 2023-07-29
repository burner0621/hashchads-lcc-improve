// @mui
import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles';
import { Box, Card, CardHeader, Container, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import TextMaxLine from '../../../components/TextMaxLine';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoTextMaxLine.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoTextMaxLine() {
  return (
    <Page title="Components: TextMaxLine">
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
              heading="TextMaxLine"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'TextMaxLine' }]}
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={3} spacing={3}>
            <Card>
              <CardHeader title="1 Line" />
              <CardContent>
                <TextMaxLine line={1}>
                  Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                  convallis tellus, vitae iaculis lacus elit id tortor.
                </TextMaxLine>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="2 Line" />
              <CardContent>
                <TextMaxLine>
                  Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                  convallis tellus, vitae iaculis lacus elit id tortor.
                </TextMaxLine>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="3 Line" />
              <CardContent>
                <TextMaxLine line={3}>
                  Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                  convallis tellus, vitae iaculis lacus elit id tortor.
                </TextMaxLine>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="4 Line" />
              <CardContent>
                <TextMaxLine line={4}>
                  Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                  convallis tellus, vitae iaculis lacus elit id tortor.
                </TextMaxLine>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="As Link" />
              <CardContent>
                <TextMaxLine asLink line={3} href="#" color="primary" sx={{ maxWidth: 300 }}>
                  Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna. Proin sapien ipsum,
                  porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante
                  convallis tellus, vitae iaculis lacus elit id tortor.
                </TextMaxLine>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Persistent" />
              <CardContent>
                <TextMaxLine persistent line={3} href="#" sx={{ bgcolor: 'background.neutral' }}>
                  Donec posuere vulputate arcu.
                </TextMaxLine>
              </CardContent>
            </Card>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
