<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { VERBS, PRONOUNS, getVerb, getPronounsFor, normalizeAnswer } from '@/data/verbs'

const toast = useToastStore()

/* ── Sorteio do verbo ── */
function pickRandomVerb(excludeId = null) {
  const pool = excludeId ? VERBS.filter((v) => v.id !== excludeId) : VERBS
  return pool[Math.floor(Math.random() * pool.length)]
}

const activeVerb = ref(pickRandomVerb())
const totalTenses = computed(() => activeVerb.value.tenses.length)
const pronounsForVerb = computed(() => getPronounsFor(activeVerb.value))

/* ── Setup: escolha de tempos verbais ── */
const selectedTenseIds = ref(activeVerb.value.tenses.map((t) => t.id))
const tenseCount = computed({
  get: () => selectedTenseIds.value.length,
  set: (val) => {
    const n = Math.max(1, Math.min(totalTenses.value, Number(val) || 1))
    if (n > selectedTenseIds.value.length) {
      const extras = activeVerb.value.tenses
        .filter((t) => !selectedTenseIds.value.includes(t.id))
        .slice(0, n - selectedTenseIds.value.length)
        .map((t) => t.id)
      selectedTenseIds.value = [...selectedTenseIds.value, ...extras]
    } else {
      selectedTenseIds.value = selectedTenseIds.value.slice(0, n)
    }
  }
})

const selectedTenses = computed(() =>
  activeVerb.value.tenses.filter((t) => selectedTenseIds.value.includes(t.id))
)

function toggleTense(id) {
  if (selectedTenseIds.value.includes(id)) {
    if (selectedTenseIds.value.length === 1) {
      toast.warning('Selecione pelo menos um tempo verbal.')
      return
    }
    selectedTenseIds.value = selectedTenseIds.value.filter((x) => x !== id)
  } else {
    selectedTenseIds.value = [...selectedTenseIds.value, id]
  }
}

function reshuffleVerb() {
  activeVerb.value = pickRandomVerb(activeVerb.value.id)
  selectedTenseIds.value = activeVerb.value.tenses.map((t) => t.id)
  phase.value = 'setup'
}

/* ── Sessão de prática ── */
const phase = ref('setup') // 'setup' | 'practice' | 'finished'
const session = reactive({
  verbId: null,
  tenses: [],
  questions: [],
  index: 0,
  correct: 0,
  attempts: 0
})

function buildSession() {
  const tenses = selectedTenses.value
  const pronouns = pronounsForVerb.value
  const questions = []
  for (const tense of tenses) {
    for (const pronoun of pronouns) {
      // Pula pronomes sem conjugação neste tempo (defensivo)
      if (!tense.conjugations[pronoun.id]) continue
      questions.push({
        tenseId: tense.id,
        pronounId: pronoun.id,
        answer: '',
        state: 'pending'
      })
    }
  }
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }
  session.verbId = activeVerb.value.id
  session.tenses = tenses.map((t) => t.id)
  session.questions = questions
  session.index = 0
  session.correct = 0
  session.attempts = 0
}

const currentQuestion = computed(() => session.questions[session.index] || null)
const currentTense = computed(() => {
  const q = currentQuestion.value
  if (!q) return null
  return activeVerb.value.tenses.find((t) => t.id === q.tenseId) || null
})
const currentPronoun = computed(() => {
  const q = currentQuestion.value
  if (!q) return null
  return PRONOUNS.find((p) => p.id === q.pronounId) || null
})
const totalQuestions = computed(() => session.questions.length)
const progress = computed(() => {
  if (!totalQuestions.value) return 0
  return Math.round((session.index / totalQuestions.value) * 100)
})
const scoreMsg = computed(() => {
  if (!session.attempts) return null
  const rate = Math.round((session.correct / session.attempts) * 100)
  return `${session.correct} acerto(s) em ${session.attempts} — ${rate}%`
})
const expectedAnswer = computed(() => {
  if (!currentTense.value || !currentPronoun.value) return ''
  return currentTense.value.conjugations[currentPronoun.value.id] || ''
})

