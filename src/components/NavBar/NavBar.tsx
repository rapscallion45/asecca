import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { APP_BAR_MOBILE, SIDEBAR_DRAWER_WIDTH } from '@/constants/constants';
import { INavBarOnSidebarOpenCallback } from './types';

/**
 * NavBar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INavBarProps
 * @prop {boolean} showLogo - flag to show or hide logo
 * @prop {boolean} fullWidth - flag to show if navbar is screen fullwidth
 * @prop {INavBarOnSidebarOpenCallback} onOpenSidebar - callback handler for when sidebar is opened
 */
interface INavBarProps {
  showLogo?: boolean;
  fullWidth?: boolean;
  onOpenSidebar?: INavBarOnSidebarOpenCallback;
}

/**
 * NavBar
 *
 * Application main Navbar component
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {INavBarProps} props - component props
 * @returns {FC} - navbar functional component
 */
const NavBar: FC<INavBarProps> = (props) => {
  const { fullWidth, showLogo = false, onOpenSidebar } = props;
  const theme = useTheme();

  /**
   * Nav Bar Root Style
   *
   * Application nav bar parent component styling
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @component
   * @return {Component} - styled nav bar root component
   */
  const RootStyle = styled(AppBar)(({ theme: MUITheme }) => ({
    boxShadow: 'none',
    backgroundColor:
      MUITheme.palette.mode === 'light'
        ? MUITheme.palette.grey[400]
        : MUITheme.palette.common.black,
    [MUITheme.breakpoints.up('lg')]: {
      width: fullWidth ? `100%` : `calc(100% - ${SIDEBAR_DRAWER_WIDTH + 1}px)`,
    },
  }));

  /**
   * Nav Bar Toolbar Style
   *
   * Application nav bar toolbar component styling
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.1
   *
   * @component
   * @return {Component} - styled nav bar toolbar component
   */
  const ToolbarStyle = styled(Toolbar)(({ theme: MUITheme }) => ({
    minHeight: APP_BAR_MOBILE,
    [MUITheme.breakpoints.up('lg')]: {
      padding: MUITheme.spacing(0, 5),
    },
  }));

  return (
    <RootStyle>
      <ToolbarStyle>
        {!showLogo && (
          <>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, mt: '3px', color: 'text.primary' }}
            >
              <MenuIcon
                htmlColor={theme.palette.mode === 'dark' ? 'white' : 'black'}
              />
            </IconButton>
            <Link href="/">
              {theme.palette.mode === 'dark' && (
                <Image
                  src="/logowhite.webp"
                  alt="Asecca logo"
                  width={150}
                  height={30}
                  style={{ marginTop: '5px' }}
                />
              )}
              {theme.palette.mode === 'light' && (
                <Image
                  src="/logoblack.webp"
                  alt="Asecca logo"
                  width={150}
                  height={30}
                  style={{ marginTop: '5px' }}
                />
              )}
            </Link>
          </>
        )}
        {showLogo && (
          <Link href="/">
            {theme.palette.mode === 'dark' && (
              <Image
                src="/logowhite.webp"
                alt="Asecca logo"
                width={150}
                height={30}
                style={{ marginTop: '5px' }}
              />
            )}
            {theme.palette.mode === 'light' && (
              <Image
                src="/logoblack.webp"
                alt="Asecca logo"
                width={150}
                height={30}
                style={{ marginTop: '5px' }}
              />
            )}
          </Link>
        )}

        <Box sx={{ flexGrow: 1 }} />
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavBar;
