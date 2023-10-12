import { ICollectionFormLogisticsDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/logistics/api/logistics
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
const collectionFormLogisticsDataMock: ICollectionFormLogisticsDataPayload = {
  rows: [
    {
      logistics_type: 'Luton Van',
      visiting_facilities: ['Techsel'],
    },
    {
      logistics_type: 'LWB Transit',
      visiting_facilities: ['ASECCA', 'Techsel'],
    },
  ],
};

export default collectionFormLogisticsDataMock;
