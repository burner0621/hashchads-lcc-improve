import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Button, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(24, 0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0,
  },
}));

const ScreenStyle = styled(m.div)(({ theme }) => ({
  paddingRight: 2,
  paddingBottom: 1,
  maxWidth: 160,
  borderRadius: 8,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 300 : 800],
  [theme.breakpoints.up('sm')]: {
    maxWidth: 320,
    paddingRight: 4,
    borderRadius: 12,
  },
  '& img': {
    borderRadius: 8,
    [theme.breakpoints.up('sm')]: {
      borderRadius: 12,
    },
  },
}));

const COMMON = {
  scaleX: 0.86,
  skewY: 8,
  skewX: 0,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  opacity: 0,
};

const variantScreenLeft = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '-50%', translateY: 40, opacity: 1 },
};

const variantScreenCenter = {
  initial: COMMON,
  animate: { ...COMMON, opacity: 1 },
};

const variantScreenRight = {
  initial: COMMON,
  animate: { ...COMMON, translateX: '50%', translateY: -40, opacity: 1 },
};

// ----------------------------------------------------------------------

export default function HomeHugePackElements() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const isRTL = theme.direction === 'rtl';

  const screenLeftAnimate = variantScreenLeft;

  const screenCenterAnimate = variantScreenCenter;

  const screenRightAnimate = variantScreenRight;

  return (
    <MotionViewport disableAnimatedMobile={false}>
      <RootStyle>
        <Container>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <ContentStyle>
                <m.div variants={varFade().inUp}>
                  <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
                    Interface Starter Kit
                  </Typography>
                </m.div>

                <m.div variants={varFade().inUp}>
                  <Typography variant="h2" sx={{ mb: 3 }}>
                    Huge pack <br />
                    of elements
                  </Typography>
                </m.div>

                <m.div variants={varFade().inUp}>
                  <Typography
                    sx={{
                      mb: 5,
                      color: isLight ? 'text.secondary' : 'common.white',
                    }}
                  >
                    We collected most popular elements. Menu, sliders, buttons, inputs etc. are all here. Just dive in!
                  </Typography>
                </m.div>

                <m.div variants={varFade().inUp}>
                  <Button
                    size="large"
                    color="inherit"
                    variant="outlined"
                    target="_blank"
                    rel="noopener"
                    href="https://www.minimals.cc/components/"
                  >
                    View All Components
                  </Button>
                </m.div>
              </ContentStyle>
            </Grid>

            <Grid item xs={12} md={8} dir="ltr">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  justifyContent: 'center',
                }}
              >
                {[...Array(3)].map((_, index) => (
                  <ScreenStyle
                    key={index}
                    variants={{
                      ...(index === 0 && screenLeftAnimate),
                      ...(index === 1 && screenCenterAnimate),
                      ...(index === 2 && screenRightAnimate),
                    }}
                    transition={{ duration: 0.72, ease: 'easeOut' }}
                    sx={{
                      boxShadow: `${isRTL ? -80 : 80}px -40px 80px ${alpha(
                        isLight ? theme.palette.grey[600] : theme.palette.common.black,
                        0.48
                      )}`,
                      ...(index === 0 && {
                        zIndex: 3,
                        position: 'absolute',
                      }),
                      ...(index === 1 && { zIndex: 2 }),
                      ...(index === 2 && {
                        zIndex: 1,
                        position: 'absolute',
                        boxShadow: 'none',
                      }),
                    }}
                  >
                    <Image
                      disabledEffect
                      alt={`screen ${index + 1}`}
                      src={`https://minimal-assets-api-dev.vercel.app/assets/images/home/screen_${
                        isLight ? 'light' : 'dark'
                      }_${index + 1}.png`}
                    />
                  </ScreenStyle>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </MotionViewport>
  );
}
