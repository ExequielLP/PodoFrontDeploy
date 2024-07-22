import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Proyecto-PodoGonnet/",
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
