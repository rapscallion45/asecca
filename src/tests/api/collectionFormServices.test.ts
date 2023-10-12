import { createMocks } from 'node-mocks-http';
import collectionFormServicesGetHandler from '@/pages/api/collection/services/api/get';
import collectionFormServicesSetHandler from '@/pages/api/collection/services/api/set';
import collectionFormServicesContactsHandler from '@/pages/api/collection/services/api/contacts';
import collectionFormServicesDataMock from '../../../__mocks__/CollectionForm/collectionFormServicesDataMock';
import collectionFormServicesContactsDataMock from '../../../__mocks__/CollectionForm/collectionFormServicesContactsDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Services API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */
describe('Collection Form Services API Routes', () => {
  describe('GET /collection/services/api/get', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormServicesGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormServicesDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormServicesGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/services/api/set', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection: 1235434213,
          ...collectionFormServicesDataMock,
        },
      });

      /** Act */
      await collectionFormServicesSetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/services/api/get', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormServicesGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/services/api/set', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormServicesSetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/services/api/get', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormServicesGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/services/api/set', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormServicesSetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/service/api/contacts', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormServicesContactsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormServicesContactsDataMock)
      );
    });
  });

  describe('PUT /collection/service/api/contacts', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormServicesContactsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/service/api/contacts', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormServicesContactsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
