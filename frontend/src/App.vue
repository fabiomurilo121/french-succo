<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import AppToaster from '@/components/AppToaster.vue'
import AppIcon from '@/components/AppIcon.vue'
import icons from '@/assets/icons'
import { useHistoryStore } from '@/stores/library'

const sidebarOpen = ref(false)
const helpOpen = ref(false)
const history = useHistoryStore()

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function toggleHelp() {
  helpOpen.value = !helpOpen.value
}

function closeHelp() {
  helpOpen.value = false
}

watch(helpOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow =
    open || sidebarOpen.value ? 'hidden' : ''
})

watch(sidebarOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow =
    helpOpen.value || open ? 'hidden' : ''
})

function escListener(e) {
  if (e.key === 'Escape') {
    if (helpOpen.value) helpOpen.value = false
    if (sidebarOpen.value) sidebarOpen.value = false
  }
}

watchEffect(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('keydown', escListener)
  return () => window.removeEventListener('keydown', escListener)
})

const culturalTips = computed(() => {
  const seen = new Set()
  const tips = []
  for (const item of history.items) {
    const tip = item.culturalTip
    if (tip && !seen.has(tip)) {
      seen.add(tip)
      tips.push({ tip, frText: item.frText, category: item.category })
      if (tips.length >= 4) break
    }
  }
  if (tips.length > 0) return tips
  return defaultTips
})

const defaultTips = [
  {
    frText: 'Bonjour',
    tip: 'Em contextos formais use "Vous" em vez de "Tu". O "Bonjour" é obrigatório ao entrar em qualquer estabelecimento comercial na França.',
    category: 'Cumprimentos'
  },
  {
    frText: "S'il vous plaît",
    tip: 'Use esta expressão em situações formais com desconhecidos. Com amigos e família use "s\'il te plaît".',
    category: 'Cortesia'
  },
  {
    frText: 'Merci',
    tip: 'Em situações formais use "Merci beaucoup". Para um toque especial acrescente "Je vous remercie".',
    category: 'Cortesia'
  },
  {
    frText: 'La bise',
    tip: 'Saudação com beijos no rosto entre conhecidos — varia de 2 a 4 beijos por região. Comece com aperto de mão se inseguro.',
    category: 'Cultura'
  }
]

function pickIcon(category) {
  return icons['IMG_19']
}
</script>

<template>
  <div class="app-shell">
    <AppSidebar
      class="app-sidebar"
      :open="sidebarOpen"
      @close="closeSidebar"
    />
    <div class="app-main">
      <AppTopbar @toggle-menu="toggleSidebar" @toggle-help="toggleHelp" />
      <main class="app-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <AppToaster />

    <!-- Help Panel (cultural tips) -->
    <Transition name="help-slide">
      <aside
        v-if="helpOpen"
        class="help"
        role="dialog"
        aria-modal="true"
        aria-label="Ajuda e Dicas Culturais"
      >
        <button
          class="help__backdrop"
          type="button"
          aria-label="Fechar painel"
          @click="closeHelp"
        />

        <div class="help__card">
          <header class="help__head">
            <div>
              <span class="help__eyebrow">CENTRAL DE AJUDA</span>
              <h2 class="help__title">Dicas Culturais</h2>
            </div>
            <button
              class="help__close"
              type="button"
              aria-label="Fechar painel"
              @click="closeHelp"
            >
              <AppIcon name="cross" :size="20" />
            </button>
          </header>

          <div class="help__body">
            <section class="help__section">
              <h3 class="help__section-title">
                <span class="help__num">1</span> Como praticar
              </h3>
              <ol class="help__steps">
                <li>
                  <span class="help__step-num">1</span>
                  <div>
                    <strong>Digite a frase</strong>
                    <p>Em português ou em francês para correção.</p>
                  </div>
                </li>
                <li>
                  <span class="help__step-num">2</span>
                  <div>
                    <strong>Traduza ou corrija</strong>
                    <p>Clique em <em>Traduzir</em> ou <em>Corrigir Gramática</em>.</p>
                  </div>
                </li>
                <li>
                  <span class="help__step-num">3</span>
                  <div>
                    <strong>Ouça e pratique</strong>
                    <p>Use <em>Ouvir Lento</em> para treinar o ouvido, depois o normal.</p>
                  </div>
                </li>
              </ol>
            </section>

            <section class="help__section">
              <h3 class="help__section-title">
                <span class="help__num">2</span> Para Brasileiros
              </h3>
              <p class="help__intro">
                Cada tradução traz uma <strong>dica cultural</strong> que aparece aqui quando você precisar.
                Selecionamos as mais recentes:
              </p>
              <div class="help__tips">
                <article
                  v-for="(tip, i) in culturalTips"
                  :key="i"
                  class="help__tip-card"
                >
                  <span class="help__tip-flag">
                    <img :src="icons['FR']" alt="FR" />
                  </span>
                  <div class="help__tip-body">
                    <div class="help__tip-head">
                      <strong class="help__tip-fr">{{ tip.frText }}</strong>
                      <span v-if="tip.category" class="help__tip-tag">
                        {{ tip.category }}
                      </span>
                    </div>
                    <p>{{ tip.tip }}</p>
                  </div>
                </article>
              </div>
            </section>

            <section class="help__section help__section--inline">
              <h3 class="help__section-title">
                <span class="help__num">3</span> Atalhos
              </h3>
              <div class="help__shortcuts">
                <div class="help__kbd-row">
                  <kbd>Esc</kbd>
                  <span>fechar painéis</span>
                </div>
                <div class="help__kbd-row">
                  <kbd>Tab</kbd>
                  <span>navegar pelos botões</span>
                </div>
                <div class="help__kbd-row">
                  <kbd>Enter</kbd>
                  <span>confirmar ação</span>
                </div>
              </div>
            </section>

            <p class="help__hint">
              <span>💡</span>
              Quanto mais você traduz, mais dicas são salvas para você aqui.
            </p>
          </div>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.help {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  justify-content: flex-end;
}

