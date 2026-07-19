<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useFavoritesStore } from '@/stores/library'

const favorites = useFavoritesStore()

const search = ref('')
const categoryFilter = ref('Todas')
const dateFilter = ref('Mais recentes')
const view = ref('list')

const categories = ['Todas', 'Expressões', 'Viagem', 'Restaurante', 'Saudações', 'Comunicação']

onMounted(() => {
  favorites.fetchAll()
  if (favorites.items.length === 0) seedSamples()
})

function seedSamples() {
  const samples = [
    {
      frText: 'C\'est la vie',
      ptText: 'É a vida',
      phonetic: 'sɛ la vi',
      category: 'Expressões'
    },
    {
      frText: 'Où se trouve la boulangerie?',
      ptText: 'Onde fica a padaria?',
      phonetic: 'u sə tʁuv la bu.lɑ̃.ʒə.ʁi',
      category: 'Viagem'
    },
    {
      frText: 'Je voudrais un café, s\'il vous plaît',
      ptText: 'Eu gostaria de um café, por favor',
      phonetic: 'ʒə vu.dʁɛ zœ̃ kafe sil vu plɛ',
      category: 'Restaurante'
    },
    {
      frText: 'Enchanté de vous rencontrer',
      ptText: 'Prazer em conhecê-lo',
      phonetic: 'ɑ̃.ʃɑ̃.te də vu ʁɑ̃.kɔ̃.tʁe',
      category: 'Saudações'
    },
    {
      frText: 'Parlez-vous anglais?',
      ptText: 'Você fala inglês?',
      phonetic: 'paʁ.le vu zɑ̃.glɛ',
      category: 'Comunicação'
    }
  ]
  samples.forEach((s) => favorites.add(s))
}

const filtered = computed(() => {
  let list = favorites.items
  if (categoryFilter.value !== 'Todas') {
    list = list.filter((i) => i.category === categoryFilter.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (i) =>
        (i.frText || '').toLowerCase().includes(q) ||
        (i.ptText || '').toLowerCase().includes(q)
    )
  }
  return list
})

function toggleFavorite(item) {
  favorites.remove(item.id)
}
</script>

<template>
  <div class="fav-page">
    <div class="fav-page__head">
      <div>
        <h1>
          <AppIcon name="starFilled" :size="22" class="fav-star" />
          Favoritos
        </h1>
        <p>Suas frases e expressões salvas para consulta rápida e prática.</p>
      </div>
      <div class="fav-page__head-actions">
        <span class="fav-page__count">{{ favorites.items.length }} Frases Salvas</span>
        <button class="btn btn-light">
          <AppIcon name="list" :size="16" />
          <span>Listas</span>
        </button>
      </div>
    </div>

    <div class="fav-page__filters">
      <div class="fav-page__search">
        <AppIcon name="search" :size="16" class="search-icon" />
        <input v-model="search" type="text" placeholder="Pesquisar em seus favoritos..." />
      </div>
      <div class="fav-page__filters-right">
        <div class="fav-page__select">
          <AppIcon name="filter" :size="16" />
          <select v-model="categoryFilter">
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="fav-page__select">
          <select v-model="dateFilter">
            <option>Mais recentes</option>
            <option>Mais antigos</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>
    </div>

    <table class="fav-table">
      <thead>
        <tr>
          <th></th>
          <th>FRASE / TRADUÇÃO</th>
          <th></th>
          <th>AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filtered" :key="item.id">
          <td class="fav-table__check-cell">
            <button
              class="fav-check"
              :class="{ 'is-checked': true }"
              @click="toggleFavorite(item)"
              aria-label="Remover dos favoritos"
            >
              <AppIcon name="check" :size="14" />
            </button>
          </td>
          <td>
            <strong class="fav-table__fr">{{ item.frText }}</strong>
            <span class="tag" style="margin-left: 8px">{{ item.category }}</span>
            <p class="fav-table__pt">{{ item.ptText }}</p>
          </td>
          <td></td>
          <td class="fav-table__actions">
            <button class="ic-btn" aria-label="Ouvir">
              <AppIcon name="volume" :size="16" />
            </button>
            <button class="ic-btn" aria-label="Copiar">
              <AppIcon name="copy" :size="16" />
            </button>
          </td>
        </tr>

        <tr v-if="filtered.length === 0">
          <td colspan="4">
            <div class="fav-empty">
              <AppIcon name="star" :size="36" />
              <p>Nenhuma frase favoritada ainda.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <section class="practice-banner">
      <div class="practice-banner__icon">
        <AppIcon name="translate" :size="32" />
      </div>
      <div class="practice-banner__body">
        <h3>Pratique seus favoritos</h3>
        <p>
          Queremos ajudar você a memorizar essas frases. Use o modo de prática
          para ouvir a pronúncia nativa e repetir.
        </p>
      </div>
      <button class="btn btn-light">Começar Prática</button>
    </section>

    <footer class="page-footer">
      © 2026 French Succo — Todos os direitos reservados. &nbsp;&nbsp;
      Termos &nbsp;·&nbsp; Privacidade &nbsp;·&nbsp; Suporte
    </footer>
  </div>
