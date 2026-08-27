import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { api } from '@/services/api'

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
  heroDismissed: false,
  validateWithDictionary: true,
  validateWithLevenshtein: true,
  validateWithAi: false
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
  const validateWithDictionary = ref(true)
  const validateWithLevenshtein = ref(true)
  const validateWithAi = ref(false)

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
      validateWithDictionary.value = data.validateWithDictionary ?? defaults.validateWithDictionary
      validateWithLevenshtein.value = data.validateWithLevenshtein ?? defaults.validateWithLevenshtein
      validateWithAi.value = data.validateWithAi ?? defaults.validateWithAi
      applyTheme(theme.value)
    } catch (e) {
      console.warn('Failed to load settings', e)
    }
  }

  async function loadFromBackend() {
    try {
      const remote = await api.getSettings()
      if (!remote) return
      voice.value = remote.voice ?? voice.value
      speed.value = remote.speed ?? speed.value
      region.value = remote.region ?? region.value
      autoPlay.value = remote.autoPlay ?? autoPlay.value
      showPhonetic.value = remote.showPhonetic ?? showPhonetic.value
      highlightVerbs.value = remote.highlightVerbs ?? highlightVerbs.value
      dailyReminder.value = remote.dailyReminder ?? dailyReminder.value
      reminderTime.value = remote.reminderTime ?? reminderTime.value
      hideExplanations.value = remote.hideExplanations ?? hideExplanations.value
      if (typeof remote.validateWithDictionary === 'boolean') {
        validateWithDictionary.value = remote.validateWithDictionary
      }
      if (typeof remote.validateWithLevenshtein === 'boolean') {
        validateWithLevenshtein.value = remote.validateWithLevenshtein
      }
      if (typeof remote.validateWithAi === 'boolean') {
        validateWithAi.value = remote.validateWithAi
      }
    } catch (e) {
      console.warn('Failed to load settings from backend', e)
    }
  }

  async function pushToBackend() {
    try {
      await api.updateSettings({
        voice: voice.value,
        speed: speed.value,
        region: region.value,
        autoPlay: autoPlay.value,
        showPhonetic: showPhonetic.value,
        highlightVerbs: highlightVerbs.value,
        dailyReminder: dailyReminder.value,
        reminderTime: reminderTime.value,
        hideExplanations: hideExplanations.value,
        validateWithDictionary: validateWithDictionary.value,
        validateWithLevenshtein: validateWithLevenshtein.value,
        validateWithAi: validateWithAi.value
      })
    } catch (e) {
      console.warn('Failed to push settings to backend', e)
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
      heroDismissed: heroDismissed.value,
      validateWithDictionary: validateWithDictionary.value,
      validateWithLevenshtein: validateWithLevenshtein.value,
      validateWithAi: validateWithAi.value
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
    validateWithDictionary.value = defaults.validateWithDictionary
    validateWithLevenshtein.value = defaults.validateWithLevenshtein
    validateWithAi.value = defaults.validateWithAi
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
      hideExplanations, voice, speed, region, heroDismissed,
      validateWithDictionary, validateWithLevenshtein, validateWithAi],
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
    validateWithDictionary,
    validateWithLevenshtein,
    validateWithAi,
    systemPrefersDark,
    resolvedTheme,
    voiceLabel,
    load,
    loadFromBackend,
    pushToBackend,
    persist,
    restoreDefaults,
    setTheme,
    watchSystemTheme,
    dismissHero,
    restoreHero
  }
})
