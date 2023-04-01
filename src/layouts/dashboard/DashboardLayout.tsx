import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import NavBar from '@/components/NavBar/NavBar';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import useNotifier from '@/hooks/useNotifier';

/* background image styling */
const BackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor: theme.palette.grey[400],
}));

/* root style for the dashboard page content */
const RootStyle = styled('section')({
  display: 'flex',
  position: 'relative',
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  paddingTop: '100px',
});

interface DashboardLayoutProps {
  children?: ReactNode;
}

/* Base Dashboard Page Layout  */
/* =========================== */
const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;

  /* initialise alert notifications */
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
