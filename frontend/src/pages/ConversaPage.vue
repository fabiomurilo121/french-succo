<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useToastStore } from '@/stores/toast'
import { api } from '@/services/api'
import { getAudioUrl } from '@/services/audioCache'

const settings = useSettingsStore()
const toast = useToastStore()

const SCENARIOS = [
  { id: 'restaurant', label: 'Restaurante', icon: 'utensils', emoji: '🍽️',
    desc: 'Peça o prato, pergunte a conta, reclame de algo.', tone: '#ef4444' },
  { id: 'marche',     label: 'Mercado',     icon: 'bag',      emoji: '🛒',
    desc: 'Compre frutas, queijos, pergunte o preço.', tone: '#f97316' },
  { id: 'cafe',       label: 'Café',        icon: 'coffee',   emoji: '☕',
    desc: 'Peça um café, um croissant, pague a conta.', tone: '#a16207' },
  { id: 'hotel',      label: 'Hotel',       icon: 'home',     emoji: '🏨',
    desc: 'Faça check-in, peça a chave, pergunte o Wi-Fi.', tone: '#0ea5e9' },
  { id: 'aeroport',   label: 'Aeroporto',   icon: 'flag',     emoji: '✈️',
    desc: 'Confirme o voo, despache a mala, ache o portão.', tone: '#6366f1' },
  { id: 'pharmacie',  label: 'Farmácia',    icon: 'shield',   emoji: '💊',
    desc: 'Descreva um sintoma, peça um remédio.', tone: '#10b981' },
  { id: 'boutique',   label: 'Loja',        icon: 'bag',      emoji: '👕',
    desc: 'Procure uma roupa, pergunte o tamanho, prove.', tone: '#ec4899' },
  { id: 'taxi',       label: 'Táxi',        icon: 'map',      emoji: '🚕',
    desc: 'Dê um endereço, peça o caminho, pague a corrida.', tone: '#14b8a6' }
]

const MAX_TURNS = 24

const phase = ref('scenario')
const activeScenario = ref(null)
const turns = ref([])
const corrections = ref([])
const suggestions = ref([])
const culturalTip = ref('')
const sessionMeta = ref(null)

const loading = ref(false)
const listening = ref(false)
const speaking = ref(false)
const transcriptDraft = ref('')
const errorMsg = ref('')

const chatEl = ref(null)
const audioEl = ref(null)
const recognitionRef = ref(null)
const speechSupported = ref(false)

const manualInput = ref('')

const voiceOpts = computed(() => ({
  voice: settings.voice === 'male' ? 'male' : 'female',
  region: settings.region || 'fr',
  speed: settings.speed ?? 0.9
}))

const activeScenarioMeta = computed(() =>
  SCENARIOS.find((s) => s.id === activeScenario.value) || null
)

const canSend = computed(() => {
  const text = (manualInput.value || transcriptDraft.value || '').trim()
  return text.length > 0 && !loading.value
})

onMounted(() => {
  setupSpeechRecognition()
})

onUnmounted(() => {
  stopRecognition()
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
})

function setupSpeechRecognition() {
  if (typeof window === 'undefined') return
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) {
    speechSupported.value = false
    return
  }
  speechSupported.value = true
  const rec = new SR()
  rec.lang = 'fr-FR'
  rec.interimResults = true
  rec.continuous = false
  rec.maxAlternatives = 1

  rec.onstart = () => {
    listening.value = true
    transcriptDraft.value = ''
  }
  rec.onresult = (event) => {
    let interim = ''
    let finalText = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      if (result.isFinal) finalText += result[0].transcript
      else interim += result[0].transcript
    }
    if (finalText) transcriptDraft.value = finalText
    else transcriptDraft.value = interim
  }
  rec.onerror = (event) => {
    listening.value = false
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      toast.error('Permissão de microfone negada. Verifique o navegador.')
    } else if (event.error === 'no-speech') {
      toast.info('Nenhuma fala detectada. Tente novamente.')
    }
  }
  rec.onend = () => {
    listening.value = false
  }

  recognitionRef.value = rec
}

