import nextJest from 'next/jest.js';

/*
 ** Configuration properties of the Jest Unit Test environment
 **
 ** For a detailed explanation regarding each configuration property
 ** and type check, visit:
 ** https://jestjs.io/docs/configuration
 **
 ** Configuration based on example given in the official Next.JS docs:
 ** https://nextjs.org/docs/testing
 */

const createJestConfig = nextJest({
  /*
   ** path to the Next.js app to load next.config.js and .env files into the
   ** test environment
   */
  dir: './',
});

const jestConfig = {
  /*
   ** A list of paths to modules that run some code to configure or
   ** set up the testing framework before each test
   */
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '<rootDir>/__mocks__/browserMocks.ts',
    '@testing-library/jest-dom/extend-expect',
  ],

  /* configure test coverage report */
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

  /* the test environment that will be used for Jest unit testing */
  testEnvironment: 'jest-environment-jsdom',
};

/*
 ** createJestConfig is exported this way to ensure that next/jest can load
 ** the Next.js config which is async
 */
export default createJestConfig(jestConfig);
