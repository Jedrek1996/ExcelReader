/** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
};
