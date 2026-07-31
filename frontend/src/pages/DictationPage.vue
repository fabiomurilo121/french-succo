<script setup>
import { ref, computed, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useToastStore } from '@/stores/toast'
import { getAudioUrl } from '@/services/audioCache'

const settings = useSettingsStore()
const toast = useToastStore()

const audioBank = [
  { fr: 'Bonjour', pt: 'Olá / Bom dia', level: 1 },
  { fr: 'Merci', pt: 'Obrigado', level: 1 },
  { fr: 'Oui', pt: 'Sim', level: 1 },
  { fr: 'Non', pt: 'Não', level: 1 },
  { fr: 'Salut', pt: 'Oi (informal)', level: 1 },
  { fr: 'Au revoir', pt: 'Até logo / Tchau', level: 1 },
  { fr: 'Bonsoir', pt: 'Boa noite', level: 1 },
  { fr: 'Bonne nuit', pt: 'Boa noite (ao dormir)', level: 1 },
  { fr: 'Bonne journée', pt: 'Tenha um bom dia', level: 1 },
  { fr: 'Bienvenue', pt: 'Bem-vindo(a)', level: 1 },
  { fr: 'Pardon', pt: 'Desculpe', level: 1 },
  { fr: 'Coucou', pt: 'Oi (entre íntimos)', level: 1 },
  { fr: 'Adieu', pt: 'Adeus', level: 1 },
  { fr: 'Bisou', pt: 'Beijinho', level: 1 },
  { fr: 'Bravo', pt: 'Bravo / Muito bem', level: 1 },
  { fr: 'Voilà', pt: 'Pronto / Aqui está', level: 1 },
  { fr: 'Ciao', pt: 'Tchau', level: 1 },
  { fr: 'D’accord', pt: 'De acordo / OK', level: 1 },
  { fr: 'Bon week-end', pt: 'Bom fim de semana', level: 1 },
  { fr: 'Bon anniversaire', pt: 'Feliz aniversário', level: 1 },
  { fr: 'Santé', pt: 'Saúde (brinde)', level: 1 },
  { fr: 'Bon appétit', pt: 'Bom apetite', level: 1 },
  { fr: 'Miam', pt: 'Hmm! (delicioso)', level: 1 },
  { fr: 'Bonjour, ça va ?', pt: 'Olá, tudo bem?', level: 2 },
  { fr: 'Ça va bien, merci', pt: 'Tudo bem, obrigado', level: 2 },
  { fr: 'Comment ça va ?', pt: 'Como vai?', level: 2 },
  { fr: 'Enchanté', pt: 'Prazer em conhecê-lo', level: 2 },
  { fr: "S'il vous plaît", pt: 'Por favor (formal)', level: 2 },
  { fr: "S'il te plaît", pt: 'Por favor (informal)', level: 2 },
  { fr: 'De rien', pt: 'De nada', level: 2 },
  { fr: 'Je m’appelle', pt: 'Eu me chamo', level: 2 },
  { fr: 'À bientôt', pt: 'Até logo', level: 2 },
  { fr: 'À demain', pt: 'Até amanhã', level: 2 },
  { fr: 'Bonne soirée', pt: 'Boa noite (despedida)', level: 2 },
  { fr: 'Bonne chance', pt: 'Boa sorte', level: 2 },
  { fr: 'Bon voyage', pt: 'Boa viagem', level: 2 },
  { fr: 'Bon courage', pt: 'Coragem!', level: 2 },
  { fr: 'Bonne route', pt: 'Boa estrada', level: 2 },
  { fr: 'Avec plaisir', pt: 'Com prazer', level: 2 },
  { fr: 'Madame, Monsieur', pt: 'Senhora, Senhor', level: 2 },
  { fr: 'Très bien, merci', pt: 'Muito bem, obrigado', level: 2 },
  { fr: 'Oui, bien sûr', pt: 'Sim, claro', level: 2 },
  { fr: 'Pas du tout', pt: 'De jeito nenhum', level: 2 },
  { fr: 'Je comprends', pt: 'Eu entendo', level: 2 },
  { fr: 'Je ne sais pas', pt: 'Eu não sei', level: 2 },
  { fr: 'J’ai faim', pt: 'Estou com fome', level: 2 },
  { fr: 'J’ai soif', pt: 'Estou com sede', level: 2 },
  { fr: 'Il fait beau', pt: 'Está fazendo sol', level: 2 },
  { fr: 'Il pleut', pt: 'Está chovendo', level: 2 },
  { fr: 'Il fait froid', pt: 'Está fazendo frio', level: 2 },
  { fr: 'Il fait chaud', pt: 'Está fazendo calor', level: 2 },
  { fr: 'Tout droit', pt: 'Sempre em frente', level: 2 },
  { fr: 'À gauche', pt: 'À esquerda', level: 2 },
  { fr: 'À droite', pt: 'À direita', level: 2 },
  { fr: 'Mon ami', pt: 'Meu amigo', level: 2 },
  { fr: 'Ma famille', pt: 'Minha família', level: 2 },
  { fr: 'Comment allez-vous ?', pt: 'Como vai você? (formal)', level: 3 },
  { fr: 'Comment tu t’appelles ?', pt: 'Como você se chama? (informal)', level: 3 },
  { fr: 'Comment vous appelez-vous ?', pt: 'Como você se chama? (formal)', level: 3 },
  { fr: 'Enchanté de faire votre connaissance', pt: 'Prazer em conhecê-lo', level: 3 },
  { fr: 'Je voudrais un café, s’il vous plaît', pt: 'Eu queria um café, por favor', level: 3 },
  { fr: 'Où sont les toilettes ?', pt: 'Onde ficam os banheiros?', level: 3 },
  { fr: 'C’est combien ?', pt: 'Quanto é?', level: 3 },
  { fr: 'Je ne comprends pas', pt: 'Eu não entendo', level: 3 },
  { fr: "L'addition, s'il vous plaît", pt: 'A conta, por favor', level: 3 },
  { fr: 'Pouvez-vous m’aider ?', pt: 'Você pode me ajudar?', level: 3 },
  { fr: 'Pouvez-vous répéter ?', pt: 'Você pode repetir?', level: 3 },
  { fr: 'Je suis perdu', pt: 'Estou perdido', level: 3 },
  { fr: 'Aidez-moi !', pt: 'Me ajude!', level: 3 },
  { fr: 'Au secours !', pt: 'Socorro!', level: 3 },
  { fr: 'Appelez la police !', pt: 'Chamem a polícia!', level: 3 },
  { fr: "Qu'est-ce que c'est ?", pt: 'O que é isso?', level: 3 },
  { fr: 'Quel est le prix ?', pt: 'Qual é o preço?', level: 3 },
  { fr: 'C’est trop cher', pt: 'Está caro demais', level: 3 },
  { fr: 'Je peux essayer ?', pt: 'Posso experimentar?', level: 3 },
  { fr: 'Je paie par carte', pt: 'Eu pago com cartão', level: 3 },
  { fr: 'Vous acceptez la carte ?', pt: 'Vocês aceitam cartão?', level: 3 },
  { fr: 'La carte, s’il vous plaît', pt: 'O cardápio, por favor', level: 3 },
  { fr: 'C’est délicieux', pt: 'Está delicioso', level: 3 },
  { fr: 'Une carafe d’eau, s’il vous plaît', pt: 'Uma jarra d’água, por favor', level: 3 },
  { fr: 'Quel temps fait-il ?', pt: 'Como está o tempo?', level: 3 },
  { fr: 'Il neige', pt: 'Está nevando', level: 3 },
  { fr: 'Je suis fatigué', pt: 'Estou cansado', level: 3 },
  { fr: 'J’ai mal à la tête', pt: 'Estou com dor de cabeça', level: 3 },
  { fr: 'Je me sens mal', pt: 'Estou me sentindo mal', level: 3 },
  { fr: 'Où est la gare ?', pt: 'Onde fica a estação?', level: 3 },
  { fr: 'Où est l’aéroport ?', pt: 'Onde fica o aeroporto?', level: 3 },
  { fr: 'Comment aller à Paris ?', pt: 'Como chegar a Paris?', level: 3 },
  { fr: 'C’est loin ?', pt: 'É longe?', level: 3 },
  { fr: 'Je cherche un hôtel', pt: 'Estou procurando um hotel', level: 3 },
  { fr: 'Bonne année', pt: 'Feliz Ano Novo', level: 3 },
  { fr: 'Joyeux Noël', pt: 'Feliz Natal', level: 3 },
  { fr: 'J’étudie le français', pt: 'Eu estudo francês', level: 3 },
  { fr: 'Je viens du Brésil', pt: 'Eu venho do Brasil', level: 3 },
  { fr: 'Je suis étudiant', pt: 'Eu sou estudante', level: 3 },
  { fr: 'Je parle un peu français', pt: 'Eu falo um pouco de francês', level: 3 },
  { fr: 'Très bien, et toi ?', pt: 'Muito bem, e você?', level: 3 },
  { fr: 'Parlez plus lentement, s’il vous plaît', pt: 'Fale mais devagar, por favor', level: 3 },
  { fr: 'Comment dit-on en portugais ?', pt: 'Como se diz em português?', level: 3 },
  { fr: 'Que veut dire ce mot ?', pt: 'O que quer dizer essa palavra?', level: 3 },
  { fr: 'C’est très intéressant', pt: 'É muito interessante', level: 3 },
  { fr: 'Je ne suis pas d’accord', pt: 'Eu não concordo', level: 3 },
  { fr: 'Vous avez raison', pt: 'Você tem razão', level: 3 },
  { fr: 'Je voudrais réserver une table pour deux', pt: 'Eu gostaria de reservar uma mesa para dois', level: 3 },
  { fr: 'Je voudrais devenir bilingue', pt: 'Eu gostaria de me tornar bilíngue', level: 3 },
  { fr: 'J’adore la cuisine française', pt: 'Eu adoro a culinária francesa', level: 3 },
  { fr: 'À quelle heure est le check-out ?', pt: 'A que horas é o check-out?', level: 3 },
  { fr: 'Un billet aller-retour, s’il vous plaît', pt: 'Uma passagem de ida e volta, por favor', level: 3 },
  { fr: 'Pouvez-vous m’emmener à l’aéroport ?', pt: 'Você pode me levar ao aeroporto?', level: 3 },
  { fr: 'Avez-vous une chambre libre ?', pt: 'Vocês têm um quarto disponível?', level: 3 },
  { fr: 'Le petit-déjeuner est inclus ?', pt: 'O café da manhã está incluído?', level: 3 },
  { fr: 'Quel est le plat du jour ?', pt: 'Qual é o prato do dia?', level: 3 },
  { fr: 'Je suis allergique aux noix', pt: 'Eu sou alérgico a nozes', level: 3 },
  { fr: 'Je suis végétarien', pt: 'Eu sou vegetariano', level: 3 },
  { fr: 'Je voudrais prendre rendez-vous', pt: 'Eu gostaria de marcar uma consulta', level: 3 },
  { fr: 'Quel est le numéro d’urgence ?', pt: 'Qual é o número de emergência?', level: 3 },
  { fr: 'J’apprends le français depuis six mois', pt: 'Eu estudo francês há seis meses', level: 3 }
]

