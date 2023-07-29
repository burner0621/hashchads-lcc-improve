import { useRef, memo } from 'react';
import Map from 'react-map-gl';
import bbox from '@turf/bbox';
//
import MAP_STYLE from './map-style';

// ----------------------------------------------------------------------

function MapZoomToBounds({ ...other }) {
  const mapRef = useRef(null);

  const onClick = (event) => {
    const feature = event.features?.[0];

    if (feature) {
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: 37.78,
        longitude: -122.4,
        zoom: 11,
      }}
      mapStyle={MAP_STYLE}
      interactiveLayerIds={['sf-neighborhoods-fill']}
      onClick={onClick}
      {...other}
    />
  );
}

export default memo(MapZoomToBounds);
