/* costs config data table column defintions */
import { IDataTableColumn } from '@/components/DataTable/types';

/*
 ** mock of example data table column config
 */
const columns: Array<IDataTableColumn> = [
  { label: 'Product', key: 'name', type: 'string' },
  { label: 'Application', key: 'application', type: 'string' },
  { label: 'Global', key: 'global_charge', type: 'currency' },
  { label: 'Customer', key: 'customer_charge', type: 'currency' },
  { label: 'Project', key: 'project_charge', type: 'currency' },
  { label: 'Collection', key: 'collection_charge', type: 'currency' },
  { label: 'Prevailing', key: 'effective_charge', type: 'currency' },
];

export default columns;