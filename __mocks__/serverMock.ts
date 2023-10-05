import { setupServer } from 'msw/node';
import { costsConfigMockHandlers } from './costsConfigMockServerHandlers';
import { collectionsKanbanMockHandlers } from './collectionsKanbanMockServerHandler';
import { collectionFormCostsMockHandlers } from './collectionFormCostsMockServerHandlers';
import { collectionFormScheduleMockHandlers } from './collectionFormScheduleMockServerHandlers';
import { collectionFormLogisticsMockHandlers } from './collectionFormLogisticsMockServerHandler';

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
];
const server = setupServer(...mockHandlers);
export default server;
