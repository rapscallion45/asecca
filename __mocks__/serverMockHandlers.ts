import { rest } from 'msw';
import costsConfigDataMock from './costsConfigDataMock';
import collectionFormCostsDataMock from './collectionFormCostsDataMock';
import {
  ICollectionFormCostsDataPayload,
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * ****** COSTS CONFIGURATOR ******
 * ****** ================== ******
 */

/**
 * GET /costs_config definitions
 *
 * @since 0.0.0
 */
/** shape of the "req.body"  */
type CostsConfigGetRequestBody = null;

/** shape of the "req.params" */
type CostsConfigGetRequestParams = {};

/** shape of the mocked response body */
type CostsConfigGetResponseBody = ICostsConfigDataPayload;

/**
 * POST /costs_config definitions
 *
 * @since 0.0.0
 */
/** shape of the "req.body" */
type CostsConfigPostRequestBody = null;

/** shape of the "req.params" */
type CostsConfigPostRequestParams = {};

/** shape of the mocked response body */
type CostsConfigPostResponseBody = IProxyErrorPayload | null;

/**
 * ****** COLLECTION FORM COSTS ******
 * ****** ===================== ******
 */

/**
 * GET /costs_config definitions
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
 * POST /costs_config definitions
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
 * @since 0.0.0
 */
export const mockHandlers = [
  /**
   * Test/mock GET Costs Config NextJS PROXY
   *
   * @since 0.0.0
   */
  rest.get<
    CostsConfigGetRequestBody,
    CostsConfigGetRequestParams,
    CostsConfigGetResponseBody
  >('/api/configurators/costs_config', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json({ costs: costsConfigDataMock.costs }))
  ),

  /**
   * Test/mock GET Costs Config ASECCA
   *
   * @since 0.0.0
   */
  rest.get<
    CostsConfigGetRequestBody,
    CostsConfigGetRequestParams,
    CostsConfigGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/cost_config/api/cost_config`,
    async (req, res, ctx) =>
      /** return mock costs config data */
      res(ctx.status(200), ctx.json({ costs: costsConfigDataMock.costs }))
  ),

  /**
   * Test/mock POST Costs Config NextJS PROXY
   *
   * @since 0.0.0
   */
  rest.post<
    CostsConfigPostRequestBody,
    CostsConfigPostRequestParams,
    CostsConfigPostResponseBody
  >('/api/configurators/costs_config', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Costs Config ASECCA
   *
   * @since 0.0.0
   */
  rest.post<
    CostsConfigPostRequestBody,
    CostsConfigPostRequestParams,
    CostsConfigPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/cost_config/api/cost_config`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),

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
   * Test/mock POST Costs Config NextJS PROXY
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
   * Test/mock POST Costs Config ASECCA
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

const serverMockHandlers = {
  mockHandlers,
};
export default serverMockHandlers;
