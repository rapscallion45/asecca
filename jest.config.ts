import nextJest from 'next/jest.js';

/**
 * Configuration properties of the Jest Unit Test environment
 *
 * For a detailed explanation regarding each configuration property
 * and type check, visit:
 * @see See [Jest configuration docs](https://jestjs.io/docs/configuration)
 *
 * Configuration based on example given in the official Next.JS docs:
 * @see See [Next.js example Jest config](https://nextjs.org/docs/testing)
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */

const createJestConfig = nextJest({
  /**
   * path to the Next.js app to load next.config.js and .env files into the
   * test environment
   *
   * @since - 0.0.0
   */
  dir: './',
});

const jestConfig = {
  /**
   * list of paths to modules that run some code to configure or
   * set up the testing framework before each test
   *
   * @since - 0.0.0
   */
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__mocks__/browserMocks.ts',
    '@testing-library/jest-dom/extend-expect',
  ],

  /**
   * configure test coverage report
   *
   * @since - 0.0.0
   */
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
    '<rootDir>/.eslintrc.json',
    '<rootDir>/jest.config.ts',
    '<rootDir>/jest.setup.ts',
    '<rootDir>/next.config.js',
  ],

  /**
   * the test environment that will be used for Jest unit testing
   *
   * @since - 0.0.0
   */
  testEnvironment: 'jest-environment-jsdom',
};

/**
 * createJestConfig is exported this way to ensure that next/jest can load
 * the Next.js config which is async
 */
export default createJestConfig(jestConfig);
