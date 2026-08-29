<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useToastStore } from '@/stores/toast'
import { getAudioUrl } from '@/services/audioCache'
import { APP_VERSION, APP_BUILD } from '@/version'

const settings = useSettingsStore()
const toast = useToastStore()

const LEVEL_META = {
  A1: { color: '#22c55e', label: 'A1',
    desc: 'Iniciante completo — palavras curtas, frases simples, números básicos.' },
  A2: { color: '#3b82f6', label: 'A2',
    desc: 'Elementar — nomes completos, telefones, frases do dia a dia.' },
  B1: { color: '#f59e0b', label: 'B1',
    desc: 'Intermediário — endereços, frases mais longas, vocabulário rico.' },
  B2: { color: '#ef4444', label: 'B2',
    desc: 'Avançado — frases complexas, números longos, e-mails formais.' }
}

const LEVELS = ['A1', 'A2', 'B1', 'B2']

const ITEMS_BY_LEVEL = {
  A1: [
    { id: 'a1-n1', cat: 'Nome',     text: 'Marie' },
    { id: 'a1-n2', cat: 'Nome',     text: 'Pierre' },
    { id: 'a1-n3', cat: 'Nome',     text: 'Lucas' },
    { id: 'a1-p1', cat: 'Telefone', text: '06 12 34 56 78' },
    { id: 'a1-nu1', cat: 'Número',  text: 'vingt-trois' },
    { id: 'a1-nu2', cat: 'Número',  text: 'mille' },
    { id: 'a1-ph1', cat: 'Frase',   text: 'Bonjour.' },
    { id: 'a1-ph2', cat: 'Frase',   text: 'Merci beaucoup.' },
    { id: 'a1-ph3', cat: 'Frase',   text: 'Au revoir.' },
    { id: 'a1-e1', cat: 'E-mail',  text: 'lucas@gmail.com' }
  ],
  A2: [
    { id: 'a2-n1', cat: 'Nome',     text: 'Marie Dupont' },
    { id: 'a2-n2', cat: 'Nome',     text: 'Jean-Pierre Martin' },
    { id: 'a2-n3', cat: 'Nome',     text: 'Camille Lefèvre' },
    { id: 'a2-p1', cat: 'Telefone', text: '+33 1 23 45 67 89' },
    { id: 'a2-p2', cat: 'Telefone', text: '01 45 67 89 12' },
    { id: 'a2-nu1', cat: 'Número',  text: 'deux mille quatre cent cinquante-deux' },
    { id: 'a2-nu2', cat: 'Número',  text: 'quinze virgule sept' },
    { id: 'a2-ph1', cat: 'Frase',   text: 'Je voudrais un café, s\'il vous plaît.' },
    { id: 'a2-ph2', cat: 'Frase',   text: 'Où sont les toilettes ?' },
    { id: 'a2-a1',  cat: 'Endereço', text: '12 rue de la Paix, Paris' },
    { id: 'a2-e1',  cat: 'E-mail',   text: 'marie.dupont@gmail.com' }
  ],
  B1: [
    { id: 'b1-n1', cat: 'Nome',     text: 'Camille Lefèvre' },
    { id: 'b1-n2', cat: 'Nome',     text: 'Jean-Pierre Martin' },
    { id: 'b1-n3', cat: 'Nome',     text: 'Anne-Sophie Bernard' },
    { id: 'b1-p1', cat: 'Telefone', text: '+33 6 78 12 34 56' },
    { id: 'b1-p2', cat: 'Telefone', text: '01 23 45 67 89' },
    { id: 'b1-nu1', cat: 'Número',  text: 'mille neuf cent quatre-vingt-neuf' },
    { id: 'b1-nu2', cat: 'Número',  text: 'trois cent quarante-cinq' },
    { id: 'b1-ph1', cat: 'Frase',   text: 'Je voudrais réserver une table pour deux personnes.' },
    { id: 'b1-ph2', cat: 'Frase',   text: 'Où est la station de métro la plus proche ?' },
    { id: 'b1-ph3', cat: 'Frase',   text: 'Pouvez-vous me répéter, plus lentement ?' },
    { id: 'b1-a1',  cat: 'Endereço', text: '34 avenue des Champs-Élysées, Lyon' },
    { id: 'b1-e1',  cat: 'E-mail',   text: 'anne.bernard@orange.fr' }
  ],
  B2: [
    { id: 'b2-n1', cat: 'Nome',     text: 'Anne-Sophie de La Rochefoucauld' },
    { id: 'b2-n2', cat: 'Nome',     text: 'François-Xavier Saint-Exupéry' },
    { id: 'b2-p1', cat: 'Telefone', text: '+33 6 78 12 34 56' },
    { id: 'b2-p2', cat: 'Telefone', text: '04 91 23 45 67 89 12' },
    { id: 'b2-nu1', cat: 'Número',  text: 'mille neuf cent quatre-vingt-dix-neuf' },
    { id: 'b2-nu2', cat: 'Número',  text: 'cinquante-deux virgule trois' },
    { id: 'b2-ph1', cat: 'Frase',   text: 'Pouvez-vous me répéter, plus lentement, s\'il vous plaît ?' },
    { id: 'b2-ph2', cat: 'Frase',   text: 'Je souhaiterais prendre rendez-vous pour la semaine prochaine.' },
    { id: 'b2-ph3', cat: 'Frase',   text: 'Quel est le tarif pour un aller-retour ?' },
    { id: 'b2-a1',  cat: 'Endereço', text: '12 rue de la Paix, 75002 Paris, France' },
    { id: 'b2-a2',  cat: 'Endereço', text: '34 avenue des Champs-Élysées, 69006 Lyon' },
    { id: 'b2-e1',  cat: 'E-mail',   text: 'anne-sophie.lerochefoucauld@orange.fr' }
  ]
}

