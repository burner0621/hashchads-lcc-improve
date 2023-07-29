import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
// components
import { ControlPanelStyle } from '../../../../../components/map';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  mode: PropTypes.string,
  onModeChange: PropTypes.func,
};

function ControlPanel({ mode, onModeChange }) {
  return (
    <ControlPanelStyle>
      <ToggleButtonGroup color="primary" value={mode} exclusive onChange={onModeChange}>
        <ToggleButton value="side-by-side">Side by side</ToggleButton>

        <ToggleButton value="split-screen">Split screen</ToggleButton>
      </ToggleButtonGroup>
    </ControlPanelStyle>
  );
}

export default memo(ControlPanel);
