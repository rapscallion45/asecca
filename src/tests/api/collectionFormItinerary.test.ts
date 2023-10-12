import { createMocks } from 'node-mocks-http';
import collectionFormItineraryHandler from '@/pages/api/collection/itinerary/api/itinerary';
import collectionFormItineraryAssetCategoryHandler from '@/pages/api/collection/enumerations/api/asset_category';
import collectionFormItineraryDataMock from '../../../__mocks__/CollectionForm/collectionFormItineraryDataMock';
import collectionFormItineraryAssetCategoryDataMock from '../../../__mocks__/CollectionForm/collectionFormItineraryAssetCategoryDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Itinerary API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 */
describe('Collection Form Itinerary API Routes', () => {
  describe('GET /collection/itinerary/api/itinerary', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormItineraryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormItineraryDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormItineraryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/itinerary/api/itinerary', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection: 1235434213,
          preferred_date: '2023/09/08',
          preferred_time: '09:30',
          notes: 'Approximately 200+ tablets (boxed)',
        },
      });

      /** Act */
      await collectionFormItineraryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/itinerary/api/itinerary', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormItineraryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/itinerary/api/itinerary', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormItineraryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/enumerations/api/asset_category', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormItineraryAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormItineraryAssetCategoryDataMock)
      );
    });
  });

  describe('PUT /collection/enumerations/api/asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormItineraryAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/enumerations/api/asset_category', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormItineraryAssetCategoryHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
