import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Costs Config data table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const costsConfigTableColumns: Array<IDataTableColumn> = [
  { label: 'Product', key: 'name', type: 'string' },
  { label: 'Application', key: 'application', type: 'string' },
  { label: 'Global', key: 'global_charge', type: 'currency' },
  { label: 'Customer', key: 'customer_charge', type: 'currency' },
  { label: 'Project', key: 'project_charge', type: 'currency' },
  { label: 'Collection', key: 'collection_charge', type: 'currency' },
  { label: 'Prevailing', key: 'effective_charge', type: 'currency' },
];

export default costsConfigTableColumns;
