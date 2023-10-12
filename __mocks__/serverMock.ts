import { setupServer } from 'msw/node';
import { costsConfigMockHandlers } from './costsConfigMockServerHandlers';
import { collectionsKanbanMockHandlers } from './collectionsKanbanMockServerHandler';
import { collectionFormCostsMockHandlers } from './collectionFormCostsMockServerHandlers';
import { collectionFormScheduleMockHandlers } from './collectionFormScheduleMockServerHandlers';
import { collectionFormLogisticsMockHandlers } from './collectionFormLogisticsMockServerHandler';
import { collectionFormServicesMockHandlers } from './collectionFormServicesMockServerHandler';
import { collectionFormItineraryMockHandlers } from './collectionFormItineraryMockServerHandler';
import { collectionFormFacilityMockHandlers } from './collectionFormFacilityMockServerHandlers';
import { devicesTableMockHandlers } from './devicesTableMockServerHandler';
import { assetCategoryMockHandlers } from './assetCategoryMockServerHandler';
import { collectionFormNewContactMockHandlers } from './collectionFormNewContactMockServerHandlers';

/**
 * configuration of the mock server for running tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
const mockHandlers = [
  ...costsConfigMockHandlers,
  ...collectionsKanbanMockHandlers,
  ...collectionFormCostsMockHandlers,
  ...collectionFormScheduleMockHandlers,
  ...collectionFormLogisticsMockHandlers,
  ...collectionFormServicesMockHandlers,
  ...collectionFormItineraryMockHandlers,
  ...collectionFormFacilityMockHandlers,
  ...collectionFormNewContactMockHandlers,
  ...devicesTableMockHandlers,
  ...assetCategoryMockHandlers,
];
const server = setupServer(...mockHandlers);
export default server;
