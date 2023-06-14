import { useState, useCallback, useMemo } from 'react';
import type { NextPageWithLayout } from 'next';
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, useTheme } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/slices/notificationsSlice';

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
    { field: 'collection_id', headerName: 'Collection ID' },
    { field: 'collection_name', headerName: 'Collection Name' },
    { field: 'customer', headerName: 'Customer' },
    { field: 'destroyed', headerName: 'Destroyed' },
    { field: 'diagnostics_grade', headerName: 'Diagnostics Grade' },
    { field: 'fmip_status', headerName: 'FMIP Status' },
    { field: 'frp_status', headerName: 'FRP Status' },
    { field: 'imei', headerName: 'IMEI' },
    { field: 'in_stock', headerName: 'In Stock' },
    { field: 'logged_ts', headerName: 'Logged TS' },
    { field: 'manufacturer', headerName: 'Manufacturer' },
    { field: 'mdm_status', headerName: 'MDM Status' },
    { field: 'model', headerName: 'Model' },
    { field: 'overall_grade', headerName: 'Overall Grade' },
    { field: 'project', headerName: 'Project' },
    { field: 'quarantined', headerName: 'Quarantined' },
    { field: 'serial', headerName: 'Serial' },
    { field: 'smash_test_grade', headerName: 'Smash Test Grade' },
    { field: 'to_be_destroyed', headerName: 'To Be Destroyed' },
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
  const onGridReady = useCallback(() => {
    fetch('/api/devices')
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message) throw new Error(data.message);
        setRowData(data?.devices);
      })
      .catch((event: any) => {
        dispatch(
          addNotification({
            message: event.message,
            variant: 'error',
          })
        );
      });
  }, []);

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
