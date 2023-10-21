import { rest } from 'msw';
import collectionFormQuoteDataMock from './collectionFormQuoteDataMock';
import {
  ICollectionFormQuoteDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Quote mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 */

/**
 * GET /collection/quote/api/quote definitions
 *
 * @since 0.0.19
 */
/** shape of the "req.body"  */
type CollectionFormQuoteGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormQuoteGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormQuoteGetResponseBody = ICollectionFormQuoteDataPayload;

/**
 * POST /collection/quote/api/quote definitions
 *
 * @since 0.0.19
 */
/** shape of the "req.body" */
type CollectionFormQuotePostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormQuotePostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormQuotePostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.19
 */
export const collectionFormQuoteMockHandlers = [
  /**
   * Test/mock GET Collection Form Quote NextJS PROXY
   *
   * @since 0.0.19
   */
  rest.get<
    CollectionFormQuoteGetRequestBody,
    CollectionFormQuoteGetRequestParams,
    CollectionFormQuoteGetResponseBody
  >('/api/collection/quote/api/quote', async (req, res, ctx) =>
    /** return mock quote data */
    res(ctx.status(200), ctx.json(collectionFormQuoteDataMock))
  ),

  /**
   * Test/mock GET Collection Form Quote ASECCA
   *
   * @since 0.0.19
   */
  rest.get<
    CollectionFormQuoteGetRequestBody,
    CollectionFormQuoteGetRequestParams,
    CollectionFormQuoteGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/quote/api/quote`,
    async (req, res, ctx) =>
      /** return mock quote data */
      res(ctx.status(200), ctx.json(collectionFormQuoteDataMock))
  ),

  /**
   * Test/mock POST Collection Form Quote NextJS PROXY
   *
   * @since 0.0.19
   */
  rest.post<
    CollectionFormQuotePostRequestBody,
    CollectionFormQuotePostRequestParams,
    CollectionFormQuotePostResponseBody
  >('/api/collection/quote/api/quote', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Quote ASECCA
   *
   * @since 0.0.19
   */
  rest.post<
    CollectionFormQuotePostRequestBody,
    CollectionFormQuotePostRequestParams,
    CollectionFormQuotePostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/quote/api/quote`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  collectionFormQuoteMockHandlers,
};
export default mockHandlers;
