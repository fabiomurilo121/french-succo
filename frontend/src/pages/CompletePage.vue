<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

const CATEGORY_STYLES = {
  'Cumprimentos':  { icon: 'sun',        tint: '#f59e0b' },
  'Apresentação':  { icon: 'user',       tint: '#6366f1' },
  'Restaurante':   { icon: 'utensils',   tint: '#ef4444' },
  'Viagem':        { icon: 'map',        tint: '#0ea5e9' },
  'Cortesia':      { icon: 'sparkles',   tint: '#10b981' },
  'Conversa':      { icon: 'chat',       tint: '#8b5cf6' },
  'Compras':       { icon: 'bag',        tint: '#ec4899' },
  'Família':       { icon: 'home',       tint: '#f97316' },
  'Tempo':         { icon: 'cloud',      tint: '#64748b' },
  'Rotina':        { icon: 'clock',      tint: '#14b8a6' }
}

const exercises = [
  {
    id: 1,
    category: 'Cumprimentos',
    sentence: '___ , comment ___ -vous ___ ?',
    translation: 'Olá, como vai você hoje?',
    slots: [
      { id: 'a', text: 'Bonjour' },
      { id: 'b', text: 'allez' },
      { id: 'c', text: "aujourd'hui" }
    ],
    pool: ['Bonjour', 'allez', "aujourd'hui", 'Comment', 'ça', 'tu']
  },
  {
    id: 2,
    category: 'Restaurante',
    sentence: 'Je ___ un café, ___ vous plaît',
    translation: 'Eu queria um café, por favor',
    slots: [
      { id: 'a', text: 'voudrais' },
      { id: 'b', text: "s'il" }
    ],
    pool: ['voudrais', "s'il", 'Comment', 'avez', 'Bonjour', 'merci']
  },
  {
    id: 3,
    category: 'Viagem',
    sentence: 'Où ___ les ___ ?',
    translation: 'Onde ficam os banheiros ?',
    slots: [
      { id: 'a', text: 'sont' },
      { id: 'b', text: 'toilettes' }
    ],
    pool: ['sont', 'toilettes', 'sommes', 'vais', 'toi', 'maison']
  },
  {
    id: 4,
    category: 'Cortesia',
    sentence: '___ beaucoup, ___ la peine',
    translation: 'Obrigado, desculpe',
    slots: [
      { id: 'a', text: 'Merci' },
      { id: 'b', text: 'pardon' }
    ],
    pool: ['Merci', 'pardon', 'Bonsoir', 'pour', 'avec', 'voilà']
  },
  {
    id: 5,
    category: 'Cumprimentos',
    sentence: 'Enchanté, je ___ Paul',
    translation: 'Prazer, eu sou Paul',
    slots: [{ id: 'a', text: 'suis' }],
    pool: ['suis', 'ai', 'es', 'vais', 'voilà', 'merci']
  },
  {
    id: 6,
    category: 'Conversa',
    sentence: 'Je ___ à Paris, et ___ ?',
    translation: 'Eu moro em Paris, e você ?',
    slots: [
      { id: 'a', text: 'habite' },
      { id: 'b', text: 'toi' }
    ],
    pool: ['habite', 'toi', 'parle', 'moi', 'Paris', 'suis']
  },
  {
    id: 7,
    category: 'Compras',
    sentence: "C'est combien ___ ?",
    translation: 'Quanto custa isso?',
    slots: [{ id: 'a', text: 'ça' }],
    pool: ['ça', 'ce', 'cette', 'si', 'où', 'quoi']
  },
  {
    id: 8,
    category: 'Cortesia',
    sentence: '___ -moi, ___ ?',
    translation: 'Com licença, posso?',
    slots: [
      { id: 'a', text: 'Excusez' },
      { id: 'b', text: "j'peux" }
    ],
    pool: ['Excusez', "j'peux", 'Bonjour', 'Merci', 'Comment', 'allez']
  },
  {
    id: 9,
    category: 'Restaurante',
    sentence: "___ , s'il vous plaît",
    translation: 'A conta, por favor',
    slots: [{ id: 'a', text: "L'addition" }],
    pool: [
      "L'addition", 'Le café', 'Merci', 'Voilà', 'ça', 'moi'
    ]
  },
  {
    id: 10,
    category: 'Viagem',
    sentence: "Pouvez-vous m'___ ?",
    translation: 'Você pode me ajudar?',
    slots: [{ id: 'a', text: 'aider' }],
    pool: ['aider', 'avoir', 'aller', 'venir', 'faire', 'voir']
  },
  {
    id: 11,
    category: 'Apresentação',
    sentence: "Je ___ Pierre",
    translation: 'Eu me chamo Pierre',
    slots: [{ id: 'a', text: "m'appelle" }],
    pool: ["m'appelle", 'suis', 'parle', 'suis', 'ai', 'voilà']
  },
  {
    id: 12,
    category: 'Apresentação',
    sentence: "Comment ___ -tu ?",
    translation: 'Como você se chama?',
    slots: [{ id: 'a', text: "t'appelles" }],
    pool: ["t'appelles", 'ça', 'tu', 'vas', 'vous', 'allez']
  },
  {
    id: 13,
    category: 'Cumprimentos',
    sentence: '___ , merci',
    translation: 'Olá, obrigado',
    slots: [{ id: 'a', text: 'Salut' }],
    pool: ['Salut', 'Merci', 'Voilà', 'Bon', 'voilà', 'Bonsoir']
  },
  {
    id: 14,
    category: 'Família',
    sentence: "J'___ une sœur",
    translation: 'Eu tenho uma irmã',
    slots: [{ id: 'a', text: 'ai' }],
    pool: ['ai', 'suis', 'a', 'es', 'sommes', 'voilà']
  },
  {
    id: 15,
    category: 'Família',
    sentence: "J'___ deux frères",
    translation: 'Eu tenho dois irmãos',
    slots: [{ id: 'a', text: 'ai' }],
    pool: ['ai', 'suis', 'a', 'es', 'voilà', 'sommes']
  },
  {
    id: 16,
    category: 'Conversa',
    sentence: 'Tu ___ français ?',
    translation: 'Você fala francês?',
    slots: [{ id: 'a', text: 'parles' }],
    pool: ['parles', 'parle', 'parlons', 'parlez', 'voilà', 'merci']
  },
  {
    id: 17,
    category: 'Conversa',
    sentence: 'Je ___ étudiant',
    translation: 'Eu sou estudante',
    slots: [{ id: 'a', text: 'suis' }],
    pool: ['suis', 'ai', 'es', 'parle', 'va', 'voilà']
  },
  {
    id: 18,
    category: 'Cortesia',
    sentence: '___ vous plaît',
    translation: 'Por favor',
    slots: [{ id: 'a', text: "S'il" }],
    pool: ["S'il", 'Merci', 'Voilà', 'Pardon', 'Avec', 'Pour']
  },
  {
    id: 19,
    category: 'Restaurante',
    sentence: "Je ___ de l'eau",
    translation: 'Eu queria água',
    slots: [{ id: 'a', text: 'voudrais' }],
    pool: ['voudrais', 'vais', 'pars', 'suis', 'ai', 'voilà']
  },
  {
    id: 20,
    category: 'Restaurante',
    sentence: "C'est ___ bon",
    translation: 'Isto é muito bom',
    slots: [{ id: 'a', text: 'très' }],
    pool: ['très', 'bien', 'bon', 'plus', 'trop', 'merci']
  },
  {
    id: 21,
    category: 'Compras',
    sentence: "Je ___ cette robe",
    translation: 'Eu levo este vestido',
    slots: [{ id: 'a', text: 'prends' }],
    pool: ['prends', 'vais', 'suis', 'ai', 'fais', 'voilà']
  },
  {
    id: 22,
    category: 'Compras',
    sentence: "Vous ___ la carte ?",
    translation: 'Vocês aceitam cartão?',
    slots: [{ id: 'a', text: 'acceptez' }],
    pool: ['acceptez', 'parlez', 'allez', 'avez', 'êtes', 'voilà']
  },
  {
    id: 23,
    category: 'Viagem',
    sentence: "Je ___ à Paris",
    translation: 'Eu vou a Paris',
    slots: [{ id: 'a', text: 'vais' }],
    pool: ['vais', 'suis', 'pars', 'ai', 'voilà', 'fais']
  },
  {
    id: 24,
    category: 'Viagem',
    sentence: "L'___ est à quelle heure ?",
    translation: 'O ônibus sai a que horas?',
    slots: [{ id: 'a', text: 'autobus' }],
    pool: ['autobus', 'avion', 'train', 'hôtel', 'taxi', 'voilà']
  },
  {
    id: 25,
    category: 'Tempo',
    sentence: "Il ___ aujourd'hui",
    translation: 'Hoje faz sol',
    slots: [{ id: 'a', text: 'fait beau' }],
    pool: ['fait beau', 'fait chaud', 'pleut', 'fais', 'est', 'voilà']
  },
  {
    id: 26,
    category: 'Tempo',
    sentence: "Il ___ très froid",
    translation: 'Está muito frio',
    slots: [{ id: 'a', text: 'fait' }],
    pool: ['fait', 'fais', 'suis', 'ai', 'a', 'voilà']
  },
  {
    id: 27,
    category: 'Rotina',
    sentence: 'Je ___ à 7 heures',
    translation: 'Eu acordo às 7 horas',
    slots: [{ id: 'a', text: 'me réveille' }],
    pool: ['me réveille', 'me couche', 'me lève', 'pars', 'suis', 'voilà']
  },
  {
    id: 28,
    category: 'Rotina',
    sentence: "Je ___ le soir",
    translation: 'Eu trabalho à noite',
    slots: [{ id: 'a', text: 'travaille' }],
    pool: ['travaille', 'mange', 'dors', 'parle', 'suis', 'voilà']
  },
  {
    id: 29,
    category: 'Família',
    sentence: "C'est ___ ami",
    translation: 'Este é meu amigo',
    slots: [{ id: 'a', text: 'mon' }],
    pool: ['mon', 'ma', 'mes', 'ton', 'son', 'voilà']
  },
  {
    id: 30,
    category: 'Família',
    sentence: "C'est ___ mère",
    translation: 'Esta é minha mãe',
    slots: [{ id: 'a', text: 'ma' }],
    pool: ['ma', 'mon', 'mes', 'sa', 'ta', 'voilà']
  }
]

