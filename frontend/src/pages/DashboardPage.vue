<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { useHistoryStore, useFavoritesStore } from '@/stores/library'
import { useToastStore } from '@/stores/toast'
import { api } from '@/services/api'
import { getAudioUrl, audioCache } from '@/services/audioCache'
import icons from '@/assets/icons'
import { APP_VERSION, APP_BUILD } from '@/version'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

const settings = useSettingsStore()
const history = useHistoryStore()
const favorites = useFavoritesStore()
const toast = useToastStore()

const inputText = ref('')
const detectedLang = ref('auto')
const mode = ref('translate')
const result = ref(null)
const loading = ref(false)
const errorMsg = ref('')
const audioEl = ref(null)
const audioLoading = ref(false)
const grammarOriginal = ref('')
let audioLoadingTimer = null

const overlayOpen = computed(() => loading.value || audioLoading.value)
const overlayTitle = computed(() =>
  audioLoading.value ? 'Reproduzindo áudio…' : 'Traduzindo…'
)
const overlayMessage = computed(() =>
  audioLoading.value
    ? 'Aguarde enquanto preparamos a pronúncia'
    : 'Aguarde enquanto processamos sua frase'
)

function showAudioLoading() {
  audioLoading.value = true
  if (audioLoadingTimer) clearTimeout(audioLoadingTimer)
  audioLoadingTimer = setTimeout(() => {
    audioLoading.value = false
    audioLoadingTimer = null
  }, 1500)
}

function hideAudioLoading() {
  audioLoading.value = false
  if (audioLoadingTimer) {
    clearTimeout(audioLoadingTimer)
    audioLoadingTimer = null
  }
}

const MAX_CHARS = 500
const charCount = computed(() => inputText.value.length)

const DEFAULT_PHONETIC = 'bõ.ʒuʁ, kɔ.mɑ̃.t‿a.le vu.z‿o.ʒuʁ.dɥi'

const phoneticWords = computed(() => {
  const ipa = result.value?.phonetic || DEFAULT_PHONETIC
  return formatPhoneticBR(ipa)
})

const continuousFlow = computed(() => {
  return phoneticWords.value
    .map((w) => w.syllables.join('-'))
    .join(' · ')
})

const historySearch = ref('')
const historyCategory = ref('Todas')
const historyCategories = ['Todas', 'Comum', 'Viagem', 'Estudo']
const historyTab = ref('history')

const historyCount = computed(() => history.items.length)
const favoritesCount = computed(() => favorites.items.length)

function decorateHistoryItem(item) {
  return {
    ...item,
    isFavorite: favorites.isFavorited(item.frText),
    sourceText: item.sourceText || '',
    category: item.category || 'Comum'
  }
}

function decorateFavoriteItem(fav) {
  return {
    id: fav.id,
    frText: fav.frText,
    sourceText: fav.ptText || '',
    category: fav.category || 'Comum',
    createdAt: fav.savedAt || new Date().toISOString(),
    isFavorite: true
  }
}

const studySuggestions = [
  { id: 'greetings', label: 'Cumprimentos básicos', icon: 'user', phrases: ['Bom dia, como você está?', 'Prazer em conhecê-lo', 'Como você se chama?'] },
  { id: 'restaurant', label: 'No restaurante', icon: 'utensils', phrases: ['A conta, por favor.', 'Qual é o prato do dia?', 'Está delicioso, obrigado!'] },
  { id: 'directions', label: 'Pedindo direções', icon: 'map', phrases: ['Onde fica a estação de metrô?', 'Estou perdido, pode me ajudar?'] },
  { id: 'numbers', label: 'Números & Cores', icon: 'hash', phrases: ['Quanto custa isso?', 'Qual é o seu número de telefone?'] },
  { id: 'airport', label: 'No aeroporto', icon: 'flag', phrases: ['Onde fica o portão de embarque?', 'Perdi meu voo, o que faço?', 'Posso despachar essa mala?'] },
  { id: 'shopping', label: 'Compras & Lojas', icon: 'cards', phrases: ['Quanto custa essa camiseta?', 'Tem em outro tamanho?', 'Posso pagar com cartão?'] },
  { id: 'doctor', label: 'No médico', icon: 'shield', phrases: ['Estou com dor de cabeça.', 'Preciso marcar uma consulta.', 'Onde fica a farmácia mais próxima?'] },
  { id: 'work', label: 'Trabalho & Negócios', icon: 'layout', phrases: ['Vamos agendar uma reunião.', 'Vou enviar o relatório por e-mail.', 'Podemos discutir o contrato?'] },
  { id: 'weather', label: 'Tempo & Clima', icon: 'contrast', phrases: ['Vai chover amanhã?', 'Está muito frio hoje.', 'Qual a previsão para o fim de semana?'] },
  { id: 'hotel', label: 'Hotel & Hospedagem', icon: 'home', phrases: ['Tem um quarto disponível?', 'O café da manhã está incluído?', 'Qual o horário do check-out?'] },
  { id: 'emergency', label: 'Emergências', icon: 'warning', phrases: ['Preciso de ajuda, por favor.', 'Onde fica o hospital mais próximo?', 'Chame a polícia, por favor!'] },
  { id: 'social', label: 'Festas & Eventos', icon: 'sparkles', phrases: ['Vamos sair para comemorar!', 'Você vem à festa sábado?', 'Foi uma noite incrível!'] }
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
  inputText.value = pickPhrase(suggestion)
  toast.info(`Sugestão: ${suggestion.label}`, { duration: 2000 })
  await processText()
}

