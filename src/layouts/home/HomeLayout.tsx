import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import NavBar from '@/components/NavBar/NavBar';
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
    <main id="home-page">
      <BackgroundStyle id="background" />
      <NavBar />
      <RootStyle id="page-content">{children}</RootStyle>
    </main>
  );
};

export default DashboardLayout;
