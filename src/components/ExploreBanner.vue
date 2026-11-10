<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const banner = ref<HTMLElement | null>(null)

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0
let frame = 0
let active = false

const paint = () => {
  const el = banner.value
  if (!el) return
  el.style.setProperty('--mx', `${currentX}px`)
  el.style.setProperty('--my', `${currentY}px`)
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 用 rAF 做缓动跟随，圆斑不会一步一跳
const follow = () => {
  frame = 0
  const dx = targetX - currentX
  const dy = targetY - currentY

  if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
    currentX = targetX
    currentY = targetY
    paint()
    return
  }

  currentX += dx * 0.2
  currentY += dy * 0.2
  paint()
  frame = requestAnimationFrame(follow)
}

const handleMove = (event: PointerEvent) => {
  const el = banner.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  targetX = event.clientX - rect.left
  targetY = event.clientY - rect.top

  if (!active) {
    active = true
    currentX = targetX
    currentY = targetY
    paint()
    el.classList.add('is-active')
  }

  if (prefersReducedMotion()) {
    currentX = targetX
    currentY = targetY
    paint()
    return
  }

  if (!frame) frame = requestAnimationFrame(follow)
}

const handleLeave = () => {
  active = false
  banner.value?.classList.remove('is-active')
}

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <section
    ref="banner"
    class="explore-banner"
    aria-label="探索未至之境"
    @pointermove="handleMove"
    @pointerleave="handleLeave"
    @pointercancel="handleLeave"
  >
    <div class="explore-inner">
      <p class="explore-title">探索未至之境</p>
    </div>

    <!-- 金色高亮层：只显形在文字笔画内 -->
    <div class="explore-overlay" aria-hidden="true">
      <div class="explore-inner">
        <p class="explore-title">探索未至之境</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.explore-banner {
  --mx: 50%;
  --my: 50%;
  --spot: clamp(40px, 4.4vw, 64px);
  position: relative;
}

.explore-inner {
  margin: 0 auto;
  max-width: 1180px;
  padding: 3rem 1.5rem 3.5rem;
  text-align: center;
}

.explore-title {
  font-size: clamp(2.25rem, 6.4vw, 5rem);
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  color: var(--color-ink);
}

/* 高亮层本身有黑色背景，遮罩只裁切文字区域 */
.explore-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background-color: #000;
  -webkit-mask-image: radial-gradient(
    circle var(--spot) at var(--mx) var(--my),
    #000 0%,
    #000 88%,
    transparent 100%
  );
  mask-image: radial-gradient(
    circle var(--spot) at var(--mx) var(--my),
    #000 0%,
    #000 88%,
    transparent 100%
  );
  transition: opacity 0.3s ease;
}

.explore-banner.is-active .explore-overlay {
  opacity: 1;
}

.explore-overlay .explore-title {
  color: var(--color-signal);
}

@media (min-width: 768px) {
  .explore-inner {
    padding: 3.6rem 2.5rem 4.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .explore-overlay {
    transition: none;
  }
}
</style>
