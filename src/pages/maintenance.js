// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// assets
import { MaintenanceIllustration } from '../assets';

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

Maintenance.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Maintenance() {
  return (
    <Page title="Maintenance">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Website currently under maintenance
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

          <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

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