const CAT_COLOR = {
  'Nome':     '#6366f1',
  'Telefone': '#10b981',
  'Número':   '#f59e0b',
  'Frase':    '#0ea5e9',
  'Endereço': '#ec4899',
  'E-mail':   '#8b5cf6'
}

const phase = ref('choose')  // 'choose' | 'running' | 'done'
const selectedLevel = ref(null)
const idx = ref(0)
const userInput = ref('')
const results = ref([])
const checking = ref(false)
const playbackMode = ref('normal')
const playing = ref(false)
const audioEl = ref(null)

const ITEMS = computed(() => selectedLevel.value ? ITEMS_BY_LEVEL[selectedLevel.value] || [] : [])
const currentItem = computed(() => ITEMS.value[idx.value])
const totalItems = computed(() => ITEMS.value.length)
const progress = computed(() =>
  totalItems.value ? Math.round((idx.value / totalItems.value) * 100) : 0
)

const score = computed(() => {
  const r = results.value
  const correct = r.filter((x) => x.correct).length
  const total = r.length
  return {
    correct,
    total,
    pct: total ? Math.round((correct / total) * 100) : 0
  }
})

function normalize(item, raw) {
  const s = (raw || '').trim()
  if (!s) return ''
  if (item.cat === 'Telefone' || item.cat === 'Número') {
    return s.replace(/\D/g, '')
  }
  if (item.cat === 'E-mail') {
    return s.toLowerCase().replace(/\s+/g, '')
  }
  // Frases / Nomes / Endereços: tolerante a acentos, pontuação, capitalização.
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')   // remove .,;:!?-'"/()& etc
    .replace(/\s+/g, ' ')
    .trim()
}

function expectedKey(item) {
  if (item.cat === 'Telefone' || item.cat === 'Número') {
    return item.text.replace(/\D/g, '')
  }
  if (item.cat === 'E-mail') {
    return item.text.toLowerCase().replace(/\s+/g, '')
  }
  return item.text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function similarity(a, b) {
  if (!a || !b) return 0
  if (a === b) return 100
  const setA = new Set(a.split(/\s+/).filter(Boolean))
  const setB = new Set(b.split(/\s+/).filter(Boolean))
  let inter = 0
  for (const t of setA) if (setB.has(t)) inter++
  const union = new Set([...setA, ...setB]).size
  if (union === 0) return 0
  const jaccard = inter / union
  const minLen = Math.min(a.length, b.length)
  const maxLen = Math.max(a.length, b.length)
  const lenRatio = maxLen > 0 ? minLen / maxLen : 0
  return Math.round((jaccard * 0.7 + lenRatio * 0.3) * 100)
}

const voiceOpts = computed(() => ({
  voice: settings.voice === 'male' ? 'male' : 'female',
  region: settings.region || 'fr',
  speed: playbackMode.value === 'slow' ? 0.7 : 0.9
}))

function pickLevel(level) {
  if (!LEVEL_META[level]) return
  selectedLevel.value = level
  idx.value = 0
  userInput.value = ''
  results.value = []
  checking.value = false
  phase.value = 'running'
  nextTick(() => {
    const ta = document.querySelector('.dt__input')
    if (ta) ta.focus()
  })
}

function backToLevels() {
  stopAudio()
  phase.value = 'choose'
  selectedLevel.value = null
  idx.value = 0
  userInput.value = ''
  results.value = []
  checking.value = false
}

function playCurrent(speed = null) {
  const item = currentItem.value
  if (!item || !audioEl.value) return
  try {
    const opts = { ...voiceOpts.value, speed: speed || voiceOpts.value.speed }
    const { url } = getAudioUrl(item.text, opts)
    audioEl.value.src = url
    audioEl.value.load()
    playing.value = true
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => { playing.value = false })
    }
  } catch (e) {
    playing.value = false
    toast.error('Não foi possível reproduzir o áudio.')
  }
}

