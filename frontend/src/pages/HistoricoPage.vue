<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useHistoryStore, useFavoritesStore } from '@/stores/library'

const history = useHistoryStore()
const favorites = useFavoritesStore()

const search = ref('')
const categoryFilter = ref('Todas')
const categories = ['Todas', 'Comum', 'Viagem', 'Estudo']

onMounted(() => {
  history.fetchAll()
  favorites.fetchAll()
  if (history.items.length === 0) seedMockHistory()
})

function seedMockHistory() {
  const now = Date.now()
  const samples = [
    {
      createdAt: new Date(now - 60 * 60 * 1000).toISOString(),
      sourceLang: 'pt',
      sourceText: 'Olá, como você está hoje?',
      frText: 'Bonjour, comment allez-vous aujourd\'hui ?',
      phonetic: 'bõʒuʁ kɔmɑ̃tale vu.z‿o.ʒuʁ.dɥi',
      category: 'Comum'
    },
    {
      createdAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
      sourceLang: 'pt',
      sourceText: 'Eu gostaria de pedir um café com leite, por favor.',
      frText: 'Je voudrais commander un café au lait, s\'il vous plaît.',
      phonetic: 'ʒə.vudʁɛ kɔmɑ̃.de  œ̃ kafe o lɛ sil vu plɛ',
      category: 'Viagem'
    },
    {
      createdAt: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
      sourceLang: 'pt',
      sourceText: 'Onde fica a estação de metrô mais próxima?',
      frText: 'Où se trouve la estação de metro a mais próxima?',
      phonetic: 'u sə tʁuv la esta.sjɔ̃ də me.tʁo',
      category: 'Viagem'
    },
    {
      createdAt: new Date(now - 28 * 60 * 60 * 1000).toISOString(),
      sourceLang: 'pt',
      sourceText: 'É um prazer conhecer você.',
      frText: 'C\'est um prazer de vous rencontrer.',
      phonetic: 'sɛst‿œ̃ pʁa.ze də vu ʁɑ̃.kɔ̃.tʁe',
      category: 'Comum'
    },
    {
      createdAt: new Date(Date.UTC(2025, 9, 22, 11, 5)).toISOString(),
      sourceLang: 'pt',
      sourceText: 'Qual é o seu número de telefone?',
      frText: 'Quel est o seu número de telefone?',
      phonetic: 'kɛl ɛ sɥ nœmbʁ də te.lə.fɔn',
      category: 'Estudo'
    }
  ]
  samples.forEach((s) => history.add(s))
}

const filtered = computed(() => {
  let list = history.items
  if (categoryFilter.value !== 'Todas') {
    list = list.filter((i) => i.category === categoryFilter.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (i) =>
        (i.frText || '').toLowerCase().includes(q) ||
        (i.sourceText || '').toLowerCase().includes(q)
    )
  }
  return list
})

