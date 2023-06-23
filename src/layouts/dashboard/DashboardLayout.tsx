import { FC, useState, useCallback, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar/NavBar';
import DashboardSideBar from '@/components/DashboardSideBar/DashboardSideBar';
import MHidden from '@/components/@MUI-Extended/MHidden';
import useNotifier from '@/hooks/useNotifier';
import { APP_BAR_MOBILE } from '@/constants/constants';

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
const RootStyle = styled('main')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.standard,
  }),
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
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 40,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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

  /* dashboard sidebar open flag */
  const [open, setOpen] = useState<boolean>(false);

  /* initialise alert notifications */
  useNotifier();

  return (
    <RootStyle id="dashboard-page">
      <DashboardBackgroundStyle id="background" />
      <MHidden width="lgUp">
        <NavBar onOpenSidebar={useCallback(() => setOpen(true), [])} />
      </MHidden>
      <DashboardSideBar
        isOpenSidebar={open}
        onCloseSidebar={useCallback(() => setOpen(false), [])}
      />
      <DashboardRootStyle id="page-content">
        <Container maxWidth="xl">{children}</Container>
      </DashboardRootStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