function stopAudio() {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
  playing.value = false
}

function onAudioEnded() { playing.value = false }
function onAudioError() { playing.value = false }

function playNormal() {
  playbackMode.value = 'normal'
  playCurrent(0.9)
}
function playSlow() {
  playbackMode.value = 'slow'
  playCurrent(0.7)
}

function submitAnswer() {
  if (checking.value) return
  const item = currentItem.value
  if (!item) return
  const expected = expectedKey(item)
  const got = normalize(item, userInput.value)
  if (!got) {
    toast.warning('Digite o que você ouviu antes de verificar.')
    return
  }
  const ok = got === expected
  const sim = similarity(got, expected)
  results.value.push({
    itemId: item.id,
    cat: item.cat,
    expected: item.text,
    user: userInput.value.trim(),
    correct: ok,
    similarity: sim
  })
  checking.value = true
  nextTick(() => {
    const el = document.querySelector('.dt__result-card')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
}

function nextItem() {
  checking.value = false
  userInput.value = ''
  if (idx.value + 1 >= totalItems.value) {
    phase.value = 'done'
  } else {
    idx.value++
    nextTick(() => {
      const ta = document.querySelector('.dt__input')
      if (ta) ta.focus()
    })
  }
}

function restart() {
  results.value = []
  idx.value = 0
  userInput.value = ''
  checking.value = false
  phase.value = 'running'
  nextTick(() => {
    const ta = document.querySelector('.dt__input')
    if (ta) ta.focus()
  })
}

function chooseAnotherLevel() {
  backToLevels()
}

function categoryColor(cat) {
  return CAT_COLOR[cat] || '#3b82f6'
}

function onInputKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    if (!checking.value) submitAnswer()
    else nextItem()
  }
}

function speakExpected(item) {
  if (!audioEl.value) return
  try {
    const { url } = getAudioUrl(item.text, voiceOpts.value)
    audioEl.value.src = url
    audioEl.value.load()
    audioEl.value.play().catch(() => {})
  } catch (e) { /* ignore */ }
}

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
})
</script>

