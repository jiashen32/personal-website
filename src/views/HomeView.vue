<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import EngineeringWeatherHero, { type ChromeState } from '@/components/EngineeringWeatherHero.vue'
import ProjectDetailDialog from '@/components/ProjectDetailDialog.vue'
import ProjectScrollytelling from '@/components/ProjectScrollytelling.vue'
import TechnologyHorizon from '@/components/TechnologyHorizon.vue'
import { useReveal } from '@/composables/useReveal'
import {
  about,
  metrics,
  principles,
  profile,
  projects,
  skillGroups,
  type Project,
} from '@/data/profile'

const emit = defineEmits<{ chromeState: [state: ChromeState] }>()

useReveal()

const [aboutLead = '', aboutMore = ''] = about.paragraphs
const primaryResume = profile.resumes[0]
const featuredProjects = projects.filter((project) => project.featured)
const selectedProject = ref<Project | null>(null)
const emailFeedback = ref('复制邮箱')
const resumeFeedback = ref('下载简历')
let feedbackTimer: ReturnType<typeof setTimeout> | undefined
let dialogTrigger: HTMLElement | null = null

const openProject = (project: Project, trigger: HTMLElement | MouseEvent) => {
  dialogTrigger = trigger instanceof HTMLElement ? trigger : (trigger.currentTarget as HTMLElement)
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
  nextTick(() => dialogTrigger?.focus())
}

const setFeedback = (target: 'email' | 'resume', message: string) => {
  if (feedbackTimer) clearTimeout(feedbackTimer)
  if (target === 'email') emailFeedback.value = message
  else resumeFeedback.value = message

  feedbackTimer = setTimeout(() => {
    emailFeedback.value = '复制邮箱'
    resumeFeedback.value = '下载简历'
  }, 2200)
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    setFeedback('email', '邮箱已复制')
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}

const handleResumeDownload = () => setFeedback('resume', '已开始下载')

watch(selectedProject, (project) => {
  document.body.style.overflow = project ? 'hidden' : ''
})

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedProject.value) closeProject()
}

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  if (feedbackTimer) clearTimeout(feedbackTimer)
})
</script>

