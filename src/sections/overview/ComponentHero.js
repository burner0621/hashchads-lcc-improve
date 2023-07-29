import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Link, Container, Typography, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}));

// ----------------------------------------------------------------------

export default function ComponentHero() {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container
        component={MotionContainer}
        sx={{
          display: { md: 'flex' },
          justifyContent: { md: 'space-between' },
        }}
      >
        <div>
          <m.div variants={varFade().inUp}>
            <Typography variant="h3" component="h1">
              Components
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Typography
              sx={{
                mt: 3,
                mb: 5,
                color: isLight ? 'text.secondary' : 'common.white',
              }}
            >
              With huge resource pack making deployment
              <br /> easy and expanding more effectively
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Link
              href="https://www.figma.com/file/sI9fbKHIqlikUtfYCPb9lj/%5BPreview%5D-Minimal-Web.03.07.22?node-id=0%3A10803"
              target="_blank"
            >
              <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                <Typography variant="button"> Fast preview</Typography>
                <Iconify icon={'ic:round-arrow-right-alt'} width={20} height={20} />
              </Stack>
            </Link>
          </m.div>
        </div>

        {isDesktop && (
          <m.div variants={varFade().inDown}>
            <Image
              visibleByDefault
              disabledEffect
              alt="hero"
              src="/assets/illustrations/illustration_components.png"
              sx={{ maxWidth: 320 }}
            />
          </m.div>
        )}
      </Container>
    </RootStyle>
  );
}
