import { ICollectionFormFacilityDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/facility/api/facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */
const collectionFormFacilityDataMock: ICollectionFormFacilityDataPayload = {
  rows: [
    {
      asset_category: 'Phone',
      facility: 'ASECCA',
      workflow: 'Erasure - HMG 5, Lower',
    },
    {
      asset_category: 'Laptop',
      facility: null,
      workflow: null,
    },
  ],
};

export default collectionFormFacilityDataMock;
