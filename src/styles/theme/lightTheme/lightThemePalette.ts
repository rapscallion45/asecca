import { alpha } from '@mui/material/styles';

/**
 * ASECCA SPA light theme style definitions
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */

/**
 * Light theme grey definition
 *
 * @since - 0.0.0
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

/**
 * Light theme primary color definition
 *
 * @since - 0.0.0
 */
const PRIMARY = {
  lighter: '#8798fa',
  light: '#6a77c4',
  main: '#56609C',
  dark: '#3a4069',
  darker: '#1d2136',
  contrastText: '#fff',
};

/**
 * Light theme secondary color definition
 *
 * @since - 0.0.0
 */
const SECONDARY = {
  lighter: '#bdbaff',
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  darker: '#19174f',
  contrastText: '#fff',
};

/**
 * Light theme info color definition
 *
 * @since - 0.0.0
 */
const INFO = {
  lighter: '#bdbaff',
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  darker: '#19174f',
  contrastText: '#fff',
};

/**
 * Light theme success color definition
 *
 * @since - 0.0.0
 */
const SUCCESS = {
  lighter: '#bdbaff',
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  darker: '#19174f',
  contrastText: '#fff',
};

/**
 * Light theme warning color definition
 *
 * @since - 0.0.0
 */
const WARNING = {
  lighter: '#FEFDCD',
  light: '#FDF74E',
  main: '#F9F002',
  dark: '#CAC302',
  darker: '#7E7A01',
  contrastText: GREY[800],
};

/**
 * Light theme error color definition
 *
 * @since - 0.0.0
 */
const ERROR = {
  lighter: '#FA5A5A',
  light: '#E65C5C',
  main: '#ED3B3B',
  dark: '#ED1515',
  darker: '#7A0A0A',
  contrastText: '#fff',
};

/**
 * Build the light theme options struct
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const lightThemePalette = {
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
};

export default lightThemePalette;
