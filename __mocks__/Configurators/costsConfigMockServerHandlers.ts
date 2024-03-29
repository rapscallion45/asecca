import { rest } from 'msw';
import costsConfigDataMock from './costsConfigDataMock';
import {
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Costs Config mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * GET /costs_config definitions
 *
 * @since 0.0.13
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
 * @since 0.0.13
 */
/** shape of the "req.body" */
type CostsConfigPostRequestBody = null;

/** shape of the "req.params" */
type CostsConfigPostRequestParams = {};

/** shape of the mocked response body */
type CostsConfigPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.13
 */
export const costsConfigMockHandlers = [
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
];

const mockHandlers = {
  costsConfigMockHandlers,
};
export default mockHandlers;
