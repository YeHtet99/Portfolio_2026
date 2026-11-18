const BOOT_KEY = 'ymh-studio-boot-seen'

export function shouldPlayBootSequence() {
  if (typeof window === 'undefined') return false
  try {
    return window.sessionStorage.getItem(BOOT_KEY) !== 'true'
  } catch {
    return false
  }
}

export function markBootSequenceSeen() {
  try {
    window.sessionStorage.setItem(BOOT_KEY, 'true')
  } catch {
    // Session storage is optional; the animation still remains functional.
  }
}
