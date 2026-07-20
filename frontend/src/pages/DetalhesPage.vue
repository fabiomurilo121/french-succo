<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useHistoryStore } from '@/stores/library'

const history = useHistoryStore()

onMounted(() => {
  history.fetchAll()
})

// ─── Aggregate metrics ─────────────────────────
const uniqueWords = computed(() => {
  const set = new Set()
  for (const item of history.items) {
    if (item.frText) set.add(item.frText.trim().toLowerCase())
  }
  return set.size
})

const totalTranslations = computed(() => history.items.length)

const correctTranslations = computed(() => {
  // Heurística: itens com categoria classificada contam como "trilha completa"
  return history.items.filter((i) => i.category && i.frText && i.sourceText).length
})

const accuracyPct = computed(() => {
  const t = totalTranslations.value
  if (t === 0) return 0
  return Math.round((correctTranslations.value / t) * 100)
})

// Ofensiva (streak): dias consecutivos com ≥ 1 tradução
const streakDays = computed(() => {
  if (history.items.length === 0) return 0
  const days = new Set()
  for (const item of history.items) {
    if (!item.createdAt) continue
    const d = new Date(item.createdAt)
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    days.add(key)
  }
  let count = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    if (days.has(key)) count++
    else if (i > 0) break // allow today to be empty, but break the streak otherwise
  }
  return count
})

// ─── Last 7 days activity chart ─────────────────────────
const dailyActivity = computed(() => {
  const buckets = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    d.setHours(0, 0, 0, 0)
    const next = new Date(d)
    next.setDate(d.getDate() + 1)
    const day = {
      date: d,
      label: d.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3),
      count: 0,
      grammars: 0,
      translations: 0
    }
    for (const item of history.items) {
      if (!item.createdAt) continue
      const t = new Date(item.createdAt)
      if (t >= d && t < next) {
        day.count++
        if (item.mode === 'grammar') day.grammars++
        else day.translations++
      }
    }
    buckets.push(day)
  }
  return buckets
})

const maxDaily = computed(() => {
  const m = Math.max(...dailyActivity.value.map((d) => d.count))
  return Math.max(m, 5) // minimum 5 para escala
})

// ─── Por categoria (top 6) ─────────────────────────
const byCategory = computed(() => {
  const acc = {}
  for (const item of history.items) {
    const cat = item.category || 'Outros'
    acc[cat] = (acc[cat] || 0) + 1
  }
  const sorted = Object.entries(acc).sort((a, b) => b[1] - a[1])
  const top = sorted.slice(0, 6)
  const total = top.reduce((s, [, v]) => s + v, 0)
  return top.map(([name, count]) => ({
    name,
    count,
    pct: total > 0 ? Math.round((count / total) * 100) : 0
  }))
})

// ─── Atividade recente (últimos 7 itens) ─────────────────────────
const recentActivity = computed(() => {
  return [...history.items]
    .filter((i) => i.createdAt)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7)
    .map((item) => ({
      id: item.id,
      frText: item.frText,
      ptText: item.sourceText,
      category: item.category || 'Outros',
      mode: item.mode || 'translate',
      when: formatRelative(item.createdAt)
    }))
})

