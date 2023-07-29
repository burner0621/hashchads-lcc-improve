// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { FaqsHero, FaqsCategory, FaqsList, FaqsForm } from '../sections/faqs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

Faqs.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Faqs() {
  return (
    <Page title="Faqs">
      <RootStyle>
        <FaqsHero />

        <Container sx={{ mt: 15, mb: 10, position: 'relative' }}>
          <FaqsCategory />

          <Typography variant="h3" sx={{ mb: 5 }}>
            Frequently asked questions
          </Typography>

          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <FaqsList />
            </Grid>
            <Grid item xs={12} md={6}>
              <FaqsForm />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