const currentCategory = computed(() => {
  const ex = currentExercise.value
  if (!ex) return null
  return CATEGORY_STYLES[ex.category] || { icon: 'book', tint: '#64748b' }
})

const sessionDeck = ref([])
const cardIndex = ref(0)

const currentExercise = computed(
  () => sessionDeck.value[cardIndex.value] || null
)
const totalExercises = computed(() => sessionDeck.value.length)
const progress = computed(() => {
  if (!totalExercises.value) return 0
  return Math.round(((cardIndex.value + 1) / totalExercises.value) * 100)
})

// slotId -> { uid, text } | undefined
const filledSlots = ref({})
// pool tiles: array of { uid, text, from: 'pool' | 'slot:<id>' }
const poolTiles = ref([])
const selectedTileUid = ref(null)

const stats = ref({ correct: 0, attempts: 0 })
const checkState = ref(null)
const erroredSlots = ref({})

// Sentence parts — split by '___' placeholder
// Para N `___`, temos N+1 partes; entre cada par há 1 slot
const sentenceParts = computed(() => {
  if (!currentExercise.value) return []
  return currentExercise.value.sentence.split('___')
})

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const DIFFICULTY_BY_ID = {
  1: 'hard',
  2: 'medium', 3: 'medium', 4: 'medium',
  6: 'medium', 8: 'medium',
  18: 'medium', 22: 'medium', 24: 'medium',
  27: 'medium', 29: 'medium', 30: 'medium'
}