function formatRelative(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'agora'
  if (diff < 3600) return `Há ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Há ${Math.floor(diff / 3600)} h`
  if (diff < 86400 * 2) return `Ontem, ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
  if (diff < 86400 * 7) {
    return `${d.toLocaleDateString('pt-BR', { weekday: 'long' })}, ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

// ─── Animated counters ─────────────────────────
const animatedWords = ref(0)
const animatedTranslations = ref(0)
const animatedStreak = ref(0)

function animateValue(target, ref, duration = 1200) {
  const start = performance.now()
  const easeOut = (t) => 1 - Math.pow(1 - t, 3)
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    ref.value = Math.round(target * easeOut(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  setTimeout(() => {
    animateValue(uniqueWords.value, animatedWords)
    animateValue(totalTranslations.value, animatedTranslations)
    animateValue(streakDays.value, animatedStreak)
  }, 200)
})

// ─── Variação semanal (comparação simples) ─────────────────────────
const weeklyDelta = computed(() => {
  const now = Date.now()
  const oneWeekAgo = now - 7 * 86400 * 1000
  const twoWeeksAgo = now - 14 * 86400 * 1000

  const thisWeek = history.items.filter((i) => {
    if (!i.createdAt) return false
    const t = new Date(i.createdAt).getTime()
    return t >= oneWeekAgo
  }).length
  const lastWeek = history.items.filter((i) => {
    if (!i.createdAt) return false
    const t = new Date(i.createdAt).getTime()
    return t >= twoWeeksAgo && t < oneWeekAgo
  }).length
  if (lastWeek === 0) return thisWeek > 0 ? 100 : 0
  return Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
})
</script>

<template>
  <div class="dt">
    <header class="dt__head">
      <span class="dt__eyebrow">DETALHES · ANALYTICS</span>
      <h1 class="dt__title">Sua jornada em francês</h1>
      <p class="dt__sub">
        Acompanhe seu progresso: palavras dominadas, ofensiva e precisão ao longo do tempo.
      </p>
    </header>

    <!-- 3 Big metric cards -->
    <section class="dt__kpis">
      <div class="dt__kpi">
        <div class="dt__kpi-icon" style="background: #f2f7ff; color: #3b82f6">
          <AppIcon name="book" :size="20" />
        </div>
        <div class="dt__kpi-meta">
          <small>PALAVRAS APRENDIDAS</small>
          <strong>{{ animatedWords }}</strong>
          <span class="dt__kpi-trend" :class="weeklyDelta >= 0 ? 'is-up' : 'is-down'">
            {{ weeklyDelta >= 0 ? '↑' : '↓' }} {{ Math.abs(weeklyDelta) }}% vs semana passada
          </span>
        </div>
        <div class="dt__kpi-bar">
          <span :style="{ width: '72%' }"></span>
        </div>
        <small class="dt__kpi-foot">{{ totalTranslations }} tradução(ões) registrada(s)</small>
      </div>

      <div class="dt__kpi">
        <div class="dt__kpi-icon" style="background: #fff4ef; color: #c65701">
          <AppIcon name="zap" :size="20" />
        </div>
        <div class="dt__kpi-meta">
          <small>OFENSIVA ATUAL</small>
          <strong>{{ animatedStreak }}</strong>
          <span class="dt__kpi-trend is-up">
            🔥 {{ animatedStreak === 1 ? 'dia consecutivo' : 'dias consecutivos' }}
          </span>
        </div>
        <div class="dt__kpi-bar">
          <span :style="{ width: Math.min(animatedStreak * 14, 100) + '%' }"></span>
        </div>
        <small class="dt__kpi-foot">{{ animatedStreak >= 7 ? 'Semana completa!' : 'Continue praticando hoje' }}</small>
      </div>

      <div class="dt__kpi">
        <div class="dt__kpi-icon" style="background: #dcfce7; color: #16a34a">
          <AppIcon name="check" :size="20" />
        </div>
        <div class="dt__kpi-meta">
          <small>PRECISÃO MÉDIA</small>
          <strong>{{ accuracyPct }}<span>%</span></strong>
          <span class="dt__kpi-trend is-up">
            ✓ {{ correctTranslations }} de {{ totalTranslations }} traduções completas
          </span>
        </div>
        <div class="dt__kpi-bar">
          <span :style="{ width: accuracyPct + '%' }"></span>
        </div>
        <small class="dt__kpi-foot">Estimativa baseada em traduções com PT + categoria</small>
      </div>
    </section>

    <!-- Activity chart (7 dias) -->
    <section class="dt__panel">
      <header class="dt__panel-head">
        <div>
          <h2>Atividade nos últimos 7 dias</h2>
          <p>Quantas traduções/gramáticas você fez por dia.</p>
        </div>
        <span class="dt__panel-tag">{{ dailyActivity.reduce((s, d) => s + d.count, 0) }} total</span>
      </header>
      <div class="dt__bars">
        <div v-for="d in dailyActivity" :key="d.label" class="dt__bar-col">
          <div class="dt__bar-track">
            <div
              class="dt__bar-fill"
              :style="{ height: (d.count / maxDaily * 100) + '%' }"
              :title="`${d.count} traduções`"
            ></div>
          </div>
          <span class="dt__bar-label">{{ d.label }}</span>
          <span class="dt__bar-num">{{ d.count }}</span>
        </div>
      </div>
    </section>

    <!-- Por categoria + Atividade recente -->
    <section class="dt__row">
      <div class="dt__panel dt__panel--half">
        <header class="dt__panel-head">
          <div>
            <h2>Por categoria</h2>
            <p>Suas traduções agrupadas por tema.</p>
          </div>
        </header>
        <div v-if="byCategory.length" class="dt__cats">
          <div v-for="cat in byCategory" :key="cat.name" class="dt__cat">
            <div class="dt__cat-head">
              <span class="dt__cat-name">{{ cat.name }}</span>
              <span class="dt__cat-count">{{ cat.count }} ({{ cat.pct }}%)</span>
            </div>
            <div class="dt__cat-bar">
              <span :style="{ width: cat.pct + '%' }"></span>
            </div>
          </div>
        </div>
        <div v-else class="dt__empty">
          <AppIcon name="book" :size="32" />
          <p>Nenhuma tradução registrada ainda. Vá ao dashboard e comece a praticar.</p>
        </div>
      </div>

      <div class="dt__panel dt__panel--half">
        <header class="dt__panel-head">
          <div>
            <h2>Atividade recente</h2>
            <p>Suas últimas {{ recentActivity.length }} traduções.</p>
          </div>
        </header>
        <ul v-if="recentActivity.length" class="dt__activity">
          <li v-for="r in recentActivity" :key="r.id" class="dt__activity-item">
            <span
              class="dt__activity-icon"
              :class="{ 'is-grammar': r.mode === 'grammar' }"
            >
              <AppIcon
                :name="r.mode === 'grammar' ? 'check' : 'speaker'"
                :size="14"
              />
            </span>
            <div class="dt__activity-body">
              <strong>{{ r.frText }}</strong>
              <small>{{ r.ptText }}</small>
            </div>
            <div class="dt__activity-meta">
              <span class="tag">{{ r.category }}</span>
              <small>{{ r.when }}</small>
            </div>
          </li>
        </ul>
        <div v-else class="dt__empty">
          <AppIcon name="clock" :size="32" />
          <p>Sem atividade ainda. Suas traduções aparecerão aqui.</p>
        </div>
      </div>
    </section>

    <!-- Ações rápidas -->
    <section class="dt__cta">
      <div class="dt__cta-content">
        <h2>Continue praticando</h2>
        <p>Revise flashcards, complete frases e construa sua memória.</p>
      </div>
      <div class="dt__cta-buttons">
        <router-link to="/flashcards" class="btn btn-primary btn--lg">
          <AppIcon name="cards" :size="16" />
          Flashcards
        </router-link>
        <router-link to="/complete" class="btn btn-secondary btn--lg">
          <AppIcon name="cards" :size="16" />
          Completar Frases
        </router-link>
        <router-link to="/" class="btn btn-quiet btn--lg">
          <AppIcon name="translate" :size="16" />
          Tradutor
        </router-link>
      </div>
    </section>

    <footer class="dt__footer">
      <span>© 2026 French Succo — Acompanhe. Pratique. Evolua.</span>
      <span class="dt__footer-version">
        v1.0.0<small>· detalhes</small>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.dt {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  max-width: 1080px;
  margin: 0 auto;
}

.dt__head {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dt__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 5px 12px;
  border-radius: 999px;
  width: max-content;
}

.dt__title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  margin: 8px 0 0;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.dt__sub {
  margin: 0;
  font-size: 14px;
  color: var(--text-muted);
  max-width: 520px;
}

/* ─── KPI big cards ───────────────────────── */
.dt__kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 800px) {
  .dt__kpis {
    grid-template-columns: 1fr;
  }
}

.dt__kpi {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-xs);
  transition: transform var(--motion-fast), box-shadow var(--motion-fast);
}

