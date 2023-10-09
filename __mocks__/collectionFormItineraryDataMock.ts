import { ICollectionFormItineraryDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/itinerary/api/itinerary
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 */
const collectionFormItineraryDataMock: ICollectionFormItineraryDataPayload = [
  {
    asset_category: 'Server',
    quantity: 15,
    packing_details: null,
  },
  {
    asset_category: 'Phone',
    quantity: 50,
    packing_details: 'All together in cardboard box',
  },
];
export default collectionFormItineraryDataMock;
