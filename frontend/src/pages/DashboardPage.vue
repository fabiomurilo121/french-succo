<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useHistoryStore, useFavoritesStore } from '@/stores/library'
import { useToastStore } from '@/stores/toast'
import { api } from '@/services/api'

const settings = useSettingsStore()
const history = useHistoryStore()
const favorites = useFavoritesStore()
const toast = useToastStore()

const sourceText = ref('')
const detectedLang = ref('auto')
const mode = ref('translate')
const result = ref(null)
const loading = ref(false)
const errorMsg = ref('')
const audioEl = ref(null)

const isTranslating = computed(() => mode.value === 'translate')

const stats = ref({ wordsLearned: 1240, streakDays: 15, accuracy: 92 })

const studySuggestions = [
  {
    id: 'greetings',
    label: 'Cumprimentos básicos',
    icon: 'user',
    phrases: [
      'Bom dia, como você está?',
      'Prazer em conhecê-lo',
      'Como você se chama?',
      'Tenha um bom dia!',
      'Até logo!',
      'Muito obrigado, você é muito gentil'
    ]
  },
  {
    id: 'restaurant',
    label: 'No restaurante',
    icon: 'utensils',
    phrases: [
      'Eu gostaria de pedir um café com leite, por favor.',
      'A conta, por favor.',
      'Qual é o prato do dia?',
      'Pode me trazer o cardápio, por favor?',
      'Está delicioso, obrigado!',
      'Eu sou alérgico a nozes'
    ]
  },
  {
    id: 'directions',
    label: 'Pedindo direções',
    icon: 'map',
    phrases: [
      'Onde fica a estação de metrô mais próxima?',
      'Como eu chego à estação de trem?',
      'Estou perdido, você pode me ajudar?',
      'É para a esquerda ou para a direita?',
      'Fica longe daqui?',
      'Quanto tempo leva para ir a pé?'
    ]
  },
  {
    id: 'numbers',
    label: 'Números & Cores',
    icon: 'hash',
    phrases: [
      'Quanto custa isso?',
      'Qual é o seu número de telefone?',
      'Eu tenho vinte e cinco anos',
      'Qual é a sua cor favorita?',
      'São três horas da tarde',
      'Eu quero dois cafés, por favor'
    ]
  }
]

const suggestionIndex = ref({})

function pickPhrase(suggestion) {
  const idx = suggestionIndex.value[suggestion.id] ?? -1
  const next = (idx + 1) % suggestion.phrases.length
  suggestionIndex.value = { ...suggestionIndex.value, [suggestion.id]: next }
  return suggestion.phrases[next]
}

async function applySuggestion(suggestion) {
  if (loading.value) return
  const phrase = pickPhrase(suggestion)
  sourceText.value = phrase
  toast.info(`Sugestão: ${suggestion.label}`, {
    title: 'Frase carregada',
    duration: 2500
  })
  await nextTick()
  await processText()
}

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
  if (history.items.length === 0) seedSampleHistory()
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
    const message =
      err?.detail?.message ||
      err?.message ||
      'Não foi possível processar agora. Verifique sua conexão e tente novamente.'
    errorMsg.value = message
    toast.error(isTranslating.value ? 'Falha ao traduzir' : 'Falha ao corrigir', {
      message,
      duration: 6000
    })
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

// ───── Recent history (below translator) ─────
const historySearch = ref('')
const historyCategory = ref('Todas')
const historyCategories = ['Todas', 'Comum', 'Viagem', 'Estudo']

const filteredHistory = computed(() => {
  let list = history.items
  if (historyCategory.value !== 'Todas') {
    list = list.filter((i) => i.category === historyCategory.value)
  }
  if (historySearch.value.trim()) {
    const q = historySearch.value.toLowerCase()
    list = list.filter(
      (i) =>
        (i.frText || '').toLowerCase().includes(q) ||
        (i.sourceText || '').toLowerCase().includes(q)
    )
  }
  return list.slice(0, 12)
})

