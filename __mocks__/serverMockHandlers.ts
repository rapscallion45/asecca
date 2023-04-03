/*
 ** mock server API handlers shared between all tests
 */
import { rest } from 'msw';
import costsConfigDataMock from './costsConfigDataMock';
import {
  ICostsConfigDataPayload,
  IProxyErrorPayload,
} from '@/lib/api/api-types';

/*
 ** GET /costs_config definitions
 */
/* shape of the "req.body"  */
type CostsConfigGetRequestBody = null;

/* shape of the "req.params" */
type CostsConfigGetRequestParams = {};

/* shape of the mocked response body */
type CostsConfigGetResponseBody = ICostsConfigDataPayload;

/*
 ** POST /costs_config definiitons
 */
/* shape of the "req.body" */
type CostsConfigPostRequestBody = null;

/* shape of the "req.params" */
type CostsConfigPostRequestParams = {};

/* shape of the mocked response body */
type CostsConfigPostResponseBody = IProxyErrorPayload | null;

const serverMockHandlers = [
  /* Test/mock GET Costs Config */
  rest.get<
    CostsConfigGetRequestBody,
    CostsConfigGetRequestParams,
    CostsConfigGetResponseBody
  >('/api/costs_config', async (req, res, ctx) =>
    /* return mock costs config data */
    res(ctx.status(200), ctx.json({ costs: costsConfigDataMock.costs }))
  ),
  /* Test/mock POST Costs Config */
  rest.post<
    CostsConfigPostRequestBody,
    CostsConfigPostRequestParams,
    CostsConfigPostResponseBody
  >('/api/costs_config', async (req, res, ctx) =>
    /* return mock costs config data */
    res(ctx.status(200), ctx.json({ message: 'Ok' }))
  ),
];

/* eslint-disable import/prefer-default-export */
export { serverMockHandlers };
