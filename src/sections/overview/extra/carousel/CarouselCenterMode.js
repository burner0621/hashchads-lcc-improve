import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Paper, Link, CardContent } from '@mui/material';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import TextMaxLine from '../../../../components/TextMaxLine';
import { CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(() => ({
  overflow: 'hidden',
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function CarouselCenterMode() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <CarouselArrows
        filled
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{
          '& .arrow': {
            '&.left': { left: 16 },
            '&.right': { right: 16 },
          },
        }}
      >
        <Slider ref={carouselRef} {...settings}>
          {_carouselsExample.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Slider>
      </CarouselArrows>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Paper
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image alt={title} src={image} ratio="3/4" />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          backgroundImage: (theme) =>
            `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(theme.palette.grey[900], 0)} 100%)`,
        }}
      >
        <TextMaxLine variant="h4" paragraph>
          {title}
        </TextMaxLine>
        <Link
          color="inherit"
          variant="overline"
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: (theme) => theme.transitions.create('opacity'),
            '&:hover': { opacity: 1 },
          }}
        >
          learn More
          <Iconify icon={'eva:arrow-forward-fill'} sx={{ width: 16, height: 16, ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}
