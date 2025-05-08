import { defineConfig } from 'vite'
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { TanStackStartVitePlugin } from '@tanstack/react-start/plugin'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    TanStackStartVitePlugin(),
  ],
});
