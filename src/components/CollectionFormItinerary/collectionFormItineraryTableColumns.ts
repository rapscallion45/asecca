import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Itinerary table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItinerary
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormItineraryTableColumns: Array<IDataTableColumn> = [
  {
    label: '',
    key: 'delete_row',
    type: 'action',
  },
  {
    label: 'Asset Category',
    key: 'asset_category',
    type: 'select',
    selectOptions: [] /* select options retreived from API at runtime */,
  },
  {
    label: 'Quantity',
    key: 'quantity',
    type: 'numerical',
    nullDisallowed: true,
  },
  {
    label: 'Packing Details',
    key: 'packing_details',
    type: 'text',
  },
];

export default collectionFormItineraryTableColumns;
