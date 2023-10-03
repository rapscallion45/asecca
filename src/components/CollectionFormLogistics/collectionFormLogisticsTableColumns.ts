import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Logistics table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogistics
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormLogisticsTableColumns: Array<IDataTableColumn> = [
  { label: 'Logistics Type', key: 'logistics_type', type: 'string' },
];

export default collectionFormLogisticsTableColumns;
