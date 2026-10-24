# 陈泉宇的学术主页

基于 [PRISM](https://github.com/xyjoey/PRISM) 的中英双语学术主页，发布于 https://yeeus.github.io/ 。保留 PRISM 的界面、主题切换和论文搜索功能。

## 更新内容

- `content/`：英文资料。
- `content_zh/`：中文资料。
- `config.toml`：姓名、社交链接、导航和语言设置。
- `bio.md`、`research.md`：个人介绍与研究方向。
- `publications.bib`：论文；两种语言各维护一份，保持 DOI 和论文清单一致。
- `cv.md`：网页简历；`public/cv/Quanyu_Chen_CV.pdf`：下载版英文简历。

在审论文不填写投稿期刊和审稿状态。当前清单包含 9 项成果；无公开预印本的稿件不展示。Nature 已接收论文保留接收标识，并链接至公开预印本。

## 本地运行

使用 Node.js 22 或更新版本：

```sh
npm ci
npm run dev
```

执行 `npm run build` 生成 `out/` 静态网站。推送到 `main` 后，GitHub Actions 自动构建并发布至 GitHub Pages。

## 添加照片

将照片保存为 `public/portrait.jpg`，并把 `content/config.toml` 的 `author.avatar` 改成 `/portrait.jpg`。中文配置会自动继承；当前未设置照片，页面不会显示占位图。

## 模板与许可

原模板作者：Jiale Liu（xyjoey）。模板使用 MIT 许可，见 LICENSE。研究内容和个人资料属于其各自权利人。