function formatWhen(iso) {
  const d = new Date(iso)
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfItem = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const diffDays = Math.round((startOfDay - startOfItem) / 86400000)
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  if (diffDays === 0) return `Hoje, ${hh}:${mm}`
  if (diffDays === 1) return `Ontem, ${hh}:${mm}`
  const day = d.getDate()
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${day} ${months[d.getMonth()]}, ${hh}:${mm}`
}

function clearAll() {
  if (confirm('Apagar todo o histórico?')) history.clear()
}

function toggleFavorite(item) {
  if (favorites.isFavorited(item.frText)) {
    const fav = favorites.items.find((f) => f.frText === item.frText)
    if (fav) favorites.remove(fav.id)
  } else {
    favorites.add({
      frText: item.frText,
      ptText: item.sourceText,
      phonetic: item.phonetic,
      category: item.category
    })
  }
}

function isFav(frText) {
  return favorites.isFavorited(frText)
}
</script>

<template>
  <div class="history-page">
    <div class="history-page__head">
      <div>
        <h1>Meu Histórico</h1>
        <p>Acompanhe todas as suas traduções passadas e revise seu aprendizado.</p>
      </div>
      <div class="history-page__head-actions">
        <button class="btn btn-light" @click="clearAll">
          <AppIcon name="trash" :size="16" />
          <span>Limpar Tudo</span>
        </button>
        <button class="btn btn-primary">
          <AppIcon name="calendar" :size="16" />
          <span>Filtrar Data</span>
        </button>
      </div>
    </div>

    <div class="history-page__filters">
      <div class="history-page__search">
        <AppIcon name="search" :size="16" class="search-icon" />
        <input v-model="search" type="text" placeholder="Pesquisar em suas traduções..." />
      </div>
      <div class="history-page__filters-right">
        <div class="history-page__select">
          <AppIcon name="filter" :size="16" />
          <select v-model="categoryFilter">
            <option v-for="c in categories" :key="c" :value="c">Categorias</option>
          </select>
        </div>
        <span class="history-page__count">{{ filtered.length }} resultados</span>
      </div>
    </div>

    <div class="history-list">
      <article v-for="item in filtered" :key="item.id" class="history-item">
        <div class="history-item__head">
          <div class="history-item__meta">
            <AppIcon name="clock" :size="14" />
            <span>{{ formatWhen(item.createdAt) }}</span>
            <span class="tag">{{ item.category || 'Comum' }}</span>
          </div>
          <button
            class="ic-btn ic-btn--ghost"
            :class="{ 'is-fav': isFav(item.frText) }"
            @click="toggleFavorite(item)"
            aria-label="Favoritar"
          >
            <AppIcon :name="isFav(item.frText) ? 'starFilled' : 'star'" :size="16" />
          </button>
        </div>
        <div class="history-item__body">
          <div class="history-item__fr">
            <span class="lang-bubble fr">FR</span>
            <em>{{ item.frText }}</em>
          </div>
          <div class="history-item__pt">
            <span class="lang-bubble pt">PT</span>
            <span>{{ item.sourceText }}</span>
          </div>
        </div>
        <button class="ic-btn history-item__menu" aria-label="Mais opções">
          <AppIcon name="more" :size="16" />
        </button>
      </article>

      <div v-if="filtered.length === 0" class="history-empty">
        <AppIcon name="book" :size="36" />
        <p>Nenhuma tradução encontrada.</p>
      </div>
    </div>

    <div class="history-page__footer">
      <AppIcon name="check" :size="14" />
      <span>Todas as traduções carregadas</span>
    </div>

    <footer class="page-footer">
      © 2026 French Succo — Privacidade &nbsp;·&nbsp; Termos &nbsp;·&nbsp;
      <span style="color: var(--color-success)">●</span> Sincronizado na Nuvem &nbsp;
      <span class="version">V 2.4.0</span>
    </footer>
  </div>
</template>

<style scoped>
.history-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.history-page__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.history-page__head h1 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 6px;
}

.history-page__head p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.history-page__head-actions {
  display: flex;
  gap: 8px;
}

.history-page__filters {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
}

.history-page__search {
  position: relative;
}

.history-page__search input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}

.history-page__search input:focus {
  border-color: var(--color-primary);
  background: #fff;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-soft);
}

.history-page__filters-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.history-page__select {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 14px;
}

.history-page__select select {
  border: none;
  background: transparent;
  outline: none;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
}

.history-page__count {
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 600;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.history-item {
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.history-item:hover {
  border-color: var(--color-primary-soft2);
  box-shadow: var(--shadow-sm);
}

.history-item__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.history-item__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--color-text-muted);
}

.ic-btn--ghost {
  background: transparent;
  color: var(--color-text-soft);
}

.ic-btn--ghost:hover,
.ic-btn--ghost.is-fav {
  color: var(--color-accent);
  background: transparent;
}

.ic-btn--ghost.is-fav :deep(path) {
  fill: currentColor;
}

.history-item__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.history-item__fr,
.history-item__pt {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.history-item__fr em {
  color: var(--color-text);
  font-weight: 600;
}

.history-item__pt {
  color: var(--color-text-muted);
}

.history-item__menu {
  position: absolute;
  top: 18px;
  right: 18px;
  margin-top: 28px;
}

.history-empty {
  background: #fff;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 40px;
  text-align: center;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.history-page__footer {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: center;
  padding: 10px 20px;
  color: var(--color-text-muted);
  font-size: 13px;
}

.page-footer {
  margin-top: 12px;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}

.version {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  margin-left: 4px;
}

@media (max-width: 700px) {
  .history-page__filters {
    grid-template-columns: 1fr;
  }
}
</style>
