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
      files: ["apps/mobile/src/**/*.{ts,tsx}"],
      rules: {
        "no-use-before-define": "off",
        "react/no-unstable-nested-components": "off",
      },
    },
    {
      files: ["apps/api/src/core/database/schemas/**/*.{ts,tsx}"],
      rules: { "sort-keys": "off" },
    },
    {
      files: ["apps/api/**/*.{ts,tsx}"],
      rules: {
        "class-methods-use-this": "off",
        "typescript/consistent-type-imports": "off",
        "typescript/no-extraneous-class": [
          "error",
          {
            allowWithDecorator: true,
          },
        ],
        "typescript/parameter-properties": [
          "error",
          {
            prefer: "parameter-property",
          },
        ],
      },
    },
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
    "react/no-children-prop": "off",
    "typescript/consistent-type-definitions": ["error", "type"],
    "unicorn/import-style": ["error"],
  },
});