<template>
  <div class="dt">
    <!-- Header -->
    <header class="dt__head">
      <div class="dt__title-block">
        <span class="dt__eyebrow">DITADO EM EN francês</span>
        <h1 class="dt__title">Escute e escreva o que ouviu</h1>
        <p class="dt__sub">
          Pratique escuta ativa em francês. Escolha o nível (A1 a B2),
          aperte play, ouça com atenção e digite exatamente o que ouviu.
        </p>
      </div>
      <div class="dt__progress-card" v-if="phase === 'running' && currentItem">
        <div class="dt__progress-meta">
          <strong>{{ idx + 1 }}<span>/{{ totalItems }}</span></strong>
          <span
            class="dt__progress-cat"
            :style="{ color: LEVEL_META[selectedLevel].color }"
          >
            {{ LEVEL_META[selectedLevel].label }}
          </span>
        </div>
        <div class="dt__bar">
          <span class="dt__bar-fill" :style="{ width: progress + '%' }"></span>
        </div>
        <div v-if="results.length" class="dt__score-mini">
          <strong>{{ score.correct }}/{{ score.total }}</strong>
          <span>{{ score.pct }}%</span>
        </div>
      </div>
      <button
        v-if="phase === 'running'"
        type="button"
        class="dt__back"
        @click="backToLevels"
      >
        <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
        Trocar nível
      </button>
    </header>

    <!-- Phase 0: choose level -->
    <template v-if="phase === 'choose'">
      <section class="dt__levels-grid">
        <button
          v-for="lvl in LEVELS"
          :key="lvl"
          type="button"
          class="dt__level-card card"
          :style="{ '--level-color': LEVEL_META[lvl].color }"
          @click="pickLevel(lvl)"
        >
          <div class="dt__level-icon">
            <AppIcon name="ear" :size="30" />
          </div>
          <div class="dt__level-body">
            <div class="dt__level-head">
              <h2 class="dt__level-name">{{ LEVEL_META[lvl].label }}</h2>
              <span
                class="dt__level-count"
                :style="{
                  background: LEVEL_META[lvl].color + '1a',
                  color: LEVEL_META[lvl].color,
                  borderColor: LEVEL_META[lvl].color + '55'
                }"
              >
                {{ ITEMS_BY_LEVEL[lvl].length }} itens
              </span>
            </div>
            <p class="dt__level-desc">{{ LEVEL_META[lvl].desc }}</p>
            <div class="dt__level-cta">
              <AppIcon name="play" :size="14" />
              <span>Começar ditado</span>
            </div>
          </div>
        </button>
      </section>
    </template>

    <!-- Practice mode -->
    <template v-if="phase === 'running'">
      <section class="dt__card card">
        <header class="dt__card-head">
          <span
            class="dt__cat-pill"
            :style="{
              background: categoryColor(currentItem.cat) + '1a',
              color: categoryColor(currentItem.cat),
              borderColor: categoryColor(currentItem.cat) + '55'
            }"
          >
            <AppIcon name="volume" :size="12" />
            {{ currentItem.cat }}
          </span>
          <span class="dt__counter">Item {{ idx + 1 }} de {{ totalItems }}</span>
        </header>

        <div class="dt__audio">
          <button
            type="button"
            class="dt__audio-btn dt__audio-btn--primary"
            :disabled="playing"
            @click="playNormal"
            aria-label="Ouvir em velocidade normal"
          >
            <AppIcon v-if="playing && playbackMode === 'normal'" name="pause" :size="18" />
            <AppIcon v-else name="play" :size="18" />
            Ouvir normal
          </button>
          <button
            type="button"
            class="dt__audio-btn"
            :disabled="playing"
            @click="playSlow"
            aria-label="Ouvir em velocidade lenta"
          >
            <AppIcon name="gauge" :size="16" />
            Ouvir lento
          </button>
          <button
            type="button"
            class="dt__audio-btn dt__audio-btn--ghost"
            @click="playCurrent(0.6)"
            aria-label="Repetir"
          >
            <AppIcon name="refresh" :size="14" />
            Repetir
          </button>
        </div>

        <div class="dt__input-wrap">
          <textarea
            v-model="userInput"
            class="dt__input"
            :placeholder="checking
              ? 'Resultado abaixo'
              : 'Digite aqui exatamente o que você ouviu…'"
            rows="3"
            :disabled="checking"
            @keydown="onInputKey"
          ></textarea>
          <div v-if="!checking" class="dt__input-actions">
            <button
              type="button"
              class="dt__btn dt__btn--primary"
              :disabled="!userInput.trim()"
              @click="submitAnswer"
            >
              <AppIcon name="check" :size="16" />
              Verificar
            </button>
          </div>
        </div>

        <Transition name="dt-fb">
          <div v-if="checking" class="dt__result-card" :class="results.at(-1).correct ? 'is-ok' : 'is-err'">
            <div class="dt__result-icon">
              <AppIcon :name="results.at(-1).correct ? 'check' : 'cross'" :size="22" />
            </div>
            <div class="dt__result-body">
              <strong>
                {{ results.at(-1).correct ? 'Perfeito!' : 'Quase lá!' }}
                <small>{{ results.at(-1).similarity }}% de similaridade</small>
              </strong>
              <div class="dt__result-line">
                <span class="dt__result-label">Esperado</span>
                <p class="dt__result-expected">{{ results.at(-1).expected }}</p>
                <button
                  type="button"
                  class="dt__result-speak"
                  @click="speakExpected(results.at(-1))"
                  aria-label="Ouvir a resposta"
                >
                  <AppIcon name="speaker" :size="13" />
                </button>
              </div>
              <div class="dt__result-line">
                <span class="dt__result-label" :class="results.at(-1).correct ? 'dt__result-label--ok' : 'dt__result-label--err'">
                  Sua resposta
                </span>
                <p
                  class="dt__result-user"
                  :class="results.at(-1).correct ? 'is-correct' : 'is-wrong'"
                >
                  {{ results.at(-1).user }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="dt__btn dt__btn--primary dt__btn--next"
              @click="nextItem"
            >
              {{ idx + 1 >= totalItems ? 'Ver nota final' : 'Próximo item' }}
              <AppIcon name="arrow" :size="16" />
            </button>
          </div>
        </Transition>
      </section>

      <section v-if="results.length" class="dt__history">
        <h2 class="dt__section-title">
          <AppIcon name="history" :size="16" />
          Itens respondidos
        </h2>
        <div class="dt__history-list">
          <article
            v-for="(r, i) in results"
            :key="i"
            class="dt__history-item"
            :class="r.correct ? 'is-ok' : 'is-err'"
          >
            <span
              class="dt__history-dot"
              :style="{ background: r.correct ? '#10b981' : '#ef4444' }"
            ></span>
            <span class="dt__history-cat">{{ r.cat }}</span>
            <span class="dt__history-text">{{ r.expected }}</span>
            <span class="dt__history-sim">{{ r.similarity }}%</span>
          </article>
        </div>
      </section>
    </template>

    <!-- Done / Results screen -->
    <template v-else>
      <section class="dt__done card">
        <div class="dt__done-icon" :style="{ background: score.pct >= 70 ? '#10b981' : '#f59e0b' }">
          <AppIcon name="trophy" :size="32" />
        </div>
        <h2 class="dt__done-title">
          {{ score.pct >= 90 ? 'Excelente !' :
             score.pct >= 70 ? 'Très bien !' :
             score.pct >= 50 ? 'Continue praticando !' :
             'Precisa de mais prática' }}
        </h2>
        <p class="dt__done-sub">
          Você acertou <strong>{{ score.correct }}</strong> de {{ score.total }} ditados
          ({{ score.pct }}% de precisão).
        </p>

        <div class="dt__big-score">
          <div class="dt__big-score-num" :style="{ color: score.pct >= 70 ? '#10b981' : '#f59e0b' }">
            {{ score.pct }}%
          </div>
          <div class="dt__big-score-bar">
            <span
              class="dt__big-score-fill"
              :style="{
                width: score.pct + '%',
                background: score.pct >= 70 ? '#10b981' : '#f59e0b'
              }"
            ></span>
          </div>
        </div>

        <h3 class="dt__results-h">Por categoria</h3>
        <div class="dt__by-cat">
          <div
            v-for="cat in Object.keys(CAT_COLOR)"
            :key="cat"
            class="dt__cat-row"
          >
            <span
              class="dt__cat-dot"
              :style="{ background: categoryColor(cat) }"
            ></span>
            <span class="dt__cat-name">{{ cat }}</span>
            <span class="dt__cat-score">
              {{ results.filter((r) => r.cat === cat && r.correct).length }} /
              {{ results.filter((r) => r.cat === cat).length }}
            </span>
            <div class="dt__cat-bar">
              <span
                class="dt__cat-bar-fill"
                :style="{
                  width: (() => {
                    const tot = results.filter((r) => r.cat === cat).length
                    const ok = results.filter((r) => r.cat === cat && r.correct).length
                    return tot ? (ok / tot * 100) + '%' : '0%'
                  })(),
                  background: categoryColor(cat)
                }"
              ></span>
            </div>
          </div>
        </div>

        <h3 class="dt__results-h">Revisão detalhada</h3>
        <div class="dt__results-list">
          <article
            v-for="(r, i) in results"
            :key="'rev-' + i"
            class="dt__results-item"
            :class="r.correct ? 'is-ok' : 'is-err'"
          >
            <div class="dt__results-item-head">
              <span
                class="dt__cat-pill dt__cat-pill--sm"
                :style="{
                  background: categoryColor(r.cat) + '1a',
                  color: categoryColor(r.cat),
                  borderColor: categoryColor(r.cat) + '55'
                }"
              >{{ r.cat }}</span>
              <span class="dt__results-item-sim">{{ r.similarity }}%</span>
            </div>
            <p class="dt__results-expected"><strong>Esperado:</strong> {{ r.expected }}</p>
            <p class="dt__results-user">
              <strong>Sua resposta:</strong>
              <span :class="r.correct ? 'is-correct' : 'is-wrong'">{{ r.user }}</span>
            </p>
          </article>
        </div>

        <div class="dt__done-actions">
          <button
            type="button"
            class="dt__btn dt__btn--ghost dt__btn--lg"
            @click="chooseAnotherLevel"
          >
            <AppIcon name="arrow" :size="14" />
            Outro nível
          </button>
          <button
            type="button"
            class="dt__btn dt__btn--primary dt__btn--lg"
            @click="restart"
          >
            <AppIcon name="refresh" :size="16" />
            Recomeçar mesmo nível
          </button>
        </div>
      </section>
    </template>

    <footer class="dt__footer">
      <span>© 2026 Parle-Juh — Escute, escreva, aprenda.</span>
      <span class="dt__footer-version">
        v{{ APP_VERSION }}
        <small>· {{ APP_BUILD }}</small>
      </span>
    </footer>

    <audio
      ref="audioEl"
      hidden
      @ended="onAudioEnded"
      @error="onAudioError"
      @pause="playing = false"
    />
  </div>
