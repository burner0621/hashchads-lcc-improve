// @mui
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, Typography, Button, OutlinedInput } from '@mui/material';
// components
import Image from '../../../../components/Image';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  marginTop: -120,
  padding: theme.spacing(16, 5, 5, 5),
  color: theme.palette.common.white,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundImage: `linear-gradient(135deg,
    ${theme.palette.primary.main} 0%,
    ${theme.palette.primary.dark} 100%)`,
}));

// ----------------------------------------------------------------------

BankingInviteFriends.propTypes = {
  description: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
};

export default function BankingInviteFriends({ img, price, title, description, ...other }) {
  return (
    <Box {...other}>
      <Image
        visibleByDefault
        disabledEffect
        alt="illustration-invite"
        src={img}
        sx={{
          left: 40,
          zIndex: 9,
          width: 140,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />

      <ContentStyle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" sx={{ whiteSpace: 'pre-line' }}>
            {title}
          </Typography>

          <Typography variant="h2"> {price} </Typography>
        </Stack>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <OutlinedInput
            size="small"
            placeholder="Email"
            sx={{
              width: 1,
              color: 'common.white',
              fontWeight: 'fontWeightMedium',
              bgcolor: (theme) => alpha(theme.palette.common.black, 0.16),
              '& input::placeholder': {
                color: (theme) => alpha(theme.palette.common.white, 0.48),
              },
              '& fieldset': { display: 'none' },
            }}
          />
          <Button color="warning" variant="contained">
            Invite
          </Button>
        </Stack>
      </ContentStyle>
    </Box>
  );
}
