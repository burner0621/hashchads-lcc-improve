// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, CardHeader } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
import _mock from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoImage.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

const RATIO = ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1'];

const IMAGES = RATIO.map((value, index) => ({
  value,
  url: _mock.image.feed(index + 1),
}));

export default function DemoImage() {
  return (
    <Page title="Components: Image">
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
              heading="Image"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Image' }]}
            />
          </Container>
        </Box>

        <Container>
          <Card>
            <CardHeader title="Image Aspect Ratio" />
            <Box
              sx={{
                p: 3,
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(4, 1fr)',
                },
              }}
            >
              {IMAGES.map((img) => (
                <Box key={img.value}>
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    {img.value}
                  </Typography>
                  <Image alt={img.value} src={img.url} ratio={img.value} sx={{ borderRadius: 1 }} />
                </Box>
              ))}
            </Box>
          </Card>
        </Container>
      </RootStyle>
    </Page>
  );
}
