import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 为带有 data-reveal 属性的元素添加「进入视口后淡入上移」的揭示动画。
 * 尊重 prefers-reduced-motion：用户减少动态时直接显示内容。
 */
export function useReveal(selector = '[data-reveal]') {
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
    if (elements.length === 0) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    elements.forEach((element) => observer?.observe(element))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
