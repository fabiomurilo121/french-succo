<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useToastStore } from '@/stores/toast'
import { getAudioUrl } from '@/services/audioCache'

const settings = useSettingsStore()
const toast = useToastStore()

/* ── SVG helpers ── */
const wrap = (inner, bg = '#e0e7ef') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet">${bg ? `<rect width="400" height="280" fill="${bg}"/>` : ''}${inner}</svg>`

/* ── Plaques (French street signs) ── */
const PLAQUES = [
  {
    id: 'stop',
    title: 'STOP',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<line x1="0" y1="260" x2="400" y2="260" stroke="#fff" stroke-width="3" stroke-dasharray="20 14"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<polygon points="200,40 290,80 290,180 200,220 110,180 110,80" fill="#dc2626" stroke="#fff" stroke-width="8"/>` +
      `<text x="200" y="148" font-family="Arial Black, sans-serif" font-size="52" font-weight="900" fill="#fff" text-anchor="middle">STOP</text>`
    ),
    correct: 'Parada obrigatória',
    options: ['Parada obrigatória', 'Estacionamento proibido', 'Dê a preferência', 'Via expressa'],
    explanation: 'O octógono vermelho com "STOP" em branco indica parada obrigatória — o motorista deve parar completamente antes de cruzar.',
    tip: 'Único sinal octogonal no trânsito francês — formato único, fácil de reconhecer.'
  },
  {
    id: 'sens-interdit',
    title: 'Sens interdit',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<circle cx="200" cy="130" r="92" fill="#dc2626" stroke="#fff" stroke-width="8"/>` +
      `<rect x="120" y="118" width="160" height="24" fill="#fff"/>`
    ),
    correct: 'Sentido proibido (entrada proibida)',
    options: ['Sentido proibido (entrada proibida)', 'Proibido estacionar', 'Curva perigosa', 'Sentido único'],
    explanation: 'O círculo vermelho com uma barra horizontal branca significa que é proibido entrar nesta via.',
    tip: 'Encontrado na saída de estacionamentos ou ruas de mão única na direção contrária.'
  },
  {
    id: 'stationnement-interdit',
    title: 'Stationnement interdit',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<circle cx="200" cy="130" r="92" fill="#1d4ed8" stroke="#dc2626" stroke-width="8"/>` +
      `<line x1="200" y1="40" x2="200" y2="220" stroke="#dc2626" stroke-width="10"/>` +
      `<line x1="120" y1="130" x2="280" y2="130" stroke="#dc2626" stroke-width="10"/>`
    ),
    correct: 'Estacionamento proibido',
    options: ['Estacionamento proibido', 'Parada obrigatória', 'Sentido único', 'Proibido ultrapassar'],
    explanation: 'Círculo azul com borda vermelha e uma cruz vermelha — significa que é proibido parar e estacionar.',
    tip: 'Diferente do "arrêt interdit" (parada proibida) — esse último tem apenas uma linha diagonal.'
  },
  {
    id: 'cedez-passage',
    title: 'Cédez le passage',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<polygon points="60,90 340,90 340,210 200,250 60,210" fill="#fff" stroke="#dc2626" stroke-width="10"/>` +
      `<polygon points="200,120 280,140 280,170 200,190 120,170 120,140" fill="#dc2626"/>` +
      `<text x="200" y="160" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fff" text-anchor="middle">CEDEZ</text>` +
      `<text x="200" y="178" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">LE PASSAGE</text>`
    ),
    correct: 'Dê a preferência',
    options: ['Dê a preferência', 'Parada obrigatória', 'Sentido proibido', 'Curva acentuada'],
    explanation: 'Triângulo invertido com borda vermelha indica que o motorista deve ceder a preferência aos veículos da via transversal.',
    tip: 'Diferente do STOP — aqui você não precisa parar, apenas ceder a passagem.'
  },
  {
    id: 'passage-pieton',
    title: 'Passage piéton',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#1f2937"/>` +
      `<rect x="0" y="200" width="400" height="40" fill="#374151"/>` +
      `<rect x="20" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="76" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="132" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="188" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="244" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="300" y="205" width="36" height="30" fill="#fff"/>` +
      `<rect x="356" y="205" width="36" height="30" fill="#fff"/>` +
      `<circle cx="200" cy="80" r="55" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<polygon points="200,42 214,72 246,72 220,90 230,122 200,104 170,122 180,90 154,72 186,72" fill="#fff"/>`
    ),
    correct: 'Passagem de pedestres',
    options: ['Passagem de pedestres', 'Cruzamento de ciclistas', 'Faixa de pedestres elevada', 'Ponto de ônibus'],
    explanation: 'Placa azul com triângulo branco simbolizando pedestre — avisa que há faixa de pedestres adiante.',
    tip: 'O motorista deve reduzir a velocidade e dar prioridade aos pedestres que estejam atravessando.'
  },
  {
    id: 'limitation-50',
    title: 'Limitation 50',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<circle cx="200" cy="130" r="92" fill="#fff" stroke="#dc2626" stroke-width="14"/>` +
      `<text x="200" y="155" font-family="Arial Black, sans-serif" font-size="76" font-weight="900" fill="#0f172a" text-anchor="middle">50</text>`
    ),
    correct: 'Velocidade máxima de 50 km/h',
    options: ['Velocidade máxima de 50 km/h', 'Distância mínima de 50 m', 'Estacionamento permitido por 50 min', 'Velocidade mínima de 50 km/h'],
    explanation: 'Círculo branco com borda vermelha e número em preto — limite máximo de velocidade em km/h.',
    tip: 'Em cidade na França, o limite padrão é 50 km/h. Em Estradas Nacionais é 80 km/h, e em autoestradas 130 km/h.'
  },
  {
    id: 'ecole',
    title: 'École (zone scolaire)',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<polygon points="200,40 280,140 240,140 240,220 160,220 160,140 120,140" fill="#fff" stroke="#dc2626" stroke-width="8" stroke-linejoin="round"/>` +
      `<rect x="100" y="160" width="200" height="60" fill="#0f172a" opacity="0.85"/>` +
      `<text x="200" y="200" font-family="Arial, sans-serif" font-size="28" font-weight="900" fill="#fff" text-anchor="middle">ÉCOLE</text>`
    ),
    correct: 'Zona escolar — reduza a velocidade',
    options: ['Zona escolar — reduza a velocidade', 'Edifício público', 'Área de pedestres', 'Estacionamento para ônibus escolar'],
    explanation: 'O pictograma de crianças + texto "ÉCOLE" alerta para uma zona escolar. Velocidade reduzida e atenção máxima.',
    tip: 'Em zonas escolares francesas, multas são pesadas. Limite típico: 30 km/h.'
  },
  {
    id: 'hopital',
    title: 'Hôpital',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="120" y="60" width="160" height="160" rx="12" fill="#fff" stroke="#1d4ed8" stroke-width="8"/>` +
      `<rect x="180" y="80" width="40" height="120" fill="#1d4ed8"/>` +
      `<rect x="140" y="120" width="120" height="40" fill="#1d4ed8"/>` +
      `<text x="200" y="252" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#1f2937" text-anchor="middle">HÔPITAL</text>`
    ),
    correct: 'Hospital próximo',
    options: ['Hospital próximo', 'Farmácia de plantão', 'Pronto-socorro obrigatório', 'Clínica veterinária'],
    explanation: 'Sinal H (Hôpitaux de France) sobre fundo branco indica a proximidade de um hospital.',
    tip: 'Usado para indicar a direção ou proximidade do hospital. Familiar para todos os motoristas.'
  },
  {
    id: 'attention',
    title: 'Danger — Attention',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<polygon points="200,40 320,220 80,220" fill="#fff" stroke="#dc2626" stroke-width="10" stroke-linejoin="round"/>` +
      `<text x="200" y="200" font-family="Arial Black, sans-serif" font-size="56" font-weight="900" fill="#dc2626" text-anchor="middle">!</text>`
    ),
    correct: 'Atenção — perigo genérico',
    options: ['Atenção — perigo genérico', 'Sentido proibido', 'Curva perigosa à esquerda', 'Pare imediatamente'],
    explanation: 'Triângulo vermelho com borda branca e ponto de exclamação — alerta geral de perigo. O pictograma interno indica o tipo específico.',
    tip: 'Praticamente toda placa de aviso francesa começa com esse formato triangular.'
  },
  {
    id: 'metro',
    title: 'Station de métro',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="120" y="80" width="160" height="120" rx="14" fill="#fff" stroke="#1d4ed8" stroke-width="8"/>` +
      `<text x="200" y="170" font-family="Georgia, serif" font-size="100" font-weight="900" fill="#dc2626" text-anchor="middle">M</text>` +
      `<text x="200" y="216" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#1d4ed8" text-anchor="middle">MÉTROPOLITAIN</text>`
    ),
    correct: 'Estação de metrô',
    options: ['Estação de metrô', 'Estação de trem (SNCF)', 'Ponto de ônibus', 'Estacionamento subterrâneo'],
    explanation: 'O grande "M" vermelho sobre fundo branco é o símbolo universal das estações de metrô parisienses.',
    tip: 'Encontrado em toda Paris e grandes cidades francesas. A entrada é geralmente por escadas ou escada rolante.'
  },
  {
    id: 'sens-unique',
    title: 'Sens unique',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="110" y="90" width="180" height="80" rx="6" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<polygon points="160,108 230,108 230,100 260,130 230,160 230,152 160,152" fill="#fff"/>` +
      `<text x="200" y="200" font-family="Arial, sans-serif" font-size="20" font-weight="800" fill="#1f2937" text-anchor="middle">SENS UNIQUE</text>`
    ),
    correct: 'Sentido único (mão única)',
    options: ['Sentido único (mão única)', 'Via reservada a ônibus', 'Ciclovia obrigatória', 'Pista de emergência'],
    explanation: 'Placa retangular azul com seta branca indica que a rua só pode ser percorrida no sentido da seta.',
    tip: 'Comum no centro de Paris — economiza espaço e organiza o trânsito em ruas estreitas.'
  },
  {
    id: 'autoroute',
    title: 'Autoroute',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="110" y="100" width="180" height="80" rx="8" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<text x="200" y="156" font-family="Arial Black, sans-serif" font-size="48" font-weight="900" fill="#fff" text-anchor="middle">A6</text>` +
      `<text x="200" y="212" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#1d4ed8" text-anchor="middle">AUTOROUTE</text>`
    ),
    correct: 'Entrada de autoestrada',
    options: ['Entrada de autoestrada', 'Estação de pedágio', 'Saída obrigatória', 'Via rápida urbana'],
    explanation: 'Placa azul com "A" + número (ex: A6 = Paris-Lyon) — indica o início de uma autoestrada. Velocidade máxima: 130 km/h.',
    tip: 'Pedágios são comuns em autoestradas francesas. Tenha moedas ou cartão preparado.'
  },
  {
    id: 'impasse',
    title: 'Impasse',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="100" y="70" width="200" height="140" rx="8" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<line x1="130" y1="100" x2="130" y2="180" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
      `<line x1="130" y1="180" x2="270" y2="180" stroke="#fff" stroke-width="10" stroke-linecap="round"/>` +
      `<text x="200" y="232" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#1f2937" text-anchor="middle">IMPASSE</text>`
    ),
    correct: 'Beco sem saída',
    options: ['Beco sem saída', 'Rua sem saída para carros', 'Estacionamento apenas para moradores', 'Via interditada a bicicletas'],
    explanation: 'Placa azul com símbolo em "T" invertido. A rua termina e os veículos precisam fazer retorno pelo mesmo caminho.',
    tip: 'A versão em vermelho com texto "Voie sans issue" indica que não há nem passagem para pedestres.'
  },
  {
    id: 'piste-cyclable',
    title: 'Piste cyclable',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="100" y="80" width="200" height="120" rx="8" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<circle cx="150" cy="155" r="22" fill="none" stroke="#fff" stroke-width="6"/>` +
      `<circle cx="250" cy="155" r="22" fill="none" stroke="#fff" stroke-width="6"/>` +
      `<path d="M150 155 L210 100 L240 100 M210 100 L210 130 L240 155" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>` +
      `<text x="200" y="222" font-family="Arial, sans-serif" font-size="16" font-weight="800" fill="#1f2937" text-anchor="middle">PISTE CYCLABLE</text>`
    ),
    correct: 'Ciclovia (pista para bicicletas)',
    options: ['Ciclovia (pista para bicicletas)', 'Estacionamento para bicicletas', 'Rua compartilhada', 'Proibido para bicicletas'],
    explanation: 'Placa azul com pictograma de bicicleta indica uma via reservada exclusivamente aos ciclistas.',
    tip: 'Em Paris, há mais de 1.000 km de ciclovias! Use capacete e luzes à noite.'
  },
  {
    id: 'toilettes',
    title: 'Toilettes publiques',
    svg: wrap(
      `<rect x="0" y="240" width="400" height="40" fill="#94a3b8"/>` +
      `<rect x="78" y="20" width="30" height="220" fill="#475569"/>` +
      `<rect x="120" y="70" width="160" height="140" rx="12" fill="#1d4ed8" stroke="#fff" stroke-width="6"/>` +
      `<circle cx="170" cy="105" r="10" fill="#fff"/>` +
      `<path d="M158 130 L158 175 L150 195 M170 130 L170 195 L178 195 L170 175" fill="#fff" stroke="#fff" stroke-width="2"/>` +
      `<line x1="200" y1="110" x2="200" y2="190" stroke="#fff" stroke-width="3"/>` +
      `<circle cx="230" cy="105" r="10" fill="#fff"/>` +
      `<path d="M218 130 L242 130 L248 175 L232 195 L212 175 Z" fill="#fff"/>` +
      `<text x="200" y="232" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#1f2937" text-anchor="middle">WC</text>`
    ),
    correct: 'Sanitários públicos',
    options: ['Sanitários públicos', 'Lavatório', 'Ponto de água potável', 'Vestuário'],
    explanation: 'Placa azul com pictograma masculino e feminino (silhuetas) indica a presença de sanitários públicos.',
    tip: 'Os "sanisettes" parisienses são autolimpantes e gratuitos, embora fila seja comum.'
  }
]

