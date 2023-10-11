import { createMocks } from 'node-mocks-http';
import collectionFormLogisticsHandler from '@/pages/api/collection/logistics/api/logistics';
import collectionFormLogisticsTypesHandler from '@/pages/api/collection/logistics/api/compatible_facilities_for_logistics';
import collectionFormLogisticsDataMock from '../../../__mocks__/collectionFormLogisticsDataMock';
import collectionFormLogisticsTypesDataMock from '../../../__mocks__/collectionFormLogisticsTypesDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Logistics API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
describe('Collection Form Logistics API Routes', () => {
  describe('GET /collection/logistics/api/logistics', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormLogisticsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormLogisticsDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormLogisticsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/logistics/api/logistics', () => {
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
      await collectionFormLogisticsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/logistics/api/logistics', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormLogisticsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/logistics/api/logistics', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormLogisticsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/logistics/api/compatible_facilities_for_logistics', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormLogisticsTypesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormLogisticsTypesDataMock)
      );
    });
  });

  describe('POST /collection/logistics/api/compatible_facilities_for_logistics', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await collectionFormLogisticsTypesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/logistics/api/compatible_facilities_for_logistics', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormLogisticsTypesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/logistics/api/compatible_facilities_for_logistics', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormLogisticsTypesHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
