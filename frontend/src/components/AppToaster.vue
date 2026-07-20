<script setup>
import { computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

const iconForType = (type) =>
  ({
    success: 'check',
    error: 'cross',
    warning: 'warning',
    info: 'info'
  })[type] || 'info'

const toasts = computed(() => toast.toasts)
</script>

<template>
  <Teleport to="body">
    <div class="toaster" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="toast"
          :class="[`toast--${t.type}`, { 'is-paused': t.paused }]"
          :role="t.type === 'error' || t.type === 'warning' ? 'alert' : 'status'"
          @mouseenter="toast.pause(t.id)"
          @mouseleave="toast.resume(t.id)"
        >
          <div class="toast__icon">
            <AppIcon :name="t.icon || iconForType(t.type)" :size="18" />
          </div>
          <div class="toast__body">
            <strong v-if="t.title">{{ t.title }}</strong>
            <p>{{ t.message }}</p>
          </div>
          <button
            class="toast__close"
            @click="toast.remove(t.id)"
            aria-label="Fechar notificação"
          >
            <AppIcon name="cross" :size="14" />
          </button>
          <div
            v-if="t.duration > 0"
            class="toast__progress"
            :style="{ animationDuration: `${t.duration}ms` }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toaster {
  position: fixed;
  top: calc(var(--topbar-h) + 16px);
  right: 16px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: 380px;
  width: calc(100% - 32px);
}

.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--surface-card);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  border-left: 4px solid var(--text-soft);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  box-shadow: var(--shadow-lg);
  pointer-events: auto;
  overflow: hidden;
  min-width: 280px;
}

.toast--success {
  border-left-color: var(--color-success);
}
.toast--error {
  border-left-color: #ef4444;
}
.toast--warning {
  border-left-color: var(--color-accent);
}
.toast--info {
  border-left-color: var(--color-primary);
}

.toast__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.toast--success .toast__icon {
  background: var(--color-success-soft);
  color: var(--color-success);
}
.toast--error .toast__icon {
  background: rgba(239, 68, 68, 0.12);
  color: #ef4444;
}
.toast--warning .toast__icon {
  background: var(--color-tip-bg);
  color: var(--color-accent);
}
.toast--info .toast__icon {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.toast__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-top: 2px;
}

.toast__body strong {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}

.toast__body p {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.45;
  word-wrap: break-word;
}

.toast__close {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.toast__close:hover {
  background: var(--surface-sunken);
  color: var(--text-primary);
}

.toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: currentColor;
  transform-origin: left;
  animation: toastProgress linear forwards;
  opacity: 0.7;
}

.toast--success .toast__progress {
  color: var(--color-success);
}
.toast--error .toast__progress {
  color: #ef4444;
}
.toast--warning .toast__progress {
  color: var(--color-accent);
}
.toast--info .toast__progress {
  color: var(--color-primary);
}

.toast.is-paused .toast__progress {
  animation-play-state: paused;
}

@keyframes toastProgress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

.toast-enter-active,
.toast-leave-active {
  transition: all var(--motion-base) var(--ease-out);
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.toast-move {
  transition: transform var(--motion-base) var(--ease-out);
}

@media (max-width: 600px) {
  .toaster {
    top: calc(var(--topbar-h) + 12px);
    right: 12px;
    left: 12px;
    width: auto;
    max-width: none;
  }
  .toast {
    min-width: 0;
  }
}
</style>