function startSession() {
  if (!selectedTenseIds.value.length) {
    toast.warning('Selecione ao menos um tempo verbal.')
    return
  }
  buildSession()
  if (!session.questions.length) {
    toast.error('Nenhuma pergunta pôde ser gerada. Ajuste os tempos verbais.')
    return
  }
  phase.value = 'practice'
}

function restart() {
  phase.value = 'setup'
}

function endSession() {
  phase.value = 'finished'
}

function repeatSame() {
  if (!selectedTenseIds.value.length) return
  buildSession()
  if (!session.questions.length) return
  phase.value = 'practice'
}

function checkAnswer() {
  const q = currentQuestion.value
  if (!q) return
  const given = normalizeAnswer(q.answer)
  const expected = normalizeAnswer(expectedAnswer.value)
  session.attempts++
  if (given && given === expected) {
    q.state = 'correct'
    session.correct++
  } else {
    q.state = 'wrong'
  }
}

function reveal() {
  const q = currentQuestion.value
  if (!q) return
  q.state = 'revealed'
}

function nextQuestion() {
  if (session.index + 1 >= totalQuestions.value) {
    endSession()
    return
  }
  session.index++
}

function onSubmit(e) {
  e?.preventDefault?.()
  const q = currentQuestion.value
  if (!q) return
  if (q.state === 'pending') {
    if (!q.answer.trim()) {
      toast.info('Digite a conjugação antes de verificar.')
      return
    }
    checkAnswer()
  } else {
    nextQuestion()
  }
}

function onKeydown(e) {
  if (e.key !== 'Enter') return
  const q = currentQuestion.value
  if (!q) return
  if (q.state === 'pending') {
    e.preventDefault()
    if (q.answer.trim()) checkAnswer()
  } else if (q.state === 'wrong' || q.state === 'correct' || q.state === 'revealed') {
    e.preventDefault()
    nextQuestion()
  }
}

const finalTensesBreakdown = computed(() => {
  if (phase.value !== 'finished') return []
  return session.tenses.map((id) => {
    const tense = activeVerb.value.tenses.find((t) => t.id === id)
    const qs = session.questions.filter((q) => q.tenseId === id)
    const correct = qs.filter((q) => q.state === 'correct').length
    return {
      id,
      name: tense?.name || id,
      correct,
      total: qs.length
    }
  })
})

onMounted(() => {
  // Estado inicial já configurado; nada a fazer.
})
</script>

