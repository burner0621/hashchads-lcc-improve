import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Link } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
};

// ----------------------------------------------------------------------

FoundationIcons.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function FoundationIcons() {
  return (
    <Page title="Foundations: Icons">
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
              heading="Icons"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Icons' }]}
              moreLink={['https://mui.com/components/material-icons', 'https://iconify.design/icon-sets']}
            />
          </Container>
        </Box>

        <Container>
          <Stack spacing={3}>
            <Block title="Material Icons" sx={style}>
              <Link href="https://mui.com/components/icons/#main-content" target="_blank" rel="noopener">
                https://mui.com/components/icons/#main-content
              </Link>
            </Block>

            <Block title="Iconify Icons" sx={style}>
              <Iconify icon="eva:color-palette-fill" width={24} height={24} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'action.active' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'action.disabled' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'primary.main' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'secondary.main' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'info.main' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'success.main' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'warning.main' }} />
              <Iconify icon="eva:color-palette-fill" width={24} height={24} sx={{ color: 'error.main' }} />
            </Block>

            <Block title="Local Icons" sx={style}>
              <SvgIconStyle src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg" />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'action.active' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'action.disabled' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'primary.main' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'secondary.main' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'info.main' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'success.main' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'warning.main' }}
              />
              <SvgIconStyle
                src="https://minimal-assets-api-dev.vercel.app/assets/icons/browser-edge.svg"
                sx={{ color: 'error.main' }}
              />
            </Block>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}
