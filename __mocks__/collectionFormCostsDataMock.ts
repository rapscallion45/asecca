import { ICollectionFormCostsDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/costs/api/costs
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
const collectionFormCostsDataMock: ICollectionFormCostsDataPayload = {
  rows: [
    {
      chargeable: 'Device Processing',
      global_charge: '9.00',
      customer_charge: null,
      project_charge: null,
      collection_charge: null,
      effective_charge: '9.00',
    },
    {
      chargeable: 'Non Secure Courier Service',
      global_charge: '15.00',
      customer_charge: null,
      project_charge: null,
      collection_charge: '12.00',
      effective_charge: '12.00',
    },
  ],
};

export default collectionFormCostsDataMock;