<template>
  <main id="main">
    <EngineeringWeatherHero
      :project-count="featuredProjects.length"
      :primary-resume="primaryResume"
      :resume-feedback="resumeFeedback"
      @resume-download="handleResumeDownload"
      @chrome-state="emit('chromeState', $event)"
    />

    <!-- 量化证据 -->
    <section class="metrics-band border-b border-line" aria-label="关键指标">
      <div class="mx-auto grid max-w-[1180px] grid-cols-1 gap-px bg-line min-[420px]:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.label"
          class="metric-item px-6 py-7 md:px-8"
          data-reveal
          :data-delay="index > 0 ? String(index) : undefined"
        >
          <p class="font-mono text-[1.4rem] font-semibold tabular-nums tracking-tight text-ink">
            {{ metric.value }}
          </p>
          <p class="mt-2 text-sm leading-6 text-ink">{{ metric.label }}</p>
          <p class="mt-1.5 text-[11px] leading-5 text-ink-mute">{{ metric.source }}</p>
        </div>
      </div>
    </section>

    <!-- 精选项目 -->
    <section id="work" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">01 / Selected Work</p>
            <h2 class="section-title">用证据讲项目</h2>
          </div>
          <p class="max-w-md text-sm leading-7 text-ink-soft">
            向下滚动，视觉舞台会依次锁定三个工程案例；页面仍保持原生滚动，每个结论都能回到实现链路和验证证据。
          </p>
        </header>

        <ProjectScrollytelling :projects="featuredProjects" @open-detail="openProject" />
      </div>
    </section>

    <!-- 做法 -->
    <section id="approach" class="approach-section scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">02 / How I Work</p>
            <h2 class="section-title">工程判断顺序</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            比技术名词更重要的是面对不确定性时如何取舍：先定验收，再保证结果可追溯、失败可降级、成本可核算。
          </p>
        </header>

        <div class="principle-path mt-12">
          <div
            v-for="(principle, index) in principles"
            :key="principle.tag"
            class="principle-step"
            data-reveal
            :data-delay="index > 0 ? String(index) : undefined"
          >
            <span class="principle-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <p class="mono-label">{{ principle.tag }}</p>
            <h3 class="mt-4 text-lg font-semibold tracking-tight">{{ principle.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-ink-soft">{{ principle.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section id="skills" class="skills-section scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">Used in production</p>
            <h2 class="section-title">实际使用的技术与模型</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            从项目链路反查每项能力，而不是关键词列表。悬停或聚焦 Logo 轨道即可暂停查看。
          </p>
        </header>

        <TechnologyHorizon :groups="skillGroups" />
      </div>
    </section>

    <!-- 关于 -->
    <section id="about" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto grid max-w-[1180px] gap-8 px-6 py-20 md:grid-cols-[0.55fr_1.45fr] md:gap-16 md:px-10 md:py-24">
        <p class="mono-label md:pt-2" data-reveal>04 / About</p>
        <div>
          <p class="text-xl font-medium leading-[1.75] tracking-[-0.01em] text-ink md:text-2xl" data-reveal>
            {{ aboutLead }}
          </p>
          <p class="mt-6 max-w-2xl text-sm leading-8 text-ink-soft" data-reveal data-delay="1">
            {{ aboutMore }}
          </p>
          <RouterLink to="/about" class="link-arrow mt-8" data-reveal data-delay="2">
            教育与实习经历
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="scroll-mt-20 bg-night text-paper">
      <div class="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-10 md:py-24">
        <div data-reveal>
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">05 / Contact</p>
          <h2 class="mt-6 text-4xl font-semibold leading-[1.15] tracking-[-0.03em] md:text-5xl">聊聊下一件事。</h2>
          <p class="mt-5 max-w-md text-sm leading-7 text-paper/70">
            目前开放 {{ profile.openTo }} 方向的岗位，{{ profile.notice }}。邮件和工作日电话我都会尽快回复。
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <button type="button" class="contact-action" @click="copyEmail">
              {{ emailFeedback }}
              <span aria-hidden="true">⧉</span>
            </button>
            <a :href="`mailto:${profile.email}`" class="contact-action">
              发邮件
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <p class="mt-4 font-mono text-xs text-paper/60">{{ profile.email }}</p>
        </div>

        <dl class="grid gap-x-8 gap-y-5 border-t border-paper/15 pt-6 sm:grid-cols-2" data-reveal data-delay="1">
          <div>
            <dt class="contact-label">电话</dt>
            <dd class="mt-2">
              <a :href="`tel:${profile.phone}`" class="font-mono text-sm tabular-nums text-paper/85 transition-colors hover:text-paper">
                {{ profile.phone }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="contact-label">微信</dt>
            <dd class="mt-2 font-mono text-sm text-paper/85">{{ profile.wechat }}</dd>
          </div>
          <div>
            <dt class="contact-label">Location</dt>
            <dd class="mt-2 text-sm text-paper/85">{{ profile.location }}</dd>
          </div>
          <div>
            <dt class="contact-label">Notice</dt>
            <dd class="mt-2 text-sm text-paper/85">{{ profile.notice }}</dd>
          </div>
        </dl>

        <div class="flex flex-wrap items-center gap-3 md:col-span-2" data-reveal data-delay="2">
          <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/50">简历</span>
          <a
            v-for="resume in profile.resumes"
            :key="resume.href"
            :href="resume.href"
            target="_blank"
            rel="noreferrer"
            download
            class="inline-flex items-center gap-2 border border-paper/25 px-4 py-2 text-sm text-paper/85 transition-colors hover:border-paper hover:text-paper"
            @click="handleResumeDownload"
          >
            {{ resume.label }}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <ProjectDetailDialog v-if="selectedProject" :project="selectedProject" @close="closeProject" />
    </Teleport>
  </main>
</template>

<style scoped>
.metrics-band {
  background: #eef1eb;
}

.metric-item {
  background: color-mix(in srgb, var(--color-surface) 68%, transparent);
}

.approach-section {
  background: #eee6d9;
}

.principle-path {
  display: grid;
  gap: 1.5rem;
}

.principle-step {
  position: relative;
  max-width: 38rem;
  border-radius: 1.25rem;
  background: rgb(251 251 247 / 72%);
  padding: 2rem clamp(1.5rem, 4vw, 3rem);
  box-shadow: 0 12px 42px rgb(64 48 32 / 5%);
}

.principle-index {
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: 2rem;
  line-height: 1;
  color: rgb(18 63 59 / 12%);
}

@media (min-width: 768px) {
  .principle-step:nth-child(even) {
    margin-left: auto;
  }

  .principle-step:nth-child(3) {
    margin-left: 9%;
  }
}

.skills-section {
  background: #edf3f0;
}

.contact-action {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid color-mix(in srgb, var(--color-paper) 25%, transparent);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--color-paper) 88%, transparent);
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.contact-action:hover {
  border-color: var(--color-paper);
  background-color: var(--color-paper);
  color: var(--color-night);
}

.contact-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: color-mix(in srgb, var(--color-paper) 60%, transparent);
}
</style>
