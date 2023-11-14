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
    label: 'Assigned Facility',
    key: 'facility',
    type: 'action',
    allowUnassigned: true,
    unassignedText: 'Unassigned',
  },
  {
    label: 'Workflow',
    key: 'workflow',
    type: 'action',
    allowUnassigned: true,
    unassignedText: 'Unassigned',
  },
  {
    label: '',
    key: 'view_workflow',
    type: 'action',
  },
];

export default collectionFormFacilityTableColumns;