const levelInfo = {
  1: { id: 1, name: 'Fácil', icon: 'sparkles', color: '#22c55e', description: 'Palavras curtas e cumprimentos básicos' },
  2: { id: 2, name: 'Médio', icon: 'flask', color: '#3b82f6', description: 'Frases do dia a dia e expressões úteis' },
  3: { id: 3, name: 'Difícil', icon: 'gauge', color: '#f97315', description: 'Frases completas e vocabulário avançado' }
}

const MAX_PLAYS = 5
const ROUND_SIZE = 10

const selectedLevel = ref(null)
const currentItem = ref(null)
const options = ref([])
const correctCount = ref(0)
const totalCount = ref(0)
const playCount = ref(0)
const selectedOption = ref(null)
const showResult = ref(false)
const isPlaying = ref(false)
const lastSpeed = ref('normal')
const audioEl = ref(null)
const roundIndex = ref(0)
const wrongAnswers = ref([])
const gamePhase = ref('playing')

const accuracy = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((correctCount.value / totalCount.value) * 100)
})

const playCountLabel = computed(() => `${playCount.value} / ${MAX_PLAYS}`)
const playsLeft = computed(() => MAX_PLAYS - playCount.value)
const canPlay = computed(() => !showResult.value && playsLeft.value > 0 && !isPlaying.value)
const isLastQuestion = computed(() => roundIndex.value >= ROUND_SIZE - 1)
const isRoundFinished = computed(() => gamePhase.value === 'finished')

