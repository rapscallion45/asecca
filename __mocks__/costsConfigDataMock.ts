import { ICostsConfigDataPayload } from '@/lib/api/api-types';

/*
 ** mock file defining returned data from API GET /costs_config
 */
const assetDataMock: ICostsConfigDataPayload = {
  costs: [
    {
      application: 'Per Device',
      collection_charge: null,
      cost_source: 'Global',
      customer_charge: null,
      effective_charge: 'Global',
      global_charge: '9.00',
      line_type: 'Typical',
      name: 'Device Processing',
      project_charge: null,
    },
    {
      application: 'Per Batch',
      collection_charge: '100.00',
      cost_source: 'Collection',
      customer_charge: null,
      effective_charge: 'Collection',
      global_charge: null,
      line_type: 'Typical',
      name: 'Two-Man Wrap',
      project_charge: null,
    },
  ],
};

export default assetDataMock;
