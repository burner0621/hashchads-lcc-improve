import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import { MapControl } from '../../../../../components/map';
//
import { updatePercentiles } from './utils';
import ControlPanel from './ControlPanel';

// ----------------------------------------------------------------------

function MapGeojson({ ...other }) {
  const theme = useTheme();

  const [year, setYear] = useState(2010);

  const [allData, setAllData] = useState(null);

  const [hoverInfo, setHoverInfo] = useState(null);

  const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'percentile',
        stops: [
          [0, theme.palette.primary.light],
          [1, theme.palette.primary.main],
          [2, theme.palette.info.light],
          [3, theme.palette.info.main],
          [4, theme.palette.warning.light],
          [5, theme.palette.warning.main],
          [6, theme.palette.error.light],
          [7, theme.palette.error.light],
          [8, theme.palette.primary.dark],
        ],
      },
      'fill-opacity': 0.72,
    },
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/uber/react-map-gl/master/examples/.data/us-income.geojson')
      .then((resp) => resp.json())
      .then((json) => setAllData(json))
      .catch((err) => console.error('Could not load data', err));
  }, []);

  const onHover = useCallback((event) => {
    const { features, point } = event;

    const hoveredFeature = features && features[0];

    setHoverInfo(
      hoveredFeature
        ? {
            feature: hoveredFeature,
            x: point.x,
            y: point.y,
          }
        : null
    );
  }, []);

  const data = useMemo(() => allData && updatePercentiles(allData, (f) => f.properties?.income[year]), [allData, year]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3,
        }}
        interactiveLayerIds={['data']}
        onMouseMove={onHover}
        {...other}
      >
        <MapControl />

        <Source type="geojson" data={data}>
          <Layer {...dataLayer} />
        </Source>

        {hoverInfo && (
          <Box
            sx={{
              p: 1,
              zIndex: 99,
              borderRadius: 1,
              position: 'absolute',
              pointerEvents: 'none',
              color: 'common.white',
              backgroundColor: alpha(theme.palette.grey[900], 0.8),
            }}
            style={{ left: hoverInfo.x, top: hoverInfo.y }}
          >
            <Typography component="div" variant="caption">
              <strong>State:</strong> {hoverInfo.feature.properties.name}
            </Typography>

            <Typography component="div" variant="caption">
              <strong> Median Household Income: </strong>
              {hoverInfo.feature.properties.value}
            </Typography>

            <Typography component="div" variant="caption">
              <strong>Percentile:</strong>
              {(hoverInfo.feature.properties.percentile / 8) * 100}
            </Typography>
          </Box>
        )}
      </Map>

      <ControlPanel year={year} onChange={(value) => setYear(value)} />
    </>
  );
}

export default memo(MapGeojson);
