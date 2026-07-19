<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumb = computed(() => {
  const map = {
    dashboard: 'Painel de Tradução',
    historico: 'Meu Histórico',
    favoritos: 'Favoritos',
    configuracoes: 'Configurações de Aprendizado'
  }
  return map[route.name] || 'Painel de Tradução'
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
  outline: none;
  transition: box-shadow 0.15s;
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
  transition: background 0.15s;
}

.topbar__iconbtn:hover {
  background: var(--color-bg-alt);
}
</style>
