<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDayCycleTheme } from '@/composables/useDayCycleTheme'
import { profile, type Project } from '@/data/profile'

export interface ChromeState {
  active: boolean
  style: Record<string, string>
}

const props = defineProps<{
  projectCount: number
  primaryResume?: { label: string; href: string }
  resumeFeedback: string
}>()

const emit = defineEmits<{
  chromeState: [state: ChromeState]
  resumeDownload: []
}>()

const hero = ref<HTMLElement | null>(null)
const { minute, mode, timeLabel, phaseLabel, themeStyle, setManualMinute, resumeLocalTime, handleSliderKeydown } =
  useDayCycleTheme()
let observer: IntersectionObserver | undefined

const projectCountLabel = computed(() => `${props.projectCount} 个精选案例`)
const chromeUsesDarkInk = computed(() => {
  const value = minute.value === 1440 ? 0 : minute.value
  return value >= 300 && value < 1170
})
const chromeStyle = computed<Record<string, string>>(() => ({
  '--chrome-bg': themeStyle.value['--atmo-sky-top'] ?? '#afc8c4',
  '--chrome-ink': chromeUsesDarkInk.value ? '#102522' : '#f2f3ee',
  '--chrome-line': chromeUsesDarkInk.value ? 'rgb(16 37 34 / 32%)' : 'rgb(242 243 238 / 32%)',
  '--chrome-accent': chromeUsesDarkInk.value
    ? (themeStyle.value['--atmo-accent'] ?? '#16544f')
    : (themeStyle.value['--atmo-cloud-near'] ?? '#edf0e7'),
}))

watch(
  chromeStyle,
  (style) => {
    if (hero.value?.dataset.chromeActive === 'true') emit('chromeState', { active: true, style })
  },
  { deep: true },
)

const handleRangeInput = (event: Event) => {
  setManualMinute(Number((event.target as HTMLInputElement).value))
}

