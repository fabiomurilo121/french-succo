<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { LEVELS, LEVEL_META } from '@/data/grammarContent'
import { useToastStore } from '@/stores/toast'
import { APP_VERSION, APP_BUILD } from '@/version'

const toast = useToastStore()

const phase = ref('choose')        // 'choose' | 'study'
const selectedLevel = ref(null)
const expandedTopics = ref(new Set())
const completedTopics = ref(new Set())
const progressKey = 'french-succo:grammar-progress-v1'

const topics = computed(() =>
  selectedLevel.value ? LEVEL_META[selectedLevel.value].topics : []
)

const totalTopics = computed(() => topics.value.length)
const doneTopics = computed(() =>
  topics.value.filter((t) => completedTopics.value.has(t.id)).length
)
const pct = computed(() =>
  totalTopics.value ? Math.round((doneTopics.value / totalTopics.value) * 100) : 0
)

function loadProgress(level) {
  try {
    const raw = localStorage.getItem(progressKey)
    if (!raw) return
    const all = JSON.parse(raw)
    const ids = all[level] || []
    completedTopics.value = new Set(ids)
  } catch { /* ignore */ }
}

function saveProgress(level) {
  try {
    const raw = localStorage.getItem(progressKey)
    const all = raw ? JSON.parse(raw) : {}
    all[level] = Array.from(completedTopics.value)
    localStorage.setItem(progressKey, JSON.stringify(all))
  } catch { /* ignore quota */ }
}

