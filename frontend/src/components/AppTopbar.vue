<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import AppIcon from '@/components/AppIcon.vue'
import icons from '@/assets/icons'

const emit = defineEmits(['toggle-menu', 'toggle-help'])

const route = useRoute()
const settings = useSettingsStore()

const breadcrumb = computed(() => {
  const map = {
    dashboard: 'Painel de Tradução',
    favoritos: 'Favoritos',
    configuracoes: 'Configurações'
  }
  return map[route.name] || 'Painel'
})

const isDark = computed(() => settings.resolvedTheme === 'dark')

function toggleTheme() {
  settings.setTheme(isDark.value ? 'light' : 'dark')
}

let cleanupWatcher = null
onMounted(() => {
  settings.load()
  cleanupWatcher = settings.watchSystemTheme()
})
onUnmounted(() => {
  if (cleanupWatcher) cleanupWatcher()
})
</script>

<template>
  <header class="tb">
    <button
      class="tb__hamburger"
      type="button"
      aria-label="Abrir menu"
      @click="emit('toggle-menu')"
    >
      <AppIcon name="arrow" :size="22" />
    </button>

    <div class="tb__bread">
      <span class="tb__home">Início</span>
      <span class="tb__sep">/</span>
      <strong>{{ breadcrumb }}</strong>
    </div>

    <div class="tb__search">
      <img :src="icons['IMG_8']" alt="" class="tb__search-icon" />
      <input type="text" placeholder="Buscar frases ou palavras..." aria-label="Buscar" />
    </div>

    <div class="tb__actions">
      <button
        class="tb__bell"
        type="button"
        aria-label="Notificações"
      >
        <img :src="icons['IMG_9']" alt="" />
        <span class="tb__bell-dot" />
      </button>

      <button
        class="tb__theme"
        type="button"
        :aria-checked="isDark"
        role="switch"
        :title="isDark ? 'Tema escuro' : 'Tema claro'"
        :aria-label="isDark ? 'Trocar para tema claro' : 'Trocar para tema escuro'"
        @click="toggleTheme"
      >
        <span class="tb__theme-track">
          <span class="tb__theme-thumb" />
          <AppIcon name="sun" :size="12" class="tb__theme-icon tb__theme-icon--sun" />
          <AppIcon name="moon" :size="12" class="tb__theme-icon tb__theme-icon--moon" />
        </span>
      </button>

      <button
        class="tb__icon"
        type="button"
        aria-label="Ajuda"
        @click="emit('toggle-help')"
      >
        <img :src="icons['IMG_6']" alt="" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.tb {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--topbar-h);
  padding: 0 16px;
  background: var(--surface-card);
  border-bottom: 1px solid var(--border-default);
  box-shadow:
    0 1px 0 0 var(--color-primary-soft),
    0 4px 14px -6px rgba(15, 23, 42, 0.06);
  position: sticky;
  top: 0;
  z-index: 30;
}

.tb::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-primary) 30%,
    var(--color-accent) 70%,
    transparent 100%
  );
  opacity: 0.55;
  pointer-events: none;
}

.tb__hamburger {
  display: inline-flex;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tb__hamburger:hover {
  background: var(--surface-sunken);
  color: var(--color-primary);
}
.tb__hamburger :deep(svg) {
  transform: rotate(180deg);
}

@media (min-width: 960px) {
  .tb__hamburger {
    display: none;
  }
}

.tb__bread {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-nav);
  font-size: 14px;
  color: var(--text-muted);
  flex: 0 0 auto;
  min-width: 0;
  overflow: hidden;
}
.tb__home {
  display: none;
}
.tb__sep {
  color: rgba(105, 109, 114, 0.5);
}
.tb__bread strong {
  font-family: var(--font-nav);
  color: var(--text-primary);
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tb__search {
  flex: 1;
  display: none;
  align-items: center;
  gap: 8px;
  background: rgba(197, 219, 255, 0.3);
  border-radius: 12px;
  padding: 8px 14px;
  height: 40px;
  max-width: 280px;
}
.tb__search-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}
.tb__search input {
  flex: 1;
  font-size: 14px;
  background: transparent;
  border: none;
  outline: none;
}
.tb__search input::placeholder {
  color: rgba(105, 109, 114, 0.7);
}

@media (min-width: 768px) {
  .tb__search {
    display: flex;
  }
}

.tb__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  margin-left: auto;
}

.tb__bell {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.tb__bell:hover {
  background: var(--surface-sunken);
  color: var(--color-primary);
}
.tb__bell img {
  width: 18px;
  height: 18px;
}
.tb__bell-dot {
  position: absolute;
  top: 9px;
  right: 11px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #7a7e84;
  border: 2px solid var(--surface-card);
}

.tb__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  display: none;
  align-items: center;
  justify-content: center;
}
.tb__icon img {
  width: 18px;
  height: 18px;
}
.tb__icon:hover {
  background: var(--surface-sunken);
  color: var(--color-primary);
}

@media (min-width: 640px) {
  .tb__icon {
    display: inline-flex;
  }
}

/* Theme toggle — promoted to a larger, more prominent pill on the right */
.tb__theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 30px;
  border-radius: 999px;
  background: transparent;
  flex-shrink: 0;
  order: 3;
}

.tb__theme-track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  overflow: hidden;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}

.tb__theme:hover .tb__theme-track {
  border-color: var(--color-primary);
}

.tb__theme-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde68a, #fbbf24);
  box-shadow: var(--shadow-sm);
  transition: transform var(--motion-base) var(--ease-out);
  z-index: 1;
}

.tb__theme.is-dark .tb__theme-thumb,
:root[data-theme='dark'] .tb__theme .tb__theme-thumb {
  transform: translateX(26px);
  background: linear-gradient(135deg, #312e81, #1e3a8a);
}

.tb__theme-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
}
.tb__theme-icon--sun {
  left: 8px;
  color: #92400e;
}
:root[data-theme='dark'] .tb__theme-icon--sun {
  color: var(--text-soft);
  opacity: 0.7;
}

.tb__theme-icon--moon {
  right: 8px;
  color: var(--text-soft);
  opacity: 0.7;
}
:root[data-theme='dark'] .tb__theme-icon--moon {
  color: #e0e7ff;
  opacity: 1;
}
</style>
