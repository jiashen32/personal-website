<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Project } from '@/data/profile'

const props = withDefaults(
  defineProps<{
    project: Project
    presentation?: 'interactive' | 'display'
    view?: 'map' | 'evidence'
  }>(),
  { presentation: 'interactive', view: 'map' },
)

const expanded = ref(false)
const isInteractive = computed(() => props.presentation === 'interactive')
const isExpanded = computed(() => (isInteractive.value ? expanded.value : props.view === 'evidence'))
const diagramTitle = computed(() => `${props.project.title}核心链路`)

const toggleEvidence = () => {
  if (isInteractive.value) expanded.value = !expanded.value
}

const revealEvidence = () => {
  if (isInteractive.value) expanded.value = true
}

const hideEvidence = () => {
  if (isInteractive.value) expanded.value = false
}

watch(
  () => props.project.id,
  () => {
    expanded.value = false
  },
)
</script>

<template>
  <div
    class="project-scanner"
    :class="{ 'is-expanded': isExpanded, 'is-display': !isInteractive }"
    :tabindex="isInteractive ? 0 : undefined"
    :role="isInteractive ? 'button' : undefined"
    :aria-expanded="isInteractive ? isExpanded : undefined"
    :aria-label="isInteractive ? `${diagramTitle}。悬停、聚焦或点击可查看验证证据。` : undefined"
    :aria-hidden="!isInteractive || undefined"
    @click="toggleEvidence"
    @mouseenter="revealEvidence"
    @mouseleave="hideEvidence"
    @focus="revealEvidence"
    @keydown.enter.prevent="toggleEvidence"
    @keydown.space.prevent="toggleEvidence"
    @blur="hideEvidence"
  >
    <!-- 默认状态：系统链路 -->
    <div class="scanner-map" :aria-hidden="isExpanded">
      <div class="scanner-grid" aria-hidden="true"></div>

      <div class="scanner-heading">
        <span>System map / {{ project.id.toUpperCase() }}</span>
        <span>{{ String(project.architecture.length).padStart(2, '0') }} nodes</span>
      </div>

      <div class="scanner-flow" aria-hidden="true">
        <template v-for="(stage, index) in project.architecture" :key="stage.label">
          <div class="scanner-node">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ stage.label }}</strong>
            <small>{{ stage.detail }}</small>
          </div>
          <span v-if="index < project.architecture.length - 1" class="scanner-arrow">↓</span>
        </template>
      </div>

      <div class="scanner-caption">
        <span class="status-dot" aria-hidden="true"></span>
        <span class="hidden sm:inline">悬停查看结果与验证证据</span>
        <span class="sm:hidden">轻触查看验证证据</span>
        <span aria-hidden="true">→</span>
      </div>
    </div>

    <!-- 悬停状态：整张深色验证面板 -->
    <div class="scanner-evidence" :aria-hidden="!isExpanded">
      <div class="evidence-heading">
        <span>Evidence file / {{ project.id.toUpperCase() }}</span>
        <span>Verified</span>
      </div>

      <div class="evidence-body">
        <div class="evidence-result">
          <p class="evidence-label">Measured result</p>
          <p class="evidence-metric">{{ project.metric }}</p>
          <p class="evidence-role">{{ project.role }}</p>
        </div>

        <div class="evidence-list-wrap">
          <p class="evidence-label">Verification points</p>
          <ul class="evidence-list">
            <li v-for="(item, index) in project.evidence" :key="item">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>

        <div class="evidence-decision">
          <p class="evidence-label">Key decision</p>
          <p>{{ project.decision }}</p>
        </div>
      </div>

      <div class="evidence-footer">
        <span class="inline-flex items-center gap-2">
          <span class="status-dot" aria-hidden="true"></span>
          Evidence checked
        </span>
        <span>点击返回系统链路</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-scanner {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  border: 1px solid var(--color-line);
  background-color: var(--color-surface);
  cursor: pointer;
  isolation: isolate;
}

.project-scanner.is-display {
  cursor: default;
}

.project-scanner.is-display .scanner-caption {
  display: none;
}

.scanner-map,
.scanner-evidence {
  position: absolute;
  inset: 0;
}

.scanner-map {
  transition:
    opacity 0.28s ease,
    transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.scanner-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--color-line) 68%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--color-line) 68%, transparent) 1px, transparent 1px);
  background-size: 34px 34px;
}

.scanner-heading,
.scanner-caption,
.evidence-heading,
.evidence-footer {
  position: absolute;
  right: 1.25rem;
  left: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1.4;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.scanner-heading {
  top: 1.25rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-ink-mute);
}

.scanner-caption {
  bottom: 1.25rem;
  justify-content: flex-start;
  padding-top: 0.9rem;
  border-top: 1px solid var(--color-line);
  color: var(--color-accent);
}

