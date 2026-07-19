<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import AppIcon from '@/components/AppIcon.vue'

const route = useRoute()
const settings = useSettingsStore()

const breadcrumb = computed(() => {
  const map = {
    dashboard: 'Painel de Tradução',
    favoritos: 'Favoritos',
    configuracoes: 'Configurações de Aprendizado'
  }
  return map[route.name] || 'Painel de Tradução'
})

const isDark = computed(() => settings.resolvedTheme === 'dark')

const themeHint = computed(() =>
  isDark.value
    ? 'Tema escuro ativo. Clique para mudar para tema claro.'
    : 'Tema claro ativo. Clique para mudar para tema escuro.'
)

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
  <header class="topbar">
    <div class="topbar__bread">
      <span>Início</span>
      <span class="topbar__sep">/</span>
      <strong>{{ breadcrumb }}</strong>
    </div>

    <div class="topbar__search">
      <span class="topbar__search-icon">⌕</span>
      <input type="text" placeholder="Buscar frases ou palavras..." />
    </div>

    <div class="topbar__actions">
      <button
        class="theme-toggle"
        :class="{ 'is-dark': isDark }"
        @click="toggleTheme"
        role="switch"
        :aria-checked="isDark"
        :title="themeHint"
        :aria-label="themeHint"
      >
        <span class="theme-toggle__track">
          <span class="theme-toggle__indicator"></span>
          <span class="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
            <AppIcon name="sun" :size="14" />
          </span>
          <span class="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
            <AppIcon name="moon" :size="14" />
          </span>
        </span>
      </button>
      <button class="topbar__iconbtn" aria-label="Notificações">🔔</button>
      <button class="topbar__iconbtn" aria-label="Ajuda">?</button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--topbar-h);
  padding: 0 8px;
  border-bottom: 1px solid var(--color-border-soft);
}

.topbar__bread {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-text-muted);
  flex: 0 0 auto;
}

.topbar__bread strong {
  color: var(--color-text);
  font-weight: 600;
}

.topbar__sep {
  color: var(--color-text-soft);
}

.topbar__search {
  flex: 1;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.topbar__search input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border-radius: 999px;
  border: none;
  background: var(--color-bg-alt);
  font-size: 14px;
  color: var(--color-text);
  outline: none;
  transition: box-shadow 0.15s;
}

.topbar__search input::placeholder {
  color: var(--color-text-soft);
}

.topbar__search input:focus {
  box-shadow: 0 0 0 2px var(--color-primary-soft2);
}

.topbar__search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-soft);
  font-size: 16px;
  pointer-events: none;
}

.topbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.topbar__iconbtn {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.topbar__iconbtn:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

/* ───── Theme pill toggle ───── */
.theme-toggle {
  position: relative;
  width: 56px;
  height: 30px;
  padding: 0;
  border-radius: 999px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle__track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border-soft);
  overflow: hidden;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.theme-toggle:hover .theme-toggle__track {
  border-color: var(--color-primary);
}

.theme-toggle__indicator {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease;
  z-index: 1;
}

.theme-toggle.is-dark .theme-toggle__indicator {
  transform: translateX(26px);
  background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);
}

.theme-toggle.is-light .theme-toggle__indicator {
  background: linear-gradient(135deg, #fde68a 0%, #fbbf24 100%);
}

.theme-toggle__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, transform 0.2s ease;
  z-index: 2;
}

.theme-toggle__icon--sun {
  left: 8px;
  color: var(--color-text-soft);
}

.theme-toggle.is-light .theme-toggle__icon--sun {
  color: #92400e;
}

.theme-toggle.is-dark .theme-toggle__icon--sun {
  color: var(--color-text-soft);
  opacity: 0.7;
}

.theme-toggle__icon--moon {
  right: 8px;
  color: var(--color-text-soft);
}

.theme-toggle.is-dark .theme-toggle__icon--moon {
  color: #e0e7ff;
}

.theme-toggle.is-light .theme-toggle__icon--moon {
  color: var(--color-text-soft);
  opacity: 0.7;
}
</style>
