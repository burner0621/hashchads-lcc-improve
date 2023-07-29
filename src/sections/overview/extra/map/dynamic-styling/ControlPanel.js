import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { fromJS } from 'immutable';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Switch, Typography } from '@mui/material';
// _mock_
import MAP_STYLE from '../../../../../_mock/map/map-style-basic-v8.json';
// components
import { ControlPanelStyle } from '../../../../../components/map';

// ----------------------------------------------------------------------

const defaultMapStyle = fromJS(MAP_STYLE);

const defaultLayers = defaultMapStyle.get('layers');

const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];

const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/,
};

const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color',
};

const ColorBoxStyle = styled('div')(({ theme }) => ({
  width: 20,
  height: 20,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  border: `solid 1px ${theme.palette.grey[500]}`,
  '& input': {
    width: 12,
    height: 12,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    '&::-webkit-color-swatch-wrapper': { padding: 0 },
    '&::-moz-color-swatch': { border: 'none', borderRadius: '50%' },
    '&::-webkit-color-swatch': { border: 'none', borderRadius: '50%' },
  },
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  onChange: PropTypes.func,
};

function ControlPanel({ onChange }) {
  const theme = useTheme();

  const [visibility, setVisibility] = useState({
    water: true,
    parks: true,
    roads: true,
    labels: true,
    buildings: true,
    background: true,
  });

  const [color, setColor] = useState({
    water: theme.palette.grey[900],
    labels: theme.palette.grey[800],
    parks: theme.palette.primary.dark,
    buildings: theme.palette.grey[900],
    background: theme.palette.grey[700],
    roads: theme.palette.warning.darker,
  });

  useEffect(() => {
    onChange(getMapStyle({ visibility, color }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility, color]);

  const onColorChange = (name, value) => {
    setColor({ ...color, [name]: value });
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({ ...visibility, [name]: value });
  };

  return (
    <ControlPanelStyle>
      {categories.map((name) => (
        <Box key={name} sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
          <ColorBoxStyle sx={{ ...(!visibility[name] && { opacity: 0.48 }) }}>
            <input
              type="color"
              value={color[name]}
              disabled={!visibility[name]}
              onChange={(event) => onColorChange(name, event.target.value)}
            />
          </ColorBoxStyle>
          <Typography
            variant="body2"
            sx={{
              flexGrow: 1,
              textTransform: 'capitalize',
              color: !visibility[name] ? 'text.disabled' : 'common.white',
            }}
          >
            {name}
          </Typography>
          <Switch
            size="small"
            checked={visibility[name]}
            onChange={(event) => onVisibilityChange(name, event.target.checked)}
          />
        </Box>
      ))}
    </ControlPanelStyle>
  );
}

export default memo(ControlPanel);

// ----------------------------------------------------------------------

function getMapStyle({ visibility, color }) {
  const layers = defaultLayers
    .filter((layer) => {
      const id = layer.get('id');

      return categories.every((name) => visibility[name] || !layerSelector[name].test(id));
    })
    .map((layer) => {
      const id = layer.get('id');

      const type = layer.get('type');

      const category = categories.find((name) => layerSelector[name].test(id));

      if (category && colorClass[type]) {
        return layer.setIn(['paint', colorClass[type]], color[category]);
      }

      return layer;
    });

  return defaultMapStyle.set('layers', layers);
}
