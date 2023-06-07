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
 */
export interface INavItemConfig {
  title: string;
  path?: string;
  icon?: any;
  newTab?: boolean;
  children?: any;
}
