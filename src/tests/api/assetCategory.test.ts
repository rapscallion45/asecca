import { createMocks } from 'node-mocks-http';
import newAssetCategoryHandler from '@/pages/api/collection/asset_category/api/new_asset_category';
import assetCategoryFacilitiesHandler from '@/pages/api/collection/asset_category/api/facilities';
import assetCategoryFacilitiesDataMock from '../../../__mocks__/assetCategoryFacilitiesDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Asset Category API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.16
 */
describe('Asset Category API Routes', () => {
  describe('GET /collection/asset_category/api/facilities', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await assetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(assetCategoryFacilitiesDataMock)
      );
    });
  });

  describe('POST /collection/asset_category/api/facilities', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await assetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/asset_category/api/facilities', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await assetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/asset_category/api/facilities', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await assetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/asset_category/api/new_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await newAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /collection/asset_category/api/new_asset_category', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          name: 'Printer',
          co2: null,
          data_bearing: false,
          removable_storage: false,
          serialized: true,
          compatible_facilities: ['ASECCA'],
        },
      });

      /** Act */
      await newAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/asset_category/api/new_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await newAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/asset_category/api/new_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await newAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
