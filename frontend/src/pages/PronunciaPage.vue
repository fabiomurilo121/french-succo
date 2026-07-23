<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'
import { getAudioUrl } from '@/services/audioCache'

const settings = useSettingsStore()

const groups = [
  {
    combo: 'AI',
    sound: 'É',
    description: 'Combinação que produz o som aberto "é"',
    examples: [
      { fr: 'Maison',  pt: 'casa' },
      { fr: "J'ai",   pt: 'eu tenho' },
      { fr: 'Lait',   pt: 'leite' }
    ]
  },
  {
    combo: 'AU',
    sound: 'O',
    description: 'Som fechado "o" — equivale ao "ô" francês',
    examples: [
      { fr: "Aujourd'hui", pt: 'hoje' },
      { fr: 'Aussi',        pt: 'também' },
      { fr: 'Australie',    pt: 'Austrália' }
    ]
  },
  {
    combo: 'EU',
    sound: 'Ã',
    description: 'Som nasal "ã" — vogal nasalizada',
    examples: [
      { fr: 'Jeune', pt: 'jovem' },
      { fr: 'Peu',   pt: 'pouco' },
      { fr: 'Feu',   pt: 'fogo' }
    ]
  },
  {
    combo: 'OI',
    sound: 'UA',
    description: 'Som "uá" — arredondado',
    examples: [
      { fr: 'Moi',   pt: 'eu / mim' },
      { fr: 'Froid', pt: 'frio' },
      { fr: 'Loi',   pt: 'lei' }
    ]
  },
  {
    combo: 'OU',
    sound: 'U',
    description: 'Som "u" — fechado, arredondado',
    examples: [
      { fr: 'Bonjour',  pt: 'Olá' },
      { fr: 'Parcours', pt: 'percurso' },
      { fr: 'Souris',   pt: 'rato' },
      { fr: 'Couple',   pt: 'casal' },
      { fr: 'Ou',       pt: 'ou' },
      { fr: 'Où',       pt: 'onde' }
    ]
  },
  {
    combo: 'ŒU',
    sound: 'É',
    description: 'Som aberto "é" — forma ligada de "EU"',
    examples: [
      { fr: 'Professeur', pt: 'professor' },
      { fr: 'Cœur',       pt: 'coração' },
      { fr: 'Sœur',       pt: 'irmã' }
    ]
  },
  {
    combo: 'EAU',
    sound: 'O',
    description: 'Tríade que produz o som "o"',
    examples: [
      { fr: 'Eau',          pt: 'água' },
      { fr: 'Beau',         pt: 'belo' },
      { fr: 'Château',      pt: 'castelo' },
      { fr: 'Cadeau',       pt: 'presente' },
      { fr: 'Cadeaux',      pt: 'presentes' }
    ]
  }
]

const audioEl = ref(null)
const playingKey = ref(null)

function voiceOptions() {
  return {
    voice: settings.voice === 'male' ? 'male' : 'female',
    region: settings.region || 'fr',
    speed: settings.speed ?? 1.0
  }
}

function stopAll() {
  for (const g of groups) g.playing = false
  playingKey.value = null
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
}

function play(fr, key) {
  if (!fr || !audioEl.value) return
  if (playingKey.value === key) {
    stopAll()
    return
  }
  // stop any group currently playing
  for (const g of groups) g.playing = false
  playingKey.value = key
  try {
    const { url } = getAudioUrl(fr, voiceOptions())
    audioEl.value.src = url
    audioEl.value.load()
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => stopAll())
    }
  } catch (e) {
    stopAll()
  }
}

function playGroup(group) {
  if (group.playing) {
    stopAll()
    return
  }
  for (const g of groups) g.playing = false
  group.playing = true
  group.cursor = 0
  playNextInGroup(group)
}