const DIFFICULTY_META = {
  easy:   { label: 'Fácil',   color: '#10b981', icon: 'sparkles',
           points: 1, hint: 'always', poolSize: 'small',
           description: 'Frases curtas com 1 espaço. Poucas opções na piscina — ideal para começar.' },
  medium: { label: 'Médio',   color: '#f59e0b', icon: 'flask',
           points: 2, hint: 'always', poolSize: 'full',
           description: 'Frases do dia a dia com até 2 espaços. Mais distratores na piscina.' },
  hard:   { label: 'Difícil', color: '#ef4444', icon: 'gauge',
           points: 3, hint: 'reveal', poolSize: 'full',
           description: 'Frases longas e contrações. A tradução em português fica oculta.' },
  mixed:  { label: 'Misto',   color: '#6366f1', icon: 'layers',
           points: 1, hint: 'always', poolSize: 'auto',
           description: 'Mistura frases de todas as dificuldades, na ordem que sair.' }
}

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard', 'mixed']

function getDifficulty(id) {
  return DIFFICULTY_BY_ID[id] || 'easy'
}

const DIFFICULTY_KEY = 'french-succo:complete-difficulty'

const currentDifficulty = ref(null)
const levelSelected = ref(false)
const difficultyMeta = computed(() =>
  currentDifficulty.value ? DIFFICULTY_META[currentDifficulty.value] : null
)
const showHint = ref(false)
const hasChosenDifficulty = computed(() => levelSelected.value && currentDifficulty.value !== null)

const exerciseDifficulty = computed(() =>
  currentExercise.value ? getDifficulty(currentExercise.value.id) : 'easy'
)

function difficultyCount(d) {
  if (d === 'mixed') return exercises.length
  return exercises.filter((ex) => getDifficulty(ex.id) === d).length
}

function pickPoolFor(exercise) {
  const meta = currentDifficulty.value === 'mixed'
    ? DIFFICULTY_META[getDifficulty(exercise.id)]
    : DIFFICULTY_META[currentDifficulty.value]

  if (meta.poolSize === 'full') return [...exercise.pool]

  const slotCount = exercise.slots.length
  const correctSet = new Set(exercise.slots.map((s) => s.text))
  const distractors = exercise.pool.filter((p) => !correctSet.has(p))
  const needed = Math.max(slotCount + 2, slotCount + 1)
  const picked = shuffleArray(distractors).slice(0, Math.max(1, needed - slotCount))
  return shuffleArray([...exercise.slots.map((s) => s.text), ...picked])
}

function setDifficulty(d) {
  if (!DIFFICULTY_META[d]) return

  currentDifficulty.value = d
  levelSelected.value = true
  showHint.value = false
  try { localStorage.setItem(DIFFICULTY_KEY, d) } catch { /* ignore */ }
  buildSession()
  toast.success(`Dificuldade: ${DIFFICULTY_META[d].label}`, { duration: 1400 })
}

function resetDifficulty() {
  currentDifficulty.value = null
  levelSelected.value = false
  sessionDeck.value = []
  cardIndex.value = 0
  showHint.value = false
}

function resetExercise() {
  if (!currentExercise.value) return
  filledSlots.value = {}
  const poolTexts = pickPoolFor(currentExercise.value)
  poolTiles.value = poolTexts.map((text, idx) => ({
    uid: 't' + idx + '-' + Math.random().toString(36).slice(2, 6),
    text,
    from: 'pool'
  }))
  selectedTileUid.value = null
  checkState.value = null
  erroredSlots.value = {}
  showHint.value = false
}

