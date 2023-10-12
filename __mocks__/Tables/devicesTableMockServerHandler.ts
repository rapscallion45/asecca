import { rest } from 'msw';
import devicesTableDataMock from './devicesTableDataMock';

/**
 * Devices Table mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */

/**
 * GET /tables/api/devices definitions
 *
 * @since 0.0.14
 */
/** shape of the "req.body"  */
type DevicesTableGetRequestBody = null;

/** shape of the "req.params" */
type DevicesTableGetRequestParams = {};

/** shape of the mocked response body */
type DevicesTableGetResponseBody = any;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.14
 */
export const devicesTableMockHandlers = [
  /**
   * Test/mock GET Devices Table NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.get<
    DevicesTableGetRequestBody,
    DevicesTableGetRequestParams,
    DevicesTableGetResponseBody
  >('/api/tables/api/devices', async (req, res, ctx) =>
    /** return mock devices table data */
    res(ctx.status(200), ctx.json(devicesTableDataMock))
  ),

  /**
   * Test/mock GET Devices Table ASECCA
   *
   * @since 0.0.14
   */
  rest.get<
    DevicesTableGetRequestBody,
    DevicesTableGetRequestParams,
    DevicesTableGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/tables/api/devices`,
    async (req, res, ctx) =>
      /** return mock devices table data */
      res(ctx.status(200), ctx.json(devicesTableDataMock))
  ),
];

const mockHandlers = {
  devicesTableMockHandlers,
};
export default mockHandlers;
