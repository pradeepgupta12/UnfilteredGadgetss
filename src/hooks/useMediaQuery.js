// hooks/useMediaQuery.js
// ─── Modern matchMedia-based hook ─────────────────────────────────────────────
// Why better than useWindowSize:
//  • Uses matchMedia — browser fires only when breakpoint CROSSES, not every pixel
//  • Zero resize event listeners — no debounce needed
//  • SSR-safe — no window access on server
//  • React 18 useSyncExternalStore — concurrent-mode safe, no tearing
import { useSyncExternalStore, useCallback } from 'react'

// Tailwind-aligned breakpoints
const BREAKPOINTS = {
  sm:  '(min-width: 640px)',
  md:  '(min-width: 768px)',
  lg:  '(min-width: 1024px)',
  xl:  '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
}

/**
 * useMediaQuery — primitive hook
 * @param {string} query  CSS media query string
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (cb) => {
      // SSR guard — no window on server
      if (typeof window === 'undefined') return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    [query]
  )

  const getSnapshot = useCallback(
    () => {
      if (typeof window === 'undefined') return false
      return window.matchMedia(query).matches
    },
    [query]
  )

  // Server snapshot — always false (SSR safe)
  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/**
 * useBreakpoint — high-level responsive hook
 * Matches Tailwind breakpoints exactly
 * @returns {{ isMobile, isTablet, isDesktop, isLg, isXl }}
 */
export function useBreakpoint() {
  const isSm  = useMediaQuery(BREAKPOINTS.sm)   // ≥ 640px
  const isMd  = useMediaQuery(BREAKPOINTS.md)   // ≥ 768px
  const isLg  = useMediaQuery(BREAKPOINTS.lg)   // ≥ 1024px
  const isXl  = useMediaQuery(BREAKPOINTS.xl)   // ≥ 1280px

  return {
    isMobile:  !isSm,                // < 640px
    isTablet:  isSm && !isLg,        // 640px–1023px
    isDesktop: isLg,                 // ≥ 1024px
    isSm,
    isMd,
    isLg,
    isXl,
  }
}