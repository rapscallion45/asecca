import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import type { NextPageWithLayout } from 'next';
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, useTheme } from '@mui/material';
import { AppDispatch } from '@/redux/store';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { addNotification } from '@/redux/slices/notificationsSlice';
import devicesService from '@/services/tables/devicesTableService';
import { formatBooleanAGGrid, formatDateTimeAGGrid } from '@/utils';
import {
  IDevicesTableData,
  IDevicesTableDataPayload,
} from '@/lib/api/api-types';

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
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [rowData, setRowData] = useState<Array<IDevicesTableData>>();

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
    },
    {
      field: 'collection_name',
      headerName: 'Collection Name',
    },
    { field: 'customer', headerName: 'Customer' },
    {
      field: 'destroyed',
      headerName: 'Destroyed',

      valueFormatter: formatBooleanAGGrid,
    },
    {
      field: 'diagnostics_grade',
      headerName: 'Diagnostics Grade',
    },
    { field: 'fmip_status', headerName: 'FMIP Status' },
    { field: 'frp_status', headerName: 'FRP Status' },
    { field: 'imei', headerName: 'IMEI' },
    {
      field: 'in_stock',
      headerName: 'In Stock',
      valueFormatter: formatBooleanAGGrid,
    },
    {
      field: 'logged_ts',
      headerName: 'Logged TS',
      valueFormatter: formatDateTimeAGGrid,
    },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'mdm_status', headerName: 'MDM Status' },
    { field: 'model', headerName: 'Model' },
    {
      field: 'overall_grade',
      headerName: 'Overall Grade',
    },
    { field: 'project', headerName: 'Project' },
    {
      field: 'quarantined',
      headerName: 'Quarantined',
      valueFormatter: formatBooleanAGGrid,
    },
    { field: 'serial', headerName: 'Serial' },
    {
      field: 'smash_test_grade',
      headerName: 'Smash Test Grade',
    },
    {
      field: 'to_be_destroyed',
      headerName: 'To Be Destroyed',
      valueFormatter: formatBooleanAGGrid,
    },
    { field: 'uid', headerName: 'ID' },
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
    const data: IDevicesTableDataPayload = await res.json();
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
          rowData={rowData as any}
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
