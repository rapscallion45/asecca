/**
 * Type and interface definitions for global application modals
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */

import { SvgIconProps } from '@mui/material';

/**
 * Modal button size options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof Modals
 *
 * @typedef ModalButtonSizeType - can either be 'small', 'medium' or 'large'
 */
export type ModalButtonSizeType = 'small' | 'medium' | 'large';

/**
 * Modal button icon size options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof Modals
 *
 * @typedef ModalButtonIconSizeType - can either be 'small', 'inherit' or 'large'
 */
export type ModalButtonIconSizeType = 'small' | 'inherit' | 'large';

/**
 * Modal button colour options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof Modals
 *
 * @typedef ModalButtonColourType - can either be 'primary', 'secondary', 'inherit' or 'error'
 */
export type ModalButtonColourType =
  | 'primary'
  | 'secondary'
  | 'inherit'
  | 'error';

/**
 * Modal button variant options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof Modals
 *
 * @typedef ModalButtonVariantType - can either be 'outlined', 'contained' or 'text'
 */
export type ModalButtonVariantType = 'outlined' | 'contained' | 'text';

/**
 * Modal normal button type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef INormalButtonType
 * @prop {string} type - type of button
 * @prop {string} text - display text of button
 * @prop {string} icon - button icon element
 * @prop {ModalButtonSizeType} size - button size option
 * @prop {string} style - saving state flag of costs config data
 * @prop {ModalButtonVariantType} variant - MUI button variant
 * @prop {string} className - MUI icon button class
 * @prop {ModalButtonColourType} color - button color option
 */
export interface INormalButtonType {
  type: 'normal';
  text?: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: ModalButtonSizeType;
  style?: { [name: string]: string } | { [name: string]: number };
  variant?: ModalButtonVariantType;
  className?: string;
  color?: ModalButtonColourType;
}

/**
 * Modal round button type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IRoundIconButtonType
 * @prop {string} type - type of button
 * @prop {string} icon - button icon element
 * @prop {ModalButtonSizeType} size - button size option
 * @prop {string} style - saving state flag of costs config data
 * @prop {ModalButtonVariantType} variant - MUI button variant
 * @prop {ModalButtonColourType} color - button color option
 */
export interface IRoundIconButtonType {
  type: 'round';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  style?: { [name: string]: string } | { [name: string]: number };
  variant?: 'outlined' | 'contained' | 'text';
  color?: 'primary' | 'secondary' | 'inherit';
}

/**
 * Modal icon button type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IIconButtonType
 * @prop {string} type - type of button
 * @prop {string} icon - button icon element
 * @prop {ModalButtonSizeType} size - button size option
 * @prop {string} style - saving state flag of costs config data
 * @prop {ModalButtonIconSizeType} iconSize - button icon size option
 * @prop {string} className - MUI icon button class
 * @prop {ModalButtonColourType} color - button color option
 */
export interface IIconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: ModalButtonSizeType;
  style?: { [name: string]: string } | { [name: string]: number };
  iconSize?: 'small' | 'inherit' | 'large';
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

/**
 * Modal menu button type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IMenuItemButtonType
 * @prop {string} type - type of button
 * @prop {string} text - display text of button
 * @prop {string} icon - button icon element
 * @prop {string} closeMenu - callback handler for closing the modal
 * @prop {string} iconStyle - icon style options
 * @prop {string} className - MUI icon button class
 * @prop {ModalButtonColourType} color - button color option
 */
export interface IMenuItemButtonType {
  type: 'menu';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  closeMenu: () => void;
  iconStyle?: { [name: string]: string } | { [name: string]: number };
  className?: string;
  color?: 'primary' | 'secondary' | 'inherit' | 'error';
}

/**
 * Modal menu button type definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IFabButtonType
 * @prop {string} type - type of button
 * @prop {string} icon - button icon element
 * @prop {ModalButtonSizeType} size - button size option
 * @prop {ModalButtonVariantType} variant - MUI button variant
 * @prop {string} text - display text of button
 * @prop {ModalButtonColourType} color - button color option
 */
export interface IFabButtonType {
  type: 'fab';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  variant?: 'extended' | 'circular';
  text?: string;
  color?: 'primary' | 'secondary' | 'inherit';
}

/**
 * Modal trigger button types
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof Modals
 *
 * @typedef TriggerButtonTypes - trigger button options type
 */
export type TriggerButtonTypes =
  | INormalButtonType
  | IRoundIconButtonType
  | IIconButtonType
  | IMenuItemButtonType
  | IFabButtonType;
