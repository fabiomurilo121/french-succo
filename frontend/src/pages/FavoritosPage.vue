<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFavoritesStore } from '@/stores/library'
import { useToastStore } from '@/stores/toast'
import icons from '@/assets/icons'
import { APP_VERSION, APP_BUILD } from '@/version'

const favorites = useFavoritesStore()
const toast = useToastStore()

const search = ref('')
const categoryFilter = ref('Todas')

const categories = [
  'Todas',
  'Expressões',
  'Viagem',
  'Restaurante',
  'Saudações',
  'Comunicação'
]

onMounted(() => {
  favorites.fetchAll()
  if (favorites.items.length === 0) seedSamples()
})

function seedSamples() {
  const samples = [
    { original: "C'est la vie", translation: 'É a vida', category: 'Expressões', checked: true },
    { original: 'Où se trouve la boulangerie?', translation: 'Onde fica a padaria?', category: 'Viagem', checked: false },
    { original: "Je voudrais un café, s'il vous plaît", translation: 'Eu gostaria de um café, por favor', category: 'Restaurante', checked: true },
    { original: 'Enchanté de vous rencontrer', translation: 'Prazer em conhecê-lo', category: 'Saudações', checked: false },
    { original: 'Parlez-vous anglais?', translation: 'Você fala inglês?', category: 'Comunicação', checked: false }
  ]
  samples.forEach((s) =>
    favorites.add({
      frText: s.original,
      ptText: s.translation,
      category: s.category
    })
  )
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

const totalCount = computed(() => favorites.items.length)

function toggleChecked(item) {
  favorites.remove(item.id)
  toast.info('Removido dos favoritos', { duration: 1500 })
}

function playAudio(text) {
  if (!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'fr-FR'
  speechSynthesis.cancel()
  speechSynthesis.speak(u)
}
</script>

<template>
  <div class="fp">
    <header class="fp__head">
      <div>
        <div class="fp__title-row">
          <span class="fp__star">
            <img :src="icons['IMG_4']" alt="" />
          </span>
          <h1 class="fp__title">Favoritos</h1>
        </div>
        <p class="fp__sub">Suas frases e expressões salvas para consulta rápida e prática.</p>
      </div>
      <div class="fp__head-actions">
        <div class="fp__pill">{{ totalCount }} Frases Salvas</div>
        <button class="fp__btn-list">
          <img :src="icons['IMG_10']" alt="" />
          Listas
        </button>
      </div>
    </header>

    <div class="fp__filters">
      <div class="fp__search">
        <img :src="icons['IMG_8']" alt="" class="fp__search-icon" />
        <input v-model="search" type="text" placeholder="Pesquisar em seus favoritos..." aria-label="Buscar" />
      </div>
      <button class="fp__filter-btn" type="button">
        <img :src="icons['IMG_11']" alt="" />
        Categoria
      </button>
      <button class="fp__filter-btn" type="button">Data</button>
    </div>

    <div class="fp__table-head">
      <span>FRASE / TRADUÇÃO</span>
      <span>AÇÕES</span>
    </div>

    <div class="fp__list">
      <div v-for="fav in filtered" :key="fav.id" class="fp__item">
        <button
          class="fp__check"
          :class="{ 'is-checked': true }"
          type="button"
          @click="toggleChecked(fav)"
          aria-label="Remover dos favoritos"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="5 12 10 17 19 7" />
          </svg>
        </button>
        <div class="fp__item-body">
          <div class="fp__item-head">
            <strong class="fp__item-fr">{{ fav.frText }}</strong>
            <span class="tag fp__item-tag">{{ fav.category }}</span>
          </div>
          <p class="fp__item-pt">{{ fav.ptText }}</p>
        </div>
        <div class="fp__item-tools">
          <button class="icon-btn" @click="playAudio(fav.frText)" aria-label="Ouvir">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
              <path d="M19 5a5 5 0 0 1 0 14" />
            </svg>
          </button>
          <button class="icon-btn" aria-label="Mais opções">
            <img :src="icons['IMG_15']" alt="" />
          </button>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="fp__empty">
        <p>Nenhuma frase favoritada ainda.</p>
      </div>
    </div>

    <section class="fp__banner">
      <div class="fp__banner-icon">
        <img :src="icons['IMG_1']" alt="" />
      </div>
      <div class="fp__banner-body">
        <h2>Pratique seus favoritos</h2>
        <p>Use o modo de prática para ouvir a pronúncia nativa e repetir.</p>
      </div>
      <button class="fp__banner-cta" type="button">Começar Prática</button>
    </section>

    <footer class="fp__footer">
      <div class="fp__footer-text">
        <p>© 2026 French Succo — Todos os direitos reservados.</p>
        <span class="fp__footer-version">
          v{{ APP_VERSION }}
          <small>· {{ APP_BUILD }}</small>
        </span>
      </div>
      <div class="fp__footer-links">
        <a href="#">Termos</a>
        <a href="#">Privacidade</a>
        <a href="#">Suporte</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fp {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
}

.fp__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.fp__title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fp__star {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: var(--color-accent-soft, rgba(249, 115, 22, 0.12));
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fp__star img {
  width: 22px;
  height: 22px;
  filter: invert(58%) sepia(89%) saturate(2476%) hue-rotate(359deg);
}

.fp__title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  line-height: 1;
}

.fp__sub {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--text-muted);
}

.fp__head-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.fp__pill {
  padding: 8px 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
}

.fp__btn-list {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
}
.fp__btn-list img {
  width: 14px;
  height: 14px;
}
.fp__btn-list:hover {
  background: var(--surface-card);
  color: var(--color-primary);
}

.fp__filters {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 768px) {
  .fp__filters {
    grid-template-columns: 1fr auto auto;
  }
}

.fp__search {
  position: relative;
}

.fp__search-icon {
  position: absolute;
  top: 50%;
  left: 14px;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);
  opacity: 0.6;
}

