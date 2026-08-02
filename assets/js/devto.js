/**
 * Elias Song — dev.to feed sync (card grid)
 * Fetches latest articles from DEV Community's public API and renders them as
 * cards in #devto-feed. Stays in sync automatically, no build-time plugin.
 */
(function () {
  'use strict';

  var CONFIG = {
    api: 'https://dev.to/api/articles?username=',
    username: 'elysianx138',
    max: 6
  };

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return iso;
    }
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function render(posts) {
    var grid = document.getElementById('devto-feed');
    if (!grid) return;
    grid.innerHTML = '';

    if (!posts || !posts.length) {
      var empty = el('p', 'empty-note');
      empty.innerHTML =
        'No posts released yet — the feed <em>lights up</em> once ' +
        '<a href="https://dev.to/' + CONFIG.username + '" target="_blank" rel="noopener">dev.to/' + CONFIG.username + '</a> gets its first article.';
      grid.appendChild(empty);
      return;
    }

    var frag = document.createDocumentFragment();
    posts.forEach(function (post) {
      var card = el('a', 'card reveal-item');
      card.href = post.url;
      card.target = '_blank';
      card.rel = 'noopener';

      var meta = el('div', 'card__meta mono');
      meta.appendChild(el('time', null, fmtDate(post.published_at)));
      meta.appendChild(el('span', null, '·'));
      meta.appendChild(el('span', null, (post.reading_time_minutes || 0) + ' min'));

      var title = el('h3', 'card__title', post.title);
      var desc = el('p', 'card__desc', (post.description || '').slice(0, 120) + (post.description && post.description.length > 120 ? '…' : ''));

      var more = el('span', 'card__more mono', 'Read on dev.to →');
      card.appendChild(meta);
      card.appendChild(title);
      if (desc.textContent) card.appendChild(desc);
      card.appendChild(more);
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  function onError() {
    var grid = document.getElementById('devto-feed');
    if (!grid) return;
    grid.innerHTML = '';
    var note = el('p', 'empty-note');
    note.innerHTML =
      '<a href="https://dev.to/' + CONFIG.username + '" target="_blank" rel="noopener">Couldn\u2019t reach the dev.to feed — see latest posts on dev.to</a>.';
    grid.appendChild(note);
  }

  function load() {
    var grid = document.getElementById('devto-feed');
    if (!grid) return;
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