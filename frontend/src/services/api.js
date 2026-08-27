const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!res.ok) {
    let detail
    try {
      detail = await res.json()
    } catch {
      detail = { message: res.statusText }
    }
    const err = new Error(detail.message || `HTTP ${res.status}`)
    err.status = res.status
    err.detail = detail
    throw err
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  async translate(payload) {
    return request('/translate', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async correct(payload) {
    return request('/correct', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async getHistory() {
    return request('/history')
  },

  async clearHistory() {
    return request('/history', { method: 'DELETE' })
  },

  async deleteHistoryItem(id) {
    return request(`/history/${id}`, { method: 'DELETE' })
  },

  async getFavorites() {
    return request('/favorites')
  },

  async addFavorite(payload) {
    return request('/favorites', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async deleteFavorite(id) {
    return request(`/favorites/${id}`, { method: 'DELETE' })
  },

  async getSettings() {
    return request('/settings')
  },

  async updateSettings(payload) {
    return request('/settings', {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  },

  async getStats() {
    return request('/stats')
  },

  async getStories() {
    return request('/stories')
  },

  async getStory(slug) {
    return request(`/stories/${slug}`)
  },

  async getWords() {
    return request('/words')
  },

  async getDatabaseStats() {
    return request('/database/stats')
  },

  async startConversation(payload) {
    return request('/conversation/start', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async replyConversation(payload) {
    return request('/conversation/reply', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  getAudioUrl(text, voice, speed, region = 'fr') {
    const params = new URLSearchParams({ text, voice, speed, region })
    return `${BASE_URL}/audio?${params.toString()}`
  },

  async gradeWriting(payload) {
    return request('/writing/grade', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async generateWritingWords(payload) {
    return request('/writing/words', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async getLearnedWords(params = {}) {
    const qs = new URLSearchParams(params).toString()
    return request(`/learned-words${qs ? `?${qs}` : ''}`)
  },

  async addLearnedWord(payload) {
    return request('/learned-words', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async checkLearnedWord(word) {
    return request(`/learned-words/check?word=${encodeURIComponent(word)}`)
  },

  async markLearnedWordReviewed(id) {
    return request(`/learned-words/${id}/review`, {
      method: 'PATCH'
    })
  },

  async deleteLearnedWord(id) {
    return request(`/learned-words/${id}`, { method: 'DELETE' })
  },

  async clearLearnedWords() {
    return request('/learned-words', { method: 'DELETE' })
  },

  async getLearnedWordCategories() {
    return request('/learned-words/categories')
  }
}

export default api
