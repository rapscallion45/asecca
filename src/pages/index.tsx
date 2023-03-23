import type { NextPageWithLayout } from 'next';
import { useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { AppState } from '@/redux/store';

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
  global_charge: number | null,
  customer_charge: number | null,
  project_charge: number | null,
  collection_charge: number | null,
  effective_charge: number
) => ({
  name,
  global_charge,
  customer_charge,
  project_charge,
  collection_charge,
  effective_charge,
});

const rows = [createData('Device Processing', 9.0, 2, 3, 4, 9.0)];

/* Configure Costs Test Page */
/* ========================= */
const ConfigureCostsTestPage: NextPageWithLayout = () => {
  /* get user permission level held in redux state */
  const { permission } = useSelector((state: AppState) => state.userPermission);

  return (
    <Container maxWidth="lg">
      <AdminTestPanel />
      <Box mt={10}>
        <DataTable
          name="config costs"
          editColName={permission.level}
          columns={columns}
          rows={rows}
          isLoading={false}
          isError={false}
        />
      </Box>
    </Container>
  );
};

/* dashboard layout used for Configure Costs page */
ConfigureCostsTestPage.Layout = DashboardLayout;

export default ConfigureCostsTestPage;
