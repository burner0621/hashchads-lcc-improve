import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, IconButton } from '@mui/material';
// utils
import cssStyles from '../../../../utils/cssStyles';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { CarouselArrows } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const ContentItemStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ color: theme.palette.grey[900] }),
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  justifyContent: 'space-between',
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
}));

// ----------------------------------------------------------------------

export default function CarouselBasic4() {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
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
            <CarouselItem key={item.id} item={item} />
          ))}
        </Slider>
      </CarouselArrows>
    </Card>
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
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Image alt={title} src={image} ratio="1/1" />

      <ContentItemStyle>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
        <IconButton
          onClick={() => {}}
          sx={{
            color: 'common.white',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.common.white, theme.palette.action.hoverOpacity),
            },
          }}
        >
          <Iconify icon={'eva:more-horizontal-fill'} />
        </IconButton>
      </ContentItemStyle>
    </Box>
  );
}