const audioEl = ref(null)
const isPlayingAudio = ref(false)
const currentIndex = ref(0)
const answers = ref({})
const checked = ref(false)
const done = ref(false)

const currentPlaque = computed(() => PLAQUES[currentIndex.value] || {})
const totalPlaques = computed(() => PLAQUES.length)
const progress = computed(() => {
  if (totalPlaques.value === 0) return 0
  return Math.round(((currentIndex.value + 1) / totalPlaques.value) * 100)
})

const score = computed(() => {
  let correct = 0
  for (let i = 0; i < PLAQUES.length; i++) {
    if (answers.value[i] === PLAQUES[i].correct) correct++
  }
  return { correct, total: PLAQUES.length, pct: Math.round((correct / PLAQUES.length) * 100) }
})

const currentAnswer = computed(() => answers.value[currentIndex.value] || null)
const allAnswered = computed(() => {
  return Object.keys(answers.value).length === PLAQUES.length
})

function pickAnswer(opt) {
  if (checked.value) return
  answers.value = { ...answers.value, [currentIndex.value]: opt }
}

function checkAll() {
  if (!allAnswered.value) return
  checked.value = true
}

function next() {
  stopAudio()
  if (currentIndex.value < PLAQUES.length - 1) {
    currentIndex.value++
    checked.value = false
  }
}

