import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container } from '@mui/material';
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

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoSnackbar.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSnackbarAction = (color, anchor) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      anchorOrigin: anchor,
      action: (key) => (
        <>
          <Button
            size="small"
            color={color !== 'default' ? color : 'primary'}
            onClick={() => {
              console.log(`I belong to snackbar with key ${key}`);
            }}
          >
            Alert
          </Button>
          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            Dismiss
          </Button>
        </>
      ),
    });
  };

  return (
    <Page title="Components: Snackbar">
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
              heading="Snackbar"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Snackbar' }]}
              moreLink={['https://mui.com/components/snackbars', 'https://www.iamhosseindhv.com/notistack']}
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Simple" sx={style}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => enqueueSnackbar('This is an default', { variant: 'default' })}
              >
                Default
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => enqueueSnackbar('This is an info', { variant: 'info' })}
              >
                Info
              </Button>
              <Button variant="contained" color="success" onClick={() => enqueueSnackbar('This is an success', {})}>
                Success
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() =>
                  enqueueSnackbar('This is an warning', {
                    variant: 'warning',
                  })
                }
              >
                Warning
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => enqueueSnackbar('This is an error', { variant: 'error' })}
              >
                Error
              </Button>
            </Block>

            <Block title="With Close" sx={style}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() =>
                  enqueueSnackbar('This is an default', {
                    variant: 'default',
                  })
                }
              >
                Default
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() =>
                  enqueueSnackbar('This is an info', {
                    variant: 'info',
                  })
                }
              >
                Info
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  enqueueSnackbar('This is an success', {
                    variant: 'success',
                  })
                }
              >
                Success
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() =>
                  enqueueSnackbar('This is an warning', {
                    variant: 'warning',
                  })
                }
              >
                Warning
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  enqueueSnackbar('This is an error', {
                    variant: 'error',
                  })
                }
              >
                Error
              </Button>
            </Block>

            <Block title="With Action" sx={style}>
              <Button variant="contained" color="inherit" onClick={() => onSnackbarAction('default')}>
                Default
              </Button>
              <Button variant="contained" color="info" onClick={() => onSnackbarAction('info')}>
                Info
              </Button>
              <Button variant="contained" color="success" onClick={() => onSnackbarAction('success')}>
                Success
              </Button>
              <Button variant="contained" color="warning" onClick={() => onSnackbarAction('warning')}>
                Warning
              </Button>
              <Button variant="contained" color="error" onClick={() => onSnackbarAction('error')}>
                Error
              </Button>
            </Block>

            <Block title="anchorOrigin" sx={style}>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'top',
                    horizontal: 'left',
                  })
                }
              >
                Top Left
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'top',
                    horizontal: 'center',
                  })
                }
              >
                Top Center
              </Button>
              <Button variant="text" color="inherit" onClick={() => onSnackbarAction('default')}>
                Top Right
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'left',
                  })
                }
              >
                Bottom Left
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'center',
                  })
                }
              >
                Bottom Center
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'right',
                  })
                }
              >
                Bottom Right
              </Button>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
