<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()

onMounted(() => {
  settings.load()
  snapshot()
  setTimeout(() => (hasChanges.value = false), 0)
})

watch(
  () => settings.$state,
  () => {
    if (!original.value) return
    hasChanges.value = JSON.stringify(settings.$state) !== JSON.stringify(original.value)
  },
  { deep: true }
)

const reminderTimes = [
  '08:00', '12:00', '14:00', '18:00', '20:00', '21:00'
]

const voices = [
  { value: 'female', label: 'Feminina (Natural)' },
  { value: 'male', label: 'Masculina (Natural)' }
]

const regionOptions = [
  { value: 'fr', label: 'França (Padrão)' },
  { value: 'qc', label: 'Québec' },
  { value: 'be', label: 'Bélgica' }
]

const hasChanges = ref(false)
const original = ref(null)

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
}

function save() {
  snapshot()
  hasChanges.value = false
}

const speedMarkers = ['0.5x', '1.0x', '2.0x']

function setSpeed(marker) {
  const val = parseFloat(marker)
  if (!Number.isNaN(val)) settings.speed = val
}
</script>

<template>
  <div class="settings-page">
    <section class="settings-hero">
      <div class="settings-hero__content">
        <span class="settings-hero__badge">Preferências do App</span>
        <h1>Configurações de Aprendizado</h1>
        <p>
          Personalize sua experiência de estudo. Ajuste a voz, velocidade e
          sotaque para tornar seu aprendizado de francês mais natural e eficiente.
        </p>
      </div>
      <div class="settings-hero__art" aria-hidden="true">
        <div class="settings-hero__art-circle"></div>
      </div>
    </section>

    <section class="settings-section">
      <header class="settings-section__head">
        <div class="settings-section__icon settings-section__icon--blue">
          <AppIcon name="volume" :size="18" />
        </div>
        <div>
          <h2>Preferências de Áudio</h2>
          <p>Controle como você ouve as pronúncias das frases e palavras em francês.</p>
        </div>
      </header>

      <div class="settings-row">
        <div>
          <strong>Tipo de Voz</strong>
          <small>Escolha entre vozes masculinas ou femininas com diferentes tons.</small>
        </div>
        <select v-model="settings.voice" class="settings-select">
          <option v-for="v in voices" :key="v.value" :value="v.value">{{ v.label }}</option>
        </select>
      </div>

      <div class="settings-row">
        <div>
          <strong>Velocidade de Reprodução</strong>
          <small>Atual: {{ settings.speed }}x (ideal para treinar o ouvido)</small>
        </div>
        <div class="settings-slider">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            v-model.number="settings.speed"
          />
          <div class="settings-slider__ticks">
            <button
              v-for="m in speedMarkers"
              :key="m"
              :class="{ active: Math.abs(parseFloat(m) - settings.speed) < 0.05 }"
              @click="setSpeed(m)"
            >
              {{ m }}
            </button>
          </div>
        </div>
      </div>

      <div class="settings-row">
        <div>
          <strong>Região de Pronúncia</strong>
          <small>Ajuste o sotaque para regiões específicas onde o francês é falado.</small>
        </div>
        <div class="settings-radios">
          <label
            v-for="opt in regionOptions"
            :key="opt.value"
            class="settings-radio"
            :class="{ active: settings.region === opt.value }"
          >
            <input type="radio" v-model="settings.region" :value="opt.value" />
            <span class="settings-radio__dot"></span>
            <span>{{ opt.label }}</span>
          </label>
        </div>
      </div>
    </section>

    <section class="settings-section">
      <header class="settings-section__head">
        <div class="settings-section__icon settings-section__icon--yellow">
          <AppIcon name="zap" :size="18" />
        </div>
        <div>
          <h2>Interface e Estudo</h2>
          <p>Ajuste como os resultados de tradução e auxiliares de pronúncia aparecem.</p>
        </div>
      </header>

      <div class="settings-row">
        <div>
          <strong>Aparência</strong>
          <small>Escolha entre tema claro e escuro.</small>
        </div>
        <button
          class="theme-switch"
          @click="settings.setTheme(settings.resolvedTheme === 'dark' ? 'light' : 'dark')"
          :title="`Tema atual: ${settings.resolvedTheme === 'dark' ? 'escuro' : 'claro'}`"
          aria-label="Alternar tema"
          role="switch"
          :aria-checked="settings.resolvedTheme === 'dark'"
        >
          <span class="theme-switch__track">
            <span class="theme-switch__indicator"></span>
            <span class="theme-switch__icon theme-switch__icon--sun">
              <AppIcon name="sun" :size="14" />
            </span>
            <span class="theme-switch__icon theme-switch__icon--moon">
              <AppIcon name="moon" :size="14" />
            </span>
          </span>
          <span class="theme-switch__label">{{ settings.resolvedTheme === 'dark' ? 'Escuro' : 'Claro' }}</span>
        </button>
      </div>

      <div class="settings-row">
        <div>
          <strong>Reprodução Automática</strong>
          <small>Ouvir a pronúncia automaticamente após cada tradução.</small>
        </div>
        <label class="settings-switch" :class="{ on: settings.autoPlay }">
          <input type="checkbox" v-model="settings.autoPlay" />
          <span class="settings-switch__track">
            <span class="settings-switch__thumb"></span>
          </span>
        </label>
      </div>

      <div class="settings-row">
        <div>
          <strong>Mostrar Fonética</strong>
          <small>Exibir guia fonético abaixo das palavras em francês.</small>
        </div>
        <label class="settings-switch" :class="{ on: settings.showPhonetic }">
          <input type="checkbox" v-model="settings.showPhonetic" />
          <span class="settings-switch__track">
            <span class="settings-switch__thumb"></span>
          </span>
        </label>
      </div>

      <div class="settings-row">
        <div>
          <strong>Destaque de Verbos</strong>
          <small>Colorir verbos conjugados para facilitar a identificação gramatical.</small>
        </div>
        <label class="settings-switch" :class="{ on: settings.highlightVerbs }">
          <input type="checkbox" v-model="settings.highlightVerbs" />
          <span class="settings-switch__track">
            <span class="settings-switch__thumb"></span>
          </span>
        </label>
      </div>

      <div class="settings-row">
        <div>
          <strong>Ocultar Explicações de Correção</strong>
          <small>Mostrar apenas a frase corrigida, sem detalhes.</small>
        </div>
        <label class="settings-switch" :class="{ on: settings.hideExplanations }">
          <input type="checkbox" v-model="settings.hideExplanations" />
          <span class="settings-switch__track">
            <span class="settings-switch__thumb"></span>
          </span>
        </label>
      </div>
    </section>

    <section class="settings-section">
      <header class="settings-section__head">
        <div class="settings-section__icon settings-section__icon--violet">
          <AppIcon name="bell" :size="18" />
        </div>
        <div>
          <h2>Notificações e Lembretes</h2>
          <p>Configure como e quando você quer ser lembrado de praticar.</p>
        </div>
      </header>

      <div class="settings-row">
        <div>
          <strong>Lembrete Diário</strong>
          <small>Receber uma notificação para manter sua ofensiva de estudos.</small>
        </div>
        <label class="settings-switch" :class="{ on: settings.dailyReminder }">
          <input type="checkbox" v-model="settings.dailyReminder" />
          <span class="settings-switch__track">
            <span class="settings-switch__thumb"></span>
          </span>
        </label>
      </div>

      <div class="settings-row">
        <div>
          <strong>Horário do Lembrete</strong>
          <small>Defina o melhor momento do dia para praticar.</small>
        </div>
        <select v-model="settings.reminderTime" class="settings-select">
          <option v-for="t in reminderTimes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
    </section>

    <section class="settings-section">
      <header class="settings-section__head">
        <div class="settings-section__icon settings-section__icon--green">
          <AppIcon name="user" :size="18" />
        </div>
        <div>
          <h2>Conta e Segurança</h2>
          <p>Gerencie seus dados e privacidade na plataforma.</p>
        </div>
      </header>

      <div class="settings-cards">
        <button class="settings-card">
          <div class="settings-card__avatar">
            <span>U</span>
          </div>
          <div class="settings-card__info">
            <strong>Perfil de Estudante</strong>
            <small>usuario.premium@exemplo.com</small>
          </div>
          <AppIcon name="arrow" :size="16" class="settings-card__arrow" />
        </button>

        <button class="settings-card">
          <div class="settings-card__avatar settings-card__avatar--blue">
            <AppIcon name="shield" :size="20" />
          </div>
          <div class="settings-card__info">
            <strong>Privacidade e Dados</strong>
            <small>Gerenciar histórico e exportação</small>
          </div>
          <AppIcon name="arrow" :size="16" class="settings-card__arrow" />
        </button>
      </div>
    </section>

    <footer class="settings-footer">
      <div class="settings-footer__hint">
        <AppIcon name="check" :size="14" />
        <small>As alterações são salvas automaticamente na nuvem.</small>
      </div>
      <div class="settings-footer__actions">
        <button class="btn btn-light" @click="restoreDefaults">Restaurar Padrões</button>
        <button class="btn btn-primary" :disabled="!hasChanges" @click="save">
          <AppIcon name="check" :size="16" />
          <span>Salvar Alterações</span>
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-hero {
  background: var(--color-hero-bg);
  border-radius: var(--radius-xl);
  padding: 36px 40px;
  display: flex;
  align-items: center;
  gap: 32px;
  position: relative;
  overflow: hidden;
}