function startListening() {
  if (!speechSupported.value) {
    toast.warning('Reconhecimento de voz não suportado neste navegador. Use Chrome.')
    return
  }
  if (loading.value) return
  try {
    stopAudio()
    recognitionRef.value?.start()
  } catch (e) {
    listening.value = false
  }
}

function stopRecognition() {
  try {
    if (recognitionRef.value && listening.value) {
      recognitionRef.value.stop()
    }
  } catch (e) {
    /* ignore */
  }
  listening.value = false
}

function toggleMic() {
  if (listening.value) stopRecognition()
  else startListening()
}

function stopAudio() {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
  speaking.value = false
}

function playReplyAudio(text) {
  if (!text || !audioEl.value) return
  stopRecognition()
  try {
    const { url } = getAudioUrl(text, voiceOpts.value)
    audioEl.value.src = url
    audioEl.value.load()
    speaking.value = true
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        speaking.value = false
      })
    }
  } catch (e) {
    speaking.value = false
  }
}

function onAudioEnded() {
  speaking.value = false
}

function onAudioError() {
  speaking.value = false
}

function backToScenarios() {
  stopRecognition()
  stopAudio()
  phase.value = 'scenario'
  activeScenario.value = null
  turns.value = []
  corrections.value = []
  suggestions.value = []
  culturalTip.value = ''
  sessionMeta.value = null
  manualInput.value = ''
  transcriptDraft.value = ''
  errorMsg.value = ''
}

async function startConversation(scenarioId) {
  if (loading.value) return
  activeScenario.value = scenarioId
  loading.value = true
  errorMsg.value = ''
  turns.value = []
  corrections.value = []
  suggestions.value = []
  culturalTip.value = ''
  sessionMeta.value = null
  transcriptDraft.value = ''

  try {
    const response = await api.startConversation({
      scenario: scenarioId,
      region: settings.region || 'fr'
    })
    sessionMeta.value = {
      character: response.character,
      setting: response.setting
    }
    suggestions.value = (response.suggestedReplies || []).map((s) => {
      const [fr, pt] = String(s).split(' — ')
      return { fr: fr?.trim() || '', pt: pt?.trim() || '' }
    })
    culturalTip.value = response.culturalTip || ''
    turns.value.push({
      role: 'assistant',
      text: response.greeting,
      phonetic: response.greetingPhonetic || '',
      translation: response.greetingTranslation || '',
      timestamp: Date.now()
    })
    phase.value = 'chat'
    await nextTick()
    scrollToBottom()
    if (settings.autoPlay) {
      setTimeout(() => playReplyAudio(response.greeting), 350)
    }
  } catch (err) {
    console.error('startConversation error:', err)
    errorMsg.value = err?.message || 'Não foi possível iniciar a conversa.'
    toast.error(errorMsg.value)
    activeScenario.value = null
  } finally {
    loading.value = false
  }
}

function buildHistoryPayload() {
  return turns.value.map((t) => ({ role: t.role, text: t.text }))
}

async function sendMessage(forcedText) {
  const text = (forcedText ?? manualInput.value ?? transcriptDraft.value ?? '').trim()
  if (!text || loading.value) return

  stopRecognition()
  stopAudio()

  turns.value.push({
    role: 'user',
    text,
    timestamp: Date.now()
  })

  if (turns.value.length > MAX_TURNS) {
    turns.value = turns.value.slice(-MAX_TURNS)
  }

  manualInput.value = ''
  transcriptDraft.value = ''
  errorMsg.value = ''
  loading.value = true
  suggestions.value = []

  await nextTick()
  scrollToBottom()

  try {
    const response = await api.replyConversation({
      scenario: activeScenario.value,
      history: buildHistoryPayload(),
      userText: text,
      region: settings.region || 'fr'
    })

    if (response.userCorrections && response.userCorrections.length) {
      for (const c of response.userCorrections) {
        corrections.value.unshift({
          id: Date.now() + Math.random(),
          original: c.original,
          corrected: c.corrected,
          phonetic: c.phonetic,
          items: c.corrections || []
        })
      }
    }

    turns.value.push({
      role: 'assistant',
      text: response.reply,
      phonetic: response.replyPhonetic || '',
      translation: response.replyTranslation || '',
      timestamp: Date.now()
    })
    suggestions.value = response.suggestedReplies || []
    if (response.culturalTip) culturalTip.value = response.culturalTip

    await nextTick()
    scrollToBottom()

    if (settings.autoPlay) {
      setTimeout(() => playReplyAudio(response.reply), 350)
    }
  } catch (err) {
    console.error('replyConversation error:', err)
    errorMsg.value = err?.message || 'Não foi possível responder.'
    toast.error(errorMsg.value)
  } finally {
    loading.value = false
  }
}

