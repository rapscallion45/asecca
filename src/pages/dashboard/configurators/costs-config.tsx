import { useState, useEffect } from 'react';
import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, AppDispatch } from '@/redux/store';
import { Box, Typography } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import { fetchBySourceId as fetchCostsConfigBySourceId } from '@/redux/slices/costsConfigSlice';
import CostsConfigTable from '@/components/CostsConfigTable/CostsConfigTable';
import { CostsConfigCostSource } from '@/lib/api/api-types';

/**
 * Costs Config Page
 *
 * Presents user with costs configuration table, with data fetched from Asecca
 * API, based on passed page query params
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @returns {NextPageWithLayout} - Costs Configuration page component
 */
const CostsConfigPage: NextPageWithLayout = () => {
  /* shorthand helper for dispatching redux actions */
  const dispatch = useDispatch<AppDispatch>();

  /* shorthand helper for the next router */
  const router = useRouter();

  /* get user permission level held in redux state */
  const { level: userPermissionLevel } = useSelector(
    (state: AppState) => state.userPermission
  );

  /* copy of page query param held in local page state */
  const [query, setQuery] = useState<string | (string | null)[]>('');

  /* *** THIS IS A TEST PARAM - USER WILL NOT BE ABLE TO CHANGE PERMISSION *** */
  /* keep a copy of the original API request permission level in local state */
  const [apiPermission, setApiPermission] =
    useState<CostsConfigCostSource>('Global');

  /* get page query params from URL on first load, and set orig permission */
  useEffect(() => {
    /* check for customer, project or collection data query in page uri */
    const { customer, project, collection } = router.query;

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
  }, [router, dispatch]);

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

  return (
    <>
      <Box my={5} sx={{ maxWidth: 500 }}>
        <Typography variant="h4">
          Costing Configuration - Lloyds Bank - {userPermissionLevel} {query}
        </Typography>
      </Box>
      {/* load table with fetched data and permission level */}
      <CostsConfigTable
        permission={userPermissionLevel}
        query={query as string}
      />
    </>
  );
};

/** dashboard layout used for Costs Config page */
CostsConfigPage.Layout = DashboardLayout;

export default CostsConfigPage;
