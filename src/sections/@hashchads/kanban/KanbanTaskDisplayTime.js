import PropTypes from 'prop-types';
import { format } from 'date-fns';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

KanbanTaskDisplayTime.propTypes = {
  isSameDays: PropTypes.bool,
  isSameMonths: PropTypes.bool,
  onOpenPicker: PropTypes.func,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  sx: PropTypes.object,
};

export default function KanbanTaskDisplayTime({ startTime, endTime, isSameDays, isSameMonths, onOpenPicker, sx }) {
  const style = {
    typography: 'caption',
    cursor: 'pointer',
    '&:hover': { opacity: 0.72 },
  };

  if (isSameMonths) {
    return (
      <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
        {isSameDays
          ? format(new Date(endTime), 'dd MMM')
          : `${format(new Date(startTime), 'dd')} - ${format(new Date(endTime), 'dd MMM')}`}
      </Box>
    );
  }
  return (
    <Box onClick={onOpenPicker} sx={{ ...style, ...sx }}>
      {format(new Date(startTime), 'dd MMM')} - {format(new Date(endTime), 'dd MMM')}
    </Box>
  );
}
