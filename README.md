# 专题欢迎你 · ZJU CMC 主播部专题组

深夜电台风格的新生欢迎页（React + Vite + Tailwind CSS）。

## 本地预览

```bash
npm install
npm run build
```

构建产物为单个 `dist/index.html`（JS/CSS/背景图已内联）。

## 部署到 GitHub Pages（自动）

仓库已包含 `.github/workflows/deploy.yml`，推送到 `main` 分支后会自动构建并发布，
无需手动打包。只需做一次设置：

1. 打开仓库的 **Settings → Pages**；
2. **Build and deployment → Source** 选择 **GitHub Actions**；
3. 等待顶部 **Actions** 跑出绿勾，访问 `https://<用户名>.github.io/<仓库名>/`。

> 音频与文档放在仓库根目录的 `assets/` 下（`assets/audio/`、`assets/docs/`），
> 构建时会自动复制到发布目录，不要删除或改名。