const levelItemsCount = (level) => audioBank.filter((i) => i.level === level).length

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickDistractors(correct, pool) {
  const others = pool.filter((i) => i.fr !== correct.fr)
  return shuffleArray(others).slice(0, 3)
}

function startGame(level) {
  selectedLevel.value = level
  correctCount.value = 0
  totalCount.value = 0
  roundIndex.value = 0
  wrongAnswers.value = []
  gamePhase.value = 'playing'
  nextQuestion()
}

function resetRoundState() {
  selectedOption.value = null
  showResult.value = false
  playCount.value = 0
  isPlaying.value = false
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
}

function nextQuestion() {
  if (roundIndex.value >= ROUND_SIZE) {
    gamePhase.value = 'finished'
    return
  }
  const pool = audioBank.filter((i) => i.level === selectedLevel.value)
  if (pool.length < 4) {
    toast.error('Não há itens suficientes nesse nível.')
    return
  }
  const correct = pool[Math.floor(Math.random() * pool.length)]
  const distractors = pickDistractors(correct, pool)
  currentItem.value = correct
  options.value = shuffleArray([correct, ...distractors])
  resetRoundState()
  setTimeout(() => playCurrent('normal'), 280)
}

function playCurrent(speed = 'normal') {
  if (!currentItem.value || !audioEl.value) return
  if (showResult.value) return
  if (playCount.value >= MAX_PLAYS) {
    toast.warning(`Limite de ${MAX_PLAYS} reproduções atingido. Escolha uma opção.`)
    return
  }
  if (isPlaying.value) {
    audioEl.value.pause()
    isPlaying.value = false
    return
  }
  playCount.value++
  lastSpeed.value = speed
  isPlaying.value = true
  try {
    const opts = {
      voice: settings.voice === 'male' ? 'male' : 'female',
      region: settings.region || 'fr',
      speed: speed === 'slow' ? 0.7 : 1.0
    }
    const { url } = getAudioUrl(currentItem.value.fr, opts)
    audioEl.value.src = url
    audioEl.value.load()
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => { isPlaying.value = false })
    }
  } catch (e) {
    isPlaying.value = false
  }
}

function selectOption(opt) {
  if (showResult.value || !currentItem.value) return
  selectedOption.value = opt
  showResult.value = true
  totalCount.value++
  if (opt.fr === currentItem.value.fr) {
    correctCount.value++
  } else {
    wrongAnswers.value.push({
      fr: currentItem.value.fr,
      correctPt: currentItem.value.pt,
      userPt: opt.pt
    })
  }
  if (audioEl.value) {
    audioEl.value.pause()
    isPlaying.value = false
  }
}

function next() {
  if (!showResult.value) return
  roundIndex.value++
  nextQuestion()
}

function replayResultItem(item) {
  if (!audioEl.value) return
  try {
    const opts = {
      voice: settings.voice === 'male' ? 'male' : 'female',
      region: settings.region || 'fr',
      speed: 1.0
    }
    const { url } = getAudioUrl(item.fr, opts)
    audioEl.value.src = url
    audioEl.value.load()
    audioEl.value.play()?.catch(() => {})
  } catch (e) { /* ignore */ }
}

