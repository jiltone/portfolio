import { useEffect, useRef } from 'react'

/**
 * useScrollProgress
 * Returns a ref whose `.current` value is updated (0 → 1) as the
 * user scrolls from the top of the page to the bottom.
 * Also returns per-section progress refs for 4 sections.
 */
export function useScrollProgress() {
  const progress = useRef(0)
  const sectionProgress = useRef([0, 0, 0, 0])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      progress.current = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

      // Per-section (4 sections each ~100vh)
      const sectionH = window.innerHeight
      for (let i = 0; i < 4; i++) {
        const start = i * sectionH
        const end = (i + 1) * sectionH
        sectionProgress.current[i] = Math.max(
          0,
          Math.min(1, (scrollTop - start) / sectionH)
        )
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, sectionProgress }
}