</template>

<style scoped>
.dt {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: var(--font-body);
  max-width: 880px;
  margin: 0 auto;
  width: 100%;
}

/* ── Head ── */
.dt__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.dt__back {
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
.dt__back:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}

/* ── Level cards (choose phase) ── */
.dt__levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 14px;
}

.dt__level-card {
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
.dt__level-card:hover {
  border-color: var(--level-color);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px color-mix(in srgb, var(--level-color) 30%, transparent);
}

.dt__level-icon {
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
.dt__level-card:hover .dt__level-icon {
  transform: scale(1.06) rotate(-4deg);
}

.dt__level-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dt__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.dt__level-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}
.dt__level-count {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid;
  white-space: nowrap;
}
.dt__level-desc {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
}
.dt__level-cta {
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

.dt__title-block { flex: 1; min-width: 240px; }

.dt__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-success);
  background: var(--color-success-soft, rgba(16, 185, 129, 0.12));
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.dt__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}

.dt__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 620px;
  line-height: 1.55;
}

.dt__progress-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  min-width: 240px;
  box-shadow: var(--shadow-xs);
}

.dt__progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.dt__progress-meta strong {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-primary);
}
.dt__progress-meta strong span { color: var(--text-muted); font-size: 14px; font-weight: 400; margin-left: 2px; }