function buildSession() {
  if (!currentDifficulty.value) return
  const filtered = currentDifficulty.value === 'mixed'
    ? exercises
    : exercises.filter((ex) => getDifficulty(ex.id) === currentDifficulty.value)
  sessionDeck.value = shuffleArray(filtered)
  cardIndex.value = 0
  stats.value = { attempts: 0, easy: 0, medium: 0, hard: 0, points: 0 }
  resetExercise()
}

function restart() {
  const total = (stats.value.easy || 0) + (stats.value.medium || 0) + (stats.value.hard || 0)
  if (total > 0 && !confirm('Reiniciar a sessão? Seu progresso será zerado.')) {
    return
  }
  buildSession()
  toast.info('Nova sessão iniciada', { duration: 1500 })
}

onMounted(() => {
  if (currentDifficulty.value !== null) buildSession()
})

watch(cardIndex, () => {
  resetExercise()
})

// ─── Drag & Drop ─────────────────────────────────────
let draggingTileUid = null

function startDrag(e, uid) {
  draggingTileUid = uid
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', uid)
  }
  selectedTileUid.value = uid
}

function onDragOver(e) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
}

function onDropSlot(e, slotId) {
  e.preventDefault()
  const uid = e.dataTransfer?.getData('text/plain') || draggingTileUid
  if (uid) placeTile(uid, slotId)
  draggingTileUid = null
}

function onDropPool(e) {
  e.preventDefault()
  const uid = e.dataTransfer?.getData('text/plain') || draggingTileUid
  if (uid) returnToPool(uid)
  draggingTileUid = null
}

function placeTile(uid, slotId) {
  const tile = poolTiles.value.find((t) => t.uid === uid)
  if (!tile) return

  // If slot has something, return it to pool
  const existing = filledSlots.value[slotId]
  if (existing) {
    returnToPool(existing.uid)
  }

  // If tile was in another slot, clear that
  if (tile.from && tile.from.startsWith('slot:')) {
    const prevSlot = tile.from.split(':')[1]
    delete filledSlots.value[prevSlot]
    delete erroredSlots.value[prevSlot]
  }

  filledSlots.value = {
    ...filledSlots.value,
    [slotId]: { uid: tile.uid, text: tile.text }
  }
  tile.from = `slot:${slotId}`

  // Clear feedback on placement
  delete erroredSlots.value[slotId]
  if (checkState.value === 'error' || checkState.value === 'success') {
    checkState.value = null
  }

  selectedTileUid.value = null
}

function returnToPool(uid) {
  const tile = poolTiles.value.find((t) => t.uid === uid)
  if (!tile) return
  if (tile.from && tile.from.startsWith('slot:')) {
    const slotId = tile.from.split(':')[1]
    delete filledSlots.value[slotId]
    delete erroredSlots.value[slotId]
    tile.from = 'pool'
  }
}

// Click-to-place fallback (mobile + accessibility)
function onTileClick(uid) {
  const tile = poolTiles.value.find((t) => t.uid === uid)
  if (!tile) return
  if (tile.from === 'pool') {
    selectedTileUid.value = selectedTileUid.value === uid ? null : uid
  } else if (tile.from.startsWith('slot:')) {
    returnToPool(uid)
  }
}

function onSlotClick(slotId) {
  if (!selectedTileUid.value) return
  if (filledSlots.value[slotId]?.uid === selectedTileUid.value) {
    returnToPool(selectedTileUid.value)
    return
  }
  placeTile(selectedTileUid.value, slotId)
}

// ─── Check / Next ────────────────────────────────────
function checkAnswer() {
  const ex = currentExercise.value
  if (!ex) return

  const missing = ex.slots.filter((s) => !filledSlots.value[s.id]?.text)
  if (missing.length) {
    const newErr = {}
    for (const s of missing) newErr[s.id] = 'Preencha este espaço'
    erroredSlots.value = newErr
    checkState.value = 'incomplete'
    return
  }

  stats.value.attempts++
  let allCorrect = true
  const newErr = {}
  for (const slot of ex.slots) {
    const placed = (filledSlots.value[slot.id]?.text || '').trim()
    const expected = slot.text.trim()
    if (placed !== expected) {
      newErr[slot.id] = `Esperado: "${expected}"`
      allCorrect = false
    }
  }
  erroredSlots.value = newErr
  if (allCorrect) {
    checkState.value = 'success'
    const diff = exerciseDifficulty.value
    stats.value[diff] = (stats.value[diff] || 0) + 1
    stats.value.points += DIFFICULTY_META[diff].points
  } else {
    checkState.value = 'error'
  }
}