.scanner-caption > span:last-child {
  margin-left: auto;
  font-size: 12px;
  transition: transform 0.2s ease;
}

.project-scanner:hover .scanner-caption > span:last-child,
.project-scanner:focus-visible .scanner-caption > span:last-child {
  transform: translateX(4px);
}

.scanner-flow {
  position: absolute;
  inset: 4.75rem 1.5rem 4.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
}

.scanner-node {
  display: grid;
  grid-template-columns: 1.75rem minmax(0, 0.52fr) minmax(0, 1.48fr);
  align-items: center;
  gap: 0.65rem;
  border: 1px solid var(--color-line);
  background-color: color-mix(in srgb, var(--color-paper) 88%, transparent);
  padding: 0.8rem;
}

.scanner-node > span,
.scanner-node > strong {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.scanner-node > span {
  color: var(--color-ink-mute);
}

.scanner-node > strong {
  color: var(--color-accent);
}

.scanner-node > small {
  min-width: 0;
  font-size: 11px;
  line-height: 1.55;
  color: var(--color-ink-soft);
}

.scanner-arrow {
  padding-left: 1rem;
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1;
  color: var(--color-ink-mute);
}

/* 深色状态不是浮层光斑，而是完整的第二张信息面板 */
.scanner-evidence {
  display: flex;
  flex-direction: column;
  background-color: var(--color-night);
  color: var(--color-paper);
  opacity: 0;
  transform: translateY(100%);
  transition:
    opacity 0.28s ease,
    transform 0.46s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.evidence-heading {
  top: 1.25rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
  color: color-mix(in srgb, var(--color-paper) 62%, transparent);
}

.evidence-heading span:last-child {
  color: var(--color-accent-light);
}

.evidence-body {
  display: grid;
  flex: 1;
  align-content: center;
  gap: 1.35rem;
  padding: 4.75rem 1.5rem 4.25rem;
}

.evidence-result {
  padding-bottom: 1.15rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
}

.evidence-label {
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1.4;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-light);
}

.evidence-metric {
  margin-top: 0.65rem;
  font-family: var(--font-mono);
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.03em;
}

.evidence-role {
  margin-top: 0.65rem;
  font-size: 11px;
  line-height: 1.65;
  color: color-mix(in srgb, var(--color-paper) 62%, transparent);
}

.evidence-list {
  margin-top: 0.75rem;
  display: grid;
  gap: 0.6rem;
}

.evidence-list li {
  display: grid;
  grid-template-columns: 1.7rem 1fr;
  gap: 0.6rem;
  align-items: start;
}

.evidence-list span {
  padding-top: 0.1rem;
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-accent-light);
}

.evidence-list p,
.evidence-decision > p:last-child {
  font-size: 12px;
  line-height: 1.65;
  color: color-mix(in srgb, var(--color-paper) 88%, transparent);
}

.evidence-decision {
  padding: 0.9rem 1rem;
  border-left: 2px solid var(--color-accent-light);
  background-color: color-mix(in srgb, var(--color-paper) 6%, transparent);
}

.evidence-decision > p:last-child {
  margin-top: 0.45rem;
}

.evidence-footer {
  bottom: 1.25rem;
  padding-top: 0.9rem;
  border-top: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
  color: color-mix(in srgb, var(--color-paper) 55%, transparent);
}

.evidence-footer span:first-child {
  color: var(--color-accent-light);
}

@media (hover: hover) {
  .project-scanner.is-expanded .scanner-map {
    opacity: 0;
    transform: translateY(-8%);
  }

  .project-scanner.is-expanded .scanner-evidence {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (hover: none) {
  .project-scanner.is-expanded .scanner-map {
    opacity: 0;
    transform: translateY(-8%);
  }

  .project-scanner.is-expanded .scanner-evidence {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 639px) {
  .project-scanner {
    min-height: 560px;
  }

  .scanner-flow {
    right: 1.25rem;
    left: 1.25rem;
  }

  .evidence-body {
    gap: 1.1rem;
    padding-inline: 1.25rem;
  }
}

@media (max-width: 379px) {
  .project-scanner {
    min-height: 620px;
  }

  .scanner-node {
    grid-template-columns: 1.35rem minmax(0, 0.44fr) minmax(0, 1.56fr);
    gap: 0.4rem;
    padding: 0.65rem;
  }

  .scanner-node > small {
    font-size: 10px;
  }
}

@media (min-width: 640px) {
  .evidence-body {
    grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
    column-gap: 1.75rem;
  }

  .evidence-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 1.5rem;
    padding-bottom: 0;
    border-right: 1px solid color-mix(in srgb, var(--color-paper) 18%, transparent);
    border-bottom: 0;
  }

  .evidence-decision {
    grid-column: 1 / -1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scanner-map,
  .scanner-evidence,
  .scanner-caption > span:last-child {
    transition: none;
  }
}
</style>
