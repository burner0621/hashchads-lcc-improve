import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Slider, Typography } from '@mui/material';
// components
import { ControlPanelStyle } from '../../../../../components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  year: PropTypes.number,
  onChange: PropTypes.func,
};

function ControlPanel({ year, onChange }) {
  return (
    <ControlPanelStyle>
      <Typography variant="body2" sx={{ color: 'common.white' }}>
        Year: {year}
      </Typography>

      <Slider
        name="year"
        value={year}
        step={1}
        min={1995}
        max={2015}
        onChange={(e, value) => {
          if (typeof value === 'number') {
            onChange(value);
          }
        }}
      />
    </ControlPanelStyle>
  );
}

export default memo(ControlPanel);
