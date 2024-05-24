export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    '^.+.(svg)$': 'jest-svg-transformer',
    "^@/assets(.*)$": "<rootDir>/src/assets",
    "^@/components(.*)$": "<rootDir>/src/components",
    '^@/constants(.*)$': "<rootDir>/src/constants",
    '^@/enums(.*)$': "<rootDir>/src/enums",
    '^@/helpers(.*)$': "<rootDir>/src/helpers",
    '^@/types(.*)$': "<rootDir>/src/types",
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
