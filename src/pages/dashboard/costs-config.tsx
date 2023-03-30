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
import { getCostsConfigColFilterList, getCostsConfigPostData } from '@/utils';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import {
  fetchBySourceId as fetchCostsConfigBySourceId,
  saveBySourceId as saveCostsConfigBySourceId,
  resetCostsConfig,
  editCostsConfig,
} from '@/redux/slices/costsConfigSlice';
import { IDataTableColumn } from '@/components/DataTable/types';
import { ICostsConfigData } from '@/lib/api/api-types';

/* costs config data table column defintions */
const columns: Array<IDataTableColumn> = [
  { label: 'Product', key: 'name', type: 'string' },
  { label: 'Application', key: 'application', type: 'string' },
  { label: 'Global', key: 'global_charge', type: 'currency' },
  { label: 'Customer', key: 'customer_charge', type: 'currency' },
  { label: 'Project', key: 'project_charge', type: 'currency' },
  { label: 'Collection', key: 'collection_charge', type: 'currency' },
  { label: 'Prevailing', key: 'effective_charge', type: 'currency' },
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

  /* *** THIS IS A TEST PARAM - USER WILL NOT BE ABLE TO CHANGE PERMISSION *** */
  /* keep a copy of the original API request permission level in local state */
  const [apiPermission, setApiPermission] = useState<string>('');

  /* get page query params from URL on first load, and set orig permission */
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
      setApiPermission('Customer');
    }
    if (project !== undefined && project !== null && project !== '') {
      /* set Project permission level and data ID to be fetched from API */
      dispatch(setPermissionLevel({ level: 'Project' }));
      setQuery(project);
      setApiPermission('Project');
    }
    if (collection !== undefined && collection !== null && collection !== '') {
      /* set Collection permission level and data ID to be fetched from API */
      dispatch(setPermissionLevel({ level: 'Collection' }));
      setQuery(collection);
      setApiPermission('Collection');
    }
  }, [dispatch]);

  /* whenever the page query is updated, fetch new data from API */
  useEffect(() => {
    if (query) {
      dispatch(
        fetchCostsConfigBySourceId({
          source: apiPermission,
          dataId: query,
        })
      );
    }
  }, [query, apiPermission, dispatch]);

  /* whenever the user permission global state is updated, re-filter cols */
  useEffect(() => {
    setColFilterList(getCostsConfigColFilterList(permission.level));
  }, [permission.level]);

  /* handle the saving of the table data */
  const handleSave = () => {
    dispatch(
      saveCostsConfigBySourceId({
        data: getCostsConfigPostData(permission.level, query, data?.costs),
      })
    );
  };

  /* handle the resetting of the table data */
  const handleCancel = () => {
    dispatch(resetCostsConfig());
  };

  /* handle the update of the table data */
  const handleEditellCallback = (
    value: string | null,
    colKey: string,
    rowIdx: number
  ) => {
    dispatch(
      editCostsConfig({
        value: value !== '--' ? value : null,
        colKey: colKey as keyof ICostsConfigData,
        rowIdx,
      })
    );
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
          (col: IDataTableColumn) => !colFilterList.includes(col.label)
        )}
        rows={data?.costs || []}
        isLoading={loading}
        error={error}
        editCellCallback={handleEditellCallback}
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
          disabled={saving || loading}
          loading={saving}
        >
          Save
        </LoadingButton>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleCancel}
          disabled={saving || loading}
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
