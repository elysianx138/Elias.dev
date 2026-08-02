/**
 * Elias Song — dev.to feed sync
 * Fetches the latest articles from DEV Community's public API and renders them
 * into #devto-feed. No build-time plugin needed; stays in sync automatically.
 */
(function () {
  'use strict';

  var CONFIG = {
    api: 'https://dev.to/api/articles?username=',
    username: 'elysianx138',
    max: 5
  };

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function render(posts) {
    var target = document.getElementById('devto-feed');
    if (!target) return;

    target.innerHTML = '';

    if (!posts || !posts.length) {
      target.innerHTML =
        '<p class="feed-empty">No posts published yet — the feed will light up once ' +
        '<a href="https://dev.to/' + escapeHtml(CONFIG.username) + '" target="_blank" rel="noopener">' +
        'dev.to(' + escapeHtml(CONFIG.username) + ')</a> gets its first article.</p>';
      return;
    }

    var frag = document.createDocumentFragment();
    posts.forEach(function (post) {
      var el = document.createElement('a');
      el.className = 'post-item';
      el.href = post.url;
      el.target = '_blank';
      el.rel = 'noopener';

      var meta = document.createElement('div');
      meta.className = 'post-item__meta mono';
      meta.innerHTML =
        '<span>§</span>' +
        '<span>' + fmtDate(post.published_at) + '</span>' +
        '<span>·</span>' +
        '<span>' + (post.reading_time_minutes || 0) + ' min read</span>';

      var title = document.createElement('h3');
      title.className = 'post-item__title';
      title.textContent = post.title;

      var desc = document.createElement('p');
      desc.className = 'post-item__desc';
      desc.textContent = (post.description || '').slice(0, 160) + (post.description && post.description.length > 160 ? '…' : '');

      var tags = document.createElement('div');
      tags.className = 'post-item__tags';
      (post.tag_list || []).slice(0, 4).forEach(function (tag) {
        var t = document.createElement('span');
        t.className = 'post-tag mono';
        t.textContent = '#' + tag;
        tags.appendChild(t);
      });

      if (post.cover_image) {
        var cover = document.createElement('img');
        cover.className = 'post-item__cover';
        cover.src = post.cover_image;
        cover.alt = '';
        cover.loading = 'lazy';
        el.appendChild(cover);
      }

      el.appendChild(meta);
      el.appendChild(title);
      if (desc.textContent) el.appendChild(desc);
      el.appendChild(tags);
      frag.appendChild(el);
    });

    target.appendChild(frag);
  }

  function onError(err) {
    var target = document.getElementById('devto-feed');
    if (!target) return;
    target.innerHTML =
      '<p class="feed-empty">Couldn\u2019t reach the dev.to feed right now. ' +
      '<a href="https://dev.to/' + escapeHtml(CONFIG.username) + '" target="_blank" rel="noopener">' +
      'See the latest posts on dev.to</a>.</p>';
  }

  function load() {
    var target = document.getElementById('devto-feed');
    if (!target) return;

    fetch(CONFIG.api + CONFIG.username)
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (data) {
        render(Array.isArray(data) ? data.slice(0, CONFIG.max) : []);
      })
      .catch(onError);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();