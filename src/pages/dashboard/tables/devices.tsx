import { useState, useCallback, useMemo } from 'react';
import type { NextPageWithLayout } from 'next';
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, useTheme } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';

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
  const theme = useTheme();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'collection_id' },
    { field: 'collection_name' },
    { field: 'customer' },
    { field: 'destroyed' },
    { field: 'diagnostics_grade' },
    { field: 'fmip_status' },
    { field: 'frp_status' },
    { field: 'imei' },
    { field: 'in_stock' },
    { field: 'logged_ts' },
    { field: 'manufacturer' },
    { field: 'mdm_status' },
    { field: 'model' },
    { field: 'overall_grade' },
    { field: 'project' },
    { field: 'quarantined' },
    { field: 'serial' },
    { field: 'smash_test_grade' },
    { field: 'to_be_destroyed' },
    { field: 'uid' },
  ]);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      sortable: true,
    }),
    []
  );

  /**
   * AG-Grid Ready callback used to load data from API
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.3
   *
   * @method
   */
  const onGridReady = useCallback(() => {
    fetch('/api/devices')
      .then((resp) => resp.json())
      .then((data) => setRowData(data?.devices));
  }, []);

  return (
    <ClientOnly>
      <Box my={5}>
        <Typography variant="h4">Devices</Typography>
      </Box>
      <div
        className={`ag-theme-alpine ${
          theme.palette.mode === 'light'
            ? 'ag-theme-asecca'
            : 'ag-theme-asecca-dark'
        }`}
        style={{ height: '100vh', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </ClientOnly>
  );
};

/** dashboard layout used for Devices Table page */
DevicesTable.Layout = DashboardLayout;

export default DevicesTable;
