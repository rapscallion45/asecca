import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Quote Prevailing table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuote
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormQuoteTableColumns: Array<IDataTableColumn> = [
  { label: 'Model', key: 'display_name', type: 'string' },
  { label: 'Fully Working', key: 'fully_working', type: 'currency' },
  { label: 'Customer Charge', key: 'minor_technical_faults', type: 'currency' },
  { label: 'Project Charge', key: 'major_technical_faults', type: 'currency' },
  { label: 'Collection Charge', key: 'does_not_turn_on', type: 'currency' },
];

export default collectionFormQuoteTableColumns;
