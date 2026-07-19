<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useHistoryStore, useFavoritesStore } from '@/stores/library'
import { api } from '@/services/api'

const settings = useSettingsStore()
const history = useHistoryStore()
const favorites = useFavoritesStore()

const sourceText = ref('')
const detectedLang = ref('auto')
const mode = ref('translate')
const result = ref(null)
const loading = ref(false)
const errorMsg = ref('')
const audioEl = ref(null)

const isTranslating = computed(() => mode.value === 'translate')

const stats = ref({ wordsLearned: 1240, streakDays: 15, accuracy: 92 })
const suggestions = [
  'Cumprimentos básicos',
  'No restaurante',
  'Pedindo direções',
  'Números & Cores'
]

const MAX_CHARS = 500
const charCount = computed(() => sourceText.value.length)

watch(sourceText, (v) => {
  const sample = (v || '').toLowerCase().slice(0, 80)
  const frMarkers = /[àâçéèêëîïôûùüÿœæ]|le |la |les |un |une |des |je |tu |vous |nous |est |sont /
  const ptMarkers = /[áâãàéêíóôõúç]|não |você |como |obrigado|olá |bom dia|comigo/
  if (frMarkers.test(sample)) detectedLang.value = 'fr'
  else if (ptMarkers.test(sample)) detectedLang.value = 'pt'
  else detectedLang.value = 'auto'
})

onMounted(() => {
  history.fetchAll()
  favorites.fetchAll()
})

async function processText() {
  if (!sourceText.value.trim() || loading.value) return
  loading.value = true
  errorMsg.value = ''
  result.value = null

  try {
    const region = settings.region || 'fr'

    if (isTranslating.value) {
      const response = await api.translate({
        text: sourceText.value.trim(),
        sourceLang: detectedLang.value === 'auto' ? null : detectedLang.value,
        targetLang: 'fr',
        region
      })

      result.value = {
        type: 'translation',
        frText: response.frText || '',
        phonetic: response.phonetic || '',
        translation: response.translation,
        culturalTip: response.culturalTip,
        category: response.category || 'Comum'
      }
    } else {
      const response = await api.correct({
        text: sourceText.value.trim(),
        region
      })

      result.value = {
        type: 'grammar',
        frText: response.corrected || sourceText.value.trim(),
        corrected: response.corrected || sourceText.value.trim(),
        originalWithErrors: response.original || sourceText.value.trim(),
        errors: response.corrections || [],
        phonetic: response.phonetic || '',
        culturalTip: response.culturalTip
      }
    }

    history.add({
      sourceLang: detectedLang.value === 'auto' ? 'pt' : detectedLang.value,
      sourceText: sourceText.value,
      frText: result.value.frText,
      phonetic: result.value.phonetic,
      category: result.value.category || 'Comum'
    })

    if (settings.autoPlay) {
      setTimeout(() => playAudio('normal'), 350)
    }
  } catch (err) {
    console.error('Process error:', err)
    errorMsg.value =
      err?.message ||
      'Não foi possível processar agora. Verifique sua conexão e tente novamente.'
  } finally {
    loading.value = false
  }
}

function clearAll() {
  sourceText.value = ''
  result.value = null
  errorMsg.value = ''
}

function playAudio(speedVariant) {
  if (!result.value?.frText || !audioEl.value) return

  const speed = speedVariant === 'slow' ? 0.7 : 1.0
  const voice = settings.voice === 'male' ? 'male' : 'female'
  const region = settings.region || 'fr'

  try {
    audioEl.value.src = api.getAudioUrl(
      result.value.frText,
      voice,
      speed,
      region
    )
    audioEl.value.playbackRate = 1.0
    audioEl.value.load()
    const playPromise = audioEl.value.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((err) => {
        console.warn('Audio playback failed:', err)
      })
    }
  } catch (err) {
    console.warn('Audio error:', err)
  }
}

function copyResult() {
  if (!result.value?.frText) return
  navigator.clipboard.writeText(result.value.frText)
}

function favoriteResult() {
  if (!result.value?.frText) return
  const ok = favorites.add({
    frText: result.value.frText,
    ptText: result.value.translation || sourceText.value,
    phonetic: result.value.phonetic,
    category: result.value.category || 'Comum'
  })
  if (!ok) {
    alert('Esta frase já está nos seus favoritos.')
  }
}

function isFav() {
  if (!result.value?.frText) return false
  return favorites.isFavorited(result.value.frText)
}
</script>