function applySuggestion(s) {
  if (!s?.fr) return
  sendMessage(s.fr)
}

function playTurnAudio(turn) {
  if (!turn?.text) return
  playReplyAudio(turn.text)
}

function scrollToBottom() {
  const el = chatEl.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

function dismissCorrection(id) {
  corrections.value = corrections.value.filter((c) => c.id !== id)
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function onMicKey(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggleMic()
  }
}

function onInputKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="cv">
    <!-- SCENARIO PICKER -->
    <template v-if="phase === 'scenario'">
      <header class="cv__head">
        <div class="cv__title-block">
          <span class="cv__eyebrow">CONVERSAÇÃO COM IA</span>
          <h1 class="cv__title">Pratique francês em situações reais</h1>
          <p class="cv__sub">
            Escolha um cenário, fale pelo microfone e a IA vai entrar no personagem
            (garçom, balconiste, recepcionista…). Você verá correções suaves das
            suas frases logo depois de cada turno.
          </p>
        </div>
        <div class="cv__head-stats">
          <strong>{{ SCENARIOS.length }}</strong>
          <small>cenários</small>
          <span class="cv__head-divider"></span>
          <strong>FR</strong>
          <small>francês</small>
        </div>
      </header>

      <section class="cv__intro card">
        <AppIcon name="info" :size="16" />
        <div>
          <p>
            <strong>Como funciona:</strong>
          </p>
          <ol>
            <li>Escolha um cenário abaixo.</li>
            <li>Toque no microfone e fale em francês (aceita sotaque brasileiro).</li>
            <li>A IA responde em francês — correção aparece discretamente entre parênteses.</li>
            <li>Use as sugestões rápidas se preferir digitar.</li>
          </ol>
        </div>
      </section>

      <section class="cv__scenarios">
        <button
          v-for="s in SCENARIOS"
          :key="s.id"
          type="button"
          class="cv__scenario card"
          :style="{ '--tone': s.tone }"
          :disabled="loading"
          @click="startConversation(s.id)"
        >
          <span class="cv__scenario-emoji" aria-hidden="true">{{ s.emoji }}</span>
          <div class="cv__scenario-body">
            <strong class="cv__scenario-label">{{ s.label }}</strong>
            <small class="cv__scenario-desc">{{ s.desc }}</small>
          </div>
          <AppIcon name="arrow" :size="14" class="cv__scenario-arrow" />
        </button>
      </section>
    </template>

    <!-- CHAT -->
    <template v-else>
      <header class="cv__chat-head">
        <button class="cv__back" type="button" @click="backToScenarios">
          <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
          Trocar cenário
        </button>
        <div class="cv__chat-title">
          <span
            class="cv__chat-emoji"
            aria-hidden="true"
          >{{ activeScenarioMeta?.emoji }}</span>
          <div>
            <strong>{{ activeScenarioMeta?.label }}</strong>
            <small>{{ sessionMeta?.character || 'Personagem' }}</small>
          </div>
        </div>
        <div class="cv__chat-tips">
          <span :class="['cv__dot', { 'is-active': speechSupported }]"></span>
          <small>{{ speechSupported ? 'Mic OK' : 'Sem mic' }}</small>
        </div>
      </header>

      <section
        v-if="sessionMeta?.setting"
        class="cv__setting card"
      >
        <AppIcon name="map" :size="14" />
        <span>{{ sessionMeta.setting }}</span>
      </section>

      <Transition name="cv-tip">
        <section
          v-if="culturalTip"
          class="cv__cultural card"
        >
          <span class="cv__cultural-icon">
            <AppIcon name="sparkles" :size="14" />
          </span>
          <div>
            <strong>Dica cultural</strong>
            <p>{{ culturalTip }}</p>
          </div>
        </section>
      </Transition>

      <section
        v-if="corrections.length"
        class="cv__corrections"
      >
        <article
          v-for="c in corrections"
          :key="c.id"
          class="cv__correction card"
        >
          <header class="cv__correction-head">
            <span class="cv__correction-eyebrow">
              <AppIcon name="warning" :size="12" />
              Pequenos ajustes
            </span>
            <button
              class="cv__correction-close"
              type="button"
              aria-label="Fechar correção"
              @click="dismissCorrection(c.id)"
            >
              <AppIcon name="cross" :size="12" />
            </button>
          </header>
          <div class="cv__correction-line">
            <span class="cv__correction-label">Você disse</span>
            <p class="cv__correction-original">{{ c.original }}</p>
          </div>
          <div class="cv__correction-line">
            <span class="cv__correction-label cv__correction-label--ok">Mais natural</span>
            <p class="cv__correction-corrected">{{ c.corrected }}</p>
          </div>
          <ul v-if="c.items?.length" class="cv__correction-items">
            <li v-for="(it, i) in c.items" :key="i">
              <code>{{ it.from }}</code>
              <span>→</span>
              <code class="cv__correction-item-to">{{ it.to }}</code>
              <small v-if="it.reason">{{ it.reason }}</small>
            </li>
          </ul>
        </article>
      </section>

      <section
        ref="chatEl"
        class="cv__chat"
      >
        <article
          v-for="(turn, idx) in turns"
          :key="idx + '-' + turn.timestamp"
          class="cv__bubble"
          :class="['cv__bubble--' + turn.role, { 'is-latest': idx === turns.length - 1 }]"
        >
          <div class="cv__bubble-avatar" aria-hidden="true">
            <span v-if="turn.role === 'assistant'">{{ activeScenarioMeta?.emoji || '🇫🇷' }}</span>
            <span v-else>Você</span>
          </div>
          <div class="cv__bubble-body">
            <p class="cv__bubble-text">{{ turn.text }}</p>
            <p
              v-if="turn.translation && turn.role === 'assistant'"
              class="cv__bubble-translation"
            >
              <small>↳</small> {{ turn.translation }}
            </p>
            <footer class="cv__bubble-foot">
              <button
                v-if="turn.role === 'assistant'"
                class="cv__bubble-play"
                type="button"
                @click="playTurnAudio(turn)"
                :aria-label="`Ouvir ${turn.text}`"
              >
                <AppIcon name="speaker" :size="13" />
              </button>
              <span class="cv__bubble-time">{{ formatTime(turn.timestamp) }}</span>
            </footer>
          </div>
        </article>

        <Transition name="cv-typing">
          <div v-if="loading" class="cv__typing">
            <span class="cv__typing-dot"></span>
            <span class="cv__typing-dot"></span>
            <span class="cv__typing-dot"></span>
            <small>{{ sessionMeta?.character || 'Personagem' }} está respondendo…</small>
          </div>
        </Transition>
      </section>

      <section
        v-if="suggestions.length"
        class="cv__suggestions"
      >
        <span class="cv__suggestions-label">Sugestões (toque para enviar):</span>
        <div class="cv__suggestions-list">
          <button
            v-for="(s, i) in suggestions"
            :key="i"
            type="button"
            class="cv__suggestion"
            :disabled="loading"
            @click="applySuggestion(s)"
          >
            <strong>{{ s.fr }}</strong>
            <small v-if="s.pt">{{ s.pt }}</small>
          </button>
        </div>
      </section>

      <section class="cv__composer card">
        <div
          class="cv__composer-field"
          :class="{
            'is-listening': listening,
            'is-draft': (transcriptDraft || manualInput).trim()
          }"
        >
          <textarea
            v-model="manualInput"
            class="cv__composer-input"
            :placeholder="listening ? 'Ouvindo você…' : 'Digite em francês ou use o microfone'"
            rows="2"
            :disabled="loading"
            @keydown="onInputKey"
          ></textarea>
          <Transition name="cv-fade">
            <div
              v-if="listening && transcriptDraft"
              class="cv__composer-draft"
            >
              <small>transcrição:</small>
              <span>{{ transcriptDraft }}</span>
            </div>
          </Transition>
        </div>

        <div class="cv__composer-actions">
          <button
            type="button"
            class="cv__mic"
            :class="{
              'is-listening': listening,
              'is-speaking': speaking,
              'is-disabled': !speechSupported
            }"
            :disabled="!speechSupported || loading"
            :aria-label="listening ? 'Parar gravação' : 'Falar em francês'"
            :title="speechSupported ? 'Microfone' : 'Reconhecimento de voz indisponível'"
            @click="toggleMic"
            @keydown="onMicKey"
          >
            <AppIcon v-if="!listening" name="mic" :size="20" />
            <AppIcon v-else name="pause" :size="20" />
            <span class="cv__mic-pulse" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            class="cv__send"
            :disabled="!canSend"
            @click="sendMessage()"
            :aria-label="'Enviar mensagem'"
          >
            <AppIcon name="arrow" :size="16" />
            <span>Enviar</span>
          </button>
        </div>
      </section>

      <audio
        ref="audioEl"
        hidden
        @ended="onAudioEnded"
        @error="onAudioError"
        @pause="speaking = false"
      ></audio>
    </template>
  </div>