function formatRelative(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'agora'
  if (diff < 3600) return `há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `há ${Math.floor(diff / 3600)} h`
  if (diff < 86400 * 7) return `há ${Math.floor(diff / 86400)} dia${Math.floor(diff / 86400) > 1 ? 's' : ''}`
  const day = d.getDate()
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${day} ${months[d.getMonth()]}`
}

function clearHistory() {
  if (confirm('Apagar todo o histórico de traduções?')) {
    history.clear()
  }
}

function isHistoryFav(item) {
  return favorites.isFavorited(item.frText)
}

function toggleHistoryFav(item) {
  if (isHistoryFav(item)) {
    const fav = favorites.items.find((f) => f.frText === item.frText)
    if (fav) favorites.remove(fav.id)
  } else {
    favorites.add({
      frText: item.frText,
      ptText: item.sourceText,
      phonetic: item.phonetic,
      category: item.category
    })
  }
}

function dismissHero() {
  settings.dismissHero()
}

function reuseHistoryItem(item) {
  sourceText.value = item.sourceText
  result.value = {
    type: item.mode === 'grammar' ? 'grammar' : 'translation',
    frText: item.frText,
    phonetic: item.phonetic || '',
    translation: item.sourceText,
    culturalTip: null,
    category: item.category,
    ...(item.mode === 'grammar' && {
      corrected: item.frText,
      originalWithErrors: item.sourceText,
      errors: []
    })
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function seedSampleHistory() {
  const now = Date.now()
  const samples = [
    { minutesAgo: 5, source: 'Olá, como você está hoje?', fr: 'Bonjour, comment allez-vous aujourd\'hui ?', phonetic: 'bõʒuʁ kɔmɑ̃tale vu.z‿o.ʒuʁ.dɥi', category: 'Comum' },
    { minutesAgo: 60, source: 'Eu gostaria de pedir um café com leite, por favor.', fr: 'Je voudrais commander un café au lait, s\'il vous plaît.', phonetic: 'ʒə.vudʁɛ kɔmɑ̃.de œ̃ kafe o lɛ sil vu plɛ', category: 'Viagem' },
    { minutesAgo: 180, source: 'Onde fica a estação de metrô mais próxima?', fr: 'Où se trouve la station de métro la plus proche ?', phonetic: 'u sə tʁuv la sta.sjɔ̃ də me.tʁo', category: 'Viagem' },
    { minutesAgo: 60 * 24, source: 'É um prazer conhecer você.', fr: 'C\'est un plaisir de vous rencontrer.', phonetic: 'sɛst œ̃ plɛ.ziʁ də vu ʁɑ̃.kɔ̃.tʁe', category: 'Comum' },
    { minutesAgo: 60 * 24 * 3, source: 'Qual é o seu número de telefone?', fr: 'Quel est votre numéro de téléphone ?', phonetic: 'kɛl ɛ vɔ.tʁə nœmbʁ də te.lə.fɔn', category: 'Estudo' }
  ]
  samples.forEach((s) => {
    history.add({
      sourceLang: 'pt',
      sourceText: s.source,
      frText: s.fr,
      phonetic: s.phonetic,
      category: s.category,
      mode: 'translate',
      createdAt: new Date(now - s.minutesAgo * 60 * 1000).toISOString()
    })
  })
}
</script>

<template>
  <div class="dashboard">
    <Transition name="hero">
      <section v-if="!settings.heroDismissed" class="hero">
        <button
          class="hero__close"
          @click="dismissHero"
          aria-label="Fechar banner de boas-vindas"
          title="Fechar banner"
        >
          <AppIcon name="cross" :size="14" />
        </button>
        <div class="hero__content">
          <span class="hero__badge">BIENVENUE</span>
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
      </section>
    </Transition>

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
            <div class="translator__suggestions-head">
              <small>Sugestões de estudo:</small>
              <small class="translator__hint">clique para preencher e traduzir</small>
            </div>
            <div class="translator__chips">
              <button
                v-for="s in studySuggestions"
                :key="s.id"
                class="chip chip--suggestion"
                :class="{ 'is-loading': loading && sourceText && s.phrases.includes(sourceText) }"
                :disabled="loading"
                :title="`Carregar uma frase de ${s.label.toLowerCase()}`"
                @click="applySuggestion(s)"
              >
                <AppIcon :name="s.icon" :size="14" class="chip__icon" />
                <span>{{ s.label }}</span>
              </button>
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

    <section class="recent-history">
      <header class="recent-history__head">
        <div>
          <h2>
            <AppIcon name="clock" :size="18" class="recent-history__head-icon" />
            Traduções Recentes
          </h2>
          <p>Suas últimas interações com o tradutor — clique para reutilizar ou favoritar.</p>
        </div>
        <button
          v-if="filteredHistory.length > 0"
          class="btn btn-light recent-history__clear"
          @click="clearHistory"
        >
          <AppIcon name="trash" :size="14" />
          <span>Limpar Tudo</span>
        </button>
      </header>

      <div class="recent-history__filters">
        <div class="recent-history__search">
          <AppIcon name="search" :size="14" />
          <input
            v-model="historySearch"
            type="text"
            placeholder="Buscar nas traduções..."
          />
        </div>
        <div class="recent-history__chips">
          <button
            v-for="cat in historyCategories"
            :key="cat"
            class="recent-history__chip"
            :class="{ active: historyCategory === cat }"
            @click="historyCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="recent-history__list">
        <article
          v-for="item in filteredHistory"
          :key="item.id"
          class="recent-history__item"
        >
          <div class="recent-history__meta">
            <span class="tag">{{ item.category || 'Comum' }}</span>
            <span class="recent-history__time">
              <AppIcon name="clock" :size="12" />
              {{ formatRelative(item.createdAt) }}
            </span>
            <button
              class="ic-btn recent-history__fav"
              :class="{ 'is-fav': isHistoryFav(item) }"
              @click="toggleHistoryFav(item)"
              :aria-label="isHistoryFav(item) ? 'Remover dos favoritos' : 'Favoritar'"
            >
              <AppIcon :name="isHistoryFav(item) ? 'starFilled' : 'star'" :size="14" />
            </button>
          </div>
          <div class="recent-history__lines">
            <div class="recent-history__line recent-history__line--fr">
              <span class="lang-bubble fr">FR</span>
              <em>{{ item.frText }}</em>
            </div>
            <div class="recent-history__line recent-history__line--pt">
              <span class="lang-bubble pt">PT</span>
              <span>{{ item.sourceText }}</span>
            </div>
          </div>
          <button
            class="recent-history__reuse"
            @click="reuseHistoryItem(item)"
            title="Reutilizar esta frase"
            aria-label="Reutilizar"
          >
            <AppIcon name="refresh" :size="14" />
            <span>Reutilizar</span>
          </button>
        </article>

        <div v-if="filteredHistory.length === 0" class="recent-history__empty">
          <AppIcon name="book" :size="32" />
          <p>
            {{
              history.items.length === 0
                ? 'Nenhuma tradução ainda. Use o campo acima para começar.'
                : 'Nenhum resultado para os filtros aplicados.'
            }}
          </p>
        </div>
      </div>
    </section>

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
  background: var(--color-primary-gradient);
  border-radius: var(--radius-xl);
  color: #fff;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-primary);
}

.hero__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.15s ease, transform 0.15s ease;
  backdrop-filter: blur(4px);
}

