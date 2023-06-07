import { FC, useState, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar/NavBar';
import DashboardSideBar from '@/components/DashboardSideBar/DashboardSideBar';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import useNotifier from '@/hooks/useNotifier';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from '@/constants/constants';

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
const RootStyle = styled('main')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

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
      : 'background.default',
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
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
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
      <NavBar onOpenSidebar={() => setOpen(true)} />
      <DashboardSideBar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <DashboardRootStyle id="page-content">
        <Container maxWidth="xl">
          <AdminTestPanel />
          {children}
        </Container>
      </DashboardRootStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