function prev() {
  stopAudio()
  if (currentIndex.value > 0) {
    currentIndex.value--
    checked.value = false
  }
}

function restart() {
  currentIndex.value = 0
  answers.value = {}
  checked.value = false
  done.value = false
  stopAudio()
}

function shuffleAndStart() {
  const shuffled = [...PLAQUES].sort(() => Math.random() - 0.5)
  PLAQUES.splice(0, PLAQUES.length, ...shuffled)
  restart()
  toast.info('Placas embaralhadas!', { duration: 1500 })
}

function finishSession() {
  stopAudio()
  done.value = true
}

function voiceOptions() {
  return {
    voice: settings.voice === 'male' ? 'male' : 'female',
    region: settings.region || 'fr',
    speed: settings.speed ?? 1.0
  }
}

function stopAudio() {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
  isPlayingAudio.value = false
}

function playPlaqueAudio(text) {
  const phrase = (text || currentPlaque.value?.title || '').trim()
  if (!phrase || !audioEl.value) return
  if (isPlayingAudio.value) {
    stopAudio()
    return
  }
  try {
    const { url } = getAudioUrl(phrase, voiceOptions())
    audioEl.value.src = url
    audioEl.value.load()
    isPlayingAudio.value = true
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => { isPlayingAudio.value = false })
    }
  } catch (e) {
    isPlayingAudio.value = false
  }
}

