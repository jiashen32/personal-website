<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main id="main" class="mx-auto flex min-h-[70vh] max-w-[1180px] flex-col justify-center px-6 py-20 md:px-10">
    <p class="mono-label">404 / Not Found</p>
    <h1 class="mt-6 text-[clamp(2rem,5vw,3.4rem)] font-semibold tracking-[-0.03em]">
      这个页面不存在。
    </h1>
    <p class="mt-4 max-w-md text-sm leading-8 text-ink-soft">
      链接可能已经改过，也可能是地址打错了。回到首页可以看到全部项目与联系方式。
    </p>
    <div class="mt-8 flex flex-wrap gap-3">
      <RouterLink to="/" class="btn-solid">
        回到首页
        <span aria-hidden="true">→</span>
      </RouterLink>
      <RouterLink to="/#work" class="btn-ghost">查看项目</RouterLink>
    </div>
  </main>
</template>
