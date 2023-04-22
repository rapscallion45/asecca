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
 * @prop {string | undefined} alpha8_500 - 8% alpha 500 shade
 * @prop {string | undefined} alpha12_500 - 12% alpha grey 500 shade
 * @prop {string | undefined} alpha16_500 - 16% alpha grey 500 shade
 * @prop {string | undefined} alpha24_500 - 24% alpha grey 500 shade
 * @prop {string | undefined} alpha32_500 - 32% alpha grey 500 shade
 * @prop {string | undefined} alpha48_500 - 48% alpha grey 500 shade
 * @prop {string | undefined} alpha56_500 - 56% alpha grey 500 shade
 * @prop {string | undefined} alpha80_500 - 80% alpha grey 500 shade
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