<template>
  <div class="dashboard">
    <section class="hero">
      <div class="hero__content">
        <span class="hero__badge">BIENVENUE !</span>
        <h1 class="hero__title">Pronto para praticar seu francês?</h1>
        <p class="hero__text">
          Traduza frases, verifique a gramática e melhore sua pronúncia com nossa
          inteligência artificial pedagógica.
        </p>
        <div class="hero__actions">
          <button class="btn btn-accent">Começar Lição</button>
          <button class="btn btn-ghost">Ver progresso</button>
        </div>
      </div>
      <div class="hero__art" aria-hidden="true">
        <div class="hero__art-bubble">
          <span class="hero__art-emoji">🎉</span>
          <span class="hero__art-text">Cool!</span>
        </div>
        <div class="hero__art-mega">
          <span>M</span><span>E</span><span>G</span><span>A</span>
          <small>!</small>
        </div>
      </div>
    </section>

    <div class="dashboard__grid">
      <div class="dashboard__col">
        <div class="translator">
          <div class="lang-switcher">
            <button
              class="lang-switcher__btn"
              :class="{ 'is-active': isTranslating }"
              @click="mode = 'translate'"
            >
              <span>Português</span>
            </button>
            <button class="lang-switcher__swap" aria-label="Trocar idiomas">
              <AppIcon name="swap" :size="16" />
            </button>
            <button
              class="lang-switcher__btn"
              :class="{ 'is-active': !isTranslating }"
              @click="mode = 'grammar'"
            >
              <span>Francês</span>
            </button>
          </div>

          <textarea
            v-model="sourceText"
            class="translator__input"
            :placeholder="isTranslating ? 'Digite uma frase em português...' : 'Digite uma frase em francês para correção...'"
            :maxlength="MAX_CHARS"
          ></textarea>

          <div class="translator__bar">
            <span class="translator__detected">
              <small v-if="detectedLang !== 'auto'">Detectado: {{ detectedLang.toUpperCase() }}</small>
            </span>
            <span class="translator__count">{{ charCount }} / {{ MAX_CHARS }}</span>
          </div>

          <div class="translator__actions">
            <button class="btn btn-primary" @click="processText" :disabled="loading">
              <AppIcon name="sparkles" :size="16" />
              <span v-if="!loading">{{ isTranslating ? 'Traduzir agora' : 'Corrigir Gramática' }}</span>
              <span v-else>Processando...</span>
            </button>
            <button v-if="!isTranslating" class="btn btn-light" @click="processText" :disabled="loading">
              <AppIcon name="check" :size="16" />
              <span>Revisar</span>
            </button>
            <button class="btn btn-text" @click="clearAll">
              <AppIcon name="refresh" :size="16" />
              <span>Limpar</span>
            </button>
          </div>

          <div class="translator__suggestions">
            <small>Sugestões de estudo:</small>
            <div class="translator__chips">
              <button v-for="s in suggestions" :key="s" class="chip">{{ s }}</button>
            </div>
          </div>

          <p v-if="errorMsg" class="translator__error">{{ errorMsg }}</p>
        </div>
      </div>

      <aside class="dashboard__col dashboard__col--result">
        <div v-if="!result && !loading" class="result-empty">
          <div class="result-empty__icon">
            <AppIcon name="translate" :size="40" />
          </div>
          <h3>Sua tradução aparecerá aqui</h3>
          <p>Digite uma frase e clique em "Processar" para começar.</p>
        </div>

        <div v-else-if="loading" class="result-card result-card--loading">
          <div class="result-card__loader" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <p>Processando sua frase...</p>
        </div>

        <div v-else-if="result" class="result-card">
          <div class="result-card__head">
            <div class="result-card__lang">
              <span class="lang-bubble fr">FR</span>
              <strong>Francês</strong>
            </div>
            <div class="result-card__head-actions">
              <button class="ic-btn" aria-label="Favoritar" @click="favoriteResult">
                <AppIcon :name="isFav() ? 'starFilled' : 'star'" :size="18" />
              </button>
              <button class="ic-btn" aria-label="Copiar" @click="copyResult">
                <AppIcon name="copy" :size="18" />
              </button>
              <button class="ic-btn" aria-label="Compartilhar">
                <AppIcon name="share" :size="18" />
              </button>
            </div>
          </div>

          <p class="result-card__phrase">{{ result.frText }}</p>

          <div v-if="settings.showPhonetic" class="result-card__phonetic">
            <small>PRONÚNCIA</small>
            <button class="result-card__guide">Guia Fonético</button>
          </div>

          <div v-if="settings.showPhonetic" class="result-card__phonetic-line">
            <button class="result-card__speaker" @click="playAudio('normal')">
              <AppIcon name="speaker" :size="16" />
            </button>
            <span class="result-card__phonetic-text">{{ result.phonetic }}</span>
          </div>
          <div v-if="settings.showPhonetic" class="result-card__phonetic-hint">
            <em>{{ result.type === 'grammar' ? 'Ouça lentamente para identificar as nasalizações.' : 'Fale devagar, enfatizando as vogais.' }}</em>
          </div>

          <div v-if="result?.type === 'grammar'" class="result-card__corrections">
            <div class="correction-block">
              <strong>Sua frase:</strong>
              <p class="correction-original">{{ result?.originalWithErrors }}</p>
            </div>
            <div class="correction-block">
              <strong>Versão corrigida:</strong>
              <p class="correction-fixed">{{ result?.corrected }}</p>
            </div>
            <ul v-if="!settings.hideExplanations && result?.errors" class="correction-list">
              <li v-for="(er, idx) in result.errors" :key="idx">
                <span class="correction-list__tag">Correção</span>
                <p>
                  <s>{{ er.from }}</s> &rarr; <strong>{{ er.to }}</strong>
                </p>
                <small>{{ er.reason }}</small>
              </li>
            </ul>
          </div>

          <hr class="result-card__hr" />
          <div class="result-card__audio">
            <strong>Ações de áudio</strong>
            <div class="result-card__audio-actions">
              <button class="btn-audio" @click="playAudio('slow')">
                <AppIcon name="play" :size="14" />
                <span>Ouvir Lento</span>
              </button>
              <button class="btn-audio btn-audio--primary" @click="playAudio('normal')">
                <AppIcon name="speaker" :size="14" />
                <span>Ouvir Normal</span>
              </button>
            </div>
          </div>

          <div v-if="result?.culturalTip" class="result-card__tip">
            <div class="result-card__tip-icon">
              <AppIcon name="check" :size="14" />
            </div>
            <div>
              <strong>Dica Cultural</strong>
              <p>{{ result.culturalTip }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <section class="stats">
      <div class="stats__card">
        <div class="stats__icon stats__icon--blue">
          <AppIcon name="translate" :size="20" />
        </div>
        <div>
          <small>PALAVRAS APRENDIDAS</small>
          <strong>{{ stats.wordsLearned.toLocaleString('pt-BR') }}</strong>
        </div>
      </div>
      <div class="stats__card">
        <div class="stats__icon stats__icon--orange">
          <AppIcon name="zap" :size="20" />
        </div>
        <div>
          <small>OFENSIVA ATUAL</small>
          <strong>{{ stats.streakDays }} Dias</strong>
        </div>
      </div>
      <div class="stats__card">
        <div class="stats__icon stats__icon--green">
          <AppIcon name="dot" :size="20" />
        </div>
        <div>
          <small>PRECISÃO MÉDIA</small>
          <strong>{{ stats.accuracy }}%</strong>
        </div>
      </div>
    </section>

    <footer class="page-footer">
      © 2026 French Succo — Todos os direitos reservados. Foco no seu sucesso.
    </footer>

    <audio ref="audioEl" hidden></audio>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.hero {
  position: relative;
  background: var(--color-primary);
  background: linear-gradient(135deg, #4f8df9 0%, #3b6ef0 100%);
  border-radius: var(--radius-xl);
  color: #fff;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(59, 130, 246, 0.18);
}

.hero__content {
  flex: 1;
  z-index: 1;
}

.hero__badge {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border-radius: 999px;
  margin-bottom: 14px;
}

.hero__title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px;
  line-height: 1.2;
}

.hero__text {
  margin: 0 0 20px;
  opacity: 0.92;
  max-width: 520px;
  line-height: 1.55;
}

.hero__actions {
  display: flex;
  gap: 10px;
}

.hero__art {
  position: relative;
  width: 240px;
  height: 200px;
  flex-shrink: 0;
}

.hero__art-bubble {
  position: absolute;
  right: 30px;
  top: 10px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fbbf24, #f97316);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.hero__art-emoji {
  font-size: 28px;
}

.hero__art-text {
  font-weight: 800;
  font-size: 16px;
  color: #fff;
}

.hero__art-mega {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: end;
  padding-bottom: 6px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 36px;
  font-weight: 900;
  text-align: center;
}

.hero__art-mega small {
  grid-column: 4;
  font-size: 24px;
  color: #f97316;
}

.dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 20px;
}

