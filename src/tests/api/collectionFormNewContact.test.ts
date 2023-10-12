import { createMocks } from 'node-mocks-http';
import collectionFormNewContactHandler from '@/pages/api/collection/contact/api/create';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form New Contact API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */
describe('Collection Form New Contact API Routes', () => {
  describe('GET /collection/contact/api/create', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormNewContactHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /collection/contact/api/create', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection_id: 1234567890,
          email: 'john.smith@example.com',
          landline: '+44012345678901',
          job_title: 'Operations Manager',
          mobile: '+44012345678901',
          name: {
            prefix: 'Mr.',
            first: 'John',
            last: 'Smith',
          },
          sync_to_crm: true,
        },
      });

      /** Act */
      await collectionFormNewContactHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/contact/api/create', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormNewContactHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/contact/api/create', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormNewContactHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