.fp__search input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  font-size: 14px;
  color: var(--text-primary);
}
.fp__search input::placeholder {
  color: var(--text-muted);
}
.fp__search input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.fp__filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 22px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}
.fp__filter-btn img {
  width: 14px;
  height: 14px;
}
.fp__filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.fp__table-head {
  display: none;
  justify-content: space-between;
  padding: 0 8px;
  margin-bottom: 8px;
}
.fp__table-head span {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  text-transform: uppercase;
}

@media (min-width: 768px) {
  .fp__table-head {
    display: flex;
  }
}

.fp__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fp__item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast),
    transform var(--motion-fast);
}
.fp__item:hover {
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: var(--shadow-sm);
}

.fp__check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 4px;
}
.fp__check.is-checked {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.fp__item-body {
  flex: 1;
  min-width: 0;
}

.fp__item-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.fp__item-fr {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  word-break: break-word;
}

.fp__item-tag {
  flex-shrink: 0;
}

.fp__item-pt {
  margin: 4px 0 0;
  font-size: 12px;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1.5;
}

.fp__item-tools {
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity var(--motion-fast);
}
@media (hover: hover) {
  .fp__item:hover .fp__item-tools {
    opacity: 1;
  }
}
.fp__item-tools .icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
.fp__item-tools img {
  width: 14px;
  height: 14px;
}

.fp__empty {
  text-align: center;
  padding: 40px 16px;
  color: var(--text-muted);
  font-size: 14px;
}

.fp__banner {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #3b82f6 0%, #0047ad 100%);
  color: #fff;
  text-align: center;
}

@media (min-width: 768px) {
  .fp__banner {
    flex-direction: row;
    text-align: left;
    padding: 28px 32px;
  }
}

.fp__banner-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  flex-shrink: 0;
}
.fp__banner-icon img {
  width: 48px;
  height: 48px;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}

.fp__banner-body {
  flex: 1;
}

.fp__banner h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
}
.fp__banner p {
  margin: 0;
  font-size: 14px;
  opacity: 0.85;
  line-height: 1.5;
}

.fp__banner-cta {
  padding: 14px 32px;
  background: #fff;
  color: var(--color-primary);
  border-radius: 14px;
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.fp__banner-cta:hover {
  background: #f8fafc;
}

.fp__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 0;
  font-size: 11px;
  color: var(--text-muted);
  border-top: 1px solid var(--border-default);
}

.fp__footer-text {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.fp__footer-version {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.04em;
}
.fp__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}

.fp__footer-links {
  display: flex;
  gap: 16px;
}
.fp__footer-links a:hover {
  color: var(--color-primary);
}
</style>
