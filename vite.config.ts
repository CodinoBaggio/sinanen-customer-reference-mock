import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/sinanen-customer-reference-mock/",
  build: {
    rollupOptions: {
      input: "app.html",
    },
  },
  plugins: [react()],
});
