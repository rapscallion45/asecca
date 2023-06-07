import { useState } from 'react';
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
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);

  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  return (
    <ClientOnly>
      <Box my={5}>
        <Box my={2}>
          <Typography variant="h4" color="common.white">
            AG-Grid Test Page 3
          </Typography>
        </Box>
        <div
          className={`ag-theme-alpine ${
            theme.palette.mode === 'light'
              ? 'ag-theme-asecca'
              : 'ag-theme-asecca-dark'
          }`}
          style={{ height: 400, width: '100%' }}
        >
          <AgGridReact rowData={rowData} columnDefs={columnDefs} />
        </div>
      </Box>
    </ClientOnly>
  );
};

/** dashboard layout used for Ag Grid test page */
AGGridTestPage.Layout = DashboardLayout;

export default AGGridTestPage;