</template>

<style scoped>
.cv {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-body);
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
}

/* ── Head (scenario picker) ── */
.cv__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.cv__eyebrow {
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

.cv__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}

.cv__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 560px;
  line-height: 1.55;
}

.cv__head-stats {
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
.cv__head-stats strong {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.cv__head-stats small {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.cv__head-divider {
  width: 1px;
  height: 22px;
  background: var(--border-default);
  margin: 0 4px;
}

/* ── Intro card ── */
.cv__intro {
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
.cv__intro :deep(svg) {
  color: var(--color-primary);
  margin-top: 2px;
  flex-shrink: 0;
}
.cv__intro p {
  margin: 0 0 8px;
}
.cv__intro strong {
  color: var(--text-primary);
}
.cv__intro ol {
  margin: 0;
  padding-left: 22px;
  font-size: 13px;
  color: var(--text-secondary);
}
.cv__intro ol li {
  margin-bottom: 4px;
}

/* ── Scenario grid ── */
.cv__scenarios {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.cv__scenario {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 18px;
  text-align: left;
  cursor: pointer;
  transition: transform var(--motion-fast), border-color var(--motion-fast),
    box-shadow var(--motion-fast);
  position: relative;
  overflow: hidden;
}
.cv__scenario::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--tone, var(--color-primary));
  opacity: 0.6;
}
.cv__scenario:hover {
  border-color: var(--color-primary-soft);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.cv__scenario:disabled {
  opacity: 0.6;
  cursor: progress;
}

.cv__scenario-emoji {
  font-size: 30px;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--surface-sunken);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cv__scenario-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cv__scenario-label {
  font-family: var(--font-nav);
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}
.cv__scenario-desc {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.4;
}

.cv__scenario-arrow {
  color: var(--text-faint);
  flex-shrink: 0;
  transition: transform var(--motion-fast), color var(--motion-fast);
}
.cv__scenario:hover .cv__scenario-arrow {
  color: var(--color-primary);
  transform: translateX(2px);
}

/* ── Chat head ── */
.cv__chat-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.cv__back {
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
.cv__back:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}

.cv__chat-title {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}
.cv__chat-emoji {
  font-size: 22px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--surface-sunken);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.cv__chat-title strong {
  display: block;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}
.cv__chat-title small {
  font-size: 12px;
  color: var(--text-muted);
}

.cv__chat-tips {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
}
.cv__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-default);
}
.cv__dot.is-active {
  background: var(--color-success);
  box-shadow: 0 0 0 3px var(--color-success-soft);
}

/* ── Setting card ── */
.cv__setting {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--surface-sunken);
  border: 1px dashed var(--border-default);
  border-radius: 12px;
  font-size: 12.5px;
  color: var(--text-secondary);
  font-style: italic;
}
.cv__setting :deep(svg) {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* ── Cultural tip ── */
.cv__cultural {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
  border-radius: var(--radius-md);
}
.cv__cultural-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cv__cultural strong {
  display: block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-tip-strong);
  margin-bottom: 2px;
}
.cv__cultural p {
  margin: 0;
  font-size: 13px;
  color: var(--color-tip-text);
  line-height: 1.5;
}

.cv-tip-enter-active, .cv-tip-leave-active {
  transition: opacity var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
}
.cv-tip-enter-from, .cv-tip-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Corrections ── */
.cv__corrections {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cv__correction {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  background: rgba(249, 115, 22, 0.06);
  border: 1px dashed rgba(249, 115, 22, 0.45);
  border-radius: var(--radius-md);
  position: relative;
}

.cv__correction-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cv__correction-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.cv__correction-close {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.15);
  color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
}
.cv__correction-close:hover {
  background: var(--color-accent);
  color: #fff;
}

.cv__correction-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cv__correction-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.cv__correction-label--ok {
  color: var(--color-success-text);
}

.cv__correction-original {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-secondary);
  text-decoration: line-through;
  text-decoration-color: rgba(249, 115, 22, 0.55);
  text-decoration-thickness: 1.5px;
  word-break: break-word;
}
.cv__correction-corrected {
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-word;
}

