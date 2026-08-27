<script setup>
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { api } from '@/services/api'
import { useToastStore } from '@/stores/toast'
import { useSettingsStore } from '@/stores/settings'
import { getAudioUrl } from '@/services/audioCache'

const toast = useToastStore()
const settings = useSettingsStore()

// ── State ─────────────────────────────────────────────
const items = ref([])
const categories = ref(['Todas'])
const loading = ref(false)
const search = ref('')
const filterCategory = ref('Todas')
const sortBy = ref('recent')

// Form state
const form = ref(emptyForm())
const checking = ref(false)
const submitting = ref(false)
const checkResult = ref(null)
const showForm = ref(true)
const forceSubmit = ref(false)

const formInput = ref(null)

function emptyForm() {
  return {
    word: '',
    translation: '',
    phonetic: '',
    category: '',
    notes: '',
    context: ''
  }
}

// ── Computed ──────────────────────────────────────────
const sortedItems = computed(() => {
  const copy = [...items.value]
  if (sortBy.value === 'recent') {
    copy.sort((a, b) => new Date(b.learnedAt) - new Date(a.learnedAt))
  } else if (sortBy.value === 'oldest') {
    copy.sort((a, b) => new Date(a.learnedAt) - new Date(b.learnedAt))
  } else if (sortBy.value === 'az') {
    copy.sort((a, b) => a.word.localeCompare(b.word, 'fr'))
  } else if (sortBy.value === 'reviews') {
    copy.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
  }
  return copy
})

const filteredItems = computed(() => {
  let list = sortedItems.value
  if (filterCategory.value && filterCategory.value !== 'Todas') {
    list = list.filter((i) => (i.category || '') === filterCategory.value)
  }
  if (search.value.trim()) {
    const term = search.value.trim().toLowerCase()
    list = list.filter(
      (i) =>
        i.word.toLowerCase().includes(term) ||
        (i.translation || '').toLowerCase().includes(term) ||
        (i.notes || '').toLowerCase().includes(term)
    )
  }
  return list
})

const stats = computed(() => {
  const total = items.value.length
  const reviewed = items.value.filter((i) => (i.reviewCount || 0) > 0).length
  const withCategory = items.value.filter((i) => i.category).length
  const last7 = items.value.filter((i) => {
    if (!i.learnedAt) return false
    return Date.now() - new Date(i.learnedAt).getTime() < 7 * 86400 * 1000
  }).length
  return { total, reviewed, withCategory, last7 }
})

// ── Audio ─────────────────────────────────────────────
const audioEl = ref(null)
const playingId = ref(null)

function playWord(item) {
  if (!item?.word || !audioEl.value) return
  if (playingId.value === item.id) {
    stopAudio()
    return
  }
  stopAudio()
  playingId.value = item.id
  try {
    const { url } = getAudioUrl(item.word, {
      voice: settings.voice === 'male' ? 'male' : 'female',
      region: settings.region || 'fr',
      speed: settings.speed ?? 1.0
    })
    audioEl.value.src = url
    audioEl.value.load()
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') p.catch(() => stopAudio())
  } catch {
    stopAudio()
  }
}

function stopAudio() {
  playingId.value = null
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
}

function onAudioEnded() {
  playingId.value = null
}

function onAudioError() {
  playingId.value = null
}

// ── Validation ────────────────────────────────────────
let checkTimer = null
let lastCheckedWord = ''

async function maybeCheckWord() {
  const word = form.value.word.trim()
  if (!word || word.length < 2) {
    checkResult.value = null
    return
  }
  if (word === lastCheckedWord) return

  if (checkTimer) clearTimeout(checkTimer)
  checkTimer = setTimeout(async () => {
    lastCheckedWord = word
    checking.value = true
    try {
      const res = await api.checkLearnedWord(word)
      checkResult.value = res
    } catch (err) {
      console.warn('check failed', err)
    } finally {
      checking.value = false
    }
  }, 400)
}

watch(
  () => form.value.word,
  () => {
    forceSubmit.value = false
    maybeCheckWord()
  }
)

