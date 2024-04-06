import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@xph-form": path.resolve(__dirname, "../src/packages/react-form/src"),
    },
  },
});
