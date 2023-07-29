import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Inview, OtherView, ScrollView, DialogView, BackgroundView } from '../../../sections/overview/extra/animate';

// ----------------------------------------------------------------------

const TAB_LIST = [
  { label: 'In View', component: <Inview /> },
  { label: 'Scroll', component: <ScrollView /> },
  { label: 'Dialog', component: <DialogView /> },
  { label: 'Background', component: <BackgroundView /> },
  { label: 'Other', component: <OtherView /> },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoAnimate.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoAnimate() {
  const [value, setValue] = useState('In View');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Components: Animate">
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
              heading="Animate"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Animate' }]}
              moreLink="https://www.framer.com/api/motion"
            />
          </Container>
        </Box>

        <Container>
          <TabContext value={value}>
            <Box sx={{ mb: 5 }}>
              <TabList onChange={handleChangeTab}>
                {TAB_LIST.map((tab) => (
                  <Tab key={tab.label} label={tab.label} value={tab.label} disableRipple />
                ))}
              </TabList>
            </Box>
            {TAB_LIST.map((tab) => (
              <TabPanel key={tab.label} value={tab.label}>
                {tab.component}
              </TabPanel>
            ))}
          </TabContext>
        </Container>
      </RootStyle>
    </Page>
  );
}
