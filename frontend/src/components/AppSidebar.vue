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
  { name: 'Dashboard', to: '/dashboard', icon: icons['IMG_2'] },
  { name: 'Favoritos', to: '/favoritos', icon: icons['IMG_4'] },
  { name: 'Configurações', to: '/configuracoes', icon: icons['IMG_5'] }
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
          <img :src="item.icon" :alt="item.name" />
          <span>{{ item.name }}</span>
        </router-link>
      </button>
    </nav>

    <footer class="sb__user">
      <div class="sb__avatar">U</div>
      <div class="sb__userinfo">
        <strong>Usuário</strong>
        <small>Premium</small>
      </div>
      <img :src="icons['IMG_7']" alt="" class="sb__caret" />
    </footer>
  </aside>
</template>

<style scoped>
.sb {
  background: var(--surface-sidebar);
  border-right: 1px solid var(--border-default);
  padding: 24px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
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

.sb__link img {
  width: 20px;
  height: 20px;
  opacity: 0.75;
  transition: opacity var(--motion-fast);
}

.sb__link:hover {
  background: var(--color-primary-softer);
}

.sb__item.is-active .sb__link {
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
}

.sb__item.is-active .sb__link img {
  opacity: 1;
}

.sb__user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  margin-top: auto;
}

.sb__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
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
}
.sb__userinfo small {
  font-size: 11px;
  color: var(--text-muted);
}

.sb__caret {
  width: 14px;
  height: 14px;
  opacity: 0.6;
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

  .sb.is-open {
    transform: translateX(0);
  }

  .sb__close {
    display: inline-flex;
  }
}
</style>
