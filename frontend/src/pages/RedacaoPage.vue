<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { api } from '@/services/api'
import { APP_VERSION, APP_BUILD } from '@/version'

const toast = useToastStore()

const LEVEL_META = {
  A1: { color: '#22c55e', points: 1, hint: 'Frases muito simples, vocabulário do dia a dia.' },
  A2: { color: '#3b82f6', points: 2, hint: 'Frases completas sobre situações cotidianas.' },
  B1: { color: '#f59e0b', points: 3, hint: 'Conte histórias, opiniões, justificativas.' },
  B2: { color: '#ef4444', points: 4, hint: 'Textos ricos com nuances e vocabulário avançado.' }
}

const LEVELS = ['A1', 'A2', 'B1', 'B2']

const WORDS_CACHE_KEY = 'french-succo:writing-words-v1'
const WORDS_CACHE_TTL = 60 * 60 * 1000 // 1 hora

const phase = ref('choose')
const selectedLevel = ref(null)
const selectedWords = ref([])
const currentTopic = ref('')
const userText = ref('')
const textareaRef = ref(null)
const imageFile = ref(null)
const imagePreview = ref(null)
const submitting = ref(false)
const loadingWords = ref(false)
const result = ref(null)
const lastError = ref('')

const tooltipWord = ref(null)
let tooltipTimer = null

function showWordTooltip(word) {
  tooltipWord.value = word
  if (tooltipTimer) clearTimeout(tooltipTimer)
  tooltipTimer = setTimeout(() => { tooltipWord.value = null }, 4000)
}

function showWordInfo(word) {
  showWordTooltip(word)
}

function readCachedWords(level) {
  try {
    const raw = localStorage.getItem(WORDS_CACHE_KEY)
    if (!raw) return null
    const all = JSON.parse(raw) || {}
    const entry = all[level]
    if (!entry || !Array.isArray(entry.words)) return null
    if (Date.now() - (entry.ts || 0) > WORDS_CACHE_TTL) return null
    return entry
  } catch { return null }
}

function writeCachedWords(level, payload) {
  try {
    const raw = localStorage.getItem(WORDS_CACHE_KEY)
    const all = raw ? JSON.parse(raw) : {}
    all[level] = { ...payload, ts: Date.now() }
    localStorage.setItem(WORDS_CACHE_KEY, JSON.stringify(all))
  } catch { /* ignore quota */ }
}

async function pickLevel(level) {
  if (!LEVEL_META[level]) return
  selectedLevel.value = level
  selectedWords.value = []
  currentTopic.value = ''
  userText.value = ''
  result.value = null
  lastError.value = ''
  imageFile.value = null
  imagePreview.value = null
  phase.value = 'write'

  const cached = readCachedWords(level)
  if (cached) {
    currentTopic.value = cached.topic
    selectedWords.value = cached.words
    nextTick(() => textareaRef.value?.focus())
    return
  }

  loadingWords.value = true
  try {
    const res = await api.generateWritingWords({ level, count: 18 })
    currentTopic.value = res.topic || LEVEL_META[level].hint
    selectedWords.value = res.words || []
    writeCachedWords(level, { topic: res.topic, words: res.words })
  } catch (err) {
    console.error(err)
    lastError.value = err?.message || 'Falha ao gerar palavras — usando lista padrão.'
    toast.warning(lastError.value)
    selectedWords.value = []
    currentTopic.value = ''
  } finally {
    loadingWords.value = false
    nextTick(() => textareaRef.value?.focus())
  }
}

async function regenerateWords() {
  if (!selectedLevel.value) return
  loadingWords.value = true
  lastError.value = ''
  try {
    const res = await api.generateWritingWords({ level: selectedLevel.value, count: 18 })
    currentTopic.value = res.topic
    selectedWords.value = res.words || []
    writeCachedWords(selectedLevel.value, { topic: res.topic, words: res.words })
    toast.success('Novas palavras geradas!', { duration: 1500 })
  } catch (err) {
    lastError.value = err?.message || 'Erro ao gerar palavras.'
    toast.error(lastError.value)
  } finally {
    loadingWords.value = false
  }
}

function backToChoose() {
  phase.value = 'choose'
  selectedLevel.value = null
  selectedWords.value = []
  currentTopic.value = ''
  userText.value = ''
  result.value = null
  imageFile.value = null
  imagePreview.value = null
  tooltipWord.value = null
}

function onImageChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  imageFile.value = file
  const reader = new FileReader()
  reader.onload = () => { imagePreview.value = reader.result }
  reader.readAsDataURL(file)
}

function clearImage() {
  imageFile.value = null
  imagePreview.value = null
}

function useImageText() {
  if (!imagePreview.value) return
  toast.info('Recurso de OCR não implementado — use o textarea para digitar o texto.', { duration: 3000 })
}

const wordCount = computed(() => userText.value.trim().split(/\s+/).filter(Boolean).length)
const charCount = computed(() => userText.value.length)

const canSubmit = computed(() =>
  wordCount.value >= 12 && !submitting.value
)

async function submit() {
  if (!canSubmit.value) {
    toast.warning('Escreva pelo menos algumas frases (12+ palavras).')
    return
  }
  submitting.value = true
  lastError.value = ''
  tooltipWord.value = null
  try {
    const res = await api.gradeWriting({
      words: selectedWords.value.map((w) => w.fr),
      text: userText.value,
      level: selectedLevel.value
    })
    result.value = res
    phase.value = 'result'
    nextTick(() => {
      const el = document.querySelector('.rd__done')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  } catch (err) {
    console.error(err)
    lastError.value = err?.message || 'Erro ao avaliar.'
    toast.error(lastError.value)
  } finally {
    submitting.value = false
  }
}

function restart() {
  userText.value = ''
  result.value = null
  imageFile.value = null
  imagePreview.value = null
  tooltipWord.value = null
  phase.value = 'write'
  nextTick(() => {
    if (textareaRef.value) textareaRef.value.focus()
  })
}

function newLevel() {
  backToChoose()
}

function scoreColor(score) {
  if (score >= 80) return '#10b981'
  if (score >= 60) return '#f59e0b'
  if (score >= 40) return '#f97316'
  return '#ef4444'
}

function scoreLabel(score) {
  if (score >= 90) return 'Excelente !'
  if (score >= 80) return 'Muito bom !'
  if (score >= 60) return 'Bom — continue praticando'
  if (score >= 40) return 'Atenção aos detalhes'
  return 'Precisa estudar mais'
}

onMounted(() => {})
onUnmounted(() => {
  if (tooltipTimer) clearTimeout(tooltipTimer)
})
</script>

<template>
  <div class="rd">
    <!-- Header -->
    <header class="rd__head">
      <div class="rd__title-block">
        <span class="rd__eyebrow">REDAÇÃO GUIADA</span>
        <h1 class="rd__title">Escreva um texto com palavras sugeridas</h1>
        <p class="rd__sub">
          Escolha o nível (A1 a B2), leia as palavras impostas, escreva um texto
          usando-as naturalmente. Pode digitar ou tirar foto da sua redação em
          papel. O sistema corrige, mostra erros e sugere o que melhorar.
        </p>
      </div>
      <button
        v-if="phase !== 'choose'"
        type="button"
        class="rd__back"
        @click="backToChoose"
      >
        <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
        Trocar nível
      </button>
    </header>

    <!-- Phase 1: choose level -->
    <template v-if="phase === 'choose'">
      <section class="rd__levels">
        <button
          v-for="lvl in LEVELS"
          :key="lvl"
          type="button"
          class="rd__level-card card"
          :style="{ '--level-color': LEVEL_META[lvl].color }"
          @click="pickLevel(lvl)"
        >
          <div class="rd__level-icon">
            <AppIcon name="pencilSquare" :size="30" />
          </div>
          <div class="rd__level-body">
            <div class="rd__level-head">
              <h2 class="rd__level-name">{{ lvl }}</h2>
              <span
                class="rd__level-tag"
                :style="{
                  background: LEVEL_META[lvl].color + '1a',
                  color: LEVEL_META[lvl].color,
                  borderColor: LEVEL_META[lvl].color + '55'
                }"
              >
                18 palavras novas
              </span>
            </div>
            <p class="rd__level-desc">{{ LEVEL_META[lvl].hint }}</p>
            <div class="rd__level-cta">
              <AppIcon name="play" :size="14" />
              <span>Começar</span>
            </div>
          </div>
        </button>
      </section>
    </template>

<!-- Phase 2: write -->
    <template v-else-if="phase === 'write'">
      <section class="rd__brief card">
        <header class="rd__brief-head">
          <span
            class="rd__level-badge"
            :style="{
              background: LEVEL_META[selectedLevel].color + '1a',
              color: LEVEL_META[selectedLevel].color,
              borderColor: LEVEL_META[selectedLevel].color + '55'
            }"
          >
            Nível {{ selectedLevel }}
          </span>
          <span class="rd__brief-hint" v-if="!loadingWords">
            <strong>Tema:</strong> {{ currentTopic || LEVEL_META[selectedLevel].hint }}
          </span>
          <span class="rd__brief-hint" v-else>
            <span class="rd__loading-dot"></span>
            Gerando palavras novas…
          </span>
          <button
            type="button"
            class="rd__regen"
            :disabled="loadingWords"
            @click="regenerateWords"
            title="Gerar palavras novas dentro do mesmo tema"
          >
            <AppIcon name="refresh" :size="12" />
            Novas palavras
          </button>
        </header>

        <h3 class="rd__brief-title">
          Clique em uma palavra para ver a tradução e a pronúncia:
        </h3>

        <div class="rd__words">
          <button
            v-for="(w, i) in selectedWords"
            :key="w.fr"
            type="button"
            class="rd__word"
            :disabled="loadingWords"
            :title="`${w.pt} · ${w.phonetic || ''}`"
            @click="showWordInfo(w)"
          >
            <span class="rd__word-fr">{{ w.fr }}</span>
            <span class="rd__word-pt">{{ w.pt }}</span>
            <span v-if="w.phonetic" class="rd__word-ph">/{{ w.phonetic }}/</span>
          </button>
          <span v-if="!selectedWords.length && !loadingWords" class="rd__empty-words">
            Nenhuma palavra gerada.
          </span>
        </div>

        <Transition name="rd-fade">
          <div v-if="tooltipWord" class="rd__word-tooltip">
            <strong>{{ tooltipWord.fr }}</strong>
            <span class="rd__word-tooltip-pt">{{ tooltipWord.pt }}</span>
            <span v-if="tooltipWord.phonetic" class="rd__word-tooltip-ph">
              [{{ tooltipWord.phonetic }}]
            </span>
          </div>
        </Transition>

        <p class="rd__brief-meta">
          Você não precisa usar todas — tente encaixar pelo menos metade no seu
          texto, com sentido natural. As palavras são geradas via IA em cada
          início de prática (com o mesmo tema, mas sempre diferentes).
        </p>
      </section>

      <section class="rd__editor card">
        <header class="rd__editor-head">
          <h3 class="rd__editor-title">Sua redação</h3>
          <div class="rd__editor-meta">
            <span class="rd__meta-pill"><strong>{{ wordCount }}</strong> palavras</span>
            <span class="rd__meta-pill"><strong>{{ charCount }}</strong> caracteres</span>
          </div>
        </header>

        <textarea
          ref="textareaRef"
          v-model="userText"
          class="rd__textarea"
          :placeholder="`Escreva aqui em francês usando as palavras acima.\nMínimo sugerido: 12 palavras.`"
          rows="10"
          @keydown="onTextareaKey"
        ></textarea>

        <details class="rd__paper">
          <summary>
            <AppIcon name="bookmark" :size="13" />
            Tirar foto da redação em papel
            <small>(opcional — recurso em breve)</small>
          </summary>
          <div class="rd__paper-body">
            <label class="rd__file">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                @change="onImageChange"
              />
              <span class="rd__file-btn">
                <AppIcon name="bookmark" :size="14" />
                Selecionar imagem
              </span>
              <span v-if="imageFile" class="rd__file-name">{{ imageFile.name }}</span>
            </label>
            <div v-if="imagePreview" class="rd__paper-preview">
              <img :src="imagePreview" alt="Prévia da redação" />
              <div class="rd__paper-actions">
                <button
                  type="button"
                  class="rd__btn rd__btn--ghost"
                  @click="useImageText"
                >
                  <AppIcon name="cross" :size="13" />
                  Usar texto da imagem
                </button>
                <button
                  type="button"
                  class="rd__btn rd__btn--ghost"
                  @click="clearImage"
                >
                  <AppIcon name="cross" :size="13" />
                  Remover
                </button>
              </div>
            </div>
          </div>
        </details>

        <div v-if="lastError" class="rd__error">
          <AppIcon name="warning" :size="14" />
          {{ lastError }}
        </div>

        <div class="rd__editor-actions">
          <button
            type="button"
            class="rd__btn rd__btn--primary rd__btn--lg"
            :disabled="!canSubmit"
            @click="submit"
          >
            <span v-if="submitting" class="rd__btn-spinner" aria-hidden="true"></span>
            <AppIcon v-else name="check" :size="16" />
            {{ submitting ? 'Avaliando…' : 'Enviar para correção' }}
          </button>
        </div>
      </section>
    </template>

    <!-- Phase 3: result -->
    <template v-else-if="phase === 'result' && result">
      <section class="rd__done card">
        <div
          class="rd__done-icon"
          :style="{ background: scoreColor(result.score) }"
        >
          <AppIcon name="trophy" :size="32" />
        </div>
        <h2 class="rd__done-title">{{ scoreLabel(result.score) }}</h2>
        <p class="rd__done-sub">
          Nível <strong>{{ selectedLevel }}</strong> · {{ result.wordsUsed }} de
          {{ result.wordsTotal }} palavras usadas
        </p>

        <div class="rd__big-score">
          <div
            class="rd__big-score-num"
            :style="{ color: scoreColor(result.score) }"
          >{{ result.score }}</div>
          <div class="rd__big-score-bar">
            <span
              class="rd__big-score-fill"
              :style="{
                width: result.score + '%',
                background: scoreColor(result.score)
              }"
            ></span>
          </div>
          <div class="rd__big-score-label">de 100 pontos</div>
        </div>

        <div class="rd__done-grid">
          <!-- Used vs missed words -->
          <div class="rd__panel">
            <h3 class="rd__panel-h">
              <AppIcon name="check" :size="14" />
              Palavras usadas ({{ result.wordsUsedList.length }})
            </h3>
            <div class="rd__panel-words">
              <span
                v-for="w in result.wordsUsedList"
                :key="'u-' + w"
                class="rd__word rd__word--ok"
              >{{ w }}</span>
              <span v-if="!result.wordsUsedList.length" class="rd__empty-mini">
                Nenhuma palavra usada.
              </span>
            </div>
          </div>

          <div class="rd__panel">
            <h3 class="rd__panel-h">
              <AppIcon name="cross" :size="14" />
              Palavras que faltaram ({{ result.wordsMissed.length }})
            </h3>
            <div class="rd__panel-words">
              <span
                v-for="w in result.wordsMissed"
                :key="'m-' + w"
                class="rd__word rd__word--miss"
              >{{ w }}</span>
              <span v-if="!result.wordsMissed.length" class="rd__empty-mini">
                Todas foram usadas!
              </span>
            </div>
          </div>
        </div>

        <h3 class="rd__panel-h rd__panel-h--top">
          <AppIcon name="warning" :size="14" />
          Erros gramaticais ({{ result.grammarErrors.length }})
        </h3>
        <div v-if="result.grammarErrors.length" class="rd__errors">
          <article
            v-for="(e, i) in result.grammarErrors"
            :key="'err-' + i"
            class="rd__error-item"
          >
            <div class="rd__error-line">
              <span class="rd__error-from">{{ e.from }}</span>
              <AppIcon name="arrow" :size="12" />
              <span class="rd__error-to">{{ e.to }}</span>
            </div>
            <p v-if="e.reason" class="rd__error-reason">{{ e.reason }}</p>
          </article>
        </div>
        <p v-else class="rd__empty-mini">Nenhum erro gramatical detectado — muito bom !</p>

        <h3 class="rd__panel-h rd__panel-h--top">
          <AppIcon name="sparkles" :size="14" />
          Comentário do professor
        </h3>
        <p class="rd__feedback">{{ result.feedback }}</p>

        <h3 class="rd__panel-h rd__panel-h--top">
          <AppIcon name="zap" :size="14" />
          O que estudar a seguir
        </h3>
        <p class="rd__suggestion">{{ result.suggestion }}</p>

        <div class="rd__done-actions">
          <button
            type="button"
            class="rd__btn rd__btn--ghost"
            @click="restart"
          >
            <AppIcon name="refresh" :size="14" />
            Reescrever
          </button>
          <button
            type="button"
            class="rd__btn rd__btn--primary"
            @click="newLevel"
          >
            <AppIcon name="arrow" :size="14" />
            Outro nível
          </button>
        </div>
      </section>
    </template>

    <footer class="rd__footer">
      <span>© 2026 Parle-Juh — Escreva em francês com confiança.</span>
      <span class="rd__footer-version">
        v{{ APP_VERSION }}
        <small>· {{ APP_BUILD }}</small>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.rd {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: var(--font-body);
  max-width: 880px;
  margin: 0 auto;
  width: 100%;
}