.dashboard__col {
  display: flex;
  flex-direction: column;
}

.translator {
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.lang-switcher {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 999px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border-soft);
}

.lang-switcher__btn {
  padding: 8px 22px;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 600;
  transition: all 0.15s;
}

.lang-switcher__btn.is-active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.lang-switcher__swap {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.translator__input {
  width: 100%;
  min-height: 160px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-soft);
  padding: 16px;
  font-size: 16px;
  resize: vertical;
  background: #fff;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.translator__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-soft);
}

.translator__bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 12px;
  margin-top: -6px;
}

.translator__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.btn-text {
  background: transparent;
  color: var(--color-text-muted);
  padding: 10px 14px;
  margin-left: auto;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--radius-md);
}

.btn-text:hover {
  color: var(--color-primary);
}

.translator__suggestions small {
  color: var(--color-text-muted);
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
}

.translator__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  transition: background 0.15s;
}

.chip:hover {
  background: var(--color-primary-soft2);
}

.translator__error {
  color: var(--color-danger);
  font-size: 13px;
  margin: 0;
}

.result-empty {
  background: #fff;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: 40px 24px;
  text-align: center;
  color: var(--color-text-muted);
}

.result-empty__icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}

.result-empty h3 {
  margin: 0 0 6px;
  color: var(--color-text);
  font-weight: 700;
}

