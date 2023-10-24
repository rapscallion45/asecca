import { rest } from 'msw';
import collectionFormSOWDataMock from './collectionFormSOWDataMock';
import { ICollectionFormSOWDataPayload } from '@/lib/api/api-types';

/**
 * Collection Form SOW mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 */

/**
 * GET /collection/sow/preview definitions
 *
 * @since 0.0.21
 */
/** shape of the "req.body"  */
type CollectionFormSOWGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormSOWGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormSOWGetResponseBody = ICollectionFormSOWDataPayload;

/**
 * GET /collection/sow/api/download definitions
 *
 * @since 0.0.21
 */
/** shape of the "req.body" */
type CollectionFormSOWDownloadPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormSOWDownloadPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormSOWDownloadPostResponseBody = ICollectionFormSOWDataPayload;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.21
 */
export const collectionFormSOWMockHandlers = [
  /**
   * Test/mock GET Collection Form SOW Preview NextJS PROXY
   *
   * @since 0.0.21
   */
  rest.get<
    CollectionFormSOWGetRequestBody,
    CollectionFormSOWGetRequestParams,
    CollectionFormSOWGetResponseBody
  >('/api/collection/sow/preview', async (req, res, ctx) =>
    /** return mock SOW data */
    res(ctx.status(200), ctx.json(collectionFormSOWDataMock))
  ),

  /**
   * Test/mock GET Collection Form SOW Preview ASECCA
   *
   * @since 0.0.21
   */
  rest.get<
    CollectionFormSOWGetRequestBody,
    CollectionFormSOWGetRequestParams,
    CollectionFormSOWGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/sow/preview`,
    async (req, res, ctx) =>
      /** return mock SOW data */
      res(ctx.status(200), ctx.json(collectionFormSOWDataMock))
  ),

  /**
   * Test/mock GET Collection Form SOW Download NextJS PROXY
   *
   * @since 0.0.21
   */
  rest.get<
    CollectionFormSOWDownloadPostRequestBody,
    CollectionFormSOWDownloadPostRequestParams,
    CollectionFormSOWDownloadPostResponseBody
  >('/api/collection/sow/api/download', async (req, res, ctx) =>
    /** return mock SOW data */
    res(ctx.status(200), ctx.json(collectionFormSOWDataMock))
  ),

  /**
   * Test/mock POST Collection Form SOW Download ASECCA
   *
   * @since 0.0.21
   */
  rest.get<
    CollectionFormSOWDownloadPostRequestBody,
    CollectionFormSOWDownloadPostRequestParams,
    CollectionFormSOWDownloadPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/sow/api/download`,
    async (req, res, ctx) =>
      /** return mock SOW data */
      res(ctx.status(200), ctx.json(collectionFormSOWDataMock))
  ),
];

const mockHandlers = {
  collectionFormSOWMockHandlers,
};
export default mockHandlers;