/* ── Header ── */
.rd__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.rd__title-block { flex: 1; min-width: 240px; }

.rd__eyebrow {
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
.rd__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}
.rd__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 620px;
  line-height: 1.55;
}
.rd__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}
.rd__back:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}

/* ── Level cards (choose phase) ── */
.rd__levels {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.rd__level-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 20px;
  background: var(--surface-card);
  border: 2px solid var(--border-default);
  border-left: 6px solid var(--level-color);
  border-radius: var(--radius-xl);
  text-align: left;
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  transition: border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out);
}
.rd__level-card:hover {
  border-color: var(--level-color);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px color-mix(in srgb, var(--level-color) 30%, transparent);
}

.rd__level-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--motion-base) var(--ease-out);
}
.rd__level-card:hover .rd__level-icon {
  transform: scale(1.06) rotate(-4deg);
}

.rd__level-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.rd__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.rd__level-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}
.rd__level-tag {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid;
  white-space: nowrap;
}
.rd__level-desc {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
}
.rd__level-cta {
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--level-color);
}

/* ── Brief card ── */
.rd__brief {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 22px !important;
}
.rd__brief-head {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.rd__level-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;
}
.rd__brief-hint {
  font-size: 13px;
  color: var(--text-secondary);
}
.rd__brief-title {
  margin: 4px 0 0;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}
