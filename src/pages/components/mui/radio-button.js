import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Radio, Container, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
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
  '& > *': { mx: 1 },
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIRadioButtons.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIRadioButtons() {
  const [value, setValue] = useState('a1');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Page title="Components: Radio Buttons">
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
              heading="Radio Buttons"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Radio Buttons' }]}
              moreLink="https://mui.com/components/radio-buttons"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Basic" sx={style}>
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="nn">
                  <Radio value="nn" />
                  <Radio value="gg" />
                  <Radio disabled value="hh" />
                </RadioGroup>
              </FormControl>
            </Block>

            <Block title="Size" sx={style}>
              <RadioGroup row defaultValue="g">
                <FormControlLabel value="g" control={<Radio />} label="Normal" />
                <FormControlLabel value="p" control={<Radio size="small" />} label="Small" />
              </RadioGroup>
            </Block>

            <Block title="Placement" sx={style}>
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="top">
                  <FormControlLabel value="top" label="Top" labelPlacement="top" control={<Radio />} />
                  <FormControlLabel value="start" label="Start" labelPlacement="start" control={<Radio />} />
                  <FormControlLabel value="bottom" label="Bottom" labelPlacement="bottom" control={<Radio />} />
                  <FormControlLabel value="end" label="End" control={<Radio />} />
                </RadioGroup>
              </FormControl>
            </Block>

            <Block title="Adding Colors">
              <FormControl component="fieldset">
                <RadioGroup value={value} onChange={handleChange}>
                  <FormControlLabel value="a1" control={<Radio color="default" />} label="Default" />
                  <FormControlLabel value="a2" control={<Radio />} label="Primary" />
                  <FormControlLabel value="a3" control={<Radio color="secondary" />} label="Secondary" />
                  <FormControlLabel value="a4" control={<Radio color="info" />} label="Info" />
                  <FormControlLabel value="a5" control={<Radio color="success" />} label="Success" />
                  <FormControlLabel value="a6" control={<Radio color="warning" />} label="Warning" />
                  <FormControlLabel value="a7" control={<Radio color="error" />} label="Error" />
                  <FormControlLabel disabled value="a8" control={<Radio color="error" />} label="Disabled" />
                </RadioGroup>
              </FormControl>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