onMounted(() => {
  if (!hero.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    ([entry]) => {
      const active = Boolean(entry?.isIntersecting)
      if (hero.value) hero.value.dataset.chromeActive = String(active)
      emit('chromeState', { active, style: active ? chromeStyle.value : {} })
    },
    { rootMargin: '-64px 0px 0px', threshold: 0 },
  )
  observer.observe(hero.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  emit('chromeState', { active: false, style: {} })
})
</script>

<template>
  <section ref="hero" class="weather-hero" :style="themeStyle">
    <div class="atmosphere" aria-hidden="true">
      <div class="atmosphere-grid"></div>
      <svg class="isobars" viewBox="0 0 1440 760" preserveAspectRatio="none">
        <path d="M-80 520C190 270 310 220 610 392S1070 620 1510 208" />
        <path d="M-70 625C230 350 420 335 690 470s430 128 810-176" />
        <path d="M180-40c210 168 290 290 390 520s286 288 720 126" />
      </svg>
      <div class="orb"></div>
      <div class="cloud cloud-far cloud-far-a"></div>
      <div class="cloud cloud-far cloud-far-b"></div>
      <div class="cloud cloud-near cloud-near-a"></div>
      <div class="cloud cloud-near cloud-near-b"></div>
      <div class="horizon"></div>
    </div>

    <span class="hero-coordinate hidden lg:block" aria-hidden="true">LOCAL ATMOSPHERE / 24H</span>

    <div class="weather-shell mx-auto max-w-[1180px] px-6 py-10 md:px-10 md:py-14">
      <div class="hero-topline" data-reveal>
        <p class="weather-label flex items-center gap-3">
          <span class="h-px w-8 bg-current" aria-hidden="true"></span>
          Portfolio / {{ profile.updated }}
        </p>
        <div class="system-readout" aria-label="当前求职状态">
          <span class="status-dot system-pulse" aria-hidden="true"></span>
          <span>{{ profile.availability }}</span>
          <span aria-hidden="true">/</span>
          <span>{{ profile.openTo }}</span>
        </div>
      </div>

      <div class="hero-layout">
        <div class="hero-copy">
          <div class="reading-plane">
            <p class="weather-label">Engineering weather / {{ phaseLabel }}</p>
            <h1 data-reveal data-delay="1">
              <span class="block">{{ profile.headline.lead }}</span>
              <span class="block"><em>{{ profile.headline.accent }}</em>{{ profile.headline.tail }}</span>
            </h1>
            <p class="hero-subline" data-reveal data-delay="2">{{ profile.subline }}</p>
            <p class="hero-bio" data-reveal data-delay="2">{{ profile.bio }}</p>

            <div class="mt-8 flex flex-wrap items-center gap-3" data-reveal data-delay="3">
              <a href="#work" class="weather-button weather-button-solid">查看精选项目 <span aria-hidden="true">↓</span></a>
              <a
                v-if="primaryResume"
                :href="primaryResume.href"
                target="_blank"
                rel="noreferrer"
                download
                class="weather-button weather-button-ghost"
                @click="emit('resumeDownload')"
              >
                {{ resumeFeedback }} · {{ primaryResume.label }} <span aria-hidden="true">↓</span>
              </a>
            </div>

            <dl class="hero-facts" data-reveal data-delay="4">
              <div><dt>精选案例</dt><dd>{{ projectCountLabel }}</dd></div>
              <div><dt>求职方向</dt><dd>{{ profile.openTo }}</dd></div>
              <div><dt>到岗时间</dt><dd>{{ profile.notice }}</dd></div>
            </dl>
          </div>
        </div>

        <aside class="weather-console" data-reveal data-delay="3" aria-label="24 小时时间与个人资料控制台">
          <div class="console-heading">
            <span>Atmosphere / 024</span>
            <span class="inline-flex items-center gap-2"><span class="status-dot" aria-hidden="true"></span>{{ mode }}</span>
          </div>

          <div class="time-display">
            <p>{{ timeLabel }}</p>
            <span>{{ phaseLabel }}</span>
          </div>

          <label class="weather-label" for="day-cycle">手动调节一天 24 小时</label>
          <input
            id="day-cycle"
            class="day-cycle"
            type="range"
            min="0"
            max="1440"
            step="1"
            :value="minute"
            :aria-valuetext="`${timeLabel}，${phaseLabel}`"
            @input="handleRangeInput"
            @keydown="handleSliderKeydown"
          />
          <div class="time-ticks" aria-hidden="true">
            <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
          </div>

          <button v-if="mode === 'manual'" type="button" class="resume-time" @click="resumeLocalTime">
            回到当前时间 <span aria-hidden="true">↺</span>
          </button>
          <p v-else class="live-time"><span class="status-dot" aria-hidden="true"></span>按本地时间实时校准</p>

          <div class="identity-block">
            <p>{{ profile.pinyin }}</p>
            <strong>{{ profile.name }}</strong>
            <span>{{ profile.role }}</span>
          </div>

          <dl class="console-stats">
            <div><dt>学校</dt><dd>{{ profile.education.split(' · ')[0] }}</dd></div>
            <div><dt>项目</dt><dd>{{ profile.stats.projects }} 个</dd></div>
            <div><dt>专业排名</dt><dd>{{ profile.stats.ranking }}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.weather-hero {
  --atmo-sky-top: #afc8c4;
  --atmo-sky-bottom: #e2cfad;
  --atmo-horizon: #c99c72;
  --atmo-cloud-far: rgb(237 240 231 / 58%);
  --atmo-cloud-near: rgb(244 246 239 / 84%);
  --atmo-grid: rgb(18 63 59 / 18%);
  --atmo-panel: rgb(242 243 238 / 91%);
  --atmo-ink: #152523;
  --atmo-muted: #4d615d;
  --atmo-accent: #16544f;
  --atmo-line: rgb(100 130 124 / 75%);
  position: relative;
  min-height: calc(100svh - 4rem);
  overflow: hidden;
  border-bottom: 1px solid var(--atmo-line);
  background: linear-gradient(180deg, var(--atmo-sky-top), var(--atmo-sky-bottom) 74%, var(--atmo-horizon));
  color: var(--atmo-ink);
  transition: background 180ms linear, color 180ms linear;
  isolation: isolate;
}

.atmosphere,
.atmosphere-grid,
.horizon {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.atmosphere-grid {
  background-image: linear-gradient(to right, var(--atmo-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--atmo-grid) 1px, transparent 1px);
  background-size: 76px 76px;
  mask-image: linear-gradient(to bottom, black, transparent 82%);
}

.isobars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--atmo-grid);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.orb {
  position: absolute;
  top: 13%;
  right: 12%;
  width: clamp(44px, 7vw, 92px);
  aspect-ratio: 1;
  border: 1px solid var(--atmo-line);
  border-radius: 50%;
  background: color-mix(in oklch, var(--atmo-cloud-near) 78%, transparent);
  box-shadow: 0 0 48px color-mix(in oklch, var(--atmo-cloud-near) 48%, transparent);
}

.cloud {
  position: absolute;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  background: inherit;
}

.cloud-far { width: 260px; height: 58px; background: var(--atmo-cloud-far); }
.cloud-near { width: 390px; height: 92px; background: var(--atmo-cloud-near); }
.cloud::before { width: 42%; height: 190%; left: 17%; bottom: 0; }
.cloud::after { width: 52%; height: 235%; right: 6%; bottom: -4%; }
.cloud-far-a { top: 19%; left: -4%; animation: cloud-drift 28s ease-in-out infinite alternate; }
.cloud-far-b { top: 38%; right: -5%; transform: scale(0.72); animation: cloud-drift-reverse 34s ease-in-out infinite alternate; }
.cloud-near-a { right: 9%; bottom: -3%; transform: scale(1.25); }
.cloud-near-b { left: -10%; bottom: 3%; transform: scale(0.88); }
.horizon { top: auto; height: 18%; background: linear-gradient(to top, var(--atmo-horizon), transparent); opacity: 0.48; }

.weather-shell { position: relative; z-index: 2; }
.hero-topline { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem 2rem; }
.weather-label { font-family: var(--font-mono); font-size: 0.625rem; line-height: 1.4; letter-spacing: 0.18em; text-transform: uppercase; color: var(--atmo-muted); }
.system-readout { display: inline-flex; align-items: center; gap: 0.65rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--atmo-muted); }
.system-pulse { color: var(--atmo-accent); animation: system-breathe 3s ease-in-out infinite; }
.hero-layout { display: grid; gap: 2rem; margin-top: clamp(2rem, 5vh, 4.5rem); }
.reading-plane { max-width: 690px; border: 1px solid var(--atmo-line); border-radius: 1.75rem 1.75rem 4.5rem 1.75rem; background: var(--atmo-panel); padding: clamp(1.5rem, 4vw, 3.2rem); box-shadow: 0 24px 80px rgb(18 40 38 / 10%); backdrop-filter: blur(12px); }
.reading-plane h1 { margin-top: 1.25rem; font-size: clamp(2.3rem, 5.6vw, 4.75rem); font-weight: 650; line-height: 1.08; letter-spacing: -0.048em; }
.reading-plane h1 em { color: var(--atmo-accent); font-style: normal; }
.hero-subline { margin-top: 1.8rem; max-width: 36rem; font-size: clamp(1rem, 1.6vw, 1.125rem); line-height: 2; }
.hero-bio { margin-top: 0.75rem; max-width: 38rem; font-size: 0.875rem; line-height: 2; color: var(--atmo-muted); }
.weather-button { display: inline-flex; align-items: center; gap: 0.6rem; border: 1px solid var(--atmo-accent); border-radius: 999px; padding: 0.8rem 1.2rem; font-size: 0.875rem; line-height: 1; }
.weather-button-solid { background: var(--atmo-accent); color: var(--atmo-panel); }
.weather-button-ghost { color: var(--atmo-ink); }
.hero-facts { display: grid; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--atmo-line); }
.hero-facts dt { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--atmo-muted); }
.hero-facts dd { margin-top: 0.4rem; font-size: 0.8rem; color: var(--atmo-ink); }

