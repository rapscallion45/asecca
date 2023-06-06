import { FC, useState, useCallback } from 'react';
import Link from 'next/link';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { INavItemConfig } from './types';

/**
 * Nav Item Style
 *
 * Application menu nav item styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled menu nav item component
 */
const NavItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

/**
 * Nav Item Icon Style
 *
 * Application menu nav item icon styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled menu nav item icon component
 */
const NavItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Nav Item Submenu Header Style
 *
 * Application menu nav item submenu header styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled menu nav item submenu header component
 */
const NavItemSubheaderStyle = styled(ListSubheader)({
  paddingLeft: '40px',
  textTransform: 'uppercase',
  boxSizing: 'border-box',
  listStyle: 'none',
  fontWeight: 700,
  lineHeight: 1.5,
  fontSize: '0.75rem',
  letterSpacing: '1.1px',
  color: 'rgb(33, 43, 54)',
  marginTop: '24px',
  marginBottom: '16px',
});

/**
 * Nav Item Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef INavItemProps
 * @prop {Partial<INavItemConfig>} item - navigation items configuration
 * @prop {any} other - props to be passed through to children components
 */
interface INavItemProps {
  item: Partial<INavItemConfig>;
  active: (path: string | undefined) => boolean;
}

/**
 * Nav Item
 *
 * Menu navigation item
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @param {INavItemProps} props - component props
 * @returns {FC} - nav item component
 */
const NavItem: FC<INavItemProps> = (props) => {
  const { item, active } = props;
  const theme = useTheme();
  const { title, path, icon, children } = item;
  const isActiveRoot = active(path);
  const [open, setOpen] = useState<boolean>(isActiveRoot);

  /**
   * Active menu item styling options
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @constant
   */
  const activeRootStyle = {
    color: 'black',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    '&:before': { display: 'block' },
  };

  /**
   * Active menu item sub styling options
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @constant
   */
  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  /**
   * Callback to handle click on nav item
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @method
   */
  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  if (children) {
    return (
      <>
        <NavItemStyle
          disableGutters
          onClick={handleClick}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
          {...props}
        >
          {icon && <item.icon sx={{ marginRight: '15px' }} />}
          <ListItemText disableTypography primary={title} />
          {open && <KeyboardArrowDownIcon />}
          {!open && (
            <KeyboardArrowDownIcon sx={{ transform: 'rotate(-90deg)' }} />
          )}
        </NavItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((childItem: INavItemConfig) => {
              const isActiveSub = active(childItem.path);

              return (
                <NavItemStyle
                  key={childItem.title}
                  // @ts-ignore
                  component={Link}
                  href={childItem.path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <NavItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: () => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </NavItemIconStyle>
                  <ListItemText disableTypography primary={childItem.title} />
                </NavItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return path ? (
    <NavItemStyle
      // @ts-ignore
      component={Link}
      href={path}
      target={item.newTab ? '_blank' : ''}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      {icon && <item.icon sx={{ marginRight: '15px' }} />}
      <ListItemText disableTypography primary={title} />
      {item.newTab && <OpenInNewIcon />}
    </NavItemStyle>
  ) : (
    <NavItemSubheaderStyle>{title}</NavItemSubheaderStyle>
  );
};

export default NavItem;
