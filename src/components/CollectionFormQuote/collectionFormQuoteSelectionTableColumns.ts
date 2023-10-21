import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Quote Selection table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuote
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormQuotSelectionTableColumns: Array<IDataTableColumn> = [
  { label: '', key: 'delete', type: 'action' },
  { label: 'Quote', key: 'quote', type: 'string' },
];

export default collectionFormQuotSelectionTableColumns;
