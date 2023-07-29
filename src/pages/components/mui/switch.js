// @mui
import { styled } from '@mui/material/styles';
import { Box, Switch, Container, FormGroup, FormControl, FormControlLabel } from '@mui/material';
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

MUISwitch.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUISwitch() {
  return (
    <Page title="Components: Switch">
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
              heading="Switch"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Switch' }]}
              moreLink="https://mui.com/components/switches"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Basic" sx={style}>
              <Switch defaultChecked />
              <Switch />
              <Switch disabled />
              <Switch disabled checked />
              <Switch defaultChecked color="default" />
            </Block>

            <Block title="Sizes" sx={style}>
              <FormControlLabel control={<Switch size="small" />} label="Small" />
              <FormControlLabel control={<Switch />} label="Normal" />
            </Block>

            <Block title="Placement" sx={style}>
              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel value="top" label="Top" labelPlacement="top" control={<Switch />} />
                  <FormControlLabel value="start" label="Start" labelPlacement="start" control={<Switch />} />
                  <FormControlLabel value="bottom" label="Bottom" labelPlacement="bottom" control={<Switch />} />
                  <FormControlLabel value="end" label="End" labelPlacement="end" control={<Switch />} />
                </FormGroup>
              </FormControl>
            </Block>

            <Block title="Adding Colors">
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel control={<Switch defaultChecked color="default" />} label="Default" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Primary" />
                  <FormControlLabel control={<Switch defaultChecked color="info" />} label="Info" />
                  <FormControlLabel control={<Switch defaultChecked color="success" />} label="Success" />
                  <FormControlLabel control={<Switch defaultChecked color="warning" />} label="Warning" />
                  <FormControlLabel control={<Switch defaultChecked color="error" />} label="Error" />
                  <FormControlLabel disabled control={<Switch defaultChecked color="error" />} label="Disabled" />
                  <FormControlLabel disabled control={<Switch color="error" />} label="Disabled" />
                </FormGroup>
              </FormControl>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
