// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ComponentMUI, ComponentHero, ComponentExtra, ComponentFoundation } from '../../sections/overview';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

Overview.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Overview() {
  return (
    <Page title="Components Overview">
      <RootStyle>
        <ComponentHero />

        <Container sx={{ mt: 10 }}>
          <ComponentFoundation />

          <ComponentMUI />

          <ComponentExtra />
        </Container>
      </RootStyle>
    </Page>
  );
}
