source "https://rubygems.org"

# GitHub Pages 官方支持
gem "github-pages", group: :jekyll_plugins

# 本地开发时使用
gem "jekyll", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Windows 和 JRuby 不需要时区警告
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Windows 文件系统监控
gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]

# Ruby 3.0+ 需要
gem "webrick", "~> 1.7"