onUnmounted(() => stopAudio())
</script>

<template>
  <div class="pl">
    <header class="pl__head">
      <div>
        <span class="pl__eyebrow">PLACAS DE RUA</span>
        <h1 class="pl__title">Aprenda a ler as placas francesas</h1>
        <p class="pl__sub">
          Reconheça as placas mais comuns nas ruas e estradas da França.
          Olhe a imagem e escolha o que cada placa significa.
        </p>
      </div>
      <div class="pl__progress-card">
        <strong>{{ score.correct }}</strong>
        <small>acertos</small>
        <span class="pl__progress-divider"></span>
        <strong>{{ totalPlaques }}</strong>
        <small>placas</small>
      </div>
    </header>

    <section class="pl__intro card">
      <AppIcon name="info" :size="16" />
      <div>
        <p>
          <strong>Como funciona:</strong>
        </p>
        <ol>
          <li>Veja a imagem da placa.</li>
          <li>Escolha entre as 4 opções o significado correto.</li>
          <li>Toque em 🔊 para ouvir o nome em francês.</li>
          <li>No final, veja seu desempenho e dicas úteis.</li>
        </ol>
      </div>
    </section>

    <div class="pl__progress-bar" v-if="!done">
      <div class="pl__progress-fill" :style="{ width: progress + '%' }"></div>
      <span class="pl__progress-text">{{ currentIndex + 1 }} / {{ totalPlaques }}</span>
    </div>

    <!-- ─── Active quiz ─── -->
    <section class="pl__card card" v-if="!done">
      <div class="pl__image-wrap">
        <div class="pl__image" v-html="currentPlaque.svg" :aria-label="currentPlaque.title"></div>
        <button
          type="button"
          class="pl__speak"
          :class="{ 'is-playing': isPlayingAudio }"
          :aria-label="isPlayingAudio ? 'Parar áudio' : 'Ouvir nome da placa'"
          @click="playPlaqueAudio()"
        >
          <AppIcon :name="isPlayingAudio ? 'pause' : 'speaker'" :size="16" />
          <span>{{ isPlayingAudio ? 'Parar' : 'Ouvir nome' }}</span>
        </button>
      </div>

      <div class="pl__options">
        <h2 class="pl__question">O que esta placa significa ?</h2>
        <div class="pl__options-grid">
          <button
            v-for="opt in currentPlaque.options"
            :key="opt"
            type="button"
            class="pl__option"
            :class="{
              'is-selected': currentAnswer === opt,
              'is-correct': checked && opt === currentPlaque.correct,
              'is-wrong': checked && currentAnswer === opt && opt !== currentPlaque.correct,
              'is-faded': checked && currentAnswer !== opt && opt !== currentPlaque.correct
            }"
            :disabled="checked"
            @click="pickAnswer(opt)"
          >
            <span class="pl__option-mark" aria-hidden="true">
              <AppIcon
                v-if="checked && opt === currentPlaque.correct"
                name="check"
                :size="14"
              />
              <AppIcon
                v-else-if="checked && currentAnswer === opt && opt !== currentPlaque.correct"
                name="cross"
                :size="14"
              />
              <span v-else class="pl__option-letter">
                {{ String.fromCharCode(65 + currentPlaque.options.indexOf(opt)) }}
              </span>
            </span>
            <span class="pl__option-text">{{ opt }}</span>
          </button>
        </div>

        <Transition name="pl-feedback">
          <div
            v-if="checked && currentAnswer"
            class="pl__feedback"
            :class="currentAnswer === currentPlaque.correct ? 'is-correct' : 'is-wrong'"
          >
            <header class="pl__feedback-head">
              <AppIcon
                :name="currentAnswer === currentPlaque.correct ? 'check' : 'cross'"
                :size="16"
              />
              <strong>
                {{ currentAnswer === currentPlaque.correct ? 'Acertou !' : 'Quase lá' }}
              </strong>
            </header>
            <p class="pl__feedback-explain">{{ currentPlaque.explanation }}</p>
            <p class="pl__feedback-tip">
              <AppIcon name="sparkles" :size="12" />
              {{ currentPlaque.tip }}
            </p>
          </div>
        </Transition>
      </div>

      <footer class="pl__card-foot">
        <button
          type="button"
          class="btn btn-ghost"
          :disabled="currentIndex === 0"
          @click="prev"
        >
          <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
          Anterior
        </button>

        <div class="pl__card-foot-mid">
          <button
            v-if="!checked"
            type="button"
            class="btn btn-primary"
            :disabled="!currentAnswer"
            @click="checked = true"
          >
            <AppIcon name="check" :size="14" />
            Verificar
          </button>
          <button
            v-else-if="currentIndex < PLAQUES.length - 1"
            type="button"
            class="btn btn-primary"
            @click="next"
          >
            Próxima
            <AppIcon name="arrow" :size="14" />
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            :disabled="!allAnswered"
            @click="finishSession"
          >
            <AppIcon name="check" :size="14" />
            Ver resultado
          </button>
        </div>

        <button
          v-if="checked && currentIndex < PLAQUES.length - 1"
          type="button"
          class="btn btn-ghost"
          @click="next"
        >
          Pular
          <AppIcon name="arrow" :size="14" />
        </button>
        <div v-else style="width: 88px"></div>
      </footer>
    </section>

    <!-- ─── Done screen ─── -->
    <section class="pl__done card" v-else>
      <div class="pl__done-icon">
        <AppIcon name="trophy" :size="48" />
      </div>
      <h2 class="pl__done-title">Resultado da sua sessão</h2>
      <p class="pl__done-sub">Você revisou as principais placas francesas.</p>

      <div class="pl__done-score" :class="{
        'is-great': score.pct >= 80,
        'is-ok': score.pct >= 50 && score.pct < 80,
        'is-low': score.pct < 50
      }">
        <strong>{{ score.correct }} / {{ score.total }}</strong>
        <small>{{ score.pct }}% de acerto</small>
      </div>

      <div class="pl__done-grid">
        <article
          v-for="(plaque, i) in PLAQUES"
          :key="plaque.id"
          class="pl__done-item"
          :class="{
            'is-correct': answers[i] === plaque.correct,
            'is-wrong': answers[i] != null && answers[i] !== plaque.correct,
            'is-skipped': answers[i] == null
          }"
        >
          <div class="pl__done-thumb" v-html="plaque.svg"></div>
          <div class="pl__done-info">
            <strong>{{ plaque.title }}</strong>
            <small>{{ answers[i] === plaque.correct ? plaque.correct : 'Esperado: ' + plaque.correct }}</small>
          </div>
          <AppIcon
            :name="answers[i] === plaque.correct ? 'check' : 'cross'"
            :size="16"
          />
        </article>
      </div>

      <div class="pl__done-actions">
        <button class="btn btn-ghost btn--lg" type="button" @click="shuffleAndStart">
          <AppIcon name="refresh" :size="14" />
          Embaralhar e refazer
        </button>
        <button class="btn btn-primary btn--lg" type="button" @click="restart">
          <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
          Recomeçar mesma ordem
        </button>
      </div>
    </section>

    <audio
      ref="audioEl"
      hidden
      @ended="isPlayingAudio = false"
      @error="isPlayingAudio = false"
      @pause="isPlayingAudio = false"
    ></audio>
  </div>
