import { ICollectionFormLogisticsTypesDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/logistics/api/compatible_facilities_for_logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
const collectionFormLogisticsTypesDataMock: ICollectionFormLogisticsTypesDataPayload =
  {
    logistics_types: [
      {
        logistics_type: 'Test Type',
        compatible_facilities: ['ASECCA', 'Techsel'],
      },
      {
        logistics_type: 'Luton Van',
        compatible_facilities: ['Techsel'],
      },
      {
        logistics_type: 'LWB Transit',
        compatible_facilities: ['ASECCA', 'Techsel'],
      },
    ],
  };

export default collectionFormLogisticsTypesDataMock;