.cv__correction-items {
  list-style: none;
  margin: 4px 0 0;
  padding: 10px 12px;
  background: var(--surface-card);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cv__correction-items li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.cv__correction-items code {
  font-family: var(--font-display);
  font-size: 12.5px;
  background: var(--surface-sunken);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--text-primary);
  font-weight: 500;
}
.cv__correction-item-to {
  color: var(--color-primary) !important;
  background: var(--color-primary-softer) !important;
}
.cv__correction-items span {
  color: var(--text-faint);
  font-weight: 700;
}
.cv__correction-items small {
  flex-basis: 100%;
  font-size: 11.5px;
  color: var(--text-muted);
  font-style: italic;
}

/* ── Chat stream ── */
.cv__chat {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 18px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  max-height: 480px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.cv__bubble {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  max-width: 88%;
  animation: cv-pop 0.28s var(--ease-out);
}
.cv__bubble--assistant {
  align-self: flex-start;
}
.cv__bubble--user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

@keyframes cv-pop {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.cv__bubble-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-nav);
  flex-shrink: 0;
  background: var(--surface-sunken);
  color: var(--text-muted);
  border: 1px solid var(--border-default);
  overflow: hidden;
}
.cv__bubble--assistant .cv__bubble-avatar {
  background: var(--color-primary-softer);
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  font-size: 18px;
}
.cv__bubble--user .cv__bubble-avatar {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.cv__bubble-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  min-width: 0;
}
.cv__bubble--assistant .cv__bubble-body {
  border-bottom-left-radius: 6px;
  background: var(--surface-card);
  border-color: var(--color-primary-soft);
}
.cv__bubble--user .cv__bubble-body {
  border-bottom-right-radius: 6px;
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.cv__bubble-text {
  margin: 0;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.45;
  word-break: break-word;
  white-space: pre-wrap;
}

.cv__bubble-translation {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.4;
  word-break: break-word;
}
.cv__bubble-translation small {
  margin-right: 4px;
  color: var(--color-primary);
  font-style: normal;
  font-weight: 700;
}

.cv__bubble-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
  justify-content: flex-end;
}