.weather-console { position: relative; align-self: center; border: 1px solid var(--atmo-line); border-radius: 2.5rem 2.5rem 1.25rem 2.5rem; background: var(--atmo-panel); padding: 1.5rem; box-shadow: 0 28px 90px rgb(10 29 29 / 14%); backdrop-filter: blur(18px); }
.weather-console::before, .weather-console::after { content: ''; position: absolute; width: 16px; height: 16px; }
.weather-console::before { top: -1px; left: -1px; border-top: 2px solid var(--atmo-accent); border-left: 2px solid var(--atmo-accent); }
.weather-console::after { right: -1px; bottom: -1px; border-right: 2px solid var(--atmo-accent); border-bottom: 2px solid var(--atmo-accent); }
.console-heading { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 0.85rem; border-bottom: 1px solid var(--atmo-line); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--atmo-muted); }
.console-heading span:last-child { color: var(--atmo-accent); }
.time-display { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin: 1.7rem 0 1.4rem; }
.time-display p { font-family: var(--font-mono); font-size: clamp(2.25rem, 5vw, 3.5rem); font-weight: 600; line-height: 1; letter-spacing: -0.06em; color: var(--atmo-ink); }
.time-display span { max-width: 11rem; text-align: right; font-family: var(--font-mono); font-size: 9px; line-height: 1.7; letter-spacing: 0.1em; text-transform: uppercase; color: var(--atmo-muted); }
.day-cycle { width: 100%; height: 44px; margin-top: 0.55rem; appearance: none; background: transparent; cursor: ew-resize; }
.day-cycle::-webkit-slider-runnable-track { height: 2px; background: linear-gradient(90deg, var(--atmo-line), var(--atmo-accent), var(--atmo-line)); }
.day-cycle::-webkit-slider-thumb { width: 18px; height: 18px; margin-top: -8px; appearance: none; border: 4px solid var(--atmo-panel); border-radius: 50%; background: var(--atmo-accent); box-shadow: 0 0 0 1px var(--atmo-accent); }
.day-cycle::-moz-range-track { height: 2px; background: var(--atmo-line); }
.day-cycle::-moz-range-thumb { width: 12px; height: 12px; border: 4px solid var(--atmo-panel); border-radius: 50%; background: var(--atmo-accent); box-shadow: 0 0 0 1px var(--atmo-accent); }
.day-cycle:focus-visible { outline-color: var(--atmo-focus); }
.time-ticks { display: flex; justify-content: space-between; margin-top: -0.45rem; font-family: var(--font-mono); font-size: 8px; color: var(--atmo-muted); }
.resume-time, .live-time { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 44px; margin-top: 0.7rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--atmo-accent); }
.identity-block { margin-top: 1.5rem; padding: 1.25rem 0; border-block: 1px solid var(--atmo-line); }
.identity-block p { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.24em; color: var(--atmo-muted); }
.identity-block strong { display: block; margin-top: 0.65rem; font-size: clamp(2rem, 5vw, 3rem); line-height: 1; letter-spacing: -0.045em; }
.identity-block > span { display: block; margin-top: 0.65rem; font-size: 0.8rem; color: var(--atmo-muted); }
.console-stats { display: grid; gap: 0.7rem; margin-top: 1.2rem; }
.console-stats > div { display: flex; justify-content: space-between; gap: 1rem; font-size: 0.75rem; }
.console-stats dt { color: var(--atmo-muted); }
.console-stats dd { text-align: right; }
.hero-coordinate { position: absolute; z-index: 2; top: 50%; left: 12px; transform: translateY(-50%); writing-mode: vertical-rl; font-family: var(--font-mono); font-size: 8px; letter-spacing: 0.18em; color: var(--atmo-muted); opacity: 0.48; }

@media (min-width: 440px) { .hero-facts { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .hero-layout { grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.72fr); align-items: center; gap: clamp(2rem, 5vw, 5rem); } }
@media (max-width: 639px) { .weather-hero { min-height: auto; } .weather-shell { padding-top: 1.5rem; padding-bottom: 3rem; } .hero-topline { margin-bottom: 0.5rem; } .reading-plane, .weather-console { padding: 1.25rem; backdrop-filter: blur(8px); } .reading-plane { max-height: none; } .cloud-near-a { right: -45%; } .hero-bio { line-height: 1.85; } }
@media (prefers-reduced-motion: reduce) { .weather-hero { transition: none; } .cloud, .system-pulse { animation: none; } }

@keyframes cloud-drift { to { transform: translate3d(42px, 8px, 0); } }
@keyframes cloud-drift-reverse { to { transform: translate3d(-36px, -6px, 0) scale(0.72); } }
@keyframes system-breathe { 50% { opacity: 0.35; } }
</style>
