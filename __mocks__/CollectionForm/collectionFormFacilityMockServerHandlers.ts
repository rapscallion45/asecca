import { rest } from 'msw';
import collectionFormFacilityDataMock from './collectionFormFacilityDataMock';
import collectionFormFacilityWorkflowsDataMock from './collectionFormFacilityWorkflowsDataMock';
import collectionFormFacilityAssetCategoryFacilitiesDataMock from './collectionFormFacilityAssetCategoryFacilitiesDataMock';
import {
  ICollectionFormFacilityDataPayload,
  ICollectionFormFacilityAssetCategoryFacilitiesDataPayload,
  ICollectionFormFacilityWorkflowsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';
import {
  IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs,
  IFetchCollectionFormFacilityWorkflowsArgs,
} from '@/redux/types';

/**
 * Collection Form Facility mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */

/**
 * GET /collection/facility/api/facility definitions
 *
 * @since 0.0.17
 */
/** shape of the "req.body"  */
type CollectionFormFacilityGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormFacilityGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormFacilityGetResponseBody = ICollectionFormFacilityDataPayload;

/**
 * POST /collection/facility/api/facility definitions
 *
 * @since 0.0.17
 */
/** shape of the "req.body" */
type CollectionFormFacilityPostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormFacilityPostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormFacilityPostResponseBody = IProxyErrorPayload | null;

/**
 * GET /collection/facility/api/facilities_for_asset_category definitions
 *
 * @since 0.0.17
 */
/** shape of the "req.body"  */
type CollectionFormFacilityAssetCategoryFacilitiesGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormFacilityAssetCategoryFacilitiesRequestParams =
  IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs;

/** shape of the mocked response body */
type CollectionFormFacilityAssetCategoryFacilitiesGetResponseBody =
  ICollectionFormFacilityAssetCategoryFacilitiesDataPayload;

/**
 * GET /collection/facility/api/workflow_for_facility definitions
 *
 * @since 0.0.17
 */
/** shape of the "req.body" */
type CollectionFormFacilityWorkflowsGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormFacilityWorkflowsRequestParams =
  IFetchCollectionFormFacilityWorkflowsArgs;

/** shape of the mocked response body */
type CollectionFormFacilityWorkflowsGetResponseBody =
  ICollectionFormFacilityWorkflowsDataPayload;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.17
 */
export const collectionFormFacilityMockHandlers = [
  /**
   * Test/mock GET Collection Form Facility NextJS PROXY
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityGetRequestBody,
    CollectionFormFacilityGetRequestParams,
    CollectionFormFacilityGetResponseBody
  >('/api/collection/facility/api/facility', async (req, res, ctx) =>
    /** return mock facility data */
    res(ctx.status(200), ctx.json(collectionFormFacilityDataMock))
  ),

  /**
   * Test/mock GET Collection Form Facility ASECCA
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityGetRequestBody,
    CollectionFormFacilityGetRequestParams,
    CollectionFormFacilityGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/facility/api/facility`,
    async (req, res, ctx) =>
      /** return mock facility data */
      res(ctx.status(200), ctx.json(collectionFormFacilityDataMock))
  ),

  /**
   * Test/mock POST Collection Form Facility NextJS PROXY
   *
   * @since 0.0.17
   */
  rest.post<
    CollectionFormFacilityPostRequestBody,
    CollectionFormFacilityPostRequestParams,
    CollectionFormFacilityPostResponseBody
  >('/api/collection/facility/api/facility', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Facility ASECCA
   *
   * @since 0.0.17
   */
  rest.post<
    CollectionFormFacilityPostRequestBody,
    CollectionFormFacilityPostRequestParams,
    CollectionFormFacilityPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/facility/api/facility`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),

  /**
   * Test/mock GET Collection Form Facility Asset Category Facilities NextJS PROXY
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityAssetCategoryFacilitiesGetRequestBody,
    CollectionFormFacilityAssetCategoryFacilitiesRequestParams,
    CollectionFormFacilityAssetCategoryFacilitiesGetResponseBody
  >(
    '/api/collection/facility/api/facilities_for_asset_category',
    async (req, res, ctx) =>
      /** return mock facility asset category facilities types data */
      res(
        ctx.status(200),
        ctx.json(collectionFormFacilityAssetCategoryFacilitiesDataMock)
      )
  ),

  /**
   * Test/mock GET Collection Form Facility Asset Category Facilities ASECCA
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityAssetCategoryFacilitiesGetRequestBody,
    CollectionFormFacilityAssetCategoryFacilitiesRequestParams,
    CollectionFormFacilityAssetCategoryFacilitiesGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/facility/api/facilities_for_asset_category`,
    async (req, res, ctx) =>
      /** return mock facility asset category facilities data */
      res(
        ctx.status(200),
        ctx.json(collectionFormFacilityAssetCategoryFacilitiesDataMock)
      )
  ),

  /**
   * Test/mock GET Collection Form Facility Workflows NextJS PROXY
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityWorkflowsGetRequestBody,
    CollectionFormFacilityWorkflowsRequestParams,
    CollectionFormFacilityWorkflowsGetResponseBody
  >(
    '/api/collection/facility/api/workflow_for_facility',
    async (req, res, ctx) =>
      /** return mock facility workflows types data */
      res(ctx.status(200), ctx.json(collectionFormFacilityWorkflowsDataMock))
  ),

  /**
   * Test/mock GET Collection Form Facility Workflows ASECCA
   *
   * @since 0.0.17
   */
  rest.get<
    CollectionFormFacilityWorkflowsGetRequestBody,
    CollectionFormFacilityWorkflowsRequestParams,
    CollectionFormFacilityWorkflowsGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/facility/api/workflow_for_facility`,
    async (req, res, ctx) =>
      /** return mock facility workflows types data */
      res(ctx.status(200), ctx.json(collectionFormFacilityWorkflowsDataMock))
  ),
];

const mockHandlers = {
  collectionFormFacilityMockHandlers,
};
export default mockHandlers;
