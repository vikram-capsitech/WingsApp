import { defineConfig } from 'vite'
import dns from "dns";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/vite-deploy/",
  server: {
    host: "localhost",
    port: 3000,
  },
});
