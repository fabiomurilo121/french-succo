import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchAll() {
    loading.value = true
    error.value = null
    try {
      const data = JSON.parse(localStorage.getItem('french-succo:history') || '[]')
      items.value = data
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function add(entry) {
    const newItem = {
      id: Date.now() + Math.random(),
      createdAt: new Date().toISOString(),
      ...entry
    }
    items.value.unshift(newItem)
    persist()
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
    persist()
  }

  function clear() {
    items.value = []
    persist()
  }

  function persist() {
    localStorage.setItem('french-succo:history', JSON.stringify(items.value))
  }

  return { items, loading, error, fetchAll, add, remove, clear }
})

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref([])
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true
    try {
      const data = JSON.parse(localStorage.getItem('french-succo:favorites') || '[]')
      items.value = data
    } finally {
      loading.value = false
    }
  }

  function add(entry) {
    if (items.value.some((i) => i.frText === entry.frText)) return false
    const item = {
      id: Date.now() + Math.random(),
      savedAt: new Date().toISOString(),
      ...entry
    }
    items.value.unshift(item)
    persist()
    return true
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id)
    persist()
  }

  function isFavorited(frText) {
    return items.value.some((i) => i.frText === frText)
  }

  function persist() {
    localStorage.setItem('french-succo:favorites', JSON.stringify(items.value))
  }

  return { items, loading, fetchAll, add, remove, isFavorited }
})
