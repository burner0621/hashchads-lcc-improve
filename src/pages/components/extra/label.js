import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Stack, Paper, CardHeader } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoLabel.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoLabel() {
  return (
    <Page title="Components: Label">
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
              heading="Label"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Label' }]}
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={3}>
            <Block title="Filled">
              <Label variant="filled">Default</Label>
              <Label color="primary" variant="filled">
                Primary
              </Label>
              <Label color="secondary" variant="filled">
                Secondary
              </Label>
              <Label color="info" variant="filled">
                Info
              </Label>
              <Label color="success" variant="filled">
                Success
              </Label>
              <Label color="warning" variant="filled">
                Waring
              </Label>
              <Label color="error" variant="filled">
                Error
              </Label>
            </Block>

            <Block title="Outlined">
              <Label variant="outlined">Default</Label>
              <Label color="primary" variant="outlined">
                Primary
              </Label>
              <Label color="secondary" variant="outlined">
                Secondary
              </Label>
              <Label color="info" variant="outlined">
                Info
              </Label>
              <Label color="success" variant="outlined">
                Success
              </Label>
              <Label color="warning" variant="outlined">
                Waring
              </Label>
              <Label color="error" variant="outlined">
                Error
              </Label>
            </Block>

            <Block title="Ghost">
              <Label>Default</Label>
              <Label color="primary">Primary</Label>
              <Label color="secondary">Secondary</Label>
              <Label color="info">Info</Label>
              <Label color="success">Success</Label>
              <Label color="warning">Waring</Label>
              <Label color="error">Error</Label>
            </Block>

            <Block title="With Icon">
              <Label variant="filled" color="primary" startIcon={<Iconify icon="eva:email-fill" />}>
                Start Icon
              </Label>
              <Label variant="filled" color="primary" endIcon={<Iconify icon="eva:email-fill" />}>
                End Icon
              </Label>
              <Label variant="outlined" color="primary" startIcon={<Iconify icon="eva:email-fill" />}>
                Start Icon
              </Label>
              <Label variant="outlined" color="primary" endIcon={<Iconify icon="eva:email-fill" />}>
                End Icon
              </Label>
              <Label color="primary" startIcon={<Iconify icon="eva:email-fill" />}>
                Start Icon
              </Label>
              <Label color="primary" endIcon={<Iconify icon="eva:email-fill" />}>
                End Icon
              </Label>
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export function Block({ title, children }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}
      <Box
        sx={{
          p: 5,
          minHeight: 180,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          '& > *': { mx: 1 },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}