.dt__progress-cat {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.dt__bar {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}
.dt__bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-success), var(--color-primary));
  border-radius: 999px;
  transition: width 0.4s var(--ease-out);
}

.dt__score-mini {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
}
.dt__score-mini strong { color: var(--color-success); font-size: 13px; }

/* ── Card (current item) ── */
.dt__card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 22px 24px !important;
}

.dt__card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dt__cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;
}
.dt__cat-pill--sm { font-size: 10px; padding: 3px 9px; }

.dt__counter {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
}

.dt__audio {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.dt__audio-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--color-primary-softer);
  color: var(--color-primary);
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  border: 1px solid var(--color-primary-soft);
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.dt__audio-btn:hover:not(:disabled) {
  background: var(--color-primary-soft);
  transform: translateY(-1px);
}
.dt__audio-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.dt__audio-btn--primary {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
}
.dt__audio-btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #2566eb);
}

.dt__audio-btn--ghost {
  background: transparent;
  color: var(--text-muted);
  border-color: var(--border-default);
}
.dt__audio-btn--ghost:hover:not(:disabled) {
  background: var(--surface-sunken);
  color: var(--text-primary);
}

/* ── Input ── */
.dt__input-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dt__input {
  width: 100%;
  padding: 14px 16px;
  background: var(--surface-page);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  transition: border-color var(--motion-fast);
}
.dt__input:focus { border-color: var(--color-primary); background: var(--surface-card); }
.dt__input::placeholder { color: var(--text-faint); font-weight: 400; }
.dt__input:disabled { opacity: 0.7; }

.dt__input-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.dt__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast);
  border: none;
}
.dt__btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.dt__btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover, #2566eb);
  transform: translateY(-1px);
}
.dt__btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }
.dt__btn--lg { padding: 14px 26px; font-size: 14px; }
.dt__btn--ghost {
  background: var(--surface-sunken);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}
.dt__btn--ghost:hover:not(:disabled) {
  background: var(--surface-card);
  color: var(--text-primary);
}