function startNewRound() {
  if (selectedLevel.value === null) return
  correctCount.value = 0
  totalCount.value = 0
  roundIndex.value = 0
  wrongAnswers.value = []
  gamePhase.value = 'playing'
  nextQuestion()
}

function changeLevel() {
  selectedLevel.value = null
  currentItem.value = null
  options.value = []
  selectedOption.value = null
  showResult.value = false
  correctCount.value = 0
  totalCount.value = 0
  playCount.value = 0
  isPlaying.value = false
  roundIndex.value = 0
  wrongAnswers.value = []
  gamePhase.value = 'playing'
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
}

function resetGame() {
  if (selectedLevel.value !== null) {
    nextQuestion()
  }
}

function onAudioEnded() {
  isPlaying.value = false
}

function onAudioPause() {
  setTimeout(() => {
    if (audioEl.value && audioEl.value.paused && !isPlaying.value) {
      // pause state confirmed
    } else if (audioEl.value && audioEl.value.ended) {
      isPlaying.value = false
    }
  }, 50)
}

function onAudioError() {
  isPlaying.value = false
  toast.error('Não foi possível carregar o áudio.')
}

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.src = ''
  }
})
</script>

<template>
  <div class="dc">
    <!-- Cabeçalho -->
    <header class="dc__head">
      <div class="dc__title-block">
        <span class="dc__eyebrow">OUVIDO FRANCÊS</span>
        <h1 class="dc__title">Adivinhar Áudio</h1>
        <p class="dc__sub">
          Ouça o áudio em francês e descubra o que ele significa. Você tem até 5 reproduções
          em velocidade normal ou lenta — e 4 opções para escolher.
        </p>
      </div>

      <div v-if="selectedLevel !== null" class="dc__score">
        <div class="dc__score-row">
          <div class="dc__score-pill">
            <AppIcon name="trophy" :size="14" />
            <span><strong>{{ correctCount }}</strong> / {{ totalCount }}</span>
          </div>
          <div class="dc__score-pill">
            <AppIcon name="chartBar" :size="14" />
            <span><strong>{{ accuracy }}%</strong> acerto</span>
          </div>
        </div>
        <div class="dc__score-meta">
          <span
            class="dc__level-badge"
            :style="{
              background: levelInfo[selectedLevel].color + '22',
              color: levelInfo[selectedLevel].color,
              borderColor: levelInfo[selectedLevel].color + '55'
            }"
          >
            <AppIcon :name="levelInfo[selectedLevel].icon" :size="12" />
            {{ levelInfo[selectedLevel].name }}
          </span>
        </div>
        <button class="dc__change-level" type="button" @click="changeLevel">
          <AppIcon name="refresh" :size="13" />
          Trocar nível
        </button>
      </div>
    </header>

    <!-- Seleção de nível -->
    <section v-if="selectedLevel === null" class="dc__levels">
      <div
        v-for="level in [1, 2, 3]"
        :key="level"
        class="dc__level-card card"
        :style="{ '--level-color': levelInfo[level].color }"
        @click="startGame(level)"
      >
        <div class="dc__level-icon">
          <AppIcon :name="levelInfo[level].icon" :size="28" />
        </div>
        <div class="dc__level-body">
          <div class="dc__level-head">
            <h2 class="dc__level-name">{{ levelInfo[level].name }}</h2>
            <span class="dc__level-count">
              {{ levelItemsCount(level) }} {{ levelItemsCount(level) === 1 ? 'item' : 'itens' }}
            </span>
          </div>
          <p class="dc__level-desc">{{ levelInfo[level].description }}</p>
          <div class="dc__level-cta">
            <AppIcon name="play" :size="14" />
            <span>Começar</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Jogo -->
    <section v-else-if="gamePhase === 'playing'" class="dc__game">
      <div class="dc__round-progress" :aria-label="`Pergunta ${roundIndex + 1} de ${ROUND_SIZE}`">
        <div class="dc__round-progress-meta">
          <span class="dc__round-progress-label">RODADA</span>
          <span class="dc__round-progress-count">
            <strong>{{ roundIndex + 1 }}</strong> / {{ ROUND_SIZE }}
          </span>
        </div>
        <div class="dc__round-progress-bar">
          <div
            class="dc__round-progress-fill"
            :style="{
              width: ((roundIndex + (showResult ? 1 : 0)) / ROUND_SIZE) * 100 + '%',
              background: levelInfo[selectedLevel].color
            }"
          ></div>
        </div>
      </div>

      <article class="dc__play card">
        <div class="dc__play-head">
          <span class="dc__play-label">ÁUDIO</span>
          <span class="dc__play-counter">
            <AppIcon name="volume" :size="12" />
            {{ playCountLabel }} reproduções
          </span>
        </div>

        <button
          class="dc__big-play"
          :class="{
            'is-playing': isPlaying,
            'is-disabled': !currentItem || playsLeft <= 0
          }"
          type="button"
          :disabled="!currentItem"
          :aria-label="isPlaying ? 'Pausar áudio' : 'Tocar áudio'"
          @click="playCurrent(lastSpeed)"
        >
          <span class="dc__big-play-wave" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </span>
          <span class="dc__big-play-core">
            <AppIcon :name="isPlaying ? 'pause' : 'play'" :size="34" />
          </span>
        </button>

        <div class="dc__speed">
          <span class="dc__speed-label">Velocidade:</span>
          <div class="dc__speed-group">
            <button
              type="button"
              class="dc__speed-btn"
              :class="{ 'is-active': lastSpeed === 'normal' }"
              :disabled="!canPlay"
              @click="playCurrent('normal')"
            >
              <AppIcon name="speaker" :size="14" />
              Normal
            </button>
            <button
              type="button"
              class="dc__speed-btn"
              :class="{ 'is-active': lastSpeed === 'slow' }"
              :disabled="!canPlay"
              @click="playCurrent('slow')"
            >
              <AppIcon name="clock" :size="14" />
              Lento
            </button>
          </div>
        </div>

        <p v-if="playsLeft === 0 && !showResult" class="dc__play-hint">
          <AppIcon name="info" :size="13" />
          Sem reproduções disponíveis — escolha uma das opções abaixo.
        </p>
        <p v-else class="dc__play-hint dc__play-hint--muted">
          <AppIcon name="info" :size="13" />
          Toque no botão grande para ouvir. Troque entre <strong>Normal</strong> e <strong>Lento</strong>.
        </p>
      </article>

      <article class="dc__options card">
        <header class="dc__options-head">
          <span class="dc__options-label">QUAL É O SIGNIFICADO?</span>
          <span class="dc__options-hint">Escolha 1 de 4 opções</span>
        </header>

        <div class="dc__options-grid">
          <button
            v-for="(opt, idx) in options"
            :key="opt.fr"
            type="button"
            class="dc__opt"
            :class="{
              'is-correct': showResult && opt.fr === currentItem?.fr,
              'is-wrong':
                showResult &&
                selectedOption?.fr === opt.fr &&
                opt.fr !== currentItem?.fr,
              'is-pending': showResult && opt.fr !== currentItem?.fr && selectedOption?.fr !== opt.fr,
              'is-selected': selectedOption?.fr === opt.fr && !showResult
            }"
            :disabled="showResult || !currentItem"
            @click="selectOption(opt)"
          >
            <span class="dc__opt-letter">{{ String.fromCharCode(65 + idx) }}</span>
            <span class="dc__opt-text">{{ opt.pt }}</span>
            <span v-if="showResult && opt.fr === currentItem?.fr" class="dc__opt-badge dc__opt-badge--ok">
              <AppIcon name="check" :size="14" />
            </span>
            <span
              v-else-if="showResult && selectedOption?.fr === opt.fr && opt.fr !== currentItem?.fr"
              class="dc__opt-badge dc__opt-badge--err"
            >
              <AppIcon name="cross" :size="14" />
            </span>
          </button>
        </div>

        <Transition name="dc-fb">
          <div v-if="showResult" class="dc__feedback">
            <div
              class="dc__feedback-icon"
              :class="{
                'dc__feedback-icon--ok': selectedOption?.fr === currentItem?.fr,
                'dc__feedback-icon--err': selectedOption?.fr !== currentItem?.fr
              }"
            >
              <AppIcon
                :name="selectedOption?.fr === currentItem?.fr ? 'check' : 'cross'"
                :size="22"
              />
            </div>
            <div class="dc__feedback-body">
              <strong>
                {{
                  selectedOption?.fr === currentItem?.fr
                    ? 'Excelente ouvido!'
                    : 'Quase! A resposta certa é:'
                }}
              </strong>
              <div class="dc__feedback-fr">
                <span class="dc__feedback-fr-text">{{ currentItem?.fr }}</span>
                <button
                  class="dc__replay"
                  type="button"
                  @click="replayCorrect"
                  aria-label="Ouvir a resposta"
                  title="Ouvir a resposta"
                >
                  <AppIcon name="speaker" :size="14" />
                </button>
              </div>
              <p class="dc__feedback-pt">{{ currentItem?.pt }}</p>
            </div>
            <button class="btn btn-primary dc__next" type="button" @click="next">
              <AppIcon :name="isLastQuestion ? 'trophy' : 'arrow'" :size="16" />
              {{ isLastQuestion ? 'Ver resultado' : 'Próxima' }}
            </button>
          </div>
        </Transition>
      </article>
    </section>

    <!-- Tela de Resultados -->
    <section v-else class="dc__results">
      <article
        class="dc__results-hero card"
        :style="{
          '--level-color': levelInfo[selectedLevel].color
        }"
      >
        <div
          class="dc__results-trophy"
          :class="{
            'dc__results-trophy--gold': accuracy >= 80,
            'dc__results-trophy--silver': accuracy >= 50 && accuracy < 80,
            'dc__results-trophy--bronze': accuracy < 50
          }"
        >
          <AppIcon name="trophy" :size="56" />
        </div>

        <h2 class="dc__results-title">
          {{
            accuracy === 100
              ? 'Perfeito! Ouvido afiado!'
              : accuracy >= 80
                ? 'Mandou muito bem!'
                : accuracy >= 50
                  ? 'Bom trabalho, continue treinando!'
                  : 'Continue praticando, você vai melhorar!'
          }}
        </h2>

        <div class="dc__results-score">
          <div class="dc__results-score-main">
            <strong>{{ correctCount }}</strong>
            <span>/ {{ totalCount }}</span>
          </div>
          <div class="dc__results-score-meta">
            <span class="dc__results-percent">{{ accuracy }}%</span>
            <span class="dc__results-level">
              <AppIcon :name="levelInfo[selectedLevel].icon" :size="12" />
              Nível {{ levelInfo[selectedLevel].name }}
            </span>
          </div>
        </div>

        <div class="dc__results-stats">
          <div class="dc__results-stat dc__results-stat--ok">
            <AppIcon name="check" :size="18" />
            <div>
              <strong>{{ correctCount }}</strong>
              <span>acertos</span>
            </div>
          </div>
          <div class="dc__results-stat dc__results-stat--err">
            <AppIcon name="cross" :size="18" />
            <div>
              <strong>{{ wrongAnswers.length }}</strong>
              <span>erros</span>
            </div>
          </div>
        </div>

        <div class="dc__results-actions">
          <button class="btn btn-primary btn--lg" type="button" @click="startNewRound">
            <AppIcon name="refresh" :size="16" />
            Jogar de novo
          </button>
          <button class="btn btn-secondary btn--lg" type="button" @click="changeLevel">
            <AppIcon name="layers" :size="16" />
            Trocar nível
          </button>
        </div>
      </article>

      <article v-if="wrongAnswers.length" class="dc__wrong card">
        <header class="dc__wrong-head">
          <span class="dc__wrong-eyebrow">
            <AppIcon name="cross" :size="12" />
            REVISAR ERROS
          </span>
          <h3 class="dc__wrong-title">
            {{ wrongAnswers.length }} {{ wrongAnswers.length === 1 ? 'resposta errada' : 'respostas erradas' }}
          </h3>
          <p class="dc__wrong-sub">
            Ouça a pronúncia correta e compare com a sua resposta para fixar melhor.
          </p>
        </header>

        <ul class="dc__wrong-list">
          <li
            v-for="(item, idx) in wrongAnswers"
            :key="idx"
            class="dc__wrong-item"
          >
            <div class="dc__wrong-num">{{ idx + 1 }}</div>
            <div class="dc__wrong-body">
              <div class="dc__wrong-fr">
                <span class="dc__wrong-fr-text">{{ item.fr }}</span>
                <button
                  class="dc__wrong-replay"
                  type="button"
                  @click="replayResultItem(item)"
                  aria-label="Ouvir a pronúncia"
                  title="Ouvir a pronúncia"
                >
                  <AppIcon name="speaker" :size="14" />
                </button>
              </div>
              <div class="dc__wrong-rows">
                <div class="dc__wrong-row dc__wrong-row--err">
                  <span class="dc__wrong-row-label">Você:</span>
                  <span class="dc__wrong-row-text">{{ item.userPt }}</span>
                </div>
                <div class="dc__wrong-row dc__wrong-row--ok">
                  <span class="dc__wrong-row-label">Correto:</span>
                  <span class="dc__wrong-row-text">{{ item.correctPt }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </article>

      <article v-else class="dc__wrong dc__wrong--empty card">
        <AppIcon name="sparkles" :size="32" />
        <h3>Você acertou todas!</h3>
        <p>Impressionante — nenhuma resposta errada para revisar.</p>
      </article>
    </section>

    <audio
      ref="audioEl"
      hidden
      @ended="onAudioEnded"
      @pause="onAudioPause"
      @error="onAudioError"
    ></audio>
  </div>
</template>

<style scoped>
.dc {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  max-width: 880px;
  margin: 0 auto;
  width: 100%;
}

/* ─── Cabeçalho ─── */
.dc__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.dc__title-block {
  flex: 1;
  min-width: 240px;
}

.dc__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.dc__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.dc__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 560px;
}

