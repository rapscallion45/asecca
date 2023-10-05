import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Costs table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormCosts
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormCostsTableColumns: Array<IDataTableColumn> = [
  { label: 'Chargeable', key: 'chargeable', type: 'string' },
  { label: 'Global Charge', key: 'global_charge', type: 'currency' },
  { label: 'Customer Charge', key: 'customer_charge', type: 'currency' },
  { label: 'Project Charge', key: 'project_charge', type: 'currency' },
  { label: 'Collection Charge', key: 'collection_charge', type: 'currency' },
  { label: 'Effective Charge', key: 'effective_charge', type: 'currency' },
];

export default collectionFormCostsTableColumns;
