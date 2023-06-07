import {
  PaletteOptions,
  PaletteColorOptions,
  alpha,
} from '@mui/material/styles';
import { IExtendedColorPartial } from '../types';

/**
 * ASECCA SPA dark theme style definitions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Dark theme grey color definitions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {IExtendedColorPartial}
 */
const DARKTHEME_GREY: IExtendedColorPartial = {
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  alpha8_500: alpha('#919EAB', 0.08),
  alpha12_500: alpha('#919EAB', 0.12),
  alpha16_500: alpha('#919EAB', 0.16),
  alpha24_500: alpha('#919EAB', 0.24),
  alpha32_500: alpha('#919EAB', 0.32),
  alpha48_500: alpha('#919EAB', 0.48),
  alpha56_500: alpha('#919EAB', 0.56),
  alpha80_500: alpha('#919EAB', 0.8),
};

/**
 * Dark theme primary color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_PRIMARY: PaletteColorOptions = {
  light: '#6a77c4',
  main: '#56609C',
  dark: '#3a4069',
  contrastText: '#fff',
};

/**
 * Dark theme secondary color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_SECONDARY: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Dark theme info color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_INFO: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Dark theme success color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_SUCCESS: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Dark theme warning color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_WARNING: PaletteColorOptions = {
  light: '#FDF74E',
  main: '#F9F002',
  dark: '#CAC302',
  contrastText: DARKTHEME_GREY[800],
};

/**
 * Dark theme error color definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteColorOptions}
 */
const DARKTHEME_ERROR: PaletteColorOptions = {
  light: '#E65C5C',
  main: '#ED3B3B',
  dark: '#ED1515',
  contrastText: '#fff',
};

/**
 * Build the dark theme options struct
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof Theme
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @constant
 * @type {PaletteOptions}
 */
const darkThemePalette: PaletteOptions = {
  mode: 'dark',
  common: { black: '#2E2A2B', white: '#fff' },
  primary: { ...DARKTHEME_PRIMARY },
  secondary: { ...DARKTHEME_SECONDARY },
  info: { ...DARKTHEME_INFO },
  success: { ...DARKTHEME_SUCCESS },
  warning: { ...DARKTHEME_WARNING },
  error: { ...DARKTHEME_ERROR },
  grey: DARKTHEME_GREY,
  divider: DARKTHEME_GREY.alpha24_500,
  text: {
    primary: DARKTHEME_GREY[200],
    secondary: DARKTHEME_GREY[400],
    disabled: DARKTHEME_GREY[500],
  },
  action: {
    active: DARKTHEME_GREY[400],
    hover: DARKTHEME_GREY.alpha8_500,
    selected: DARKTHEME_GREY.alpha16_500,
    disabled: DARKTHEME_GREY.alpha80_500,
    disabledBackground: DARKTHEME_GREY.alpha24_500,
    focus: DARKTHEME_GREY.alpha24_500,
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default darkThemePalette;
