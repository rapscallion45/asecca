import { rest } from 'msw';
import collectionFormScheduleDataMock from './collectionFormScheduleDataMock';
import {
  ICollectionFormScheduleDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Schedule mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET /collection/schedule/api/get definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body"  */
type CollectionFormScheduleGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormScheduleGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormScheduleGetResponseBody = ICollectionFormScheduleDataPayload;

/**
 * POST /collection/schedule/api/set definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body" */
type CollectionFormSchedulePostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormSchedulePostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormSchedulePostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.13
 */
export const collectionFormScheduleMockHandlers = [
  /**
   * Test/mock GET Collection Form Schedule NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormScheduleGetRequestBody,
    CollectionFormScheduleGetRequestParams,
    CollectionFormScheduleGetResponseBody
  >('/api/collection/schedule/api/get', async (req, res, ctx) =>
    /** return mock schedule data */
    res(ctx.status(200), ctx.json(collectionFormScheduleDataMock))
  ),

  /**
   * Test/mock GET Collection Form Schedule ASECCA
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormScheduleGetRequestBody,
    CollectionFormScheduleGetRequestParams,
    CollectionFormScheduleGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/schedule/api/get`,
    async (req, res, ctx) =>
      /** return mock schedule data */
      res(ctx.status(200), ctx.json(collectionFormScheduleDataMock))
  ),

  /**
   * Test/mock POST Collection Form Schedule NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormSchedulePostRequestBody,
    CollectionFormSchedulePostRequestParams,
    CollectionFormSchedulePostResponseBody
  >('/api/collection/schedule/api/set', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Schedule ASECCA
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormSchedulePostRequestBody,
    CollectionFormSchedulePostRequestParams,
    CollectionFormSchedulePostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/schedule/api/set`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionFormScheduleMockHandlers,
};
export default mockHandlers;
