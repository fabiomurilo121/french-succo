<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { api } from '@/services/api'
import { scenes } from '@/assets/stories/scenes'

const toast = useToastStore()

const stories = ref([])
const wordDict = ref({})
const loading = ref(true)
const error = ref('')

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const [storiesList, wordsList] = await Promise.all([
      api.getStories(),
      api.getWords()
    ])
    const dict = {}
    for (const w of wordsList) dict[w.word] = w.translation
    wordDict.value = dict

    const full = await Promise.all(
      storiesList.map((s) => api.getStory(s.slug))
    )
    stories.value = full.map((s) => ({
      id: s.slug,
      title: s.title,
      subtitle: s.subtitle,
      icon: s.icon,
      cover: s.cover,
      heroId: s.heroId,
      narrative: s.narrative,
      phrases: s.phrases.map((p) => ({
        fr: p.fr,
        pt: p.pt,
        sceneId: p.sceneId
      })),
      vocabulary: s.vocabulary.map((v) => ({ fr: v.fr, pt: v.pt }))
    }))
  } catch (err) {
    error.value = err.message || 'Não foi possível carregar as histórias.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

/* ── State ── */
const viewMode = ref('narrative')
const activeStoryId = ref(null)
const activePhraseIndex = ref(0)
const selectedWord = ref(null)
const popoverAnchor = ref(null)
const popoverPosition = ref({ top: 0, left: 0 })

const activeStory = computed(() => {
  if (!stories.value.length) return null
  return stories.value.find((s) => s.id === activeStoryId.value) || stories.value[0]
})
const activePhrase = computed(() => {
  const story = activeStory.value
  return story ? story.phrases[activePhraseIndex.value] : null
})

const currentIllustration = computed(() => {
  const id = activePhrase.value?.sceneId
  return id && scenes[id] ? scenes[id] : null
})

const heroIllustration = computed(() => {
  const id = activeStory.value?.heroId
  return id && scenes[id] ? scenes[id] : null
})

const totalPhrases = computed(() => activeStory.value?.phrases.length || 0)
const narrativeWordCount = computed(() => {
  if (!activeStory.value?.narrative) return 0
  return activeStory.value.narrative.split(/\s+/).length
})

/* ── Tokenize ── */
function tokenize(text) {
  return text.split(/(\s+)/).filter((t) => t.trim().length > 0)
}

function normalizeWord(raw) {
  return raw.replace(/^[^\p{L}']+|[^\p{L}']+$/gu, '').toLowerCase()
}

function lookupWord(raw) {
  const lower = raw.toLowerCase()
  if (wordDict.value[lower]) return wordDict.value[lower]
  const norm = normalizeWord(raw)
  if (wordDict.value[norm]) return wordDict.value[norm]
  if (norm.includes('\'')) {
    const parts = norm.split('\'')
    if (parts.length === 2) {
      const joined = parts[0] + '\'' + parts[1]
      if (wordDict.value[joined]) return wordDict.value[joined]
      const merged = parts[0] + parts[1]
      if (wordDict.value[merged]) return wordDict.value[merged]
    }
  }
  return null
}

/* ── Click handlers ── */
function selectWord(event, token) {
  const translation = lookupWord(token)
  selectedWord.value = {
    token,
    translation,
    phraseFr: activePhrase ? activePhrase.fr : (activeStory.value ? activeStory.value.narrative : ''),
    phrasePt: activePhrase ? activePhrase.pt : null
  }
  const rect = event.currentTarget.getBoundingClientRect()
  const popW = 280
  const popH = 150
  let left = rect.left + rect.width / 2 - popW / 2 + window.scrollX
  let top = rect.top - popH - 10 + window.scrollY
  if (left < 8) left = 8
  if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8
  if (top < 8) top = rect.bottom + 10 + window.scrollY
  popoverPosition.value = { top, left }
}

function closeWord() {
  selectedWord.value = null
}

/* ── Navigation ── */
function pickStory(id) {
  activeStoryId.value = id
  activePhraseIndex.value = 0
  closeWord()
}

function nextPhrase() {
  if (activePhraseIndex.value < totalPhrases.value - 1) {
    activePhraseIndex.value++
    closeWord()
  }
}

function prevPhrase() {
  if (activePhraseIndex.value > 0) {
    activePhraseIndex.value--
    closeWord()
  }
}

function setMode(mode) {
  viewMode.value = mode
  closeWord()
}

function onDocClick(e) {
  if (!selectedWord.value) return
  if (popoverAnchor.value && popoverAnchor.value.contains(e.target)) return
  closeWord()
}
function onDocKey(e) {
  if (e.key === 'Escape') closeWord()
}

onMounted(async () => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKey)
  await loadData()
  if (stories.value.length) activeStoryId.value = stories.value[0].id
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKey)
})
</script>