function nextExercise() {
  if (checkState.value !== 'success') return
  if (cardIndex.value + 1 >= totalExercises.value) {
    // Wrap-around: mantém a pontuação, mas reembaralha o baralho filtrado
    // e reseta explicitamente o estado da tela (o watch(cardIndex) não dispara
    // porque cardIndex permanece em 0 e não muda de valor).
    const filtered = currentDifficulty.value === 'mixed'
      ? exercises
      : exercises.filter((ex) => getDifficulty(ex.id) === currentDifficulty.value)
    sessionDeck.value = shuffleArray(filtered)
    cardIndex.value = 0
    resetExercise()
    toast.success('Nova rodada! Continue praticando.', { duration: 2000 })
  } else {
    cardIndex.value++
  }
}

function clearSlots() {
  for (const slotId of Object.keys(filledSlots.value)) {
    const slot = filledSlots.value[slotId]
    if (slot) returnToPool(slot.uid)
  }
  checkState.value = null
  erroredSlots.value = {}
}

const scoreMsg = computed(() => {
  const a = stats.value.attempts
  if (a === 0) return null
  const total = (stats.value.easy || 0) + (stats.value.medium || 0) + (stats.value.hard || 0)
  const accuracy = Math.round((total / a) * 100)
  return `${total}/${a} acertos · ${stats.value.points} pts · ${accuracy}% de precisão`
})

const errorMessage = computed(() => {
  if (checkState.value !== 'error') return ''
  const wrong = Object.values(erroredSlots.value)
    .filter((m) => m && !m.includes('Preencha'))
  if (wrong.length === 0) return 'Confira os espaços em vermelho.'
  if (wrong.length === 1) {
    return '1 espaço incorreto. Clique sobre ele para devolver à piscina e tente novamente.'
  }
  return `${wrong.length} espaços incorretos. Clique sobre cada um para devolver à piscina e tente novamente.`
})
</script>

