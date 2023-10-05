import { rest } from 'msw';
import collectionFormServicesDataMock from './collectionFormServicesDataMock';
import {
  ICollectionFormServicesDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Services mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */

/**
 * GET /collection/services/api/get definitions
 *
 * @since 0.0.14
 */
/** shape of the "req.body"  */
type CollectionFormServicesGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormServicesGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormServicesGetResponseBody = ICollectionFormServicesDataPayload;

/**
 * POST /collection/services/api/set definitions
 *
 * @since 0.0.14
 */
/** shape of the "req.body" */
type CollectionFormServicesPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormServicesPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormServicesPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.14
 */
export const collectionFormServicesMockHandlers = [
  /**
   * Test/mock GET Collection Form Services NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServicesGetRequestBody,
    CollectionFormServicesGetRequestParams,
    CollectionFormServicesGetResponseBody
  >('/api/collection/services/api/get', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json(collectionFormServicesDataMock))
  ),

  /**
   * Test/mock GET Collection Form Services ASECCA
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServicesGetRequestBody,
    CollectionFormServicesGetRequestParams,
    CollectionFormServicesGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/services/api/get`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionFormServicesDataMock))
  ),

  /**
   * Test/mock POST Collection Form Services NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.post<
    CollectionFormServicesPostRequestBody,
    CollectionFormServicesPostRequestParams,
    CollectionFormServicesPostResponseBody
  >('/api/collection/services/api/set', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Services ASECCA
   *
   * @since 0.0.14
   */
  rest.post<
    CollectionFormServicesPostRequestBody,
    CollectionFormServicesPostRequestParams,
    CollectionFormServicesPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/services/api/set`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionFormServicesMockHandlers,
};
export default mockHandlers;