.hero__close:hover {
  background: rgba(255, 255, 255, 0.32);
  transform: scale(1.08);
}

.hero__close:active {
  transform: scale(0.95);
}

.hero__close:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.hero__content {
  flex: 1;
  z-index: 1;
}

/* ───── Hero fade transition ───── */
.hero-enter-active,
.hero-leave-active {
  transition: opacity 0.32s ease, transform 0.32s ease, max-height 0.4s ease, margin-bottom 0.4s ease;
  overflow: hidden;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
  transform: translateY(-12px);
  max-height: 0;
  margin-bottom: -24px;
}

.hero-enter-to,
.hero-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 320px;
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
  background: var(--color-surface);
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
  background: var(--color-surface);
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.translator__input::placeholder {
  color: var(--color-text-soft);
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

.translator__suggestions-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
  gap: 12px;
}

.translator__suggestions small {
  color: var(--color-text-muted);
  font-weight: 600;
}

.translator__hint {
  font-size: 11px !important;
  font-weight: 500 !important;
  color: var(--color-text-soft) !important;
  font-style: italic;
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

.chip--suggestion {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.chip--suggestion:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--color-shadow-primary);
}

:root[data-theme='dark'] .chip--suggestion:hover:not(:disabled) {
  color: #0b1220;
}

