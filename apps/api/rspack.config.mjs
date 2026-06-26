// @ts-check
import path from "node:path";

import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const emailPackageEntry = path.resolve(
  import.meta.dirname,
  "../../packages/email/src/index.ts"
);

/** @type {import('@rspack/core').Configuration['externals']} */
const externals =
  /** @type {import('@rspack/core').Configuration['externals']} */ ([
    nodeExternals({
      allowlist: [/@rspack\/core\/hot\/poll/u, /@dtracker\/email/u],
    }),
  ]);

export default defineConfig({
  context: import.meta.dirname,
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  entry: {
    main:
      process.env.NODE_ENV === "production"
        ? "./src/main.ts"
        : ["@rspack/core/hot/poll?100", "./src/main.ts"],
  },
  externals,
  module: {
    rules: [
      {
        test: /\.tsx?$/u,
        use: {
          loader: "builtin:swc-loader",
          options: {
            detectSyntax: "auto",
            jsc: {
              parser: {
                decorators: true,
                syntax: "typescript",
                tsx: true,
              },
              transform: {
                decoratorMetadata: true,
                legacyDecorator: true,
                react: { runtime: "automatic" },
              },
            },
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: {
            keep_classnames: true,
            keep_fnames: true,
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
      }),
    ],
  },
  output: {
    clean: true,
  },
  plugins: [
    process.env.NODE_ENV !== "production" &&
      new RunScriptWebpackPlugin({
        autoRestart: false,
        name: "main.js",
      }),
  ],
  resolve: {
    alias: {
      "@dtracker/email": emailPackageEntry,
    },
    extensions: ["...", ".ts", ".tsx", ".jsx"],
    tsConfig: {
      configFile: path.resolve(import.meta.dirname, "./tsconfig.json"),
    },
  },
  target: "node",
});