.cv__bubble-play {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.cv__bubble-play:hover {
  background: var(--color-primary);
  color: #fff;
  transform: scale(1.05);
}

.cv__bubble-time {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 600;
  color: var(--text-faint);
  letter-spacing: 0.04em;
}
.cv__bubble--user .cv__bubble-time {
  color: rgba(255, 255, 255, 0.65);
}

/* ── Typing indicator ── */
.cv__typing {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  padding: 10px 14px;
  background: var(--surface-card);
  border: 1px solid var(--color-primary-soft);
  border-radius: 16px;
  border-bottom-left-radius: 6px;
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-nav);
}
.cv__typing small {
  font-size: 11px;
  font-weight: 600;
}
.cv__typing-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-primary);
  animation: cv-bounce 1.1s infinite ease-in-out;
}
.cv__typing-dot:nth-child(2) { animation-delay: 0.15s; }
.cv__typing-dot:nth-child(3) { animation-delay: 0.3s; }
@keyframes cv-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40%           { transform: translateY(-4px); opacity: 1; }
}

.cv-typing-enter-active, .cv-typing-leave-active {
  transition: opacity var(--motion-fast), transform var(--motion-fast);
}
.cv-typing-enter-from, .cv-typing-leave-to {
  opacity: 0;
  transform: translateY(4px);
}