<template>
  <div class="st">
    <header class="st__head">
      <div class="st__title-block">
        <span class="st__eyebrow">HISTÓRIAS EM FRASES</span>
        <h1 class="st__title">Aprenda francês com pequenas histórias</h1>
        <p class="st__sub">
          Leia a história completa em parágrafos ou explore frase por frase.
          Clique em qualquer palavra para ver sua tradução dentro do contexto.
        </p>
      </div>
      <div class="st__mode" role="tablist" aria-label="Modo de leitura">
        <button
          type="button"
          role="tab"
          class="st__mode-btn"
          :class="{ 'is-active': viewMode === 'narrative' }"
          :aria-selected="viewMode === 'narrative'"
          @click="setMode('narrative')"
          :disabled="!activeStory"
        >
          <AppIcon name="book" :size="14" />
          História completa
        </button>
        <button
          type="button"
          role="tab"
          class="st__mode-btn"
          :class="{ 'is-active': viewMode === 'phrases' }"
          :aria-selected="viewMode === 'phrases'"
          @click="setMode('phrases')"
          :disabled="!activeStory"
        >
          <AppIcon name="layers" :size="14" />
          Frase por frase
        </button>
      </div>
    </header>

    <div v-if="loading" class="st__status card">
      <div class="st__spinner" aria-hidden="true"></div>
      <p>Carregando histórias do banco de dados…</p>
    </div>

    <div v-else-if="error" class="st__status st__status--error card">
      <AppIcon name="warning" :size="22" />
      <p>{{ error }}</p>
      <button class="st__retry" type="button" @click="loadData">Tentar novamente</button>
    </div>

    <template v-else-if="activeStory">
      <nav class="st__stories" aria-label="Histórias disponíveis">
        <button
          v-for="s in stories"
          :key="s.id"
          type="button"
          class="st__story-chip"
          :class="{ 'is-active': activeStoryId === s.id }"
          @click="pickStory(s.id)"
        >
          <span class="st__story-cover" aria-hidden="true">{{ s.cover }}</span>
          <span class="st__story-text">
            <strong>{{ s.title }}</strong>
            <small>{{ s.subtitle }} · {{ s.phrases.length }} cenas</small>
          </span>
        </button>
      </nav>

      <!-- ─── NARRATIVE MODE ─── -->
      <section v-if="viewMode === 'narrative'" class="st__narrative card">
        <div class="st__narrative-hero" v-html="heroIllustration" aria-hidden="true"></div>

        <div class="st__narrative-body">
          <div class="st__narrative-meta">
            <span class="st__narrative-eyebrow">{{ activeStory.subtitle }}</span>
            <h2 class="st__narrative-title">{{ activeStory.title }}</h2>
            <span class="st__narrative-stats">
              <AppIcon name="book" :size="11" />
              {{ narrativeWordCount }} palavras · parágrafo único
            </span>
          </div>

          <p class="st__narrative-text">
            <template v-for="(token, ti) in tokenize(activeStory.narrative)" :key="ti">
              <button
                v-if="token.trim().length > 0"
                type="button"
                class="st__word st__word--inline"
                :class="{ 'is-selected': selectedWord && selectedWord.token === token }"
                @click.stop="selectWord($event, token)"
              >{{ token }}</button>
              <span v-else class="st__word-space">{{ token }}</span>
            </template>
          </p>

          <div class="st__vocab">
            <h3 class="st__vocab-title">
              <AppIcon name="sparkles" :size="14" />
              Vocabulário-chave
            </h3>
            <div class="st__vocab-grid">
              <button
                v-for="(v, vi) in activeStory.vocabulary"
                :key="vi"
                type="button"
                class="st__vocab-card"
                @click.stop="selectWord($event, v.fr)"
                :title="`${v.fr} — ${v.pt}`"
              >
                <strong>{{ v.fr }}</strong>
                <small>{{ v.pt }}</small>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── PHRASE-BY-PHRASE MODE ─── -->
      <section v-else class="st__scene card">
        <div class="st__scene-illu" aria-hidden="true" v-html="currentIllustration"></div>

        <div class="st__scene-body">
          <div class="st__scene-meta">
            <span class="st__scene-title">{{ activeStory.title }}</span>
            <span class="st__scene-counter">
              {{ activePhraseIndex + 1 }} / {{ totalPhrases }}
            </span>
          </div>
          <p class="st__scene-context">Cena {{ activePhraseIndex + 1 }}</p>

          <div class="st__frase">
            <button
              v-for="(token, ti) in tokenize(activePhrase.fr)"
              :key="ti"
              type="button"
              class="st__word"
              :class="{ 'is-selected': selectedWord && selectedWord.token === token }"
              @click.stop="selectWord($event, token)"
            >
              {{ token }}
            </button>
          </div>

          <p class="st__scene-translation">
            <AppIcon name="info" :size="13" />
            <span>{{ activePhrase.pt }}</span>
          </p>

          <div class="st__scene-nav">
            <button
              type="button"
              class="st__nav-btn"
              :disabled="activePhraseIndex === 0"
              @click="prevPhrase"
            >
              <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
              Anterior
            </button>
            <button
              type="button"
              class="st__nav-btn st__nav-btn--primary"
              :disabled="activePhraseIndex === totalPhrases - 1"
              @click="nextPhrase"
            >
              Próxima
              <AppIcon name="arrow" :size="14" />
            </button>
          </div>
        </div>
      </section>

      <div v-if="viewMode === 'phrases'" class="st__progress">
        <div
          v-for="(_, idx) in activeStory.phrases"
          :key="idx"
          class="st__progress-dot"
          :class="{
            'is-current': idx === activePhraseIndex,
            'is-done': idx < activePhraseIndex
          }"
          @click="activePhraseIndex = idx; closeWord()"
          role="button"
          :aria-label="`Ir para cena ${idx + 1}`"
        ></div>
      </div>
    </template>

    <Transition name="st-pop">
      <div
        v-if="selectedWord"
        ref="popoverAnchor"
        class="st__popover"
        :style="{
          top: popoverPosition.top + 'px',
          left: popoverPosition.left + 'px'
        }"
        @click.stop
      >
        <header class="st__popover-head">
          <strong class="st__popover-word">{{ selectedWord.token }}</strong>
          <button
            type="button"
            class="st__popover-close"
            aria-label="Fechar"
            @click="closeWord"
          >
            <AppIcon name="cross" :size="12" />
          </button>
        </header>
        <p v-if="selectedWord.translation" class="st__popover-translation">
          {{ selectedWord.translation }}
        </p>
        <p v-else class="st__popover-translation st__popover-translation--missing">
          Tradução não cadastrada — tente outra palavra.
        </p>
        <p v-if="selectedWord.phrasePt" class="st__popover-pt">
          <small>Frase completa:</small>
          {{ selectedWord.phrasePt }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.st {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-body);
}

