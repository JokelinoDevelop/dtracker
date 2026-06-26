import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true, // cleans dist before each build
  dts: true, // generates .d.ts files
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
});