function playNextInGroup(group) {
  if (!group.playing || group.cursor >= group.examples.length) {
    group.playing = false
    playingKey.value = null
    return
  }
  const ex = group.examples[group.cursor]
  playingKey.value = `${group.combo}-${group.cursor}`
  if (!audioEl.value) {
    group.playing = false
    playingKey.value = null
    return
  }
  try {
    const { url } = getAudioUrl(ex.fr, voiceOptions())
    audioEl.value.src = url
    audioEl.value.load()
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        group.playing = false
        playingKey.value = null
      })
    }
  } catch (e) {
    group.playing = false
    playingKey.value = null
  }
}

function onAudioEnded() {
  for (const g of groups) {
    if (g.playing) {
      g.cursor++
      playNextInGroup(g)
      return
    }
  }
  playingKey.value = null
}

function onAudioPause() {
  // If paused without reaching the end (e.g., the user paused externally)
  // the `ended` event may not fire — clear visual state on the next tick
  // unless `playNextInGroup` immediately resumed.
  setTimeout(() => {
    if (audioEl.value && audioEl.value.ended) {
      playingKey.value = null
    } else if (audioEl.value && audioEl.value.paused && audioEl.value.currentTime === 0) {
      playingKey.value = null
      for (const g of groups) g.playing = false
    }
  }, 50)
}

function onAudioError() {
  stopAll()
}

groups.forEach((g) => {
  g.playing = false
  g.cursor = 0
})

const totalExamples = computed(() => groups.reduce((sum, g) => sum + g.examples.length, 0))

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
})

onMounted(() => {})
</script>

<template>
  <div class="pr">
    <header class="pr__head">
      <div class="pr__title-block">
        <span class="pr__eyebrow">GUIA DE PRONÚNCIA</span>
        <h1 class="pr__title">Pronúncia das vogais em francês</h1>
        <p class="pr__sub">
          Descubra como as principais combinações de vogais em francês soam
          na prática. Toque em qualquer palavra para ouvir a pronúncia e
          use o botão de cada grupo para escutar todos os exemplos em sequência.
        </p>
      </div>
      <div class="pr__stats">
        <strong>{{ groups.length }}</strong>
        <small>combinações</small>
        <span class="pr__stats-divider"></span>
        <strong>{{ totalExamples }}</strong>
        <small>exemplos</small>
      </div>
    </header>

    <section class="pr__intro card">
      <AppIcon name="info" :size="16" />
      <p>
        O francês tem várias combinações de letras que sempre produzem o
        <strong>mesmo som</strong>. Aprender essas combinações é o atalho
        mais rápido para ler qualquer palavra em voz alta.
      </p>
    </section>

    <article
      v-for="group in groups"
      :key="group.combo"
      class="pr__group card"
      :class="{ 'is-playing': group.playing }"
    >
      <header class="pr__group-head">
        <div class="pr__group-combo">
          <span class="pr__group-combo-label">Combinação</span>
          <strong>{{ group.combo }}</strong>
        </div>
        <div class="pr__group-sound">
          <span class="pr__group-sound-label">Som de</span>
          <strong class="pr__group-sound-value">"{{ group.sound }}"</strong>
        </div>
        <button
          type="button"
          class="pr__group-play"
          :class="{ 'is-playing': group.playing }"
          @click="playGroup(group)"
          :aria-label="group.playing ? 'Parar reprodução do grupo' : `Ouvir todos os exemplos de ${group.combo}`"
        >
          <AppIcon :name="group.playing ? 'pause' : 'play'" :size="14" />
          {{ group.playing ? 'Parar' : 'Ouvir grupo' }}
        </button>
      </header>

      <p class="pr__group-desc">{{ group.description }}</p>

      <ul class="pr__examples">
        <li
          v-for="(ex, idx) in group.examples"
          :key="idx"
          class="pr__example"
          :class="{
            'is-current': playingKey === `${group.combo}-${idx}`,
            'is-done': group.playing && idx < group.cursor
          }"
        >
          <button
            type="button"
            class="pr__example-play"
            :class="{ 'is-playing': playingKey === `${group.combo}-${idx}` }"
            @click="play(ex.fr, `${group.combo}-${idx}`)"
            :aria-label="`Ouvir ${ex.fr}`"
          >
            <AppIcon
              :name="playingKey === `${group.combo}-${idx}` ? 'pause' : 'speaker'"
              :size="16"
            />
          </button>
          <div class="pr__example-text">
            <strong class="pr__example-fr">{{ ex.fr }}</strong>
            <small class="pr__example-pt">{{ ex.pt }}</small>
          </div>
          <span class="pr__example-index" aria-hidden="true">{{ idx + 1 }}</span>
        </li>
      </ul>
    </article>

    <audio
      ref="audioEl"
      @ended="onAudioEnded"
      @pause="onAudioPause"
      @error="onAudioError"
      style="display: none"
    ></audio>
  </div>
