import { defineConfig } from "vite";

export default defineConfig({
  build: {
    assetsInlineLimit: 100000000000000,
  },
});
