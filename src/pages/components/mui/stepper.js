// @mui
import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';
import CustomizedStepper from '../../../sections/overview/mui/stepper/CustomizedStepper';
import VerticalLinearStepper from '../../../sections/overview/mui/stepper/VerticalLinearStepper';
import LinearAlternativeLabel from '../../../sections/overview/mui/stepper/LinearAlternativeLabel';
import HorizontalLinearStepper from '../../../sections/overview/mui/stepper/HorizontalLinearStepper';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIStepper.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIStepper() {
  return (
    <Page title="Components: Stepper">
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
              heading="Stepper"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Stepper' }]}
              moreLink="https://mui.com/components/steppers"
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={3}>
            <Block title="Horizontal Linear Stepper">
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <HorizontalLinearStepper />
              </Paper>
            </Block>

            <Block title="Linear Alternative Label">
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <LinearAlternativeLabel />
              </Paper>
            </Block>

            <Block title="Vertical Linear Stepper">
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <VerticalLinearStepper />
              </Paper>
            </Block>

            <Block title="Customized Stepper">
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8,
                }}
              >
                <CustomizedStepper />
              </Paper>
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