.dt__kpi:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.dt__kpi-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dt__kpi-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dt__kpi-meta small {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.dt__kpi-meta strong {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1.1;
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
}

.dt__kpi-meta strong span {
  font-size: 22px;
  color: var(--text-muted);
  font-weight: 600;
}

.dt__kpi-trend {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
}
.dt__kpi-trend.is-up {
  color: var(--color-success);
}
.dt__kpi-trend.is-down {
  color: #dc2626;
}

.dt__kpi-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}

.dt__kpi-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-deep));
  border-radius: 999px;
  transition: width 0.6s var(--ease-out);
}

.dt__kpi-foot {
  font-size: 11px;
  color: var(--text-muted);
  font-style: italic;
}

/* ─── Panels ───────────────────────── */
.dt__panel {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-xs);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dt__panel--half {
  flex: 1;
  min-width: 0;
}

.dt__panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.dt__panel-head h2 {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.dt__panel-head p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}

.dt__panel-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  flex-shrink: 0;
}

/* ─── 7-day bar chart ───────────────────────── */
.dt__bars {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  height: 200px;
  align-items: end;
  padding-top: 12px;
}

.dt__bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  height: 100%;
  justify-content: flex-end;
}

.dt__bar-track {
  flex: 1;
  width: 100%;
  max-width: 56px;
  background: var(--surface-sunken);
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
}

