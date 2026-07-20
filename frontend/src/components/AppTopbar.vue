<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
    flashcards: 'Flashcards',
    complete: 'Completar Frases',
    detalhes: 'Detalhes & Estatísticas',
    configuracoes: 'Configurações'
  }
  return map[route.name] || 'Painel'
})

const isDark = computed(() => settings.resolvedTheme === 'dark')

function toggleTheme() {
  settings.setTheme(isDark.value ? 'light' : 'dark')
}

/* ── Notifications dropdown ── */
const initialNotifications = [
  {
    id: 'daily',
    icon: 'bell',
    title: 'Lembrete diário de estudo',
    time: 'agora',
    body: 'Configure horário e frequência em Configurações → Notificações para manter sua ofensiva ativa.',
    unread: true
  },
  {
    id: 'streak',
    icon: 'zap',
    title: 'Ofensiva em risco',
    time: 'ontem',
    body: 'Você ainda não estudou hoje. Pratique ao menos uma tradução para preservar sua sequência.',
    unread: true
  },
  {
    id: 'favorites',
    icon: 'starFilled',
    title: 'Favoritos atualizados',
    time: '2 dias atrás',
    body: 'Novas frases foram adicionadas à sua lista. Revise-as em Histórico → Favoritos.',
    unread: false
  },
  {
    id: 'tip',
    icon: 'sparkles',
    title: 'Dica cultural',
    time: '3 dias atrás',
    body: 'Na França o "Bonjour" é obrigatório ao entrar em qualquer estabelecimento — etiqueta, não apenas cortesia.',
    unread: false
  }
]

const notifications = ref(initialNotifications)
const notifsOpen = ref(false)
const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)

function toggleNotifs() {
  notifsOpen.value = !notifsOpen.value
}

function closeNotifs() {
  notifsOpen.value = false
}

function dismissNotification(id) {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

function onDocClick(e) {
  if (!notifsOpen.value) return
  const root = rootRef.value
  if (root && !root.contains(e.target)) closeNotifs()
}

function onDocKey(e) {
  if (e.key === 'Escape' && notifsOpen.value) closeNotifs()
}

const rootRef = ref(null)

onMounted(() => {
  settings.load()
  cleanupWatcher = settings.watchSystemTheme()
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKey)
})

let cleanupWatcher = null

onUnmounted(() => {
  if (cleanupWatcher) cleanupWatcher()
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKey)
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
      <div ref="rootRef" class="tb__bell-wrap">
        <button
          class="tb__bell"
          type="button"
          aria-label="Notificações"
          :aria-expanded="notifsOpen"
          aria-haspopup="true"
          @click="toggleNotifs"
        >
          <img :src="icons['IMG_9']" alt="" />
          <span v-if="unreadCount > 0" class="tb__bell-dot" />
        </button>

        <Transition name="notif-pop">
          <div v-if="notifsOpen" class="tb__notif" role="menu" aria-label="Notificações">
            <header class="tb__notif-head">
              <strong>Notificações</strong>
              <span v-if="notifications.length" class="tb__notif-count">
                {{ notifications.length }}
              </span>
            </header>

            <div class="tb__notif-body">
              <article
                v-for="n in notifications"
                :key="n.id"
                class="tb__notif-item"
                :class="{ 'tb__notif-item--unread': n.unread }"
              >
                <div class="tb__notif-icon" :class="`tb__notif-icon--${n.icon}`">
                  <AppIcon :name="n.icon" :size="14" />
                </div>
                <div class="tb__notif-content">
                  <div class="tb__notif-row">
                    <strong>{{ n.title }}</strong>
                    <span class="tb__notif-time">{{ n.time }}</span>
                  </div>
                  <p>{{ n.body }}</p>
                </div>
                <button
                  class="tb__notif-x"
                  type="button"
                  aria-label="Dispensar notificação"
                  @click.stop="dismissNotification(n.id)"
                >
                  <AppIcon name="cross" :size="12" />
                </button>
              </article>

              <p v-if="notifications.length === 0" class="tb__notif-empty">
                Você está em dia ✨
              </p>
            </div>
          </div>
        </Transition>
      </div>

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

.tb__bell-wrap {
  position: relative;
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
  background: var(--color-accent, #ef4444);
  border: 2px solid var(--surface-card);
}

/* Notifications dropdown */
.tb__notif {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 340px;
  max-width: calc(100vw - 32px);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 14px;
  box-shadow: var(--shadow-lg, 0 12px 28px -8px rgba(15, 23, 42, 0.18));
  z-index: 50;
  overflow: hidden;
}

.tb__notif-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-soft);
  font-family: var(--font-nav);
}

.tb__notif-head strong {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.tb__notif-count {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  border-radius: 999px;
  padding: 2px 8px;
  min-width: 22px;
  text-align: center;
}

.tb__notif-body {
  max-height: 360px;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tb__notif-item {
  display: flex;
  gap: 10px;
  padding: 10px 10px 10px 12px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 10px;
  align-items: flex-start;
  position: relative;
}

.tb__notif-item--unread {
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}

.tb__notif-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tb__notif-icon--bell {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.tb__notif-icon--zap {
  background: rgba(249, 115, 22, 0.14);
  color: var(--color-accent, #f97316);
}
.tb__notif-icon--starFilled {
  background: rgba(234, 179, 8, 0.14);
  color: #ca8a04;
}
.tb__notif-icon--sparkles {
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
}

.tb__notif-content {
  flex: 1;
  min-width: 0;
}

.tb__notif-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 2px;
}

.tb__notif-content strong {
  font-family: var(--font-nav);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tb__notif-time {
  font-size: 10.5px;
  color: var(--text-muted);
  white-space: nowrap;
  flex-shrink: 0;
}

.tb__notif-content p {
  margin: 0;
  font-size: 11.5px;
  color: var(--text-secondary);
  line-height: 1.45;
}

.tb__notif-x {
  align-self: flex-start;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: transparent;
  color: var(--text-faint);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.15s, background 0.15s, color 0.15s;
}

.tb__notif-item:hover .tb__notif-x,
.tb__notif-x:focus-visible {
  opacity: 1;
}

.tb__notif-x:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.tb__notif-empty {
  margin: 0;
  padding: 22px 12px;
  text-align: center;
  font-size: 12.5px;
  color: var(--text-muted);
}

.notif-pop-enter-active,
.notif-pop-leave-active {
  transition: opacity 0.16s ease, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
}
.notif-pop-enter-from,
.notif-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

@media (max-width: 480px) {
  .tb__notif {
    width: calc(100vw - 24px);
    right: -8px;
  }
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