</template>

<style scoped>
.fav-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.fav-page__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.fav-page__head h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.fav-star {
  color: var(--color-text);
}

.fav-star :deep(path) {
  fill: none;
  stroke: currentColor;
}

.fav-page__head p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.fav-page__head-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fav-page__count {
  font-size: 14px;
  font-weight: 600;
  padding: 8px 14px;
  background: var(--color-bg-alt);
  border-radius: 999px;
  color: var(--color-text-muted);
}

.fav-page__filters {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: center;
}

.fav-page__search {
  position: relative;
}

.fav-page__search input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  font-size: 14px;
  outline: none;
}

.fav-page__search input:focus {
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

.fav-page__filters-right {
  display: flex;
  gap: 10px;
}

.fav-page__select {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 14px;
  background: var(--color-bg-alt);
}

.fav-page__select select {
  border: none;
  background: transparent;
  outline: none;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
}

.fav-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border-soft);
}

.fav-table thead {
  background: var(--color-bg-alt);
}

.fav-table th {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 12px 16px;
  font-weight: 700;
}

.fav-table td {
  padding: 16px;
  border-top: 1px solid var(--color-border-soft);
  vertical-align: middle;
}

.fav-table__check-cell {
  width: 60px;
}

.fav-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background: transparent;
  transition: background 0.15s, color 0.15s;
}

.fav-check.is-checked {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.fav-check:hover {
  background: var(--color-primary-soft);
}

.fav-check.is-checked:hover {
  background: var(--color-primary-hover);
}

.fav-table__fr {
  font-size: 16px;
  font-weight: 700;
}

.fav-table__pt {
  margin: 6px 0 0;
  font-style: italic;
  color: var(--color-text-muted);
  font-size: 13px;
}

.fav-table__actions {
  width: 120px;
  text-align: right;
}

.fav-table__actions .ic-btn + .ic-btn {
  margin-left: 4px;
}

.fav-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.practice-banner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  background: var(--color-primary);
  background: linear-gradient(135deg, #4f8df9 0%, #1f4ed8 100%);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 22px 26px;
  margin-top: 8px;
}

.practice-banner__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.practice-banner__body h3 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
}

.practice-banner__body p {
  margin: 0;
  font-size: 13px;
  opacity: 0.92;
  line-height: 1.5;
}

.practice-banner .btn-light {
  background: #fff;
  color: var(--color-primary);
  border: none;
}

.page-footer {
  margin-top: 8px;
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}

@media (max-width: 800px) {
  .fav-page__filters {
    grid-template-columns: 1fr;
  }
  .practice-banner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .fav-table thead {
    display: none;
  }
  .fav-table td {
    display: block;
    padding: 12px 16px;
  }
  .fav-table__actions {
    text-align: left;
  }
}
</style>
