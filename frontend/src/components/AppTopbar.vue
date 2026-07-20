<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import AppIcon from '@/components/AppIcon.vue'
import icons from '@/assets/icons'

const emit = defineEmits(['toggle-menu'])

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
      <button class="tb__icon" type="button" aria-label="Ajuda">
        <img :src="icons['IMG_6']" alt="" />
      </button>

      <span class="tb__divider" />

      <div class="tb__user">
        <div class="tb__user-info">
          <strong>Usuário</strong>
          <small>Premium</small>
        </div>
        <div class="tb__avatar">U</div>
        <img :src="icons['IMG_7']" alt="" class="tb__caret" />
      </div>

      <button
        class="tb__theme"
        type="button"
        :aria-checked="isDark"
        role="switch"
        :title="isDark ? 'Tema escuro' : 'Tema claro'"
        @click="toggleTheme"
      >
        <span class="tb__theme-track">
          <span class="tb__theme-thumb" />
          <AppIcon name="sun" :size="12" class="tb__theme-icon tb__theme-icon--sun" />
          <AppIcon name="moon" :size="12" class="tb__theme-icon tb__theme-icon--moon" />
        </span>
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
  background: var(--surface-page);
  border-bottom: 1px solid var(--border-default);
  position: sticky;
  top: 0;
  z-index: 30;
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
  border: 2px solid var(--surface-page);
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

.tb__divider {
  width: 1px;
  height: 28px;
  background: var(--border-default);
  display: none;
}

@media (min-width: 640px) {
  .tb__divider {
    display: block;
  }
}

.tb__user {
  display: none;
  align-items: center;
  gap: 10px;
  padding-left: 8px;
}
.tb__user-info {
  display: flex;
  flex-direction: column;
  text-align: right;
  line-height: 1.2;
}
.tb__user-info strong {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
}
.tb__user-info small {
  font-size: 10px;
  color: var(--text-muted);
}

.tb__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tb__caret {
  width: 14px;
  height: 14px;
  display: none;
}

@media (min-width: 640px) {
  .tb__user {
    display: flex;
  }
  .tb__home {
    display: inline;
  }
  .tb__caret {
    display: block;
  }
}

.tb__theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 28px;
  border-radius: 999px;
  background: transparent;
  flex-shrink: 0;
}

.tb__theme-track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  overflow: hidden;
}

.tb__theme-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde68a, #fbbf24);
  box-shadow: var(--shadow-sm);
  transition: transform var(--motion-base) var(--ease-out);
  z-index: 1;
}

.tb__theme.is-dark .tb__theme-thumb,
:root[data-theme='dark'] .tb__theme .tb__theme-thumb {
  transform: translateX(22px);
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
  left: 6px;
  color: #92400e;
}
:root[data-theme='dark'] .tb__theme-icon--sun {
  color: var(--text-soft);
  opacity: 0.7;
}

.tb__theme-icon--moon {
  right: 6px;
  color: var(--text-soft);
  opacity: 0.7;
}
:root[data-theme='dark'] .tb__theme-icon--moon {
  color: #e0e7ff;
  opacity: 1;
}
</style>