<template>
  <div class="cj">
    <!-- SETUP -->
    <template v-if="phase === 'setup'">
      <header class="cj__head">
        <div class="cj__title-block">
          <span class="cj__eyebrow">CONJUGAÇÃO</span>
          <h1 class="cj__title">Treine a conjugação do verbo <em>{{ activeVerb.infinitive }}</em></h1>
          <p class="cj__sub">
            Um verbo é sorteado a cada início de sessão. Escolha quantos tempos
            verbais do francês você quer praticar e depois conjigue o verbo nos
            pronomes aplicáveis.
          </p>
        </div>
        <div class="cj__verb-block">
          <div class="cj__verb-card">
            <span class="cj__verb-eyebrow">Verbo sorteado</span>
            <strong class="cj__verb-infinitive">{{ activeVerb.infinitive }}</strong>
            <small class="cj__verb-translation">{{ activeVerb.translation }}</small>
          </div>
          <button
            type="button"
            class="cj__verb-reshuffle"
            @click="reshuffleVerb"
            title="Sortear outro verbo"
            aria-label="Sortear outro verbo"
          >
            <AppIcon name="refresh" :size="13" />
            Sortear outro verbo
          </button>
        </div>
      </header>

      <section class="cj__setup card">
        <header class="cj__setup-head">
          <div>
            <h2 class="cj__setup-title">
              <AppIcon name="layers" :size="16" />
              Tempos disponíveis
            </h2>
            <p class="cj__setup-sub">
              Selecione os tempos verbais que deseja incluir na sessão
              ({{ selectedTenseIds.length }} de {{ totalTenses }}).
            </p>
          </div>
        </header>

        <div class="cj__count">
          <label class="cj__count-label" for="cj-count">Quantidade de tempos</label>
          <div class="cj__count-row">
            <input
              id="cj-count"
              type="range"
              min="1"
              :max="totalTenses"
              step="1"
              v-model.number="tenseCount"
              class="cj__range"
            />
            <div class="cj__count-value">
              <strong>{{ selectedTenseIds.length }}</strong>
              <small>/ {{ totalTenses }}</small>
            </div>
          </div>
          <div class="cj__count-ticks">
            <button
              v-for="n in totalTenses"
              :key="n"
              type="button"
              class="cj__tick"
              :class="{ 'is-active': selectedTenseIds.length >= n }"
              @click="tenseCount = n"
            >
              {{ n }}
            </button>
          </div>
        </div>

        <div class="cj__chips">
          <button
            v-for="t in activeVerb.tenses"
            :key="t.id"
            type="button"
            class="cj__chip"
            :class="{ 'is-active': selectedTenseIds.includes(t.id) }"
            @click="toggleTense(t.id)"
          >
            <span class="cj__chip-mark" aria-hidden="true">
              <AppIcon v-if="selectedTenseIds.includes(t.id)" name="check" :size="12" />
            </span>
            <span class="cj__chip-text">
              <strong>{{ t.name }}</strong>
              <small>{{ t.description }}</small>
            </span>
          </button>
        </div>

        <footer class="cj__setup-foot">
          <p class="cj__setup-hint">
            <AppIcon name="info" :size="14" />
            Você terá que responder <strong>{{ selectedTenseIds.length * pronounsForVerb.length }}</strong>
            perguntas no total ({{ selectedTenseIds.length }} tempo(s) ×
            {{ pronounsForVerb.length }} pronome(s)).
          </p>
          <button class="btn btn-primary btn--lg" type="button" @click="startSession">
            <AppIcon name="play" :size="16" />
            Iniciar prática
          </button>
        </footer>
      </section>
    </template>

    <!-- PRACTICE -->
    <template v-else-if="phase === 'practice' && currentQuestion">
      <header class="cj__practice-head">
        <div class="cj__practice-meta">
          <button class="cj__back" type="button" @click="restart">
            <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
            Voltar
          </button>
          <span class="cj__practice-counter">
            {{ session.index + 1 }}<small>/{{ totalQuestions }}</small>
          </span>
        </div>
        <div class="cj__practice-info">
          <span class="cj__practice-verb">{{ activeVerb.infinitive }}</span>
          <span class="cj__practice-tense">{{ currentTense?.name }}</span>
        </div>
        <p v-if="scoreMsg" class="cj__practice-score">{{ scoreMsg }}</p>
      </header>

      <div class="cj__practice-bar">
        <span class="cj__practice-bar-fill" :style="{ width: progress + '%' }"></span>
      </div>

      <section class="cj__question card">
        <span class="cj__question-eyebrow">CONJUGUE O VERBO</span>
        <div class="cj__question-line">
          <span class="cj__pronoun">{{ currentPronoun?.label }}</span>
          <span class="cj__separator">—</span>
          <span class="cj__hint">{{ currentTense?.name.toLowerCase() }}</span>
        </div>

        <form class="cj__answer" @submit="onSubmit">
          <label class="cj__answer-label" for="cj-answer">
            Sua resposta
            <small>(acentos são opcionais — vamos ignorar diferenças)</small>
          </label>
          <div
            class="cj__answer-field"
            :class="{
              'is-correct': currentQuestion.state === 'correct',
              'is-wrong': currentQuestion.state === 'wrong',
              'is-revealed': currentQuestion.state === 'revealed'
            }"
          >
            <input
              id="cj-answer"
              ref="answerInput"
              type="text"
              v-model="currentQuestion.answer"
              :disabled="currentQuestion.state !== 'pending'"
              :placeholder="
                currentPronoun?.id === 'je'
                  ? 'ex.: avais été'
                  : currentPronoun?.id === 'nous'
                  ? 'ex.: avions été'
                  : 'digite aqui…'
              "
              autocomplete="off"
              autocapitalize="off"
              spellcheck="false"
              @keydown="onKeydown"
            />
          </div>

          <Transition name="cj-fb">
            <div
              v-if="currentQuestion.state === 'correct'"
              class="cj__feedback cj__feedback--ok"
            >
              <span class="cj__feedback-icon">
                <AppIcon name="check" :size="18" />
              </span>
              <div>
                <strong>Correto!</strong>
                <span>{{ currentPronoun?.label }} <em>{{ expectedAnswer }}</em> ({{ currentTense?.name.toLowerCase() }})</span>
              </div>
            </div>
            <div
              v-else-if="currentQuestion.state === 'wrong'"
              class="cj__feedback cj__feedback--err"
            >
              <span class="cj__feedback-icon">
                <AppIcon name="cross" :size="18" />
              </span>
              <div>
                <strong>Quase lá!</strong>
                <span>Resposta esperada: <em>{{ expectedAnswer }}</em></span>
              </div>
            </div>
            <div
              v-else-if="currentQuestion.state === 'revealed'"
              class="cj__feedback cj__feedback--reveal"
            >
              <span class="cj__feedback-icon">
                <AppIcon name="info" :size="18" />
              </span>
              <div>
                <strong>Sem problemas</strong>
                <span>Resposta: <em>{{ expectedAnswer }}</em></span>
              </div>
            </div>
          </Transition>

          <div class="cj__actions">
            <button
              v-if="currentQuestion.state === 'pending'"
              type="button"
              class="btn btn-ghost"
              @click="reveal"
            >
              <AppIcon name="info" :size="14" />
              Revelar
            </button>
            <button
              v-if="currentQuestion.state === 'pending'"
              type="submit"
              class="btn btn-primary"
            >
              <AppIcon name="check" :size="14" />
              Verificar
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click="nextQuestion"
            >
              {{ session.index + 1 >= totalQuestions ? 'Concluir' : 'Próxima' }}
              <AppIcon name="arrow" :size="14" />
            </button>
          </div>
        </form>
      </section>
    </template>

    <!-- FINISHED -->
    <template v-else-if="phase === 'finished'">
      <header class="cj__done-head">
        <div class="cj__done-icon">
          <AppIcon name="trophy" :size="28" />
        </div>
        <div>
          <span class="cj__eyebrow">SESSÃO CONCLUÍDA</span>
          <h1 class="cj__title">{{ activeVerb.infinitive }} — bem feito!</h1>
          <p class="cj__sub">
            {{ scoreMsg }} em {{ totalQuestions }} perguntas.
          </p>
        </div>
      </header>

      <section class="cj__summary card">
        <h2 class="cj__summary-title">
          <AppIcon name="chartBar" :size="16" />
          Desempenho por tempo verbal
        </h2>
        <ul class="cj__summary-list">
          <li
            v-for="row in finalTensesBreakdown"
            :key="row.id"
            class="cj__summary-row"
          >
            <span class="cj__summary-name">{{ row.name }}</span>
            <span class="cj__summary-bar">
              <span
                class="cj__summary-bar-fill"
                :style="{ width: (row.total ? (row.correct / row.total) * 100 : 0) + '%' }"
              ></span>
            </span>
            <span class="cj__summary-score">{{ row.correct }}/{{ row.total }}</span>
          </li>
        </ul>
      </section>

      <div class="cj__done-actions">
        <button class="btn btn-secondary btn--lg" type="button" @click="restart">
          <AppIcon name="refresh" :size="14" />
          Configurar nova sessão
        </button>
        <button class="btn btn-primary btn--lg" type="button" @click="repeatSame">
          <AppIcon name="refresh" :size="14" />
          Repetir com mesmos tempos
        </button>
        <button class="btn btn-ghost btn--lg" type="button" @click="reshuffleVerb">
          <AppIcon name="sparkles" :size="14" />
          Sortear outro verbo
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.cj {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
}

