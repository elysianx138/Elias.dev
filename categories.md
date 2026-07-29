---
layout: page
title: Categories
permalink: /categories/
---

{% assign categories = site.categories | sort %}

<ul class="category-list">
{% for category in categories %}
  <li><a href="#{{ category[0] | slugify }}">{{ category[0] }} ({{ category[1].size }})</a></li>
{% endfor %}
</ul>

<hr>

{% for category in categories %}
  <h2 id="{{ category[0] | slugify }}">{{ category[0] }}</h2>
  <ul>
    {% for post in category[1] %}
      <li>
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        &nbsp;
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
