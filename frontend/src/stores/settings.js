import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'french-succo:settings'

const defaults = {
  voice: 'female',
  speed: 1.0,
  region: 'fr',
  autoPlay: true,
  showPhonetic: true,
  highlightVerbs: true,
  dailyReminder: true,
  reminderTime: '20:00',
  hideExplanations: false
}

export const useSettingsStore = defineStore('settings', () => {
  const voice = ref('female')
  const speed = ref(1.0)
  const region = ref('fr')
  const autoPlay = ref(true)
  const showPhonetic = ref(true)
  const highlightVerbs = ref(true)
  const dailyReminder = ref(true)
  const reminderTime = ref('20:00')
  const hideExplanations = ref(false)

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      voice.value = data.voice ?? defaults.voice
      speed.value = data.speed ?? defaults.speed
      region.value = data.region ?? defaults.region
      autoPlay.value = data.autoPlay ?? defaults.autoPlay
      showPhonetic.value = data.showPhonetic ?? defaults.showPhonetic
      highlightVerbs.value = data.highlightVerbs ?? defaults.highlightVerbs
      dailyReminder.value = data.dailyReminder ?? defaults.dailyReminder
      reminderTime.value = data.reminderTime ?? defaults.reminderTime
      hideExplanations.value = data.hideExplanations ?? defaults.hideExplanations
    } catch (e) {
      console.warn('Failed to load settings', e)
    }
  }

  function persist() {
    const data = {
      voice: voice.value,
      speed: speed.value,
      region: region.value,
      autoPlay: autoPlay.value,
      showPhonetic: showPhonetic.value,
      highlightVerbs: highlightVerbs.value,
      dailyReminder: dailyReminder.value,
      reminderTime: reminderTime.value,
      hideExplanations: hideExplanations.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  function restoreDefaults() {
    voice.value = defaults.voice
    speed.value = defaults.speed
    region.value = defaults.region
    autoPlay.value = defaults.autoPlay
    showPhonetic.value = defaults.showPhonetic
    highlightVerbs.value = defaults.highlightVerbs
    dailyReminder.value = defaults.dailyReminder
    reminderTime.value = defaults.reminderTime
    hideExplanations.value = defaults.hideExplanations
    persist()
  }

  const voiceLabel = computed(() => (voice.value === 'female' ? 'Feminina (Natural)' : 'Masculina (Natural)'))

  return {
    voice,
    speed,
    region,
    autoPlay,
    showPhonetic,
    highlightVerbs,
    dailyReminder,
    reminderTime,
    hideExplanations,
    voiceLabel,
    load,
    persist,
    restoreDefaults
  }
})
