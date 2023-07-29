// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Container, CardHeader, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ReactHookForm } from '../../../sections/overview/extra/form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoFormValidation.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoFormValidation() {
  return (
    <Page title="Form Validation">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Form Validation"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Form Validation' }]}
              moreLink={['https://react-hook-form.com/', 'https://github.com/jquense/yup']}
            />
          </Container>
        </Box>

        <Container sx={{ mt: 10 }}>
          <Card>
            <CardHeader title="React Hook Form" />
            <CardContent>
              <ReactHookForm />
            </CardContent>
          </Card>
        </Container>
      </RootStyle>
    </Page>
  );
}
