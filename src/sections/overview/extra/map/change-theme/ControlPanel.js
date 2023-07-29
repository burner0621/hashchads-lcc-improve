import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Radio, Typography, RadioGroup, FormControlLabel } from '@mui/material';
// components
import { ControlPanelStyle } from '../../../../../components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  onChangeTheme: PropTypes.func,
  selectTheme: PropTypes.string,
  themes: PropTypes.object,
};

function ControlPanel({ themes, selectTheme, onChangeTheme }) {
  return (
    <ControlPanelStyle>
      <Typography gutterBottom variant="subtitle2" sx={{ color: 'common.white' }}>
        Select Theme:
      </Typography>

      <RadioGroup value={selectTheme} onChange={(e, value) => onChangeTheme(value)}>
        {Object.keys(themes).map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio size="small" />}
            label={item}
            sx={{ color: 'common.white', textTransform: 'capitalize' }}
          />
        ))}
      </RadioGroup>
    </ControlPanelStyle>
  );
}

export default memo(ControlPanel);
