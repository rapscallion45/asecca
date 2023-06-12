import { createMocks } from 'node-mocks-http';
import costsConfigHandler from '@/pages/api/costs_config';
import costsConfigDataMock from '../../../__mocks__/costsConfigDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Costs Config API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Costs Config API Routes', () => {
  describe('GET /cost_config/api/cost_config', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await costsConfigHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(costsConfigDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await costsConfigHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /cost_config/api/cost_config', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          costs: [
            {
              application: 'Per Device',
              line_type: 'Typical',
              name: 'Device Processing',
              charge: '23.00',
            },
            {
              application: 'Per Destruction',
              line_type: 'Typical',
              name: 'Device Destruction',
              charge: '67.00',
            },
          ],
          selection: {
            collection: '66135000015737072',
          },
        },
      });

      /** Act */
      await costsConfigHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /cost_config/api/cost_config', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await costsConfigHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /cost_config/api/cost_config', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await costsConfigHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
