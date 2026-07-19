import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'french-succo:settings'

const defaults = {
  theme: 'auto',
  voice: 'female',
  speed: 1.0,
  region: 'fr',
  autoPlay: true,
  showPhonetic: true,
  highlightVerbs: true,
  dailyReminder: true,
  reminderTime: '20:00',
  hideExplanations: false,
  heroDismissed: false
}

function detectSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  if (typeof document === 'undefined') return
  const resolved = theme === 'auto' ? detectSystemTheme() : theme
  document.documentElement.setAttribute('data-theme', resolved)
}

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref('auto')
  const voice = ref('female')
  const speed = ref(1.0)
  const region = ref('fr')
  const autoPlay = ref(true)
  const showPhonetic = ref(true)
  const highlightVerbs = ref(true)
  const dailyReminder = ref(true)
  const reminderTime = ref('20:00')
  const hideExplanations = ref(false)
  const heroDismissed = ref(false)

  const systemPrefersDark = ref(detectSystemTheme())

  const resolvedTheme = computed(() =>
    theme.value === 'auto' ? (systemPrefersDark.value ? 'dark' : 'light') : theme.value
  )

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        applyTheme(theme.value)
        return
      }
      const data = JSON.parse(raw)
      theme.value = data.theme ?? defaults.theme
      voice.value = data.voice ?? defaults.voice
      speed.value = data.speed ?? defaults.speed
      region.value = data.region ?? defaults.region
      autoPlay.value = data.autoPlay ?? defaults.autoPlay
      showPhonetic.value = data.showPhonetic ?? defaults.showPhonetic
      highlightVerbs.value = data.highlightVerbs ?? defaults.highlightVerbs
      dailyReminder.value = data.dailyReminder ?? defaults.dailyReminder
      reminderTime.value = data.reminderTime ?? defaults.reminderTime
      hideExplanations.value = data.hideExplanations ?? defaults.hideExplanations
      heroDismissed.value = data.heroDismissed ?? defaults.heroDismissed
      applyTheme(theme.value)
    } catch (e) {
      console.warn('Failed to load settings', e)
    }
  }

  function persist() {
    const data = {
      theme: theme.value,
      voice: voice.value,
      speed: speed.value,
      region: region.value,
      autoPlay: autoPlay.value,
      showPhonetic: showPhonetic.value,
      highlightVerbs: highlightVerbs.value,
      dailyReminder: dailyReminder.value,
      reminderTime: reminderTime.value,
      hideExplanations: hideExplanations.value,
      heroDismissed: heroDismissed.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function restoreDefaults() {
    theme.value = defaults.theme
    voice.value = defaults.voice
    speed.value = defaults.speed
    region.value = defaults.region
    autoPlay.value = defaults.autoPlay
    showPhonetic.value = defaults.showPhonetic
    highlightVerbs.value = defaults.highlightVerbs
    dailyReminder.value = defaults.dailyReminder
    reminderTime.value = defaults.reminderTime
    hideExplanations.value = defaults.hideExplanations
    heroDismissed.value = defaults.heroDismissed
    persist()
    applyTheme(theme.value)
  }

  function dismissHero() {
    heroDismissed.value = true
    persist()
  }

  function restoreHero() {
    heroDismissed.value = false
    persist()
  }

  function setTheme(value) {
    theme.value = value
    applyTheme(value)
  }

  function watchSystemTheme() {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {}
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      systemPrefersDark.value = e.matches
      if (theme.value === 'auto') applyTheme('auto')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }

  watch(theme, () => applyTheme(theme.value))
  watch(
    [autoPlay, showPhonetic, highlightVerbs, dailyReminder, reminderTime,
      hideExplanations, voice, speed, region, heroDismissed],
    () => persist(),
    { deep: true }
  )
  watch(theme, () => persist())

  const voiceLabel = computed(() => (voice.value === 'female' ? 'Feminina (Natural)' : 'Masculina (Natural)'))

  return {
    theme,
    voice,
    speed,
    region,
    autoPlay,
    showPhonetic,
    highlightVerbs,
    dailyReminder,
    reminderTime,
    hideExplanations,
    heroDismissed,
    systemPrefersDark,
    resolvedTheme,
    voiceLabel,
    load,
    persist,
    restoreDefaults,
    setTheme,
    watchSystemTheme,
    dismissHero,
    restoreHero
  }
})
