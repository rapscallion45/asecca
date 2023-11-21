import React from 'react';
import next from 'next';
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom/extend-expect';
import server from './__mocks__/serverMock';

/**
 * Configuration file for Jest & React Testing Library Unit Test environment
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/** ensure "TextEncoder" is defined in the test environment */
Object.assign(global, { TextDecoder, TextEncoder });

/** instatiate NexJS before running tests - this loads next.config.js */
next({ dev: true });

/** polyfill "window.fetch" used in the React component. */
import 'whatwg-fetch';

/** extend Jest "expect" functionality with Testing Library assertions. */
import '@testing-library/jest-dom';

/** get rid of useLayoutEffect warning when running tests */
React.useLayoutEffect = React.useEffect;

/** setup mock of next router */
jest.mock('next/router', () => require('next-router-mock'));

/** start test msw server */
beforeAll(() => {
  server.listen({
    /** every API should be mocked, error if an API is unhandled */
    onUnhandledRequest: 'error',
  });
});

/**
 * reset handlers after each test just in case we need to
 * reconfigure a handler for a specific test
 */
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
