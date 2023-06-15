import { useState, useCallback, useMemo } from 'react';
import type { NextPageWithLayout } from 'next';
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, useTheme } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/slices/notificationsSlice';
import devicesService from '@/services/devicesService';
import { formatBooleanAGGrid, formatDateTimeAGGrid } from '@/utils';

/**
 * Devices Table page
 *
 * Devices data AG-Grid table interface
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.3
 *
 * @component
 * @returns {NextPageWithLayout} - Devices table page component
 */
const DevicesTable: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [rowData, setRowData] = useState();

  /**
   * Device table column configuration
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @constant
   */
  const [columnDefs] = useState([
    {
      field: 'collection_id',
      headerName: 'Collection ID',
      cellDataType: 'text',
    },
    {
      field: 'collection_name',
      headerName: 'Collection Name',
      cellDataType: 'text',
    },
    { field: 'customer', headerName: 'Customer', cellDataType: 'text' },
    {
      field: 'destroyed',
      headerName: 'Destroyed',
      cellDataType: 'boolean',
      valueFormatter: formatBooleanAGGrid,
    },
    {
      field: 'diagnostics_grade',
      headerName: 'Diagnostics Grade',
      cellDataType: 'text',
    },
    { field: 'fmip_status', headerName: 'FMIP Status', cellDataType: 'text' },
    { field: 'frp_status', headerName: 'FRP Status', cellDataType: 'text' },
    { field: 'imei', headerName: 'IMEI', cellDataType: 'text' },
    {
      field: 'in_stock',
      headerName: 'In Stock',
      cellDataType: 'boolean',
      valueFormatter: formatBooleanAGGrid,
    },
    {
      field: 'logged_ts',
      headerName: 'Logged TS',
      cellDataType: 'date',
      valueFormatter: formatDateTimeAGGrid,
    },
    { field: 'manufacturer', headerName: 'Manufacturer', cellDataType: 'text' },
    { field: 'mdm_status', headerName: 'MDM Status', cellDataType: 'text' },
    { field: 'model', headerName: 'Model', cellDataType: 'text' },
    {
      field: 'overall_grade',
      headerName: 'Overall Grade',
      cellDataType: 'text',
    },
    { field: 'project', headerName: 'Project', cellDataType: 'text' },
    {
      field: 'quarantined',
      headerName: 'Quarantined',
      cellDataType: 'boolean',
      valueFormatter: formatBooleanAGGrid,
    },
    { field: 'serial', headerName: 'Serial', cellDataType: 'text' },
    {
      field: 'smash_test_grade',
      headerName: 'Smash Test Grade',
      cellDataType: 'text',
    },
    {
      field: 'to_be_destroyed',
      headerName: 'To Be Destroyed',
      cellDataType: 'boolean',
      valueFormatter: formatBooleanAGGrid,
    },
    { field: 'uid', headerName: 'ID', cellDataType: 'text' },
  ]);

  /**
   * Device table default column configuration
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @constant
   */
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      resizable: true,
      floatingFilter: true,
      editable: false,
      /* allow every column to be aggregated */
      enableValue: true,
      /* allow every column to be pivoted */
      enablePivot: true,
      /* allow row grouping */
      enableRowGroup: true,
      /* allow every column to be sorted and filtered */
      sortable: true,
      filter: true,
    }),
    []
  );

  /**
   * Device table default group column configuration
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @constant
   */
  const autoGroupColumnDef = useMemo(
    () => ({
      minWidth: 200,
    }),
    []
  );

  /**
   * AG-Grid ready callback used to load data from API
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   */
  const onGridReady = useCallback(async () => {
    /* call API */
    const res = await devicesService.getDevices();

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      dispatch(
        addNotification({
          message: `Failed to load Devices data from server: ${res.statusText}`,
          variant: 'error',
        })
      );
      return;
    }

    /* good response, set table local state data */
    const data = await res.json();
    setRowData(data?.devices);
  }, [dispatch]);

  return (
    <ClientOnly>
      <Box my={5}>
        <Typography variant="h4">Devices</Typography>
      </Box>
      <div
        className={`${
          theme.palette.mode === 'light'
            ? 'ag-theme-balham ag-theme-asecca'
            : 'ag-theme-balham-dark ag-theme-asecca-dark'
        }`}
        style={{ height: '100vh', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          sideBar
          enableRangeSelection
          onGridReady={onGridReady}
        />
      </div>
    </ClientOnly>
  );
};

/** dashboard layout used for Devices Table page */
DevicesTable.Layout = DashboardLayout;

export default DevicesTable;
