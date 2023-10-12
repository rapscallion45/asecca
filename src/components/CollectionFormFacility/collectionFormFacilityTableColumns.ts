import { IDataTableColumn } from '@/components/DataTable/types';
import { ICollectionFormFacilityWorkflowsData } from '@/lib/api/api-types';
import collectionFormFacilityWorkflowsDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityWorkflowsDataMock';
import collectionFormFacilityAssetCategoryFacilitiesDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityAssetCategoryFacilitiesDataMock';

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
    selectOptions: collectionFormFacilityAssetCategoryFacilitiesDataMock,
    allowUnassigned: true,
    unassignedText: 'Unassigned',
  },
  {
    label: 'Workflow',
    key: 'workflow',
    type: 'select',
    selectOptions: collectionFormFacilityWorkflowsDataMock.map(
      (workflow: ICollectionFormFacilityWorkflowsData) => workflow.name
    ),
  },
  {
    label: '',
    key: 'view_workflow',
    type: 'action',
  },
];

export default collectionFormFacilityTableColumns;
