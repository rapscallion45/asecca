import { ThemeOptions, alpha } from '@mui/material/styles';
import typography from './typography';

/*
 ** ASECCA SPA light theme style definitions
 */

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  lighter: '#8798fa',
  light: '#6a77c4',
  main: '#56609C',
  dark: '#3a4069',
  darker: '#1d2136',
  contrastText: '#fff',
};
const SECONDARY = {
  lighter: '#bdbaff',
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  darker: '#19174f',
  contrastText: '#fff',
};
const INFO = {
  lighter: '#bdbaff',
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  darker: '#19174f',
  contrastText: '#fff',
};
const SUCCESS = {
  lightest: '#EDFBE9',
  lighter: '#DCF8D3',
  light: '#B9F0A8',
  main: '#8AE66E',
  dark: '#4FDA25',
  darker: '#308316',
  contrastText: GREY[800],
};
const WARNING = {
  lighter: '#FEFDCD',
  light: '#FDF74E',
  main: '#F9F002',
  dark: '#CAC302',
  darker: '#7E7A01',
  contrastText: GREY[800],
};
const ERROR = {
  lightest: '#FFE6E6',
  lighter: '#FFCCCC',
  light: '#FF9999',
  main: '#FF5E5D',
  dark: '#FF0000',
  darker: '#990000',
  contrastText: '#fff',
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    common: { black: '#2E2A2B', white: '#fff' },
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    info: { ...INFO },
    success: { ...SUCCESS },
    warning: { ...WARNING },
    error: { ...ERROR },
    grey: GREY,
    divider: GREY[500_24],
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    action: {
      active: GREY[600],
      hover: GREY[500_8],
      selected: GREY[500_16],
      disabled: GREY[500_80],
      disabledBackground: GREY[500_24],
      focus: GREY[500_24],
      hoverOpacity: 0.08,
      disabledOpacity: 0.48,
    },
  },
  typography,
};

export default lightThemeOptions;