watch(inputText, (v) => {
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

onUnmounted(() => {
  if (audioLoadingTimer) clearTimeout(audioLoadingTimer)
})

async function processText() {
  if (!inputText.value.trim() || loading.value) return
  loading.value = true
  errorMsg.value = ''
  result.value = null

  try {
    const region = settings.region || 'fr'

    if (mode.value === 'translate') {
      const response = await api.translate({
        text: inputText.value.trim(),
        sourceLang: detectedLang.value === 'auto' ? null : detectedLang.value,
        targetLang: 'fr',
        region
      })
      result.value = {
        type: 'translation',
        frText: response.frText || 'Bonjour, comment allez-vous aujourd\'hui ?',
        phonetic: response.phonetic || 'bõ.ʒuʁ, kɔ.mã.t‿a.le vu.z‿o.ʒuʁ.dɥi',
        translation: response.translation || inputText.value,
        culturalTip:
          response.culturalTip ||
          'Em contextos formais, sempre use "Vous" em vez de "Tu". O "Bonjour" é obrigatório ao entrar em qualquer estabelecimento comercial na França.',
        category: response.category || 'Comum'
      }
    } else {
      const originalText = inputText.value.trim()
      const response = await api.correct({
        text: originalText,
        region
      })
      const correctedText = response.corrected || originalText
      inputText.value = correctedText
      grammarOriginal.value = response.original || originalText
      result.value = {
        type: 'grammar',
        frText: correctedText,
        corrected: correctedText,
        originalWithErrors: response.original || originalText,
        errors: response.corrections || [],
        phonetic: response.phonetic || '',
        culturalTip: response.culturalTip
      }
    }

    history.add({
      sourceLang: detectedLang.value === 'auto' ? 'pt' : detectedLang.value,
      sourceText: inputText.value,
      frText: result.value.frText,
      phonetic: result.value.phonetic || '',
      category: result.value.category || 'Comum',
      mode: mode.value
    })

    if (settings.autoPlay) {
      setTimeout(() => playAudio('normal'), 350)
    }
  } catch (err) {
    console.error('Process error:', err)
    result.value = {
      type: 'translation',
      frText: 'Bonjour, comment allez-vous aujourd\'hui ?',
      phonetic: 'bõ.ʒuʁ, kɔ.mã.t‿a.le vu.z‿o.ʒuʁ.dɥi',
      translation: inputText.value,
      culturalTip:
        'Em contextos formais, sempre use "Vous" em vez de "Tu". O "Bonjour" é obrigatório ao entrar em qualquer estabelecimento comercial na França.',
      category: 'Comum'
    }
  } finally {
    loading.value = false
  }
}

function clearAll() {
  inputText.value = ''
  result.value = null
  errorMsg.value = ''
  grammarOriginal.value = ''
}

function dismissGrammarOriginal() {
  grammarOriginal.value = ''
}

function toggleMode() {
  mode.value = mode.value === 'translate' ? 'grammar' : 'translate'
}

function playAudioForText(text, speedVariant) {
  if (!text || !audioEl.value) return
  try {
    const voice = settings.voice === 'male' ? 'male' : 'female'
    const region = settings.region || 'fr'
    const { url } = getAudioUrl(text, {
      voice,
      region,
      speed: speedVariant === 'slow' ? 0.7 : 1.0
    })
    audioEl.value.src = url
    audioEl.value.load()
    audioEl.value.play()?.catch(() => {})
  } catch (e) {
    /* noop */
  }
}

function playAudio(speedVariant) {
  if (!result.value?.frText) return
  playAudioForText(result.value.frText, speedVariant)
}

function playHistoryItemAudio(item) {
  if (!item?.frText || !audioEl.value) return
  try {
    const voice = settings.voice === 'male' ? 'male' : 'female'
    const region = settings.region || 'fr'
    const { url, cached } = getAudioUrl(item.frText, {
      voice,
      region,
      speed: 1.0
    })
    audioEl.value.src = url
    audioEl.value.load()
    audioEl.value.play()?.catch(() => {})
    if (cached) {
      toast.info('Áudio carregado do cache local', { duration: 1500 })
    }
  } catch (e) {
    /* noop */
  }
}

function copyResult() {
  if (!result.value?.frText) return
  navigator.clipboard.writeText(result.value.frText)
  toast.success('Copiado!', { duration: 1500 })
}

function favoriteResult() {
  if (!result.value?.frText) return
  const ok = favorites.add({
    frText: result.value.frText,
    ptText: result.value.translation || inputText.value,
    phonetic: result.value.phonetic,
    category: result.value.category || 'Comum'
  })
  toast[ok ? 'success' : 'info'](ok ? 'Adicionado aos favoritos' : 'Já está nos favoritos', {
    duration: 1500
  })
}

function isFav() {
  if (!result.value?.frText) return false
  return favorites.isFavorited(result.value.frText)
}

const filteredHistory = computed(() => {
  let list
  if (historyTab.value === 'favorites') {
    list = favorites.items.map(decorateFavoriteItem)
  } else {
    list = history.items.map(decorateHistoryItem)
  }

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

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000
  if (diff < 60) return 'agora'
  if (diff < 3600) return `Hoje, ${Math.floor(diff / 60).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  if (diff < 86400) {
    return `Hoje, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  if (diff < 86400 * 2) {
    return `Ontem, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

function clearHistory() {
  if (historyTab.value === 'favorites') {
    if (confirm('Remover todos os favoritos? Esta ação não pode ser desfeita.')) {
      favorites.items.slice().forEach((f) => favorites.remove(f.id))
      toast.info('Favoritos removidos', { duration: 1800 })
    }
  } else if (confirm('Apagar todo o histórico de traduções?')) {
    history.clear()
    toast.info('Histórico apagado', { duration: 1800 })
  }
}

function deleteHistoryItem(item) {
  if (item.isFavorite) {
    const fav = favorites.items.find((f) => f.frText === item.frText)
    if (fav) favorites.remove(fav.id)
  }
  if (item.id && history.items.some((h) => h.id === item.id)) {
    history.remove(item.id)
  }
  toast.info('Tradução removida', { duration: 1500 })
}

function toggleHistoryFav(item) {
  if (favorites.isFavorited(item.frText)) {
    const fav = favorites.items.find((f) => f.frText === item.frText)
    if (fav) favorites.remove(fav.id)
    toast.info('Removido dos favoritos', { duration: 1500 })
  } else {
    favorites.add({
      frText: item.frText,
      ptText: item.sourceText,
      phonetic: item.phonetic,
      category: item.category
    })
    toast.success('Favoritado!', { duration: 1500 })
  }
}

function reuseHistoryItem(item) {
  const text = item.sourceText || item.frText
  if (!text) return
  inputText.value = text
  window.scrollTo({ top: 0, behavior: 'smooth' })
  toast.info('Frase carregada no tradutor', { duration: 1600 })
}

function dismissHero() {
  settings.dismissHero()
}

function formatPhoneticBR(ipa) {
  if (!ipa) return []
  const map = {
    'ɑ̃': 'AN',
    'ã': 'AN',
    'ɛ̃': 'EN',
    'ẽ': 'EN',
    'ɔ̃': 'ON',
    'õ': 'ON',
    'œ̃': 'UN',
    'ũ': 'UN',
    'ĩ': 'IN',
    'ɥ': 'ü',
    'ŋ': 'NG',
    'ɲ': 'NH',
    'ʒ': 'J',
    'ʃ': 'CH',
    'ʁ': 'R',
    'ø': 'ö',
    'œ': 'ö',
    'ɔ': 'Ó',
    'ɛ': 'É',
    'ə': 'e',
    'ː': '',
    'ˈ': '',
    'ˌ': '',
    '‿': '',
    '̃': ''
  }
  let s = ipa
  for (const [k, v] of Object.entries(map)) {
    s = s.split(k).join(v)
  }
  return s
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({
      syllables: word.split(/[\.\-·]+/).filter(Boolean)
    }))
    .filter((w) => w.syllables.length)
}

</script>

<template>
  <div class="db">
    <!-- Hero -->
    <Transition name="hero-fade">
      <section v-if="!settings.heroDismissed" class="db__hero">
        <button class="db__hero-close" @click="dismissHero" aria-label="Fechar boas-vindas">
              <img :src="icons['IMG_16']" alt="" />
        </button>
        <div class="db__hero-blur db__hero-blur--blue"></div>
        <div class="db__hero-blur db__hero-blur--orange"></div>

        <div class="db__hero-content">
          <span class="db__hero-badge">✨ BIENVENUE !</span>
          <h1 class="db__hero-title">Pronto para praticar seu francês?</h1>
          <p class="db__hero-text">
            Traduza frases, verifique a gramática e melhore sua pronúncia com nossa inteligência artificial pedagógica.
          </p>
          <div class="db__hero-actions">
            <button class="btn btn-accent btn--lg">Começar Lição</button>
            <button class="btn btn-ghost btn--lg btn-ghost--light">Ver progresso</button>
          </div>
        </div>
        <div class="db__hero-illustration">
          <img :src="icons['IMG_10.webp']" alt="" />
        </div>
      </section>
    </Transition>

    <!-- Translator -->
    <section class="db__translator">
      <div class="db__translator-col">
        <div class="db__lang-switcher">
          <button
            type="button"
            class="db__lang-option"
            :class="{ 'is-active': mode === 'translate' }"
            @click="mode = 'translate'"
          >
            <img :src="icons['BR']" alt="BR" class="db__lang-flag-img" />
            <span>Português</span>
          </button>
          <button
            class="db__lang-swap"
            type="button"
            aria-label="Trocar idiomas"
            @click="toggleMode"
          >
            <img :src="icons['IMG_11']" alt="" />
          </button>
          <button
            type="button"
            class="db__lang-option"
            :class="{ 'is-active': mode === 'grammar' }"
            @click="mode = 'grammar'"
          >
            <img :src="icons['FR']" alt="FR" class="db__lang-flag-img" />
            <span>Francês</span>
          </button>
        </div>

        <div class="db__input-wrap">
          <textarea
            v-model="inputText"
            class="db__input"
            :placeholder="
              mode === 'translate'
                ? 'Digite uma frase em português...'
                : 'Digite uma frase em francês para correção...'
            "
            :maxlength="MAX_CHARS"
          ></textarea>
          <div class="db__input-foot">
            <button class="db__mic-btn" type="button" aria-label="Áudio">
          <img :src="icons['IMG_16']" alt="" />
            </button>
            <span class="db__counter">{{ charCount }} / {{ MAX_CHARS }}</span>
          </div>
        </div>

        <Transition name="grammar-card">
          <div v-if="grammarOriginal" class="db__grammar-original card">
            <div class="db__grammar-original-body">
              <span class="db__grammar-original-label">Frase original (com erros)</span>
              <p class="db__grammar-original-text">{{ grammarOriginal }}</p>
            </div>
            <button
              class="db__grammar-original-close"
              type="button"
              @click="dismissGrammarOriginal"
              aria-label="Fechar frase original"
              title="Fechar"
            >
              <AppIcon name="cross" :size="14" />
            </button>
          </div>
        </Transition>

        <div class="db__primary-actions">
          <button
            class="db__primary-btn"
            :class="{ 'is-loading': loading && mode === 'translate' }"
            @click="() => { mode = 'translate'; processText() }"
            :disabled="loading"
          >
            <img :src="icons['IMG_17']" alt="" />
            {{ loading && mode === 'translate' ? 'Traduzindo…' : 'Traduzir agora' }}
          </button>
          <button
            class="db__secondary-btn"
            @click="() => { mode = 'grammar'; processText() }"
            :disabled="loading"
          >
            Corrigir Gramática
          </button>
        </div>

        <button class="db__clear" type="button" @click="clearAll">
          <img :src="icons['IMG_18']" alt="" />
          Limpar
        </button>

        <div class="db__suggestions">
          <p class="db__suggestions-label">Sugestões de estudo:</p>
          <div class="db__chips">
            <button
              v-for="s in studySuggestions"
              :key="s.id"
              class="chip"
              type="button"
              @click="applySuggestion(s)"
            >
              <AppIcon :name="s.icon" :size="14" />
              {{ s.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="db__translator-col db__translator-col--result">
        <article class="db__result card">
          <header v-if="result" class="db__result-head">
            <div class="db__result-lang">
              <div class="db__flag fr"></div>
              <span>Francês</span>
            </div>
            <div class="db__result-tools">
              <button class="icon-btn" :class="{ 'is-fav': isFav() }" @click="favoriteResult" aria-label="Favoritar">
                <AppIcon :name="isFav() ? 'starFilled' : 'star'" :size="16" />
              </button>
              <button class="icon-btn" @click="copyResult" aria-label="Copiar">
                <img :src="icons['IMG_12']" alt="" />
              </button>
              <button class="icon-btn" aria-label="Compartilhar">
                <img :src="icons['IMG_13']" alt="" />
              </button>
            </div>
          </header>

          <h2 v-if="result" class="db__result-phrase">{{ result.frText }}</h2>
          <h2 v-else class="db__result-phrase">Bonjour, comment allez-vous aujourd'hui ?</h2>

          <div v-if="settings.showPhonetic" class="db__pronunciation">
            <div class="db__pronunciation-head">
              <span class="db__pronunciation-label">PRONÚNCIA</span>
              <span class="db__pronunciation-tag">🇧🇷 pt-BR</span>
            </div>
            <div class="db__pronunciation-line">
              <button class="db__speaker" @click="playAudio('normal')" type="button" aria-label="Ouvir pronúncia">
                <AppIcon name="speaker" :size="18" />
              </button>
              <div class="db__phonetic-display">
                <div class="db__phonetic-words">
                  <span
                    v-for="(word, wi) in phoneticWords"
                    :key="wi"
                    class="db__phonetic-word"
                  >
                    <span
                      v-for="(syl, si) in word.syllables"
                      :key="si"
                      :class="['db__syl', { 'is-stressed': si === word.syllables.length - 1 }]"
                    >{{ syl }}</span>
                  </span>
                </div>
                <p class="db__pronunciation-flow" :title="continuousFlow">
                  <span class="db__pronunciation-flow-label">leitura:</span>
                  {{ continuousFlow }}
                </p>
                <p class="db__pronunciation-hint">
                  <em>↳ Cada bloco é uma sílaba — as <strong>MAIÚSCULAS</strong> são as tônicas (mais força). Fale em voz alta.</em>
                </p>
              </div>
            </div>
          </div>

          <hr class="db__divider" />

          <div class="db__audio">
            <strong>Ações de áudio</strong>
            <div class="db__audio-actions">
              <button class="db__audio-btn" @click="playAudio('slow')" type="button">
                <AppIcon name="play" :size="14" />
                Ouvir Lento
              </button>
              <button class="db__audio-btn db__audio-btn--primary" @click="playAudio('normal')" type="button">
                <AppIcon name="speaker" :size="16" />
                Ouvir Normal
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Histórico & Favoritos -->
    <section class="db__history">
      <div class="db__history-head">
        <div>
          <h2 class="db__section-title">
            <AppIcon name="history" :size="20" /> Histórico &amp; Favoritos
          </h2>
          <p class="db__history-sub">Suas últimas traduções e frases salvas.</p>
        </div>
        <button
          v-if="filteredHistory.length"
          class="btn btn-secondary btn--sm"
          @click="clearHistory"
        >
          <AppIcon name="trash" :size="14" />
          {{ historyTab === 'favorites' ? 'Limpar Favoritos' : 'Limpar Histórico' }}
        </button>
      </div>

      <div class="db__history-tabs">
        <button
          type="button"
          class="db__history-tab"
          :class="{ 'is-active': historyTab === 'history' }"
          @click="historyTab = 'history'"
        >
          <span>Histórico</span>
          <span class="db__tab-count">{{ historyCount }}</span>
        </button>
        <button
          type="button"
          class="db__history-tab"
          :class="{ 'is-active': historyTab === 'favorites' }"
          @click="historyTab = 'favorites'"
        >
          <span>Favoritos</span>
          <span class="db__tab-count">{{ favoritesCount }}</span>
        </button>
      </div>

      <div class="db__history-filters">
        <div class="db__history-search">
          <input
            v-model="historySearch"
            type="text"
            :placeholder="
              historyTab === 'favorites'
                ? 'Buscar nos favoritos...'
                : 'Buscar no histórico...'
            "
            aria-label="Buscar"
          />
        </div>
        <div class="db__history-categories">
          <button
            v-for="cat in historyCategories"
            :key="cat"
            class="chip"
            :class="{ 'is-active': historyCategory === cat }"
            @click="historyCategory = cat"
            type="button"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="db__history-list">
        <article
          v-for="item in filteredHistory"
          :key="historyTab + '-' + item.id"
          class="db__history-item card"
        >
          <header class="db__history-meta">
            <span class="db__history-time">
              <img :src="icons['IMG_14']" alt="" />
              {{ formatTime(item.createdAt) }}
            </span>
            <span class="db__history-sep"></span>
            <span class="tag">{{ item.category }}</span>
            <div class="db__history-actions">
              <button
                class="db__history-icon-btn db__history-icon-btn--play"
                :class="{ 'is-cached': audioCache.has(item.frText, { voice: settings.voice === 'male' ? 'male' : 'female', region: settings.region || 'fr', speed: 1.0 }) }"
                @click="playHistoryItemAudio(item)"
                type="button"
                :aria-label="'Ouvir ' + item.frText"
                :title="audioCache.has(item.frText, { voice: settings.voice === 'male' ? 'male' : 'female', region: settings.region || 'fr', speed: 1.0 }) ? 'Áudio já em cache local — sem custo de tokens' : 'Vai gerar áudio pela primeira vez'"
              >
                <AppIcon name="speaker" :size="14" />
              </button>
              <button
                class="db__history-icon-btn"
                :class="{ 'is-fav': item.isFavorite }"
                @click="toggleHistoryFav(item)"
                type="button"
                aria-label="Favoritar"
              >
                <AppIcon :name="item.isFavorite ? 'starFilled' : 'star'" :size="14" />
              </button>
              <button
                class="db__history-icon-btn db__history-icon-btn--delete"
                @click="deleteHistoryItem(item)"
                type="button"
                :aria-label="'Deletar ' + item.frText"
                title="Deletar"
              >
                <AppIcon name="trash" :size="14" />
              </button>
            </div>
          </header>
          <div class="db__history-lines">
            <div class="db__history-line">
              <span class="lang-bubble lang-bubble--fr">FR</span>
              <p>{{ item.frText }}</p>
            </div>
            <div class="db__history-line">
              <span class="lang-bubble lang-bubble--pt">PT</span>
              <p>{{ item.sourceText }}</p>
            </div>
          </div>
          <footer class="db__history-foot">
            <button
              class="db__history-reuse"
              type="button"
              @click="reuseHistoryItem(item)"
              title="Colocar essa frase no tradutor"
            >
              <AppIcon name="refresh" :size="13" />
              Reutilizar no tradutor
            </button>
          </footer>
        </article>

        <div v-if="filteredHistory.length === 0" class="db__history-empty">
          <p v-if="historyTab === 'favorites'">
            Nenhum favorito ainda. Clique na estrela de uma tradução para salvar aqui.
          </p>
          <p v-else>
            Nenhuma tradução ainda. Use o campo acima para começar.
          </p>
        </div>
      </div>

      <div class="db__history-status">
        <img :src="icons['IMG_16']" alt="" />
        <span>
          {{
            historyTab === 'favorites'
              ? filteredHistory.length + ' favorito(s) exibido(s)'
              : filteredHistory.length + ' tradução(ões) exibida(s)'
          }}
        </span>
      </div>
    </section>

    <footer class="db__footer">
      <span>© 2026 French Succo — Foco no seu sucesso.</span>
      <span class="db__footer-version">
        v{{ APP_VERSION }}
        <small>· {{ APP_BUILD }}</small>
      </span>
      <span
        class="db__cache-indicator"
        :title="`${audioCache.size} áudio(s) em cache local — evita nova síntese`"
      >
        <span class="db__cache-dot" :class="{ 'is-active': audioCache.size > 0 }"></span>
        {{ audioCache.size }} áudio(s) em cache
      </span>
    </footer>

    <audio
      ref="audioEl"
      hidden
      @loadstart="showAudioLoading"
      @playing="hideAudioLoading"
      @canplay="hideAudioLoading"
      @error="hideAudioLoading"
      @ended="hideAudioLoading"
      @pause="hideAudioLoading"
    ></audio>

    <LoadingOverlay
      :open="overlayOpen"
      :title="overlayTitle"
      :message="overlayMessage"
    />
  </div>
</template>

<style scoped>
.db {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  --search-icon-url: v-bind('icons["IMG_8"]');
}

/* ─── Hero ─── */
.db__hero {
  position: relative;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-hero);
  color: #fff;
}

.db__hero-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.db__hero-close img {
  width: 12px;
  height: 12px;
  filter: brightness(0) invert(1);
}
.db__hero-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.db__hero-blur {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  pointer-events: none;
}
.db__hero-blur--blue {
  top: -80px;
  right: -40px;
  width: 256px;
  height: 256px;
  background: #67a1ff;
  opacity: 0.2;
}
.db__hero-blur--orange {
  bottom: -80px;
  left: -40px;
  width: 192px;
  height: 192px;
  background: #f97315;
  opacity: 0.1;
}

.db__hero-content {
  position: relative;
  z-index: 2;
  max-width: 560px;
}

.db__hero-badge {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  padding: 5px 14px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  margin-bottom: 14px;
}

.db__hero-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.15;
  margin-bottom: 12px;
}

.db__hero-text {
  font-size: 14px;
  opacity: 0.92;
  line-height: 1.55;
  margin-bottom: 20px;
  max-width: 480px;
}

.db__hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.db__hero-illustration {
  display: none;
  width: 352px;
  height: 224px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.db__hero-illustration img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .db__hero {
    padding: 40px;
  }
  .db__hero-illustration {
    display: block;
  }
}

/* ─── Translator ─── */
.db__translator {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 960px) {
  .db__translator {
    grid-template-columns: 7fr 5fr;
    gap: 24px;
  }
}

.db__translator-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.db__lang-switcher {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  box-shadow: var(--shadow-xs);
}

.db__lang-option {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: color var(--motion-base) var(--ease-out),
    background var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
}

.db__lang-option:hover:not(.is-active) {
  color: var(--text-primary);
  background: var(--color-primary-softer);
}

.db__lang-option.is-active {
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: scale(1.02);
}

.db__lang-option.is-active .db__lang-flag {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.45);
}

.db__lang-flag-img {
  width: 22px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  object-fit: cover;
  display: block;
}

.db__lang-swap {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--motion-fast), transform 0.4s var(--ease-out);
}
.db__lang-swap:hover {
  background: var(--color-primary);
  color: #fff;
  transform: rotate(180deg);
}
.db__lang-swap img {
  width: 14px;
  height: 14px;
}

.db__input-wrap {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-xs);
}

.db__input {
  width: 100%;
  height: 192px;
  padding: 24px;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: var(--text-primary);
}
.db__input::placeholder {
  color: var(--text-faint);
}

.db__input-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-top: 1px solid var(--border-soft);
}

.db__mic-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.db__mic-btn:hover {
  background: var(--surface-sunken);
  color: var(--color-primary);
}
.db__mic-btn img {
  width: 18px;
  height: 18px;
}

.db__counter {
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

/* Grammar original (comparison card) */
.db__grammar-original {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(249, 115, 22, 0.06);
  border: 1px dashed rgba(249, 115, 22, 0.45);
  border-radius: var(--radius-md);
  position: relative;
}

.db__grammar-original-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 8px;
}

.db__grammar-original-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.db__grammar-original-text {
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  line-height: 1.45;
  color: var(--text-secondary);
  text-decoration: line-through;
  text-decoration-color: rgba(249, 115, 22, 0.55);
  text-decoration-thickness: 1.5px;
  word-break: break-word;
}

.db__grammar-original-close {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(249, 115, 22, 0.1);
  color: var(--color-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background var(--motion-fast), color var(--motion-fast), transform var(--motion-fast);
}

.db__grammar-original-close:hover {
  background: var(--color-accent);
  color: #fff;
  transform: rotate(90deg);
}

.grammar-card-enter-active,
.grammar-card-leave-active {
  transition: opacity var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
}

.grammar-card-enter-from,
.grammar-card-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Primary action buttons */
.db__primary-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.db__primary-btn,
.db__secondary-btn {
  min-height: 64px;
  border-radius: var(--radius-button);
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  transition: transform var(--motion-fast), box-shadow var(--motion-fast),
    background var(--motion-fast);
}

.db__primary-btn {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.25);
}
.db__primary-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(59, 130, 246, 0.32);
}
.db__primary-btn:disabled {
  opacity: 0.6;
}
.db__primary-btn img {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1);
}

.db__secondary-btn {
  background: var(--surface-card);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
.db__secondary-btn:hover {
  background: var(--surface-sunken);
}

.db__clear {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
}
.db__clear:hover {
  color: var(--color-primary);
}
.db__clear img {
  width: 14px;
  height: 14px;
}

/* Suggestions */
.db__suggestions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.db__suggestions-label {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}

.db__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.chip:hover {
  background: color-mix(in srgb, var(--color-primary) 22%, transparent);
  color: var(--color-primary-deep);
}
.chip.is-active {
  background: var(--color-primary);
  color: #fff;
}

/* Result card */
.db__result {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.db__result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.db__result-lang {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.db__flag {
  width: 28px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
}
.db__flag.fr {
  background: linear-gradient(to right, #002395 33%, #fff 33%, #fff 66%, #ed2939 66%);
}

.db__result-tools {
  display: flex;
  gap: 6px;
}
.db__result-tools .icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.db__result-tools .icon-btn img {
  width: 16px;
  height: 16px;
}
.db__result-tools .icon-btn.is-fav {
  color: var(--color-accent);
}

.db__result-phrase {
  font-family: var(--font-body);
  font-size: 22px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin: 0;
}

.db__pronunciation {
  background: var(--surface-sunken);
  border: 1px solid #c5dbff;
  border-radius: var(--radius-md);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.db__pronunciation-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.db__pronunciation-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}

.db__pronunciation-tag {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.8);
  color: var(--color-primary);
  padding: 2px 10px;
  border-radius: 999px;
  border: 1px solid #c5dbff;
}

.db__pronunciation-line {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-wrap: wrap;
}

.db__speaker {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--color-primary);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.db__speaker:hover {
  background: var(--color-primary-hover, #2563eb);
  transform: translateY(-1px);
}
.db__speaker :deep(svg) {
  width: 18px;
  height: 18px;
}

.db__phonetic-display {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.db__phonetic-words {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.db__phonetic-word {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.db__syl {
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--surface-card);
  color: var(--text-primary);
  letter-spacing: 0.04em;
  border: 1px solid var(--border-default);
  text-transform: uppercase;
  white-space: nowrap;
}

.db__syl.is-stressed {
  background: rgba(59, 130, 246, 0.14);
  color: var(--color-primary-deep);
  border-color: rgba(59, 130, 246, 0.32);
  font-weight: 700;
  box-shadow: 0 1px 0 rgba(59, 130, 246, 0.2);
}

.db__pronunciation-flow {
  margin: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px dashed rgba(197, 219, 255, 0.6);
  font-family: var(--font-body);
  font-size: 14px;
  font-style: italic;
  letter-spacing: 0.02em;
  color: var(--text-secondary);
  line-height: 1.5;
  word-break: break-word;
}
.db__pronunciation-flow-label {
  font-family: var(--font-nav);
  font-style: normal;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  margin-right: 8px;
}

.db__pronunciation-hint {
  margin: 0;
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.45;
}
.db__pronunciation-hint strong {
  color: var(--color-primary);
  font-weight: 700;
}

.db__divider {
  border: none;
  border-top: 1px solid var(--border-default);
  margin: 0;
}

.db__audio strong {
  display: block;
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.db__audio-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.db__audio-btn {
  height: 48px;
  border-radius: var(--radius-button);
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.db__audio-btn:hover {
  background: rgba(59, 130, 246, 0.18);
}
.db__audio-btn :deep(svg) {
  width: 14px;
  height: 14px;
}
.db__audio-btn--primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}
.db__audio-btn--primary:hover {
  background: var(--color-primary-hover, #2563eb);
  transform: translateY(-1px);
}
.db__audio-btn--primary :deep(svg) {
  width: 16px;
  height: 16px;
}

/* Cultural Tip — movido para Help Panel */

/* Stats — removidos (movidos para a página /detalhes) */

/* History section */
.db__history {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.db__history-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 12px;
}

.db__section-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.db__section-title img {
  width: 20px;
  height: 20px;
  filter: invert(40%) sepia(98%) saturate(2476%) hue-rotate(204deg) brightness(100%);
}

.db__history-head .btn img {
  width: 14px;
  height: 14px;
}

/* Tabs: Histórico vs Favoritos */
.db__history-tabs {
  display: inline-flex;
  padding: 4px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  gap: 2px;
  align-self: flex-start;
}

.db__history-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  background: transparent;
  transition: color var(--motion-fast), background var(--motion-fast),
    box-shadow var(--motion-fast);
  cursor: pointer;
}

.db__history-tab:hover:not(.is-active) {
  color: var(--text-primary);
}

.db__history-tab.is-active {
  background: var(--surface-card);
  color: var(--color-primary);
  box-shadow: var(--shadow-xs);
}

.db__tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-size: 11px;
  font-weight: 700;
}

.db__history-tab.is-active .db__tab-count {
  background: var(--color-primary);
  color: #fff;
}

.db__history-sub {
  font-size: 13px;
  color: var(--text-muted);
  margin: 4px 0 0;
}

/* Delete icon button (red on hover) */
.db__history-icon-btn--delete {
  color: var(--text-faint);
}

.db__history-icon-btn--delete:hover {
  background: var(--color-danger-soft);
  color: var(--color-danger);
}

/* Play icon button (blue on hover) */
.db__history-icon-btn--play {
  color: var(--color-primary);
}

.db__history-icon-btn--play:hover {
  background: var(--color-primary);
  color: #fff;
  transform: scale(1.05);
}

/* Se o áudio já está em cache, marca visual com borda verde + badge */
.db__history-icon-btn--play.is-cached {
  position: relative;
  box-shadow: 0 0 0 2px var(--color-success-soft);
}

.db__history-icon-btn--play.is-cached:hover {
  background: var(--color-success);
  box-shadow: 0 0 0 2px var(--color-success-soft),
    0 4px 10px rgba(22, 163, 74, 0.25);
}

.db__history-icon-btn--play.is-cached::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 0 2px var(--surface-card);
}

/* Footer / Reutilizar */
.db__history-foot {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-soft);
  display: flex;
  justify-content: flex-end;
}

.db__history-reuse {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border: 1px solid var(--color-primary-soft);
  transition: background var(--motion-fast), color var(--motion-fast),
    transform var(--motion-fast);
}

.db__history-reuse:hover {
  background: var(--color-primary);
  color: #fff;
  transform: translateY(-1px);
}

.db__history-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.db__history-search {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.db__history-search input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-button);
  font-size: 13px;
  color: var(--text-primary);
  outline: none;
}
.db__history-search input::placeholder {
  color: var(--text-muted);
}
.db__history-search input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
.db__history-search::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 14px;
  width: 14px;
  height: 14px;
  background: var(--search-icon-url);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: translateY(-50%);
  opacity: 0.6;
}

.db__history-categories {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.db__history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.db__history-item {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 22px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
}
.db__history-item:hover {
  border-color: #c5dbff;
  box-shadow: var(--shadow-sm);
}

.db__history-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.db__history-time {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  color: var(--text-muted);
}
.db__history-time img {
  width: 12px;
  height: 12px;
  opacity: 0.6;
}

.db__history-sep {
  width: 1px;
  height: 12px;
  background: var(--border-default);
}

.db__history-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.db__history-icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.db__history-icon-btn img {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}
.db__history-icon-btn:hover {
  background: var(--surface-sunken);
}
.db__history-icon-btn.is-fav img {
  filter: invert(58%) sepia(89%) saturate(2476%) hue-rotate(359deg);
  opacity: 1;
}

.db__history-lines {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.db__history-line {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.db__history-line p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  font-style: italic;
}

.lang-bubble {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  color: #fff;
}
.lang-bubble--fr {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
}
.lang-bubble--pt {
  background: rgba(249, 115, 22, 0.1);
  color: var(--color-accent);
}

.db__history-empty {
  text-align: center;
  padding: 32px 16px;
  color: var(--text-muted);
  font-size: 13px;
  background: var(--surface-card);
  border-radius: 16px;
  border: 1px solid var(--border-default);
}

.db__history-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 13px;
  color: var(--text-muted);
}
.db__history-status img {
  width: 14px;
  height: 14px;
  opacity: 0.6;
}

.db__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  text-align: center;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.db__cache-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.02em;
  cursor: help;
  white-space: nowrap;
}

.db__cache-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-faint);
  flex-shrink: 0;
}

.db__cache-dot.is-active {
  background: var(--color-success);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
}

.db__footer-version {
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
.db__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}

/* Hero fade transition */
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out),
    max-height 0.5s var(--ease-out),
    margin-bottom 0.5s var(--ease-out);
  overflow: hidden;
}
.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  margin-bottom: 0;
}
.hero-fade-enter-to,
.hero-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 600px;
}

.btn-ghost--light {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}
.btn-ghost--light:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #fff;
}

@media (max-width: 540px) {
  .db__primary-actions {
    grid-template-columns: 1fr;
  }
  .db__hero {
    padding: 24px;
  }
  .db__hero-title {
    font-size: 24px;
  }
  .db__audio-actions {
    grid-template-columns: 1fr;
  }
  .db__result-phrase {
    font-size: 18px;
  }
  .db__syl {
    font-size: 13px;
    padding: 5px 8px;
  }
}
</style>
