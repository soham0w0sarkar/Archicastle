import { copyFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/")
          ) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router";
          }
        },
      },
    },
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    {
      name: "gh-pages-spa-fallback",
      closeBundle() {
        const outDir = join(rootDir, "dist");
        copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
      },
    },
  ],
});
