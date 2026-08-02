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

I'm a college student studying **Network Engineering**. I like open source,
writing, and games — the same energy I bring to code.

Learning is how I spend most of my free time. Right now I'm digging deep into
**C++**, and I have a small C++ game in the works. Along the way I keep a
public log of everything I pick up, so it never just evaporates.

### What I'm working on

- **C++ learning log** — a running record of my C++ journey:
  [`Linux-system-lab`](https://github.com/elysianx138/Linux-system-lab.git)
- **A C++ game** — small project I'm building for fun and to sharpen my skills

### What I like

- **Open source** — reading others' code, contributing, building in public
- **Blogging** — writing down what I learn so it sticks (and helps the next person)
- **Gaming** — the pressure off, or the fuel for new ideas

### Where to find me

{% for social in site.data.social %}
- **{{ social.name }}** — [{{ social.handle }}]({{ social.url }})
{% endfor %}

Want to get in touch? Reach me at **[{{ site.email }}](mailto:{{ site.email }})**.

</div>