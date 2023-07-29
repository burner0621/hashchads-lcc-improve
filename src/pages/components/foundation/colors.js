import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { useTheme, hexToRgb, styled } from '@mui/material/styles';
import { Box, Card, Stack, Tooltip, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const PALETTE = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
const COLORS_VARIATIONS = ['lighter', 'light', 'main', 'dark', 'darker'];
const GREY_VARIATIONS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

FoundationColors.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function FoundationColors() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const [, setState] = useState(null);

  const onCopy = (color) => {
    setState(color);
    if (color) {
      enqueueSnackbar(`Copied! ${color}`);
    }
  };

  return (
    <Page title="Foundations: Color">
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
              heading="Color"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Color' }]}
              moreLink={['https://mui.com/customization/color', 'https://colors.eva.design']}
            />
          </Container>
        </Box>

        <Container>
          {PALETTE.map((color) => (
            <Box key={color} sx={{ mb: 5 }}>
              <Typography variant="h5" sx={{ textTransform: 'capitalize', mb: 3 }}>
                {color}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gap: 2.5,
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(5, 1fr)',
                  },
                }}
              >
                {COLORS_VARIATIONS.map((variation) => (
                  <ColorCard
                    key={variation}
                    variation={variation}
                    hexColor={theme.palette[color][variation]}
                    onCopy={() => onCopy(theme.palette[color][variation])}
                  />
                ))}
              </Box>
            </Box>
          ))}

          <Typography variant="h5" sx={{ textTransform: 'capitalize', mb: 3 }}>
            Grey
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
                lg: 'repeat(5, 1fr)',
              },
            }}
          >
            {GREY_VARIATIONS.map((variation) => (
              <ColorCard
                key={variation}
                variation={variation}
                hexColor={theme.palette.grey[variation]}
                onCopy={() => onCopy(theme.palette.grey[variation])}
              />
            ))}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ColorCard.propTypes = {
  hexColor: PropTypes.string,
  onCopy: PropTypes.func,
  variation: PropTypes.string,
};

function ColorCard({ hexColor, variation, onCopy }) {
  return (
    <Card sx={{ p: 1 }}>
      <CopyToClipboard text={hexColor} onCopy={onCopy}>
        <Tooltip title="Copy">
          <IconButton
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              color: (theme) => theme.palette.getContrastText(hexColor),
            }}
          >
            <Iconify icon={'eva:copy-fill'} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>

      <Box
        sx={{
          bgcolor: hexColor,
          paddingTop: '75%',
          borderRadius: 1,
          border: (theme) => `solid 1px ${theme.palette.grey[500_12]}`,
        }}
      />

      <Box sx={{ py: 2.5, px: 1.5 }}>
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {variation}
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 1.5, mb: 1 }}>
          <Typography variant="overline" sx={{ width: 56, color: 'text.disabled' }}>
            Hex
          </Typography>
          <Typography variant="body2">{hexColor}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography variant="overline" sx={{ width: 56, color: 'text.disabled' }}>
            Rgb
          </Typography>
          <Typography variant="body2">{hexToRgb(hexColor).replace('rgb(', '').replace(')', '')}</Typography>
        </Stack>
      </Box>
    </Card>
  );
}
