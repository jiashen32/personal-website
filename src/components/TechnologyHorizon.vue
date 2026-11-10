<script setup lang="ts">
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
import type { SkillGroup } from '@/data/profile'

defineProps<{ groups: SkillGroup[] }>()

const base = import.meta.env.BASE_URL
const logos = [
  { name: 'Claude', src: `${base}tech-logos/claude.png` },
  { name: 'DeepSeek', src: `${base}tech-logos/deepseek.png` },
  { name: 'Java', src: `${base}tech-logos/java.png`, wide: true },
  { name: 'PHP', src: `${base}tech-logos/php.png`, wide: true },
  { name: 'Python', src: `${base}tech-logos/python.png` },
  { name: 'Redis', src: `${base}tech-logos/redis.png` },
  { name: 'Vue', src: `${base}tech-logos/vue.png` },
]
</script>

<template>
  <div class="technology-block">
    <div class="logo-marquee" aria-label="使用过的技术与模型" tabindex="0">
      <div class="marquee-track">
        <ul class="logo-list">
          <li v-for="logo in logos" :key="logo.name" class="logo-item">
            <img
              :src="logo.src"
              :alt="logo.name"
              :class="{ 'is-wide': logo.wide }"
              width="72"
              height="52"
              loading="lazy"
              decoding="async"
            />
            <span>{{ logo.name }}</span>
          </li>
        </ul>
        <ul class="logo-list" aria-hidden="true">
          <li v-for="logo in logos" :key="`copy-${logo.name}`" class="logo-item">
            <img :src="logo.src" alt="" :class="{ 'is-wide': logo.wide }" width="72" height="52" loading="lazy" />
            <span>{{ logo.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="skill-groups">
      <SkillGroupPanel v-for="group in groups" :key="group.label" :group="group" data-reveal />
    </div>
  </div>
</template>

<style scoped>
.technology-block {
  margin-top: 3rem;
}

.logo-marquee {
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  background:
    linear-gradient(110deg, rgb(255 255 255 / 58%), transparent 52%),
    #dce8e4;
  box-shadow: inset 0 0 0 1px rgb(18 63 59 / 10%);
  mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  padding: 0.9rem 0;
  animation: logo-marquee 30s linear infinite;
  will-change: transform;
}

.logo-list {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;
}

.logo-item {
  display: grid;
  width: 138px;
  height: 78px;
  flex-shrink: 0;
  grid-template-columns: 58px 1fr;
  align-items: center;
  gap: 0.7rem;
  border-radius: 1rem;
  background: rgb(250 250 246 / 78%);
  padding: 0.8rem;
  box-shadow: 0 7px 22px rgb(18 45 42 / 6%);
}

.logo-item img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.logo-item img.is-wide {
  width: 58px;
  height: 42px;
}

.logo-item span {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.35;
  letter-spacing: 0.04em;
  color: var(--color-ink-soft);
}

.skill-groups {
  display: grid;
  gap: 2.5rem 2rem;
  margin-top: 3.5rem;
}

.logo-marquee:hover .marquee-track,
.logo-marquee:focus-visible .marquee-track,
.logo-marquee:focus-within .marquee-track {
  animation-play-state: paused;
}

@media (min-width: 640px) {
  .skill-groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .skill-groups {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .skill-groups > :nth-child(even) {
    margin-top: 2.75rem;
  }
}

@media (max-width: 639px) {
  .logo-item {
    width: 120px;
    height: 70px;
    grid-template-columns: 44px 1fr;
    gap: 0.55rem;
  }

  .logo-item img,
  .logo-item img.is-wide {
    width: 40px;
    height: 40px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-marquee {
    overflow-x: auto;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .marquee-track {
    animation: none;
    will-change: auto;
  }

  .logo-list[aria-hidden='true'] {
    display: none;
  }
}

@keyframes logo-marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
