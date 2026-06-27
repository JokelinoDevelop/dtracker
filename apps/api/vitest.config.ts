import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      // oxlint-disable-next-line unicorn/prefer-module -> NestJS CommonJS stuff
      src: path.resolve(__dirname, "./src"),
    },
    tsconfigPaths: true,
  },
  test: {
    alias: {
      "@src": "./src",
      "@test": "./test",
    },
    globals: true,
    include: ["**/*.test.ts"],
    root: "./",
  },
});
