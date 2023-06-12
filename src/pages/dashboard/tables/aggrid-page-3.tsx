import { useState, useCallback, useMemo } from 'react';
import type { NextPageWithLayout } from 'next';
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, useTheme } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import ClientOnly from '@/components/ClientOnly/ClientOnly';

/**
 * AG Grid Test Page
 *
 * Test page for AG-Grid integration
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @component
 * @returns {NextPageWithLayout} - AG Grid test page component
 */
const AGGridTestPage: NextPageWithLayout = () => {
  const theme = useTheme();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: 'athlete' },
    { field: 'age', maxWidth: 120 },
    { field: 'country' },
    { field: 'year', maxWidth: 120 },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 150,
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
   * @since 0.0.1
   *
   * @method
   */
  const onGridReady = useCallback(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <ClientOnly>
      <Box my={5}>
        <Typography variant="h4">AG-Grid Test Page 3</Typography>
      </Box>
      <div
        className={`ag-theme-alpine ${
          theme.palette.mode === 'light'
            ? 'ag-theme-asecca'
            : 'ag-theme-asecca-dark'
        }`}
        style={{ height: 400, width: '100%' }}
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

/** dashboard layout used for Ag Grid test page */
AGGridTestPage.Layout = DashboardLayout;

export default AGGridTestPage;
