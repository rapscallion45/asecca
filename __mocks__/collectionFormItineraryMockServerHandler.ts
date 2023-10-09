import { rest } from 'msw';
import collectionFormItineraryDataMock from './collectionFormItineraryDataMock';
import collectionFormItineraryAssetCategoryDataMock from './collectionFormItineraryAssetCategoryDataMock';
import {
  ICollectionFormItineraryDataPayload,
  ICollectionFormItineraryAssetCategoryDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Itinerary mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 */

/**
 * GET /collection/itinerary/api/itinerary definitions
 *
 * @since 0.0.15
 */
/** shape of the "req.body"  */
type CollectionFormItineraryGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormItineraryGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormItineraryGetResponseBody =
  | ICollectionFormItineraryDataPayload
  | ICollectionFormItineraryAssetCategoryDataPayload;

/**
 * POST /collection/logistics/api/logistics definitions
 *
 * @since 0.0.15
 */
/** shape of the "req.body" */
type CollectionFormItineraryPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormItineraryPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormItineraryPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.15
 */
export const collectionFormItineraryMockHandlers = [
  /**
   * Test/mock GET Collection Form Itinerary NextJS PROXY
   *
   * @since 0.0.15
   */
  rest.get<
    CollectionFormItineraryGetRequestBody,
    CollectionFormItineraryGetRequestParams,
    CollectionFormItineraryGetResponseBody
  >('/api/collection/itinerary/api/itinerary', async (req, res, ctx) =>
    /** return mock itinerary data */
    res(ctx.status(200), ctx.json(collectionFormItineraryDataMock))
  ),

  /**
   * Test/mock GET Collection Form Itinerary ASECCA
   *
   * @since 0.0.15
   */
  rest.get<
    CollectionFormItineraryGetRequestBody,
    CollectionFormItineraryGetRequestParams,
    CollectionFormItineraryGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/itinerary/api/itinerary`,
    async (req, res, ctx) =>
      /** return mock itinerary data */
      res(ctx.status(200), ctx.json(collectionFormItineraryDataMock))
  ),

  /**
   * Test/mock POST Collection Form Itinerary NextJS PROXY
   *
   * @since 0.0.15
   */
  rest.post<
    CollectionFormItineraryPostRequestBody,
    CollectionFormItineraryPostRequestParams,
    CollectionFormItineraryPostResponseBody
  >('/api/collection/itinerary/api/itinerary', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Itinerary ASECCA
   *
   * @since 0.0.15
   */
  rest.post<
    CollectionFormItineraryPostRequestBody,
    CollectionFormItineraryPostRequestParams,
    CollectionFormItineraryPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/itinerary/api/itinerary`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),

  /**
   * Test/mock GET Collection Form Itinerary Asset Category NextJS PROXY
   *
   * @since 0.0.15
   */
  rest.get<
    CollectionFormItineraryGetRequestBody,
    CollectionFormItineraryGetRequestParams,
    CollectionFormItineraryGetResponseBody
  >('/api/collection/enumerations/api/asset_category', async (req, res, ctx) =>
    /** return mock itinerary asset category data */
    res(ctx.status(200), ctx.json(collectionFormItineraryAssetCategoryDataMock))
  ),

  /**
   * Test/mock GET Collection Form Itinerary Asset Category ASECCA
   *
   * @since 0.0.15
   */
  rest.get<
    CollectionFormItineraryGetRequestBody,
    CollectionFormItineraryGetRequestParams,
    CollectionFormItineraryGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/enumerations/api/asset_category`,
    async (req, res, ctx) =>
      /** return mock itinerary asset category data */
      res(
        ctx.status(200),
        ctx.json(collectionFormItineraryAssetCategoryDataMock)
      )
  ),
];

const mockHandlers = {
  collectionFormItineraryMockHandlers,
};
export default mockHandlers;
