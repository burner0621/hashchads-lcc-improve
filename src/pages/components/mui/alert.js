// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Alert, Button, Container, AlertTitle, Stack } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIAlert.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIAlert() {
  return (
    <Page title="Components: Alert">
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
              heading="Alert"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Alert' }]}
              moreLink="https://mui.com/components/alert"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={2} spacing={3}>
            <Block title="Simple">
              <Stack spacing={2}>
                <Alert severity="error" onClose={() => {}}>
                  This is an error alert — check it out!
                </Alert>
                <Alert severity="warning" onClose={() => {}}>
                  This is a warning alert — check it out!
                </Alert>
                <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert>
              </Stack>
            </Block>

            <Block title="Filled">
              <Stack spacing={2}>
                <Alert variant="filled" severity="error" onClose={() => {}}>
                  This is an error alert — check it out!
                </Alert>
                <Alert variant="filled" severity="warning" onClose={() => {}}>
                  This is a warning alert — check it out!
                </Alert>
                <Alert variant="filled" severity="info">
                  This is an info alert — check it out!
                </Alert>
                <Alert variant="filled" severity="success">
                  This is a success alert — check it out!
                </Alert>
              </Stack>
            </Block>

            <Block title="Outlined">
              <Stack spacing={2}>
                <Alert variant="outlined" severity="error" onClose={() => {}}>
                  This is an error alert — check it out!
                </Alert>
                <Alert variant="outlined" severity="warning" onClose={() => {}}>
                  This is a warning alert — check it out!
                </Alert>
                <Alert variant="outlined" severity="info">
                  This is an info alert — check it out!
                </Alert>
                <Alert variant="outlined" severity="success">
                  This is a success alert — check it out!
                </Alert>
              </Stack>
            </Block>

            <Block title="Description">
              <Stack spacing={2}>
                <Alert severity="error" onClose={() => {}}>
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  This is a warning alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  This is an info alert — <strong>check it out!</strong>
                </Alert>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  This is a success alert — <strong>check it out!</strong>
                </Alert>
              </Stack>
            </Block>

            <Block title="Actions">
              <Stack spacing={2}>
                <Alert
                  severity="info"
                  action={
                    <Button color="info" size="small" variant="outlined">
                      Undo
                    </Button>
                  }
                >
                  This is an info alert — check it out!
                </Alert>
                <Alert
                  severity="info"
                  variant="filled"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      variant="outlined"
                      sx={{
                        border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.48)}`,
                      }}
                    >
                      Undo
                    </Button>
                  }
                >
                  This is an info alert — check it out!
                </Alert>
                <Alert
                  severity="info"
                  variant="outlined"
                  action={
                    <Button color="info" size="small" variant="outlined">
                      Undo
                    </Button>
                  }
                >
                  This is an info alert — check it out!
                </Alert>
              </Stack>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