<template>
  <div class="cp">
    <!-- Tela de seleção de dificuldade (mesmo padrão visual do DictationPage) -->
    <section v-if="!levelSelected" class="cp__level-select">
      <header class="cp__head">
        <div class="cp__title-block">
          <span class="cp__eyebrow">COMPLETAR FRASES</span>
          <h1 class="cp__title">Escolha a dificuldade</h1>
          <p class="cp__sub">
            Arraste as palavras para os espaços. Cada nível ajusta o tamanho
            da frase, a quantidade de opções na piscina e os pontos por acerto.
          </p>
        </div>
      </header>

      <div class="cp__levels-grid">
        <div
          v-for="d in DIFFICULTY_ORDER"
          :key="d"
          class="cp__level-card card"
          :style="{ '--level-color': DIFFICULTY_META[d].color }"
          @click="setDifficulty(d)"
        >
          <div class="cp__level-icon">
            <AppIcon :name="DIFFICULTY_META[d].icon" :size="32" />
          </div>
          <div class="cp__level-body">
            <div class="cp__level-head">
              <h2 class="cp__level-name">{{ DIFFICULTY_META[d].label }}</h2>
              <span class="cp__level-count">
                {{ difficultyCount(d) }} {{ difficultyCount(d) === 1 ? 'frase' : 'frases' }}
              </span>
            </div>
            <p class="cp__level-desc">{{ DIFFICULTY_META[d].description }}</p>
            <div class="cp__level-meta">
              <span class="cp__level-tag">+{{ DIFFICULTY_META[d].points }} pts / acerto</span>
              <span v-if="DIFFICULTY_META[d].hint === 'reveal'" class="cp__level-tag cp__level-tag--warn">
                <AppIcon name="info" :size="11" />
                Tradução oculta
              </span>
            </div>
            <div class="cp__level-cta">
              <AppIcon name="play" :size="14" />
              <span>Começar</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tela do jogo (quando já existe uma dificuldade escolhida) -->
    <template v-else-if="currentExercise">
    <header class="cp__head">
      <div class="cp__title-block">
        <span class="cp__eyebrow">COMPLETAR FRASES</span>
        <h1 class="cp__title">Arraste e monte as frases</h1>
        <p class="cp__sub">
          Arraste as palavras para os espaços. Tudo correto para avançar.
        </p>
      </div>
      <div class="cp__progress-card">
        <div class="cp__progress-meta">
          <strong>{{ cardIndex + 1 }}<span>/{{ totalExercises }}</span></strong>
          <span class="cp__progress-cat">{{ currentExercise.category }}</span>
        </div>
        <div class="cp__bar">
          <span class="cp__bar-fill" :style="{ width: progress + '%' }"></span>
        </div>
        <p v-if="scoreMsg" class="cp__score">{{ scoreMsg }}</p>
        <div class="cp__progress-foot">
          <span
            class="cp__level-badge"
            :style="{
              background: difficultyMeta.color + '22',
              color: difficultyMeta.color,
              borderColor: difficultyMeta.color + '55'
            }"
          >
            <AppIcon :name="difficultyMeta.icon" :size="12" />
            {{ difficultyMeta.label }}
          </span>
          <button
            type="button"
            class="cp__change-difficulty"
            @click="resetDifficulty"
            aria-label="Trocar de dificuldade"
          >
            <AppIcon name="refresh" :size="12" />
            Trocar
          </button>
        </div>
      </div>
    </header>

    <section class="cp__exercise card">
      <header class="cp__exercise-head">
        <div class="cp__exercise-tags">
          <span class="cp__exercise-tag">{{ currentExercise.category }}</span>
          <span
            class="cp__exercise-difficulty"
            :style="{
              color: DIFFICULTY_META[exerciseDifficulty].color,
              background: DIFFICULTY_META[exerciseDifficulty].color + '1a',
              borderColor: DIFFICULTY_META[exerciseDifficulty].color + '55'
            }"
          >
            <span class="cp__exercise-difficulty-dot" :style="{ background: DIFFICULTY_META[exerciseDifficulty].color }"></span>
            {{ DIFFICULTY_META[exerciseDifficulty].label }}
          </span>
        </div>
        <button
          type="button"
          class="cp__exercise-clear"
          @click="clearSlots"
          title="Limpar todos os espaços"
        >
          <AppIcon name="refresh" :size="13" />
          Limpar
        </button>
      </header>

      <div
        class="cp__illustration"
        :style="{
          background: `linear-gradient(135deg, ${currentCategory.tint}1a 0%, ${currentCategory.tint}33 100%)`,
          color: currentCategory.tint
        }"
      >
        <div
          class="cp__illustration-icon"
          :style="{
            background: `${currentCategory.tint}26`,
            color: currentCategory.tint
          }"
        >
          <AppIcon :name="currentCategory.icon" :size="56" />
        </div>
        <div class="cp__illustration-meta">
          <small>Cenário</small>
          <strong>{{ currentExercise.category }}</strong>
        </div>
      </div>

      <div class="cp__sentence">
        <template v-for="(slot, idx) in currentExercise.slots" :key="slot.id">
          <span class="cp__sentence-text">{{ sentenceParts[idx] }}</span>
          <button
            type="button"
            class="cp__slot"
            :class="{
              'is-filled': !!filledSlots[slot.id],
              'is-wrong':
                checkState === 'error' && !!erroredSlots[slot.id],
              'is-correct':
                checkState === 'success' && !!filledSlots[slot.id]
            }"
            :aria-label="`Espaço ${idx + 1}`"
            @dragover="onDragOver"
            @drop="onDropSlot($event, slot.id)"
            @click="onSlotClick(slot.id)"
            @keydown.enter="onSlotClick(slot.id)"
          >
            <span
              v-if="filledSlots[slot.id]"
              class="cp__slot-content"
              >{{ filledSlots[slot.id].text }}</span
            >
            <span v-else class="cp__slot-placeholder">?</span>
          </button>
        </template>
        <span class="cp__sentence-text">{{
          sentenceParts[currentExercise.slots.length]
        }}</span>
      </div>

      <div v-if="difficultyMeta.hint === 'always'" class="cp__hint muted">
        <AppIcon name="info" :size="13" />
        Tradução: <strong>{{ currentExercise.translation }}</strong>
      </div>
      <div v-else class="cp__hint cp__hint--hard">
        <button
          type="button"
          class="cp__hint-toggle"
          @click="showHint = !showHint"
        >
          <AppIcon :name="showHint ? 'cross' : 'info'" :size="13" />
          {{ showHint ? 'Esconder tradução' : 'Mostrar tradução' }}
        </button>
        <Transition name="cp-hint">
          <p v-if="showHint">
            <strong>{{ currentExercise.translation }}</strong>
          </p>
        </Transition>
      </div>

      <Transition name="cp-fb">
        <div v-if="checkState === 'success'" class="cp__feedback cp__feedback--ok">
          <div class="cp__feedback-icon">
            <AppIcon name="check" :size="22" />
          </div>
          <div class="cp__feedback-text">
            <strong>Perfeito!</strong>
            <span>Frase completa corretamente.</span>
          </div>
        </div>
        <div v-else-if="checkState === 'error'" class="cp__feedback cp__feedback--err">
          <div class="cp__feedback-icon">
            <AppIcon name="cross" :size="22" />
          </div>
          <div class="cp__feedback-text">
            <strong>Não foi dessa vez</strong>
            <span>{{ errorMessage }}</span>
          </div>
        </div>
        <div v-else-if="checkState === 'incomplete'" class="cp__feedback cp__feedback--warn">
          <div class="cp__feedback-icon">
            <AppIcon name="info" :size="22" />
          </div>
          <div class="cp__feedback-text">
            <strong>Faltam palavras</strong>
            <span>Preencha todos os espaços antes de verificar.</span>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Word pool: now between sentence card and action buttons -->
    <section class="cp__pool-section">
      <div class="cp__pool-head">
        <h2 class="cp__pool-title">
          <AppIcon name="layers" :size="16" />
          Palavras disponíveis
        </h2>
        <small class="muted"
          >Arraste para o espaço correspondente ou clique para selecionar.</small
        >
      </div>
      <div
        class="cp__pool"
        @dragover="onDragOver"
        @drop="onDropPool"
      >
        <div
          v-for="t in poolTiles"
          :key="t.uid"
          class="cp__tile"
          :class="{
            'is-from-slot': t.from.startsWith('slot:'),
            'is-selected': selectedTileUid === t.uid
          }"
          :draggable="true"
          @dragstart="(e) => startDrag(e, t.uid)"
          @click="onTileClick(t.uid)"
        >
          <span>{{ t.text }}</span>
        </div>
      </div>
    </section>

    <!-- Action buttons: at the bottom, after pool -->
    <div class="cp__actions cp__actions--floating">
      <button class="btn btn-secondary btn--lg" type="button" @click="checkAnswer">
        <AppIcon name="check" :size="16" />
        Verificar
      </button>
      <button
        class="btn btn-primary btn--lg"
        type="button"
        @click="nextExercise"
        :disabled="checkState !== 'success'"
      >
        <AppIcon name="arrow" :size="16" />
        {{
          cardIndex + 1 >= totalExercises
            ? 'Embaralhar de novo'
            : 'Próxima frase'
        }}
      </button>
    </div>

    <footer class="cp__footer">
      <span>© 2026 Parle-Juh — Arraste, encaixe, aprenda.</span>
      <button class="cp__restart" type="button" @click="restart">
        <AppIcon name="refresh" :size="13" />
        Embaralhar tudo
      </button>
    </footer>
    </template>
  </div>