.result-card {
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.result-card--loading {
  align-items: center;
  justify-content: center;
  min-height: 280px;
  color: var(--color-text-muted);
  text-align: center;
}

.result-card__loader {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.result-card__loader span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary);
  opacity: 0.4;
  animation: dotPulse 1.2s infinite ease-in-out;
}

.result-card__loader span:nth-child(2) {
  animation-delay: 0.15s;
}

.result-card__loader span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes dotPulse {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
  40% { transform: scale(1.1); opacity: 1; }
}

.result-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.result-card__lang {
  display: flex;
  align-items: center;
  gap: 10px;
}

.result-card__head-actions {
  display: flex;
  gap: 6px;
}

.ic-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: transparent;
  color: var(--color-text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, color 0.15s;
}

.ic-btn:hover {
  background: var(--color-bg-alt);
  color: var(--color-primary);
}

.result-card__phrase {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
  margin: 0;
}

.result-card__phonetic {
  background: var(--color-primary-soft);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
}

.result-card__phonetic small {
  color: var(--color-primary);
  letter-spacing: 0.08em;
  font-weight: 700;
}

.result-card__guide {
  background: #fff;
  color: var(--color-text-muted);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid var(--color-border);
}

.result-card__phonetic-line {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
}

.result-card__speaker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.result-card__phonetic-text {
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 18px;
  color: var(--color-text);
}

.result-card__phonetic-hint {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: -8px;
}

.result-card__corrections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.correction-block strong {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.correction-original {
  background: #fff5f5;
  border: 1px solid #fecaca;
  color: var(--color-danger);
  padding: 10px 12px;
  border-radius: var(--radius-md);
  margin: 0;
  font-style: italic;
}

.correction-fixed {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  margin: 0;
  font-weight: 600;
}

.correction-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.correction-list li {
  background: var(--color-bg-alt);
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.correction-list p {
  margin: 0;
}

.correction-list small {
  color: var(--color-text-muted);
}

.correction-list__tag {
  align-self: flex-start;
  background: var(--color-warning);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.06em;
}

.result-card__hr {
  border: none;
  border-top: 1px solid var(--color-border-soft);
  margin: 0;
}

.result-card__audio strong {
  display: block;
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--color-text);
}

.result-card__audio-actions {
  display: flex;
  gap: 10px;
}

.btn-audio {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 13px;
  transition: background 0.15s;
}

.btn-audio:hover {
  background: var(--color-primary-soft2);
}

.btn-audio--primary {
  background: var(--color-primary);
  color: #fff;
}

.btn-audio--primary:hover {
  background: var(--color-primary-hover);
}

.result-card__tip {
  display: flex;
  gap: 12px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: var(--radius-md);
  padding: 12px 14px;
}

.result-card__tip-icon {
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

.result-card__tip strong {
  display: block;
  color: #9a3412;
  margin-bottom: 4px;
}

.result-card__tip p {
  margin: 0;
  font-size: 13px;
  color: #7c2d12;
  line-height: 1.5;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.stats__card {
  background: #fff;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}

.stats__icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.stats__icon--blue {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.stats__icon--orange {
  background: #fff0e0;
  color: var(--color-accent);
}

.stats__icon--green {
  background: #dcfce7;
  color: var(--color-success);
}

.stats__card small {
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 2px;
}

.stats__card strong {
  font-size: 18px;
  font-weight: 700;
}

.page-footer {
  margin-top: 24px;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}

@media (max-width: 1100px) {
  .dashboard__grid {
    grid-template-columns: 1fr;
  }
  .hero__art {
    display: none;
  }
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
