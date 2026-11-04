<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
import { useReveal } from '@/composables/useReveal'
import {
  about,
  metrics,
  principles,
  profile,
  projects,
  skillGroups,
} from '@/data/profile'

useReveal()

const [aboutLead = '', aboutMore = ''] = about.paragraphs
const primaryResume = profile.resumes[0]
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
          class="mt-8 text-[clamp(2.1rem,5.4vw,4.4rem)] font-semibold leading-[1.14] tracking-[-0.04em] text-ink"
          data-reveal
          data-delay="1"
        >
          <span class="block">{{ profile.headline.lead }}</span>
          <span class="block">
            <span class="text-accent">{{ profile.headline.accent }}</span>{{ profile.headline.tail }}
          </span>
        </h1>

        <div class="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
          <div>
            <p
              class="max-w-xl text-base leading-8 text-ink md:text-lg md:leading-9"
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
                查看项目
                <span aria-hidden="true">↓</span>
              </a>
              <a
                v-if="primaryResume"
                :href="primaryResume.href"
                target="_blank"
                rel="noreferrer"
                class="btn-ghost"
                download
              >
                下载简历 · {{ primaryResume.label }}
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <dl
              class="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
              data-reveal
              data-delay="4"
            >
              <div>
                <dt class="mono-label">所在地</dt>
                <dd class="mt-2 text-sm text-ink-soft">{{ profile.location }}</dd>
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
              <p class="font-mono text-[10px] tracking-[0.28em] text-ink-mute">
                {{ profile.pinyin }}
              </p>
              <p class="mt-3 text-[2.75rem] font-semibold leading-none tracking-[-0.04em]">
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

            <p
              class="mt-6 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute"
            >
              Updated {{ profile.updated }}
            </p>
          </aside>
        </div>
      </div>
    </section>

    <!-- 指标 -->
    <section class="border-b border-line" aria-label="关键指标">
      <div class="mx-auto grid max-w-[1180px] grid-cols-2 gap-px bg-line lg:grid-cols-4">
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

    <!-- 项目 -->
    <section id="work" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">01 / Selected Work</p>
            <h2 class="section-title">项目</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            四个独立完成的项目。挑出来的标准不是「用了什么模型」，而是遇到了什么坑、最后用什么办法解决、效果怎么衡量。
          </p>
        </header>

        <div class="mt-12 border-t border-line">
          <article
            v-for="project in projects"
            :key="project.id"
            class="grid gap-5 border-b border-line py-9 transition-colors lg:grid-cols-[136px_1fr_232px] md:gap-10 md:px-4 md:hover:bg-surface/70"
            data-reveal
          >
            <div class="font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-ink-mute md:pt-1.5">
              <p class="whitespace-nowrap">{{ project.period }}</p>
              <p class="mt-1 text-accent">{{ project.domain }}</p>
            </div>

            <div>
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 class="text-xl font-semibold tracking-tight md:text-2xl">
                  {{ project.title }}
                </h3>
                <span class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  {{ project.subtitle }}
                </span>
              </div>
              <p class="mt-2 max-w-xl text-sm leading-7 text-ink-soft">{{ project.description }}</p>

              <ul class="mt-4 space-y-2">
                <li
                  v-for="point in project.points"
                  :key="point"
                  class="flex gap-3 text-[13px] leading-6 text-ink-soft"
                >
                  <span class="mt-2.5 h-px w-3 shrink-0 bg-accent/60" aria-hidden="true"></span>
                  <span>{{ point }}</span>
                </li>
              </ul>

              <a
                v-if="project.href"
                :href="project.href"
                target="_blank"
                rel="noreferrer"
                class="link-arrow mt-5"
              >
                查看代码
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div class="flex flex-col gap-4 md:items-end md:text-right">
              <p class="font-mono text-[11px] leading-5 text-accent">{{ project.metric }}</p>
              <ul class="flex flex-wrap gap-2 md:justify-end" aria-label="技术栈">
                <li v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 做法 -->
    <section id="approach" class="scroll-mt-20 border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between" data-reveal>
          <div>
            <p class="mono-label">02 / How I Work</p>
            <h2 class="section-title">我的做法</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            下面四条是几个项目里反复验证过的判断顺序。写在这里，是因为它们比技术栈更能说明一个后端会怎么取舍。
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
            <p class="mono-label">03 / Stack</p>
            <h2 class="section-title">技术栈</h2>
          </div>
          <p class="max-w-sm text-sm leading-7 text-ink-soft">
            主力是 Java + Spring Boot，AI 侧用 LangChain4j 把模型接进业务流程；数据层熟悉 MySQL 索引与 Redis 缓存治理。
          </p>
        </header>

        <div class="mt-12 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
        <p class="mono-label md:pt-2" data-reveal>04 / About</p>
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
            教育与实习经历
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
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">05 / Contact</p>
          <h2 class="mt-6 text-4xl font-semibold leading-[1.15] tracking-[-0.03em] md:text-5xl">
            聊聊下一件事。
          </h2>
          <p class="mt-5 max-w-md text-sm leading-7 text-paper/70">
            目前开放 {{ profile.openTo }} 方向的岗位，{{ profile.notice }}。邮件和工作日电话我都会尽快回复。
          </p>
          <a
            :href="`mailto:${profile.email}`"
            class="mt-8 inline-flex items-center gap-3 border border-paper/25 px-5 py-3 text-sm transition-colors hover:border-paper hover:bg-paper hover:text-night"
          >
            {{ profile.email }}
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <dl class="grid gap-x-8 gap-y-5 border-t border-paper/15 pt-6 sm:grid-cols-2" data-reveal data-delay="1">
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">电话</dt>
            <dd class="mt-2">
              <a
                :href="`tel:${profile.phone}`"
                class="font-mono text-sm tabular-nums text-paper/85 transition-colors hover:text-paper"
              >
                {{ profile.phone }}
              </a>
            </dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">微信</dt>
            <dd class="mt-2 font-mono text-sm text-paper/85">{{ profile.wechat }}</dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">Location</dt>
            <dd class="mt-2 text-sm text-paper/85">{{ profile.location }}</dd>
          </div>
          <div>
            <dt class="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">Notice</dt>
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
          >
            {{ resume.label }}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
