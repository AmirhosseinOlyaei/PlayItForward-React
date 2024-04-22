import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/styled-engine",
    ],
  },
  plugins: [react()],
});
