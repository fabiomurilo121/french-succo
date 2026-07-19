import { defineStore } from 'pinia'

let nextId = 1

const DEFAULT_DURATION = {
  success: 3200,
  info: 3200,
  warning: 4500,
  error: 5500
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: []
  }),
  actions: {
    add({ type = 'info', title = '', message = '', duration, icon = null }) {
      const id = nextId++
      const finalDuration = duration ?? DEFAULT_DURATION[type] ?? 3200
      const toast = {
        id,
        type,
        title,
        message,
        icon,
        duration: finalDuration,
        createdAt: Date.now(),
        paused: false,
        timeoutId: null
      }
      this.toasts.push(toast)
      if (finalDuration > 0) {
        toast.timeoutId = setTimeout(() => this.remove(id), finalDuration)
      }
      return id
    },

    remove(id) {
      const i = this.toasts.findIndex((t) => t.id === id)
      if (i < 0) return
      const toast = this.toasts[i]
      if (toast.timeoutId) clearTimeout(toast.timeoutId)
      this.toasts.splice(i, 1)
    },

    pause(id) {
      const toast = this.toasts.find((t) => t.id === id)
      if (!toast || toast.paused) return
      toast.paused = true
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId)
        const elapsed = Date.now() - toast.createdAt
        toast.remaining = Math.max(0, toast.duration - elapsed)
      }
    },

    resume(id) {
      const toast = this.toasts.find((t) => t.id === id)
      if (!toast || !toast.paused) return
      toast.paused = false
      toast.createdAt = Date.now() - (toast.duration - (toast.remaining ?? toast.duration))
      const remaining = toast.remaining ?? toast.duration
      toast.timeoutId = setTimeout(() => this.remove(id), remaining)
    },

    success(message, opts = {}) {
      return this.add({ ...opts, type: 'success', message })
    },
    error(message, opts = {}) {
      return this.add({ ...opts, type: 'error', message })
    },
    info(message, opts = {}) {
      return this.add({ ...opts, type: 'info', message })
    },
    warning(message, opts = {}) {
      return this.add({ ...opts, type: 'warning', message })
    },
    clear() {
      this.toasts.forEach((t) => t.timeoutId && clearTimeout(t.timeoutId))
      this.toasts = []
    }
  }
})
