<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { profile } from '@/data/profile'

const route = useRoute()
const onAbout = computed(() => route.path === '/about')
</script>

<template>
  <div class="min-h-screen bg-paper text-ink">
    <a class="skip-link" href="#main">跳到主要内容</a>

    <header class="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-[1180px] items-center justify-between gap-6 px-6 md:px-10">
        <RouterLink to="/" class="group flex items-center gap-3" :aria-label="`${profile.name}的个人主页`">
          <span
            class="grid h-9 w-9 place-items-center border border-ink/25 font-mono text-[11px] tracking-[0.14em] text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
          >
            {{ profile.initials }}
          </span>
          <span class="leading-tight">
            <span class="block text-sm font-semibold tracking-tight">{{ profile.name }}</span>
            <span
              class="mt-0.5 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute sm:block"
            >
              {{ profile.handle }} · Backend &amp; AI
            </span>
          </span>
        </RouterLink>

        <nav class="hidden items-center gap-8 md:flex" aria-label="主导航">
          <RouterLink to="/#work" class="nav-link">项目</RouterLink>
          <RouterLink to="/#approach" class="nav-link">做法</RouterLink>
          <RouterLink to="/#skills" class="nav-link">技术栈</RouterLink>
          <RouterLink to="/about" class="nav-link" :class="{ 'nav-link-active': onAbout }">
            关于
          </RouterLink>
          <a
            :href="`mailto:${profile.email}`"
            class="border border-ink/20 px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            联系我
          </a>
        </nav>

        <nav class="flex items-center gap-4 md:hidden" aria-label="移动端导航">
          <RouterLink to="/#work" class="text-sm text-ink-soft">项目</RouterLink>
          <RouterLink to="/about" class="text-sm text-ink-soft">关于</RouterLink>
          <a
            :href="`mailto:${profile.email}`"
            class="border border-ink/20 px-3 py-1.5 text-sm text-ink"
          >
            联系
          </a>
        </nav>
      </div>
    </header>

    <RouterView />

    <footer class="border-t border-line">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-2 px-6 py-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute md:flex-row md:items-center md:justify-between md:px-10"
      >
        <p>© {{ new Date().getFullYear() }} {{ profile.name }} / {{ profile.handle }}</p>
        <p>Vue 3 · Vite · Tailwind CSS · Updated {{ profile.updated }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.nav-link {
  position: relative;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 1px;
  background-color: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.nav-link:hover {
  color: var(--color-ink);
}

.nav-link:hover::after,
.nav-link-active::after {
  transform: scaleX(1);
}

.nav-link-active {
  color: var(--color-ink);
}
</style>
