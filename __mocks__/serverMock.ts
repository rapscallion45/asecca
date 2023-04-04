import { setupServer } from 'msw/node';
import { serverMockHandlers } from './serverMockHandlers';

/*
 ** configuration of the mock server for running tests
 */
const server = setupServer(...serverMockHandlers);
export default server;
