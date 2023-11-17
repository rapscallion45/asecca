import type { NextPageWithLayout } from 'next';
import { Box, Typography } from '@mui/material';
import CollectionFormCosts from '@/components/CollectionFormCosts/CollectionFormCosts';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import CollectionFormLogistics from '@/components/CollectionFormLogistics/CollectionFormLogistics';
import CollectionFormSchedule from '@/components/CollectionFormSchedule/CollectionFormSchedule';
import CollectionFormService from '@/components/CollectionFormService/CollectionFormService';
import CollectionFormItinerary from '@/components/CollectionFormItinerary/CollectionFormItinerary';
import CollectionFormFacility from '@/components/CollectionFormFacility/CollectionFormFacility';
import CollectionFormNewContact from '@/components/CollectionFormNewContact/CollectionFormNewContact';
import CollectionFormQuote from '@/components/CollectionFormQuote/CollectionFormQuote';
import CollectionFormSOW from '@/components/CollectionFormSOW/CollectionFormSOW';

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
    <Box maxWidth={900}>
      <Box mb={2}>
        <CollectionFormCosts collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormLogistics collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormSchedule collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormService collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormItinerary collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormFacility collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormNewContact collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormQuote collectionId="66135000015737072" />
      </Box>
      <Box mb={2}>
        <CollectionFormSOW collectionId="66135000015737072" />
      </Box>
    </Box>
  </Box>
);

/** dashboard layout used for Collection Form page */
CollectionFormPage.Layout = DashboardLayout;

export default CollectionFormPage;
