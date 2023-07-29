import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useState, useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, CardContent } from '@mui/material';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

export default function CarouselBasic2() {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(2);

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    fade: Boolean(theme.direction !== 'rtl'),
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
        {_carouselsExample.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Slider>

      <CarouselArrowIndex
        index={currentIndex}
        total={_carouselsExample.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{ bottom: 120 }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
};

function CarouselItem({ item }) {
  const { image, title, description } = item;

  return (
    <>
      <Image alt={title} src={image} ratio="4/3" />

      <CardContent sx={{ textAlign: 'left' }}>
        <Typography variant="h6" noWrap gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
      </CardContent>
    </>
  );
}
