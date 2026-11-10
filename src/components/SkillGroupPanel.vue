<script setup lang="ts">
import type { SkillGroup } from '@/data/profile'

defineProps<{ group: SkillGroup }>()
</script>

<template>
  <div class="skill-panel">
    <div class="skill-heading">
      <h3>{{ group.label }}</h3>
      <span>{{ group.en }}</span>
    </div>

    <ul class="skill-list">
      <li v-for="item in group.items" :key="item.name">
        <div class="skill-row">
          <span>{{ item.name }}</span>
          <span class="skill-level" role="img" :aria-label="`熟练度 ${item.level} / 5`">
            <span v-for="step in 5" :key="step" :class="{ 'is-active': step <= item.level }"></span>
          </span>
        </div>
        <p v-if="item.usedIn?.length">用于：{{ item.usedIn.join(' · ') }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.skill-panel {
  position: relative;
  padding-top: 1.1rem;
}

.skill-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2.5rem;
  height: 2px;
  border-radius: 99px;
  background: var(--color-accent);
}

.skill-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.skill-heading h3 {
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.skill-heading > span {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-mute);
}

.skill-list {
  display: grid;
  gap: 1.35rem;
  margin-top: 1.6rem;
}

.skill-list li {
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 72%, transparent);
}

.skill-list li:last-child {
  border-bottom: 0;
}

.skill-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.skill-row > span:first-child {
  font-size: 0.875rem;
  color: var(--color-ink-soft);
}

.skill-level {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
}

.skill-level > span {
  width: 0.875rem;
  height: 0.25rem;
  border-radius: 99px;
  background: var(--color-line);
}

.skill-level > span.is-active {
  background: var(--color-accent);
}

.skill-list p {
  margin-top: 0.4rem;
  font-size: 0.625rem;
  line-height: 1.25rem;
  color: var(--color-ink-mute);
}
</style>
