<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

onMounted(() => {
  settings.load()
})

watchEffect(() => {
  settings.persist()
})

const open = ref(false)
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <div class="sidebar__logo">
        <span class="sidebar__logo-cn">文</span>
        <span class="sidebar__logo-a">A</span>
        <span class="sidebar__logo-fr">A</span>
      </div>
      <span class="sidebar__title">Aprender Francês</span>
    </div>

    <nav class="sidebar__nav">
      <router-link to="/dashboard" class="sidebar__item" active-class="is-active">
        <span class="sidebar__icon">⊞</span>
        <span>Dashboard</span>
      </router-link>
      <router-link to="/historico" class="sidebar__item" active-class="is-active">
        <span class="sidebar__icon">⟳</span>
        <span>Histórico</span>
      </router-link>
      <router-link to="/favoritos" class="sidebar__item" active-class="is-active">
        <span class="sidebar__icon">★</span>
        <span>Favoritos</span>
      </router-link>
      <router-link to="/configuracoes" class="sidebar__item" active-class="is-active">
        <span class="sidebar__icon">⚙</span>
        <span>Configurações</span>
      </router-link>
    </nav>

    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">U</div>
        <div class="sidebar__userinfo">
          <strong>Usuário</strong>
          <small>Premium</small>
        </div>
        <span class="sidebar__caret">⌄</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background: var(--color-sidebar);
  border-right: 1px solid var(--color-border-soft);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}

.sidebar__logo {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  flex-shrink: 0;
}

.sidebar__logo-cn,
.sidebar__logo-fr {
  position: absolute;
  font-size: 11px;
  font-weight: 700;
}

.sidebar__logo-cn {
  top: 6px;
  left: 8px;
}

.sidebar__logo-fr {
  bottom: 6px;
  right: 8px;
}

.sidebar__logo-a {
  font-size: 18px;
  letter-spacing: -1px;
}

.sidebar__title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-primary);
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: 14px;
  transition: all 0.15s ease;
}

.sidebar__item:hover {
  background: rgba(59, 130, 246, 0.06);
  color: var(--color-primary);
}

.sidebar__item.is-active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
}

.sidebar__icon {
  width: 20px;
  display: inline-flex;
  justify-content: center;
  font-size: 16px;
}

.sidebar__footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-soft);
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.15s;
}

.sidebar__user:hover {
  background: rgba(59, 130, 246, 0.06);
}

.sidebar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.sidebar__userinfo {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  flex: 1;
}

.sidebar__userinfo strong {
  font-size: 13px;
}

.sidebar__userinfo small {
  font-size: 11px;
  color: var(--color-text-muted);
}

.sidebar__caret {
  color: var(--color-text-soft);
}
</style>