</template>

<style scoped>
.cp {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  max-width: 880px;
  margin: 0 auto;
}

.cp__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.cp__title-block {
  flex: 1;
  min-width: 240px;
}

.cp__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-success);
  background: rgba(16, 185, 129, 0.12);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.cp__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.cp__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

.cp__progress-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  min-width: 220px;
  box-shadow: var(--shadow-xs);
}

.cp__progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.cp__progress-meta strong {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-primary);
}
.cp__progress-meta strong span {
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 400;
  margin-left: 2px;
}

.cp__progress-cat {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-success);
}

.cp__bar {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}

.cp__bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-success), var(--color-primary));
  border-radius: 999px;
  transition: width 0.4s var(--ease-out);
}

.cp__score {
  margin: 8px 0 0;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-align: right;
}

/* ─── Exercise card ─── */
.cp__exercise {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px !important;
}

.cp__illustration {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
}
.cp__illustration-icon {
  width: 84px;
  height: 84px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px -4px rgba(0, 0, 0, 0.08);
  transition: transform var(--motion-base) var(--ease-out);
}
.cp__illustration:hover .cp__illustration-icon {
  transform: scale(1.04) rotate(-3deg);
}
.cp__illustration-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.cp__illustration-meta small {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.cp__illustration-meta strong {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.cp__exercise-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cp__exercise-tag {
  display: inline-flex;
  padding: 4px 12px;
  background: var(--color-success-soft);
  color: var(--color-success-text);
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
}

.cp__exercise-clear {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--surface-sunken);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
}
.cp__exercise-clear:hover {
  background: var(--color-primary-softer);
  color: var(--color-primary);
}

/* ─── Sentence (text + slots intercalados) ─── */
.cp__sentence {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  line-height: 2.2;
  letter-spacing: -0.005em;
  color: var(--text-primary);
  word-break: break-word;
  user-select: none;
  padding: 18px 12px;
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-soft);
  text-align: center;
}

.cp__sentence-text {
  white-space: pre-wrap;
  display: inline;
}

.cp__slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 40px;
  padding: 4px 14px;
  margin: 0 4px;
  border: 2px dashed var(--border-strong);
  border-radius: 8px;
  vertical-align: middle;
  transition: all var(--motion-fast);
  cursor: pointer;
  font-family: var(--font-nav);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--text-faint);
  background: transparent;
  vertical-align: 1px;
}

.cp__slot:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.cp__slot.is-filled {
  border-style: solid;
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
}

.cp__slot.is-wrong {
  border-style: solid;
  border-color: #dc2626;
  background: rgba(239, 68, 68, 0.16);
  color: #b91c1c;
  animation: cp-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

.cp__slot.is-correct {
  border-style: solid;
  border-color: #16a34a;
  background: rgba(34, 197, 94, 0.16);
  color: #15803d;
}

.cp__slot-content {
  font-family: var(--font-nav);
  font-weight: 600;
  font-size: 15px;
}

.cp__slot-placeholder {
  color: var(--text-faint);
  font-style: italic;
  font-size: 18px;
  font-weight: 500;
  opacity: 0.7;
}

/* ─── Hints (translation line) ─── */
.cp__hint {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 0;
  font-size: 13px;
  padding: 8px 12px;
  color: var(--text-muted);
  background: var(--surface-sunken);
  border-radius: 8px;
}
.cp__hint strong {
  color: var(--text-primary);
}

.cp__hint--hard {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.04));
  border: 1px dashed rgba(239, 68, 68, 0.3);
}
.cp__hint--hard p {
  margin: 0;
  font-size: 13px;
  color: var(--text-primary);
}
.cp__hint-toggle {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast);
}
.cp__hint-toggle:hover {
  background: rgba(239, 68, 68, 0.22);
  color: #7f1d1d;
}

.cp-hint-enter-active,
.cp-hint-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.cp-hint-enter-from,
.cp-hint-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ─── Level selection cards (DictationPage pattern) ─── */
.cp__level-select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cp__levels-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.cp__level-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 24px;
  background: var(--surface-card);
  border: 2px solid var(--border-default);
  border-left: 6px solid var(--level-color);
  border-radius: var(--radius-xl);
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  transition: border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out);
}