.help__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: none;
  padding: 0;
  cursor: pointer;
  animation: help-fade 0.22s ease;
}

.help__card {
  position: relative;
  width: min(420px, 100%);
  height: 100dvh;
  background: var(--surface-card);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
  animation: help-card-in 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.help__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px 28px 20px;
  border-bottom: 1px solid var(--border-soft);
  flex-shrink: 0;
}

.help__eyebrow {
  display: block;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.help__title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.help__close {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--surface-sunken);
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.help__close:hover {
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.help__body {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.help__section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.help__section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.help__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
}

.help__intro {
  margin: 0;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.55;
}

.help__intro strong {
  color: var(--text-primary);
}

/* Steps */
.help__steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.help__steps li {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: var(--surface-sunken);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-soft);
}

.help__step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.help__steps li strong {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.help__steps li p {
  margin: 0;
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.5;
}

.help__steps em {
  font-style: normal;
  font-weight: 700;
  color: var(--color-primary);
}

/* Cultural tips */
.help__tips {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.help__tip-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
  border-radius: var(--radius-md);
  align-items: flex-start;
}

.help__tip-flag {
  width: 32px;
  height: 22px;
  border-radius: 4px;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  background: #fff;
}

.help__tip-flag img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.help__tip-body {
  flex: 1;
  min-width: 0;
}

.help__tip-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.help__tip-fr {
  font-family: var(--font-nav);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-tip-strong);
  letter-spacing: -0.005em;
}

.help__tip-tag {
  font-family: var(--font-nav);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.18);
  color: var(--color-accent);
}

.help__tip-card p {
  margin: 0;
  font-size: 12px;
  color: var(--color-tip-text);
  line-height: 1.55;
}

/* Shortcuts */
.help__shortcuts {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  background: var(--surface-sunken);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-soft);
}

.help__kbd-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-secondary);
}

.help__kbd-row kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 56px;
  padding: 3px 10px;
  border-radius: 6px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  box-shadow: 0 1px 0 var(--border-default);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-primary);
}

.help__hint {
  margin: 0;
  display: flex;
  gap: 10px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--color-primary-softer);
  border: 1px dashed var(--color-primary-soft);
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.help__hint span {
  font-size: 16px;
}

/* ── Transitions ── */
.help-slide-enter-active,
.help-slide-leave-active {
  transition: opacity 0.22s ease;
}
.help-slide-enter-from,
.help-slide-leave-to {
  opacity: 0;
}
.help-slide-enter-from .help__card,
.help-slide-leave-to .help__card {
  transform: translateX(100%);
}
.help-slide-enter-active .help__card,
.help-slide-leave-active .help__card {
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes help-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes help-card-in {
  from { transform: translateX(20px); opacity: 0.6; }
  to { transform: translateX(0); opacity: 1; }
}

@media (max-width: 480px) {
  .help__card {
    width: 100%;
  }
  .help__head,
  .help__body {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