const canSubmit = computed(() => {
  const w = form.value.word.trim()
  const t = form.value.translation.trim()
  if (!w || !t) return false
  if (checking.value) return false
  if (!checkResult.value) return true
  if (!checkResult.value.validation.isValid) return false
  if (checkResult.value.validation.isDuplicate && !forceSubmit.value) return false
  return true
})

const submitHint = computed(() => {
  const w = form.value.word.trim()
  const t = form.value.translation.trim()
  if (!w) return 'Digite a palavra em francês.'
  if (!t) return 'Digite a tradução em português.'
  if (checking.value) return 'Verificando…'
  if (!checkResult.value) return ''
  if (!checkResult.value.validation.isValid) {
    return checkResult.value.validation.reason || 'Palavra inválida.'
  }
  if (checkResult.value.validation.isDuplicate && !forceSubmit.value) {
    return checkResult.value.validation.reason || 'Palavra duplicada.'
  }
  if (forceSubmit.value) return 'Você optou por adicionar mesmo assim.'
  return 'Tudo certo — pode adicionar!'
})

const submitHintTone = computed(() => {
  const w = form.value.word.trim()
  const t = form.value.translation.trim()
  if (!w || !t) return 'muted'
  if (checking.value) return 'muted'
  if (!checkResult.value) return 'muted'
  if (!checkResult.value.validation.isValid) return 'error'
  if (checkResult.value.validation.isDuplicate && !forceSubmit.value) return 'error'
  if (forceSubmit.value) return 'warning'
  return 'success'
})

// ── CRUD ──────────────────────────────────────────────
async function loadAll() {
  loading.value = true
  try {
    const [list, cats] = await Promise.all([
      api.getLearnedWords(),
      api.getLearnedWordCategories().catch(() => ['Todas'])
    ])
    items.value = list || []
    if (Array.isArray(cats)) {
      categories.value = cats
    }
  } catch (err) {
    toast.error(err.message || 'Erro ao carregar vocabulário.')
  } finally {
    loading.value = false
  }
}

