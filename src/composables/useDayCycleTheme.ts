import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export type DayCycleMode = 'live' | 'manual'

type Oklch = [lightness: number, chroma: number, hue: number, alpha?: number]
type ThemeKey =
  | 'skyTop'
  | 'skyBottom'
  | 'horizon'
  | 'cloudFar'
  | 'cloudNear'
  | 'grid'
  | 'panel'
  | 'ink'
  | 'muted'
  | 'accent'
  | 'line'
  | 'focus'

interface DayAnchor {
  minute: number
  label: string
  colors: Record<ThemeKey, Oklch>
}

const DAY_MINUTES = 1440
const anchors: DayAnchor[] = [
  {
    minute: 360,
    label: 'Morning',
    colors: {
      skyTop: [0.79, 0.038, 185],
      skyBottom: [0.88, 0.047, 78],
      horizon: [0.82, 0.067, 74],
      cloudFar: [0.9, 0.018, 160, 0.58],
      cloudNear: [0.95, 0.012, 120, 0.82],
      grid: [0.52, 0.035, 185, 0.2],
      panel: [0.96, 0.012, 100, 0.9],
      ink: [0.24, 0.024, 175],
      muted: [0.42, 0.025, 175],
      accent: [0.39, 0.072, 178],
      line: [0.76, 0.025, 175, 0.78],
      focus: [0.45, 0.11, 178],
    },
  },
  {
    minute: 720,
    label: 'Midday',
    colors: {
      skyTop: [0.75, 0.068, 203],
      skyBottom: [0.9, 0.025, 155],
      horizon: [0.87, 0.039, 150],
      cloudFar: [0.9, 0.02, 190, 0.58],
      cloudNear: [0.97, 0.01, 140, 0.88],
      grid: [0.49, 0.05, 190, 0.2],
      panel: [0.97, 0.012, 145, 0.91],
      ink: [0.23, 0.025, 175],
      muted: [0.41, 0.03, 175],
      accent: [0.42, 0.09, 178],
      line: [0.76, 0.03, 180, 0.8],
      focus: [0.43, 0.12, 178],
    },
  },
  {
    minute: 1020,
    label: 'Afternoon',
    colors: {
      skyTop: [0.7, 0.036, 184],
      skyBottom: [0.73, 0.09, 62],
      horizon: [0.71, 0.113, 60],
      cloudFar: [0.77, 0.034, 63, 0.54],
      cloudNear: [0.88, 0.031, 72, 0.8],
      grid: [0.42, 0.04, 178, 0.22],
      panel: [0.95, 0.026, 75, 0.91],
      ink: [0.23, 0.027, 170],
      muted: [0.42, 0.03, 165],
      accent: [0.37, 0.07, 174],
      line: [0.73, 0.035, 100, 0.82],
      focus: [0.43, 0.105, 174],
    },
  },
  {
    minute: 1320,
    label: 'Night',
    colors: {
      skyTop: [0.18, 0.032, 190],
      skyBottom: [0.3, 0.052, 187],
      horizon: [0.36, 0.063, 182],
      cloudFar: [0.38, 0.042, 185, 0.48],
      cloudNear: [0.46, 0.045, 180, 0.68],
      grid: [0.72, 0.035, 175, 0.15],
      panel: [0.94, 0.018, 145, 0.92],
      ink: [0.22, 0.025, 175],
      muted: [0.42, 0.03, 175],
      accent: [0.42, 0.08, 176],
      line: [0.75, 0.025, 175, 0.75],
      focus: [0.72, 0.09, 170],
    },
  },
]

const clampMinute = (value: number) => Math.min(DAY_MINUTES, Math.max(0, Math.round(value)))
const smoothstep = (value: number) => value * value * (3 - 2 * value)

const mixColor = (from: Oklch, to: Oklch, progress: number) => {
  const hueDelta = ((to[2] - from[2] + 540) % 360) - 180
  const alpha = (from[3] ?? 1) + ((to[3] ?? 1) - (from[3] ?? 1)) * progress
  const lightness = from[0] + (to[0] - from[0]) * progress
  const chroma = from[1] + (to[1] - from[1]) * progress
  const hue = from[2] + hueDelta * progress
  return `oklch(${lightness.toFixed(4)} ${chroma.toFixed(4)} ${hue.toFixed(2)} / ${alpha.toFixed(3)})`
}

const localMinute = () => {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

const findSegment = (minute: number) => {
  const normalized = minute === DAY_MINUTES ? 0 : minute
  let sample = normalized
  if (sample < anchors[0]!.minute) sample += DAY_MINUTES

  const extended = [...anchors, { ...anchors[0]!, minute: anchors[0]!.minute + DAY_MINUTES }]
  let left = extended[0]!
  let right = extended[1]!

  for (let index = 0; index < extended.length - 1; index += 1) {
    if (sample >= extended[index]!.minute && sample <= extended[index + 1]!.minute) {
      left = extended[index]!
      right = extended[index + 1]!
      break
    }
  }

  const linear = (sample - left.minute) / (right.minute - left.minute)
  return { left, right, linear, eased: smoothstep(linear) }
}

export const useDayCycleTheme = () => {
  const minute = ref(localMinute())
  const mode = ref<DayCycleMode>('live')
  let timer: ReturnType<typeof setInterval> | undefined

  const segment = computed(() => findSegment(minute.value))
  const timeLabel = computed(() => {
    const value = clampMinute(minute.value)
    if (value === DAY_MINUTES) return '24:00'
    return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`
  })
  const phaseLabel = computed(() => {
    const { left, right, linear } = segment.value
    return `${left.label} → ${right.label} / ${Math.round(linear * 100)}%`
  })

  const themeStyle = computed<Record<string, string>>(() => {
    const { left, right, eased } = segment.value
    const entries = (Object.keys(left.colors) as ThemeKey[]).map((key) => [
      `--atmo-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`,
      mixColor(left.colors[key], right.colors[key], eased),
    ])
    return Object.fromEntries(entries)
  })

  const syncLocalTime = () => {
    if (mode.value === 'live') minute.value = localMinute()
  }

  const setManualMinute = (value: number) => {
    mode.value = 'manual'
    minute.value = clampMinute(value)
  }

  const resumeLocalTime = () => {
    mode.value = 'live'
    minute.value = localMinute()
  }

  const handleSliderKeydown = (event: KeyboardEvent) => {
    const increment = event.shiftKey ? 60 : 15
    let next = minute.value
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') next -= increment
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next += increment
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = DAY_MINUTES
    else return

    event.preventDefault()
    setManualMinute(next)
  }

  const handleVisibility = () => {
    if (!document.hidden) syncLocalTime()
  }

  onMounted(() => {
    syncLocalTime()
    timer = setInterval(syncLocalTime, 60_000)
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
    document.removeEventListener('visibilitychange', handleVisibility)
  })

  return {
    minute,
    mode,
    timeLabel,
    phaseLabel,
    themeStyle,
    setManualMinute,
    resumeLocalTime,
    handleSliderKeydown,
  }
}
