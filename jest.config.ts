import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Trava de regressão (QA-05/QA-06): limites um pouco abaixo da cobertura
  // atual. Subir gradualmente conforme adicionamos testes.
  coverageThreshold: {
    global: {
      statements: 72,
      branches: 75,
      functions: 68,
      lines: 72,
    },
  },
};

export default createJestConfig(config);