.chip--suggestion:active:not(:disabled) {
  transform: translateY(0);
}

.chip--suggestion:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chip--suggestion.is-loading {
  background: var(--color-primary);
  color: var(--color-text-inverse);
}

:root[data-theme='dark'] .chip--suggestion.is-loading {
  color: #0b1220;
}

.chip__icon {
  flex-shrink: 0;
}

.translator__error {
  color: var(--color-danger);
  font-size: 13px;
  margin: 0;
}

.result-empty {
  background: var(--color-surface);
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
  background: var(--color-surface);
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
  background: var(--color-surface-2);
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
  background: var(--color-danger-soft);
  border: 1px solid var(--color-danger-border);
  color: var(--color-danger-text);
  padding: 10px 12px;
  border-radius: var(--radius-md);
  margin: 0;
  font-style: italic;
}

.correction-fixed {
  background: var(--color-correction-fixed-bg);
  border: 1px solid var(--color-correction-fixed-border);
  color: var(--color-success-text);
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
  color: var(--color-text-inverse);
}

:root[data-theme='dark'] .btn-audio--primary {
  color: #0b1220;
}

.btn-audio--primary:hover {
  background: var(--color-primary-hover);
}

.result-card__tip {
  display: flex;
  gap: 12px;
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
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
  color: var(--color-tip-strong);
  margin-bottom: 4px;
}

.result-card__tip p {
  margin: 0;
  font-size: 13px;
  color: var(--color-tip-text);
  line-height: 1.5;
}

/* ───── Recent History ───── */
.recent-history {
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.recent-history__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.recent-history__head h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.recent-history__head-icon {
  color: var(--color-primary);
}

.recent-history__head p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.recent-history__clear {
  padding: 8px 14px;
  font-size: 13px;
}

.recent-history__filters {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.recent-history__search {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.recent-history__search input {
  width: 100%;
  padding: 8px 12px 8px 34px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  background: var(--color-bg-alt);
  font-size: 13px;
  color: var(--color-text);
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}

.recent-history__search input:focus {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.recent-history__search :deep(.icon) {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-soft);
}

.recent-history__chips {
  display: flex;
  gap: 6px;
}

.recent-history__chip {
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--color-border-soft);
  transition: all 0.15s ease;
}

.recent-history__chip:hover {
  color: var(--color-text);
}

.recent-history__chip.active {
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-color: var(--color-primary-soft2);
}

.recent-history__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 440px;
  overflow-y: auto;
  padding-right: 4px;
}

.recent-history__item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 12px;
  padding: 12px 14px;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  transition: border-color 0.15s, background 0.15s;
}

.recent-history__item:hover {
  border-color: var(--color-primary-soft2);
  background: var(--color-bg-alt);
}

.recent-history__meta {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.recent-history__time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.recent-history__fav {
  margin-left: auto;
  width: 26px;
  height: 26px;
}

.recent-history__fav.is-fav {
  color: var(--color-accent);
}

.recent-history__fav.is-fav :deep(path) {
  fill: currentColor;
}

.recent-history__lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.recent-history__line {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  min-width: 0;
}

.recent-history__line--fr em {
  color: var(--color-text);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-history__line--pt span:last-child {
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-history__reuse {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  transition: background 0.15s;
  white-space: nowrap;
}

.recent-history__reuse:hover {
  background: var(--color-primary-soft2);
}

.recent-history__empty {
  text-align: center;
  padding: 32px 20px;
  color: var(--color-text-soft);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

@media (max-width: 600px) {
  .recent-history__item {
    grid-template-columns: 1fr;
  }
  .recent-history__reuse {
    justify-self: flex-end;
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.stats__card {
  background: var(--color-surface);
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
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.stats__icon--green {
  background: var(--color-success-soft);
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
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
