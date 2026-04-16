import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.ico"],

      manifest: {
        name: "AI Study Planner",
        short_name: "StudyApp",
        description: "AI-powered study app with Focus Mode and PDF learning",
        theme_color: "#340b7a",
        background_color: "#0d0f9b",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,

        globPatterns: ["**/*.{js,css,html,ico,png,pdf}"],

        cleanupOutdatedCaches: true,

        clientsClaim: true,
        skipWaiting: true,

        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "document",
            handler: "NetworkFirst",
          },
          {
            urlPattern: ({ request }) =>
              ["script", "style", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: ({ request }) =>
              request.destination === "image",
            handler: "CacheFirst",
          },
        ],
      },
    }),
  ],
});