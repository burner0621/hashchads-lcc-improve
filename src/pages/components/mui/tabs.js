// @mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Tabs, Container } from '@mui/material';
import { TabContext, TabList, TabPanel, Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
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
  '& > *': { mx: '8px !important' },
};

const SIMPLE_TAB = [
  {
    value: '1',
    icon: <Iconify icon="eva:phone-call-fill" width={24} height={24} />,
    label: 'Item One',
    disabled: false,
  },
  {
    value: '2',
    icon: <Iconify icon="eva:heart-fill" width={24} height={24} />,
    label: 'Item Two',
    disabled: false,
  },
  {
    value: '3',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item Three',
    disabled: true,
  },
];

const SCROLLABLE_TAB = [
  {
    value: '1',
    icon: <Iconify icon="eva:phone-call-fill" width={24} height={24} />,
    label: 'Item 1',
  },
  { value: '2', icon: <Iconify icon="eva:heart-fill" width={24} height={24} />, label: 'Item 2' },
  {
    value: '3',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item 3',
  },
  {
    value: '4',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item 4',
  },
  {
    value: '5',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item 5',
  },
  {
    value: '6',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item 6',
  },
  {
    value: '7',
    icon: <Iconify icon="eva:headphones-fill" width={24} height={24} />,
    label: 'Item 7',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUITabs.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUITabs() {
  const { currentTab, onChangeTab } = useTabs('1');

  const { currentTab: scrollable, onChangeTab: onScrollable } = useTabs('1');

  return (
    <Page title="Components: Tabs">
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
              heading="Tabs"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Tabs' }]}
              moreLink="https://mui.com/components/tabs"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block title="Text" sx={style}>
              <TabContext value={currentTab}>
                <TabList onChange={onChangeTab}>
                  {SIMPLE_TAB.map((tab, index) => (
                    <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
                  ))}
                </TabList>
                <Box
                  sx={{
                    p: 2,
                    mt: 2,
                    height: 80,
                    width: '100%',
                    borderRadius: 1,
                    bgcolor: 'grey.50012',
                  }}
                >
                  {SIMPLE_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={String(index + 1)}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
            </Block>

            <Block title="Icon" sx={style}>
              <Tabs value={currentTab} onChange={onChangeTab}>
                {SIMPLE_TAB.map((tab) => (
                  <Tab key={tab.value} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>
            </Block>

            <Block title="Text & Icon" sx={style}>
              <TabContext value={currentTab}>
                <TabList onChange={onChangeTab}>
                  {SIMPLE_TAB.map((tab) => (
                    <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} disabled={tab.disabled} />
                  ))}
                </TabList>
              </TabContext>
            </Block>

            <Block title="Scrollable" sx={style}>
              <Box
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                <Tabs
                  allowScrollButtonsMobile
                  value={scrollable}
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={onScrollable}
                >
                  {SCROLLABLE_TAB.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
              </Box>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