.rd__brief-meta {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
}
.rd__words {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rd__word {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 8px 14px;
  border-radius: 12px;
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  border: 1.5px solid var(--color-primary-soft);
  cursor: pointer;
  text-align: left;
  transition: background var(--motion-fast), border-color var(--motion-fast),
    transform var(--motion-fast), box-shadow var(--motion-fast);
}
.rd__word:hover:not(:disabled) {
  background: var(--color-primary-soft);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px -4px rgba(59, 130, 246, 0.35);
}
.rd__word:active:not(:disabled) {
  transform: translateY(0);
}
.rd__word:disabled { opacity: 0.55; cursor: not-allowed; }

.rd__word-fr {
  font-family: var(--font-display);
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.1;
}

.rd__word-pt {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.01em;
  line-height: 1.1;
}

.rd__word-ph {
  font-size: 10px;
  font-weight: 600;
  color: var(--color-accent);
  font-family: var(--font-nav);
  letter-spacing: 0.04em;
  line-height: 1.1;
}

.rd__word--ok {
  background: rgba(16, 185, 129, 0.15);
  color: var(--color-success-text, #15803d);
  border-color: rgba(16, 185, 129, 0.45);
  cursor: default;
}
.rd__word--miss {
  background: rgba(239, 68, 68, 0.08);
  color: #b91c1c;
  border-color: rgba(239, 68, 68, 0.3);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
  cursor: default;
}

.rd__word-tooltip {
  margin-top: 10px;
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  background: var(--color-accent);
  color: #fff;
  border-radius: 12px;
  font-family: var(--font-nav);
  box-shadow: 0 6px 18px -6px rgba(249, 115, 21, 0.45);
  align-self: flex-start;
}
.rd__word-tooltip strong {
  font-family: var(--font-display);
  font-size: 16px;
  color: #fff;
  font-weight: 700;
}
.rd__word-tooltip-pt {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.rd__word-tooltip-ph {
  font-size: 11.5px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
}

.rd-fade-enter-active, .rd-fade-leave-active {
  transition: opacity var(--motion-base), transform var(--motion-base);
}
.rd-fade-enter-from, .rd-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.rd__regen {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  font-family: var(--font-nav);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast);
}
.rd__regen:hover:not(:disabled) {
  background: var(--color-primary-softer);
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
}
.rd__regen:disabled { opacity: 0.5; cursor: not-allowed; }

.rd__loading-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: rd-pulse 1s ease-in-out infinite;
  margin-right: 6px;
  vertical-align: middle;
}
@keyframes rd-pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50%      { transform: scale(1.4); opacity: 1; }
}