.st__head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.st__eyebrow { display: inline-block; font-family: var(--font-nav); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--color-primary); text-transform: uppercase; margin-bottom: 6px; }
.st__title { font-family: var(--font-display); font-size: 26px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 6px; color: var(--text-primary); }
.st__sub { margin: 0; font-size: 13px; color: var(--text-muted); max-width: 560px; line-height: 1.5; }

.st__mode {
  display: inline-flex;
  padding: 4px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  gap: 2px;
  flex-shrink: 0;
}
.st__mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  background: transparent;
  transition: background var(--motion-fast), color var(--motion-fast), box-shadow var(--motion-fast);
  cursor: pointer;
}
.st__mode-btn:hover:not(.is-active) { color: var(--text-primary); }
.st__mode-btn.is-active {
  background: var(--surface-card);
  color: var(--color-primary);
  box-shadow: var(--shadow-xs);
}

.st__stories { display: flex; gap: 10px; flex-wrap: wrap; }

.st__story-chip {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 14px 8px 8px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast), transform var(--motion-fast);
}
.st__story-chip:hover { background: var(--color-primary-softer); border-color: var(--color-primary-soft); }
.st__story-chip.is-active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
.st__story-chip.is-active small { color: rgba(255, 255, 255, 0.85); }

.st__story-cover {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-primary-softer);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.st__story-chip.is-active .st__story-cover { background: rgba(255, 255, 255, 0.2); }

