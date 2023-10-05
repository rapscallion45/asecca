import { ICollectionFormServicesDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/services/api/get
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */
const collectionFormServicesDataMock: ICollectionFormServicesDataPayload = {
  on_site_processing: false,
  service_type: {
    Recycling: {
      decommissioning_requested: false,
      ownership_retention: 'DoesntRetainOwnership',
    },
  },
};

export default collectionFormServicesDataMock;
