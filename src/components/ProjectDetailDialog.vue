<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import type { Project } from '@/data/profile'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ close: [] }>()
const closeButton = ref<HTMLButtonElement | null>(null)

const dialogTitle = computed(() => `${props.project.title}案例详情`)

onMounted(() => nextTick(() => closeButton.value?.focus()))
</script>

<template>
  <div class="project-dialog-backdrop" role="presentation" @click.self="emit('close')">
    <section
      class="project-dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`project-dialog-${project.id}`"
      @keydown.esc="emit('close')"
    >
      <header class="project-dialog-header">
        <div>
          <p class="mono-label">Case file / {{ project.id }}</p>
          <h2 :id="`project-dialog-${project.id}`" class="mt-3 text-2xl font-semibold tracking-tight">
            {{ dialogTitle }}
          </h2>
        </div>
        <button ref="closeButton" type="button" class="project-dialog-close" @click="emit('close')">
          关闭
          <span aria-hidden="true">×</span>
        </button>
      </header>

      <div class="project-dialog-body">
        <div class="project-dialog-grid">
          <div>
            <p class="project-dialog-label">Context</p>
            <p>{{ project.description }}</p>
          </div>
          <div>
            <p class="project-dialog-label">Role</p>
            <p>{{ project.role }}</p>
          </div>
          <div>
            <p class="project-dialog-label">Constraint</p>
            <p>{{ project.constraint }}</p>
          </div>
          <div>
            <p class="project-dialog-label">Decision</p>
            <p>{{ project.decision }}</p>
          </div>
        </div>

        <div class="mt-8 border-t border-line pt-7">
          <p class="project-dialog-label">Implementation</p>
          <ol class="mt-4 grid gap-3">
            <li v-for="(point, index) in project.points" :key="point" class="project-dialog-step">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ point }}</p>
            </li>
          </ol>
        </div>

        <div class="mt-8 grid gap-7 border-t border-line pt-7 md:grid-cols-2">
          <div>
            <p class="project-dialog-label">Result</p>
            <p class="mt-3 font-mono text-xl text-accent">{{ project.metric }}</p>
          </div>
          <div>
            <p class="project-dialog-label">Evidence</p>
            <ul class="mt-3 space-y-2 text-sm leading-6 text-ink-soft">
              <li v-for="item in project.evidence" :key="item" class="flex gap-2">
                <span class="text-accent" aria-hidden="true">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.project-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1rem;
  background-color: color-mix(in srgb, var(--color-night) 72%, transparent);
  backdrop-filter: blur(8px);
}

.project-dialog {
  width: min(760px, 100%);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  border: 1px solid var(--color-line);
  background-color: var(--color-paper);
  box-shadow: 0 24px 80px rgb(0 0 0 / 0.24);
}

.project-dialog-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid var(--color-line);
  background-color: color-mix(in srgb, var(--color-paper) 94%, transparent);
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.project-dialog-close {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-line);
  padding: 0.5rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-ink-soft);
}

.project-dialog-close:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.project-dialog-body {
  padding: 1.5rem;
}

.project-dialog-grid {
  display: grid;
  gap: 1px;
  border: 1px solid var(--color-line);
  background-color: var(--color-line);
}

.project-dialog-grid > div {
  background-color: var(--color-surface);
  padding: 1.25rem;
}

.project-dialog-grid p:last-child {
  margin-top: 0.6rem;
  font-size: 13px;
  line-height: 1.8;
  color: var(--color-ink-soft);
}

.project-dialog-label {
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1.4;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-ink-mute);
}

.project-dialog-step {
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.75rem;
  font-size: 13px;
  line-height: 1.75;
  color: var(--color-ink-soft);
}

.project-dialog-step > span {
  padding-top: 0.1rem;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-accent);
}

@media (min-width: 640px) {
  .project-dialog-header,
  .project-dialog-body {
    padding: 2rem;
  }

  .project-dialog-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