/* ── Suggestions ── */
.cv__suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cv__suggestions-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.cv__suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cv__suggestion {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 12px;
  background: var(--color-primary-softer);
  border: 1px solid var(--color-primary-soft);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: transform var(--motion-fast), background var(--motion-fast);
  max-width: 280px;
}
.cv__suggestion:hover {
  background: var(--color-primary-soft);
  transform: translateY(-1px);
}
.cv__suggestion:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cv__suggestion strong {
  font-family: var(--font-display);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--color-primary-deep);
  line-height: 1.3;
  word-break: break-word;
}
.cv__suggestion small {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
}

/* ── Composer ── */
.cv__composer {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  padding: 12px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  position: sticky;
  bottom: 0;
  z-index: 5;
}

.cv__composer-field {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--surface-page);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 8px 12px;
  transition: border-color var(--motion-fast), background var(--motion-fast);
}
.cv__composer-field:focus-within {
  border-color: var(--color-primary);
  background: var(--surface-card);
}
.cv__composer-field.is-listening {
  border-color: var(--color-accent);
  background: rgba(249, 115, 22, 0.06);
  animation: cv-listening 1.4s ease-in-out infinite;
}
.cv__composer-field.is-draft:not(.is-listening) {
  border-color: var(--color-primary);
}
@keyframes cv-listening {
  0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
  50%      { box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12); }
}

.cv__composer-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 14.5px;
  color: var(--text-primary);
  resize: none;
  line-height: 1.45;
  min-height: 44px;
  max-height: 120px;
}
.cv__composer-input::placeholder {
  color: var(--text-faint);
}

.cv__composer-draft {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 4px;
  padding: 6px 10px;
  background: var(--surface-card);
  border: 1px dashed var(--color-accent);
  border-radius: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}
.cv__composer-draft small {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.cv__composer-draft span {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
  font-style: italic;
}

.cv-fade-enter-active, .cv-fade-leave-active {
  transition: opacity var(--motion-fast);
}
.cv-fade-enter-from, .cv-fade-leave-to {
  opacity: 0;
}

.cv__composer-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* ── Mic button ── */
.cv__mic {
  position: relative;
  width: 52px;
  height: 52px;
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
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
}
.cv__mic:hover {
  background: var(--color-primary-hover);
  transform: scale(1.05);
}
.cv__mic.is-listening {
  background: var(--color-accent);
  box-shadow: 0 4px 14px rgba(249, 115, 22, 0.35);
}
.cv__mic.is-speaking {
  background: var(--color-success);
}
.cv__mic.is-disabled {
  background: var(--border-default);
  color: var(--text-faint);
  cursor: not-allowed;
  box-shadow: none;
}

.cv__mic-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  opacity: 0;
  pointer-events: none;
}
.cv__mic.is-listening .cv__mic-pulse {
  animation: cv-pulse 1.4s ease-out infinite;
}
@keyframes cv-pulse {
  0%   { transform: scale(1);    opacity: 0.6; }
  100% { transform: scale(1.5);  opacity: 0; }
}

.cv__send {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 52px;
  padding: 0 18px;
  border-radius: var(--radius-button);
  background: var(--color-primary);
  color: #fff;
  border: none;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast), opacity var(--motion-fast);
}
.cv__send:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}
.cv__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.cv__send :deep(svg) {
  transform: rotate(-90deg);
}

@media (max-width: 640px) {
  .cv__title { font-size: 22px; }
  .cv__chat { max-height: 360px; }
  .cv__composer { padding: 10px; gap: 8px; }
  .cv__mic { width: 48px; height: 48px; }
  .cv__send { height: 48px; padding: 0 14px; font-size: 12px; }
  .cv__send span { display: none; }
  .cv__bubble { max-width: 95%; }
}
</style>
