import { ColorPartial } from '@mui/material/styles/createPalette';

/**
 * Asecca Color Partial extension
 *
 * Extend MUI's Color Partial to allow for different alpha shades
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @see See [more info on MUI palette](https://mui.com/material-ui/customization/palette/)
 *
 * @typedef TExtendedColorPartial
 * @extends ColorPartial
 * @prop {string | undefined} alpha8_500 - first grey 500 shade
 * @prop {string | undefined} alpha8_500 - second grey 500 shade
 * @prop {string | undefined} alpha8_500 - third grey 500 shade
 * @prop {string | undefined} alpha8_500 - fourth grey 500 shade
 * @prop {string | undefined} alpha8_500 - fifth grey 500 shade
 * @prop {string | undefined} alpha8_500 - sixth grey 500 shade
 * @prop {string | undefined} alpha8_500 - seventh grey 500 shade
 * @prop {string | undefined} alpha8_500 - eigth grey 500 shade
 */
export interface IExtendedColorPartial extends ColorPartial {
  alpha8_500?: string | undefined;
  alpha12_500?: string | undefined;
  alpha16_500?: string | undefined;
  alpha24_500?: string | undefined;
  alpha32_500?: string | undefined;
  alpha48_500?: string | undefined;
  alpha56_500?: string | undefined;
  alpha80_500?: string | undefined;
}