/* ── Setup ── */
.cj__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.cj__title-block { max-width: 640px; }
.cj__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.cj__title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
  color: var(--text-primary);
}
.cj__title em {
  font-style: normal;
  color: var(--color-primary);
  background: var(--color-primary-softer);
  padding: 0 8px;
  border-radius: 8px;
}
.cj__sub {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.55;
}

.cj__verb-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.cj__verb-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-deep) 100%);
  color: #fff;
  border-radius: 16px;
  box-shadow: var(--shadow-hero);
  width: 100%;
}
.cj__verb-reshuffle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  color: var(--color-primary);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}
.cj__verb-reshuffle:hover {
  background: var(--color-primary-softer);
  border-color: var(--color-primary-soft);
}
.cj__verb-reshuffle :deep(svg) {
  transition: transform var(--motion-fast);
}
.cj__verb-reshuffle:hover :deep(svg) {
  transform: rotate(-30deg);
}
.cj__verb-eyebrow {
  font-family: var(--font-nav);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}
.cj__verb-infinitive {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.cj__verb-translation {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

/* ── Setup card ── */
.cj__setup {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: var(--shadow-sm);
}
.cj__setup-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}
.cj__setup-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
}
.cj__setup-sub {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
}

/* ── Quantity slider ── */
.cj__count {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 14px;
}
.cj__count-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-primary);
}
.cj__count-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.cj__range {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  background: var(--border-default);
  border-radius: 2px;
  cursor: pointer;
}
.cj__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #fff;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.cj__range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 2px solid #fff;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}
.cj__count-value {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  padding: 6px 12px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-variant-numeric: tabular-nums;
}
.cj__count-value strong {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}
.cj__count-value small {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}
.cj__count-ticks {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.cj__tick {
  min-width: 30px;
  height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: all var(--motion-fast);
}
.cj__tick:hover { color: var(--color-primary); border-color: var(--color-primary-soft); }
.cj__tick.is-active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

/* ── Chips ── */
.cj__chips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
}
.cj__chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: border-color var(--motion-fast), background var(--motion-fast), transform var(--motion-fast);
}
.cj__chip:hover {
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}
.cj__chip.is-active {
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
}
.cj__chip-mark {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--border-default);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
  background: transparent;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}