.st__story-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2; }
.st__story-text strong { font-size: 13px; font-weight: 700; }
.st__story-text small { font-size: 11px; font-weight: 500; color: var(--text-muted); }

/* ── Narrative mode ── */
.st__narrative {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 0;
  padding: 0;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.st__narrative-hero {
  position: relative;
  background: var(--color-primary-softer);
  min-height: 280px;
  min-width: 0;
  overflow: hidden;
}
.st__narrative-hero :deep(svg) {
  width: 100%; height: 100%; display: block;
  max-width: 100%;
}

.st__narrative-body {
  padding: 28px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.st__narrative-meta { display: flex; flex-direction: column; gap: 4px; }
.st__narrative-eyebrow {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  text-transform: uppercase;
}
.st__narrative-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--text-primary);
}
.st__narrative-stats {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  margin-top: 4px;
}

.st__narrative-text {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.85;
  color: var(--text-primary);
  letter-spacing: -0.005em;
  padding: 20px 22px;
  background: var(--surface-sunken);
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
  text-align: justify;
  hyphens: auto;
  overflow-wrap: break-word;
  word-break: break-word;
}

.st__word-space { white-space: pre; }

.st__vocab {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 6px;
  border-top: 1px dashed var(--border-soft);
}
.st__vocab-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin: 0;
}
.st__vocab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}
.st__vocab-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 10px 12px;
  background: var(--color-primary-softer);
  border: 1px solid var(--color-primary-soft);
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast), border-color var(--motion-fast);
}
.st__vocab-card:hover {
  background: var(--color-primary-soft);
  transform: translateY(-1px);
  border-color: var(--color-primary);
}
.st__vocab-card strong {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}
.st__vocab-card small {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.3;
}

/* ── Phrase-by-phrase mode ── */
.st__scene {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  padding: 24px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.st__scene-illu {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-primary-softer);
  box-shadow: var(--shadow-sm);
}
.st__scene-illu :deep(svg) { width: 100%; height: 100%; display: block; }

.st__scene-body { display: flex; flex-direction: column; gap: 14px; min-width: 0; }

.st__scene-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.st__scene-title { font-family: var(--font-nav); font-size: 14px; font-weight: 700; color: var(--color-primary); letter-spacing: 0.04em; text-transform: uppercase; }
.st__scene-counter { font-family: var(--font-nav); font-size: 12px; font-weight: 700; color: var(--text-muted); background: var(--surface-sunken); padding: 3px 10px; border-radius: 999px; }
.st__scene-context { margin: 0; font-size: 13px; color: var(--text-secondary); font-style: italic; line-height: 1.5; }

.st__frase {
  display: flex; flex-wrap: wrap; gap: 4px 6px;
  padding: 16px 18px;
  background: var(--surface-sunken);
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
  line-height: 1.7;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
}

