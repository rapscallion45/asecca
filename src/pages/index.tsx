import type { NextPage } from 'next';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';

const RootStyle = styled('section')({
  display: 'flex',
  minHeight: '100vh',
  overflow: 'hidden',
  background: 'url(/static/background.jpg)',
  backgroundSize: 'cover',
  backgroundPositionX: 'center',
  backgroundPositionY: 'center',
  padding: '50px',
});

/* Configure Costs Test Page */
/* ========================= */
const ConfigureCostsTestPage: NextPage = () => (
  <main id="configure-costs">
    <RootStyle id="splash">
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
