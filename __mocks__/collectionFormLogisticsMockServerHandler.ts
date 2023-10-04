import { rest } from 'msw';
import collectionFormLogisticsDataMock from './collectionFormLogisticsDataMock';
import {
  ICollectionFormLogisticsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Logistics mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET /collection/logistics/api/logistics definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body"  */
type CollectionFormLogisticsGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormLogisticsGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormLogisticsGetResponseBody =
  ICollectionFormLogisticsDataPayload;

/**
 * POST /collection/logistics/api/logistics definitions
 *
 * @since 0.0.13
 */
/** shape of the "req.body" */
type CollectionFormLogisticsPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormLogisticsPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormLogisticsPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.13
 */
export const collectionFormLogisticsMockHandlers = [
  /**
   * Test/mock GET Collection Form Logistics NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormLogisticsGetRequestBody,
    CollectionFormLogisticsGetRequestParams,
    CollectionFormLogisticsGetResponseBody
  >('/api/collection/logistics/api/logistics', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json(collectionFormLogisticsDataMock))
  ),

  /**
   * Test/mock GET Collection Form Logistics ASECCA
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormLogisticsGetRequestBody,
    CollectionFormLogisticsGetRequestParams,
    CollectionFormLogisticsGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/logistics/api/logistics`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionFormLogisticsDataMock))
  ),

  /**
   * Test/mock POST Collection Form Logistics NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormLogisticsPostRequestBody,
    CollectionFormLogisticsPostRequestParams,
    CollectionFormLogisticsPostResponseBody
  >('/api/collection/logistics/api/logistics', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Logistics ASECCA
   *
   * @since 0.0.13
   */
  rest.post<
    CollectionFormLogisticsPostRequestBody,
    CollectionFormLogisticsPostRequestParams,
    CollectionFormLogisticsPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/logistics/api/logistics`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),

  /**
   * Test/mock GET Collection Form Logistics Types NextJS PROXY
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormLogisticsGetRequestBody,
    CollectionFormLogisticsGetRequestParams,
    CollectionFormLogisticsGetResponseBody
  >(
    '/api/collection/logistics/api/compatible_facilities_for_logistics',
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionFormLogisticsDataMock))
  ),

  /**
   * Test/mock GET Collection Form Logistics Types ASECCA
   *
   * @since 0.0.13
   */
  rest.get<
    CollectionFormLogisticsGetRequestBody,
    CollectionFormLogisticsGetRequestParams,
    CollectionFormLogisticsGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/logistics/api/compatible_facilities_for_logistics`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json(collectionFormLogisticsDataMock))
  ),
];

const mockHandlers = {
  collectionFormLogisticsMockHandlers,
};
export default mockHandlers;