.settings-hero__content {
  flex: 1;
  max-width: 520px;
}

.settings-hero__badge {
  display: inline-block;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border-radius: 999px;
  margin-bottom: 12px;
}

.settings-hero h1 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px;
}

.settings-hero p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.6;
  font-size: 14px;
}

.settings-hero__art {
  width: 240px;
  height: 240px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #e3e7ee 0%, #f0f4fa 100%);
  position: relative;
  flex-shrink: 0;
}

.settings-hero__art-circle {
  position: absolute;
  width: 140px;
  height: 140px;
  background: rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(6px);
}

.settings-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  padding: 22px 26px;
  box-shadow: var(--shadow-sm);
}

.settings-section__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-border-soft);
}

.settings-section__head h2 {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
}

.settings-section__head p {
  margin: 0;
  font-size: 13px;
  color: var(--color-text-muted);
}

.settings-section__icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.settings-section__icon--blue {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.settings-section__icon--yellow {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.settings-section__icon--violet {
  background: var(--color-info-soft);
  color: var(--color-info-text);
}

.settings-section__icon--green {
  background: var(--color-success-soft);
  color: var(--color-success);
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 14px 0;
  border-bottom: 1px dashed var(--color-border-soft);
}

.settings-row:last-child {
  border-bottom: none;
}

.settings-row strong {
  font-size: 14px;
  font-weight: 600;
  display: block;
}

.settings-row small {
  font-size: 12px;
  color: var(--color-text-muted);
}

.settings-select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  background: var(--color-surface);
  outline: none;
  min-width: 180px;
  cursor: pointer;
}

.settings-slider {
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}

.settings-slider input[type='range'] {
  width: 100%;
  accent-color: var(--color-primary);
}

.settings-slider__ticks {
  display: flex;
  justify-content: space-between;
}

.settings-slider__ticks button {
  background: transparent;
  font-size: 11px;
  color: var(--color-text-muted);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.settings-slider__ticks button.active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.settings-radios {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 0;
  background: transparent;
}

.theme-switch__track {
  position: relative;
  width: 56px;
  height: 30px;
  border-radius: 999px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border-soft);
  overflow: hidden;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.theme-switch:hover .theme-switch__track {
  border-color: var(--color-primary);
}

.theme-switch__indicator {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fde68a 0%, #fbbf24 100%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
  transition: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease;
  z-index: 1;
}

:root[data-theme='dark'] .theme-switch__indicator {
  transform: translateX(26px);
  background: linear-gradient(135deg, #1e3a8a 0%, #312e81 100%);
}

.theme-switch__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: color 0.2s ease;
}

.theme-switch__icon--sun {
  left: 8px;
  color: #92400e;
}

:root[data-theme='dark'] .theme-switch__icon--sun {
  color: var(--color-text-soft);
  opacity: 0.7;
}

.theme-switch__icon--moon {
  right: 8px;
  color: var(--color-text-soft);
  opacity: 0.7;
}

:root[data-theme='dark'] .theme-switch__icon--moon {
  color: #e0e7ff;
  opacity: 1;
}

.theme-switch__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  min-width: 48px;
}

.settings-radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 600;
  background: var(--color-surface);
  transition: border-color 0.15s, background 0.15s;
}

