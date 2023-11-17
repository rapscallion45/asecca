import { setupServer } from 'msw/node';
import { costsConfigMockHandlers } from './Configurators/costsConfigMockServerHandlers';
import { collectionsKanbanMockHandlers } from './Kanban/collectionsKanbanMockServerHandler';
import { collectionFormCostsMockHandlers } from './CollectionForm/collectionFormCostsMockServerHandlers';
import { collectionFormScheduleMockHandlers } from './CollectionForm/collectionFormScheduleMockServerHandlers';
import { collectionFormLogisticsMockHandlers } from './CollectionForm/collectionFormLogisticsMockServerHandler';
import { collectionFormServiceMockHandlers } from './CollectionForm/collectionFormServiceMockServerHandler';
import { collectionFormItineraryMockHandlers } from './CollectionForm/collectionFormItineraryMockServerHandler';
import { collectionFormFacilityMockHandlers } from './CollectionForm/collectionFormFacilityMockServerHandlers';
import { devicesTableMockHandlers } from './Tables/devicesTableMockServerHandler';
import { assetCategoryMockHandlers } from './assetCategoryMockServerHandler';
import { collectionFormNewContactMockHandlers } from './CollectionForm/collectionFormNewContactMockServerHandlers';
import { collectionFormQuoteMockHandlers } from './CollectionForm/collectionFormQuoteMockServerHandlers';
import { collectionFormSOWMockHandlers } from './CollectionForm/collectionFormSOWMockServerHandlers';

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
  ...collectionFormServiceMockHandlers,
  ...collectionFormItineraryMockHandlers,
  ...collectionFormFacilityMockHandlers,
  ...collectionFormQuoteMockHandlers,
  ...collectionFormNewContactMockHandlers,
  ...collectionFormSOWMockHandlers,
  ...devicesTableMockHandlers,
  ...assetCategoryMockHandlers,
];
const server = setupServer(...mockHandlers);
export default server;
