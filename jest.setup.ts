import React from 'react';
import server from './__mocks__/serverMock';
import '@testing-library/jest-dom/extend-expect';

/*
 ** setup file for Jest & React Testing Library Unit Test environment
 */

/* Polyfill "window.fetch" used in the React component. */
import 'whatwg-fetch';

/* Extend Jest "expect" functionality with Testing Library assertions. */
import '@testing-library/jest-dom';

/* Get rid of useLayoutEffect warning when running tests */
React.useLayoutEffect = React.useEffect;

/* Start test msw server */
beforeAll(() => {
  server.listen({
    /* Everything should be mocked, error if an API is unhandled */
    onUnhandledRequest: 'error',
  });
});
/**
 * Reset handlers after each test just in case we need to reconfigure a
 * handler for a specific test
 */
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
