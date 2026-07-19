<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import AppToaster from '@/components/AppToaster.vue'
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="app-main">
      <AppTopbar />
      <main class="app-content">
        <router-view />
      </main>
    </div>
    <AppToaster />
  </div>
</template>
