const icons = import.meta.glob('./icons/*.{svg,webp,png}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const map = {}
for (const path in icons) {
  const name = path.replace('./icons/', '').replace(/\.(svg|webp|png)$/, '')
  map[name] = icons[path]
}

export default map
