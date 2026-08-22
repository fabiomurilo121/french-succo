import { api } from './api'

const STORAGE_KEY = 'french-succo:text-cache-v1'
const TTL_DAYS = 14
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000
const MAX_ENTRIES = 200

class TextCache {
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
        if (entry && entry.response && entry.ts && now - entry.ts < TTL_MS) {
          entries.set(key, entry)
        }
      }
      return entries
    } catch (e) {
      console.warn('TextCache: failed to load', e)
      return new Map()
    }
  }

  _persist() {
    try {
      const obj = Object.fromEntries(this.entries)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
    } catch {
      const sorted = [...this.entries.entries()].sort((a, b) => a[1].ts - b[1].ts)
      const keep = sorted.slice(Math.floor(sorted.length / 2))
      this.entries = new Map(keep)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(this.entries)))
      } catch { /* ignore */ }
    }
  }

  _key(payload) {
    const norm = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, ' ')
    return `${norm(payload.sourceLang)}|${norm(payload.region)}|${norm(payload.text)}`
  }

  getTranslate(payload) {
    const key = this._key(payload)
    const entry = this.entries.get(key)
    if (entry) {
      entry.ts = Date.now()
      this._persist()
      return { response: entry.response, cached: true }
    }
    return null
  }

  setTranslate(payload, response) {
    const key = this._key(payload)
    this.entries.set(key, { response, ts: Date.now() })
    if (this.entries.size > MAX_ENTRIES) {
      const sorted = [...this.entries.entries()].sort((a, b) => a[1].ts - b[1].ts)
      const removeCount = this.entries.size - MAX_ENTRIES
      for (let i = 0; i < removeCount; i++) this.entries.delete(sorted[i][0])
    }
    this._persist()
  }

  getCorrect(payload) {
    const key = `correct|${this._key(payload)}`
    const entry = this.entries.get(key)
    if (entry) {
      entry.ts = Date.now()
      this._persist()
      return { response: entry.response, cached: true }
    }
    return null
  }

  setCorrect(payload, response) {
    const key = `correct|${this._key(payload)}`
    this.entries.set(key, { response, ts: Date.now() })
    if (this.entries.size > MAX_ENTRIES) {
      const sorted = [...this.entries.entries()].sort((a, b) => a[1].ts - b[1].ts)
      const removeCount = this.entries.size - MAX_ENTRIES
      for (let i = 0; i < removeCount; i++) this.entries.delete(sorted[i][0])
    }
    this._persist()
  }

  clear() {
    this.entries.clear()
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch { /* ignore */ }
  }

  get size() {
    return this.entries.size
  }
}

export const textCache = new TextCache()

export async function translateCached(payload) {
  const hit = textCache.getTranslate(payload)
  if (hit) return { ...hit.response, __cached: true }
  const response = await api.translate(payload)
  textCache.setTranslate(payload, response)
  return response
}

export async function correctCached(payload) {
  const hit = textCache.getCorrect(payload)
  if (hit) return { ...hit.response, __cached: true }
  const response = await api.correct(payload)
  textCache.setCorrect(payload, response)
  return response
}
