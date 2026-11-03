<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SkillGroupPanel from '@/components/SkillGroupPanel.vue'
import { useReveal } from '@/composables/useReveal'
import {
  about,
  certifications,
  education,
  experience,
  profile,
  skillGroups,
} from '@/data/profile'

useReveal()

const [aboutLead = '', aboutMore = ''] = about.paragraphs
const [, eduDegree = ''] = profile.education.split(' · ')
</script>

<template>
  <main id="main">
    <!-- 页头 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-16 md:px-10 md:py-24">
        <p class="mono-label" data-reveal>About / 关于</p>

        <div class="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1
            class="text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-[1.1] tracking-[-0.04em]"
            data-reveal
            data-delay="1"
          >
            关于我
          </h1>
          <p
            class="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute"
            data-reveal
            data-delay="1"
          >
            {{ profile.location }} · {{ profile.availability }}
          </p>
        </div>

        <div class="mt-10 grid max-w-4xl gap-6 md:grid-cols-2 md:gap-12">
          <p class="text-sm leading-8 text-ink-soft md:text-base" data-reveal data-delay="2">
            {{ aboutLead }}
          </p>
          <p class="text-sm leading-8 text-ink-soft md:text-base" data-reveal data-delay="3">
            {{ aboutMore }}
          </p>
        </div>
      </div>
    </section>

    <!-- 数据索引 -->
    <section class="border-b border-line">
      <dl class="mx-auto grid max-w-[1180px] grid-cols-2 gap-px bg-line md:grid-cols-4">
        <div class="bg-paper px-6 py-7 md:px-8">
          <dt class="mono-label">交付项目</dt>
          <dd class="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
            {{ profile.deliveredProjects }}
          </dd>
        </div>
        <div class="bg-paper px-6 py-7 md:px-8">
          <dt class="mono-label">开发经验</dt>
          <dd class="mt-3 text-3xl font-semibold tracking-tight">{{ profile.experience }}</dd>
        </div>
        <div class="bg-paper px-6 py-7 md:px-8">
          <dt class="mono-label">技术认证</dt>
          <dd class="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
            {{ certifications.length }} 项
          </dd>
        </div>
        <div class="bg-paper px-6 py-7 md:px-8">
          <dt class="mono-label">教育背景</dt>
          <dd class="mt-3 text-3xl font-semibold tracking-tight">{{ eduDegree }}</dd>
        </div>
      </dl>
    </section>

    <!-- 工作经历 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <div data-reveal>
          <p class="mono-label">01 / Experience</p>
          <h2 class="section-title">工作经历</h2>
        </div>

        <div class="mt-12 border-t border-line">
          <article
            v-for="job in experience"
            :key="job.company"
            class="grid gap-3 border-b border-line py-8 md:grid-cols-[170px_1fr] md:gap-10"
            data-reveal
          >
            <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute md:pt-1.5">
              {{ job.period }}
            </p>
            <div>
              <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 class="text-xl font-semibold tracking-tight">{{ job.role }}</h3>
                <span class="text-sm text-accent">{{ job.company }}</span>
              </div>
              <p class="mt-3 max-w-2xl text-sm leading-7 text-ink-soft">{{ job.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 教育与认证 -->
    <section class="border-b border-line">
      <div
        class="mx-auto grid max-w-[1180px] gap-14 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-24"
      >
        <div data-reveal>
          <p class="mono-label">02 / Education</p>
          <h2 class="section-title text-2xl md:text-3xl">教育背景</h2>

          <div class="mt-8 border-t border-line">
            <div v-for="edu in education" :key="edu.school" class="border-b border-line py-5">
              <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span class="font-medium text-ink">{{ edu.school }}</span>
                <span class="font-mono text-[10px] tracking-[0.14em] text-ink-mute">
                  {{ edu.period }}
                </span>
              </div>
              <p class="mt-1.5 text-sm text-ink-soft">{{ edu.degree }}</p>
            </div>
          </div>
        </div>

        <div data-reveal data-delay="1">
          <p class="mono-label">03 / Certifications</p>
          <h2 class="section-title text-2xl md:text-3xl">技术认证</h2>

          <ul class="mt-8 border-t border-line">
            <li
              v-for="cert in certifications"
              :key="cert"
              class="flex items-start gap-3 border-b border-line py-5 text-sm text-ink-soft"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true"></span>
              <span>{{ cert }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="border-b border-line">
      <div class="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
        <div data-reveal>
          <p class="mono-label">04 / Stack</p>
          <h2 class="section-title">技术栈</h2>
        </div>

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

    <!-- 行动区 -->
    <section class="bg-night">
      <div
        class="mx-auto flex max-w-[1180px] flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:px-10"
      >
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">Next</p>
          <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-paper">
            聊聊下一件事。
          </h2>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <a
            :href="`mailto:${profile.email}`"
            class="inline-flex items-center gap-3 bg-paper px-5 py-3 text-sm text-night transition-colors hover:bg-accent-light"
          >
            发送邮件
            <span aria-hidden="true">→</span>
          </a>
          <RouterLink
            to="/"
            class="inline-flex items-center gap-3 border border-paper/25 px-5 py-3 text-sm text-paper/85 transition-colors hover:border-paper hover:text-paper"
          >
            返回首页
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
