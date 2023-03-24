import { useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import queryString from 'query-string';
import { Box, Container, Typography } from '@mui/material';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { getConfigCostsColFilterList } from '@/utils';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import { fetchBySourceId as fetchCostsConfigBySourceId } from '@/redux/slices/costsConfigSlice';
import { DataTableColumn } from '@/components/types';

/* costs config data table column defintions */
const columns: Array<DataTableColumn> = [
  { label: 'Product', key: 'name' },
  { label: 'Global', key: 'global_charge' },
  { label: 'Customer', key: 'customer_charge' },
  { label: 'Project', key: 'project_charge' },
  { label: 'Collection', key: 'collection_charge' },
  { label: 'Prevailing', key: 'effective_charge' },
];

/* Configure Costs Test Page */
/* ========================= */
const ConfigureCostsTestPage: NextPageWithLayout = () => {
  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get costs config data held in redux state */
  const { data, loading, error } = useSelector(
    (state: AppState) => state.costsConfig
  );

  /* get user permission level held in redux state */
  const { permission } = useSelector((state: AppState) => state.userPermission);

  /* filter the data table columns for current permission level */
  const [colFilterList, setColFilterList] = useState<Array<string>>(
    getConfigCostsColFilterList(permission.level)
  );

  /* copy of page query param held in local page state */
  const [query, setQuery] = useState<string | (string | null)[]>('');

  /* get page query params from URL on first load */
  useEffect(() => {
    /* check for customer, project or collection data query */
    const { customer, project, collection } = queryString.parse(
      window.location.search
    );

    /* test for which type of query this is and set state accordingly */
    if (customer !== undefined && customer !== null && customer !== '') {
      /* set Customer permission level and data ID to be fetched from API */
      dispatch(setPermissionLevel({ level: 'Customer' }));
      setQuery(customer);
    }
    if (project !== undefined && project !== null && project !== '') {
      /* set Project permission level and data ID to be fetched from API */
      dispatch(setPermissionLevel({ level: 'Project' }));
      setQuery(project);
    }
    if (collection !== undefined && collection !== null && collection !== '') {
      /* set Collection permission level and data ID to be fetched from API */
      dispatch(setPermissionLevel({ level: 'Collection' }));
      setQuery(collection);
    }
  }, [dispatch]);

  /* whenever the page query is updated, fetch new data from API */
  useEffect(() => {
    if (query) {
      dispatch(
        fetchCostsConfigBySourceId({
          source: permission.level as string,
          dataId: query,
        })
      );
    }
  }, [query, dispatch]);

  /* whenever the user permission global state is updated, re-filter cols */
  useEffect(() => {
    setColFilterList(getConfigCostsColFilterList(permission.level));
  }, [permission.level]);

  return (
    <Container maxWidth="lg">
      <AdminTestPanel />
      <Box my={5} sx={{ maxWidth: 500 }}>
        <Typography variant="h4" color="common.white">
          Costing Configuration - Lloyds Bank - {permission.level} {query}
        </Typography>
      </Box>
      <DataTable
        name="config costs"
        /* table editable cell(s) defined by user permission level */
        editColName={permission.level}
        /* filter table columns by current permission level */
        columns={columns.filter(
          (col: any) => !colFilterList.includes(col.label)
        )}
        rows={data?.costs}
        isLoading={loading}
        isError={Boolean(error)}
      />
    </Container>
  );
};

/* dashboard layout used for Configure Costs page */
ConfigureCostsTestPage.Layout = DashboardLayout;

export default ConfigureCostsTestPage;
