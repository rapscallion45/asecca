import { rest } from 'msw';
import collectionFormCostsDataMock from './collectionFormCostsDataMock';
import {
  ICollectionFormCostsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Costs mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET /collection/costs/api/costs definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body"  */
type CollectionFormCostsGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormCostsGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormCostsGetResponseBody = ICollectionFormCostsDataPayload;

/**
 * POST /collection/costs/api/costs definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body" */
type CollectionFormCostsPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormCostsPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormCostsPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.13
 */
export const collectionFormCostsMockHandlers = [
  /**
   * Test/mock GET Collection Form Costs NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormCostsGetRequestBody,
    CollectionFormCostsGetRequestParams,
    CollectionFormCostsGetResponseBody
  >('/api/collection/costs/api/costs', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json(collectionFormCostsDataMock))
  ),

  /**
   * Test/mock GET Collection Form Costs ASECCA
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormCostsGetRequestBody,
    CollectionFormCostsGetRequestParams,
    CollectionFormCostsGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/costs/api/costs`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionFormCostsDataMock))
  ),

  /**
   * Test/mock POST Collection Form Costs NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormCostsPostRequestBody,
    CollectionFormCostsPostRequestParams,
    CollectionFormCostsPostResponseBody
  >('/api/collection/costs/api/costs', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Costs ASECCA
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormCostsPostRequestBody,
    CollectionFormCostsPostRequestParams,
    CollectionFormCostsPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/costs/api/costs`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionFormCostsMockHandlers,
};
export default mockHandlers;
