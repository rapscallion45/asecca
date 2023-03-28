import { useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import queryString from 'query-string';
import { Box, Button, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AdminTestPanel from '@/components/AdminTestPanel/AdminTestPanel';
import DataTable from '@/components/DataTable/DataTable';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { getCostsConfigColFilterList } from '@/utils';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import {
  fetchBySourceId as fetchCostsConfigBySourceId,
  saveBySourceId as saveCostsConfigBySourceId,
  resetCostsConfig,
} from '@/redux/slices/costsConfigSlice';
import { DataTableColumn } from '@/components/DataTable/types';

/* costs config data table column defintions */
const columns: Array<DataTableColumn> = [
  { label: 'Product', key: 'name' },
  { label: 'Application', key: 'application' },
  { label: 'Global', key: 'global_charge' },
  { label: 'Customer', key: 'customer_charge' },
  { label: 'Project', key: 'project_charge' },
  { label: 'Collection', key: 'collection_charge' },
  { label: 'Prevailing', key: 'effective_charge' },
];

/* Costs Config Test Page */
/* ====================== */
const CostsConfigTestPage: NextPageWithLayout = () => {
  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* get costs config data held in redux state */
  const { data, loading, error, saving } = useSelector(
    (state: AppState) => state.costsConfig
  );

  /* get user permission level held in redux state */
  const { permission } = useSelector((state: AppState) => state.userPermission);

  /* filter the data table columns for current permission level */
  const [colFilterList, setColFilterList] = useState<Array<string>>(
    getCostsConfigColFilterList(permission.level)
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
    setColFilterList(getCostsConfigColFilterList(permission.level));
  }, [permission.level]);

  /* handle the saving of the table data */
  const handleSave = () => {
    dispatch(
      saveCostsConfigBySourceId({
        source: permission.level,
        dataId: query,
        data,
      })
    );
  };

  /* handle the resetting of the table data */
  const handleCancel = () => {
    dispatch(resetCostsConfig());
  };

  return (
    <Container maxWidth="lg">
      <AdminTestPanel />
      <Box my={5} sx={{ maxWidth: 500 }}>
        <Typography variant="h4" color="common.white">
          Costing Configuration - Lloyds Bank - {permission.level} {query}
        </Typography>
      </Box>
      <DataTable
        name="costs config"
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
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingButton
          color="secondary"
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          loading={saving}
        >
          Save
        </LoadingButton>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancel}
          disabled={saving}
          sx={{ backgroundColor: 'common.white', ml: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

/* dashboard layout used for Costs Config page */
CostsConfigTestPage.Layout = DashboardLayout;

export default CostsConfigTestPage;
