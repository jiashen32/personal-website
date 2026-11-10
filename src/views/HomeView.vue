<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectDetailDialog from '@/components/ProjectDetailDialog.vue'
import ProjectScanner from '@/components/ProjectScanner.vue'
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
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

useReveal()

const [aboutLead = '', aboutMore = ''] = about.paragraphs
const primaryResume = profile.resumes[0]
const featuredProjects = projects.filter((project) => project.featured)
const otherProjects = projects.filter((project) => !project.featured)
const selectedProject = ref<Project | null>(null)
const emailFeedback = ref('复制邮箱')
const resumeFeedback = ref('下载简历')
let feedbackTimer: ReturnType<typeof setTimeout> | undefined
let dialogTrigger: HTMLElement | null = null

const projectCountLabel = computed(() => `${featuredProjects.length} 个精选案例`)

const openProject = (project: Project, event: MouseEvent) => {
  dialogTrigger = event.currentTarget as HTMLElement
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
    <!-- 首屏：先回答「是谁、能做什么、有什么证据」 -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
      <span class="hero-coordinate left-3 top-1/2 hidden -translate-y-1/2 lg:block" aria-hidden="true">
        CANVAS / 1180
      </span>

      <div class="relative mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        <div class="flex flex-wrap items-center justify-between gap-x-8 gap-y-4" data-reveal>
          <p class="mono-label flex items-center gap-3">
            <span class="h-px w-8 bg-accent" aria-hidden="true"></span>
            Portfolio / {{ profile.updated }}
          </p>
          <div class="system-readout" aria-label="当前求职状态">
            <span class="status-dot system-pulse text-accent" aria-hidden="true"></span>
            <span>{{ profile.availability }}</span>
            <span class="text-ink/30" aria-hidden="true">/</span>
            <span>{{ profile.openTo }}</span>
          </div>
        </div>

        <div class="mt-9 grid gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-16">
          <div>
            <h1
              class="text-[clamp(2.35rem,5.8vw,4.8rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-ink"
              data-reveal
              data-delay="1"
            >
              <span class="block">{{ profile.headline.lead }}</span>
              <span class="block">
                <span class="text-accent">{{ profile.headline.accent }}</span>{{ profile.headline.tail }}
              </span>
            </h1>

            <p
              class="mt-8 max-w-xl text-base leading-8 text-ink md:text-lg md:leading-9"
              data-reveal
              data-delay="2"
            >
              {{ profile.subline }}
            </p>
            <p class="mt-4 max-w-xl text-sm leading-8 text-ink-soft" data-reveal data-delay="2">
              {{ profile.bio }}
            </p>

            <div class="mt-9 flex flex-wrap items-center gap-3" data-reveal data-delay="3">
              <a href="#work" class="btn-solid">
                查看精选项目
                <span aria-hidden="true">↓</span>
              </a>
              <a
                v-if="primaryResume"
                :href="primaryResume.href"
                target="_blank"
                rel="noreferrer"
                class="btn-ghost"
                download
                @click="handleResumeDownload"
              >
                {{ resumeFeedback }} · {{ primaryResume.label }}
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <dl
              class="mt-11 grid max-w-xl grid-cols-1 gap-5 border-t border-line pt-6 min-[440px]:grid-cols-3 min-[440px]:gap-6"
              data-reveal
              data-delay="4"
            >
              <div>
                <dt class="mono-label">精选案例</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ projectCountLabel }}</dd>
              </div>
              <div>
                <dt class="mono-label">求职方向</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.openTo }}</dd>
              </div>
              <div>
                <dt class="mono-label">到岗时间</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.notice }}</dd>
              </div>
            </dl>
          </div>

          <aside class="plate hero-plate" data-reveal data-delay="3" aria-label="个人资料">
            <div class="plate-ruler" aria-hidden="true">
              <span v-for="tick in 9" :key="tick" :class="{ 'plate-ruler-major': tick % 4 === 1 }"></span>
            </div>
            <div class="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <span>Profile / 001</span>
              <span class="inline-flex items-center gap-2 text-accent">
                <span class="status-dot" aria-hidden="true"></span>
                {{ profile.availability }}
              </span>
            </div>

            <div class="mt-10 border-b border-line pb-7">
              <p class="font-mono text-[10px] tracking-[0.28em] text-ink-mute">{{ profile.pinyin }}</p>
              <p class="mt-3 text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-none tracking-[-0.045em]">
                {{ profile.name }}
              </p>
              <p class="mt-3 text-sm text-ink-soft">{{ profile.role }}</p>
            </div>

            <dl class="mt-7 grid grid-cols-[1fr_auto] items-baseline gap-y-3.5 text-sm">
              <dt class="text-ink-mute">学校</dt>
              <dd class="text-right">{{ profile.education.split(' · ')[0] }}</dd>
              <dt class="text-ink-mute">毕业时间</dt>
              <dd class="text-right font-mono tabular-nums">{{ profile.cohort }}</dd>
              <dt class="text-ink-mute">实习经历</dt>
              <dd class="text-right font-mono tabular-nums">{{ profile.stats.internships }} 段</dd>
              <dt class="text-ink-mute">独立项目</dt>
              <dd class="text-right font-mono tabular-nums">{{ profile.stats.projects }} 个</dd>
              <dt class="text-ink-mute">专业排名</dt>
              <dd class="text-right">{{ profile.stats.ranking }}</dd>
            </dl>

            <div class="mt-7 border-t border-line pt-5">
              <p class="mono-label">Engineering focus</p>
              <p class="mt-3 text-sm leading-7 text-ink-soft">可追溯 · 可降级 · 成本可核算</p>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- 量化证据 -->
    <section class="border-b border-line" aria-label="关键指标">
      <div class="mx-auto grid max-w-[1180px] grid-cols-1 gap-px bg-line min-[420px]:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(metric, index) in metrics"
          :key="metric.label"
          class="bg-paper px-6 py-7 md:px-8"
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
            首页只保留三个最能说明工程判断的案例。每个项目都给出约束、关键决策、实现链路和可验证结果。
          </p>
        </header>

        <div class="mt-14 space-y-20 md:space-y-28">
          <article
            v-for="(project, index) in featuredProjects"
            :key="project.id"
            class="project-case grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-16"
            data-reveal
          >
            <ProjectScanner
              :project="project"
              :class="index % 2 === 1 ? 'lg:order-2' : ''"
            />

            <div :class="index % 2 === 1 ? 'lg:order-1' : ''">
              <div class="flex items-center justify-between gap-5 border-b border-line pb-4">
                <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                  SEC.{{ String(index + 1).padStart(2, '0') }} / {{ String(featuredProjects.length).padStart(2, '0') }}
                </p>
                <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{{ project.domain }}</p>
              </div>

              <h3 class="project-title mt-7">{{ project.title }}</h3>
              <p class="mt-3 font-mono text-[10px] tracking-[0.14em] text-ink-mute">
                {{ project.period }} · {{ project.subtitle }}
              </p>

              <div class="project-brief mt-7">
                <p class="project-phase">Challenge</p>
                <p class="mt-2 text-sm leading-7 text-ink">{{ project.constraint }}</p>
              </div>

              <div class="mt-6">
                <p class="project-phase">Decision</p>
                <p class="mt-2 text-sm leading-7 text-ink-soft">{{ project.decision }}</p>
              </div>

              <div class="mt-7 grid grid-cols-[1fr_auto] gap-6 border-y border-line py-5">
                <div>
                  <p class="project-phase">Result</p>
                  <p class="mt-2 font-mono text-lg font-medium leading-7 tracking-tight text-accent">
                    {{ project.metric }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="project-phase">Evidence</p>
                  <p class="mt-2 font-mono text-xs text-ink-soft">{{ project.evidence.length }} 项可验证</p>
                </div>
              </div>

              <ul class="mt-5 flex flex-wrap gap-2" aria-label="技术栈">
                <li v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</li>
              </ul>

              <div class="mt-7 flex flex-wrap items-center gap-5">
                <button type="button" class="link-arrow" @click="openProject(project, $event)">
                  查看案例详情
                  <span aria-hidden="true">→</span>
                </button>
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noreferrer"
                  class="link-arrow"
                >
                  {{ link.label }}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        <div v-if="otherProjects.length" class="mt-20 border-t border-line pt-8" data-reveal>
          <p class="mono-label">Additional work</p>
          <div class="mt-5 grid gap-px border border-line bg-line md:grid-cols-2">
            <article v-for="project in otherProjects" :key="project.id" class="bg-paper p-6 md:p-8">
              <p class="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{{ project.domain }}</p>
              <h3 class="mt-3 text-xl font-semibold tracking-tight">{{ project.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-ink-soft">{{ project.description }}</p>
              <div class="mt-5 flex items-center justify-between gap-5 border-t border-line pt-4">
                <span class="font-mono text-xs text-accent">{{ project.metric }}</span>
                <button type="button" class="link-arrow" @click="openProject(project, $event)">查看详情</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 做法 -->
    <section id="approach" class="scroll-mt-20 border-b border-line">
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

        <div class="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
          <div
            v-for="(principle, index) in principles"
            :key="principle.tag"
            class="bg-paper px-6 py-8 md:px-8"
            data-reveal
            :data-delay="index > 0 ? String(index) : undefined"
          >
            <p class="mono-label">{{ principle.tag }}</p>
            <h3 class="mt-4 text-lg font-semibold tracking-tight">{{ principle.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-ink-soft">{{ principle.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section id="skills" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">03 / Stack in Practice</p>
            <h2 class="section-title">技术用在哪里</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            不把技术栈当关键词墙。每项能力都标出实际使用场景，方便从项目反查实现细节。
          </p>
        </header>

        <div class="mt-12 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <SkillGroupPanel v-for="group in skillGroups" :key="group.label" :group="group" data-reveal />
        </div>
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
.hero-coordinate {
  position: absolute;
  z-index: 1;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.18em;
  color: var(--color-ink-mute);
  opacity: 0.28;
  writing-mode: vertical-rl;
  pointer-events: none;
}

.system-readout {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1;
  letter-spacing: 0.14em;
  color: var(--color-ink-mute);
  font-variant-numeric: tabular-nums;
}

.system-pulse {
  animation: system-breathe 3s ease-in-out infinite;
}

.hero-plate {
  background-color: color-mix(in srgb, var(--color-surface) 92%, transparent);
}

.plate-ruler {
  position: absolute;
  top: 1.75rem;
  right: -0.875rem;
  bottom: 1.75rem;
  display: flex;
  width: 0.5rem;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.plate-ruler span {
  display: block;
  width: 0.25rem;
  height: 1px;
  background-color: var(--color-ink-mute);
}

.plate-ruler .plate-ruler-major {
  width: 0.5rem;
  background-color: var(--color-accent);
}

.project-title {
  position: relative;
  padding-left: 1rem;
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.04em;
}

.project-title::before {
  content: '';
  position: absolute;
  top: 0.16em;
  left: 0;
  width: 1px;
  height: 0.78em;
  background-color: var(--color-accent);
}

.project-brief {
  padding-left: 1.25rem;
  border-left: 2px solid var(--color-accent);
}

.project-phase {
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1.4;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-ink-mute);
}

.contact-action {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border: 1px solid color-mix(in srgb, var(--color-paper) 25%, transparent);
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--color-paper) 88%, transparent);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
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

@media (hover: hover) {
  .plate:hover .plate-ruler {
    opacity: 0.45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .system-pulse {
    animation: none;
  }
}

@keyframes system-breathe {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
}
</style>
