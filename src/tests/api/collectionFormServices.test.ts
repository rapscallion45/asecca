import { createMocks } from 'node-mocks-http';
import collectionFormServiceGetHandler from '@/pages/api/collection/service/api/get';
import collectionFormServiceSetHandler from '@/pages/api/collection/service/api/set';
import collectionFormServiceContactsHandler from '@/pages/api/collection/service/api/contacts';
import collectionFormServiceDataMock from '../../../__mocks__/CollectionForm/collectionFormServiceDataMock';
import collectionFormServiceContactsDataMock from '../../../__mocks__/CollectionForm/collectionFormServiceContactsDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Service API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */
describe('Collection Form Service API Routes', () => {
  describe('GET /collection/service/api/get', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormServiceGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormServiceDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormServiceGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/service/api/set', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection: 1235434213,
          ...collectionFormServiceDataMock,
        },
      });

      /** Act */
      await collectionFormServiceSetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/service/api/get', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormServiceGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/service/api/set', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormServiceSetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/service/api/get', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormServiceGetHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/service/api/set', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormServiceSetHandler(req, res);

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
      await collectionFormServiceContactsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormServiceContactsDataMock)
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
      await collectionFormServiceContactsHandler(req, res);

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
      await collectionFormServiceContactsHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
