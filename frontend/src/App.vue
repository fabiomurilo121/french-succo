<script setup>
import { ref, watchEffect } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import AppToaster from '@/components/AppToaster.vue'

const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = sidebarOpen.value ? 'hidden' : ''
})
</script>

<template>
  <div class="app-shell">
    <AppSidebar
      :open="sidebarOpen"
      @close="closeSidebar"
      class="app-sidebar"
    />
    <div class="app-main">
      <AppTopbar @toggle-menu="toggleSidebar" />
      <main class="app-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
    <Transition name="overlay">
      <button
        v-if="sidebarOpen"
        class="sidebar-backdrop"
        type="button"
        aria-label="Fechar menu"
        @click="closeSidebar"
      />
    </Transition>
    <AppToaster />
  </div>
</template>

<style scoped>
.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 49;
  border: none;
  padding: 0;
  cursor: pointer;
  display: none;
}

@media (max-width: 959px) {
  .sidebar-backdrop {
    display: block;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--motion-base) var(--ease-out);
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