</template>

<style scoped>
.pr {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-body);
  max-width: 920px;
  margin: 0 auto;
}

.pr__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.pr__eyebrow {
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

.pr__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}

.pr__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 560px;
  line-height: 1.55;
}

.pr__stats {
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
.pr__stats strong {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1;
}
.pr__stats small {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pr__stats-divider {
  width: 1px;
  height: 22px;
  background: var(--border-default);
  margin: 0 4px;
}

.pr__intro {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 18px;
  background: var(--color-primary-softer);
  border: 1px dashed var(--color-primary-soft);
  color: var(--text-secondary);
  font-size: 13.5px;
  line-height: 1.55;
}
.pr__intro :deep(svg) { color: var(--color-primary); margin-top: 2px; flex-shrink: 0; }
.pr__intro p { margin: 0; }
.pr__intro strong { color: var(--text-primary); }

/* ── Group card ── */
.pr__group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 24px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--motion-fast), box-shadow var(--motion-fast);
}
.pr__group.is-playing {
  border-color: var(--color-primary);
  box-shadow: 0 12px 28px -10px rgba(59, 130, 246, 0.3);
}

.pr__group-head {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px dashed var(--border-soft);
}

.pr__group-combo,
.pr__group-sound {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.pr__group-combo-label,
.pr__group-sound-label {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.pr__group-combo strong {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.02em;
  line-height: 1;
}
.pr__group-sound {
  align-items: flex-start;
}
.pr__group-sound-value {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
  color: var(--color-accent, #f97316);
  letter-spacing: 0.02em;
  line-height: 1;
}

.pr__group-play {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.pr__group-play:hover { background: var(--color-primary-hover, #2566eb); transform: translateY(-1px); }
.pr__group-play.is-playing {
  background: var(--color-accent, #f97316);
  animation: pr-pulse 1.2s ease-in-out infinite;
}
@keyframes pr-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
  50%      { box-shadow: 0 0 0 8px rgba(249, 115, 22, 0); }
}

.pr__group-desc {
  margin: 0;
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.pr__examples {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pr__example {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-md);
  transition: background var(--motion-fast), border-color var(--motion-fast);
}
.pr__example.is-current {
  background: var(--color-primary-softer);
  border-color: var(--color-primary);
}
.pr__example.is-done {
  opacity: 0.65;
}

.pr__example-play {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: background var(--motion-fast), transform var(--motion-fast);
}
.pr__example-play:hover { background: var(--color-primary-hover, #2566eb); transform: scale(1.05); }
.pr__example-play.is-playing {
  background: var(--color-accent, #f97316);
  animation: pr-pulse 1s ease-in-out infinite;
}

.pr__example-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}
.pr__example-fr {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.005em;
}
.pr__example-pt {
  font-size: 12px;
  color: var(--text-muted);
}

.pr__example-index {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-faint);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  padding: 3px 8px;
  border-radius: 999px;
  flex-shrink: 0;
}
.pr__example.is-current .pr__example-index {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

@media (max-width: 640px) {
  .pr__title { font-size: 22px; }
  .pr__group-head {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .pr__group-play { justify-self: flex-start; }
  .pr__group-combo strong { font-size: 24px; }
  .pr__group-sound-value { font-size: 22px; }
}
</style>
