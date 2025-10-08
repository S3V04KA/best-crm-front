export type Theme = 'light' | 'dark'

export function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem('theme')
    if (t === 'light' || t === 'dark') return t
    return null
  } catch {
    return null
  }
}

export function applyTheme(theme: Theme) {
  const isDark = theme === 'dark'
  const root = document.documentElement
  root.classList.toggle('dark', isDark)
  // синхронизируем color-scheme для системных контролов
  root.style.colorScheme = isDark ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {}
  applyTheme(theme)
}

export function initTheme() {
  const stored = getStoredTheme()
  if (stored) {
    applyTheme(stored)
    return stored
  }
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const initial: Theme = prefersDark ? 'dark' : 'light'
  applyTheme(initial)
  return initial
}
