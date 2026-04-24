import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import { generateManifest } from "./scripts/generate-manifest";

// Generate the downloads manifest before/while Vite serves or builds.
function manifestPlugin() {
  return {
    name: "graf-manifest",
    buildStart() {
      generateManifest();
    },
    configureServer(server: any) {
      generateManifest();
      server.watcher.add(path.resolve("public/overlay"));
      server.watcher.add(path.resolve("public/ramki"));
      server.watcher.add(path.resolve("public/pozostale"));
      server.watcher.on("all", (_evt: string, file: string) => {
        if (/[\\/](overlay|ramki|pozostale)[\\/]/.test(file)) {
          generateManifest();
        }
      });
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [
    manifestPlugin(),
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