.rd__empty-words {
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
}

/* ── Editor ── */
.rd__editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 22px !important;
}
.rd__editor-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.rd__editor-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}
.rd__editor-meta { display: flex; gap: 6px; }
.rd__meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  font-family: var(--font-nav);
  font-size: 11px;
  color: var(--text-muted);
}
.rd__meta-pill strong {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 700;
}

.rd__textarea {
  width: 100%;
  min-height: 240px;
  padding: 16px 18px;
  background: var(--surface-page);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 15.5px;
  line-height: 1.55;
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}
.rd__textarea:focus {
  border-color: var(--color-primary);
  background: var(--surface-card);
}
.rd__textarea::placeholder {
  color: var(--text-faint);
  white-space: pre-line;
}

.rd__paper {
  border: 1px dashed var(--border-default);
  border-radius: 10px;
  background: var(--surface-sunken);
  overflow: hidden;
}
.rd__paper summary {
  cursor: pointer;
  padding: 10px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
}
.rd__paper summary small {
  color: var(--text-muted);
  font-weight: 600;
}
.rd__paper-body {
  padding: 0 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rd__file { display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.rd__file input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
}
.rd__file-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  color: var(--text-secondary);
}
.rd__file-btn:hover {
  background: var(--color-primary-softer);
  border-color: var(--color-primary-soft);
  color: var(--color-primary);
}
.rd__file-name {
  font-size: 12px;
  color: var(--text-muted);
}

