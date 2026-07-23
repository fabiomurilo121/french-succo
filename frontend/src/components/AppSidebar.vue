<script setup>
import { useRoute } from 'vue-router'
import AppIcon from '@/components/AppIcon.vue'
import icons from '@/assets/icons'

defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])

const route = useRoute()

const navItems = [
  { name: 'Início', to: '/dashboard', icon: 'home' },
  { name: 'Flashcards', to: '/flashcards', icon: 'cards' },
  { name: 'Completar Frases', to: '/complete', icon: 'fillBlank' },
  { name: 'Histórias', to: '/historias', icon: 'book' },
  { name: 'Conjugação', to: '/conjugacao', icon: 'grammar' },
  { name: 'Pronúncia', to: '/pronuncia', icon: 'speaker' },
  { name: 'Detalhes', to: '/detalhes', icon: 'chartBar' },
  { name: 'Configurações', to: '/configuracoes', icon: 'settings' }
]
</script>

<template>
  <aside class="sb" :class="{ 'is-open': open }">
    <header class="sb__head">
      <div class="sb__brand">
        <div class="sb__logo">
          <img :src="icons['IMG_1']" alt="Logo" />
        </div>
        <span class="sb__title">Aprender Francês</span>
      </div>
      <button
        class="sb__close"
        type="button"
        aria-label="Fechar menu"
        @click="emit('close')"
      >
        <AppIcon name="cross" :size="22" />
      </button>
    </header>

    <nav class="sb__nav" aria-label="Navegação principal">
      <button
        v-for="item in navItems"
        :key="item.to"
        class="sb__item"
        :class="{ 'is-active': route.path === item.to }"
        @click="emit('close')"
      >
        <router-link :to="item.to" class="sb__link">
          <AppIcon :name="item.icon" :size="20" class="sb__icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </button>

      <button class="sb__user" type="button" @click="emit('close')">
        <div class="sb__avatar">U</div>
        <div class="sb__userinfo">
          <strong>Usuário</strong>
          <small>Premium</small>
        </div>
        <img :src="icons['IMG_7']" alt="" class="sb__caret" />
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sb {
  background: var(--surface-sidebar);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 0;
  align-self: flex-start;
  height: 100dvh;
  overflow-y: auto;
  flex-shrink: 0;
  box-shadow:
    1px 0 0 0 var(--border-default),
    4px 0 16px -4px rgba(15, 23, 42, 0.06),
    16px 0 32px -8px rgba(15, 23, 42, 0.06);
}

.sb::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    var(--color-primary-soft) 50%,
    transparent 100%
  );
  pointer-events: none;
}

.sb__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
}

.sb__close {
  display: none;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  align-items: center;
  justify-content: center;
}
.sb__close:hover {
  background: var(--surface-card);
  color: var(--color-primary);
}

.sb__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.sb__logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}

.sb__logo img {
  width: 22px;
  height: 22px;
}

.sb__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-primary-text);
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sb__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.sb__item {
  padding: 0;
  border-radius: 14px;
  background: transparent;
  text-align: left;
}

.sb__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 14px;
  color: var(--color-primary-text);
  font-family: var(--font-nav);
  font-weight: 600;
  font-size: 14px;
  width: 100%;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.sb__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.75;
  color: var(--color-primary-text);
  transition: opacity var(--motion-fast), color var(--motion-fast);
}

.sb__link:hover {
  background: var(--color-primary-softer);
}

.sb__item.is-active .sb__link {
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
}

.sb__item.is-active .sb__icon {
  opacity: 1;
  color: var(--color-primary);
}

/* ── User card as the LAST nav item ── */
.sb__user {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px dashed var(--border-default);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 12px 10px;
  border-radius: 14px;
  background: transparent;
  text-align: left;
  width: 100%;
  cursor: pointer;
  transition: background var(--motion-fast);
  font-family: inherit;
}

.sb__user:hover {
  background: var(--color-primary-softer);
}

.sb__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #6366f1);
  color: #fff;
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sb__userinfo {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  flex: 1;
  min-width: 0;
}
.sb__userinfo strong {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sb__userinfo small {
  font-size: 11px;
  color: var(--text-muted);
}

.sb__caret {
  width: 14px;
  height: 14px;
  opacity: 0.6;
  flex-shrink: 0;
}

/* ─── Mobile: drawer ─── */
@media (max-width: 959px) {
  .sb {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 60;
    width: 256px;
    height: 100dvh;
    transform: translateX(-105%);
    transition: transform 0.3s var(--ease-out);
    box-shadow: var(--shadow-lg);
    border-right: 1px solid var(--border-default);
  }

  .sb::after {
    display: none;
  }

  .sb.is-open {
    transform: translateX(0);
  }

  .sb__close {
    display: inline-flex;
  }
}
</style>
