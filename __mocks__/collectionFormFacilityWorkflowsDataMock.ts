import { ICollectionFormFacilityWorkflowsDataPayload } from '@/lib/api/api-types';

/**
 * mock file defining returned data from API GET /collection/facility/api/workflow_for_facility
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */
const collectionFormFacilityWorkflowsDataMock: ICollectionFormFacilityWorkflowsDataPayload =
  [
    {
      name: 'Erasure',
      advanced: false,
    },
    {
      name: 'Destruction',
      advanced: false,
    },
    {
      name: 'Erasure - HMG 5, Lower',
      advanced: true,
    },
  ];

export default collectionFormFacilityWorkflowsDataMock;
