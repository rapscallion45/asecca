import { IDataTableColumn } from '@/components/DataTable/types';

/**
 * Collection Form Facility table column defintions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof CollectionFormFacility
 *
 * @constant
 * @type {Array<IDataTableColumn>}
 */
const collectionFormFacilityTableColumns: Array<IDataTableColumn> = [
  {
    label: 'Asset Category',
    key: 'asset_category',
    type: 'string',
  },
  {
    label: 'Facility',
    key: 'facility',
    type: 'select',
    selectOptions: [] /* select options retreived from API at runtime */,
    allowUnassigned: true,
    unassignedText: 'Unassigned',
  },
  {
    label: 'Workflow',
    key: 'workflow',
    type: 'select',
    selectOptions: [] /* select options retreived from API at runtime */,
  },
  {
    label: '',
    key: 'view_workflow',
    type: 'action',
  },
];

export default collectionFormFacilityTableColumns;