.cp__level-card:hover {
  border-color: var(--level-color);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px color-mix(in srgb, var(--level-color) 30%, transparent);
}

.cp__level-card:active {
  transform: translateY(0);
}

.cp__level-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--motion-base) var(--ease-out);
}

.cp__level-card:hover .cp__level-icon {
  transform: scale(1.06) rotate(-4deg);
}

.cp__level-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cp__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.cp__level-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.cp__level-count {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--level-color);
  background: color-mix(in srgb, var(--level-color) 12%, transparent);
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.cp__level-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

.cp__level-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.cp__level-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 9px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
}

.cp__level-tag--warn {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
}

.cp__level-cta {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--level-color);
}

@media (max-width: 720px) {
  .cp__levels-grid {
    grid-template-columns: 1fr;
  }
}

/* ─── Game header: difficulty badge + change button ─── */
.cp__progress-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-soft);
}

.cp__level-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid;
}

.cp__change-difficulty {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid transparent;
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color var(--motion-fast), color var(--motion-fast),
    background var(--motion-fast);
}

.cp__change-difficulty:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

/* ─── Exercise tags (category + difficulty badge inside card) ─── */
.cp__exercise-tags {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.cp__exercise-difficulty {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  border: 1px solid;
}

.cp__exercise-difficulty-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
}

/* ─── Feedback banner (success / error / incomplete) ─── */
.cp__feedback {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  font-family: var(--font-nav);
  color: #fff;
  box-shadow: var(--shadow-sm);
  border: 1px solid transparent;
}

.cp__feedback-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.18);
}

.cp__feedback-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.3;
}

.cp__feedback-text strong {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.cp__feedback-text span {
  font-size: 13px;
  font-weight: 500;
  opacity: 0.95;
}

/* Verde forte para acerto */
.cp__feedback--ok {
  background: linear-gradient(135deg, #15803d 0%, #22c55e 100%);
  border-color: #16a34a;
  box-shadow: 0 8px 20px -6px rgba(34, 197, 94, 0.45);
}

/* Vermelho forte para erro */
.cp__feedback--err {
  background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
  border-color: #dc2626;
  box-shadow: 0 8px 20px -6px rgba(239, 68, 68, 0.5);
  animation: cp-shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}

@keyframes cp-shake {
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
}

.cp__feedback--warn {
  background: linear-gradient(135deg, #b45309 0%, #f59e0b 100%);
  border-color: #d97706;
  color: #fff;
}

/* Fade + slide transition */
.cp-fb-enter-active,
.cp-fb-leave-active {
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}
.cp-fb-enter-from,
.cp-fb-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

/* ─── Actions ─── */
.cp__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.cp__actions--floating {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 16px;
  box-shadow: var(--shadow-sm);
  position: sticky;
  bottom: 16px;
  z-index: 5;
}

.cp__actions .btn {
  flex: 1;
  min-width: 160px;
  justify-content: center;
}

.cp__actions .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cp__actions .btn-primary:disabled {
  background: var(--text-faint);
  color: #fff;
  box-shadow: none;
  transform: none;
}

/* ─── Pool ─── */
.cp__pool-section {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-xs);
}

.cp__pool-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
}

.cp__pool-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.cp__pool {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 70px;
  padding: 18px;
  border-radius: var(--radius-lg);
  background: var(--surface-sunken);
  border: 2px dashed var(--border-default);
}

.cp__tile {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: 10px;
  background: var(--surface-card);
  color: var(--text-primary);
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border-default);
  cursor: grab;
  user-select: none;
  box-shadow: var(--shadow-xs);
  transition: background var(--motion-fast), transform var(--motion-fast),
    box-shadow var(--motion-fast), border-color var(--motion-fast);
}

.cp__tile:hover {
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.cp__tile:active {
  cursor: grabbing;
  transform: scale(0.97);
}

.cp__tile.is-from-slot {
  background: var(--color-success);
  color: #fff;
  border-color: var(--color-success);
}
.cp__tile.is-from-slot:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.cp__tile.is-selected {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
  animation: cp-tile-pulse 0.9s ease-in-out infinite;
}

@keyframes cp-tile-pulse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

/* ─── Footer ─── */
.cp__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.cp__restart {
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
}
.cp__restart:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 600px) {
  .cp__title {
    font-size: 22px;
  }
  .cp__sentence {
    font-size: 18px;
    line-height: 2;
    padding: 14px 8px;
  }
  .cp__illustration {
    padding: 14px;
    gap: 12px;
  }
  .cp__illustration-icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }
  .cp__illustration-meta strong {
    font-size: 17px;
  }
  .cp__slot {
    min-width: 70px;
    min-height: 36px;
    font-size: 13px;
    padding: 3px 8px;
  }
  .cp__slot-content {
    font-size: 13px;
  }
  .cp__progress-card {
    width: 100%;
  }
  .cp__actions .btn {
    flex-basis: 100%;
  }
}
</style>
