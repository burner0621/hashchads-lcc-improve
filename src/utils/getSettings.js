// config
import { defaultSettings, cookiesKey } from '../config';

// ----------------------------------------------------------------------

export const getSettings = (cookies) => {
  const themeMode = getData(cookies[cookiesKey.themeMode]) || defaultSettings.themeMode;

  const themeDirection = getData(cookies[cookiesKey.themeDirection]) || defaultSettings.themeDirection;

  const themeColorPresets = getData(cookies[cookiesKey.themeColorPresets]) || defaultSettings.themeColorPresets;

  const themeLayout = getData(cookies[cookiesKey.themeLayout]) || defaultSettings.themeLayout;

  const themeContrast = getData(cookies[cookiesKey.themeContrast]) || defaultSettings.themeContrast;

  const themeStretch = getData(cookies[cookiesKey.themeStretch]) || defaultSettings.themeStretch;

  return {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
  };
};

// ----------------------------------------------------------------------

const getData = (value) => {
  if (value === 'true' || value === 'false') {
    return JSON.parse(value);
  }
  if (value === 'undefined' || !value) {
    return '';
  }
  return value;
};
