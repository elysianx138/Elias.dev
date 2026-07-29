# Elias's Blog 🚀

A personal blog built with GitHub Pages and Jekyll.

## 🚀 Deploy to GitHub Pages

### Prerequisites

1. **Create a GitHub repository**
   - For a user site (`https://<username>.github.io`) → the repo must be named `<username>.github.io`
   - For a project site → any name, URL will be `https://<username>.github.io/<repo>`

2. **Configure `_config.yml`**
   - Update `url` to your GitHub Pages URL
   - If using a project site (not username.github.io), set `baseurl` to `/<repo-name>`
   - Update `author`, `email`, and `github_username`

### Quick Deploy

```bash
git init
git add .
git commit -m "🎉 Initialize blog"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

### Enable GitHub Pages

1. Open your GitHub repository in a browser
2. Go to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose `main` branch, directory `/ (root)`
5. Click **Save**

Wait 1-2 minutes, and your blog will be live at `https://<username>.github.io`!

## 🖥️ Local Preview

If you have Ruby installed:

```bash
bundle install
bundle exec jekyll serve
```

Then visit http://localhost:4000

## 📝 Writing Posts

Create `.md` files in `_posts/` with the naming format:

```
YYYY-MM-DD-post-title.md
```

Front Matter:

```yaml
---
title: "Post Title"
date: 2026-07-29 10:00:00 +0800
categories: [Category1, Category2]
tags: [tag1, tag2]
author: elysianx138
---
```

## 📁 Directory Structure

```
.
├── _config.yml          # Site configuration
├── _includes/           # Reusable HTML components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── toc.html
├── _layouts/            # Page layout templates
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _posts/              # Blog posts (Markdown)
├── assets/
│   ├── css/style.css    # Main stylesheet
│   └── images/          # Image assets
├── about.md             # About page
├── archive.md           # Archive page
├── categories.md        # Categories page
├── index.html           # Homepage
├── 404.html             # 404 page
└── Gemfile              # Ruby dependencies
```

## 🎨 Customization

- **Styles**: Edit `assets/css/style.css`
- **Navigation**: Edit `_includes/header.html`
- **Footer**: Edit `_includes/footer.html`
- **Theme color**: Search and replace `#3498db` in the CSS

## 📄 License

MIT
