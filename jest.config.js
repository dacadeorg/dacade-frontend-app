/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const esModules = ["remark", "rehype", "unist", "github", "query"].join("|");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFiles: ["./jest.polyfills.js"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^.+\\.(svg)$": require.resolve("./__mocks__/svg.ts"),
    "react-markdown": "<rootDir>/__mocks__/react-markdown.tsx",
    [`^(${esModules})-.*`]: "<rootDir>/__mocks__/plugin.ts",
    unified: "<rootDir>/__mocks__/unified.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
