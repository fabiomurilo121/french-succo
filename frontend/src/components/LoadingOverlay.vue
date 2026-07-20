<script setup>
import { watch, onUnmounted } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Carregando…' },
  message: { type: String, default: 'Aguarde um instante' },
  variant: { type: String, default: 'spinner' }
})

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

onUnmounted(() => {
  if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div v-if="open" class="loader-overlay" role="dialog" aria-modal="true" :aria-label="title">
        <div class="loader-overlay__backdrop" />
        <div class="loader-overlay__card">
          <div class="loader-spinner" aria-hidden="true">
            <svg viewBox="0 0 50 50">
              <circle cx="25" cy="25" r="20" />
            </svg>
          </div>
          <h3 class="loader-overlay__title">{{ title }}</h3>
          <p class="loader-overlay__msg">{{ message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9990;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.loader-overlay__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.loader-overlay__card {
  position: relative;
  background: var(--surface-card);
  border-radius: var(--radius-xl);
  padding: 32px 36px;
  width: 100%;
  max-width: 360px;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-default);
}

.loader-spinner {
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
}

.loader-spinner svg {
  width: 100%;
  height: 100%;
  animation: loader-spin 1s linear infinite;
  transform-origin: center;
}

.loader-spinner circle {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 90 200;
  stroke-dashoffset: 0;
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

.loader-overlay__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  letter-spacing: -0.01em;
}

.loader-overlay__msg {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.22s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-active .loader-overlay__card {
  animation: overlay-pop 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.overlay-leave-active .loader-overlay__card {
  animation: overlay-pop-out 0.22s ease-in forwards;
}

@keyframes overlay-pop {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes overlay-pop-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}

@media (max-width: 480px) {
  .loader-overlay__card {
    padding: 24px 22px;
  }
  .loader-overlay__title {
    font-size: 17px;
  }
}
</style>
