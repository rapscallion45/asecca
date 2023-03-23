import type { NextPageWithLayout } from 'next';
import { Box, Container } from '@mui/material';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

const columns: Array<any> = [
  { label: 'Product', key: 'name' },
  { label: 'Global', key: 'global_charge' },
  { label: 'Customer', key: 'customer_charge' },
  { label: 'Project', key: 'project_charge' },
  { label: 'Collection', key: 'collection_charge' },
  { label: 'Prevailing', key: 'effective_charge' },
];

const createData: any = (
  name: string,
  global_charge: number,
  customer_charge: number,
  project_charge: number,
  collection_charge: number,
  effective_charge: number
) => ({
  name,
  global_charge,
  customer_charge,
  project_charge,
  collection_charge,
  effective_charge,
});

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 3.9),
];

/* Configure Costs Test Page */
/* ========================= */
const ConfigureCostsTestPage: NextPageWithLayout = () => (
  <Container maxWidth="lg">
    <AdminTestPanel />
    <Box mt={10}>
      <DataTable
        name="config costs"
        columns={columns}
        rows={rows}
        isLoading={false}
        isError={false}
      />
    </Box>
  </Container>
);

/* dashboard layout used for Configure Costs page */
ConfigureCostsTestPage.Layout = DashboardLayout;

export default ConfigureCostsTestPage;
