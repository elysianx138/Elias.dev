# Elias's Blog 🚀

基于 GitHub Pages 和 Jekyll 的个人博客。

## 🚀 部署到 GitHub Pages

### 准备工作

1. **创建一个 GitHub 仓库**
   - 如果博客地址是 `https://<你的用户名>.github.io` → 仓库名必须是 `<你的用户名>.github.io`
   - 如果是项目站点 → 仓库名随意，地址会是 `https://<你的用户名>.github.io/<仓库名>`

2. **配置 `_config.yml`**
   - 修改 `url` 为你的 GitHub Pages 地址
   - 如果你用的是项目站点（不是 username.github.io），修改 `baseurl` 为 `/<仓库名>`
   - 修改 `author`、`email`、`github_username` 为你自己的信息

### 一键部署

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "🎉 初始化博客"

# 4. 关联远程仓库
git remote add origin https://github.com/<你的用户名>/<你的仓库名>.git

# 5. 推送到 GitHub
git push -u origin main
```

### 开启 GitHub Pages

1. 在浏览器打开你的 GitHub 仓库
2. 进入 **Settings** → **Pages**
3. 在 "Source" 中选择 **Deploy from a branch**
4. 选择 `main` 分支，目录选 `/ (root)`
5. 点击 **Save**

等待 1-2 分钟，你的博客就会出现在 `https://<你的用户名>.github.io` 上！

## 🖥️ 本地预览

如果你有 Ruby 环境，可以在本地预览：

```bash
# 安装依赖
bundle install

# 启动本地服务器 (访问 http://localhost:4000)
bundle exec jekyll serve
```

## 📝 写博客

在 `_posts/` 目录下创建 `.md` 文件，文件名格式必须为：

```
YYYY-MM-DD-文章标题.md
```

文件头部格式 (Front Matter)：

```yaml
---
title: "文章标题"
date: 2026-07-29 10:00:00 +0800
categories: [分类1, 分类2]
tags: [标签1, 标签2]
author: Elias
---
```

## 📁 目录结构

```
.
├── _config.yml          # 博客配置
├── _includes/           # 可复用的 HTML 片段
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── toc.html
├── _layouts/            # 页面布局模板
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _posts/              # 博客文章 (Markdown)
├── assets/
│   ├── css/style.css    # 主样式
│   └── images/          # 图片资源
├── about.md             # 关于页面
├── archive.md           # 归档页面
├── categories.md        # 分类页面
├── index.html           # 首页
├── 404.html             # 404 页面
└── Gemfile              # Ruby 依赖
```

## 🎨 自定义

- **样式**: 修改 `assets/css/style.css`
- **导航栏**: 修改 `_includes/header.html`
- **页脚**: 修改 `_includes/footer.html`
- **主题色**: CSS 中以 `#3498db` 为主色调，全局搜索替换即可

## 📄 许可

MIT
