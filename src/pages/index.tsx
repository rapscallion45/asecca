import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';

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

const BackgroundOverlay = styled('div')({
  position: 'absolute',
  zIndex: 1,
  minHeight: '100%',
  minWidth: '100%',
  opacity: '0.25',
});

const RootStyle = styled('section')({
  display: 'flex',
  position: 'absolute',
  minHeight: '100vh',
  minWidth: '100%',
  overflow: 'hidden',
  padding: '50px',
});

/* Configure Costs Test Page */
/* ========================= */
const ConfigureCostsTestPage: NextPage = () => (
  <main id="configure-costs">
    <BackgroundStyle id="background">
      <BackgroundOverlay />
    </BackgroundStyle>
    <RootStyle id="page-content">
      <Container maxWidth="lg">
        <AdminTestPanel />
        <Box mt={10}>
          <DataTable />
        </Box>
      </Container>
    </RootStyle>
  </main>
);

export default ConfigureCostsTestPage;
