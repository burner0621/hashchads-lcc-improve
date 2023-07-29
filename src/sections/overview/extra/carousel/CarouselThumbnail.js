import Slider from 'react-slick';
import { useState, useRef, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
// _mock_
import { _carouselsExample } from '../../../../_mock';
// components
import Image from '../../../../components/Image';
import { CarouselArrowIndex } from '../../../../components/carousel';

// ----------------------------------------------------------------------

const THUMB_SIZE = 64;

const RootStyle = styled(Box)(({ theme }) => {
  const isRTL = theme.direction === 'rtl';

  return {
    root: {
      '& .slick-slide': {
        float: isRTL ? 'right' : 'left',
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function CarouselThumbnail() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [nav1, setNav1] = useState(undefined);

  const [nav2, setNav2] = useState(undefined);

  const slider1 = useRef(null);

  const slider2 = useRef(null);

  const settings1 = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const settings2 = {
    dots: false,
    arrows: false,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: _carouselsExample.length > 3 ? 3 : _carouselsExample.length,
  };

  useEffect(() => {
    if (slider1.current) {
      setNav1(slider1.current);
    }
    if (slider2.current) {
      setNav2(slider2.current);
    }
  }, []);

  const handlePrevious = () => {
    slider2.current?.slickPrev();
  };

  const handleNext = () => {
    slider2.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box
        sx={{
          zIndex: 0,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Slider {...settings1} asNavFor={nav2} ref={slider1}>
          {_carouselsExample.map((item) => (
            <Image key={item.id} alt={item.title} src={item.image} ratio="16/9" />
          ))}
        </Slider>
        <CarouselArrowIndex
          index={currentIndex}
          total={_carouselsExample.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Box>

      <Box
        sx={{
          mt: 3,
          mx: 'auto',
          ...(_carouselsExample.length === 1 && { maxWidth: THUMB_SIZE * 1 + 16 }),
          ...(_carouselsExample.length === 2 && { maxWidth: THUMB_SIZE * 2 + 32 }),
          ...(_carouselsExample.length === 3 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(_carouselsExample.length === 4 && { maxWidth: THUMB_SIZE * 3 + 48 }),
          ...(_carouselsExample.length === 5 && { maxWidth: THUMB_SIZE * 6 }),
        }}
      >
        <Slider {...settings2} asNavFor={nav1} ref={slider2}>
          {_carouselsExample.map((item, index) => (
            <Box key={item.title} sx={{ mx: 1 }}>
              <Image
                alt={item.title}
                src={item.image}
                sx={{
                  opacity: 0.48,
                  borderRadius: 1,
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  ...(currentIndex === index && {
                    opacity: 1,
                    border: (theme) => `solid 3px ${theme.palette.primary.main}`,
                  }),
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </RootStyle>
  );
}
