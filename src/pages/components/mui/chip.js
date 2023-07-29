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
import ChipFilled from '../../../sections/overview/mui/chips/ChipFilled';
import ChipOutlined from '../../../sections/overview/mui/chips/ChipOutlined';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIChip.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIChip() {
  return (
    <Page title="Components: Chip">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Chip"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Chip' }]}
              moreLink="https://mui.com/components/chips"
            />
          </Container>
        </Box>

        <Container>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              },
            }}
          >
            <Card>
              <CardHeader title="Filled" />
              <CardContent>
                <ChipFilled />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Outlined" />
              <CardContent>
                <ChipOutlined />
              </CardContent>
            </Card>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
