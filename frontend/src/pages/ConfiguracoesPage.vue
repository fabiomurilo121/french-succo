<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import icons from '@/assets/icons'
import { APP_VERSION, APP_BUILD } from '@/version'

const settings = useSettingsStore()

const reminderTimes = ['08:00', '12:00', '14:00', '18:00', '20:00', '21:00']
const regions = ['França (Padrão)', 'Québec', 'Bélgica']

const sections = [
  { id: 'audio',     label: 'Áudio',                icon: 'volume'  },
  { id: 'interface', label: 'Interface & Estudo',   icon: 'zap'     },
  { id: 'notify',    label: 'Notificações',         icon: 'bell'    },
  { id: 'account',   label: 'Conta & Segurança',    icon: 'user'    }
]

const activeSection = ref('audio')

const hasChanges = ref(false)
const original = ref(null)

onMounted(() => {
  settings.load()
  snapshot()
  setTimeout(() => (hasChanges.value = false), 0)
})

function snapshot() {
  original.value = JSON.parse(JSON.stringify(settings.$state))
}

watch(
  () => settings.$state,
  () => {
    if (!original.value) return
    hasChanges.value = JSON.stringify(settings.$state) !== JSON.stringify(original.value)
  },
  { deep: true }
)

function restoreDefaults() {
  settings.restoreDefaults()
  snapshot()
  hasChanges.value = false
}

function save() {
  snapshot()
  hasChanges.value = false
}

function setSpeed(value) {
  settings.speed = parseFloat(value)
}

