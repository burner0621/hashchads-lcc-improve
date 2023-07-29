import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Checkbox, FormGroup, Container, FormControl, FormControlLabel } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUICheckbox.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUICheckbox() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  return (
    <Page title="Components: Checkbox">
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
              heading="Checkboxes"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Checkboxes' }]}
              moreLink="https://mui.com/components/checkboxes"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Basic" sx={style}>
              <Checkbox />
              <Checkbox defaultChecked />
              <Checkbox defaultChecked indeterminate />
              <Checkbox disabled />
              <Checkbox disabled defaultChecked />
              <Checkbox disabled indeterminate />
            </Block>

            <Block title="Size & Custom Icon" sx={style}>
              <FormControlLabel label="Normal" control={<Checkbox defaultChecked />} />
              <FormControlLabel label="Small" control={<Checkbox defaultChecked size="small" />} />
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    icon={<Iconify icon="eva:heart-outline" />}
                    checkedIcon={<Iconify icon="eva:heart-fill" />}
                  />
                }
                label="Custom icon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    color="error"
                    icon={<Iconify icon={'eva:award-fill'} />}
                    checkedIcon={<Iconify icon={'eva:award-fill'} />}
                  />
                }
                label="Custom icon"
              />
            </Block>

            <Block title="Placement" sx={style}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel value="top" label="Top" labelPlacement="top" control={<Checkbox />} />
                  <FormControlLabel value="start" label="Start" labelPlacement="start" control={<Checkbox />} />
                  <FormControlLabel value="bottom" label="Bottom" labelPlacement="bottom" control={<Checkbox />} />
                  <FormControlLabel value="end" label="End" labelPlacement="end" control={<Checkbox />} />
                </FormGroup>
              </FormControl>
            </Block>

            <Block title="Adding Colors">
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Default" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Primary" />
                <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Secondary" />
                <FormControlLabel control={<Checkbox defaultChecked color="info" />} label="Info" />
                <FormControlLabel control={<Checkbox defaultChecked color="success" />} label="Success" />
                <FormControlLabel control={<Checkbox defaultChecked color="warning" />} label="Warning" />
                <FormControlLabel control={<Checkbox defaultChecked color="error" />} label="Error" />
                <FormControlLabel disabled control={<Checkbox defaultChecked color="error" />} label="Disabled" />
              </FormGroup>

              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked indeterminate color="default" />}
                    label="Default"
                  />
                  <FormControlLabel control={<Checkbox defaultChecked indeterminate />} label="Primary" />
                  <FormControlLabel
                    control={<Checkbox defaultChecked indeterminate color="secondary" />}
                    label="Secondary"
                  />
                  <FormControlLabel control={<Checkbox defaultChecked indeterminate color="info" />} label="Info" />
                  <FormControlLabel
                    control={<Checkbox defaultChecked indeterminate color="success" />}
                    label="Success"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked indeterminate color="warning" />}
                    label="Warning"
                  />
                  <FormControlLabel control={<Checkbox defaultChecked indeterminate color="error" />} label="Error" />
                  <FormControlLabel
                    disabled
                    control={<Checkbox defaultChecked indeterminate color="error" />}
                    label="Disabled"
                  />
                </FormGroup>
              </FormControl>
            </Block>

            <Block title="Indeterminate" sx={style}>
              <div>
                <FormControlLabel
                  label="Parent"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />
                <div>
                  <FormControlLabel
                    label="Child 1"
                    control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                  />
                  <FormControlLabel
                    label="Child 2"
                    control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                  />
                </div>
              </div>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
