import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';

/* background image styling */
const BackgroundStyle = styled('div')({
  display: 'flex',
  position: 'fixed',
  zIndex: 0,
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  background:
    'linear-gradient(0deg, rgba(86,96,156, 0.7), rgba(86,96,156, 0.7)), url(/static/background.webp)',
  backgroundSize: 'cover',
  backgroundPositionX: 'center',
  backgroundPositionY: 'center',
  padding: '50px',
});

/* background overlay */
const BackgroundOverlay = styled('div')({
  position: 'absolute',
  zIndex: 1,
  minHeight: '100%',
  minWidth: '100%',
  opacity: '0.25',
});

/* root style for the dashboard page content */
const RootStyle = styled('section')({
  display: 'flex',
  position: 'absolute',
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  padding: '50px',
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
      <BackgroundStyle id="background">
        <BackgroundOverlay />
      </BackgroundStyle>
      <RootStyle id="page-content">{children}</RootStyle>
    </main>
  );
};

export default DashboardLayout;
