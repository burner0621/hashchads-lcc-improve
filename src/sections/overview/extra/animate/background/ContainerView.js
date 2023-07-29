import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { Box, Paper } from '@mui/material';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

ContainerView.propTypes = {
  selectVariant: PropTypes.string,
};

export default function ContainerView({ selectVariant, ...other }) {
  const isKenburns = selectVariant.includes('kenburns');

  return (
    <Paper
      sx={{
        height: 480,
        width: '100%',
        overflow: 'hidden',
        boxShadow: (theme) => theme.customShadows.z8,
      }}
      {...other}
    >
      {isKenburns ? (
        <Box
          component={m.img}
          src="https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_8.jpg"
          {...getVariant(selectVariant)}
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
        />
      ) : (
        <Box component={m.div} {...getVariant(selectVariant)} sx={{ height: 1, width: 1 }} />
      )}
    </Paper>
  );
}