</template>

<style scoped>
.pl {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: var(--font-body);
  max-width: 880px;
  margin: 0 auto;
  width: 100%;
}

.pl__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.pl__eyebrow {
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

.pl__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}

.pl__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 560px;
  line-height: 1.55;
}

.pl__progress-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-xs);
  font-family: var(--font-nav);
}
.pl__progress-card strong {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.pl__progress-card small {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pl__progress-divider {
  width: 1px;
  height: 22px;
  background: var(--border-default);
  margin: 0 4px;
}

.pl__intro {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  background: var(--color-primary-softer);
  border: 1px dashed var(--color-primary-soft);
  color: var(--text-secondary);
  font-size: 13.5px;
  line-height: 1.55;
}
.pl__intro :deep(svg) {
  color: var(--color-primary);
  margin-top: 2px;
  flex-shrink: 0;
}
.pl__intro p { margin: 0 0 8px; }
.pl__intro strong { color: var(--text-primary); }
.pl__intro ol {
  margin: 0;
  padding-left: 22px;
  font-size: 13px;
  color: var(--text-secondary);
}
.pl__intro ol li { margin-bottom: 4px; }

.pl__progress-bar {
  position: relative;
  height: 8px;
  background: var(--surface-sunken);
  border-radius: 999px;
  overflow: hidden;
}
.pl__progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: linear-gradient(90deg, var(--color-primary), #6366f1);
  border-radius: 999px;
  transition: width 0.3s var(--ease-out);
}
.pl__progress-text {
  position: absolute;
  right: 0;
  top: 14px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

/* ── Quiz card ── */
.pl__card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.pl__image-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: var(--radius-lg);
}

.pl__image {
  width: 100%;
  max-width: 480px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: #f8fafc;
}
.pl__image :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.pl__speak {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  border: none;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px -4px rgba(59, 130, 246, 0.45);
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.pl__speak:hover {
  background: var(--color-primary-hover, #2566eb);
  transform: translateY(-1px);
}
.pl__speak.is-playing {
  background: var(--color-accent, #f97316);
  box-shadow: 0 4px 12px -4px rgba(249, 115, 22, 0.55);
  animation: pl-pulse 1.1s ease-in-out infinite;
}
@keyframes pl-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}

.pl__options { display: flex; flex-direction: column; gap: 12px; }

.pl__question {
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.005em;
}

.pl__options-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.pl__option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--surface-page);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast), transform var(--motion-fast);
}
.pl__option:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
  transform: translateY(-1px);
}
.pl__option:disabled { cursor: default; }