.dc__score {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.dc__score-row {
  display: flex;
  gap: 8px;
}

.dc__score-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  color: var(--text-secondary);
  box-shadow: var(--shadow-xs);
}

.dc__score-pill strong {
  color: var(--text-primary);
  font-weight: 700;
}

.dc__score-pill :deep(svg) {
  color: var(--color-primary);
}

.dc__level-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1px solid;
}

.dc__change-level {
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: 8px;
  transition: color var(--motion-fast), background var(--motion-fast);
}

.dc__change-level:hover {
  color: var(--color-primary);
  background: var(--color-primary-softer);
}

/* ─── Cartões de nível ─── */
.dc__levels {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 720px) {
  .dc__levels {
    grid-template-columns: repeat(3, 1fr);
  }
}

.dc__level-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  cursor: pointer;
  transition: transform var(--motion-fast), box-shadow var(--motion-fast),
    border-color var(--motion-fast);
  text-align: left;
  --level-color: var(--color-primary);
}

.dc__level-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--level-color);
}

.dc__level-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid color-mix(in srgb, var(--level-color) 30%, transparent);
}

.dc__level-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.dc__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.dc__level-name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.dc__level-count {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--surface-sunken);
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.dc__level-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

.dc__level-cta {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--level-color);
}

/* ─── Jogo ─── */
.dc__game {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* Player */
.dc__play {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.dc__play::before {
  content: '';
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, var(--color-primary-softer) 0%, transparent 65%);
  pointer-events: none;
}

.dc__play-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
}