async function submit() {
  if (!canSubmit.value) return
  submitting.value = true
  try {
    const payload = {
      word: form.value.word.trim(),
      translation: form.value.translation.trim(),
      phonetic: form.value.phonetic.trim() || null,
      category: form.value.category.trim() || null,
      notes: form.value.notes.trim() || null,
      context: form.value.context.trim() || null,
      force: forceSubmit.value || undefined
    }
    const created = await api.addLearnedWord(payload)
    items.value.unshift(created)
    toast.success(`"${created.word}" adicionado ao seu vocabulário!`)

    // recarrega categorias para incluir a nova
    api.getLearnedWordCategories().then((c) => {
      if (Array.isArray(c)) categories.value = c
    })

    resetForm()
  } catch (err) {
    if (err.status === 409) {
      // duplicate — oferecer "forçar"
      const data = err.detail || {}
      checkResult.value = data.check || checkResult.value
      forceSubmit.value = true
      toast.warning('Essa palavra já existe. Use "Adicionar mesmo assim" se quiser.')
    } else if (err.status === 422) {
      const data = err.detail || {}
      checkResult.value = data.check || checkResult.value
      toast.error(err.message || 'Palavra inválida.')
    } else {
      toast.error(err.message || 'Erro ao adicionar palavra.')
    }
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  form.value = emptyForm()
  checkResult.value = null
  forceSubmit.value = false
  lastCheckedWord = ''
  nextTick(() => formInput.value?.focus())
}

async function removeItem(item) {
  if (!confirm(`Remover "${item.word}" do vocabulário?`)) return
  try {
    await api.deleteLearnedWord(item.id)
    items.value = items.value.filter((i) => i.id !== item.id)
    toast.success('Removido.')
  } catch (err) {
    toast.error(err.message || 'Erro ao remover.')
  }
}

async function markReviewed(item) {
  try {
    const updated = await api.markLearnedWordReviewed(item.id)
    const idx = items.value.findIndex((i) => i.id === item.id)
    if (idx >= 0) items.value[idx] = updated
    toast.info(`"${item.word}" marcada como revisada.`)
  } catch (err) {
    toast.error(err.message || 'Erro ao marcar como revisada.')
  }
}

async function clearAll() {
  if (items.value.length === 0) return
  if (!confirm(`Apagar TODAS as ${items.value.length} palavras? Esta ação não pode ser desfeita.`)) return
  try {
    await api.clearLearnedWords()
    items.value = []
    toast.success('Vocabulário limpo.')
  } catch (err) {
    toast.error(err.message || 'Erro ao limpar.')
  }
}

function useSuggestion(s) {
  if (!s) return
  form.value.word = s.word
  form.value.translation = form.value.translation || s.translation
  lastCheckedWord = ''
  forceSubmit.value = false
  nextTick(() => {
    maybeCheckWord()
    formInput.value?.focus()
  })
}

// ── Helpers ──────────────────────────────────────────
function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'agora'
  if (diff < 3600) return `Há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Há ${Math.floor(diff / 3600)} h`
  if (diff < 86400 * 7) return `Há ${Math.floor(diff / 86400)} d`
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function highlightMatch(text, term) {
  if (!term || !text) return text
  const lower = text.toLowerCase()
  const lt = term.toLowerCase()
  const idx = lower.indexOf(lt)
  if (idx < 0) return text
  return [
    text.slice(0, idx),
    `<mark>${text.slice(idx, idx + term.length)}</mark>`,
    text.slice(idx + term.length)
  ].join('')
}

// ── Lifecycle ─────────────────────────────────────────
onMounted(() => {
  loadAll()
})

onUnmounted(() => {
  stopAudio()
  if (checkTimer) clearTimeout(checkTimer)
})

// Pre-fill categoria rápida via querystring (?category=Cumprimentos)
function applyQueryCategory() {
  const params = new URLSearchParams(window.location.search)
  const cat = params.get('category')
  if (cat) form.value.category = cat
}
applyQueryCategory()
</script>

<template>
  <div class="vb">
    <!-- Header -->
    <header class="vb__head">
      <div class="vb__head-text">
        <span class="vb__eyebrow">VOCABULÁRIO APRENDIDO</span>
        <h1 class="vb__title">Suas palavras em francês</h1>
        <p class="vb__sub">
          Guarde aqui cada palavra ou expressão nova que você for aprendendo.
          O sistema verifica duplicatas, sugere correções e valida a ortografia automaticamente.
        </p>
      </div>
      <div class="vb__head-stats">
        <div class="vb__stat">
          <strong>{{ stats.total }}</strong>
          <small>palavras</small>
        </div>
        <span class="vb__stat-divider"></span>
        <div class="vb__stat">
          <strong>{{ stats.last7 }}</strong>
          <small>nos últimos 7 dias</small>
        </div>
        <span class="vb__stat-divider"></span>
        <div class="vb__stat">
          <strong>{{ stats.reviewed }}</strong>
          <small>revisadas</small>
        </div>
      </div>
    </header>

    <!-- Formulário -->
    <section class="vb__form-card">
      <div class="vb__form-head">
        <div>
          <h2>Adicionar palavra</h2>
          <p>Preencha os campos obrigatórios. Use o asterisco (<span class="req">*</span>) como guia.</p>
        </div>
        <button
          class="vb__collapse"
          type="button"
          :aria-expanded="showForm"
          @click="showForm = !showForm"
        >
          <AppIcon :name="showForm ? 'arrow' : 'arrow'" :size="16" :style="{ transform: showForm ? 'rotate(180deg)' : 'rotate(0)' }" />
          {{ showForm ? 'Ocultar formulário' : 'Mostrar formulário' }}
        </button>
      </div>

      <Transition name="vb-collapse">
        <form v-show="showForm" class="vb__form" @submit.prevent="submit">
          <div class="vb__field vb__field--wide">
            <label for="vb-word">
              Palavra em francês
              <span class="req">*</span>
              <span v-if="checking" class="vb__checking" aria-live="polite">
                <span class="vb__spinner"></span>
                verificando…
              </span>
            </label>
            <input
              id="vb-word"
              ref="formInput"
              v-model="form.word"
              type="text"
              maxlength="120"
              autocomplete="off"
              spellcheck="true"
              placeholder="Ex: pomme, s'il vous plaît, bon appétit…"
              class="vb__input"
              :class="{
                'is-error': checkResult && !checkResult.validation.isValid,
                'is-warning': checkResult && checkResult.validation.isDuplicate && !forceSubmit,
                'is-success': checkResult && checkResult.validation.isValid && !checkResult.validation.isDuplicate && form.word.trim().length > 1
              }"
            />
          </div>

          <div class="vb__field">
            <label for="vb-translation">
              Tradução em português
              <span class="req">*</span>
            </label>
            <input
              id="vb-translation"
              v-model="form.translation"
              type="text"
              maxlength="400"
              autocomplete="off"
              placeholder="Ex: maçã, por favor, bom apetite…"
              class="vb__input"
            />
          </div>

          <div class="vb__field">
            <label for="vb-category">Categoria</label>
            <input
              id="vb-category"
              v-model="form.category"
              type="text"
              maxlength="40"
              list="vb-cat-list"
              autocomplete="off"
              placeholder="Ex: Cumprimentos, Viagem…"
              class="vb__input"
            />
            <datalist id="vb-cat-list">
              <option
                v-for="c in categories.filter((x) => x !== 'Todas')"
                :key="c"
                :value="c"
              />
            </datalist>
          </div>

          <div class="vb__field vb__field--wide">
            <label for="vb-notes">Notas pessoais</label>
            <textarea
              id="vb-notes"
              v-model="form.notes"
              rows="2"
              maxlength="1000"
              placeholder="Anotações, exemplos, dica cultural, etc."
              class="vb__input vb__textarea"
            ></textarea>
          </div>

          <!-- Validation feedback -->
          <div v-if="checkResult" class="vb__feedback" :class="`vb__feedback--${submitHintTone}`">
            <div class="vb__feedback-row">
              <AppIcon
                :name="
                  submitHintTone === 'success' ? 'check' :
                  submitHintTone === 'warning' ? 'warning' :
                  submitHintTone === 'error' ? 'cross' : 'info'
                "
                :size="16"
              />
              <span>{{ submitHint }}</span>
            </div>

            <ul v-if="checkResult.validation.suggestions?.length" class="vb__suggestions">
              <li
                v-for="s in checkResult.validation.suggestions"
                :key="s.id"
                class="vb__suggestion"
              >
                <span>
                  Você já tem <strong>{{ s.word }}</strong>
                  <small>({{ s.translation }})</small>
                </span>
                <button type="button" class="vb__suggestion-btn" @click="useSuggestion(s)">
                  <AppIcon name="arrow" :size="12" :style="{ transform: 'rotate(180deg)' }" />
                  Usar
                </button>
              </li>
            </ul>

            <div v-if="checkResult.validation.isDuplicate && !forceSubmit" class="vb__force">
              <button type="button" class="vb__btn vb__btn--quiet" @click="forceSubmit = true">
                Adicionar mesmo assim
              </button>
            </div>
            <div v-else-if="forceSubmit" class="vb__force">
              <button type="button" class="vb__btn vb__btn--quiet" @click="forceSubmit = false">
                Cancelar "adicionar mesmo assim"
              </button>
            </div>
          </div>

          <div class="vb__actions">
            <button type="button" class="vb__btn vb__btn--ghost" @click="resetForm">
              Limpar
            </button>
            <button type="submit" class="vb__btn vb__btn--primary" :disabled="!canSubmit || submitting">
              <span v-if="submitting" class="vb__spinner"></span>
              <AppIcon v-else name="sparkles" :size="16" />
              Adicionar ao vocabulário
            </button>
          </div>
        </form>
      </Transition>
    </section>

    <!-- Filters / search -->
    <section class="vb__filters">
      <div class="vb__search">
        <AppIcon name="search" :size="16" />
        <input
          v-model="search"
          type="search"
          placeholder="Buscar por palavra, tradução ou notas…"
        />
      </div>
      <div class="vb__filter-group">
        <label class="vb__filter-label">Categoria</label>
        <div class="vb__chips">
          <button
            v-for="c in categories"
            :key="c"
            type="button"
            class="vb__chip"
            :class="{ 'is-active': filterCategory === c }"
            @click="filterCategory = c"
          >
            {{ c }}
          </button>
        </div>
      </div>
      <div class="vb__sort">
        <label for="vb-sort">Ordenar por</label>
        <select id="vb-sort" v-model="sortBy" class="vb__select">
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigas</option>
          <option value="az">A-Z</option>
          <option value="reviews">Mais revisadas</option>
        </select>
      </div>
    </section>

    <!-- Lista -->
    <section class="vb__list-section">
      <header class="vb__list-head">
        <h2>
          {{ filteredItems.length }}
          {{ filteredItems.length === 1 ? 'palavra' : 'palavras' }}
          <span v-if="filterCategory !== 'Todas'">em {{ filterCategory }}</span>
        </h2>
        <button
          v-if="items.length > 0"
          type="button"
          class="vb__btn vb__btn--danger-quiet"
          @click="clearAll"
        >
          <AppIcon name="trash" :size="14" />
          Limpar tudo
        </button>
      </header>

      <div v-if="loading" class="vb__state">
        <span class="vb__spinner vb__spinner--lg"></span>
        <p>Carregando seu vocabulário…</p>
      </div>

      <div v-else-if="items.length === 0" class="vb__state">
        <AppIcon name="sparkles" :size="40" />
        <h3>Comece a montar seu vocabulário</h3>
        <p>Use o formulário acima para adicionar sua primeira palavra em francês.</p>
      </div>

      <div v-else-if="filteredItems.length === 0" class="vb__state">
        <AppIcon name="search" :size="36" />
        <h3>Nada por aqui</h3>
        <p>Nenhuma palavra encontrada para os filtros atuais.</p>
      </div>

      <ul v-else class="vb__list">
        <li
          v-for="item in filteredItems"
          :key="item.id"
          class="vb__item"
          :class="{ 'is-playing': playingId === item.id }"
        >
          <button
            type="button"
            class="vb__item-play"
            :aria-label="playingId === item.id ? `Parar ${item.word}` : `Ouvir ${item.word}`"
            @click="playWord(item)"
          >
            <AppIcon :name="playingId === item.id ? 'pause' : 'speaker'" :size="16" />
          </button>

          <div class="vb__item-body">
            <div class="vb__item-line">
              <span class="vb__item-fr" v-html="highlightMatch(item.word, search)"></span>
              <span class="vb__item-arrow">→</span>
              <span class="vb__item-pt" v-html="highlightMatch(item.translation, search)"></span>
            </div>
            <div v-if="item.notes" class="vb__item-notes">{{ item.notes }}</div>
            <div class="vb__item-meta">
              <span v-if="item.category" class="vb__item-tag">{{ item.category }}</span>
              <span class="vb__item-date">{{ formatDate(item.learnedAt) }}</span>
              <span v-if="item.reviewCount > 0" class="vb__item-review">
                <AppIcon name="check" :size="11" />
                {{ item.reviewCount }}x revisada
              </span>
              <span v-else class="vb__item-review vb__item-review--muted">
                Nunca revisada
              </span>
            </div>
          </div>

          <div class="vb__item-actions">
            <button
              type="button"
              class="vb__item-action"
              :title="`Marcar ${item.word} como revisada`"
              :aria-label="`Marcar ${item.word} como revisada`"
              @click="markReviewed(item)"
            >
              <AppIcon name="check" :size="14" />
            </button>
            <button
              type="button"
              class="vb__item-action vb__item-action--danger"
              :title="`Remover ${item.word}`"
              :aria-label="`Remover ${item.word}`"
              @click="removeItem(item)"
            >
              <AppIcon name="trash" :size="14" />
            </button>
          </div>
        </li>
      </ul>
    </section>

    <footer class="vb__footer">
      <span>© 2026 Parle-Juh — Vocabulário aprendido</span>
      <span class="vb__footer-version">
        v1.1.0<small>· vocabulario</small>
      </span>
    </footer>

    <audio
      ref="audioEl"
      @ended="onAudioEnded"
      @error="onAudioError"
      style="display: none"
    ></audio>
  </div>
