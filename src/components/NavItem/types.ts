/*
 * Nav Item type definitions
 *
 * These type definitions are used in the applications Nav Item component.
 */

/**
 * Nav Item configuration properties
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof NavItem
 *
 * @typedef INavItemConfig
 * @prop {string} title - nav item title text
 * @prop {string} path - nav item URL path
 * @prop {any} icon - nav item icon
 * @prop {boolean} newTab - nav item link opens in new tab
 * @prop {Array<INavItemConfig>} children - nav item child components
 */
export interface INavItemConfig {
  title: string;
  path?: string;
  icon?: any;
  newTab?: boolean;
  children?: Array<INavItemConfig>;
}
