import { ref, computed, readonly } from 'vue'
import { audioCache } from '@/services/audioCache'

const hits = ref(audioCache.size)
const size = computed(() => audioCache.size)

const refresh = () => {
  hits.value = audioCache.size
}

export function useAudioCache() {
  return {
    size: readonly(size),
    hits: readonly(hits),
    refresh,
    clearCache: () => {
      audioCache.clear()
      refresh()
    }
  }
}
