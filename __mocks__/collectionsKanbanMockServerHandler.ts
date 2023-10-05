import { rest } from 'msw';
import collectionsKanbanDataMock from './collectionsKanbanDataMock';
import {
  IKanbanBoardCollectionsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collections Kanban mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET /collection_kanban_staging/api/collections definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body"  */
type CollectionsKanbanGetRequestBody = null;

/** shape of the "req.params" */
type CollectionsKanbanGetRequestParams = {};

/** shape of the mocked response body */
type CollectionsKanbanGetResponseBody = IKanbanBoardCollectionsDataPayload;

/**
 * POST /collection_kanban_staging/api/collections definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body" */
type CollectionsKanbanPostRequestBody = null;

/** shape of the "req.params" */
type CollectionsKanbanPostRequestParams = {};

/** shape of the mocked response body */
type CollectionsKanbanPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.13
 */
export const collectionsKanbanMockHandlers = [
  /**
   * Test/mock GET Collections Kanban NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionsKanbanGetRequestBody,
    CollectionsKanbanGetRequestParams,
    CollectionsKanbanGetResponseBody
  >('/api/kanban/collections', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json(collectionsKanbanDataMock))
  ),

  /**
   * Test/mock GET Collections Kanban ASECCA
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionsKanbanGetRequestBody,
    CollectionsKanbanGetRequestParams,
    CollectionsKanbanGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection_kanban_staging/api/collections`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionsKanbanDataMock))
  ),

  /**
   * Test/mock POST Collections Kanban NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionsKanbanPostRequestBody,
    CollectionsKanbanPostRequestParams,
    CollectionsKanbanPostResponseBody
  >('/api/kanban/collections', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collections Kanban ASECCA
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionsKanbanPostRequestBody,
    CollectionsKanbanPostRequestParams,
    CollectionsKanbanPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection_kanban_staging/api/collections`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionsKanbanMockHandlers,
};
export default mockHandlers;
