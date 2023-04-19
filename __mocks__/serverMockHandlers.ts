import { rest } from 'msw';
import costsConfigDataMock from './costsConfigDataMock';
import {
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * mock server API handlers shared between all tests
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */

/**
 * GET /costs_config definitions
 *
 * @since - 0.0.0
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
 * @since - 0.0.0
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
 * @since - 0.0.0
 */
export const mockHandlers = [
  /**
   * Test/mock GET Costs Config
   *
   * @since - 0.0.0
   */
  rest.get<
    CostsConfigGetRequestBody,
    CostsConfigGetRequestParams,
    CostsConfigGetResponseBody
  >('/api/costs_config', async (req, res, ctx) =>
    /** return mock costs config data */
    res(ctx.status(200), ctx.json({ costs: costsConfigDataMock.costs }))
  ),

  /**
   * Test/mock POST Costs Config
   *
   * @since - 0.0.0
   */
  rest.post<
    CostsConfigPostRequestBody,
    CostsConfigPostRequestParams,
    CostsConfigPostResponseBody
  >('/api/costs_config', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),
];

const serverMockHandlers = {
  mockHandlers,
};
export default serverMockHandlers;
