import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
// base: "./" 让打包产物可以部署在任意子路径下（例如 GitHub Pages 的 /<repo>/）。
// 因为 vite-plugin-singlefile 已经把 JS/CSS/图片全部内联进 index.html，
// 这里主要是为了给未来可能新增的外链资源兜底。
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
