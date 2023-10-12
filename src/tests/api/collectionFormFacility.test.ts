import { createMocks } from 'node-mocks-http';
import collectionFormFacilityHandler from '@/pages/api/collection/facility/api/facility';
import collectionFormFacilityAssetCategoryFacilitiesHandler from '@/pages/api/collection/facility/api/facilities_for_asset_category';
import collectionFormFacilityWorkflowsHandler from '@/pages/api/collection/facility/api/workflow_for_facility';
import collectionFormFacilityDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityDataMock';
import collectionFormFacilityAssetCategoryFacilitiesDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityAssetCategoryFacilitiesDataMock';
import collectionFormFacilityWorkflowsDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityWorkflowsDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Facility API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */
describe('Collection Form Facility API Routes', () => {
  describe('GET /collection/facility/api/facility', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormFacilityHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormFacilityDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormFacilityHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/facility/api/facility', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection: '12345',
          rows: [
            {
              asset_category: 'Phone',
              facility: 'ASECCA',
              workflow: 'Erasure - HMG 5, Lower',
            },
            {
              asset_category: 'Laptop',
              facility: 'Techsel',
              workflow: 'Erasure',
            },
          ],
        },
      });

      /** Act */
      await collectionFormFacilityHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/facility/api/facility', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormFacilityHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/facility/api/facility', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormFacilityHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/facility/api/facilities_for_asset_category', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          assetCategory: 'Laptop',
        },
      });

      /** Act */
      await collectionFormFacilityAssetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(
          collectionFormFacilityAssetCategoryFacilitiesDataMock
        )
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormFacilityAssetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/facility/api/facilities_for_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await collectionFormFacilityAssetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/facility/api/facilities_for_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormFacilityAssetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/facility/api/facilities_for_asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormFacilityAssetCategoryFacilitiesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/facility/api/workflow_for_facility', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          assetCategory: 'Laptop',
          facility: 'Phone',
        },
      });

      /** Act */
      await collectionFormFacilityWorkflowsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormFacilityWorkflowsDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          assetCategory: 'Laptop',
        },
      });

      /** Act */
      await collectionFormFacilityWorkflowsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, missing params.',
        })
      );
    });
  });

  describe('POST /collection/facility/api/workflow_for_facility', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await collectionFormFacilityWorkflowsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/facility/api/workflow_for_facility', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormFacilityWorkflowsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/facility/api/workflow_for_facility', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormFacilityWorkflowsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
