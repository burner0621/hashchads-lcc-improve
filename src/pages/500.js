import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
// @mui
import { Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { SeverErrorIllustration } from '../assets';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

Page500.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <Page title="500 Internal Server Error">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              500 Internal Server Error
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>There was an error, please try again later.</Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>

          <NextLink href="/" passHref>
            <Button size="large" variant="contained">
              Go to Home
            </Button>
          </NextLink>
        </ContentStyle>
      </Container>
    </Page>
  );
}