.dc__play-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}

.dc__play-counter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--surface-sunken);
  padding: 4px 10px;
  border-radius: 999px;
}

.dc__play-counter :deep(svg) {
  color: var(--color-primary);
}

.dc__big-play {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #6366f1);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 1;
  box-shadow: 0 14px 32px rgba(59, 130, 246, 0.32);
  transition: transform var(--motion-fast), box-shadow var(--motion-fast);
}

.dc__big-play:hover:not(.is-disabled):not(.is-playing) {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 18px 38px rgba(59, 130, 246, 0.4);
}

.dc__big-play.is-playing {
  background: linear-gradient(135deg, #2563eb, #4338ca);
  animation: dc-pulse 1.6s ease-in-out infinite;
}

.dc__big-play.is-disabled {
  background: var(--surface-sunken);
  color: var(--text-faint);
  box-shadow: none;
  cursor: not-allowed;
}

.dc__big-play-core {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(2px);
}

.dc__big-play-wave {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--motion-fast);
}

.dc__big-play.is-playing .dc__big-play-wave {
  opacity: 1;
}

.dc__big-play-wave span {
  width: 4px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 4px;
  animation: dc-wave 1s ease-in-out infinite;
}

.dc__big-play-wave span:nth-child(1) { height: 18px; animation-delay: 0s; }
.dc__big-play-wave span:nth-child(2) { height: 30px; animation-delay: 0.12s; }
.dc__big-play-wave span:nth-child(3) { height: 22px; animation-delay: 0.24s; }
.dc__big-play-wave span:nth-child(4) { height: 34px; animation-delay: 0.36s; }
.dc__big-play-wave span:nth-child(5) { height: 18px; animation-delay: 0.48s; }

