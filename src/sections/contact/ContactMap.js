import PropTypes from 'prop-types';
import Map from 'react-map-gl';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// config
import { MAPBOX_API } from '../../config';
// components
import Iconify from '../../components/Iconify';
import { MapControl, MapMarker, MapPopup } from '../../components/map';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

ContactMap.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default function ContactMap({ contacts }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <RootStyle>
      <Map
        initialViewState={{
          latitude: 12,
          longitude: 42,
          zoom: 2,
        }}
        mapStyle={`mapbox://styles/mapbox/${isLight ? 'light' : 'dark'}-v10`}
        mapboxAccessToken={MAPBOX_API}
      >
        <MapControl hideGeolocateControl />

        {contacts.map((country, index) => (
          <MapMarker
            key={`marker-${index}`}
            latitude={country.latlng[0]}
            longitude={country.latlng[1]}
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              setPopupInfo(country);
            }}
          />
        ))}

        {popupInfo && (
          <MapPopup
            longitude={popupInfo.latlng[1]}
            latitude={popupInfo.latlng[0]}
            onClose={() => setPopupInfo(null)}
            sx={{
              '& .mapboxgl-popup-content': { bgcolor: 'common.white' },
              '&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip': { borderTopColor: '#FFF' },
              '&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip': { borderBottomColor: '#FFF' },
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Address
            </Typography>

            <Typography component="p" variant="caption">
              {popupInfo.address}
            </Typography>

            <Typography component="p" variant="caption" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
              <Iconify icon={'eva:phone-fill'} sx={{ mr: 0.5, width: 14, height: 14 }} />
              {popupInfo.phoneNumber}
            </Typography>
          </MapPopup>
        )}
      </Map>
    </RootStyle>
  );
}
