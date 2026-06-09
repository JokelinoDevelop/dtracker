import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import nestjs from "ultracite/oxlint/nestjs";
import react from "ultracite/oxlint/react";
import tanstack from "ultracite/oxlint/tanstack";
import vitest from "ultracite/oxlint/vitest";

export default defineConfig({
  extends: [core, vitest, react, tanstack, nestjs],
  ignorePatterns: [
    "apps/web/src/components/**/*",
    "apps/web/src/routeTree.gen.ts",
  ],
  jsPlugins: [
    {
      name: "@tanstack/router",
      specifier: "@tanstack/eslint-plugin-router",
    },
  ],
  overrides: [
    {
      // TanStack Router: property order in createFileRoute/createRoute affects TS inference;
      // eslint(sort-keys) would alphabetize and break ctx.deps / search types.
      files: ["apps/web/src/routes/**/*.{ts,tsx}"],
      rules: {
        // @tanstack/eslint-plugin-router — align with `flat/recommended` (web file routes).
        // @see https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
        "@tanstack/router/create-route-property-order": "error",
        "@tanstack/router/route-param-names": "error",
        "sort-keys": "off",
      },
    },
    {
      // DB table definitions should keep primary key columns (`id`) first for readability
      // and parity with migration/DDL conventions; do not auto-alphabetize keys here.
      files: ["packages/shared/src/drizzle/tables/**/*.{ts,tsx}"],
      rules: {
        "sort-keys": "off",
      },
    },
    {
      files: ["**/*.errors.ts"],
      rules: {
        "max-classes-per-file": "off",
      },
    },
  ],
  rules: {
    "func-style": [
      "error",
      "declaration",
      {
        allowArrowFunctions: true,
      },
    ],
    "no-inline-comments": "off",
    "no-use-before-define": [
      "error",
      {
        classes: true,
        functions: false,
        variables: true,
      },
    ],
    "typescript/consistent-type-definitions": ["error", "type"],
  },
});
