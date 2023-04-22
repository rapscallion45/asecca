import { TypographyVariantsOptions } from '@mui/material/styles';

/**
 * ASECCA SPA typography definitions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Pixel value to REM conversion helper
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @param {number} value - pixel value to convert to REM units
 * @returns {string} - REM value string from passed pixel units
 */
function pxToRem(value: number) {
  return `${value / 16}rem`;
}

/**
 * Responsive Font Sizes
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IResposiveFontSizes
 * @prop {number} sm - small font pixel size
 * @prop {number} md - medium font pixel size
 * @prop {number} lg - large font pixel size
 */
interface IResposiveFontSizes {
  sm: number;
  md: number;
  lg: number;
}

/**
 * Responsive font size calculation helper
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @param {IResposiveFontSizes} fontSizes - font sizes to be calculated to rem
 * @returns {Object} - calculated rem font sizes
 */
function responsiveFontSizes(fontSizes: IResposiveFontSizes) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(fontSizes.sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(fontSizes.md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(fontSizes.lg),
    },
  };
}

/**
 * Primary font family
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @constant
 * @type {string}
 */
const FONT_PRIMARY = 'Poppins, Roboto';

/**
 * Typography theme option defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @see See [more info on MUI typography](https://mui.com/material-ui/customization/typography/)
 *
 * @constant
 * @type {TypographyVariantsOptions}
 */
const typography: TypographyVariantsOptions = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 500,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(12),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
  },
  button: {
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: pxToRem(16),
  },
};

export default typography;
