import { createMocks } from 'node-mocks-http';
import devicesTableHandler from '@/pages/api/tables/api/devices';
import devicesTableDataMock from '../../../__mocks__/devicesTableDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Devices Table API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */
describe('Devices Table API Routes', () => {
  describe('GET /tables/api/devices', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await devicesTableHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(devicesTableDataMock)
      );
    });
  });

  describe('POST /tables/api/devices', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
      });

      /** Act */
      await devicesTableHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /tables/api/devices', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await devicesTableHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /tables/api/devices', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await devicesTableHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
