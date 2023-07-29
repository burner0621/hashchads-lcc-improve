import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
import _mock from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Image from '../../../components/Image';
import LightboxModal from '../../../components/LightboxModal';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const imagesLightbox = [...Array(8)].map((_, index) => _mock.image.feed(index + 1));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoLightbox.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoLightbox() {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Page title="Components: Lightbox">
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
              heading="Lightbox"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Lightbox' }]}
              moreLink="https://www.npmjs.com/package/react-image-lightbox"
            />
          </Container>
        </Box>

        <Container>
          <Card
            sx={{
              p: 3,
              display: 'grid',
              gap: 1.5,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {imagesLightbox.map((img) => (
              <Image
                key={img}
                alt={img}
                src={img}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
              />
            ))}
          </Card>
        </Container>
      </RootStyle>

      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </Page>
  );
}