.cj__chip.is-active .cj__chip-mark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.cj__chip-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.cj__chip-text strong {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}
.cj__chip-text small {
  font-size: 11.5px;
  color: var(--text-muted);
  line-height: 1.35;
}

/* ── Setup footer ── */
.cj__setup-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 8px;
  border-top: 1px dashed var(--border-soft);
}
.cj__setup-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 12.5px;
  color: var(--text-secondary);
}
.cj__setup-hint :deep(svg) { color: var(--color-primary); }
.cj__setup-hint strong { color: var(--text-primary); font-weight: 700; }

/* ── Practice ── */
.cj__practice-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}
.cj__practice-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cj__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--motion-fast);
}
.cj__back:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}
.cj__practice-counter {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  font-variant-numeric: tabular-nums;
}
.cj__practice-counter small {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  margin-left: 2px;
}
.cj__practice-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
}
.cj__practice-verb {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
}
.cj__practice-tense {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--surface-sunken);
  padding: 3px 10px;
  border-radius: 999px;
}
.cj__practice-score {
  flex-basis: 100%;
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
}

.cj__practice-bar {
  height: 6px;
  background: var(--surface-sunken);
  border-radius: 999px;
  overflow: hidden;
}
.cj__practice-bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 999px;
  transition: width var(--motion-base) var(--ease-out);
}

