// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// _mock
import _mock from '../../../_mock';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import OrganizationalChart from '../../../components/organizational-chart';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoOrganizationalChart.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoOrganizationalChart() {
  const theme = useTheme();

  return (
    <Page title="Components: Organizational Chart">
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
              heading="Organizational Chart"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Organizational Chart' }]}
              moreLink={[
                'https://www.npmjs.com/package/react-organizational-chart',
                'https://daniel-hauser.github.io/react-organizational-chart/?path=/story/example-tree--basic',
              ]}
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={5}>
            <Block title="Simple">
              <OrganizationalChart data={SIMPLE_DATA} lineColor={theme.palette.primary.light} />
            </Block>

            <Block title="Standard" sx={{ overflow: 'auto' }}>
              <OrganizationalChart data={SIMPLE_DATA} option="standard" lineHeight={'40px'} />
            </Block>

            <Block title="By Group" sx={{ overflow: 'auto' }}>
              <OrganizationalChart data={DATA} option="group" lineHeight={'64px'} />
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

const createData = (name, group, role, avatar) => ({
  name,
  group,
  role,
  avatar,
});

const SIMPLE_DATA = {
  ...createData('tasha mcneill', 'root', 'ceo, co-founder', _mock.image.avatar(1)),
  children: [
    {
      ...createData('john stone', 'product design', 'lead', _mock.image.avatar(2)),
      children: [
        {
          ...createData('rimsha wynn', 'product design', 'senior', _mock.image.avatar(3)),
          children: null,
        },
      ],
    },
    {
      ...createData('ponnappa priya', 'development', 'lead', _mock.image.avatar(4)),
      children: [
        {
          ...createData('tyra elliott', 'development', 'senior', _mock.image.avatar(5)),
          children: [
            {
              ...createData('sheridan mckee', 'development', 'back end developer', _mock.image.avatar(6)),
              children: [
                {
                  ...createData('ang li', 'development', 'back end developer', _mock.image.avatar(7)),
                  children: null,
                },
              ],
            },
            {
              ...createData('hope ahmad', 'development', 'front end', _mock.image.avatar(8)),
              children: null,
            },
          ],
        },
      ],
    },
    {
      ...createData('peter stanbridge', 'marketing', 'lead', _mock.image.avatar(9)),
      children: [
        {
          ...createData('madeline harding', 'marketing', 'support', _mock.image.avatar(10)),
          children: null,
        },
        {
          ...createData('eoin medrano', 'marketing', 'content writer', _mock.image.avatar(11)),
          children: null,
        },
      ],
    },
  ],
};

const DATA = {
  ...createData('tasha mcneill', 'root', 'ceo, co-founder', _mock.image.avatar(1)),
  children: [
    {
      ...createData('product design', 'product design', null, null),
      children: [
        {
          ...createData('john stone', 'product design', 'lead', _mock.image.avatar(2)),
          children: [
            {
              ...createData('rimsha wynn', 'product design', 'senior', _mock.image.avatar(3)),
              children: null,
            },
          ],
        },
      ],
    },
    {
      ...createData('development', 'development', null, null),
      children: [
        {
          ...createData('ponnappa priya', 'development', 'lead', _mock.image.avatar(4)),
          children: [
            {
              ...createData('tyra elliott', 'development', 'senior', _mock.image.avatar(5)),
              children: [
                {
                  ...createData('sheridan mckee', 'development', 'back end developer', _mock.image.avatar(6)),
                  children: [
                    {
                      ...createData('ang li', 'development', 'back end developer', _mock.image.avatar(7)),
                      children: null,
                    },
                  ],
                },
                {
                  ...createData('hope ahmad', 'development', 'front end', _mock.image.avatar(8)),
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      ...createData('marketing', 'marketing', null, null),
      children: [
        {
          ...createData('peter stanbridge', 'marketing', 'lead', _mock.image.avatar(9)),
          children: [
            {
              ...createData('madeline harding', 'marketing', 'support', _mock.image.avatar(10)),
              children: null,
            },
            {
              ...createData('eoin medrano', 'marketing', 'content writer', _mock.image.avatar(11)),
              children: null,
            },
          ],
        },
      ],
    },
  ],
};