.pl__option.is-selected {
  border-color: var(--color-primary);
  background: var(--color-primary-softer);
}

.pl__option.is-correct {
  border-color: var(--color-success, #16a34a);
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}
.pl__option.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.10);
  color: #b91c1c;
}
.pl__option.is-faded {
  opacity: 0.5;
}

.pl__option-mark {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--border-default);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  transition: background var(--motion-fast), border-color var(--motion-fast), color var(--motion-fast);
}
.pl__option.is-selected .pl__option-mark {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
.pl__option.is-correct .pl__option-mark {
  background: var(--color-success, #16a34a);
  border-color: var(--color-success, #16a34a);
  color: #fff;
}
.pl__option.is-wrong .pl__option-mark {
  background: #ef4444;
  border-color: #ef4444;
  color: #fff;
}

.pl__option-text { line-height: 1.4; word-break: break-word; }

.pl__feedback {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  border: 1px dashed;
}
.pl__feedback.is-correct {
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.5);
}
.pl__feedback.is-wrong {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.45);
}
.pl__feedback-head {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.pl__feedback.is-correct .pl__feedback-head { color: #15803d; }
.pl__feedback.is-wrong .pl__feedback-head { color: #b91c1c; }

.pl__feedback-explain {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.pl__feedback-tip {
  margin: 0;
  display: inline-flex;
  align-items: flex-start;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-style: italic;
}
.pl__feedback-tip :deep(svg) { color: var(--color-primary); flex-shrink: 0; margin-top: 2px; }

.pl-feedback-enter-active, .pl-feedback-leave-active {
  transition: opacity var(--motion-fast), transform var(--motion-fast);
}
.pl-feedback-enter-from, .pl-feedback-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

.pl__card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 12px;
  border-top: 1px dashed var(--border-soft);
}
.pl__card-foot-mid { flex: 1; display: flex; justify-content: center; }

/* ── Done screen ── */
.pl__done {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 32px 28px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  text-align: center;
}
.pl__done-icon {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), #6366f1);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px -10px rgba(99, 102, 241, 0.5);
}
.pl__done-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}
.pl__done-sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
}

.pl__done-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 28px;
  border-radius: var(--radius-lg);
}
.pl__done-score strong {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}
.pl__done-score small {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.pl__done-score.is-great {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}
.pl__done-score.is-ok {
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
}
.pl__done-score.is-low {
  background: rgba(249, 115, 22, 0.10);
  color: #b45309;
}

.pl__done-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 10px;
  text-align: left;
}

