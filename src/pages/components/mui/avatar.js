// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Badge, Container, AvatarGroup } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Avatar from '../../../components/Avatar';
import Iconify from '../../../components/Iconify';
import BadgeStatus from '../../../components/BadgeStatus';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIAvatar.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIAvatar() {
  const theme = useTheme();

  return (
    <Page title="Components: Avatar">
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
              heading="Avatar"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Avatar' }]}
              moreLink="https://mui.com/components/avatars"
            />
          </Container>
        </Box>
        <Container>
          <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
            <Block
              title="Image avatars"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Avatar
                  key={index}
                  alt="Remy Sharp"
                  src={`https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`}
                />
              ))}
            </Block>

            <Block
              title="Letter avatars"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Avatar>H</Avatar>
              <Avatar color="primary">N</Avatar>
              <Avatar color="info">OP</Avatar>
              <Avatar color="success">CB</Avatar>
              <Avatar color="warning">ZP</Avatar>
              <Avatar color="error">OH</Avatar>
            </Block>

            <Block
              title="Icon avatars"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Avatar color="primary">
                <Iconify icon="eva:folder-add-outline" width={24} height={24} />
              </Avatar>
              <Avatar color="info">
                <Iconify icon="eva:file-text-outline" width={24} height={24} />
              </Avatar>
              <Avatar color="success">
                <Iconify icon="eva:bell-off-outline" width={24} height={24} />
              </Avatar>
            </Block>

            <Block
              title="Variant"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Avatar variant="square" color="primary">
                <Iconify icon="eva:folder-add-outline" width={24} height={24} />
              </Avatar>
              <Avatar variant="rounded" color="info">
                <Iconify icon="eva:file-text-outline" width={24} height={24} />
              </Avatar>
            </Block>

            <Block title="Grouped" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AvatarGroup max={4}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_4.jpg"
                />
                <Avatar color="info">OP</Avatar>
                <Avatar
                  alt="Cindy Baker"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_5.jpg"
                />
                <Avatar
                  alt="Agnes Walker"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_6.jpg"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_7.jpg"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_8.jpg"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_9.jpg"
                />
              </AvatarGroup>
            </Block>

            <Block
              title="With badge"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={
                  <Avatar
                    alt="Travis Howard"
                    src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_7.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: `solid 2px ${theme.palette.background.paper}`,
                    }}
                  />
                }
              >
                <Avatar
                  alt="Travis Howard"
                  src="https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_8.jpg"
                />
              </Badge>

              {['online', 'away', 'busy', 'invisible'].map((status, index) => (
                <Box key={status} sx={{ position: 'relative' }}>
                  <Avatar
                    alt="Travis Howard"
                    src={`https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${index + 7}.jpg`}
                  />
                  <BadgeStatus status={status} sx={{ right: 2, bottom: 2, position: 'absolute' }} />
                </Box>
              ))}
            </Block>

            <Block
              title="Sizes"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& > *': { mx: 1 },
              }}
            >
              {[24, 32, 48, 56, 64, 80, 128].map((size, index) => (
                <Avatar
                  key={size}
                  alt="Travis Howard"
                  src={`https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${index + 4}.jpg`}
                  sx={{ width: size, height: size }}
                />
              ))}
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
