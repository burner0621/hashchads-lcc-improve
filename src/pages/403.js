import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets';

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

Page403.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <Page title="403 Forbidden">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              No permission
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              The page you're trying access has restricted access.
              <br />
              Please refer to your system administrator
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
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
