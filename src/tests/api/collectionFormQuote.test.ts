import { createMocks } from 'node-mocks-http';
import collectionFormQuoteHandler from '@/pages/api/collection/quote/api/quote';
import collectionFormQuoteDataMock from '../../../__mocks__/CollectionForm/collectionFormQuoteDataMock';

/* mock query string as causes Jest error */
jest.mock('query-string', () => ({
  stringify: () => 'collection=66135000015737072',
}));

/* eslint-disable no-underscore-dangle */

/**
 * Collection Form Quote API Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 */
describe('Collection Form Quote API Routes', () => {
  describe('GET /collection/quote/api/quote', () => {
    it('returns expected data', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          collection: '66135000001760012',
        },
      });

      /** Act */
      await collectionFormQuoteHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(collectionFormQuoteDataMock)
      );
    });

    it('returns error if query params not provided', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'GET',
      });

      /** Act */
      await collectionFormQuoteHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(422);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          message: 'Unproccesable request, no ID provided.',
        })
      );
    });
  });

  describe('POST /collection/quote/api/quote', () => {
    it('returns expected response', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'POST',
        query: {
          collection: 12323123,
          expires: '07/08/2023',
          models: [
            {
              id: 123123,
              prices: {
                'Fully Working': 38.33,
                'Minor Technical Faults': 23.0,
                'Major Technical Faults': 11.5,
                'Does Not Turn On': 0.0,
              },
            },
            {
              id: 234234,
              prices: {
                'Fully Working': 16.67,
                'Minor Technical Faults': 10.0,
                'Major Technical Faults': 5.0,
                'Does Not Turn On': 0.0,
              },
            },
          ],
        },
      });

      /** Act */
      await collectionFormQuoteHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('PUT /collection/quote/api/quote', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'PUT',
      });

      /** Act */
      await collectionFormQuoteHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /collection/quote/api/quote', () => {
    it('returns 404 for unsupported method', async () => {
      /** Arrange */
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      /** Act */
      await collectionFormQuoteHandler(req, res);

      /** Assert */
      expect(res._getStatusCode()).toBe(404);
    });
  });
});