function scrollTo(id) {
  activeSection.value = id
  const el = document.getElementById('cs-' + id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="cs">
    <!-- Sub-nav: quick access to sections -->
    <nav class="cs__subnav" aria-label="Navegação rápida">
      <button
        v-for="s in sections"
        :key="s.id"
        type="button"
        class="cs__subnav-btn"
        :class="{ 'is-active': activeSection === s.id }"
        @click="scrollTo(s.id)"
      >
        <AppIcon :name="s.icon" :size="14" />
        {{ s.label }}
      </button>
    </nav>

    <!-- Hero -->
    <section class="cs__hero">
      <div class="cs__hero-content">
        <span class="cs__hero-badge">Preferências do App</span>
        <h1 class="cs__hero-title">Configurações de Aprendizado</h1>
        <p class="cs__hero-text">
          Personalize sua experiência de estudo. Ajuste a voz, velocidade e sotaque para tornar seu aprendizado de francês mais natural e eficiente.
        </p>
      </div>
      <div class="cs__hero-art">
        <img :src="icons['IMG_10.webp']" alt="" />
      </div>
    </section>

    <!-- Áudio -->
    <section id="cs-audio" class="cs__section">
      <header class="cs__section-head">
        <div class="cs__section-icon cs__section-icon--blue">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19" />
            <path d="M19 5a5 5 0 0 1 0 14" />
            <path d="M15 9a3 3 0 0 1 0 6" />
          </svg>
        </div>
        <div>
          <h2>Preferências de Áudio</h2>
          <p>Controle como você ouve as pronúncias das frases e palavras em francês.</p>
        </div>
      </header>

      <div class="cs__card">
        <div class="cs__row">
          <div>
            <strong>Tipo de Voz</strong>
            <small>Escolha entre vozes masculinas ou femininas com diferentes tons.</small>
          </div>
          <div class="cs__select-wrap">
            <select v-model="settings.voice" class="select">
              <option value="female">Feminina (Natural)</option>
              <option value="male">Masculina (Natural)</option>
            </select>
          </div>
        </div>

        <hr class="cs__divider" />

        <div class="cs__row">
          <div>
            <strong>Velocidade de Reprodução</strong>
            <small>Atual: {{ settings.speed.toFixed(1) }}x (Ideal para treinar o ouvido)</small>
          </div>
          <div class="cs__slider-block">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              :value="settings.speed"
              @input="(e) => setSpeed(e.target.value)"
              class="cs__range"
            />
            <div class="cs__ticks">
              <button
                v-for="m in ['0.5x', '1.0x', '2.0x']"
                :key="m"
                type="button"
                :class="{ 'is-active': Math.abs(parseFloat(m) - settings.speed) < 0.05 }"
                @click="setSpeed(m)"
              >
                {{ m }}
              </button>
            </div>
          </div>
        </div>

        <hr class="cs__divider" />

        <div class="cs__row">
          <div>
            <strong>Região de Pronúncia</strong>
            <small>Ajuste o sotaque para regiões específicas onde o francês é falado.</small>
          </div>
          <div class="cs__radios">
            <label
              v-for="r in regions"
              :key="r"
              class="cs__radio"
              :class="{ 'is-active': settings.region === r.split(' ')[0].toLowerCase() || (settings.region === 'qc' && r.includes('Québec')) || (settings.region === 'be' && r.includes('Bélgica')) }"
            >
              <input
                type="radio"
                :value="r.includes('França') ? 'fr' : r.includes('Québec') ? 'qc' : 'be'"
                v-model="settings.region"
              />
              <span class="cs__radio-dot"></span>
              <span>{{ r }}</span>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Interface e Estudo -->
    <section id="cs-interface" class="cs__section">
      <header class="cs__section-head">
        <div class="cs__section-icon cs__section-icon--orange">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
          </svg>
        </div>
        <div>
          <h2>Interface e Estudo</h2>
          <p>Ajuste como os resultados de tradução e auxiliares de pronúncia aparecem.</p>
        </div>
      </header>

      <div class="cs__card">
        <div class="cs__toggle-row">
          <div>
            <strong>Reprodução Automática</strong>
            <small>Ouvir a pronúncia automaticamente após cada tradução.</small>
          </div>
          <label class="switch" :class="{ 'is-on': settings.autoPlay }">
            <input type="checkbox" v-model="settings.autoPlay" />
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>

        <hr class="cs__divider" />

        <div class="cs__toggle-row">
          <div>
            <strong>Mostrar Fonética</strong>
            <small>Exibir guia fonético abaixo das palavras em francês.</small>
          </div>
          <label class="switch" :class="{ 'is-on': settings.showPhonetic }">
            <input type="checkbox" v-model="settings.showPhonetic" />
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>

        <hr class="cs__divider" />

        <div class="cs__toggle-row">
          <div>
            <strong>Destaque de Verbos</strong>
            <small>Colorir verbos conjugados para facilitar a identificação gramatical.</small>
          </div>
          <label class="switch" :class="{ 'is-on': settings.highlightVerbs }">
            <input type="checkbox" v-model="settings.highlightVerbs" />
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>

        <hr class="cs__divider" />

        <div class="cs__toggle-row">
          <div>
            <strong>Ocultar Explicações de Correção</strong>
            <small>Mostrar apenas a frase corrigida, sem detalhes.</small>
          </div>
          <label class="switch" :class="{ 'is-on': settings.hideExplanations }">
            <input type="checkbox" v-model="settings.hideExplanations" />
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>
      </div>
    </section>

    <!-- Notificações -->
    <section id="cs-notify" class="cs__section">
      <header class="cs__section-head">
        <div class="cs__section-icon cs__section-icon--violet">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <div>
          <h2>Notificações e Lembretes</h2>
          <p>Configure como e quando você quer ser lembrado de praticar.</p>
        </div>
      </header>

      <div class="cs__card">
        <div class="cs__toggle-row">
          <div>
            <strong>Lembrete Diário</strong>
            <small>Receber uma notificação para manter sua ofensiva de estudos.</small>
          </div>
          <label class="switch" :class="{ 'is-on': settings.dailyReminder }">
            <input type="checkbox" v-model="settings.dailyReminder" />
            <span class="switch__track"><span class="switch__thumb"></span></span>
          </label>
        </div>

        <hr class="cs__divider" />

        <div class="cs__row">
          <div>
            <strong>Horário do Lembrete</strong>
            <small>Defina o melhor momento do dia para praticar.</small>
          </div>
          <div class="cs__select-wrap cs__select-wrap--sm">
            <select v-model="settings.reminderTime" class="select">
              <option v-for="t in reminderTimes" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Conta -->
    <section id="cs-account" class="cs__section">
      <header class="cs__section-head">
        <div class="cs__section-icon cs__section-icon--green">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21a8 8 0 0 1 16 0" />
          </svg>
        </div>
        <div>
          <h2>Conta e Segurança</h2>
          <p>Gerencie seus dados e privacidade na plataforma.</p>
        </div>
      </header>

      <div class="cs__account-grid">
        <button class="cs__account-card" type="button">
          <div class="cs__account-avatar">
            <img :src="icons['IMG_14.webp']" alt="" />
          </div>
          <div>
            <strong>Perfil de Estudante</strong>
            <small>usuario.premium@exemplo.com</small>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <button class="cs__account-card" type="button">
          <div class="cs__account-avatar cs__account-avatar--blue">
            <img :src="icons['IMG_16']" alt="" />
          </div>
          <div>
            <strong>Privacidade e Dados</strong>
            <small>Gerenciar histórico e exportação</small>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="cs__footer">
      <div class="cs__footer-hint">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12" y2="16" />
        </svg>
        <small>As alterações são salvas automaticamente na nuvem.</small>
      </div>
      <div class="cs__footer-actions">
        <button class="btn btn-secondary" @click="restoreDefaults">Restaurar Padrões</button>
        <button class="btn btn-primary" :disabled="!hasChanges" @click="save">
          Salvar Alterações
        </button>
      </div>
      <div class="cs__footer-version">
        <span>French Succo</span>
        <span class="cs__footer-version-pill">
          v{{ APP_VERSION }}
          <small>· {{ APP_BUILD }}</small>
        </span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.cs {
  display: flex;
  flex-direction: column;
  gap: 36px;
  font-family: var(--font-body);
}

/* Hero */
.cs__hero {
  background: var(--surface-sunken);
  border: 1px solid #c5dbff;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
/* ─── Sub-navigation (quick access) ─── */
.cs__subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 6px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  box-shadow: var(--shadow-xs);
  position: sticky;
  top: 12px;
  z-index: 5;
  align-self: flex-start;
}

.cs__subnav-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: background var(--motion-fast), color var(--motion-fast);
}

.cs__subnav-btn:hover:not(.is-active) {
  background: var(--surface-sunken);
  color: var(--text-primary);
}

.cs__subnav-btn.is-active {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.25);
}

