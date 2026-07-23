const icons = import.meta.glob('./icons/*.{svg,webp,png}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const map = {}
for (const path in icons) {
  const filename = path.replace('./icons/', '')
  const baseName = filename.replace(/\.(svg|webp|png)$/, '')
  const url = icons[path]
  if (!map[baseName]) map[baseName] = url
  map[filename] = url
}

export default map
