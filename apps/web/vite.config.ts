import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackRouter({ autoCodeSplitting: true, target: "react" }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
  server: {
    port: 5173,
  },
});

export default config;