.pl__done-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--surface-page);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-nav);
}
.pl__done-item.is-correct { border-color: rgba(34, 197, 94, 0.55); background: rgba(34, 197, 94, 0.05); }
.pl__done-item.is-wrong { border-color: rgba(239, 68, 68, 0.5); background: rgba(239, 68, 68, 0.05); }
.pl__done-item.is-skipped { opacity: 0.6; }

.pl__done-thumb {
  width: 50px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  background: #f8fafc;
  flex-shrink: 0;
}
.pl__done-thumb :deep(svg) { width: 100%; height: 100%; display: block; }

.pl__done-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.pl__done-info strong { font-size: 12px; font-weight: 700; color: var(--text-primary); }
.pl__done-info small { font-size: 11px; color: var(--text-muted); line-height: 1.3; }

.pl__done-item :deep(svg) { flex-shrink: 0; }
.pl__done-item.is-correct :deep(svg) { color: var(--color-success, #16a34a); }
.pl__done-item.is-wrong :deep(svg) { color: #ef4444; }

.pl__done-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6px;
}

@media (max-width: 640px) {
  .pl__title { font-size: 22px; }
  .pl__options-grid { grid-template-columns: 1fr; }
  .pl__card { padding: 18px; }
  .pl__image-wrap { padding: 12px; }
  .pl__card-foot { flex-direction: row; }
  .pl__done-actions .btn { flex: 1; }
}
</style>
