<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
import { useReveal } from '@/composables/useReveal'
import { about, education, experience, honors, profile, skillGroups } from '@/data/profile'

useReveal()

const facts = [
  { label: '实习经历', value: `${profile.stats.internships} 段`, note: '边缘云平台 · AI 外呼' },
  { label: '独立项目', value: `${profile.stats.projects} 个`, note: '全部已落地运行' },
  { label: '专业排名', value: profile.stats.ranking, note: '315 人同届' },
  { label: '毕业时间', value: profile.cohort, note: '本科 · 全日制' },
]
</script>

<template>
  <main id="main">
    <section class="relative overflow-hidden border-b border-line">
      <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>

      <div class="relative mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
        <p class="mono-label flex items-center gap-3" data-reveal>
          <span class="h-px w-8 bg-accent" aria-hidden="true"></span>
          About / 关于
        </p>

        <h1
          class="mt-8 text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.16] tracking-[-0.035em]"
          data-reveal
          data-delay="1"
        >
          {{ profile.name }}
          <span class="mt-2 block text-lg font-normal text-ink-soft md:text-xl">
            {{ profile.role }} · {{ profile.cohort }}
          </span>
        </h1>

        <div class="mt-8 max-w-2xl space-y-4" data-reveal data-delay="2">
          <p v-for="paragraph in about.paragraphs" :key="paragraph" class="text-sm leading-8 text-ink-soft">
            {{ paragraph }}
          </p>
        </div>

        <div class="mt-8 flex flex-wrap items-center gap-3" data-reveal data-delay="3">
          <a :href="`mailto:${profile.email}`" class="btn-solid">
            {{ profile.email }}
            <span aria-hidden="true">→</span>
          </a>
          <RouterLink to="/#work" class="btn-ghost">
            回到项目
            <span aria-hidden="true">↑</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 数据 -->
    <section class="border-b border-line" aria-label="基本信息">
      <div class="mx-auto grid max-w-[1180px] grid-cols-2 gap-px bg-line lg:grid-cols-4">
        <div
          v-for="(fact, index) in facts"
          :key="fact.label"
          class="bg-paper px-6 py-7 md:px-8"
          data-reveal
          :data-delay="index > 0 ? String(index) : undefined"
        >
          <p class="mono-label">{{ fact.label }}</p>
          <p class="mt-3 font-mono text-lg font-semibold tabular-nums tracking-tight text-ink">
            {{ fact.value }}
          </p>
          <p class="mt-1.5 text-[11px] leading-5 text-ink-mute">{{ fact.note }}</p>
        </div>
      </div>
    </section>

    <!-- 实习经历 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
        <p class="mono-label" data-reveal>01 / Experience</p>
        <h2 class="section-title" data-reveal>实习经历</h2>

        <div class="mt-12 border-t border-line">
          <article
            v-for="job in experience"
            :key="job.company"
            class="grid gap-5 border-b border-line py-9 lg:grid-cols-[210px_1fr] lg:gap-10"
            data-reveal
          >
            <div>
              <p class="whitespace-nowrap font-mono text-[11px] tracking-[0.08em] text-ink-mute">
                {{ job.period }}
              </p>
              <p class="mt-2 text-sm leading-6 text-ink">{{ job.company }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold tracking-tight">{{ job.role }}</h3>
              <p class="mt-2 text-sm leading-7 text-ink-soft">{{ job.summary }}</p>
              <ul class="mt-4 space-y-2">
                <li
                  v-for="point in job.points"
                  :key="point"
                  class="flex gap-3 text-[13px] leading-6 text-ink-soft"
                >
                  <span class="mt-2.5 h-px w-3 shrink-0 bg-accent/60" aria-hidden="true"></span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 教育 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p class="mono-label">02 / Education</p>
            <h2 class="section-title">教育经历</h2>

            <div v-for="item in education" :key="item.school" class="mt-10 border-t border-line pt-6">
              <div class="flex items-baseline justify-between gap-4">
                <h3 class="text-lg font-semibold tracking-tight">{{ item.school }}</h3>
                <p class="shrink-0 font-mono text-[11px] text-ink-mute">{{ item.period }}</p>
              </div>
              <p class="mt-2 text-sm text-ink-soft">{{ item.degree }}</p>
              <p class="mt-3 text-[13px] leading-6 text-ink-mute">{{ item.note }}</p>
            </div>
          </div>

          <div data-reveal data-delay="1">
            <p class="mono-label">03 / Honors</p>
            <h2 class="section-title">荣誉与成绩</h2>

            <ul class="mt-10 border-t border-line">
              <li
                v-for="honor in honors"
                :key="honor"
                class="flex items-center gap-3 border-b border-line py-4 text-sm text-ink-soft"
              >
                <span class="font-mono text-[10px] text-accent" aria-hidden="true">●</span>
                {{ honor }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-20">
        <p class="mono-label" data-reveal>04 / Stack</p>
        <h2 class="section-title" data-reveal>技术栈</h2>

        <div class="mt-12 grid gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <SkillGroupPanel v-for="group in skillGroups" :key="group.label" :group="group" data-reveal />
        </div>
      </div>
    </section>

    <!-- 结尾 -->
    <section class="bg-surface">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10"
      >
        <div>
          <p class="mono-label">Contact</p>
          <p class="mt-3 text-xl font-medium tracking-tight md:text-2xl">想看细节，可以直接聊。</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a :href="`mailto:${profile.email}`" class="btn-solid">
            发邮件
            <span aria-hidden="true">→</span>
          </a>
          <a
            v-for="resume in profile.resumes"
            :key="resume.href"
            :href="resume.href"
            target="_blank"
            rel="noreferrer"
            download
            class="btn-ghost"
          >
            {{ resume.label }}
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
