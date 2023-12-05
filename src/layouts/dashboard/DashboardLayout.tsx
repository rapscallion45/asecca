import { FC, useState, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import {
  Container,
  IconButton,
  Divider,
  Toolbar,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavBar from '@/components/NavBar/NavBar';
import DashboardSideBar from '@/components/DashboardSideBar/DashboardSideBar';
import MHidden from '@/components/@MUI-Extended/MHidden';
import useNotifier from '@/hooks/useNotifier';
import { APP_BAR_MOBILE, SIDEBAR_DRAWER_WIDTH } from '@/constants/constants';

/**
 * Dashboard Layout Root Style
 *
 * Application dashboard layout root component styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @return {Component} - styled dashboard layout root component
 */
const RootStyle = styled('main')(() => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
}));

/**
 * Dashboard Background Style
 *
 * Application dashboard layout background component styling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @return {Component} - styled dashboard layout background component
 */
const DashboardBackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.grey[400]
      : theme.palette.common.black,
}));

/**
 * Dashboard Root Style
 *
 * Dashboard page root styling for page content
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @return {Component} - styled dashboard layout root component
 */
const DashboardRootStyle = styled('section')(({ theme }) => ({
  flexGrow: 1,
  position: 'relative',
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(12),
  transition: theme.transitions.create('margin-left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 40,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

/**
 * Base Dashboard Page App Bar Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 *
 * @typedef IDashboardAppBarProps
 * @prop {boolean} open - whether the app bar is closed (full width) or open (full width minus drawer width)
 */
interface IDashboardAppBarProps extends MuiAppBarProps {
  open: boolean;
}

/**
 * Dashboard App Bar Style
 *
 * Dashboard App Bar styling for dashboard layout
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.12
 *
 * @component
 * @return {Component} - styled dashboard layout app bar component
 */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IDashboardAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: SIDEBAR_DRAWER_WIDTH,
    width: `calc(100% - ${SIDEBAR_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/**
 * Dashboard Drawer Style
 *
 * Dashboard Drawer styling for dashboard layout desktop side drawer
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.12
 *
 * @component
 * @return {Component} - styled dashboard layout drawer component
 */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'fixed',
    whiteSpace: 'nowrap',
    height: '100vh',
    width: SIDEBAR_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

/**
 * Base Dashboard Page Layout Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IDashboardLayoutProps
 * @prop {ReactNode} children - component children nodes
 */
interface IDashboardLayoutProps {
  children?: ReactNode;
}

/**
 * Base Dashboard Page Layout
 *
 * Dashboard base layout styling and functionality
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IDashboardLayoutProps} props - component props
 * @returns {FC} - dashboard layout functional component
 */
const DashboardLayout: FC<IDashboardLayoutProps> = (props) => {
  const { children } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  /* dashboard sidebar open flag */
  const [open, setOpen] = useState<boolean>(false);

  /* initialise alert notifications */
  useNotifier();

  return (
    <RootStyle id="dashboard-page">
      <DashboardBackgroundStyle id="background" />
      <MHidden width="lgUp">
        <NavBar onOpenSidebar={useCallback(() => setOpen(true), [])} />
        <DashboardSideBar
          isOpenSidebar={open}
          onCloseSidebar={useCallback(() => setOpen(false), [])}
        />
      </MHidden>
      <MHidden width="lgDown">
        {/* @ts-ignore */}
        <AppBar position="fixed" open={open} color="secondary">
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(!open)}
              sx={{
                marginLeft: '-8px',
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <Image
                src="/logowhite.webp"
                alt="Asecca logo"
                width={150}
                height={30}
                style={{ marginTop: '5px' }}
              />
            </Link>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={useCallback(() => setOpen(false), [])}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <DashboardSideBar
            isOpenSidebar={open}
            onCloseSidebar={useCallback(() => setOpen(false), [])}
          />
        </Drawer>
      </MHidden>
      <DashboardRootStyle
        id="page-content"
        /* eslint-disable no-nested-ternary */
        sx={{ ml: open && isDesktop ? 34 : isDesktop ? 7 : 0 }}
        /* eslint-enable no-nested-ternary */
      >
        <Container maxWidth={false}>{children}</Container>
      </DashboardRootStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
