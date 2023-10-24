import { createMocks } from 'node-mocks-http';
import collectionFormSOWPreviewHandler from '@/pages/api/collection/sow/preview';
import collectionFormSOWDownloadHandler from '@/pages/api/collection/sow/api/download';
import collectionFormSOWDataMock from '../../../__mocks__/CollectionForm/collectionFormSOWDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form SOW API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 */
describe('Collection Form SOW API Routes', () => {
  describe('GET /collection/sow/preview', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormSOWPreviewHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormSOWDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormSOWPreviewHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/sow/preview', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await collectionFormSOWPreviewHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/sow/preview', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormSOWPreviewHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/sow/preview', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormSOWPreviewHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /collection/sow/api/download', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormSOWDownloadHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormSOWDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormSOWDownloadHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/sow/api/download', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await collectionFormSOWDownloadHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /collection/sow/api/download', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormSOWDownloadHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/sow/api/download', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormSOWDownloadHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