.cs__subnav-btn :deep(svg) {
  flex-shrink: 0;
}

.cs__hero {
    flex-direction: row;
  }
}

.cs__hero-content {
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .cs__hero-content {
    padding: 48px;
  }
}

.cs__hero-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 4px 14px;
  background: #c5dbff;
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 600;
  border-radius: 999px;
}

.cs__hero-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--text-primary);
  margin: 0;
}

@media (min-width: 768px) {
  .cs__hero-title {
    font-size: 36px;
  }
}

.cs__hero-text {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 480px;
  margin: 0;
}

.cs__hero-art {
  width: 100%;
  height: 240px;
  background: var(--surface-card);
  overflow: hidden;
  flex-shrink: 0;
}
.cs__hero-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

@media (min-width: 768px) {
  .cs__hero-art {
    width: 320px;
    height: auto;
  }
}

/* Sections */
.cs__section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-margin-top: 90px; /* compensa o sub-nav sticky */
}

.cs__section-head {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.cs__section-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cs__section-icon--blue {
  background: rgba(59, 130, 246, 0.1);
  color: var(--color-primary);
}
.cs__section-icon--orange {
  background: var(--color-tip-bg);
  color: var(--color-accent);
}
.cs__section-icon--violet {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
}
.cs__section-icon--green {
  background: var(--color-success-soft);
  color: var(--color-success-text);
}

.cs__section-head h2 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.cs__section-head p {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--text-muted);
}