.settings-radio input {
  display: none;
}

.settings-radio__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--color-text-soft);
  display: inline-block;
  position: relative;
}

.settings-radio.active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.settings-radio.active .settings-radio__dot {
  border-color: var(--color-primary);
}

.settings-radio.active .settings-radio__dot::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.settings-switch {
  position: relative;
  display: inline-block;
}

.settings-switch input {
  display: none;
}

.settings-switch__track {
  width: 42px;
  height: 24px;
  background: var(--color-border);
  border-radius: 999px;
  position: relative;
  transition: background 0.2s;
  display: inline-block;
}

.settings-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-surface);
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.settings-switch.on .settings-switch__track {
  background: var(--color-primary);
}

.settings-switch.on .settings-switch__thumb {
  left: 20px;
}

.settings-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.settings-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.settings-card:hover {
  border-color: var(--color-primary-soft2);
  box-shadow: var(--shadow-sm);
}

.settings-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg-alt);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.settings-card__avatar--blue {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.settings-card__info {
  flex: 1;
  min-width: 0;
}

.settings-card__info strong {
  display: block;
  font-size: 13px;
}

.settings-card__info small {
  font-size: 12px;
  color: var(--color-text-muted);
}

.settings-card__arrow {
  color: var(--color-text-soft);
}

.settings-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 4px;
  flex-wrap: wrap;
  gap: 12px;
}

.settings-footer__hint {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.settings-footer__actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 800px) {
  .settings-hero {
    padding: 28px;
  }
  .settings-hero__art {
    display: none;
  }
  .settings-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .settings-cards {
    grid-template-columns: 1fr;
  }
}
</style>
