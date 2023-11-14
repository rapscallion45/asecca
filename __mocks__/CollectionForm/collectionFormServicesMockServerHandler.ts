import { rest } from 'msw';
import collectionFormServicesDataMock from './collectionFormServicesDataMock';
import collectionFormServicesContactsDataMock from './collectionFormServicesContactsDataMock';
import {
  ICollectionFormServicesDataPayload,
  ICollectionFormServicesContactsDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/**
 * Collection Form Service mock server API handlers shared between all tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */

/**
 * GET /collection/service/api/get definitions
 *
 * @since 0.0.14
 */
/** shape of the "req.body"  */
type CollectionFormServiceGetRequestBody = null;

/** shape of the "req.params" */
type CollectionFormServiceGetRequestParams = {};

/** shape of the mocked response body */
type CollectionFormServiceGetResponseBody =
  | ICollectionFormServicesDataPayload
  | ICollectionFormServicesContactsDataPayload;

/**
 * POST /collection/service/api/set definitions
 *
 * @since 0.0.14
 */
/** shape of the "req.body" */
type CollectionFormServicePostRequestBody = null;

/** shape of the "req.params" */
type CollectionFormServicePostRequestParams = {};

/** shape of the mocked response body */
type CollectionFormServicePostResponseBody = IProxyErrorPayload | null;

/**
 * list of available test/mock handlers
 *
 * @since 0.0.14
 */
export const collectionFormServicesMockHandlers = [
  /**
   * Test/mock GET Collection Form Services NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServiceGetRequestBody,
    CollectionFormServiceGetRequestParams,
    CollectionFormServiceGetResponseBody
  >('/api/collection/service/api/get', async (req, res, ctx) =>
    /** return mock service data */
    res(ctx.status(200), ctx.json(collectionFormServicesDataMock))
  ),

  /**
   * Test/mock GET Collection Form Services ASECCA
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServiceGetRequestBody,
    CollectionFormServiceGetRequestParams,
    CollectionFormServiceGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/service/api/get`,
    async (req, res, ctx) =>
      /** return mock service data */
      res(ctx.status(200), ctx.json(collectionFormServicesDataMock))
  ),

  /**
   * Test/mock POST Collection Form Services NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.post<
    CollectionFormServicePostRequestBody,
    CollectionFormServicePostRequestParams,
    CollectionFormServicePostResponseBody
  >('/api/collection/service/api/set', async (req, res, ctx) =>
    /** return ok message indicating successfull save */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),

  /**
   * Test/mock POST Collection Form Services ASECCA
   *
   * @since 0.0.14
   */
  rest.post<
    CollectionFormServicePostRequestBody,
    CollectionFormServicePostRequestParams,
    CollectionFormServicePostResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/service/api/set`,
    async (req, res, ctx) =>
      /** return 200, no payload */
      res(ctx.status(200))
  ),

  /**
   * Test/mock GET Collection Form Services Contacts NextJS PROXY
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServiceGetRequestBody,
    CollectionFormServiceGetRequestParams,
    CollectionFormServiceGetResponseBody
  >('/api/collection/service/api/contacts', async (req, res, ctx) =>
    /** return mock contacts data */
    res(ctx.status(200), ctx.json(collectionFormServicesContactsDataMock))
  ),

  /**
   * Test/mock GET Collection Form Services ASECCA
   *
   * @since 0.0.14
   */
  rest.get<
    CollectionFormServiceGetRequestBody,
    CollectionFormServiceGetRequestParams,
    CollectionFormServiceGetResponseBody
  >(
    `${process.env.STAGING_DB_REST_API_URL}/collection/service/api/contacts`,
    async (req, res, ctx) =>
      /** return mock contacts data */
      res(ctx.status(200), ctx.json(collectionFormServicesContactsDataMock))
  ),
];

const mockHandlers = {
  collectionFormServicesMockHandlers,
};
export default mockHandlers;
