import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
// components
import { ControlPanelStyle } from '../../../../../components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  onSelectCity: PropTypes.func,
};

function ControlPanel({ data, selectedCity, onSelectCity }) {
  return (
    <ControlPanelStyle>
      {data.map((city) => (
        <RadioGroup key={city.city} value={selectedCity} onChange={(event) => onSelectCity(event, city)}>
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </ControlPanelStyle>
  );
}

export default memo(ControlPanel);
