import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

const clamp = (value: number) => Math.min(1, Math.max(0, value))

export const useElementProgress = (target: Ref<HTMLElement | null>) => {
  const progress = ref(0)
  const isInView = ref(false)
  const reducedMotion = ref(false)
  let observer: IntersectionObserver | undefined
  let frame = 0

  const measure = () => {
    frame = 0
    if (!target.value || !isInView.value || reducedMotion.value) return
    const rect = target.value.getBoundingClientRect()
    progress.value = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height))
  }

  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.value || typeof IntersectionObserver === 'undefined') return

    observer = new IntersectionObserver(
      ([entry]) => {
        isInView.value = Boolean(entry?.isIntersecting)
        if (isInView.value) schedule()
      },
      { rootMargin: '25% 0px', threshold: 0 },
    )
    if (target.value) observer.observe(target.value)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (frame) cancelAnimationFrame(frame)
  })

  return { progress, isInView, reducedMotion }
}
