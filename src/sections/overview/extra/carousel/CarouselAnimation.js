import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Card, Paper, Button, Typography, CardContent } from '@mui/material';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import { MotionContainer, varFade } from '../../../../components/animate';
import { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

export default function CarouselAnimation() {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? _carouselsExample.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {_carouselsExample.map((item, index) => (
          <CarouselItem key={item.id} item={item} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselArrowIndex
        index={currentIndex}
        total={_carouselsExample.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  isActive: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { image, title } = item;

  return (
    <Paper sx={{ position: 'relative' }}>
      <Image alt={title} src={image} ratio="16/9" />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
            theme.palette.grey[900],
            0
          )} 100%)`,
        }}
      />
      <CardContent
        component={MotionContainer}
        animate={isActive}
        action
        sx={{
          bottom: 0,
          width: '100%',
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="h3" gutterBottom>
            {item.title}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap gutterBottom>
            {item.description}
          </Typography>
        </m.div>
        <m.div variants={varFade().inRight}>
          <Button variant="contained" sx={{ mt: 3 }}>
            View More
          </Button>
        </m.div>
      </CardContent>
    </Paper>
  );
}
