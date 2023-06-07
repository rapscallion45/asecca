import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Box, List } from '@mui/material';
import NavItem from '../NavItem/NavItem';
import { INavItemConfig } from '../NavItem/types';

/**
 * Nav Section Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef INavSectionProps
 * @prop {Array<Partial<INavItemConfig>>} navConfig - navigation items configuration
 * @prop {any} other - props to be passed through to children components
 */
interface INavSectionProps {
  navConfig: Array<Partial<INavItemConfig>>;
  other?: any;
}

/**
 * Nav Section
 *
 * List of navigation items that form a navigation menu list section
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {IDashboardSideBarProps} props - component props
 * @returns {FC} - nav section component
 */
const NavSection: FC<INavSectionProps> = (props) => {
  const { navConfig, other } = props;
  const { pathname } = useRouter();

  /**
   * Callback to check if nav item matched current URI path
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   * @param {string | undefined} path - path string to check against current URI
   * @returns {boolean} - whether passed path matches current URI
   */
  const match = useCallback(
    (path: string | undefined) => {
      if (!path) return false;
      return path === pathname;
    },
    [pathname]
  );

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
