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
const heroStyle = computed<Record<string, string>>(() => ({
  '--atmo-sky-top': themeStyle.value['--atmo-sky-top'] ?? '#07151c',
  '--atmo-panel': 'rgb(6 20 27 / 64%)',
  '--atmo-ink': '#effffb',
  '--atmo-muted': '#b5ccc9',
  '--atmo-accent': '#71f7df',
  '--atmo-line': 'rgb(207 255 246 / 20%)',
  '--atmo-focus': '#9effed',
}))
const chromeStyle: Record<string, string> = {
  '--chrome-bg': '#07151c',
  '--chrome-ink': '#effffb',
  '--chrome-line': 'rgb(207 255 246 / 18%)',
  '--chrome-accent': '#71f7df',
}

watch(
  themeStyle,
  () => {
    if (hero.value?.dataset.chromeActive === 'true') emit('chromeState', { active: true, style: chromeStyle })
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
      emit('chromeState', { active, style: active ? chromeStyle : {} })
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
  <section ref="hero" class="weather-hero" :style="heroStyle">
    <div class="atmosphere" aria-hidden="true">
      <div class="anime-wallpaper"></div>
      <div class="wallpaper-shade"></div>
      <div class="atmosphere-grid"></div>
      <div class="scanlines"></div>
      <div class="light-leak"></div>
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
  position: relative;
  min-height: calc(100svh - 4rem);
  overflow: hidden;
  border-bottom: 1px solid var(--atmo-line);
  background: #061118;
  color: var(--atmo-ink);
  isolation: isolate;
}

.atmosphere,
.anime-wallpaper,
.wallpaper-shade,
.atmosphere-grid,
.scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.anime-wallpaper {
  inset: -1.5rem;
  background-image: url('/anime-wallpaper.png');
  background-position: center 36%;
  background-size: cover;
  filter: saturate(0.78) contrast(1.04);
  transform: scale(1.025);
  animation: wallpaper-breathe 18s ease-in-out infinite alternate;
}

.wallpaper-shade {
  background:
    linear-gradient(90deg, rgb(3 12 17 / 96%) 0%, rgb(4 15 21 / 88%) 30%, rgb(5 17 24 / 54%) 58%, rgb(3 11 17 / 58%) 100%),
    linear-gradient(180deg, rgb(2 8 13 / 42%) 0%, rgb(3 12 18 / 16%) 45%, rgb(3 12 18 / 82%) 100%),
    color-mix(in oklch, var(--atmo-sky-top) 18%, transparent);
}

.atmosphere-grid {
  opacity: 0.28;
  background-image:
    linear-gradient(to right, rgb(173 255 239 / 12%) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(173 255 239 / 10%) 1px, transparent 1px);
  background-size: 76px 76px;
  mask-image: linear-gradient(90deg, black, transparent 72%);
}

.scanlines {
  opacity: 0.11;
  background-image: repeating-linear-gradient(to bottom, transparent 0 3px, rgb(185 255 244 / 30%) 4px);
  mix-blend-mode: screen;
}

.light-leak {
  position: absolute;
  top: -18%;
  right: 7%;
  width: 40vw;
  aspect-ratio: 1;
  border-radius: 50%;
  background: color-mix(in oklch, var(--atmo-accent) 18%, transparent);
  filter: blur(90px);
  opacity: 0.5;
}

.weather-shell { position: relative; z-index: 2; width: 100%; max-width: min(1180px, 100vw); overflow: hidden; box-sizing: border-box; }
.hero-topline { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem 2rem; }
.weather-label { font-family: var(--font-mono); font-size: 0.625rem; line-height: 1.4; letter-spacing: 0.18em; text-transform: uppercase; color: var(--atmo-muted); }
.system-readout { display: inline-flex; align-items: center; gap: 0.65rem; border: 1px solid var(--atmo-line); border-radius: 999px; background: rgb(3 14 20 / 42%); padding: 0.55rem 0.8rem; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.14em; color: var(--atmo-muted); backdrop-filter: blur(10px); }
.system-pulse { color: var(--atmo-accent); animation: system-breathe 3s ease-in-out infinite; }
.hero-layout { display: grid; min-width: 0; gap: 2rem; margin-top: clamp(2rem, 5vh, 4.5rem); }
.hero-copy,
.reading-plane,
.weather-console { min-width: 0; }
.reading-plane { max-width: 780px; padding: clamp(1rem, 3vw, 2.5rem) 0; text-shadow: 0 2px 22px rgb(0 0 0 / 48%); }
.reading-plane h1 { margin-top: 1.25rem; font-size: clamp(2.8rem, 7vw, 6.5rem); font-weight: 680; line-height: 0.98; letter-spacing: -0.058em; }
.reading-plane h1 em { color: var(--atmo-accent); font-style: normal; text-shadow: 0 0 34px color-mix(in oklch, var(--atmo-accent) 32%, transparent); }
.hero-subline { margin-top: 2rem; max-width: 38rem; font-size: clamp(1rem, 1.6vw, 1.125rem); line-height: 2; color: #f4fffd; }
.hero-bio { margin-top: 0.75rem; max-width: 38rem; font-size: 0.875rem; line-height: 2; color: var(--atmo-muted); }
.weather-button { display: inline-flex; align-items: center; gap: 0.6rem; border: 1px solid var(--atmo-line); border-radius: 999px; padding: 0.8rem 1.2rem; font-size: 0.875rem; line-height: 1; backdrop-filter: blur(12px); transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease; }
.weather-button:hover { transform: translateY(-2px); }
.weather-button-solid { border-color: var(--atmo-accent); background: var(--atmo-accent); color: #06201d; text-shadow: none; }
.weather-button-ghost { background: rgb(3 14 20 / 42%); color: var(--atmo-ink); }
.weather-button-ghost:hover { border-color: var(--atmo-accent); }
.hero-facts { display: grid; gap: 1rem; max-width: 42rem; margin-top: 2rem; padding-top: 1.25rem; border-top: 1px solid var(--atmo-line); }
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
@media (min-width: 1024px) { .hero-layout { grid-template-columns: minmax(0, 1.3fr) minmax(300px, 0.56fr); align-items: center; gap: clamp(1.5rem, 4vw, 4rem); } }
@media (max-width: 639px) {
  .weather-hero { min-height: auto; }
  .weather-shell { padding-top: 1.5rem; padding-bottom: 3rem; }
  .hero-topline { margin-bottom: 0.5rem; }
  .anime-wallpaper { inset: 0; background-position: 58% center; transform: none; }
  .wallpaper-shade {
    background:
      linear-gradient(180deg, rgb(3 12 17 / 67%) 0%, rgb(4 15 21 / 76%) 42%, rgb(3 12 18 / 96%) 100%),
      linear-gradient(90deg, rgb(3 12 17 / 72%), rgb(3 12 17 / 28%));
  }
  .reading-plane { max-height: none; padding: 1rem 0; }
  .reading-plane h1 { max-width: 10ch; }
  .hero-subline,
  .hero-bio { max-width: 100%; overflow-wrap: anywhere; }
  .weather-button { max-width: 100%; }
  .weather-button-ghost { white-space: normal; }
  .weather-console { width: 100%; padding: 1.25rem; backdrop-filter: blur(12px); }
  .hero-bio { line-height: 1.85; }
}
@media (prefers-reduced-motion: reduce) { .anime-wallpaper, .system-pulse { animation: none; } }

@keyframes wallpaper-breathe { to { transform: scale(1.055) translate3d(-0.4%, -0.25%, 0); } }
@keyframes system-breathe { 50% { opacity: 0.35; } }
</style>