/* Cards */
.cs__card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: var(--shadow-xs);
}

.cs__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.cs__row > div strong,
.cs__toggle-row > div strong {
  display: block;
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.cs__row > div small,
.cs__toggle-row > div small {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted);
}

.cs__toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cs__divider {
  border: none;
  border-top: 1px solid var(--border-default);
  margin: 0;
}

.cs__select-wrap {
  position: relative;
  width: 100%;
  max-width: 240px;
}
.cs__select-wrap--sm {
  max-width: 140px;
}

.cs__select-wrap .select {
  background-color: var(--surface-page);
}

/* Slider */
.cs__slider-block {
  width: 100%;
  max-width: 240px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cs__range {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  cursor: pointer;
  background: #c5dbff;
}

.cs__range::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: #c5dbff;
}

.cs__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--color-primary);
  margin-top: -6px;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.2);
}

.cs__range::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid var(--color-primary);
}

.cs__ticks {
  display: flex;
  justify-content: space-between;
  padding: 0 4px;
}

.cs__ticks button {
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  padding: 4px 6px;
  border-radius: 6px;
}
.cs__ticks button.is-active {
  color: var(--color-primary);
  background: rgba(59, 130, 246, 0.08);
}

/* Radios */
.cs__radios {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}

.cs__radio {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 6px 8px;
  border-radius: 8px;
  transition: color var(--motion-fast);
}
.cs__radio:hover {
  color: var(--color-primary);
}
.cs__radio input {
  display: none;
}
.cs__radio-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--text-faint);
  position: relative;
  transition: border-color var(--motion-fast);
}
.cs__radio.is-active {
  color: var(--color-primary);
}
.cs__radio.is-active .cs__radio-dot {
  border-color: var(--color-primary);
}
.cs__radio.is-active .cs__radio-dot::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: var(--color-primary);
}

/* Switch (using tokens from main.css) */
.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}
.switch input {
  display: none;
}
.switch__track {
  position: absolute;
  inset: 0;
  background: var(--border-strong, #cbd5e1);
  border-radius: 999px;
  transition: background var(--motion-fast);
}
.switch__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: left var(--motion-fast);
}
.switch.is-on .switch__track {
  background: var(--color-primary);
}
.switch.is-on .switch__thumb {
  left: 23px;
}

/* Account grid */
.cs__account-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .cs__account-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.cs__account-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
  transition: border-color var(--motion-fast), transform var(--motion-fast);
  color: var(--text-muted);
}
.cs__account-card:hover {
  border-color: #c5dbff;
  transform: translateY(-1px);
  color: var(--color-primary);
}
.cs__account-card:hover svg {
  transform: translateX(2px);
}

.cs__account-card strong {
  display: block;
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}
.cs__account-card small {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}
.cs__account-card svg {
  margin-left: auto;
  flex-shrink: 0;
  transition: transform var(--motion-fast);
}

.cs__account-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--surface-sunken);
}
.cs__account-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs__account-avatar--blue {
  background: #c5dbff;
  padding: 10px;
}

/* Footer */
.cs__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding-top: 16px;
  border-top: 1px solid var(--border-default);
}

.cs__footer-version {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-nav);
}

.cs__footer-version-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.04em;
}

.cs__footer-version-pill small {
  font-weight: 600;
  color: var(--text-muted);
}

.cs__footer-hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted);
}
.cs__footer-hint svg {
  color: var(--color-primary);
}

.cs__footer-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 720px) {
  .cs__row,
  .cs__toggle-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .cs__select-wrap,
  .cs__slider-block {
    max-width: none;
    width: 100%;
  }
  .cs__hero-content {
    padding: 24px;
  }
  .cs__hero-title {
    font-size: 22px;
  }
  .cs__footer {
    flex-direction: column;
    align-items: stretch;
  }
  .cs__footer-actions {
    width: 100%;
  }
  .cs__footer-actions .btn {
    flex: 1;
  }
}
</style>
