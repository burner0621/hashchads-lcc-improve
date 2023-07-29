import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container component={MotionViewport} sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://minimal-assets-api-dev.vercel.app/assets/images/about/vision.jpg"
          alt="about-vision"
          effect="black-and-white"
        />

        <Box
          sx={{
            bottom: { xs: 24, md: 80 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
          }}
        >
          {['logo_amazon', 'logo_hbo', 'logo_ibm', 'logo_lya', 'logo_spotify', 'logo_netflix'].map((logo) => (
            <m.div key={logo} variants={varFade().in}>
              <Image
                alt={logo}
                src={`https://minimal-assets-api-dev.vercel.app/assets/images/logos/${logo}.svg`}
                sx={{
                  m: { xs: 1.5, md: 3 },
                  height: { xs: 24, md: 32 },
                }}
              />
            </m.div>
          ))}
        </Box>
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Our vision offering the best product nulla vehicula tortor scelerisque ultrices malesuada.
            </Typography>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