.dt__bar-fill {
  width: 100%;
  background: linear-gradient(180deg, var(--color-primary), var(--color-primary-deep));
  border-radius: 8px 8px 0 0;
  transition: height 0.5s var(--ease-out);
  position: relative;
}

.dt__bar-fill::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
  border-radius: 2px;
}

.dt__bar-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dt__bar-num {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

/* ─── By category + Recent ───────────────────────── */
.dt__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 800px) {
  .dt__row {
    grid-template-columns: 1fr;
  }
}

.dt__cats {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dt__cat {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dt__cat-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 13px;
}

.dt__cat-name {
  font-family: var(--font-nav);
  font-weight: 600;
  color: var(--text-primary);
}

.dt__cat-count {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
}

.dt__cat-bar {
  height: 6px;
  background: var(--surface-sunken);
  border-radius: 999px;
  overflow: hidden;
}

.dt__cat-bar span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-deep));
  border-radius: 999px;
  transition: width 0.5s var(--ease-out);
}

.dt__activity {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dt__activity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: var(--surface-sunken);
  border-radius: 12px;
  border: 1px solid var(--border-soft);
}

.dt__activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.dt__activity-icon.is-grammar {
  background: rgba(16, 185, 129, 0.12);
  color: #16a34a;
}

.dt__activity-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.dt__activity-body strong {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dt__activity-body small {
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dt__activity-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}

.dt__activity-meta small {
  font-family: var(--font-nav);
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
}

.dt__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 20px;
  color: var(--text-muted);
  text-align: center;
}

/* ─── CTA ───────────────────────── */
.dt__cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 28px;
  background: linear-gradient(135deg, var(--color-primary-soft) 0%, rgba(255, 255, 255, 0.5) 100%);
  border-radius: 20px;
  border: 1px solid var(--border-default);
}

.dt__cta-content h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
}

.dt__cta-content p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.dt__cta-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ─── Footer ───────────────────────── */
.dt__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.dt__footer-version {
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
.dt__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}

@media (max-width: 600px) {
  .dt__title {
    font-size: 24px;
  }
  .dt__kpi-meta strong {
    font-size: 28px;
  }
  .dt__bars {
    height: 160px;
  }
}
</style>
