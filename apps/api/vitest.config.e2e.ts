import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@src": "./src",
      "@test": "./test",
    },
  },
  test: {
    alias: {
      "@src": "./src",
      "@test": "./test",
    },
    globals: true,
    include: ["**/*.e2e-test.ts"],
    root: "./",
  },
});