@keyframes dc-wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.4); }
}

@keyframes dc-pulse {
  0%, 100% { box-shadow: 0 14px 32px rgba(59, 130, 246, 0.32), 0 0 0 0 rgba(59, 130, 246, 0.4); }
  50% { box-shadow: 0 14px 32px rgba(59, 130, 246, 0.32), 0 0 0 14px rgba(59, 130, 246, 0); }
}

.dc__speed {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.dc__speed-label {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.dc__speed-group {
  display: inline-flex;
  padding: 3px;
  background: var(--surface-sunken);
  border-radius: 999px;
  border: 1px solid var(--border-soft);
}

.dc__speed-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.dc__speed-btn:hover:not(:disabled) {
  color: var(--color-primary);
}

.dc__speed-btn.is-active {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

.dc__speed-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dc__play-hint {
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-accent);
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  position: relative;
  z-index: 1;
}

.dc__play-hint--muted {
  color: var(--text-muted);
  background: var(--surface-sunken);
  border-color: var(--border-soft);
}

.dc__play-hint strong {
  color: var(--color-primary);
  font-weight: 700;
}

/* Opções */
.dc__options {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dc__options-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}

.dc__options-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
}

.dc__options-hint {
  font-family: var(--font-nav);
  font-size: 12px;
  color: var(--text-muted);
}

.dc__options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

@media (min-width: 640px) {
  .dc__options-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.dc__opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
  border: 1.5px solid var(--border-soft);
  text-align: left;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  position: relative;
  transition: background var(--motion-fast), border-color var(--motion-fast),
    transform var(--motion-fast);
}

.dc__opt:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
  transform: translateY(-1px);
}

.dc__opt:disabled {
  cursor: default;
}

.dc__opt.is-selected {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
}

.dc__opt.is-correct {
  border-color: var(--color-success);
  background: var(--color-success-soft);
  color: var(--text-primary);
}

.dc__opt.is-wrong {
  border-color: var(--color-accent);
  background: var(--color-tip-bg);
  color: var(--text-primary);
}

.dc__opt.is-pending {
  opacity: 0.55;
}

.dc__opt-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  flex-shrink: 0;
}

.dc__opt.is-correct .dc__opt-letter,
.dc__opt.is-selected .dc__opt-letter {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.dc__opt.is-correct .dc__opt-letter {
  background: var(--color-success);
  border-color: var(--color-success);
  color: #fff;
}

.dc__opt-text {
  flex: 1;
  line-height: 1.4;
}

.dc__opt-badge {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dc__opt-badge--ok {
  background: var(--color-success);
  color: #fff;
}

.dc__opt-badge--err {
  background: var(--color-accent);
  color: #fff;
}

/* Feedback */
.dc__feedback {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  flex-wrap: wrap;
}

.dc__feedback-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dc__feedback-icon--ok {
  background: var(--color-success);
  color: #fff;
}

.dc__feedback-icon--err {
  background: var(--color-accent);
  color: #fff;
}

.dc__feedback-body {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dc__feedback-body strong {
  font-family: var(--font-nav);
  font-size: 14px;
  color: var(--text-primary);
}

.dc__feedback-fr {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary-deep);
  font-style: italic;
}

.dc__replay {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.dc__replay:hover {
  background: var(--color-primary);
  color: #fff;
}

.dc__feedback-pt {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
}

.dc__next {
  flex-shrink: 0;
}

/* Transição do feedback */
.dc-fb-enter-active,
.dc-fb-leave-active {
  transition: opacity var(--motion-base) var(--ease-out, ease),
    transform var(--motion-base) var(--ease-out, ease);
}
.dc-fb-enter-from,
.dc-fb-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 540px) {
  .dc__play {
    padding: 22px 16px;
  }

  .dc__big-play {
    width: 120px;
    height: 120px;
  }

  .dc__big-play-core {
    width: 80px;
    height: 80px;
  }

  .dc__score {
    align-items: flex-start;
  }
}

/* ─── Barra de progresso da rodada ─── */
.dc__round-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
}

.dc__round-progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.dc__round-progress-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-muted);
}

