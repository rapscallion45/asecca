import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import NavBar from '@/components/NavBar/NavBar';

/* background image styling */
const BackgroundStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  backgroundColor: theme.palette.grey[400],
  // background:
  //   'linear-gradient(0deg, rgba(86,96,156, 0.7), rgba(86,96,156, 0.7)), url(/static/background.webp)',
  // backgroundSize: 'cover',
  // backgroundPositionX: 'center',
  // backgroundPositionY: 'center',
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

  return (
    <main>
      <BackgroundStyle id="background" />
      <NavBar showLogin />
      <RootStyle id="page-content">{children}</RootStyle>
    </main>
  );
};

export default DashboardLayout;
