import { createMocks } from 'node-mocks-http';
import collectionsKanbanHandler from '@/pages/api/kanban/collections';
import collectionsKanbanDataMock from '../../../__mocks__/collectionsKanbanDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Costs API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
describe('Collections Kanban API Routes', () => {
  describe('GET /collection_kanban_staging/api/collections', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          project_id: '66135000001760012',
        },
      });

      /** Act */
      await collectionsKanbanHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionsKanbanDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionsKanbanHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  //   describe('POST /collection_kanban_staging/api/collections', () => {
  //     it('returns expected response', async () => {
  //       /** Arrange */
  //       const { req, res } = createMocks({
  //         method: 'POST',
  //         query: {},
  //       });

  //       /** Act */
  //       await collectionsKanbanHandler(req, res);

  //       /** Assert */
  //       expect(res._getStatusCode()).toBe(200);
  //     });
  //   });

  describe('PUT /collection_kanban_staging/api/collections', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionsKanbanHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection_kanban_staging/api/collections', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionsKanbanHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
