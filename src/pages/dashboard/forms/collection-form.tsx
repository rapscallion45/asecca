import type { NextPageWithLayout } from 'next';
import { Box, Typography } from '@mui/material';
import CollectionFormCosts from '@/components/CollectionFormCosts/CollectionFormCosts';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

/**
 * Collection Form Page
 *
 * Presents user with collection form widgets, with data fetched from Asecca
 * API, based on passed collection ID query param
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @returns {NextPageWithLayout} - Collection Form page component
 */
const CollectionFormPage: NextPageWithLayout = () => (
  <Box my={5}>
    <Box my={5} sx={{ maxWidth: 500 }}>
      <Typography variant="h4">
        {/* Collection Form - {collectionForm.name} */}
        Collection Form - Placeholder
      </Typography>
    </Box>
    {/* load collection form with fetched data */}
    <CollectionFormCosts collectionId="123456" />
  </Box>
);

/** dashboard layout used for Collection Form page */
CollectionFormPage.Layout = DashboardLayout;

export default CollectionFormPage;