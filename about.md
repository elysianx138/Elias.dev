---
layout: page
title: About
permalink: /about/
---

<div class="term">

  <div class="term__bar">
    <span class="term__dot term__dot--r"></span>
    <span class="term__dot term__dot--y"></span>
    <span class="term__dot term__dot--g"></span>
  </div>

## Hello, I'm Elias Song

I'm a developer working with **C++** and **Python**, and I'm a firm believer in
open source — not just as a license model, but as a way of thinking. I write
code, I break it, I learn from it, and then I write down what I learned so it
doesn't vanish the moment I move on to the next problem.

This site is my own corner of the internet: a place to share projects, publish
blog posts, and keep a public record of my growth as a developer.

## What I work with

- **C++** — performance-sensitive code and anything that needs to be fast
- **Python** — scripting, automation, tooling, and prototyping
- **Open source** — contributing, collaborating, and shipping things in public

## Where to find me

{% for social in site.data.social %}
- **{{ social.name }}** — [{{ social.handle }}]({{ social.url }})
{% endfor %}

Want to get in touch? Reach me at **[{{ site.email }}](mailto:{{ site.email }})**.

</div>