/* ── Question card ── */
.cj__question {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}
.cj__question::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  opacity: 0.85;
}
.cj__question-eyebrow {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}
.cj__question-line {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.cj__pronoun {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}
.cj__separator {
  color: var(--text-soft);
  font-size: 24px;
}
.cj__hint {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-secondary);
  background: var(--surface-sunken);
  padding: 4px 12px;
  border-radius: 999px;
}

/* ── Answer ── */
.cj__answer {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.cj__answer-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cj__answer-label small {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-faint);
  text-transform: none;
  letter-spacing: 0;
}
.cj__answer-field {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--surface-page);
  border: 2px solid var(--border-default);
  border-radius: 14px;
  padding: 0 16px;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast), background var(--motion-fast);
}
.cj__answer-field:focus-within {
  border-color: var(--color-primary);
  background: var(--surface-card);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}
.cj__answer-field.is-correct {
  border-color: var(--color-success);
  background: var(--color-success-soft);
}
.cj__answer-field.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}
.cj__answer-field.is-revealed {
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
}
.cj__answer-field input {
  flex: 1;
  height: 56px;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
  color: var(--text-primary);
}
.cj__answer-field input::placeholder {
  color: var(--text-soft);
  font-weight: 400;
  font-style: italic;
}
.cj__answer-field input:disabled {
  cursor: default;
}

/* ── Feedback ── */
.cj__feedback {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.5;
}
.cj__feedback-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cj__feedback strong {
  display: block;
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 2px;
}
.cj__feedback em {
  font-family: var(--font-display);
  font-style: normal;
  font-weight: 600;
  color: var(--color-primary);
  background: var(--surface-card);
  padding: 1px 8px;
  border-radius: 6px;
  margin: 0 2px;
}
.cj__feedback--ok {
  background: var(--color-success-soft);
  color: var(--color-success-text);
  border: 1px solid var(--color-success);
}
.cj__feedback--ok .cj__feedback-icon {
  background: var(--color-success);
  color: #fff;
}
.cj__feedback--err {
  background: rgba(239, 68, 68, 0.08);
  color: #b91c1c;
  border: 1px solid rgba(239, 68, 68, 0.4);
}
.cj__feedback--err .cj__feedback-icon {
  background: #ef4444;
  color: #fff;
}
.cj__feedback--reveal {
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
  border: 1px dashed var(--color-primary-soft);
}
.cj__feedback--reveal .cj__feedback-icon {
  background: var(--color-primary);
  color: #fff;
}

.cj__actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.cj-fb-enter-active, .cj-fb-leave-active {
  transition: opacity 0.18s ease, transform 0.18s var(--ease-out);
}
.cj-fb-enter-from, .cj-fb-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Finished ── */
.cj__done-head {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.cj__done-icon {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--color-accent), #ea6a0f);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  flex-shrink: 0;
}
.cj__summary {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-xs);
}
.cj__summary-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}
.cj__summary-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.cj__summary-row {
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  align-items: center;
  gap: 12px;
}
.cj__summary-name {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}
.cj__summary-bar {
  position: relative;
  height: 8px;
  background: var(--surface-sunken);
  border-radius: 999px;
  overflow: hidden;
}
.cj__summary-bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 999px;
  transition: width 0.5s var(--ease-out);
}
.cj__summary-score {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-primary);
  font-variant-numeric: tabular-nums;
}
.cj__done-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.cj__done-actions .btn--lg {
  padding: 12px 18px;
  font-size: 13px;
}

@media (max-width: 640px) {
  .cj__title { font-size: 22px; }
  .cj__pronoun { font-size: 30px; }
  .cj__question { padding: 24px 20px; }
  .cj__answer-field input { font-size: 18px; height: 50px; }
  .cj__verb-card { width: 100%; }
  .cj__practice-info { align-items: flex-start; text-align: left; }
}
</style>