.dt__btn--next {
  margin-left: auto;
  align-self: flex-start;
}

/* ── Result card (inline feedback) ── */
.dt__result-card {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 16px 18px;
  border-radius: var(--radius-lg);
  border: 2px solid;
  background: var(--surface-card);
  box-shadow: var(--shadow-sm);
}
.dt__result-card.is-ok {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.45);
}
.dt__result-card.is-err {
  background: rgba(239, 68, 68, 0.06);
  border-color: rgba(239, 68, 68, 0.4);
}

.dt__result-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.dt__result-card.is-ok .dt__result-icon { background: #10b981; }
.dt__result-card.is-err .dt__result-icon { background: #ef4444; }

.dt__result-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.dt__result-body strong {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-primary);
}
.dt__result-body strong small {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  margin-left: 8px;
}

.dt__result-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dt__result-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.dt__result-label--ok { color: var(--color-success); }
.dt__result-label--err { color: #b91c1c; }

.dt__result-expected,
.dt__result-user {
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
  word-break: break-word;
}
.dt__result-expected {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-weight: 500;
}
.dt__result-user.is-correct {
  color: var(--color-success-text, #15803d);
}
.dt__result-user.is-wrong {
  color: #b91c1c;
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
}

.dt__result-speak {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary-softer);
  color: var(--color-primary);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--motion-fast);
  flex-shrink: 0;
}
.dt__result-speak:hover { background: var(--color-primary); color: #fff; }

.dt-fb-enter-active, .dt-fb-leave-active {
  transition: opacity var(--motion-base), transform var(--motion-base);
}
.dt-fb-enter-from, .dt-fb-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* ── History list ── */
.dt__history {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dt__section-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.dt__history-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dt__history-item {
  display: grid;
  grid-template-columns: 12px 90px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 10px;
  font-size: 13px;
}
.dt__history-item.is-err { border-color: rgba(239, 68, 68, 0.3); }

.dt__history-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dt__history-cat {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.dt__history-text {
  font-family: var(--font-display);
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13.5px;
}

.dt__history-sim {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
}

/* ── Done screen ── */
.dt__done {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 36px 28px !important;
}

.dt__done-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.25);
}

.dt__done-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}

.dt__done-sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 420px;
}

.dt__done-sub strong { color: var(--text-primary); }

.dt__big-score {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 0 8px;
}
.dt__big-score-num {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
}
.dt__big-score-bar {
  height: 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}
.dt__big-score-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s var(--ease-out);
}

.dt__results-h {
  margin: 8px 0 0;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
  align-self: flex-start;
}

.dt__by-cat {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dt__cat-row {
  display: grid;
  grid-template-columns: 12px 100px 60px 1fr;
  align-items: center;
  gap: 10px;
}
.dt__cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dt__cat-name {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
}
.dt__cat-score {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-align: right;
}
.dt__cat-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}
.dt__cat-bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s var(--ease-out);
}

.dt__results-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dt__results-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 10px;
  border-left: 4px solid;
  text-align: left;
}
.dt__results-item.is-ok { border-left-color: #10b981; }
.dt__results-item.is-err { border-left-color: #ef4444; }

.dt__results-item-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dt__results-item-sim {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-secondary);
}

.dt__results-expected,
.dt__results-user {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-secondary);
}
.dt__results-expected strong,
.dt__results-user strong {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-right: 6px;
}
.dt__results-user .is-correct { color: var(--color-success-text, #15803d); font-weight: 600; }
.dt__results-user .is-wrong { color: #b91c1c; font-weight: 600; }

.dt__done-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 640px) {
  .dt__title { font-size: 22px; }
  .dt__result-card {
    grid-template-columns: 44px 1fr;
    grid-template-rows: auto auto;
  }
  .dt__result-card .dt__btn--next {
    grid-column: 1 / -1;
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
  .dt__audio-btn { font-size: 12px; padding: 8px 12px; }
  .dt__history-item {
    grid-template-columns: 10px 1fr auto;
    grid-template-rows: auto auto;
  }
  .dt__history-cat { grid-column: 2; }
  .dt__history-text { grid-column: 2; font-size: 12.5px; }
  .dt__history-sim { grid-column: 3; grid-row: 1 / 3; align-self: center; }
}

/* ─── Footer ─── */
.dt__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.dt__footer-version {
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
.dt__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}
</style>