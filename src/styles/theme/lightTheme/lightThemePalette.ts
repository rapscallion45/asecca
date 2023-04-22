import {
  PaletteOptions,
  PaletteColorOptions,
  alpha,
} from '@mui/material/styles';
import { IExtendedColorPartial } from '../types';

/**
 * ASECCA SPA light theme style definitions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Light theme grey definition
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
const LIGHTTHEME_GREY: IExtendedColorPartial = {
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
 * Light theme primary color definition
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
const LIGHTTHEME_PRIMARY: PaletteColorOptions = {
  light: '#6a77c4',
  main: '#56609C',
  dark: '#3a4069',
  contrastText: '#fff',
};

/**
 * Light theme secondary color definition
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
const LIGHTTHEME_SECONDARY: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Light theme info color definition
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
const LIGHTTHEME_INFO: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Light theme success color definition
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
const LIGHTTHEME_SUCCESS: PaletteColorOptions = {
  light: '#8782ff',
  main: '#544dff',
  dark: '#312d9c',
  contrastText: '#fff',
};

/**
 * Light theme warning color definition
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
const LIGHTTHEME_WARNING: PaletteColorOptions = {
  light: '#FDF74E',
  main: '#F9F002',
  dark: '#CAC302',
  contrastText: LIGHTTHEME_GREY[800],
};

/**
 * Light theme error color definition
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
const LIGHTTHEME_ERROR: PaletteColorOptions = {
  light: '#E65C5C',
  main: '#ED3B3B',
  dark: '#ED1515',
  contrastText: '#fff',
};

/**
 * Build the light theme options struct
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
const lightThemePalette: PaletteOptions = {
  mode: 'light',
  common: { black: '#2E2A2B', white: '#fff' },
  primary: { ...LIGHTTHEME_PRIMARY },
  secondary: { ...LIGHTTHEME_SECONDARY },
  info: { ...LIGHTTHEME_INFO },
  success: { ...LIGHTTHEME_SUCCESS },
  warning: { ...LIGHTTHEME_WARNING },
  error: { ...LIGHTTHEME_ERROR },
  grey: LIGHTTHEME_GREY,
  divider: LIGHTTHEME_GREY.alpha24_500,
  text: {
    primary: LIGHTTHEME_GREY[800],
    secondary: LIGHTTHEME_GREY[600],
    disabled: LIGHTTHEME_GREY[500],
  },
  action: {
    active: LIGHTTHEME_GREY[600],
    hover: LIGHTTHEME_GREY.alpha8_500,
    selected: LIGHTTHEME_GREY.alpha16_500,
    disabled: LIGHTTHEME_GREY.alpha80_500,
    disabledBackground: LIGHTTHEME_GREY.alpha24_500,
    focus: LIGHTTHEME_GREY.alpha24_500,
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default lightThemePalette;
