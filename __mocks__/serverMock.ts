import { setupServer } from 'msw/node';
import { mockHandlers } from './serverMockHandlers';

/**
 * configuration of the mock server for running tests
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const server = setupServer(...mockHandlers);
export default server;