.rd__paper-preview {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.rd__paper-preview img {
  max-width: 240px;
  border-radius: 8px;
  border: 1px solid var(--border-default);
  align-self: flex-start;
}
.rd__paper-actions {
  display: flex;
  gap: 6px;
}

.rd__error {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
  font-size: 13px;
}

.rd__editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* ── Buttons ── */
.rd__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.rd__btn--primary { background: var(--color-primary); color: #fff; }
.rd__btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #2566eb);
  transform: translateY(-1px);
}
.rd__btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.rd__btn--ghost {
  background: var(--surface-sunken);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
.rd__btn--ghost:hover:not(:disabled) { background: var(--surface-card); }
.rd__btn--lg { padding: 14px 24px; font-size: 14px; }

.rd__btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: rd-spin 0.7s linear infinite;
}
@keyframes rd-spin {
  to { transform: rotate(360deg); }
}

/* ── Done ── */
.rd__done {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  padding: 28px 28px !important;
}

.rd__done-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 0 auto;
  box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.25);
}

.rd__done-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  color: var(--text-primary);
}

.rd__done-sub {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
}
.rd__done-sub strong { color: var(--text-primary); }

.rd__big-score {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0;
  align-items: center;
}
.rd__big-score-num {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
}
.rd__big-score-bar {
  height: 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
  width: 100%;
  max-width: 480px;
}
.rd__big-score-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s var(--ease-out);
}
.rd__big-score-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.rd__done-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.rd__panel {
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  padding: 14px 16px;
}

.rd__panel-h {
  margin: 0 0 8px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.rd__panel-h--top {
  margin-top: 6px;
  align-self: flex-start;
}

.rd__panel-words {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rd__empty-mini {
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.rd__errors {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.rd__error-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  background: var(--surface-sunken);
  border: 1px dashed rgba(239, 68, 68, 0.35);
  border-left: 4px solid #ef4444;
  border-radius: 10px;
}
.rd__error-line {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.rd__error-from {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: line-through;
  text-decoration-color: rgba(239, 68, 68, 0.55);
  text-decoration-thickness: 1.5px;
}
.rd__error-to {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--color-primary-deep);
  font-weight: 600;
  background: var(--color-primary-softer);
  padding: 2px 8px;
  border-radius: 6px;
}
.rd__error-line :deep(svg) { color: var(--text-muted); }
.rd__error-reason {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
  font-style: italic;
}

.rd__feedback,
.rd__suggestion {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary);
  padding: 12px 14px;
  background: var(--surface-sunken);
  border-radius: 10px;
  border-left: 3px solid var(--color-primary);
}

.rd__done-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}

@media (max-width: 640px) {
  .rd__title { font-size: 22px; }
  .rd__done-grid { grid-template-columns: 1fr; }
  .rd__big-score-num { font-size: 48px; }
}

/* ─── Footer ─── */
.rd__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.rd__footer-version {
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
  letter-spacing: 0.04em;
}
.rd__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}
</style>