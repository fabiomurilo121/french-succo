import { api } from './api'

const STORAGE_KEY = 'french-succo:audio-cache-v1'
const TTL_DAYS = 30
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000
const MAX_ENTRIES = 500

class AudioCache {
  constructor() {
    this.entries = this._load()
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return new Map()
      const data = JSON.parse(raw)
      const now = Date.now()
      const entries = new Map()
      for (const [key, entry] of Object.entries(data)) {
        if (
          entry &&
          typeof entry.url === 'string' &&
          now - (entry.ts || 0) < TTL_MS
        ) {
          entries.set(key, entry)
        }
      }
      return entries
    } catch (e) {
      console.warn('AudioCache: failed to load', e)
      return new Map()
    }
  }

  _save() {
    try {
      const obj = Object.fromEntries(this.entries)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
    } catch (e) {
      // quota exceeded — trim the oldest 50% of entries
      const sorted = [...this.entries.entries()].sort(
        (a, b) => (a[1].ts || 0) - (b[1].ts || 0)
      )
      const keep = sorted.slice(Math.floor(sorted.length / 2))
      this.entries = new Map(keep)
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(Object.fromEntries(this.entries))
        )
      } catch {
        /* ignore */
      }
    }
  }

  _key(text, voice, region, speed) {
    return `${voice}|${region}|${speed.toFixed(2)}|${text}`
  }

  /**
   * Returns audio URL — reuses cached or generates a fresh request.
   * @returns {{ url: string, cached: boolean, estTokens: number }}
   */
  get(text, opts = {}, generateUrl) {
    const voice = opts.voice || 'female'
    const region = opts.region || 'fr'
    const speed = opts.speed != null ? opts.speed : 1.0
    const key = this._key(text, voice, region, speed)

    const existing = this.entries.get(key)
    if (existing) {
      return {
        url: existing.url,
        cached: true,
        estTokens: 0
      }
    }

    const url = generateUrl || (() => api.getAudioUrl(text, voice, speed, region))()
    this.entries.set(key, { url, ts: Date.now() })

    // LRU-ish eviction when over limit
    if (this.entries.size > MAX_ENTRIES) {
      const sorted = [...this.entries.entries()].sort(
        (a, b) => (a[1].ts || 0) - (b[1].ts || 0)
      )
      const removeCount = this.entries.size - MAX_ENTRIES
      for (let i = 0; i < removeCount; i++) {
        this.entries.delete(sorted[i][0])
      }
    }

    this._save()

    return {
      url,
      cached: false,
      estTokens: estimateTokens(text)
    }
  }

  has(text, opts = {}) {
    const voice = opts.voice || 'female'
    const region = opts.region || 'fr'
    const speed = opts.speed != null ? opts.speed : 1.0
    return this.entries.has(this._key(text, voice, region, speed))
  }

  clear() {
    this.entries.clear()
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  get size() {
    return this.entries.size
  }
}

/**
 * Heurística simples para estimar custo de tokens:
 * - Francês: ~1.3 tokens por palavra
 * - Base de 5 tokens por chamada
 */
export function estimateTokens(text) {
  if (!text) return 0
  const words = text.trim().split(/\s+/).length
  return Math.ceil(5 + words * 1.3)
}

export const audioCache = new AudioCache()

/**
 * Helper de uso — substitui `api.getAudioUrl(...)` em todos os componentes.
 * Retorna a URL cacheada se já existe, senão gera e cacheia.
 */
export function getAudioUrl(text, opts = {}) {
  return audioCache.get(text, opts, () =>
    api.getAudioUrl(
      text,
      opts.voice || 'female',
      opts.region || 'fr',
      opts.speed != null ? opts.speed : 1.0
    )
  )
}
