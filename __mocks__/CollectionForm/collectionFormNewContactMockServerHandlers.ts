import { rest } from 'msw';
import { IProxyErrorPayload } from '@/lib/api/api-types';

/**
 * Collection Form New Contact mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */

/**
 * POST /collection/contact/api/create definitions
 *
 * @since 0.0.17
 */
/** shape of the "req.body" */
type CollectionFormNewContactPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormNewContactPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormNewContactPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.17
 */
export const collectionFormNewContactMockHandlers = [
  /**
   * Test/mock POST Collection Form New Contact NextJS PROXY
   *
   * @since 0.0.17
   */
  rest.post<
    CollectionFormNewContactPostRequestBody,
    CollectionFormNewContactPostRequestParams,
    CollectionFormNewContactPostResponseBody
  >('/api/collection/contact/api/create', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form New Contact ASECCA
   *
   * @since 0.0.17
   */
  rest.post<
    CollectionFormNewContactPostRequestBody,
    CollectionFormNewContactPostRequestParams,
    CollectionFormNewContactPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/contact/api/create`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionFormNewContactMockHandlers,
};
export default mockHandlers;
