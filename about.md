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

I'm a CS student who loves **open source**, **backend**, and **AI**. Right now
I'm digging deep into **C++** and **Linux**, and I keep a public log of
everything I pick up along the way.

### What I'm working on

- **Linux & C++ learning log** — from the WSL basics up to system-level
  programming: [`Linux-system-lab`](https://github.com/elysianx138/Linux-system-lab.git)
- **AI / LLM experiments** — LangChain agents, RAG, and Claude-powered tools
- **A C++ project** — building it bit by bit to sharpen my skills

### What I like

- **Open source** — reading others' code, contributing, building in public
- **Backend & AI** — turning ideas into running services and models
- **Blogging** — writing down what I learn so it sticks (and helps the next person)
- **Gaming** — the pressure off, or the fuel for new ideas

### Where to find me

{% for social in site.data.social %}
- **{{ social.name }}** — [{{ social.handle }}]({{ social.url }})
{% endfor %}

Want to get in touch? Reach me at **[{{ site.email }}](mailto:{{ site.email }})**.

</div>