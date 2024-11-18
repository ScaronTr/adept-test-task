import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
            "@styles": "/src/app/styles",
        },
    },
    server: {
        port: 3000,
        strictPort: true,
    },
    css: {
        devSourcemap: true,
    },
});
