// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Badge } from '@mui/material';
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

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIBadge.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIBadge() {
  return (
    <Page title="Components: Badge">
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
              heading="Badge"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Badge' }]}
              moreLink="https://mui.com/components/badges"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block
              title="Basic"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Badge badgeContent={4}>
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="primary">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="secondary">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="info">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="success">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="warning">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge badgeContent={4} color="error">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>
            </Block>

            <Block
              title="Maximum value"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Badge
                badgeContent={99}
                color="error"
                children={<Iconify icon="eva:email-fill" width={24} height={24} />}
              />
              <Badge
                badgeContent={100}
                color="error"
                children={<Iconify icon="eva:email-fill" width={24} height={24} />}
              />
              <Badge
                badgeContent={1000}
                max={999}
                color="error"
                children={<Iconify icon="eva:email-fill" width={24} height={24} />}
              />
            </Block>

            <Block
              title="Dot badge"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Badge color="info" variant="dot">
                <Iconify icon="eva:email-fill" width={24} height={24} />
              </Badge>

              <Badge color="info" variant="dot">
                <Typography>Typography</Typography>
              </Badge>
            </Block>

            <Block
              title="Badge overlap"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Badge color="info" badgeContent=" ">
                <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
              </Badge>

              <Badge color="info" badgeContent=" " variant="dot">
                <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
              </Badge>

              <Badge color="info" overlap="circular" badgeContent=" ">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'warning.main',
                  }}
                />
              </Badge>

              <Badge color="info" overlap="circular" badgeContent=" " variant="dot">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'warning.main',
                  }}
                />
              </Badge>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
