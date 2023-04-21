import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar/NavBar';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import useNotifier from '@/hooks/useNotifier';

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
  backgroundColor: theme.palette.grey[400],
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
const DashboardRootStyle = styled('section')({
  display: 'flex',
  position: 'relative',
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  paddingTop: '100px',
});

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

  /* initialise alert notifications */
  useNotifier();

  return (
    <main id="dashboard-page">
      <DashboardBackgroundStyle id="background" />
      <NavBar showLogin />
      <DashboardRootStyle id="page-content">
        <Container maxWidth="lg">
          <AdminTestPanel />
          {children}
        </Container>
      </DashboardRootStyle>
    </main>
  );
};

export default DashboardLayout;
