import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  FormControlLabel,
  IconButton,
  Switch,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MHidden from '@/components/@MUI-Extended/MHidden';
import {
  APP_BAR_DESKTOP,
  APP_BAR_MOBILE,
  SIDEBAR_DRAWER_WIDTH,
} from '@/constants/constants';
import { AppState } from '@/redux/store';
import { setTheme } from '@/redux/slices/themeSlice';
import { INavBarOnSidebarOpenCallback } from './types';

/**
 * Theme Mode Switch Style
 *
 * Application light/dark mode toggle switch
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled theme mode switch
 */
const ThemeModeSwitchStyle = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.secondary.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

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
  const dispatch = useDispatch();
  const theme = useTheme();
  const { type: themeType } = useSelector((state: AppState) => state.theme);

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
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor:
      MUITheme.palette.mode === 'light'
        ? MUITheme.palette.grey[400]
        : 'background.default',
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
      minHeight: APP_BAR_DESKTOP,
      padding: MUITheme.spacing(0, 5),
    },
  }));

  const toggleTheme = () => {
    dispatch(setTheme(themeType === 'dark' ? 'light' : 'dark'));
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        {!showLogo && (
          <MHidden width="lgUp">
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, mt: '3px', color: 'text.primary' }}
            >
              <MenuIcon htmlColor="black" />
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
          </MHidden>
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

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <FormControlLabel
            data-testid="light-dark-btn"
            control={
              <ThemeModeSwitchStyle
                defaultChecked={themeType === 'dark'}
                // value={themeType === 'dark'}
                onChange={toggleTheme}
                sx={{ m: 1 }}
                color="primary"
              />
            }
            label=""
          />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavBar;
