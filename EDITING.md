# 修改内容去哪里改

不用懂代码，找到对应文件、改文字、保存、上传到 GitHub 就行。
GitHub Actions 会自动重新打包发布，等 1~3 分钟刷新即可。

## 快速对照表

| 我想改… | 去这个文件 | 说明 |
|---|---|---|
| 学长姐的名字 / 语音 / 照片 | `src/data/members.ts` | 最常改，一人一条记录 |
| 欢迎信正文（"亲爱的各位专题的小朋友…"） | `src/components/WelcomeLetter.tsx` | 整封信都在这里 |
| 首页大标题 "welcome to zjucmc" | `src/components/Hero.tsx` | 搜 `welcome to` |
| 首页那句 "我们是声音的创作者…" | `src/components/Hero.tsx` | 搜 `我们是声音的创作者` |
| 新手指南的四张卡片（AU 下载 / PDF / 游戏） | `src/components/Guide.tsx` | 链接和说明都在 `resources` 数组里 |
| 「有什么好玩的、好吃的」那段 + 默认选题标签 | `src/components/Board.tsx` | 标签在 `seedIdeas` 数组 |
| 页脚文字 / 链接 | `src/components/Footer.tsx` | |
| 导航栏菜单项 | `src/components/Nav.tsx` | `links` 数组 |
| 跑马灯上滚动的词 | `src/components/Ticker.tsx` | `items` 数组 |
| 网站标题（浏览器标签页文字） | `index.html` | `<title>` 标签 |
| **小狐狸说的所有话**（问候 / 提示 / 笑话 / 哲理） | `src/data/petTalk.ts` | ⭐ 全部集中在这一个文件，加句子直接照格式加 |
| **换成你们自己的 QQ 宠物图** | 不用改代码 | 把原图（**白底的就行，不用抠图**）命名为 `pet.png` 或 `pet.jpg`，传到仓库的 `assets/images/` 目录即可 |
| 颜色 / 字体 / 动画 | `src/index.css` | 顶部 `@theme` 里定义 |

> **小狐狸互动**：单击=说句话；长按 0.5 秒=摸摸头（冒爱心）；
> 按住拖动=挪到屏幕任意位置；点她左边的 😄=每日笑话，✨=每日哲理（再点换一条）。

## 加 / 删一位学长姐

打开 `src/data/members.ts`，一人就是一段这样的代码：

```ts
{ name: "杜禹乐", glyph: "乐", latin: "DU YULE",
  audio: "assets/audio/duyule.m4a",
  image: "assets/images/duyule.jpg",
  from: "#7C9CFF", to: "#4A5BE8" },
```

- **加人**：复制一段，改掉里面的内容，注意上一行末尾要有逗号；
- **删人**：整段删掉即可；
- **换照片**：把新照片放进仓库 `assets/images/`，然后把 `image` 的文件名改成它；
- **照片暂时没有**：把 `image` 改成 `""`，会自动显示彩色圆圈 + 名字中的一个字。

## 上传修改到 GitHub（不用命令行）

1. 打开你的仓库 `fib1/CMC`；
2. 进入要改的文件所在文件夹，点开文件 → 点右上角**铅笔**图标；
3. 改完点 **Commit changes**（两次确认）；
4. 等顶部 **Actions** 变成绿色对勾，刷新网站即可。

> 上传新照片/音频/PDF 这类文件：进入 `assets` 对应文件夹，
> 点 **Add file → Upload files**，拖进去，Commit changes。