.st__word {
  font-family: inherit; font-size: inherit; font-weight: inherit;
  color: var(--text-primary);
  padding: 2px 6px;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast);
  line-height: 1.4;
  display: inline;
}
.st__word:hover { background: var(--color-primary-soft); color: var(--color-primary-deep); }
.st__word.is-selected { background: var(--color-primary); color: #fff; }
.st__word--inline { display: inline-block; }

.st__scene-translation {
  display: flex; gap: 8px; align-items: flex-start;
  margin: 0;
  padding: 12px 14px;
  background: var(--color-primary-softer);
  border: 1px dashed var(--color-primary-soft);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.st__scene-translation :deep(svg) { margin-top: 2px; flex-shrink: 0; color: var(--color-primary); }

.st__scene-nav { display: flex; justify-content: space-between; gap: 10px; margin-top: 4px; }

.st__nav-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  background: var(--surface-sunken);
  color: var(--text-secondary);
  transition: background var(--motion-fast), color var(--motion-fast), transform var(--motion-fast);
}
.st__nav-btn:not(:disabled):hover { background: var(--color-primary-soft); color: var(--color-primary-deep); }
.st__nav-btn--primary { background: var(--color-primary); color: #fff; }
.st__nav-btn--primary:not(:disabled):hover { background: var(--color-primary-hover, #2566eb); transform: translateY(-1px); }

.st__progress { display: flex; gap: 6px; align-self: center; }
.st__progress-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--border-default);
  transition: background var(--motion-fast), transform var(--motion-fast);
  cursor: pointer;
}
.st__progress-dot.is-done { background: var(--color-primary); }
.st__progress-dot.is-current { background: var(--color-primary); transform: scale(1.4); box-shadow: 0 0 0 4px var(--color-primary-soft); }

.st__popover {
  position: absolute;
  width: 280px;
  max-width: calc(100vw - 16px);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 12px 14px;
  z-index: 80;
  font-size: 13px;
}
.st__popover::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: var(--surface-card);
  margin-top: -1px;
  filter: drop-shadow(0 4px 2px rgba(15, 23, 42, 0.06));
}

.st__popover-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 6px; }
.st__popover-word { font-family: var(--font-nav); font-size: 14px; font-weight: 700; color: var(--color-primary); }
.st__popover-close {
  width: 22px; height: 22px;
  border-radius: 6px;
  background: transparent;
  color: var(--text-faint);
  display: inline-flex; align-items: center; justify-content: center;
}
.st__popover-close:hover { background: var(--color-primary-soft); color: var(--color-primary); }

.st__popover-translation { margin: 0 0 6px; color: var(--text-primary); font-weight: 600; }
.st__popover-translation--missing { font-style: italic; font-weight: 500; color: var(--text-muted); }
.st__popover-pt { margin: 0; padding-top: 6px; border-top: 1px dashed var(--border-soft); font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
.st__popover-pt small { display: block; font-family: var(--font-nav); font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 2px; }

.st-pop-enter-active, .st-pop-leave-active { transition: opacity 0.16s ease, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1); }
.st-pop-enter-from, .st-pop-leave-to { opacity: 0; transform: translateY(6px) scale(0.96); }

.st__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 24px;
  text-align: center;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  color: var(--text-secondary);
  font-family: var(--font-body);
}
.st__status p { margin: 0; font-size: 14px; color: var(--text-muted); }
.st__status--error p { color: var(--color-danger, #ef4444); }
.st__spinner {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 3px solid var(--color-primary-soft);
  border-top-color: var(--color-primary);
  animation: st-spin 0.8s linear infinite;
}
.st__retry {
  margin-top: 4px;
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
}
.st__retry:hover { background: var(--color-primary-hover, #2566eb); }

@keyframes st-spin { to { transform: rotate(360deg); } }

@media (max-width: 880px) {
  .st__narrative { grid-template-columns: minmax(0, 1fr); }
  .st__narrative-hero { aspect-ratio: 16/9; min-height: 0; }
  .st__narrative-text { font-size: 16px; }
  .st__narrative-body { padding: 20px 20px 24px; }
}
@media (max-width: 720px) {
  .st__scene { grid-template-columns: minmax(0, 1fr); }
  .st__scene-illu { max-width: 280px; margin: 0 auto; }
  .st__frase { font-size: 16px; }
}
</style>