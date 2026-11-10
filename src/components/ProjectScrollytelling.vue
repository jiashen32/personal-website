<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ProjectScanner from '@/components/ProjectScanner.vue'
import type { Project } from '@/data/profile'

const props = defineProps<{ projects: Project[] }>()
const emit = defineEmits<{ openDetail: [project: Project, trigger: HTMLElement] }>()

const root = ref<HTMLElement | null>(null)
const steps = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const localProgress = ref(0)
const desktopStory = ref(false)
let frame = 0
let media: MediaQueryList | undefined
let reducedMotionMedia: MediaQueryList | undefined

const activeProject = computed(() => props.projects[activeIndex.value] ?? props.projects[0]!)
const activeView = computed(() => (localProgress.value > 0.62 ? 'evidence' : 'map'))
const stageStyle = computed(() => {
  const distance = Math.abs(localProgress.value - 0.5) * 2
  const scale = 1 - Math.min(1, distance) * 0.14
  const translate = (0.5 - localProgress.value) * 20
  const opacity = 1 - Math.min(1, distance) * 0.18
  return {
    opacity: opacity.toFixed(3),
    transform: `translate3d(0, ${translate.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
  }
})

const setStep = (element: unknown, index: number) => {
  if (element instanceof HTMLElement) steps.value[index] = element
}

const measure = () => {
  frame = 0
  if (!desktopStory.value || !root.value || !steps.value.length) return
  const focusY = window.innerHeight * 0.5
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  steps.value.forEach((step, index) => {
    const rect = step.getBoundingClientRect()
    const distance = Math.abs(rect.top + rect.height / 2 - focusY)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  })

  activeIndex.value = nearestIndex
  const activeRect = steps.value[nearestIndex]!.getBoundingClientRect()
  localProgress.value = Math.min(1, Math.max(0, (focusY - activeRect.top) / activeRect.height))
}

const schedule = () => {
  if (!frame) frame = requestAnimationFrame(measure)
}

const updateMode = () => {
  desktopStory.value = Boolean(media?.matches) && !Boolean(reducedMotionMedia?.matches)
  if (desktopStory.value) nextTick(schedule)
}

const openDetail = (project: Project, event: MouseEvent) => {
  emit('openDetail', project, event.currentTarget as HTMLElement)
}

onMounted(() => {
  media = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
  reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', updateMode)
  reducedMotionMedia.addEventListener('change', updateMode)
  updateMode()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})

onBeforeUnmount(() => {
  media?.removeEventListener('change', updateMode)
  reducedMotionMedia?.removeEventListener('change', updateMode)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div ref="root" class="project-story" :class="{ 'is-pinned': desktopStory }">
    <div v-if="desktopStory" class="story-stage" aria-hidden="true">
      <div class="stage-frame" :style="stageStyle">
        <div class="stage-index">
          <span>Live evidence / {{ String(activeIndex + 1).padStart(2, '0') }}</span>
          <span>{{ activeProject.domain }}</span>
        </div>
        <ProjectScanner :project="activeProject" presentation="display" :view="activeView" />
        <div class="stage-progress"><span :style="{ transform: `scaleX(${localProgress})` }"></span></div>
      </div>
    </div>

    <div class="story-steps">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        :ref="(element) => setStep(element, index)"
        class="project-step"
        :class="{ 'is-active': index === activeIndex }"
      >
        <ProjectScanner v-if="!desktopStory" :project="project" />

        <div class="project-copy">
          <div class="project-meta">
            <p>SEC.{{ String(index + 1).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</p>
            <p>{{ project.domain }}</p>
          </div>

          <h3>{{ project.title }}</h3>
          <p class="project-period">{{ project.period }} · {{ project.subtitle }}</p>

          <div class="project-brief">
            <p class="project-phase">Challenge</p>
            <p>{{ project.constraint }}</p>
          </div>

          <div class="project-decision">
            <p class="project-phase">Decision</p>
            <p>{{ project.decision }}</p>
          </div>

          <div class="project-result">
            <div><p class="project-phase">Result</p><p>{{ project.metric }}</p></div>
            <div><p class="project-phase">Evidence</p><p>{{ project.evidence.length }} 项可验证</p></div>
          </div>

          <ul class="mt-5 flex flex-wrap gap-2" aria-label="技术栈">
            <li v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</li>
          </ul>

          <div class="mt-7 flex flex-wrap items-center gap-5">
            <button type="button" class="link-arrow" @click="openDetail(project, $event)">查看案例详情 <span aria-hidden="true">→</span></button>
            <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer" class="link-arrow">
              {{ link.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.project-story { margin-top: 3.5rem; }
.story-stage { display: none; }
.story-steps { display: grid; gap: 5rem; }
.project-step { display: grid; gap: 2.25rem; }
.project-copy { align-self: center; }
.project-meta { display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-line); font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-ink-mute); }
.project-meta p:last-child { color: var(--color-accent); text-align: right; }
.project-copy h3 { position: relative; margin-top: 1.75rem; padding-left: 1rem; font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 600; line-height: 1.08; letter-spacing: -0.04em; }
.project-copy h3::before { content: ''; position: absolute; top: 0.16em; left: 0; width: 1px; height: 0.78em; background: var(--color-accent); }
.project-period { margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.625rem; letter-spacing: 0.14em; color: var(--color-ink-mute); }
.project-brief { margin-top: 1.75rem; padding-left: 1.25rem; border-left: 2px solid var(--color-accent); }
.project-brief > p:last-child, .project-decision > p:last-child { margin-top: 0.5rem; font-size: 0.875rem; line-height: 1.75rem; }
.project-decision { margin-top: 1.5rem; }
.project-decision > p:last-child { color: var(--color-ink-soft); }
.project-phase { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-ink-mute); }
.project-result { display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; margin-top: 1.75rem; padding: 1.25rem 0; border-block: 1px solid var(--color-line); }
.project-result > div:first-child p:last-child { margin-top: 0.5rem; font-family: var(--font-mono); font-size: 1.125rem; font-weight: 500; color: var(--color-accent); }
.project-result > div:last-child { text-align: right; }
.project-result > div:last-child p:last-child { margin-top: 0.5rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-soft); }

@media (min-width: 1024px) {
  .project-story.is-pinned { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.88fr); align-items: start; gap: clamp(3rem, 6vw, 6rem); }
  .is-pinned .story-stage { position: sticky; top: 6rem; display: block; height: calc(100svh - 7.5rem); min-height: 500px; }
  .stage-frame { display: grid; height: 100%; align-content: center; transition: transform 120ms linear; transform-origin: center; will-change: transform; }
  .stage-index { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 0.8rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-ink-mute); }
  .stage-index span:last-child { color: var(--color-accent); text-align: right; }
  .stage-progress { height: 2px; margin-top: 1rem; background: var(--color-line); overflow: hidden; }
  .stage-progress span { display: block; width: 100%; height: 100%; background: var(--color-accent); transform-origin: left; }
  .is-pinned .story-steps { gap: 0; }
  .is-pinned .project-step { min-height: 84svh; opacity: 0.47; transition: opacity 220ms ease; }
  .is-pinned .project-step.is-active { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) { .stage-frame, .project-step { transition: none !important; } }
</style>
