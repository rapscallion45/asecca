import { rest } from 'msw';
import assetCategoryFacilitiesDataMock from './assetCategoryFacilitiesDataMock';
import {
  IAssetCategoryFacilitiesDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Asset Category mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 */

/**
 * GET /collection/asset_category/api/facilities definitions
 *
 * @since 0.0.16
 */
/** shape of the "req.body"  */
type AssetCategoryFacilitiesGetRequestBody = null;

/** shape of the "req.params" */
type AssetCategoryFacilitiesGetRequestParams = {};

/** shape of the mocked response body */
type AssetCategoryFacilitiesGetResponseBody =
  IAssetCategoryFacilitiesDataPayload;

/**
 * POST /collection/asset_category/api/new_asset_category definitions
 *
 * @since 0.0.16
 */
/** shape of the "req.body" */
type NewAssetCategoryPostRequestBody = null;

/** shape of the "req.params" */
type NewAssetCategoryPostRequestParams = {};

/** shape of the mocked response body */
type NewAssetCategoryPostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.16
 */
export const assetCategoryMockHandlers = [
  /**
   * Test/mock GET Asset Category NextJS PROXY
   *
   * @since 0.0.16
   */
  rest.get<
    AssetCategoryFacilitiesGetRequestBody,
    AssetCategoryFacilitiesGetRequestParams,
    AssetCategoryFacilitiesGetResponseBody
  >('/api/collection/asset_category/api/facilities', async (req, res, ctx) =>
    /** return mock facilities data */
    res(ctx.status(200), ctx.json(assetCategoryFacilitiesDataMock))
  ),

  /**
   * Test/mock GET Asset Category ASECCA
   *
   * @since 0.0.16
   */
  rest.get<
    AssetCategoryFacilitiesGetRequestBody,
    AssetCategoryFacilitiesGetRequestParams,
    AssetCategoryFacilitiesGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/asset_category/api/facilities`,
    async (req, res, ctx) =>
      /** return mock facilities data */
      res(ctx.status(200), ctx.json(assetCategoryFacilitiesDataMock))
  ),

  /**
   * Test/mock POST Asset Category NextJS PROXY
   *
   * @since 0.0.16
   */
  rest.post<
    NewAssetCategoryPostRequestBody,
    NewAssetCategoryPostRequestParams,
    NewAssetCategoryPostResponseBody
  >(
    '/api/collection/asset_category/api/new_asset_category',
    async (req, res, ctx) =>
      /** return ok message indicating successfull save */
      res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Asset Category ASECCA
   *
   * @since 0.0.16
   */
  rest.post<
    NewAssetCategoryPostRequestBody,
    NewAssetCategoryPostRequestParams,
    NewAssetCategoryPostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/asset_category/api/new_asset_category`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),
];

const mockHandlers = {
  assetCategoryMockHandlers,
};
export default mockHandlers;