function pickLevel(level) {
  if (!LEVEL_META[level]) return
  selectedLevel.value = level
  loadProgress(level)
  expandedTopics.value = new Set([topics.value[0]?.id].filter(Boolean))
  phase.value = 'study'
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function backToLevels() {
  phase.value = 'choose'
  selectedLevel.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleTopic(id) {
  const next = new Set(expandedTopics.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expandedTopics.value = next
}

function expandAll() {
  expandedTopics.value = new Set(topics.value.map((t) => t.id))
}

function collapseAll() {
  expandedTopics.value = new Set()
}

function markDone(id) {
  const next = new Set(completedTopics.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  completedTopics.value = next
  saveProgress(selectedLevel.value)
  toast[next.has(id) ? 'success' : 'info'](
    next.has(id) ? 'Tópico marcado como estudado ✓' : 'Marcado como não-estudado',
    { duration: 1200 }
  )
}

function isDone(id) { return completedTopics.value.has(id) }
function isOpen(id) { return expandedTopics.value.has(id) }

function levelStatus(level) {
  try {
    const raw = localStorage.getItem(progressKey)
    if (!raw) return 0
    const all = JSON.parse(raw)
    const ids = all[level] || []
    return ids.length
  } catch { return 0 }
}

const allStatus = computed(() => {
  const stats = {}
  for (const lvl of LEVELS) {
    stats[lvl] = levelStatus(lvl)
  }
  return stats
})

function scrollToTopic(id) {
  const el = document.getElementById(`gt-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  if (!expandedTopics.value.has(id)) toggleTopic(id)
}

onMounted(() => {})
</script>

<template>
  <div class="gr">
    <!-- Header -->
    <header class="gr__head">
      <div class="gr__title-block">
        <span class="gr__eyebrow">GRAMÁTICA FRANCESA</span>
        <h1 class="gr__title">Estude a gramática por nível CEFR</h1>
        <p class="gr__sub">
          Conteúdo extenso, organizado em sequência de estudo: do
          iniciante ao avançado. Cada nível traz seções com explicações,
          exemplos bilíngues e marcação de progresso.
        </p>
      </div>
      <div class="gr__head-side" v-if="phase === 'study'">
        <button
          type="button"
          class="gr__back"
          @click="backToLevels"
        >
          <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
          Trocar nível
        </button>
      </div>
    </header>

    <!-- Phase: choose level -->
    <template v-if="phase === 'choose'">
      <section class="gr__levels-grid">
        <button
          v-for="lvl in LEVELS"
          :key="lvl"
          type="button"
          class="gr__level-card card"
          :style="{ '--level-color': LEVEL_META[lvl].color }"
          @click="pickLevel(lvl)"
        >
          <div class="gr__level-icon">
            <AppIcon name="bookOpen" :size="30" />
          </div>
          <div class="gr__level-body">
            <div class="gr__level-head">
              <h2 class="gr__level-name">{{ LEVEL_META[lvl].label }}</h2>
              <span
                class="gr__level-tag"
                :style="{
                  background: LEVEL_META[lvl].color + '1a',
                  color: LEVEL_META[lvl].color,
                  borderColor: LEVEL_META[lvl].color + '55'
                }"
              >
                {{ LEVEL_META[lvl].topics.length }} tópicos
              </span>
            </div>
            <p class="gr__level-name-title">{{ LEVEL_META[lvl].title }}</p>
            <p class="gr__level-desc">{{ LEVEL_META[lvl].desc }}</p>
            <div class="gr__level-cta">
              <AppIcon name="play" :size="14" />
              <span>Começar estudos</span>
              <span v-if="allStatus[lvl] > 0" class="gr__level-progress">
                · {{ allStatus[lvl] }} já estudado(s)
              </span>
            </div>
          </div>
        </button>
      </section>
    </template>

    <!-- Phase: study level -->
    <template v-else>
      <!-- Progress + tools -->
      <section class="gr__progress-bar card">
        <div class="gr__progress-meta">
          <span
            class="gr__level-pill"
            :style="{
              background: LEVEL_META[selectedLevel].color + '1a',
              color: LEVEL_META[selectedLevel].color,
              borderColor: LEVEL_META[selectedLevel].color + '55'
            }"
          >
            Nível {{ LEVEL_META[selectedLevel].label }}
          </span>
          <span class="gr__progress-stats">
            <strong>{{ doneTopics }}</strong> / {{ totalTopics }} tópicos estudados
          </span>
        </div>
        <div class="gr__progress-track">
          <span
            class="gr__progress-fill"
            :style="{
              width: pct + '%',
              background: LEVEL_META[selectedLevel].color
            }"
          ></span>
        </div>
        <div class="gr__progress-tools">
          <button type="button" class="gr__tool-btn" @click="expandAll">
            <AppIcon name="layers" :size="13" />
            Expandir tudo
          </button>
          <button type="button" class="gr__tool-btn" @click="collapseAll">
            <AppIcon name="cross" :size="13" />
            Colapsar tudo
          </button>
        </div>
      </section>

      <!-- Topic nav (jump-to) -->
      <nav class="gr__topic-nav">
        <button
          v-for="(t, i) in topics"
          :key="'nav-' + t.id"
          type="button"
          class="gr__topic-nav-item"
          :class="{ 'is-done': isDone(t.id), 'is-active': isOpen(t.id) }"
          @click="scrollToTopic(t.id)"
        >
          <span class="gr__topic-nav-num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="gr__topic-nav-title">{{ t.title }}</span>
        </button>
      </nav>

      <!-- Topics list -->
      <section class="gr__topics">
        <article
          v-for="(topic, i) in topics"
          :key="topic.id"
          :id="`gt-${topic.id}`"
          class="gr__topic card"
          :class="{ 'is-open': isOpen(topic.id), 'is-done': isDone(topic.id) }"
        >
          <header class="gr__topic-head" @click="toggleTopic(topic.id)">
            <div class="gr__topic-head-left">
              <span class="gr__topic-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <h2 class="gr__topic-title">{{ topic.title }}</h2>
            </div>
            <div class="gr__topic-head-right">
              <button
                type="button"
                class="gr__topic-check"
                :class="{ 'is-done': isDone(topic.id) }"
                @click.stop="markDone(topic.id)"
                :title="isDone(topic.id) ? 'Desmarcar' : 'Marcar como estudado'"
              >
                <AppIcon :name="isDone(topic.id) ? 'check' : 'star'" :size="13" />
                {{ isDone(topic.id) ? 'Estudado' : 'Marcar estudado' }}
              </button>
              <button
                type="button"
                class="gr__topic-toggle"
                aria-label="Expandir"
              >
                <AppIcon
                  :name="isOpen(topic.id) ? 'cross' : 'arrow'"
                  :size="14"
                  :style="isOpen(topic.id) ? 'transform: rotate(45deg)' : ''"
                />
              </button>
            </div>
          </header>

          <div v-if="isOpen(topic.id)" class="gr__topic-body">
            <p class="gr__topic-summary">{{ topic.summary }}</p>

            <section
              v-for="(rule, ri) in topic.rules"
              :key="`r-${topic.id}-${ri}`"
              class="gr__rule"
            >
              <h3 class="gr__rule-label">
                <span class="gr__rule-bullet"></span>
                {{ rule.label }}
              </h3>
              <p v-if="rule.explanation" class="gr__rule-explanation">
                {{ rule.explanation }}
              </p>

              <div v-if="rule.examples && rule.examples.length" class="gr__examples">
                <div
                  v-for="(ex, ei) in rule.examples"
                  :key="`ex-${topic.id}-${ri}-${ei}`"
                  class="gr__example"
                >
                  <div class="gr__example-fr">
                    <span class="gr__lang-tag">FR</span>
                    <span>{{ ex.fr }}</span>
                  </div>
                  <div v-if="ex.pt" class="gr__example-pt">
                    <AppIcon name="arrow" :size="11" />
                    <span>{{ ex.pt }}</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </section>

      <!-- Completion celebration -->
      <section v-if="pct === 100" class="gr__complete card">
        <div class="gr__complete-icon">
          <AppIcon name="trophy" :size="36" />
        </div>
        <h2 class="gr__complete-title">Parabéns ! Você concluiu o nível {{ LEVEL_META[selectedLevel].label }} !</h2>
        <p class="gr__complete-sub">
          Todos os {{ totalTopics }} tópicos deste nível foram marcados como estudados.
        </p>
      </section>
    </template>

    <footer class="gr__footer">
      <span>© 2026 Parle-Juh — A gramática francesa, do A1 ao B2.</span>
      <span class="gr__footer-version">
        v{{ APP_VERSION }}
        <small>· {{ APP_BUILD }}</small>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.gr {
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-family: var(--font-body);
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

/* ── Head ── */
.gr__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.gr__title-block { flex: 1; min-width: 240px; }
.gr__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-accent);
  background: rgba(249, 115, 21, 0.12);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
  text-transform: uppercase;
}
.gr__title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
  color: var(--text-primary);
}
.gr__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 620px;
  line-height: 1.55;
}
.gr__head-side {
  display: inline-flex;
  gap: 8px;
}
.gr__back {
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
.gr__back:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
  background: var(--color-primary-softer);
}

/* ── Level cards (choose) ── */
.gr__levels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}
.gr__level-card {
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
.gr__level-card:hover {
  border-color: var(--level-color);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px color-mix(in srgb, var(--level-color) 30%, transparent);
}
.gr__level-icon {
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
.gr__level-card:hover .gr__level-icon {
  transform: scale(1.06) rotate(-4deg);
}
.gr__level-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gr__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.gr__level-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}
.gr__level-name-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}
.gr__level-tag {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid;
  white-space: nowrap;
}
.gr__level-desc {
  margin: 0;
  font-size: 12.5px;
  color: var(--text-muted);
  line-height: 1.5;
}
.gr__level-cta {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--level-color);
}
.gr__level-progress {
  color: var(--text-muted);
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0;
}

/* ── Progress bar (study phase) ── */
.gr__progress-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 18px !important;
  position: sticky;
  top: 70px;
  z-index: 4;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-sm);
}
.gr__progress-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.gr__level-pill {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 1px solid;
}
.gr__progress-stats {
  font-family: var(--font-nav);
  font-size: 12px;
  color: var(--text-muted);
}
.gr__progress-stats strong {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 14px;
}
.gr__progress-track {
  height: 8px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}
.gr__progress-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s var(--ease-out);
}
.gr__progress-tools {
  display: flex;
  gap: 6px;
}
.gr__tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--surface-sunken);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast);
}
.gr__tool-btn:hover {
  background: var(--surface-card);
  color: var(--text-primary);
}

/* ── Topic nav ── */
.gr__topic-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 12px 14px;
  box-shadow: var(--shadow-xs);
}
.gr__topic-nav-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid transparent;
  font-family: var(--font-nav);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast),
    border-color var(--motion-fast);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.gr__topic-nav-item:hover {
  background: var(--surface-sunken);
  color: var(--text-primary);
  border-color: var(--border-default);
}
.gr__topic-nav-item.is-done {
  color: var(--color-success);
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.35);
}
.gr__topic-nav-item.is-active {
  color: var(--color-primary);
  background: var(--color-primary-softer);
  border-color: var(--color-primary-soft);
}
.gr__topic-nav-num {
  font-family: var(--font-display);
  font-size: 11px;
  opacity: 0.7;
}
.gr__topic-nav-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ── Topics ── */
.gr__topics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gr__topic {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0 !important;
  overflow: hidden;
  border-left: 4px solid var(--border-default);
  transition: border-color var(--motion-base);
}
.gr__topic.is-open { border-left-color: var(--color-accent); }
.gr__topic.is-done {
  border-left-color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 4%, var(--surface-card));
}

.gr__topic-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  cursor: pointer;
  background: var(--surface-card);
  transition: background var(--motion-fast);
}
.gr__topic-head:hover { background: var(--surface-sunken); }

.gr__topic-head-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.gr__topic-num {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-muted);
  min-width: 32px;
  text-align: center;
  background: var(--surface-sunken);
  border-radius: 8px;
  padding: 4px 8px;
  border: 1px solid var(--border-default);
}
.gr__topic.is-open .gr__topic-num {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}
.gr__topic.is-done .gr__topic-num {
  background: var(--color-success);
  color: #fff;
  border-color: var(--color-success);
}

.gr__topic-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
}

.gr__topic-head-right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.gr__topic-check {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-default);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast),
    border-color var(--motion-fast);
}
.gr__topic-check:hover { color: var(--text-primary); border-color: var(--color-success-soft); }
.gr__topic-check.is-done {
  background: var(--color-success);
  color: #fff;
  border-color: var(--color-success);
}

.gr__topic-toggle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform var(--motion-base), background var(--motion-fast);
}
.gr__topic-toggle:hover {
  background: var(--surface-sunken);
  color: var(--text-primary);
}
.gr__topic.is-open .gr__topic-toggle {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.gr__topic-body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 0 18px 22px;
  background: var(--surface-card);
}

.gr__topic-summary {
  margin: 0;
  padding: 14px 16px;
  background: var(--surface-sunken);
  border-left: 3px solid var(--color-primary);
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
  font-style: italic;
}

.gr__rule {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-soft);
}
.gr__rule:first-of-type { border-top: none; padding-top: 0; }

.gr__rule-label {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.005em;
}
.gr__rule-bullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
  flex-shrink: 0;
}

.gr__rule-explanation {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.gr__examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.gr__example {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 14px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 10px;
  font-family: var(--font-display);
}
.gr__example-fr {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 15px;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.4;
}
.gr__example-pt {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  font-style: italic;
  line-height: 1.4;
  border-top: 1px dashed var(--border-soft);
  padding-top: 6px;
}
.gr__example-pt :deep(svg) {
  color: var(--color-primary);
  flex-shrink: 0;
  transform: rotate(-90deg);
}

.gr__lang-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  padding: 1px 6px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 4px;
  font-family: var(--font-nav);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

/* ── Complete state ── */
.gr__complete {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 32px 28px !important;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), transparent);
  border: 2px solid rgba(16, 185, 129, 0.3);
}

.gr__complete-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-success);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px -10px rgba(16, 185, 129, 0.4);
}

.gr__complete-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.gr__complete-sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 480px;
}

@media (max-width: 720px) {
  .gr__title { font-size: 22px; }
  .gr__progress-bar {
    position: relative;
    top: 0;
  }
  .gr__topic-num { min-width: 28px; font-size: 15px; padding: 3px 6px; }
  .gr__topic-title { font-size: 15.5px; }
  .gr__topic-check { font-size: 10px; padding: 4px 8px; }
  .gr__topic-check span { display: none; }
  .gr__example-fr { font-size: 14px; }
  .gr__complete-icon { width: 64px; height: 64px; }
  .gr__complete-title { font-size: 20px; }
}

/* ─── Footer ─── */
.gr__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.gr__footer-version {
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
.gr__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}
</style>