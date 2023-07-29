// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Card, Container, CardHeader, CardContent } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  CarouselBasic1,
  CarouselBasic2,
  CarouselBasic3,
  CarouselBasic4,
  CarouselAnimation,
  CarouselThumbnail,
  CarouselCenterMode,
} from '../../../sections/overview/extra/carousel';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoCarousels.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoCarousels() {
  return (
    <Page title="Components: Carousels">
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
              heading="Carousel"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Carousel' }]}
              moreLink="https://react-slick.neostack.com"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Card>
              <CardHeader title="Carousel Basic 1" />
              <CardContent>
                <CarouselBasic1 />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Carousel Basic 2" />
              <CardContent>
                <CarouselBasic2 />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Carousel Basic 3" />
              <CardContent>
                <CarouselBasic3 />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Carousel Basic 4" />
              <CardContent>
                <CarouselBasic4 />
              </CardContent>
            </Card>
          </Masonry>

          <Stack spacing={3}>
            <Card>
              <CardHeader title="Carousel Thumbnail" />
              <CardContent>
                <CarouselThumbnail />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Carousel Center Mode" />
              <CardContent>
                <CarouselCenterMode />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Carousel Animation" />
              <CardContent>
                <CarouselAnimation />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