.dc__round-progress-count {
  font-family: var(--font-nav);
  font-size: 13px;
  color: var(--text-secondary);
}

.dc__round-progress-count strong {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 15px;
}

.dc__round-progress-bar {
  height: 6px;
  background: var(--surface-sunken);
  border-radius: 999px;
  overflow: hidden;
}

.dc__round-progress-fill {
  height: 100%;
  border-radius: 999px;
  transition: width var(--motion-base) var(--ease-out, ease);
  background: var(--color-primary);
}

/* ─── Tela de resultados ─── */
.dc__results {
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: dc-fade-up 0.32s var(--ease-out, ease);
}

@keyframes dc-fade-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.dc__results-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 32px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  --level-color: var(--color-primary);
}

.dc__results-hero::before {
  content: '';
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  height: 360px;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--level-color) 16%, transparent) 0%,
    transparent 60%
  );
  pointer-events: none;
}

.dc__results-trophy {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
  position: relative;
  z-index: 1;
  border: 2px solid color-mix(in srgb, var(--level-color) 30%, transparent);
}

.dc__results-trophy--gold {
  background: linear-gradient(135deg, #fef3c7, #fcd34d);
  color: #b45309;
  border-color: #f59e0b;
  box-shadow: 0 10px 28px rgba(245, 158, 11, 0.32);
}
.dc__results-trophy--silver {
  background: linear-gradient(135deg, #f1f5f9, #cbd5e1);
  color: #475569;
  border-color: #94a3b8;
  box-shadow: 0 8px 22px rgba(100, 116, 139, 0.28);
}
.dc__results-trophy--bronze {
  background: linear-gradient(135deg, #fde6d3, #f8b88b);
  color: #9a3412;
  border-color: #ea580c;
  box-shadow: 0 8px 22px rgba(234, 88, 12, 0.26);
}

.dc__results-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;
}

.dc__results-score {
  display: flex;
  align-items: baseline;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.dc__results-score-main {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-display);
  color: var(--text-primary);
}

.dc__results-score-main strong {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  color: var(--level-color);
}

.dc__results-score-main span {
  font-size: 22px;
  font-weight: 500;
  color: var(--text-muted);
}

.dc__results-score-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.dc__results-percent {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
}

.dc__results-level {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
}

.dc__results-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.dc__results-stat {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
}

.dc__results-stat div {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.dc__results-stat strong {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
}

.dc__results-stat span {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dc__results-stat--ok :deep(svg) {
  color: var(--color-success);
}

.dc__results-stat--err :deep(svg) {
  color: var(--color-accent);
}

.dc__results-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin-top: 4px;
}

/* ─── Lista de erros ─── */
.dc__wrong {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-card);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: var(--shadow-sm);
}

.dc__wrong-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dc__wrong-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-accent);
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
  padding: 4px 10px;
  border-radius: 999px;
}

.dc__wrong-eyebrow :deep(svg) {
  color: var(--color-accent);
}

.dc__wrong-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.dc__wrong-sub {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

.dc__wrong-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dc__wrong-item {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  align-items: flex-start;
}

.dc__wrong-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.dc__wrong-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.dc__wrong-fr {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-style: italic;
}

.dc__wrong-fr-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary-deep);
}

.dc__wrong-replay {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.dc__wrong-replay:hover {
  background: var(--color-primary);
  color: #fff;
}

.dc__wrong-rows {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
}

@media (min-width: 540px) {
  .dc__wrong-rows {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}

.dc__wrong-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.4;
}

.dc__wrong-row--err {
  background: var(--color-tip-bg);
  border: 1px dashed var(--color-tip-border);
  color: var(--color-tip-text);
}

.dc__wrong-row--ok {
  background: var(--color-success-soft);
  border: 1px solid color-mix(in srgb, var(--color-success) 35%, transparent);
  color: var(--color-success-text);
}

.dc__wrong-row-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  flex-shrink: 0;
  padding-top: 1px;
}

.dc__wrong-row-text {
  font-weight: 500;
}

.dc__wrong--empty {
  text-align: center;
  align-items: center;
  padding: 32px 20px;
  gap: 8px;
}

.dc__wrong--empty :deep(svg) {
  color: var(--color-success);
  opacity: 0.85;
}

.dc__wrong--empty h3 {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.dc__wrong--empty p {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 540px) {
  .dc__results-hero {
    padding: 24px 18px;
  }

  .dc__results-trophy {
    width: 80px;
    height: 80px;
  }

  .dc__results-trophy :deep(svg) {
    width: 40px;
    height: 40px;
  }

  .dc__results-title {
    font-size: 20px;
  }

  .dc__results-score-main strong {
    font-size: 40px;
  }

  .dc__results-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
