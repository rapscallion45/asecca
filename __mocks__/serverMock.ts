import { setupServer } from 'msw/node';
import { costsConfigMockHandlers } from './Configurators/costsConfigMockServerHandlers';
import { collectionsKanbanMockHandlers } from './Kanban/collectionsKanbanMockServerHandler';
import { collectionFormCostsMockHandlers } from './CollectionForm/collectionFormCostsMockServerHandlers';
import { collectionFormScheduleMockHandlers } from './CollectionForm/collectionFormScheduleMockServerHandlers';
import { collectionFormLogisticsMockHandlers } from './CollectionForm/collectionFormLogisticsMockServerHandler';
import { collectionFormServicesMockHandlers } from './CollectionForm/collectionFormServicesMockServerHandler';
import { collectionFormItineraryMockHandlers } from './CollectionForm/collectionFormItineraryMockServerHandler';
import { collectionFormFacilityMockHandlers } from './CollectionForm/collectionFormFacilityMockServerHandlers';
import { devicesTableMockHandlers } from './Tables/devicesTableMockServerHandler';
import { assetCategoryMockHandlers } from './assetCategoryMockServerHandler';
import { collectionFormNewContactMockHandlers } from './CollectionForm/collectionFormNewContactMockServerHandlers';

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