</template>

<style scoped>
.vb {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-body);
  max-width: 1100px;
  margin: 0 auto;
}

/* ── Header ───────────────────────── */
.vb__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}
.vb__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  background: var(--color-primary-softer);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.vb__title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
  color: var(--text-primary);
}
.vb__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 560px;
  line-height: 1.55;
}
.vb__head-stats {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-xs);
}
.vb__stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.05;
}
.vb__stat strong {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
}
.vb__stat small {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.vb__stat-divider {
  width: 1px;
  height: 26px;
  background: var(--border-default);
  margin: 0 4px;
}

/* ── Form card ────────────────────── */
.vb__form-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 22px;
  box-shadow: var(--shadow-xs);
}
.vb__form-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
}
.vb__form-head h2 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
}
.vb__form-head p {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}
.vb__collapse {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
  flex-shrink: 0;
}
.vb__collapse:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.vb__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 16px;
}
.vb__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.vb__field--wide {
  grid-column: 1 / -1;
}
.vb__field label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 6px;
}
.req { color: var(--color-accent, #f97316); }
.vb__checking {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-primary);
  text-transform: none;
  letter-spacing: 0;
  font-size: 11px;
}
.vb__input {
  font-family: var(--font-body);
  font-size: 14px;
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid var(--border-default);
  background: var(--surface-sunken);
  color: var(--text-primary);
  outline: none;
  transition: border-color var(--motion-fast), background var(--motion-fast), box-shadow var(--motion-fast);
}
.vb__input:focus {
  border-color: var(--color-primary);
  background: var(--surface-card);
  box-shadow: 0 0 0 3px var(--color-primary-softer);
}
.vb__input.is-error {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}
.vb__input.is-warning {
  border-color: var(--color-accent, #f97316);
  background: rgba(249, 115, 22, 0.06);
}
.vb__input.is-success {
  border-color: var(--color-success, #16a34a);
  background: rgba(16, 185, 129, 0.06);
}
.vb__textarea {
  resize: vertical;
  min-height: 56px;
  line-height: 1.4;
}

.vb__feedback {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.45;
}
.vb__feedback--muted { background: var(--surface-sunken); color: var(--text-muted); }
.vb__feedback--success { background: rgba(16, 185, 129, 0.10); color: #047857; border: 1px solid rgba(16, 185, 129, 0.3); }
.vb__feedback--warning { background: rgba(249, 115, 22, 0.10); color: #b45309; border: 1px solid rgba(249, 115, 22, 0.3); }
.vb__feedback--error { background: rgba(239, 68, 68, 0.08); color: #b91c1c; border: 1px solid rgba(239, 68, 68, 0.3); }
:global([data-theme='dark']) .vb__feedback--success { color: #4ade80; }
:global([data-theme='dark']) .vb__feedback--warning { color: #fdba74; }
:global([data-theme='dark']) .vb__feedback--error { color: #fca5a5; }

.vb__feedback-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.vb__suggestions {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vb__suggestion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  font-size: 12.5px;
}
:global([data-theme='dark']) .vb__suggestion {
  background: rgba(255, 255, 255, 0.04);
}
.vb__suggestion strong {
  font-weight: 700;
  color: inherit;
}
.vb__suggestion small {
  color: var(--text-muted);
  margin-left: 4px;
}
.vb__suggestion-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
.vb__suggestion-btn:hover { background: var(--color-primary-hover, #2566eb); }

.vb__force {
  display: flex;
  justify-content: flex-end;
}

/* ── Buttons ──────────────────────── */
.vb__actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}
.vb__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), transform var(--motion-fast);
  border: 1px solid transparent;
}
.vb__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.vb__btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.vb__btn--primary:not(:disabled):hover { background: var(--color-primary-hover, #2566eb); transform: translateY(-1px); }
.vb__btn--ghost {
  background: var(--surface-sunken);
  color: var(--text-secondary);
  border-color: var(--border-default);
}
.vb__btn--ghost:hover { background: var(--color-primary-soft); color: var(--color-primary); }
.vb__btn--quiet {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  font-size: 12px;
  padding: 6px 12px;
}
.vb__btn--quiet:hover { background: var(--color-primary-softer); }
.vb__btn--danger-quiet {
  background: transparent;
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}
.vb__btn--danger-quiet:hover { background: rgba(239, 68, 68, 0.1); }

.vb__spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: vb-spin 0.7s linear infinite;
}
.vb__spinner--lg { width: 26px; height: 26px; border-width: 3px; }
@keyframes vb-spin { to { transform: rotate(360deg); } }

/* ── Filters ──────────────────────── */
.vb__filters {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  align-items: flex-end;
  padding: 14px 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
}
.vb__search {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--surface-sunken);
  border-radius: 10px;
  border: 1px solid var(--border-default);
}
.vb__search:focus-within {
  border-color: var(--color-primary);
  background: var(--surface-card);
}
.vb__search input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text-primary);
}
.vb__filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.vb__filter-label,
.vb__sort label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.vb__chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 380px;
}
.vb__chip {
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--border-default);
  background: var(--surface-sunken);
  color: var(--text-secondary);
  font-family: var(--font-nav);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
}
.vb__chip:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
.vb__chip.is-active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.vb__sort {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vb__select {
  font-family: var(--font-body);
  font-size: 13px;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1px solid var(--border-default);
  background: var(--surface-sunken);
  color: var(--text-primary);
  outline: none;
}
.vb__select:focus {
  border-color: var(--color-primary);
}

/* ── List ─────────────────────────── */
.vb__list-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.vb__list-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.vb__list-head h2 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}
.vb__list-head h2 span {
  color: var(--color-primary);
  font-weight: 700;
}

.vb__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  background: var(--surface-card);
  border: 1px dashed var(--border-default);
  border-radius: 18px;
  color: var(--text-muted);
  text-align: center;
}
.vb__state h3 {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}
.vb__state p {
  margin: 0;
  font-size: 13px;
  max-width: 360px;
}

.vb__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.vb__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 14px;
  box-shadow: var(--shadow-xs);
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
}
.vb__item:hover {
  border-color: var(--color-primary-soft);
}
.vb__item.is-playing {
  border-color: var(--color-primary);
  box-shadow: 0 8px 20px -10px rgba(59, 130, 246, 0.35);
}

.vb__item-play {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.vb__item-play:hover { background: var(--color-primary-hover, #2566eb); transform: scale(1.05); }
.vb__item.is-playing .vb__item-play { background: var(--color-accent, #f97316); }

.vb__item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.vb__item-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.vb__item-fr {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}
.vb__item-arrow {
  color: var(--text-muted);
  font-weight: 600;
}
.vb__item-pt {
  font-size: 13px;
  color: var(--text-secondary);
}
.vb__item-fr :deep(mark),
.vb__item-pt :deep(mark) {
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
  padding: 0 2px;
  border-radius: 3px;
}
.vb__item-notes {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.45;
}
.vb__item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-family: var(--font-nav);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
}
.vb__item-tag {
  padding: 2px 8px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  border-radius: 999px;
}
.vb__item-date { white-space: nowrap; }
.vb__item-review {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: var(--color-success, #16a34a);
}
.vb__item-review--muted { color: var(--text-muted); }

.vb__item-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.vb__item-action {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.vb__item-action:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}
.vb__item-action--danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.3);
}

/* ── Footer ───────────────────────── */
.vb__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}
.vb__footer-version {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-weight: 700;
  color: var(--text-primary);
}
.vb__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}

/* ── Transitions ──────────────────── */
.vb-collapse-enter-active,
.vb-collapse-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease, max-height 0.25s ease;
  overflow: hidden;
}
.vb-collapse-enter-from,
.vb-collapse-leave-to {
  opacity: 0;
  transform: translateY(-4px);
  max-height: 0;
}
.vb-collapse-enter-to,
.vb-collapse-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 900px;
}

/* ── Responsive ───────────────────── */
@media (max-width: 700px) {
  .vb__head { flex-direction: column; align-items: flex-start; }
  .vb__head-stats { width: 100%; justify-content: space-between; }
  .vb__form { grid-template-columns: 1fr; }
  .vb__item { flex-wrap: wrap; }
  .vb__item-actions { width: 100%; justify-content: flex-end; }
  .vb__filters { flex-direction: column; align-items: stretch; }
  .vb__chips { max-width: 100%; }
}

@media (max-width: 480px) {
  .vb__title { font-size: 24px; }
  .vb__item-line { font-size: 14px; }
}
</style>
