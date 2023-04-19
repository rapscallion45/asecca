import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar/NavBar';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import useNotifier from '@/hooks/useNotifier';

/**
 * background styling
 *
 * @since 0.0.0
 */
const BackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor: theme.palette.grey[400],
}));

/**
 * root style for the dashboard page content
 *
 * @since 0.0.0
 */
const RootStyle = styled('section')({
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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @param {IDashboardLayoutProps} props - component props
 * @returns {FC} - dashboard layout functional component
 */
const DashboardLayout: FC<IDashboardLayoutProps> = (props) => {
  const { children } = props;

  /** initialise alert notifications */
  useNotifier();

  return (
    <main id="dashboard-page">
      <BackgroundStyle id="background" />
      <NavBar showLogin />
      <RootStyle id="page-content">
        <Container maxWidth="lg">
          <AdminTestPanel />
          {children}
        </Container>
      </RootStyle>
    </main>
  );
};

export default DashboardLayout;
