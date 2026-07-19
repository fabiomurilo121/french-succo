<script setup>
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 18 }
})

const icons = {
  arrow: 'M5 12h14M13 5l7 7-7 7',
  refresh: 'M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5',
  star: 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z',
  starFilled: 'M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z',
  copy: 'M9 9h11v11H9zM5 5h11v3M5 5v11h3',
  mic: 'M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3',
  play: 'M5 3l14 9-14 9z',
  share: 'M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13',
  trash: 'M3 6h18M8 6v14a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 11v6M14 11v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2',
  more: 'M12 5h.01M12 12h.01M12 19h.01',
  calendar: 'M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 2v4M8 2v4M3 10h18',
  filter: 'M3 5h18l-7 8v6l-4-2v-4z',
  book: 'M4 4a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2zM6 4v16',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  bookmark: 'M6 3a2 2 0 0 0-2 2v17l7-4 7 4V5a2 2 0 0 0-2-2z',
  speaker: 'M11 5L6 9H2v6h4l5 4zM19 5a5 5 0 0 1 0 14',
  translate: 'M3 5h12M9 3v2M5 5c0 9 7 12 10 12M11 21c-3-3-7-7-7-12M14 21l5-11 5 11M16 17h6',
  grammar: 'M4 4h16v3H4zM7 7v13M12 7v13M17 7v13M4 20h16',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2',
  volume: 'M11 5L6 9H2v6h4l5 4zM15 9a3 3 0 0 1 0 6M19 6a7 7 0 0 1 0 12',
  gauge: 'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM12 12l5-5',
  flag: 'M5 21V4l8 4 8-4v12l-8 4-8-4z',
  user: 'M16 17a4 4 0 1 0-8 0M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 1 1 16 0',
  shield: 'M12 2l9 4v7c0 5-4 9-9 10-5-1-9-5-9-10V6z',
  bell: 'M18 16v-5a6 6 0 1 0-12 0v5l-2 2v1h16v-1zM10 21a2 2 0 1 0 4 0',
  zap: 'M13 2L3 14h8l-1 8 10-12h-8z',
  layers: 'M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5',
  light: 'M11 3a7 7 0 1 0 4 12l-2 4h2l-2 4h6l-2-4h2l-2-4a7 7 0 0 0-6-12z',
  flask: 'M9 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V2M8 2h8M7 14h10',
  swap: 'M7 7h14l-4-4M17 17H3l4 4',
  check: 'M5 12l5 5 9-12',
  cross: 'M6 6l12 12M18 6L6 18',
  dot: 'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  sparkles: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM18 14l.7 2.1L21 17l-2.3.9L18 20l-.7-2.1L15 17l2.3-.9zM5 14l.7 2.1L8 17l-2.3.9L5 20l-.7-2.1L2 17l2.3-.9z'
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="['icon', `icon-${name}`, { filled: name === 'starFilled' }]"
  >
    <path :d="icons[name]" />
  </svg>
</template>

<style scoped>
.icon {
  flex-shrink: 0;
  vertical-align: middle;
}

.icon.filled :deep(path) {
  fill: currentColor;
  stroke: currentColor;
}
</style>
