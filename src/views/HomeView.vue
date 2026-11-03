<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
import { useReveal } from '@/composables/useReveal'
import { about, profile, projects, skillGroups } from '@/data/profile'
import type { Project } from '@/data/profile'

useReveal()

// 首屏标题按逗号分成两行，并对「简单好用」做强调，其余文字仍来自数据文件
const accentPhrase = '简单好用'
const [headlineLead = '', headlineTail = ''] = profile.headline.split('，')
const headlineTailPieces = headlineTail.split(accentPhrase)

const [aboutLead = '', aboutMore = ''] = about.paragraphs

const statusLabel: Record<Project['status'], string> = {
  live: '已上线',
  building: '开发中',
}

const githubHandle = profile.github.split('/').filter(Boolean).pop() ?? profile.handle
const linkedinHandle = profile.linkedin.split('/').filter(Boolean).pop() ?? ''
</script>

<template>
  <main id="main">
    <!-- 首屏 -->
    <section class="relative overflow-hidden border-b border-line">
      <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <p class="mono-label flex items-center gap-3" data-reveal>
          <span class="h-px w-8 bg-accent" aria-hidden="true"></span>
          Portfolio / {{ profile.updated }}
        </p>

        <h1
          class="mt-8 text-[clamp(2rem,5.4vw,4.5rem)] font-semibold leading-[1.15] tracking-[-0.04em] text-ink"
          data-reveal
          data-delay="1"
        >
          <span class="block">{{ headlineLead }}，</span>
          <span class="block">
            <template v-for="(piece, index) in headlineTailPieces" :key="index">
              {{ piece }}<span
                v-if="index < headlineTailPieces.length - 1"
                class="text-accent"
              >{{ accentPhrase }}</span>
            </template>
          </span>
        </h1>

        <div class="mt-12 grid gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-16">
          <div>
            <p
              class="max-w-xl text-sm leading-8 text-ink-soft md:text-base"
              data-reveal
              data-delay="2"
            >
              {{ profile.bio }}
            </p>

            <div class="mt-9 flex flex-wrap items-center gap-3" data-reveal data-delay="3">
              <a href="#work" class="btn-solid">
                查看作品
                <span aria-hidden="true">↓</span>
              </a>
              <RouterLink to="/about" class="btn-ghost">
                关于我
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>

            <dl
              class="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
              data-reveal
              data-delay="4"
            >
              <div>
                <dt class="mono-label">地点</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.location }}</dd>
              </div>
              <div>
                <dt class="mono-label">经验</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.experience }}</dd>
              </div>
              <div>
                <dt class="mono-label">方向</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.openTo }}</dd>
              </div>
            </dl>
          </div>

          <!-- 签名元素：资料铭牌 -->
          <aside class="plate" data-reveal data-delay="3" aria-label="个人资料">
            <div
              class="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute"
            >
              <span>Profile / 001</span>
              <span class="inline-flex items-center gap-2 text-accent">
                <span class="status-dot pulse" aria-hidden="true"></span>
                {{ profile.availability }}
              </span>
            </div>

            <div class="mt-12 border-b border-line pb-7">
              <p class="font-mono text-[10px] tracking-[0.32em] text-ink-mute">XIAO NING</p>
              <p class="mt-3 text-[2.75rem] font-semibold leading-none tracking-[-0.04em]">
                {{ profile.name }}
              </p>
              <p class="mt-3 text-sm text-ink-soft">{{ profile.role }}</p>
            </div>

            <dl class="mt-7 grid grid-cols-[1fr_auto] items-baseline gap-y-3.5 text-sm">
              <dt class="text-ink-mute">交付项目</dt>
              <dd class="text-right font-mono tabular-nums">{{ profile.deliveredProjects }}</dd>
              <dt class="text-ink-mute">开发经验</dt>
              <dd class="text-right">{{ profile.experience }}</dd>
              <dt class="text-ink-mute">求职方向</dt>
              <dd class="text-right">{{ profile.openTo }}</dd>
              <dt class="text-ink-mute">工作地点</dt>
              <dd class="text-right">{{ profile.workLocation }}</dd>
              <dt class="text-ink-mute">到岗时间</dt>
              <dd class="text-right">{{ profile.notice }}</dd>
            </dl>

            <p
              class="mt-6 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute"
            >
              Updated {{ profile.updated }}
            </p>
          </aside>
        </div>
      </div>
    </section>

    <!-- 作品 -->
    <section id="work" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header
          class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div>
            <p class="mono-label">01 / Selected Work</p>
            <h2 class="section-title">作品</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            三个有代表性的项目。我关心的不只是完成需求，还有首屏速度、协作效率和半年后的可维护性。
          </p>
        </header>

        <div class="mt-12 border-t border-line">
          <a
            v-for="(project, index) in projects"
            :key="project.id"
            :href="project.href"
            target="_blank"
            rel="noreferrer"
            class="group grid gap-5 border-b border-line py-8 transition-colors hover:bg-surface/80 md:grid-cols-[76px_1.7fr_1fr_150px] md:items-center md:gap-8 md:px-4"
            data-reveal
          >
            <span class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {{ String(index + 1).padStart(2, '0') }} / {{ project.year }}
            </span>

            <div>
              <h3
                class="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-2xl"
              >
                {{ project.title }}
              </h3>
              <p class="mt-2 max-w-xl text-sm leading-7 text-ink-soft">
                {{ project.description }}
              </p>
              <p class="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                指标 / <span class="text-accent">{{ project.highlight }}</span>
              </p>
            </div>

            <ul class="flex flex-wrap gap-2" aria-label="技术栈">
              <li v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</li>
            </ul>

            <div
              class="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center md:gap-3"
            >
              <span
                class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]"
                :class="project.status === 'live' ? 'text-accent' : 'text-signal'"
              >
                <span class="status-dot" aria-hidden="true"></span>
                {{ statusLabel[project.status] }}
              </span>
              <span
                class="text-lg text-ink-mute transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 能力 -->
    <section id="skills" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header
          class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          data-reveal
        >
          <div>
            <p class="mono-label">02 / Capabilities</p>
            <h2 class="section-title">能力</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            日常主力是 Vue 3 与 TypeScript，也熟悉 React 生态与服务端接口设计，能独立把产品从原型做到上线。
          </p>
        </header>

        <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <SkillGroupPanel
            v-for="group in skillGroups"
            :key="group.label"
            :group="group"
            data-reveal
          />
        </div>
      </div>
    </section>

    <!-- 关于 -->
    <section class="border-b border-line">
      <div
        class="mx-auto grid max-w-[1180px] gap-8 px-6 py-20 md:grid-cols-[0.55fr_1.45fr] md:gap-16 md:px-10 md:py-24"
      >
        <p class="mono-label md:pt-2" data-reveal>03 / About</p>
        <div>
          <p
            class="text-xl font-medium leading-[1.75] tracking-[-0.01em] text-ink md:text-2xl"
            data-reveal
          >
            {{ aboutLead }}
          </p>
          <p class="mt-6 max-w-2xl text-sm leading-8 text-ink-soft" data-reveal data-delay="1">
            {{ aboutMore }}
          </p>
          <RouterLink to="/about" class="link-arrow mt-8" data-reveal data-delay="2">
            完整经历与技能
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="scroll-mt-20 bg-night text-paper">
      <div
        class="mx-auto grid max-w-[1180px] gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-end md:px-10 md:py-24"
      >
        <div data-reveal>
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
            04 / Contact
          </p>
          <h2 class="mt-6 text-4xl font-semibold leading-[1.15] tracking-[-0.03em] md:text-5xl">
            聊聊下一件事。
          </h2>
          <p class="mt-5 max-w-md text-sm leading-7 text-paper/70">
            目前开放前端 / 全栈机会，{{ profile.workLocation }}。邮件通常会在一个工作日内回复。
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="mt-8 inline-flex items-center gap-3 border border-paper/25 px-5 py-3 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-night"
          >
            {{ profile.email }}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <dl
          class="grid gap-x-8 gap-y-5 border-t border-paper/15 pt-6 sm:grid-cols-2"
          data-reveal
          data-delay="1"
        >
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">GitHub</dt>
            <dd class="mt-2">
              <a
                :href="profile.github"
                target="_blank"
                rel="noreferrer"
                class="text-sm text-paper/85 transition-colors hover:text-paper"
              >
                @{{ githubHandle }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">LinkedIn</dt>
            <dd class="mt-2">
              <a
                :href="profile.linkedin"
                target="_blank"
                rel="noreferrer"
                class="text-sm text-paper/85 transition-colors hover:text-paper"
              >
                {{ linkedinHandle }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">Location</dt>
            <dd class="mt-2 text-sm text-paper/85">{{ profile.workLocation }}</dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">Notice</dt>
            <dd class="mt-2 text-sm text-paper/85">{{ profile.notice }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </main>
</template>
