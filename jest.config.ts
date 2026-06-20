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
  // Trava de regressão (QA-05): limites um pouco abaixo da cobertura atual.
  // Subir gradualmente conforme adicionamos testes (QA-06).
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 70,
      functions: 65,
      lines: 65,
    },
  },
};

export default createJestConfig(config);
