/**
 * Ilustrações SVG para as histórias.
 * Todas usam viewBox 0 0 400 400 e paleta consistente com o app.
 */

const wrap = (inner, bg = '#e0f2fe') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice"><rect width="400" height="400" fill="${bg}"/>${inner}</svg>`

/* ── Story 1: Premier jour à Paris ── */
const airport = wrap(
  `<defs><linearGradient id="sky1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bae6fd"/><stop offset="1" stop-color="#dbeafe"/></linearGradient></defs>` +
  `<rect width="400" height="260" fill="url(#sky1)"/>` +
  `<circle cx="320" cy="70" r="32" fill="#fde68a"/>` +
  `<path d="M70 160 L180 130 L210 145 L240 130 L260 150 L240 155 L210 165 L180 160 Z" fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>` +
  `<path d="M180 130 L190 100 L210 95 L220 100 L210 145 Z" fill="#e2e8f0"/>` +
  `<circle cx="190" cy="155" r="6" fill="#0f172a"/>` +
  `<circle cx="230" cy="155" r="6" fill="#0f172a"/>` +
  `<rect x="0" y="260" width="400" height="140" fill="#cbd5e1"/>` +
  `<rect x="40" y="220" width="320" height="80" fill="#e2e8f0" stroke="#64748b" stroke-width="2" rx="4"/>` +
  `<rect x="60" y="240" width="60" height="40" fill="#bfdbfe"/>` +
  `<rect x="140" y="240" width="60" height="40" fill="#bfdbfe"/>` +
  `<rect x="220" y="240" width="60" height="40" fill="#bfdbfe"/>` +
  `<rect x="300" y="240" width="40" height="40" fill="#bfdbfe"/>` +
  `<circle cx="320" cy="340" r="18" fill="#fb923c"/>` +
  `<circle cx="320" cy="332" r="10" fill="#fde68a"/>` +
  `<rect x="316" y="358" width="8" height="22" fill="#1e293b"/>`
)

const taxi = wrap(
  `<rect width="400" height="180" fill="#fde68a"/>` +
  `<rect y="180" width="400" height="220" fill="#94a3b8"/>` +
  `<rect x="0" y="180" width="400" height="6" fill="#475569"/>` +
  `<rect x="0" y="186" width="400" height="2" fill="#fbbf24" stroke-dasharray="20 20"/>` +
  `<rect x="60" y="80" width="180" height="60" fill="#94a3b8" opacity="0.6"/>` +
  `<rect x="240" y="60" width="100" height="120" fill="#cbd5e1" opacity="0.7"/>` +
  `<rect x="60" y="220" width="280" height="100" rx="20" fill="#fbbf24" stroke="#1e293b" stroke-width="3"/>` +
  `<rect x="100" y="240" width="80" height="50" rx="6" fill="#bae6fd" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="200" y="240" width="80" height="50" rx="6" fill="#bae6fd" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="80" y="320" width="40" height="20" fill="#1e293b"/>` +
  `<rect x="280" y="320" width="40" height="20" fill="#1e293b"/>` +
  `<circle cx="100" cy="340" r="22" fill="#1e293b"/>` +
  `<circle cx="300" cy="340" r="22" fill="#1e293b"/>` +
  `<circle cx="100" cy="340" r="10" fill="#cbd5e1"/>` +
  `<circle cx="300" cy="340" r="10" fill="#cbd5e1"/>` +
  `<rect x="180" y="200" width="50" height="20" fill="#1e293b"/>` +
  `<text x="205" y="215" font-family="sans-serif" font-size="14" font-weight="700" fill="#fbbf24" text-anchor="middle">TAXI</text>`
)

const hotelReception = wrap(
  `<rect width="400" height="200" fill="#fef3c7"/>` +
  `<rect y="200" width="400" height="200" fill="#a16207"/>` +
  `<rect x="0" y="200" width="400" height="20" fill="#78350f"/>` +
  `<rect x="40" y="60" width="320" height="180" fill="#1e293b" opacity="0.4"/>` +
  `<rect x="40" y="220" width="320" height="120" fill="#92400e"/>` +
  `<rect x="40" y="220" width="320" height="20" fill="#78350f"/>` +
  `<rect x="60" y="240" width="100" height="80" rx="6" fill="#fde68a"/>` +
  `<text x="110" y="285" font-family="serif" font-size="22" font-weight="700" fill="#92400e" text-anchor="middle">HÔTEL</text>` +
  `<circle cx="260" cy="290" r="40" fill="#fbbf24"/>` +
  `<circle cx="260" cy="278" r="22" fill="#fde68a"/>` +
  `<rect x="240" y="298" width="40" height="40" fill="#1e3a8a"/>` +
  `<rect x="232" y="298" width="8" height="40" fill="#1e3a8a"/>` +
  `<rect x="280" y="298" width="8" height="40" fill="#1e3a8a"/>` +
  `<circle cx="252" cy="278" r="2" fill="#1e293b"/>` +
  `<circle cx="268" cy="278" r="2" fill="#1e293b"/>` +
  `<path d="M252 290 Q260 295 268 290" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<circle cx="340" cy="290" r="36" fill="#fda4af"/>` +
  `<circle cx="340" cy="280" r="20" fill="#fecdd3"/>` +
  `<rect x="322" y="298" width="36" height="32" fill="#0ea5e9"/>` +
  `<circle cx="332" cy="280" r="2" fill="#1e293b"/>` +
  `<circle cx="348" cy="280" r="2" fill="#1e293b"/>` +
  `<path d="M332 290 Q340 295 348 290" stroke="#1e293b" stroke-width="2" fill="none"/>`
)

const street = wrap(
  `<rect width="400" height="200" fill="#bae6fd"/>` +
  `<rect y="200" width="400" height="200" fill="#94a3b8"/>` +
  `<rect x="0" y="320" width="400" height="6" fill="#475569"/>` +
  `<rect x="0" y="326" width="400" height="2" fill="#fbbf24" stroke-dasharray="20 20"/>` +
  `<rect x="20" y="80" width="80" height="220" fill="#cbd5e1"/>` +
  `<rect x="30" y="100" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="60" y="100" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="30" y="150" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="60" y="150" width="20" height="30" fill="#bae6fd"/>` +
  `<polygon points="20,80 60,40 100,80" fill="#64748b"/>` +
  `<rect x="300" y="60" width="80" height="240" fill="#e2e8f0"/>` +
  `<rect x="310" y="80" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="340" y="80" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="310" y="130" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="340" y="130" width="20" height="30" fill="#bae6fd"/>` +
  `<polygon points="300,60 340,20 380,60" fill="#475569"/>` +
  `<circle cx="200" cy="220" r="20" fill="#fbbf24"/>` +
  `<circle cx="200" cy="210" r="11" fill="#fde68a"/>` +
  `<rect x="184" y="228" width="32" height="40" fill="#dc2626"/>` +
  `<rect x="170" y="268" width="10" height="30" fill="#1e293b"/>` +
  `<rect x="220" y="268" width="10" height="30" fill="#1e293b"/>` +
  `<circle cx="200" cy="298" r="20" fill="#92400e" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="220" y="290" width="6" height="30" fill="#1e293b"/>`,
  '#bae6fd'
)

const metro = wrap(
  `<rect width="400" height="400" fill="#1e293b"/>` +
  `<rect x="60" y="40" width="280" height="60" rx="6" fill="#dc2626"/>` +
  `<text x="200" y="85" font-family="sans-serif" font-size="32" font-weight="900" fill="#fff" text-anchor="middle" letter-spacing="6">MÉTRO</text>` +
  `<circle cx="200" cy="140" r="40" fill="#fbbf24" stroke="#fff" stroke-width="4"/>` +
  `<text x="200" y="155" font-family="serif" font-size="36" font-weight="900" fill="#1e293b" text-anchor="middle">M</text>` +
  `<rect x="80" y="200" width="240" height="160" rx="8" fill="#334155" stroke="#64748b" stroke-width="2"/>` +
  `<rect x="100" y="220" width="200" height="80" rx="4" fill="#0f172a"/>` +
  `<rect x="110" y="230" width="60" height="20" fill="#22c55e"/>` +
  `<rect x="180" y="230" width="120" height="20" fill="#1e293b" stroke="#fbbf24" stroke-width="1"/>` +
  `<rect x="110" y="260" width="180" height="14" fill="#fbbf24"/>` +
  `<rect x="110" y="280" width="120" height="10" fill="#94a3b8"/>` +
  `<rect x="120" y="320" width="80" height="24" rx="12" fill="#22c55e"/>` +
  `<text x="160" y="338" font-family="sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">VALIDER</text>` +
  `<circle cx="280" cy="360" r="14" fill="#fbbf24"/>` +
  `<text x="280" y="365" font-family="sans-serif" font-size="12" font-weight="700" fill="#1e293b" text-anchor="middle">€</text>`
)

const eiffel = wrap(
  `<defs><linearGradient id="sky2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fbbf24"/><stop offset="0.5" stop-color="#fed7aa"/><stop offset="1" stop-color="#fda4af"/></linearGradient></defs>` +
  `<rect width="400" height="280" fill="url(#sky2)"/>` +
  `<circle cx="80" cy="80" r="36" fill="#fef3c7" opacity="0.9"/>` +
  `<circle cx="80" cy="80" r="36" fill="#fde68a"/>` +
  `<rect y="280" width="400" height="120" fill="#475569"/>` +
  `<rect x="160" y="80" width="80" height="200" fill="#1e293b"/>` +
  `<polygon points="200,40 195,80 205,80" fill="#1e293b"/>` +
  `<rect x="170" y="100" width="60" height="8" fill="#475569"/>` +
  `<rect x="170" y="130" width="60" height="8" fill="#475569"/>` +
  `<rect x="170" y="170" width="60" height="8" fill="#475569"/>` +
  `<rect x="170" y="220" width="60" height="8" fill="#475569"/>` +
  `<path d="M170 280 L150 340 L250 340 L230 280 Z" fill="#1e293b"/>` +
  `<line x1="200" y1="40" x2="200" y2="280" stroke="#475569" stroke-width="2" stroke-dasharray="4 4"/>` +
  `<circle cx="200" cy="40" r="3" fill="#fbbf24"/>` +
  `<circle cx="60" cy="320" r="22" fill="#86efac"/>` +
  `<circle cx="60" cy="312" r="12" fill="#fde68a"/>` +
  `<rect x="48" y="322" width="24" height="32" fill="#dc2626"/>` +
  `<circle cx="340" cy="320" r="22" fill="#fda4af"/>` +
  `<circle cx="340" cy="312" r="12" fill="#fecdd3"/>` +
  `<rect x="328" y="322" width="24" height="32" fill="#0ea5e9"/>`
)

const cafeTerrasse = wrap(
  `<rect width="400" height="220" fill="#fef3c7"/>` +
  `<rect y="220" width="400" height="180" fill="#a16207"/>` +
  `<rect x="0" y="220" width="400" height="6" fill="#78350f"/>` +
  `<rect x="40" y="40" width="320" height="200" fill="#fff" opacity="0.7"/>` +
  `<rect x="50" y="60" width="80" height="60" fill="#bfdbfe"/>` +
  `<rect x="150" y="60" width="80" height="60" fill="#bfdbfe"/>` +
  `<rect x="250" y="60" width="80" height="60" fill="#bfdbfe"/>` +
  `<text x="200" y="180" font-family="serif" font-size="28" font-style="italic" font-weight="700" fill="#92400e" text-anchor="middle">Café de Paris</text>` +
  `<rect x="100" y="270" width="200" height="80" rx="40" fill="#dc2626"/>` +
  `<ellipse cx="200" cy="270" rx="100" ry="14" fill="#991b1b"/>` +
  `<circle cx="160" cy="260" r="14" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<circle cx="160" cy="260" r="8" fill="#7c2d12"/>` +
  `<circle cx="240" cy="260" r="14" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<circle cx="240" cy="260" r="8" fill="#7c2d12"/>` +
  `<ellipse cx="320" cy="320" rx="30" ry="6" fill="#78350f"/>` +
  `<rect x="308" y="270" width="24" height="50" fill="#fde68a"/>` +
  `<rect x="306" y="270" width="28" height="6" fill="#f59e0b"/>`
)

const hotelNight = wrap(
  `<defs><linearGradient id="sky3" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs>` +
  `<rect width="400" height="400" fill="url(#sky3)"/>` +
  `<circle cx="320" cy="70" r="6" fill="#fef3c7"/>` +
  `<circle cx="280" cy="100" r="4" fill="#fef3c7"/>` +
  `<circle cx="350" cy="130" r="5" fill="#fef3c7"/>` +
  `<circle cx="100" cy="80" r="4" fill="#fef3c7"/>` +
  `<circle cx="60" cy="140" r="3" fill="#fef3c7"/>` +
  `<rect x="60" y="200" width="280" height="180" fill="#1e293b"/>` +
  `<polygon points="60,200 200,140 340,200" fill="#0f172a"/>` +
  `<rect x="80" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="120" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="160" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="80" y="260" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="120" y="260" width="20" height="20" fill="#0f172a"/>` +
  `<rect x="160" y="260" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="200" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="240" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="280" y="220" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="200" y="260" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="240" y="260" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="280" y="260" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="120" y="300" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="160" y="300" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="200" y="300" width="20" height="20" fill="#fde68a"/>` +
  `<rect x="240" y="300" width="20" height="20" fill="#fde68a"/>` +
  `<text x="200" y="380" font-family="serif" font-size="18" font-weight="700" fill="#fbbf24" text-anchor="middle">★ HÔTEL ★</text>`
)

/* ── Story 2: Au marché de Provence ── */
const marketEntrance = wrap(
  `<rect width="400" height="160" fill="#bae6fd"/>` +
  `<rect y="160" width="400" height="240" fill="#d97706"/>` +
  `<rect y="160" width="400" height="8" fill="#92400e"/>` +
  `<rect x="0" y="240" width="400" height="160" fill="#f59e0b"/>` +
  `<rect x="40" y="200" width="60" height="60" fill="#dc2626"/>` +
  `<rect x="50" y="210" width="40" height="40" fill="#f87171"/>` +
  `<rect x="120" y="200" width="60" height="60" fill="#16a34a"/>` +
  `<rect x="130" y="210" width="40" height="40" fill="#86efac"/>` +
  `<rect x="200" y="200" width="60" height="60" fill="#ca8a04"/>` +
  `<rect x="210" y="210" width="40" height="40" fill="#fde047"/>` +
  `<rect x="280" y="200" width="60" height="60" fill="#7c2d12"/>` +
  `<rect x="290" y="210" width="40" height="40" fill="#a16207"/>` +
  `<circle cx="60" cy="280" r="22" fill="#dc2626"/>` +
  `<circle cx="120" cy="290" r="18" fill="#fb923c"/>` +
  `<circle cx="180" cy="280" r="22" fill="#facc15"/>` +
  `<circle cx="240" cy="290" r="20" fill="#86efac"/>` +
  `<circle cx="300" cy="280" r="22" fill="#a855f7"/>` +
  `<rect x="160" y="40" width="80" height="40" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<text x="200" y="68" font-family="serif" font-size="22" font-weight="700" fill="#dc2626" text-anchor="middle">MARCHÉ</text>`,
  '#fef3c7'
)

const vegetables = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect x="0" y="280" width="400" height="120" fill="#92400e"/>` +
  `<rect x="40" y="200" width="320" height="100" fill="#a16207" rx="6"/>` +
  `<rect x="40" y="200" width="320" height="10" fill="#78350f"/>` +
  `<circle cx="100" cy="240" r="28" fill="#dc2626"/>` +
  `<circle cx="100" cy="240" r="20" fill="#f87171"/>` +
  `<path d="M95 215 L100 200 L105 215" stroke="#16a34a" stroke-width="3" fill="none"/>` +
  `<circle cx="160" cy="250" r="22" fill="#fb923c"/>` +
  `<circle cx="160" cy="250" r="14" fill="#fed7aa"/>` +
  `<path d="M155 230 L160 218 L165 230" stroke="#16a34a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="220" cy="250" rx="24" ry="14" fill="#86efac"/>` +
  `<path d="M210 240 Q220 230 230 240" stroke="#16a34a" stroke-width="3" fill="none"/>` +
  `<ellipse cx="280" cy="248" rx="20" ry="26" fill="#7c3aed"/>` +
  `<ellipse cx="280" cy="248" rx="12" ry="18" fill="#a78bfa"/>` +
  `<path d="M275 222 L280 210 L285 222" stroke="#16a34a" stroke-width="3" fill="none"/>` +
  `<circle cx="330" cy="240" r="20" fill="#facc15"/>` +
  `<circle cx="330" cy="240" r="12" fill="#fde68a"/>` +
  `<circle cx="80" cy="350" r="22" fill="#fbbf24"/>` +
  `<circle cx="80" cy="342" r="12" fill="#fde68a"/>` +
  `<rect x="68" y="360" width="24" height="32" fill="#dc2626"/>`,
  '#fef3c7'
)

const cheese = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect y="280" width="400" height="120" fill="#92400e"/>` +
  `<ellipse cx="120" cy="240" rx="80" ry="30" fill="#fde047"/>` +
  `<ellipse cx="120" cy="230" rx="80" ry="30" fill="#fef08a"/>` +
  `<ellipse cx="120" cy="230" rx="40" ry="14" fill="#fbbf24"/>` +
  `<ellipse cx="240" cy="260" rx="60" ry="22" fill="#facc15"/>` +
  `<ellipse cx="240" cy="252" rx="60" ry="22" fill="#fef08a"/>` +
  `<circle cx="220" cy="252" r="6" fill="#92400e"/>` +
  `<circle cx="250" cy="248" r="5" fill="#92400e"/>` +
  `<circle cx="270" cy="254" r="5" fill="#92400e"/>` +
  `<rect x="300" y="220" width="60" height="40" rx="20" fill="#fef08a" stroke="#fbbf24" stroke-width="2"/>` +
  `<circle cx="320" cy="240" r="3" fill="#92400e"/>` +
  `<circle cx="340" cy="240" r="3" fill="#92400e"/>` +
  `<text x="200" y="350" font-family="serif" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">FROMAGES</text>`
)

const bakery = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect y="80" width="400" height="320" fill="#a16207"/>` +
  `<rect y="80" width="400" height="20" fill="#78350f"/>` +
  `<rect x="60" y="120" width="280" height="240" fill="#451a03"/>` +
  `<rect x="80" y="140" width="240" height="200" fill="#fde68a"/>` +
  `<rect x="100" y="160" width="200" height="40" fill="#d97706"/>` +
  `<text x="200" y="190" font-family="serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">BOULANGERIE</text>` +
  `<ellipse cx="140" cy="240" rx="36" ry="14" fill="#92400e"/>` +
  `<ellipse cx="140" cy="234" rx="36" ry="14" fill="#d97706"/>` +
  `<line x1="120" y1="234" x2="160" y2="234" stroke="#92400e" stroke-width="2"/>` +
  `<ellipse cx="220" cy="244" rx="40" ry="16" fill="#92400e"/>` +
  `<ellipse cx="220" cy="236" rx="40" ry="16" fill="#a16207"/>` +
  `<line x1="200" y1="236" x2="240" y2="236" stroke="#92400e" stroke-width="2"/>` +
  `<line x1="210" y1="232" x2="210" y2="240" stroke="#92400e" stroke-width="2"/>` +
  `<line x1="230" y1="232" x2="230" y2="240" stroke="#92400e" stroke-width="2"/>` +
  `<ellipse cx="290" cy="248" rx="32" ry="14" fill="#92400e"/>` +
  `<ellipse cx="290" cy="240" rx="32" ry="14" fill="#fbbf24"/>` +
  `<line x1="270" y1="240" x2="310" y2="240" stroke="#92400e" stroke-width="2"/>` +
  `<circle cx="200" cy="370" r="22" fill="#fbbf24"/>` +
  `<circle cx="200" cy="362" r="12" fill="#fde68a"/>` +
  `<rect x="188" y="380" width="24" height="20" fill="#dc2626"/>`
)

const olives = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect y="240" width="400" height="160" fill="#92400e"/>` +
  `<rect x="40" y="180" width="120" height="80" fill="#1e293b"/>` +
  `<rect x="50" y="190" width="100" height="60" fill="#16a34a"/>` +
  `<ellipse cx="80" cy="220" rx="14" ry="10" fill="#65a30d"/>` +
  `<ellipse cx="100" cy="220" rx="14" ry="10" fill="#84cc16"/>` +
  `<ellipse cx="120" cy="220" rx="14" ry="10" fill="#a3e635"/>` +
  `<ellipse cx="140" cy="220" rx="14" ry="10" fill="#65a30d"/>` +
  `<rect x="180" y="180" width="120" height="80" fill="#1e293b"/>` +
  `<rect x="190" y="190" width="100" height="60" fill="#7c2d12"/>` +
  `<ellipse cx="220" cy="220" rx="14" ry="10" fill="#451a03"/>` +
  `<ellipse cx="240" cy="220" rx="14" ry="10" fill="#78350f"/>` +
  `<ellipse cx="260" cy="220" rx="14" ry="10" fill="#451a03"/>` +
  `<ellipse cx="280" cy="220" rx="14" ry="10" fill="#78350f"/>` +
  `<rect x="320" y="180" width="60" height="80" fill="#1e293b"/>` +
  `<rect x="330" y="190" width="40" height="60" fill="#fbbf24"/>` +
  `<circle cx="350" cy="220" r="12" fill="#fde047"/>` +
  `<circle cx="200" cy="310" r="22" fill="#fda4af"/>` +
  `<circle cx="200" cy="302" r="12" fill="#fecdd3"/>` +
  `<rect x="188" y="320" width="24" height="32" fill="#0ea5e9"/>` +
  `<path d="M218 296 Q220 280 230 280" stroke="#fda4af" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  '#fef3c7'
)

const vendor = wrap(
  `<rect width="400" height="280" fill="#fef3c7"/>` +
  `<rect y="280" width="400" height="120" fill="#a16207"/>` +
  `<rect x="0" y="240" width="400" height="40" fill="#d97706"/>` +
  `<rect x="40" y="200" width="60" height="60" fill="#dc2626"/>` +
  `<rect x="120" y="210" width="50" height="50" fill="#16a34a"/>` +
  `<rect x="190" y="200" width="60" height="60" fill="#facc15"/>` +
  `<rect x="270" y="210" width="50" height="50" fill="#7c3aed"/>` +
  `<circle cx="130" cy="150" r="36" fill="#fbbf24"/>` +
  `<circle cx="130" cy="138" r="22" fill="#fde68a"/>` +
  `<rect x="108" y="160" width="44" height="50" fill="#16a34a"/>` +
  `<rect x="100" y="158" width="8" height="50" fill="#16a34a"/>` +
  `<rect x="152" y="158" width="8" height="50" fill="#16a34a"/>` +
  `<circle cx="122" cy="138" r="2" fill="#1e293b"/>` +
  `<circle cx="138" cy="138" r="2" fill="#1e293b"/>` +
  `<path d="M120 148 Q130 156 140 148" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<circle cx="260" cy="170" r="30" fill="#fda4af"/>` +
  `<circle cx="260" cy="160" r="18" fill="#fecdd3"/>` +
  `<rect x="240" y="170" width="40" height="40" fill="#dc2626"/>` +
  `<circle cx="252" cy="160" r="2" fill="#1e293b"/>` +
  `<circle cx="268" cy="160" r="2" fill="#1e293b"/>` +
  `<path d="M250 168 Q260 174 270 168" stroke="#1e293b" stroke-width="2" fill="none"/>`,
  '#fef3c7'
)

const payment = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect y="280" width="400" height="120" fill="#92400e"/>` +
  `<rect x="40" y="240" width="320" height="80" fill="#1e293b"/>` +
  `<rect x="50" y="250" width="300" height="60" fill="#0f172a"/>` +
  `<rect x="60" y="260" width="100" height="40" fill="#22c55e"/>` +
  `<text x="110" y="288" font-family="monospace" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">€ 5,00</text>` +
  `<circle cx="200" cy="160" r="22" fill="#fda4af"/>` +
  `<circle cx="200" cy="152" r="12" fill="#fecdd3"/>` +
  `<rect x="188" y="170" width="24" height="30" fill="#dc2626"/>` +
  `<circle cx="240" cy="170" r="14" fill="#fbbf24"/>` +
  `<circle cx="248" cy="170" r="14" fill="#a16207"/>` +
  `<circle cx="256" cy="170" r="14" fill="#facc15"/>` +
  `<circle cx="160" cy="170" r="14" fill="#fbbf24"/>` +
  `<circle cx="168" cy="170" r="14" fill="#a16207"/>`,
  '#fef3c7'
)

const basket = wrap(
  `<rect width="400" height="400" fill="#d1fae5"/>` +
  `<ellipse cx="200" cy="340" rx="140" ry="20" fill="#92400e"/>` +
  `<path d="M80 320 L100 240 L300 240 L320 320 Z" fill="#a16207"/>` +
  `<path d="M80 320 L320 320 L320 340 L80 340 Z" fill="#78350f"/>` +
  `<path d="M100 240 Q200 180 300 240" stroke="#78350f" stroke-width="4" fill="none"/>` +
  `<circle cx="140" cy="230" r="22" fill="#dc2626"/>` +
  `<circle cx="140" cy="222" r="12" fill="#f87171"/>` +
  `<ellipse cx="200" cy="220" rx="30" ry="14" fill="#fde047"/>` +
  `<ellipse cx="200" cy="214" rx="30" ry="14" fill="#facc15"/>` +
  `<ellipse cx="250" cy="220" rx="22" ry="10" fill="#92400e"/>` +
  `<ellipse cx="250" cy="214" rx="22" ry="10" fill="#d97706"/>` +
  `<circle cx="180" cy="200" r="14" fill="#16a34a"/>` +
  `<circle cx="220" cy="195" r="12" fill="#86efac"/>`,
  '#d1fae5'
)

/* ── Story 3: Une rencontre au parc ── */
const parkWalk = wrap(
  `<defs><linearGradient id="sky4" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#bae6fd"/><stop offset="1" stop-color="#86efac"/></linearGradient></defs>` +
  `<rect width="400" height="400" fill="url(#sky4)"/>` +
  `<circle cx="320" cy="80" r="36" fill="#fde68a"/>` +
  `<path d="M0 280 Q200 250 400 280 L400 400 L0 400 Z" fill="#22c55e"/>` +
  `<path d="M180 280 Q200 270 220 280 L240 380 L160 380 Z" fill="#a16207"/>` +
  `<circle cx="200" cy="240" r="60" fill="#16a34a"/>` +
  `<circle cx="200" cy="220" r="40" fill="#22c55e"/>` +
  `<circle cx="170" cy="200" r="30" fill="#22c55e"/>` +
  `<circle cx="230" cy="200" r="30" fill="#22c55e"/>` +
  `<circle cx="120" cy="280" r="40" fill="#16a34a"/>` +
  `<circle cx="120" cy="270" r="28" fill="#22c55e"/>` +
  `<circle cx="300" cy="290" r="40" fill="#16a34a"/>` +
  `<circle cx="300" cy="280" r="28" fill="#22c55e"/>` +
  `<circle cx="180" cy="320" r="20" fill="#fbbf24"/>` +
  `<circle cx="180" cy="312" r="11" fill="#fde68a"/>` +
  `<rect x="168" y="328" width="24" height="32" fill="#dc2626"/>`,
  '#d1fae5'
)

const twoPeople = wrap(
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="320" cy="60" r="30" fill="#fde68a"/>` +
  `<circle cx="100" cy="180" r="34" fill="#16a34a"/>` +
  `<circle cx="100" cy="170" r="22" fill="#22c55e"/>` +
  `<circle cx="300" cy="180" r="34" fill="#16a34a"/>` +
  `<circle cx="300" cy="170" r="22" fill="#22c55e"/>` +
  `<circle cx="160" cy="220" r="28" fill="#fbbf24"/>` +
  `<circle cx="160" cy="212" r="14" fill="#fde68a"/>` +
  `<rect x="148" y="232" width="24" height="40" fill="#0ea5e9"/>` +
  `<rect x="140" y="270" width="8" height="30" fill="#1e293b"/>` +
  `<rect x="172" y="270" width="8" height="30" fill="#1e293b"/>` +
  `<circle cx="240" cy="220" r="28" fill="#fda4af"/>` +
  `<circle cx="240" cy="212" r="14" fill="#fecdd3"/>` +
  `<rect x="228" y="232" width="24" height="40" fill="#dc2626"/>` +
  `<rect x="220" y="270" width="8" height="30" fill="#1e293b"/>` +
  `<rect x="252" y="270" width="8" height="30" fill="#1e293b"/>`,
  '#d1fae5'
)

const greeting = wrap(
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="320" cy="60" r="30" fill="#fde68a"/>` +
  `<circle cx="160" cy="220" r="30" fill="#fbbf24"/>` +
  `<circle cx="160" cy="212" r="15" fill="#fde68a"/>` +
  `<rect x="148" y="234" width="24" height="40" fill="#0ea5e9"/>` +
  `<path d="M180 220 Q190 200 200 215" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M200 215 L210 220" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<circle cx="240" cy="220" r="30" fill="#fda4af"/>` +
  `<circle cx="240" cy="212" r="15" fill="#fecdd3"/>` +
  `<rect x="228" y="234" width="24" height="40" fill="#dc2626"/>` +
  `<path d="M220 220 Q210 200 200 215" stroke="#fecdd3" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<text x="200" y="150" font-family="sans-serif" font-size="32" font-weight="700" fill="#dc2626" text-anchor="middle">Bonjour !</text>`,
  '#d1fae5'
)

const sun = wrap(
  `<defs><radialGradient id="sunG" cx="0.5" cy="0.5"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#fbbf24"/></radialGradient></defs>` +
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="200" cy="90" r="50" fill="url(#sunG)"/>` +
  `<g stroke="#fbbf24" stroke-width="4" stroke-linecap="round"><line x1="200" y1="20" x2="200" y2="40"/><line x1="280" y1="90" x2="300" y2="90"/><line x1="120" y1="90" x2="100" y2="90"/><line x1="260" y1="30" x2="250" y2="45"/><line x1="140" y1="30" x2="150" y2="45"/><line x1="260" y1="150" x2="250" y2="135"/><line x1="140" y1="150" x2="150" y2="135"/></g>` +
  `<circle cx="140" cy="230" r="22" fill="#fbbf24"/>` +
  `<circle cx="140" cy="222" r="11" fill="#fde68a"/>` +
  `<rect x="128" y="240" width="24" height="36" fill="#0ea5e9"/>` +
  `<circle cx="260" cy="230" r="22" fill="#fda4af"/>` +
  `<circle cx="260" cy="222" r="11" fill="#fecdd3"/>` +
  `<rect x="248" y="240" width="24" height="36" fill="#dc2626"/>` +
  `<text x="200" y="180" font-family="serif" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">Quel beau temps !</text>`,
  '#d1fae5'
)

const handshake = wrap(
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="140" cy="220" r="36" fill="#fbbf24"/>` +
  `<circle cx="140" cy="208" r="18" fill="#fde68a"/>` +
  `<rect x="120" y="232" width="40" height="60" fill="#0ea5e9"/>` +
  `<circle cx="260" cy="220" r="36" fill="#fda4af"/>` +
  `<circle cx="260" cy="208" r="18" fill="#fecdd3"/>` +
  `<rect x="240" y="232" width="40" height="60" fill="#dc2626"/>` +
  `<ellipse cx="200" cy="260" rx="36" ry="22" fill="#fde68a"/>` +
  `<ellipse cx="200" cy="260" rx="22" ry="14" fill="#fbbf24"/>` +
  `<path d="M170 250 Q200 240 230 250" stroke="#92400e" stroke-width="3" fill="none"/>`,
  '#d1fae5'
)

const phone = wrap(
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="140" cy="220" r="34" fill="#fbbf24"/>` +
  `<circle cx="140" cy="210" r="18" fill="#fde68a"/>` +
  `<rect x="120" y="232" width="40" height="50" fill="#0ea5e9"/>` +
  `<circle cx="260" cy="220" r="34" fill="#fda4af"/>` +
  `<circle cx="260" cy="210" r="18" fill="#fecdd3"/>` +
  `<rect x="240" y="232" width="40" height="50" fill="#dc2626"/>` +
  `<rect x="160" y="250" width="80" height="60" rx="8" fill="#1e293b"/>` +
  `<rect x="166" y="256" width="68" height="48" rx="4" fill="#bae6fd"/>` +
  `<text x="200" y="290" font-family="monospace" font-size="18" font-weight="700" fill="#1e293b" text-anchor="middle">06 12 34 56 78</text>`,
  '#d1fae5'
)

const waving = wrap(
  `<rect width="400" height="220" fill="#bae6fd"/>` +
  `<rect y="220" width="400" height="180" fill="#22c55e"/>` +
  `<circle cx="140" cy="220" r="34" fill="#fbbf24"/>` +
  `<circle cx="140" cy="210" r="18" fill="#fde68a"/>` +
  `<rect x="120" y="232" width="40" height="50" fill="#0ea5e9"/>` +
  `<path d="M110 200 Q90 180 100 160" stroke="#fde68a" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M100 160 L88 145" stroke="#fde68a" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M100 160 L110 142" stroke="#fde68a" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<circle cx="260" cy="220" r="34" fill="#fda4af"/>` +
  `<circle cx="260" cy="210" r="18" fill="#fecdd3"/>` +
  `<rect x="240" y="232" width="40" height="50" fill="#dc2626"/>` +
  `<path d="M290 200 Q310 180 300 160" stroke="#fecdd3" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M300 160 L312 145" stroke="#fecdd3" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<path d="M300 160 L290 142" stroke="#fecdd3" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<text x="200" y="150" font-family="serif" font-size="22" font-weight="700" fill="#dc2626" text-anchor="middle">Au revoir !</text>`,
  '#d1fae5'
)

const calendar = wrap(
  `<rect width="400" height="400" fill="#fef3c7"/>` +
  `<rect x="80" y="80" width="240" height="280" rx="12" fill="#fff" stroke="#1e293b" stroke-width="3"/>` +
  `<rect x="80" y="80" width="240" height="60" fill="#dc2626"/>` +
  `<rect x="100" y="60" width="20" height="40" rx="6" fill="#1e293b"/>` +
  `<rect x="280" y="60" width="20" height="40" rx="6" fill="#1e293b"/>` +
  `<text x="200" y="120" font-family="sans-serif" font-size="22" font-weight="700" fill="#fff" text-anchor="middle">SAMEDI</text>` +
  `<text x="120" y="220" font-family="sans-serif" font-size="36" font-weight="900" fill="#1e293b" text-anchor="middle">15</text>` +
  `<circle cx="240" cy="220" r="8" fill="#22c55e"/>` +
  `<text x="160" y="300" font-family="serif" font-size="14" font-weight="700" fill="#1e293b">Café — 15h</text>`,
  '#fef3c7'
)

/* ── Story 4: À la pharmacie ── */
const sick = wrap(
  `<rect width="400" height="400" fill="#fecdd3"/>` +
  `<rect x="40" y="280" width="320" height="100" fill="#fff" stroke="#1e293b" stroke-width="3" rx="6"/>` +
  `<rect x="40" y="280" width="320" height="20" fill="#94a3b8"/>` +
  `<rect x="60" y="300" width="80" height="60" fill="#bae6fd" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="240" y="300" width="80" height="60" fill="#bae6fd" stroke="#1e293b" stroke-width="2"/>` +
  `<circle cx="200" cy="200" r="50" fill="#fbbf24"/>` +
  `<circle cx="200" cy="188" r="26" fill="#fde68a"/>` +
  `<rect x="178" y="212" width="44" height="60" fill="#fde68a"/>` +
  `<rect x="178" y="220" width="44" height="14" fill="#dc2626"/>` +
  `<rect x="170" y="220" width="60" height="6" fill="#dc2626"/>` +
  `<path d="M168 180 Q160 165 175 160" stroke="#fde68a" stroke-width="10" fill="none" stroke-linecap="round"/>` +
  `<circle cx="186" cy="188" r="3" fill="#1e293b"/>` +
  `<circle cx="214" cy="188" r="3" fill="#1e293b"/>` +
  `<path d="M188 200 Q200 195 212 200" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<rect x="180" y="40" width="40" height="6" rx="3" fill="#dc2626"/>` +
  `<rect x="195" y="32" width="10" height="22" rx="5" fill="#dc2626"/>` +
  `<circle cx="200" cy="26" r="6" fill="#fbbf24"/>`,
  '#fecdd3'
)

const pharmacyDoor = wrap(
  `<rect width="400" height="280" fill="#bae6fd"/>` +
  `<rect y="280" width="400" height="120" fill="#64748b"/>` +
  `<rect x="60" y="80" width="280" height="240" fill="#fff" stroke="#1e293b" stroke-width="3"/>` +
  `<rect x="60" y="80" width="280" height="40" fill="#22c55e"/>` +
  `<rect x="170" y="60" width="60" height="60" fill="#22c55e"/>` +
  `<rect x="190" y="60" width="20" height="60" fill="#fff"/>` +
  `<rect x="180" y="80" width="40" height="20" fill="#fff"/>` +
  `<text x="200" y="115" font-family="sans-serif" font-size="32" font-weight="900" fill="#fff" text-anchor="middle">+</text>` +
  `<rect x="100" y="140" width="80" height="120" fill="#bae6fd"/>` +
  `<rect x="220" y="140" width="80" height="120" fill="#bae6fd"/>` +
  `<rect x="100" y="280" width="200" height="40" fill="#22c55e"/>` +
  `<text x="200" y="306" font-family="sans-serif" font-size="20" font-weight="700" fill="#fff" text-anchor="middle">PHARMACIE</text>` +
  `<circle cx="320" cy="330" r="22" fill="#fbbf24"/>` +
  `<circle cx="320" cy="322" r="12" fill="#fde68a"/>` +
  `<rect x="308" y="340" width="24" height="32" fill="#dc2626"/>`,
  '#bae6fd'
)

const pharmacyInterior = wrap(
  `<rect width="400" height="400" fill="#f1f5f9"/>` +
  `<rect x="0" y="80" width="400" height="220" fill="#cbd5e1"/>` +
  `<rect x="0" y="300" width="400" height="100" fill="#94a3b8"/>` +
  `<rect x="20" y="100" width="60" height="60" fill="#dc2626"/>` +
  `<rect x="90" y="100" width="60" height="60" fill="#22c55e"/>` +
  `<rect x="160" y="100" width="60" height="60" fill="#3b82f6"/>` +
  `<rect x="230" y="100" width="60" height="60" fill="#fbbf24"/>` +
  `<rect x="300" y="100" width="60" height="60" fill="#a855f7"/>` +
  `<rect x="20" y="170" width="60" height="60" fill="#0ea5e9"/>` +
  `<rect x="90" y="170" width="60" height="60" fill="#dc2626"/>` +
  `<rect x="160" y="170" width="60" height="60" fill="#16a34a"/>` +
  `<rect x="230" y="170" width="60" height="60" fill="#f97316"/>` +
  `<rect x="300" y="170" width="60" height="60" fill="#22c55e"/>` +
  `<rect x="40" y="320" width="320" height="60" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<circle cx="120" cy="320" r="24" fill="#fda4af"/>` +
  `<circle cx="120" cy="312" r="12" fill="#fecdd3"/>` +
  `<rect x="108" y="332" width="24" height="40" fill="#dc2626"/>` +
  `<circle cx="280" cy="320" r="24" fill="#fbbf24"/>` +
  `<circle cx="280" cy="312" r="12" fill="#fde68a"/>` +
  `<rect x="268" y="332" width="24" height="40" fill="#0ea5e9"/>`,
  '#f1f5f9'
)

const symptoms = wrap(
  `<rect width="400" height="400" fill="#f1f5f9"/>` +
  `<rect x="0" y="280" width="400" height="120" fill="#94a3b8"/>` +
  `<rect x="40" y="240" width="320" height="80" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<circle cx="120" cy="200" r="32" fill="#fbbf24"/>` +
  `<circle cx="120" cy="190" r="16" fill="#fde68a"/>` +
  `<rect x="104" y="210" width="32" height="60" fill="#dc2626"/>` +
  `<path d="M108 200 Q100 188 112 184" stroke="#fde68a" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  `<circle cx="112" cy="190" r="2" fill="#1e293b"/>` +
  `<circle cx="128" cy="190" r="2" fill="#1e293b"/>` +
  `<circle cx="280" cy="200" r="32" fill="#fda4af"/>` +
  `<circle cx="280" cy="190" r="16" fill="#fecdd3"/>` +
  `<rect x="264" y="210" width="32" height="60" fill="#0ea5e9"/>` +
  `<circle cx="272" cy="190" r="2" fill="#1e293b"/>` +
  `<circle cx="288" cy="190" r="2" fill="#1e293b"/>` +
  `<path d="M270 198 Q280 204 290 198" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<rect x="60" y="262" width="60" height="40" rx="6" fill="#fef3c7" stroke="#1e293b" stroke-width="2"/>` +
  `<line x1="68" y1="278" x2="112" y2="278" stroke="#1e293b" stroke-width="2"/>` +
  `<line x1="68" y1="290" x2="100" y2="290" stroke="#1e293b" stroke-width="2"/>`,
  '#f1f5f9'
)

const medicine = wrap(
  `<rect width="400" height="400" fill="#f1f5f9"/>` +
  `<rect x="100" y="140" width="200" height="160" rx="8" fill="#fff" stroke="#dc2626" stroke-width="3"/>` +
  `<rect x="100" y="140" width="200" height="40" fill="#dc2626"/>` +
  `<text x="200" y="168" font-family="sans-serif" font-size="16" font-weight="700" fill="#fff" text-anchor="middle">DOLIPRANE</text>` +
  `<text x="200" y="220" font-family="serif" font-size="24" font-weight="900" fill="#1e293b" text-anchor="middle">1000mg</text>` +
  `<rect x="120" y="240" width="160" height="40" rx="6" fill="#fef3c7"/>` +
  `<circle cx="140" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="160" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="180" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="200" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="220" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="240" cy="260" r="6" fill="#1e293b"/>` +
  `<circle cx="260" cy="260" r="6" fill="#1e293b"/>`,
  '#f1f5f9'
)

const dosage = wrap(
  `<rect width="400" height="400" fill="#f1f5f9"/>` +
  `<rect x="80" y="180" width="120" height="140" rx="8" fill="#fff" stroke="#dc2626" stroke-width="3"/>` +
  `<rect x="80" y="180" width="120" height="20" fill="#dc2626"/>` +
  `<text x="140" y="240" font-family="serif" font-size="18" font-weight="900" fill="#1e293b" text-anchor="middle">DOLI</text>` +
  `<text x="140" y="270" font-family="serif" font-size="14" font-weight="700" fill="#1e293b" text-anchor="middle">1000mg</text>` +
  `<circle cx="280" cy="220" r="36" fill="#fbbf24"/>` +
  `<circle cx="280" cy="208" r="18" fill="#fde68a"/>` +
  `<rect x="262" y="230" width="36" height="50" fill="#dc2626"/>` +
  `<path d="M260 220 Q280 200 300 220" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<circle cx="272" cy="208" r="2" fill="#1e293b"/>` +
  `<circle cx="288" cy="208" r="2" fill="#1e293b"/>` +
  `<path d="M270 216 Q280 222 290 216" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<text x="140" y="340" font-family="sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">3× / jour</text>`,
  '#f1f5f9'
)

const leavingPharmacy = wrap(
  `<rect width="400" height="280" fill="#bae6fd"/>` +
  `<rect y="280" width="400" height="120" fill="#64748b"/>` +
  `<rect x="40" y="80" width="200" height="220" fill="#fff" stroke="#1e293b" stroke-width="3"/>` +
  `<rect x="40" y="80" width="200" height="30" fill="#22c55e"/>` +
  `<rect x="170" y="60" width="50" height="50" fill="#22c55e"/>` +
  `<rect x="190" y="60" width="14" height="50" fill="#fff"/>` +
  `<rect x="180" y="80" width="34" height="14" fill="#fff"/>` +
  `<text x="200" y="115" font-family="sans-serif" font-size="22" font-weight="900" fill="#fff" text-anchor="middle">+</text>` +
  `<text x="140" y="270" font-family="sans-serif" font-size="16" font-weight="700" fill="#1e293b" text-anchor="middle">PHARMACIE</text>` +
  `<circle cx="300" cy="240" r="28" fill="#fbbf24"/>` +
  `<circle cx="300" cy="230" r="14" fill="#fde68a"/>` +
  `<rect x="286" y="250" width="28" height="50" fill="#dc2626"/>` +
  `<rect x="316" y="232" width="20" height="24" rx="4" fill="#fff" stroke="#dc2626" stroke-width="2"/>` +
  `<rect x="320" y="226" width="12" height="6" fill="#dc2626"/>`,
  '#bae6fd'
)

/* ── Hero scenes (large, detailed illustrations for narrative mode) ── */
const parisHero = wrap(
  `<defs>
    <linearGradient id="ph-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1e1b4b"/>
      <stop offset="0.18" stop-color="#7c3aed"/>
      <stop offset="0.4" stop-color="#f472b6"/>
      <stop offset="0.65" stop-color="#fb923c"/>
      <stop offset="0.85" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#bae6fd"/>
    </linearGradient>
    <linearGradient id="ph-river" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#3b0764"/>
      <stop offset="0.4" stop-color="#9333ea"/>
      <stop offset="0.7" stop-color="#ec4899"/>
      <stop offset="1" stop-color="#7c2d12"/>
    </linearGradient>
    <linearGradient id="ph-tower" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1e293b"/>
      <stop offset="0.45" stop-color="#334155"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="ph-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fffbeb"/>
      <stop offset="0.3" stop-color="#fef3c7"/>
      <stop offset="0.7" stop-color="#fbbf24" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ph-towerlight" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef08a"/>
      <stop offset="0.4" stop-color="#fbbf24" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <filter id="ph-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" />
    </filter>
  </defs>` +
  // sky gradient — Paris dawn
  `<rect width="400" height="400" fill="url(#ph-sky)"/>` +
  // giant soft sun glow
  `<circle cx="80" cy="120" r="120" fill="url(#ph-sun)" opacity="0.85"/>` +
  `<circle cx="80" cy="120" r="46" fill="#fffbeb"/>` +
  `<circle cx="80" cy="120" r="34" fill="#fef3c7"/>` +
  // stars (subtle)
  `<circle cx="320" cy="40" r="1.2" fill="#fff" opacity="0.9"/>` +
  `<circle cx="280" cy="60" r="0.8" fill="#fff" opacity="0.7"/>` +
  `<circle cx="370" cy="30" r="1" fill="#fff" opacity="0.8"/>` +
  // birds (V formation)
  `<path d="M210 50 q4 -6 8 0 q4 -6 8 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  `<path d="M245 70 q4 -6 8 0 q4 -6 8 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  `<path d="M280 90 q3 -5 6 0 q3 -5 6 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  // warm clouds
  `<ellipse cx="320" cy="100" rx="44" ry="9" fill="#fbcfe8" opacity="0.7"/>` +
  `<ellipse cx="332" cy="96" rx="24" ry="10" fill="#fce7f3" opacity="0.85"/>` +
  `<ellipse cx="180" cy="60" rx="32" ry="6" fill="#fed7aa" opacity="0.6"/>` +
  `<ellipse cx="350" cy="170" rx="38" ry="5" fill="#fbcfe8" opacity="0.4"/>` +
  // Seine river (warm sunset reflections)
  `<rect y="270" width="400" height="130" fill="url(#ph-river)"/>` +
  `<rect x="0" y="268" width="400" height="4" fill="#0f172a"/>` +
  // shimmer on river
  `<path d="M0 280 Q100 276 200 282 T400 278" stroke="#fef3c7" stroke-width="2" fill="none" opacity="0.55"/>` +
  `<path d="M0 302 Q150 298 280 304 T400 300" stroke="#fde68a" stroke-width="1.8" fill="none" opacity="0.5"/>` +
  `<path d="M0 325 Q120 322 240 328 T400 324" stroke="#fed7aa" stroke-width="1.5" fill="none" opacity="0.4"/>` +
  `<path d="M0 350 Q160 348 300 354 T400 350" stroke="#fbcfe8" stroke-width="1.5" fill="none" opacity="0.35"/>` +
  `<path d="M0 375 Q140 373 280 378 T400 375" stroke="#fce7f3" stroke-width="1.2" fill="none" opacity="0.3"/>` +
  // EIFFEL TOWER — detailed lattice
  `<rect x="172" y="100" width="56" height="145" fill="url(#ph-tower)"/>` +
  `<polygon points="200,38 188,100 212,100" fill="url(#ph-tower)"/>` +
  // tower lattice — X-beams
  `<g stroke="#94a3b8" stroke-width="0.6" opacity="0.7">` +
  `<line x1="172" y1="100" x2="228" y2="120"/>` +
  `<line x1="172" y1="120" x2="228" y2="100"/>` +
  `<line x1="172" y1="130" x2="228" y2="150"/>` +
  `<line x1="172" y1="150" x2="228" y2="130"/>` +
  `<line x1="172" y1="160" x2="228" y2="180"/>` +
  `<line x1="172" y1="180" x2="228" y2="160"/>` +
  `<line x1="172" y1="190" x2="228" y2="210"/>` +
  `<line x1="172" y1="210" x2="228" y2="190"/>` +
  `<line x1="174" y1="220" x2="226" y2="238"/>` +
  `<line x1="174" y1="238" x2="226" y2="220"/>` +
  `</g>` +
  // tower platforms
  `<rect x="170" y="114" width="60" height="4" fill="#1e293b"/>` +
  `<rect x="168" y="148" width="64" height="5" fill="#1e293b"/>` +
  `<rect x="164" y="186" width="72" height="6" fill="#1e293b"/>` +
  // arches on platforms
  `<path d="M180 118 Q200 105 218 118" stroke="#94a3b8" stroke-width="1.2" fill="none"/>` +
  `<path d="M180 153 Q200 138 220 153" stroke="#94a3b8" stroke-width="1.2" fill="none"/>` +
  `<path d="M178 192 Q200 172 222 192" stroke="#94a3b8" stroke-width="1.2" fill="none"/>` +
  // antenna
  `<line x1="200" y1="38" x2="200" y2="18" stroke="#fbbf24" stroke-width="2"/>` +
  `<circle cx="200" cy="38" r="14" fill="url(#ph-towerlight)"/>` +
  `<circle cx="200" cy="38" r="3" fill="#fef3c7"/>` +
  // tower base
  `<path d="M168 245 L138 295 L262 295 L232 245 Z" fill="url(#ph-tower)"/>` +
  `<path d="M168 245 L138 295 L152 295 L182 245 Z" fill="#0f172a" opacity="0.4"/>` +
  // ===== LEFT BUILDINGS =====
  // far left museum-style
  `<rect x="10" y="158" width="60" height="105" fill="#fde68a" stroke="#1e293b" stroke-width="1.5"/>` +
  `<polygon points="6,158 40,126 74,158" fill="#92400e"/>` +
  `<rect x="6" y="158" width="68" height="8" fill="#1e293b"/>` +
  `<rect x="20" y="170" width="9" height="20" fill="#f97316"/>` +
  `<rect x="34" y="170" width="9" height="20" fill="#f97316"/>` +
  `<rect x="48" y="170" width="9" height="20" fill="#f97316"/>` +
  `<rect x="20" y="200" width="9" height="20" fill="#f97316"/>` +
  `<rect x="34" y="200" width="9" height="20" fill="#f97316"/>` +
  `<rect x="48" y="200" width="9" height="20" fill="#f97316"/>` +
  `<rect x="20" y="230" width="9" height="20" fill="#f97316"/>` +
  `<rect x="34" y="230" width="9" height="20" fill="#f97316"/>` +
  `<rect x="48" y="230" width="9" height="20" fill="#f97316"/>` +
  // classic Haussmann next
  `<rect x="84" y="138" width="50" height="125" fill="#fef3c7" stroke="#1e293b" stroke-width="1.5"/>` +
  `<polygon points="80,138 109,108 138,138" fill="#1e293b"/>` +
  `<rect x="80" y="138" width="58" height="5" fill="#0f172a"/>` +
  // chimney
  `<rect x="104" y="112" width="6" height="14" fill="#1e293b"/>` +
  // windows with shutters
  `<rect x="92" y="156" width="14" height="22" fill="#fde68a"/>` +
  `<rect x="88" y="154" width="4" height="26" fill="#7c2d12"/>` +
  `<rect x="106" y="154" width="4" height="26" fill="#7c2d12"/>` +
  `<rect x="118" y="156" width="14" height="22" fill="#fde68a"/>` +
  `<rect x="114" y="154" width="4" height="26" fill="#7c2d12"/>` +
  `<rect x="132" y="154" width="4" height="26" fill="#7c2d12"/>` +
  // row 2
  `<rect x="92" y="188" width="14" height="20" fill="#fde68a"/>` +
  `<rect x="88" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="106" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="118" y="188" width="14" height="20" fill="#fde68a"/>` +
  `<rect x="114" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="132" y="186" width="4" height="24" fill="#7c2d12"/>` +
  // row 3
  `<rect x="92" y="218" width="14" height="20" fill="#fde68a"/>` +
  `<rect x="88" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="106" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="118" y="218" width="14" height="20" fill="#fde68a"/>` +
  `<rect x="114" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="132" y="216" width="4" height="24" fill="#7c2d12"/>` +
  // balcony
  `<rect x="86" y="252" width="46" height="3" fill="#0f172a"/>` +
  `<rect x="86" y="252" width="3" height="8" fill="#0f172a"/>` +
  `<rect x="129" y="252" width="3" height="8" fill="#0f172a"/>` +
  `<rect x="92" y="255" width="2" height="6" fill="#0f172a"/>` +
  `<rect x="100" y="255" width="2" height="6" fill="#0f172a"/>` +
  `<rect x="108" y="255" width="2" height="6" fill="#0f172a"/>` +
  `<rect x="116" y="255" width="2" height="6" fill="#0f172a"/>` +
  `<rect x="124" y="255" width="2" height="6" fill="#0f172a"/>` +
  // ===== RIGHT BUILDINGS =====
  // classic Haussmann
  `<rect x="244" y="142" width="48" height="121" fill="#fde68a" stroke="#1e293b" stroke-width="1.5"/>` +
  `<polygon points="240,142 268,114 296,142" fill="#1e293b"/>` +
  `<rect x="240" y="142" width="56" height="5" fill="#0f172a"/>` +
  `<rect x="262" y="118" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="252" y="158" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="248" y="156" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="265" y="156" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="272" y="158" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="268" y="156" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="285" y="156" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="252" y="188" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="248" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="265" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="272" y="188" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="268" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="285" y="186" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="252" y="218" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="248" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="265" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="272" y="218" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="268" y="216" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="285" y="216" width="4" height="24" fill="#7c2d12"/>` +
  // far right taller building
  `<rect x="304" y="160" width="56" height="103" fill="#fde68a" stroke="#1e293b" stroke-width="1.5"/>` +
  `<polygon points="300,160 332,130 364,160" fill="#1e293b"/>` +
  `<rect x="300" y="160" width="64" height="5" fill="#0f172a"/>` +
  `<rect x="312" y="178" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="308" y="176" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="325" y="176" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="336" y="178" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="332" y="176" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="349" y="176" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="312" y="208" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="308" y="206" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="325" y="206" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="336" y="208" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="332" y="206" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="349" y="206" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="312" y="238" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="308" y="236" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="325" y="236" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="336" y="238" width="13" height="20" fill="#fde68a"/>` +
  `<rect x="332" y="236" width="4" height="24" fill="#7c2d12"/>` +
  `<rect x="349" y="236" width="4" height="24" fill="#7c2d12"/>` +
  // small far right building
  `<rect x="370" y="180" width="28" height="83" fill="#cbd5e1" stroke="#1e293b" stroke-width="1.5"/>` +
  `<polygon points="368,180 384,168 400,180" fill="#1e293b"/>` +
  `<rect x="370" y="180" width="28" height="4" fill="#0f172a"/>` +
  `<rect x="376" y="194" width="6" height="10" fill="#bae6fd"/>` +
  `<rect x="386" y="194" width="6" height="10" fill="#bae6fd"/>` +
  `<rect x="376" y="212" width="6" height="10" fill="#bae6fd"/>` +
  `<rect x="386" y="212" width="6" height="10" fill="#bae6fd"/>` +
  `<rect x="376" y="230" width="6" height="10" fill="#bae6fd"/>` +
  `<rect x="386" y="230" width="6" height="10" fill="#bae6fd"/>` +
  // ===== BRIDGE =====
  `<rect x="0" y="262" width="400" height="10" fill="#1e293b"/>` +
  `<rect x="0" y="258" width="400" height="4" fill="#334155"/>` +
  // bridge arches
  `<path d="M40 268 Q100 240 160 268" stroke="#1e293b" stroke-width="3" fill="none"/>` +
  `<path d="M160 268 Q200 250 240 268" stroke="#1e293b" stroke-width="3" fill="none"/>` +
  `<path d="M240 268 Q300 240 360 268" stroke="#1e293b" stroke-width="3" fill="none"/>` +
  // bridge lamp posts
  `<rect x="65" y="234" width="4" height="32" fill="#0f172a"/>` +
  `<rect x="62" y="226" width="10" height="8" fill="#1e293b"/>` +
  `<circle cx="67" cy="222" r="5" fill="#fef3c7"/>` +
  `<circle cx="67" cy="222" r="14" fill="#fbbf24" opacity="0.35"/>` +
  `<rect x="195" y="234" width="4" height="32" fill="#0f172a"/>` +
  `<rect x="192" y="226" width="10" height="8" fill="#1e293b"/>` +
  `<circle cx="197" cy="222" r="5" fill="#fef3c7"/>` +
  `<circle cx="197" cy="222" r="14" fill="#fbbf24" opacity="0.35"/>` +
  `<rect x="325" y="234" width="4" height="32" fill="#0f172a"/>` +
  `<rect x="322" y="226" width="10" height="8" fill="#1e293b"/>` +
  `<circle cx="327" cy="222" r="5" fill="#fef3c7"/>` +
  `<circle cx="327" cy="222" r="14" fill="#fbbf24" opacity="0.35"/>` +
  // ===== FOREGROUND — embankment =====
  `<path d="M0 295 L400 295 L400 305 Q200 310 0 305 Z" fill="#1e293b"/>` +
  `<rect x="0" y="304" width="400" height="46" fill="#0f172a"/>` +
  // sidewalk specks
  `<rect x="20" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="60" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="100" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="140" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="180" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="220" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="260" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="300" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="340" y="316" width="6" height="2" fill="#475569"/>` +
  `<rect x="380" y="316" width="6" height="2" fill="#475569"/>` +
  // ===== COUPLE silhouette — romantic =====
  `<ellipse cx="220" cy="358" rx="32" ry="5" fill="#000" opacity="0.5"/>` +
  // man
  `<circle cx="208" cy="310" r="11" fill="#1e293b"/>` +
  `<rect x="201" y="318" width="14" height="26" fill="#1e293b"/>` +
  `<rect x="202" y="320" width="12" height="6" fill="#7c2d12"/>` +
  `<rect x="197" y="344" width="6" height="14" fill="#0f172a"/>` +
  `<rect x="213" y="344" width="6" height="14" fill="#0f172a"/>` +
  // woman (slightly back, hair blowing)
  `<circle cx="230" cy="312" r="9" fill="#1e293b"/>` +
  `<path d="M222 310 Q230 296 240 308 Q244 314 240 318" fill="#1e293b"/>` +
  `<rect x="223" y="320" width="12" height="24" fill="#1e293b"/>` +
  `<rect x="221" y="320" width="16" height="6" fill="#7c2d12"/>` +
  `<rect x="220" y="344" width="6" height="14" fill="#0f172a"/>` +
  `<rect x="232" y="344" width="6" height="14" fill="#0f172a"/>` +
  // heart above couple
  `<path d="M219 290 q-3 -6 -8 -3 q-3 3 0 6 q4 4 8 8 q4 -4 8 -8 q3 -3 0 -6 q-5 -3 -8 3 z" fill="#ec4899" opacity="0.85"/>` +
  // ===== YELLOW TAXI =====
  `<ellipse cx="120" cy="362" rx="36" ry="5" fill="#000" opacity="0.5"/>` +
  `<rect x="88" y="338" width="64" height="20" rx="4" fill="#facc15"/>` +
  `<rect x="88" y="352" width="64" height="6" rx="2" fill="#1e293b"/>` +
  `<rect x="92" y="340" width="26" height="14" fill="#bae6fd" opacity="0.7"/>` +
  `<rect x="122" y="340" width="26" height="14" fill="#bae6fd" opacity="0.7"/>` +
  `<rect x="116" y="328" width="10" height="6" fill="#1e293b"/>` +
  `<rect x="110" y="324" width="22" height="6" fill="#facc15"/>` +
  `<rect x="113" y="320" width="16" height="4" fill="#fde68a"/>` +
  `<text x="120" y="354" font-family="sans-serif" font-size="6" font-weight="900" fill="#1e293b" text-anchor="middle">TAXI</text>` +
  `<circle cx="100" cy="362" r="6" fill="#0f172a"/>` +
  `<circle cx="140" cy="362" r="6" fill="#0f172a"/>` +
  `<circle cx="100" cy="362" r="2" fill="#cbd5e1"/>` +
  `<circle cx="140" cy="362" r="2" fill="#cbd5e1"/>` +
  // front headlight
  `<circle cx="90" cy="346" r="2" fill="#fde68a"/>` +
  `<circle cx="90" cy="346" r="6" fill="#fde68a" opacity="0.4"/>` +
  // ===== FOREGROUND TREE LEFT =====
  `<ellipse cx="38" cy="380" rx="26" ry="6" fill="#15803d" opacity="0.7"/>` +
  `<rect x="34" y="350" width="8" height="32" fill="#78350f"/>` +
  `<rect x="32" y="350" width="12" height="6" fill="#451a03"/>` +
  `<circle cx="38" cy="320" r="22" fill="#15803d"/>` +
  `<circle cx="38" cy="315" r="16" fill="#16a34a"/>` +
  `<circle cx="28" cy="310" r="12" fill="#22c55e"/>` +
  `<circle cx="50" cy="310" r="12" fill="#22c55e"/>` +
  `<circle cx="38" cy="298" r="11" fill="#4ade80" opacity="0.7"/>` +
  // ===== FOREGROUND TREE RIGHT =====
  `<ellipse cx="362" cy="380" rx="26" ry="6" fill="#15803d" opacity="0.7"/>` +
  `<rect x="358" y="350" width="8" height="32" fill="#78350f"/>` +
  `<rect x="356" y="350" width="12" height="6" fill="#451a03"/>` +
  `<circle cx="362" cy="320" r="22" fill="#15803d"/>` +
  `<circle cx="362" cy="315" r="16" fill="#16a34a"/>` +
  `<circle cx="352" cy="310" r="12" fill="#22c55e"/>` +
  `<circle cx="374" cy="310" r="12" fill="#22c55e"/>` +
  `<circle cx="362" cy="298" r="11" fill="#4ade80" opacity="0.7"/>` +
  // pigeon (right corner)
  `<ellipse cx="288" cy="378" rx="6" ry="3" fill="#94a3b8"/>` +
  `<circle cx="296" cy="375" r="3" fill="#94a3b8"/>` +
  `<polygon points="300,375 304,374 300,377" fill="#fbbf24"/>`,
  '#1e1b4b'
)

const marcheHero = wrap(
  `<defs>
    <linearGradient id="mh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#f97316"/>
      <stop offset="0.25" stop-color="#fbbf24"/>
      <stop offset="0.6" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fef9c3"/>
    </linearGradient>
    <linearGradient id="mh-awning" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#dc2626"/>
      <stop offset="1" stop-color="#7f1d1d"/>
    </linearGradient>
    <linearGradient id="mh-ground" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#a16207"/>
      <stop offset="0.5" stop-color="#854d0e"/>
      <stop offset="1" stop-color="#451a03"/>
    </linearGradient>
    <radialGradient id="mh-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fffbeb"/>
      <stop offset="0.4" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mh-plaza" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#d97706"/>
      <stop offset="1" stop-color="#78350f"/>
    </linearGradient>
  </defs>` +
  // warm morning sky
  `<rect width="400" height="400" fill="url(#mh-sky)"/>` +
  // sun glow + sun
  `<circle cx="320" cy="80" r="100" fill="url(#mh-sun)" opacity="0.85"/>` +
  `<circle cx="320" cy="80" r="38" fill="#fffbeb"/>` +
  `<circle cx="320" cy="80" r="28" fill="#fde68a"/>` +
  // distant mountains
  `<path d="M0 130 Q60 105 110 122 Q160 100 220 118 Q280 96 340 116 Q380 105 400 120 L400 145 L0 145 Z" fill="#7c2d12" opacity="0.35"/>` +
  `<path d="M0 138 Q80 118 140 130 Q210 112 270 128 Q340 110 400 125 L400 148 L0 148 Z" fill="#92400e" opacity="0.5"/>` +
  // village on left
  `<rect x="14" y="118" width="40" height="24" fill="#fef3c7" opacity="0.6"/>` +
  `<polygon points="10,118 34,98 58,118" fill="#92400e" opacity="0.65"/>` +
  `<rect x="56" y="110" width="50" height="32" fill="#fef3c7" opacity="0.6"/>` +
  `<polygon points="52,110 80,86 110,110" fill="#92400e" opacity="0.65"/>` +
  `<rect x="20" y="126" width="6" height="6" fill="#fbbf24"/>` +
  `<rect x="34" y="126" width="6" height="6" fill="#fbbf24"/>` +
  `<rect x="68" y="120" width="6" height="6" fill="#fbbf24"/>` +
  `<rect x="86" y="120" width="6" height="6" fill="#fbbf24"/>` +
  // cypress trees (right)
  `<ellipse cx="356" cy="130" rx="8" ry="22" fill="#15803d" opacity="0.7"/>` +
  `<ellipse cx="376" cy="125" rx="7" ry="20" fill="#15803d" opacity="0.7"/>` +
  // ============= MARKET AWNINGS (red/white striped) =============
  `<path d="M0 150 L40 110 L80 150 L120 110 L160 150 L200 110 L240 150 L280 110 L320 150 L360 110 L400 150 L400 180 L0 180 Z" fill="url(#mh-awning)"/>` +
  // white stripes
  `<path d="M40 110 L0 150 L0 162 L56 110 Z" fill="#fef3c7"/>` +
  `<path d="M80 150 L40 110 L40 122 L96 150 Z" fill="#fef3c7"/>` +
  `<path d="M120 110 L80 150 L80 162 L136 110 Z" fill="#fef3c7"/>` +
  `<path d="M160 150 L120 110 L120 122 L176 150 Z" fill="#fef3c7"/>` +
  `<path d="M200 110 L160 150 L160 162 L216 110 Z" fill="#fef3c7"/>` +
  `<path d="M240 150 L200 110 L200 122 L256 150 Z" fill="#fef3c7"/>` +
  `<path d="M280 110 L240 150 L240 162 L296 110 Z" fill="#fef3c7"/>` +
  `<path d="M320 150 L280 110 L280 122 L336 150 Z" fill="#fef3c7"/>` +
  `<path d="M360 110 L320 150 L320 162 L376 110 Z" fill="#fef3c7"/>` +
  `<path d="M400 150 L360 110 L360 122 L400 144 Z" fill="#fef3c7"/>` +
  // scalloped lower edge
  `<path d="M0 180 Q20 175 40 180 Q60 175 80 180 Q100 175 120 180 Q140 175 160 180 Q180 175 200 180 Q220 175 240 180 Q260 175 280 180 Q300 175 320 180 Q340 175 360 180 Q380 175 400 180 L400 188 L0 188 Z" fill="url(#mh-awning)"/>` +
  // shadow under awning
  `<rect y="188" width="400" height="6" fill="#451a03" opacity="0.5"/>` +
  // ============= STALLS =============
  // back wall (warm cream)
  `<rect x="0" y="194" width="400" height="156" fill="#fef3c7"/>` +
  // floor / counter top
  `<rect x="0" y="340" width="400" height="10" fill="#78350f"/>` +
  `<rect x="0" y="335" width="400" height="6" fill="#92400e"/>` +
  // ===== Stall 1: LÉGUMES (8-14) =====
  `<rect x="10" y="194" width="116" height="140" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="10" y="194" width="116" height="16" fill="#16a34a"/>` +
  `<rect x="10" y="194" width="116" height="3" fill="#14532d"/>` +
  `<text x="68" y="207" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="0.5">LÉGUMES</text>` +
  // tomatoes
  `<circle cx="32" cy="234" r="14" fill="#dc2626"/>` +
  `<circle cx="32" cy="228" r="8" fill="#fca5a5"/>` +
  `<path d="M28 222 L32 215 L36 222" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<path d="M30 220 L30 215 M32 218 L32 213 M34 220 L34 215" stroke="#15803d" stroke-width="1"/>` +
  // carrot
  `<path d="M58 220 L52 248 L64 248 Z" fill="#f97316"/>` +
  `<path d="M52 248 L64 248 L66 254 L50 254 Z" fill="#f97316"/>` +
  `<path d="M55 220 L58 215 L61 220" stroke="#15803d" stroke-width="2" fill="none"/>` +
  // eggplant
  `<ellipse cx="92" cy="240" rx="10" ry="16" fill="#7c3aed"/>` +
  `<ellipse cx="92" cy="238" rx="6" ry="11" fill="#a78bfa"/>` +
  `<path d="M89 222 L92 215 L95 222" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<rect x="88" y="252" width="8" height="3" fill="#15803d"/>` +
  // radish / greens
  `<circle cx="28" cy="282" r="9" fill="#fb7185"/>` +
  `<path d="M22 274 L20 266 M28 272 L28 264 M34 274 L36 266" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  `<circle cx="60" cy="284" r="9" fill="#fb7185"/>` +
  `<path d="M54 276 L52 268 M60 274 L60 266 M66 276 L68 268" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  // leek
  `<rect x="86" y="270" width="20" height="36" fill="#84cc16"/>` +
  `<rect x="86" y="270" width="20" height="6" fill="#65a30d"/>` +
  `<path d="M90 268 L90 258 M96 268 L96 254 M102 268 L102 256" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  // zucchini
  `<ellipse cx="34" cy="312" rx="22" ry="7" fill="#22c55e"/>` +
  `<ellipse cx="34" cy="310" rx="22" ry="5" fill="#4ade80"/>` +
  `<path d="M14 312 L10 310" stroke="#15803d" stroke-width="2"/>` +
  // yellow peppers
  `<ellipse cx="76" cy="312" rx="14" ry="6" fill="#eab308"/>` +
  `<ellipse cx="76" cy="310" rx="14" ry="4" fill="#facc15"/>` +
  `<path d="M70 306 L66 302" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  // red peppers
  `<ellipse cx="108" cy="312" rx="12" ry="6" fill="#dc2626"/>` +
  `<ellipse cx="108" cy="310" rx="12" ry="4" fill="#ef4444"/>` +
  `<path d="M102 306 L98 302" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  // ===== Stall 2: FROMAGE (14-30) =====
  `<rect x="134" y="194" width="116" height="140" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="134" y="194" width="116" height="16" fill="#ca8a04"/>` +
  `<rect x="134" y="194" width="116" height="3" fill="#92400e"/>` +
  `<text x="192" y="207" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="0.5">FROMAGE</text>` +
  // big round cheese
  `<ellipse cx="170" cy="240" rx="26" ry="11" fill="#fde047"/>` +
  `<ellipse cx="170" cy="234" rx="26" ry="11" fill="#fef08a"/>` +
  `<ellipse cx="170" cy="234" rx="14" ry="6" fill="#fbbf24"/>` +
  `<ellipse cx="170" cy="234" rx="6" ry="3" fill="#fef3c7"/>` +
  // small cheese wheel
  `<ellipse cx="220" cy="246" rx="18" ry="9" fill="#facc15"/>` +
  `<ellipse cx="220" cy="241" rx="18" ry="9" fill="#fde68a"/>` +
  `<circle cx="214" cy="240" r="1.5" fill="#92400e"/>` +
  `<circle cx="220" cy="239" r="1.5" fill="#92400e"/>` +
  `<circle cx="226" cy="240" r="1.5" fill="#92400e"/>` +
  // cheese triangle
  `<polygon points="180,265 200,290 160,290" fill="#fde047"/>` +
  `<polygon points="180,265 200,290 180,290" fill="#fef08a"/>` +
  // goat cheese log
  `<ellipse cx="218" cy="288" rx="18" ry="6" fill="#fffbeb"/>` +
  `<ellipse cx="218" cy="285" rx="18" ry="6" fill="#fef3c7"/>` +
  `<ellipse cx="210" cy="282" rx="2" ry="1" fill="#92400e" opacity="0.5"/>` +
  `<ellipse cx="220" cy="284" rx="2" ry="1" fill="#92400e" opacity="0.5"/>` +
  // more cheese
  `<ellipse cx="160" cy="312" rx="20" ry="7" fill="#fbbf24"/>` +
  `<ellipse cx="160" cy="309" rx="20" ry="5" fill="#fde68a"/>` +
  `<ellipse cx="200" cy="314" rx="18" ry="6" fill="#facc15"/>` +
  `<ellipse cx="200" cy="311" rx="18" ry="5" fill="#fde68a"/>` +
  // ===== Stall 3: PAIN (16-30) =====
  `<rect x="258" y="194" width="116" height="140" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="258" y="194" width="116" height="16" fill="#a16207"/>` +
  `<rect x="258" y="194" width="116" height="3" fill="#78350f"/>` +
  `<text x="316" y="207" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="0.5">PAIN</text>` +
  // baguette
  `<path d="M278 234 L334 234 Q340 240 334 246 L278 246 Q272 240 278 234 Z" fill="#d97706"/>` +
  `<path d="M280 236 L332 236 Q338 240 332 244 L280 244 Q274 240 280 236 Z" fill="#fbbf24"/>` +
  `<line x1="290" y1="232" x2="290" y2="248" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="300" y1="232" x2="300" y2="248" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="310" y1="232" x2="310" y2="248" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="320" y1="232" x2="320" y2="248" stroke="#92400e" stroke-width="1.5"/>` +
  // round country loaf
  `<ellipse cx="296" cy="278" rx="26" ry="14" fill="#92400e"/>` +
  `<ellipse cx="296" cy="272" rx="26" ry="14" fill="#d97706"/>` +
  `<line x1="278" y1="270" x2="314" y2="270" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="284" y1="266" x2="284" y2="278" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="296" y1="264" x2="296" y2="278" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="308" y1="266" x2="308" y2="278" stroke="#92400e" stroke-width="1"/>` +
  // croissants
  `<path d="M332 280 Q344 260 356 280 Q352 290 344 288 Q336 290 332 280 Z" fill="#f59e0b"/>` +
  `<path d="M335 280 Q344 264 353 280" stroke="#92400e" stroke-width="1" fill="none"/>` +
  `<path d="M340 282 L340 286" stroke="#92400e" stroke-width="1"/>` +
  `<path d="M344 282 L344 286" stroke="#92400e" stroke-width="1"/>` +
  `<path d="M348 282 L348 286" stroke="#92400e" stroke-width="1"/>` +
  // bread basket
  `<path d="M278 308 L322 308 L318 326 L282 326 Z" fill="#a16207"/>` +
  `<path d="M278 308 Q300 300 322 308" stroke="#78350f" stroke-width="2" fill="none"/>` +
  `<path d="M280 310 L280 322 M290 310 L290 322 M300 310 L300 322 M310 310 L310 322 M320 310 L320 322" stroke="#78350f" stroke-width="1" fill="none"/>` +
  `<ellipse cx="300" cy="304" rx="20" ry="5" fill="#d97706"/>` +
  `<ellipse cx="290" cy="300" rx="6" ry="4" fill="#f59e0b"/>` +
  `<ellipse cx="300" cy="298" rx="7" ry="4" fill="#f59e0b"/>` +
  `<ellipse cx="310" cy="300" rx="6" ry="4" fill="#f59e0b"/>` +
  // ===== Stall 4 (bottom-left): OLIVES =====
  `<rect x="10" y="266" width="86" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="10" y="266" width="86" height="12" fill="#7c3aed"/>` +
  `<text x="53" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">OLIVES</text>` +
  `<ellipse cx="30" cy="294" rx="10" ry="6" fill="#65a30d"/>` +
  `<ellipse cx="30" cy="292" rx="6" ry="3" fill="#84cc16"/>` +
  `<ellipse cx="54" cy="298" rx="10" ry="6" fill="#84cc16"/>` +
  `<ellipse cx="78" cy="294" rx="10" ry="6" fill="#451a03"/>` +
  `<ellipse cx="30" cy="314" rx="10" ry="6" fill="#a3e635"/>` +
  `<ellipse cx="54" cy="318" rx="10" ry="6" fill="#7c2d12"/>` +
  `<ellipse cx="78" cy="314" rx="10" ry="6" fill="#65a30d"/>` +
  // ===== Stall 5 (bottom-mid-left): FRUITS =====
  `<rect x="104" y="266" width="86" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="104" y="266" width="86" height="12" fill="#dc2626"/>` +
  `<text x="147" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">FRUITS</text>` +
  `<circle cx="128" cy="298" r="11" fill="#dc2626"/>` +
  `<circle cx="128" cy="294" r="6" fill="#fca5a5"/>` +
  `<path d="M126 286 L128 282 L130 286" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<circle cx="160" cy="300" r="10" fill="#facc15"/>` +
  `<circle cx="160" cy="296" r="5" fill="#fde68a"/>` +
  `<ellipse cx="184" cy="302" rx="10" ry="8" fill="#a3e635"/>` +
  `<ellipse cx="184" cy="300" rx="6" ry="5" fill="#86efac"/>` +
  `<circle cx="128" cy="320" r="9" fill="#f97316"/>` +
  `<circle cx="128" cy="316" r="5" fill="#fdba74"/>` +
  `<circle cx="160" cy="322" r="8" fill="#dc2626"/>` +
  `<ellipse cx="184" cy="320" rx="8" ry="6" fill="#a3e635"/>` +
  // ===== Stall 6 (bottom-mid): MIEL =====
  `<rect x="198" y="266" width="86" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="198" y="266" width="86" height="12" fill="#d97706"/>` +
  `<text x="241" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">MIEL</text>` +
  // jar
  `<rect x="216" y="290" width="22" height="32" fill="#f59e0b"/>` +
  `<rect x="216" y="288" width="22" height="6" fill="#92400e"/>` +
  `<rect x="218" y="294" width="18" height="3" fill="#fde68a"/>` +
  // jar 2
  `<rect x="252" y="294" width="22" height="28" fill="#f59e0b"/>` +
  `<rect x="252" y="292" width="22" height="6" fill="#92400e"/>` +
  // jar 3
  `<rect x="222" y="318" width="22" height="14" fill="#f59e0b"/>` +
  `<rect x="222" y="316" width="22" height="3" fill="#92400e"/>` +
  `<rect x="258" y="318" width="22" height="14" fill="#f59e0b"/>` +
  `<rect x="258" y="316" width="22" height="3" fill="#92400e"/>` +
  // ===== Stall 7 (bottom-right): FLEURS =====
  `<rect x="292" y="266" width="82" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="292" y="266" width="82" height="12" fill="#ec4899"/>` +
  `<text x="333" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">FLEURS</text>` +
  // flower stems
  `<rect x="312" y="296" width="1" height="32" fill="#15803d"/>` +
  `<rect x="332" y="296" width="1" height="32" fill="#15803d"/>` +
  `<rect x="352" y="296" width="1" height="32" fill="#15803d"/>` +
  // blooms
  `<circle cx="312" cy="294" r="7" fill="#fb7185"/>` +
  `<circle cx="312" cy="293" r="3" fill="#fecdd3"/>` +
  `<circle cx="332" cy="294" r="7" fill="#a855f7"/>` +
  `<circle cx="332" cy="293" r="3" fill="#d8b4fe"/>` +
  `<circle cx="352" cy="294" r="7" fill="#fbbf24"/>` +
  `<circle cx="352" cy="293" r="3" fill="#fde68a"/>` +
  // ===== GROUND / PLAZA =====
  `<rect y="345" width="400" height="55" fill="url(#mh-plaza)"/>` +
  `<rect y="343" width="400" height="4" fill="#451a03"/>` +
  // cobblestone pattern
  `<g fill="#451a03" opacity="0.35">` +
  `<ellipse cx="20" cy="362" rx="9" ry="3"/>` +
  `<ellipse cx="60" cy="370" rx="9" ry="3"/>` +
  `<ellipse cx="100" cy="362" rx="9" ry="3"/>` +
  `<ellipse cx="140" cy="370" rx="9" ry="3"/>` +
  `<ellipse cx="180" cy="364" rx="9" ry="3"/>` +
  `<ellipse cx="220" cy="370" rx="9" ry="3"/>` +
  `<ellipse cx="260" cy="362" rx="9" ry="3"/>` +
  `<ellipse cx="300" cy="370" rx="9" ry="3"/>` +
  `<ellipse cx="340" cy="364" rx="9" ry="3"/>` +
  `<ellipse cx="380" cy="370" rx="9" ry="3"/>` +
  `<ellipse cx="40" cy="384" rx="9" ry="3"/>` +
  `<ellipse cx="80" cy="386" rx="9" ry="3"/>` +
  `<ellipse cx="120" cy="384" rx="9" ry="3"/>` +
  `<ellipse cx="160" cy="386" rx="9" ry="3"/>` +
  `<ellipse cx="200" cy="384" rx="9" ry="3"/>` +
  `<ellipse cx="240" cy="386" rx="9" ry="3"/>` +
  `<ellipse cx="280" cy="384" rx="9" ry="3"/>` +
  `<ellipse cx="320" cy="386" rx="9" ry="3"/>` +
  `<ellipse cx="360" cy="384" rx="9" ry="3"/>` +
  `</g>` +
  // ===== VENDOR (center back, behind counter) =====
  `<circle cx="200" cy="194" r="22" fill="#fde68a"/>` +
  // sun hat
  `<ellipse cx="200" cy="180" rx="28" ry="6" fill="#facc15"/>` +
  `<ellipse cx="200" cy="178" rx="10" ry="8" fill="#facc15"/>` +
  `<ellipse cx="200" cy="176" rx="8" ry="6" fill="#fde68a"/>` +
  // face
  `<circle cx="194" cy="196" r="2" fill="#1e293b"/>` +
  `<circle cx="206" cy="196" r="2" fill="#1e293b"/>` +
  `<path d="M192 204 Q200 208 208 204" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  // body / apron
  `<rect x="184" y="216" width="32" height="60" fill="#16a34a"/>` +
  `<rect x="184" y="240" width="32" height="36" fill="#fef3c7"/>` +
  `<rect x="184" y="240" width="32" height="3" fill="#92400e"/>` +
  `<rect x="184" y="272" width="32" height="4" fill="#92400e"/>` +
  // arm
  `<path d="M184 230 L170 254" stroke="#fde68a" stroke-width="8" fill="none" stroke-linecap="round"/>` +
  // ===== CUSTOMER with basket (left foreground) =====
  `<ellipse cx="40" cy="392" rx="16" ry="4" fill="#451a03" opacity="0.5"/>` +
  `<circle cx="40" cy="338" r="14" fill="#fbbf24"/>` +
  `<circle cx="40" cy="332" r="9" fill="#fde68a"/>` +
  // hair bun
  `<circle cx="40" cy="324" r="5" fill="#451a03"/>` +
  `<circle cx="40" cy="330" r="2" fill="#1e293b"/>` +
  `<circle cx="40" cy="334" r="2" fill="#1e293b"/>` +
  `<path d="M32 340 Q40 344 48 340" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  // body
  `<rect x="30" y="346" width="20" height="28" fill="#dc2626"/>` +
  `<rect x="30" y="346" width="20" height="6" fill="#7f1d1d"/>` +
  // arm with basket
  `<path d="M48 350 L58 364" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  // basket
  `<path d="M54 360 L76 360 L72 384 L58 384 Z" fill="#92400e"/>` +
  `<path d="M54 360 Q65 354 76 360" stroke="#451a03" stroke-width="2" fill="none"/>` +
  `<path d="M56 362 L56 380 M62 362 L62 380 M68 362 L68 380 M74 362 L74 380" stroke="#451a03" stroke-width="1" fill="none"/>` +
  // legs
  `<rect x="32" y="372" width="6" height="20" fill="#1e293b"/>` +
  `<rect x="42" y="372" width="6" height="20" fill="#1e293b"/>` +
  // ===== COUPLE (right, browsing) =====
  `<ellipse cx="356" cy="392" rx="14" ry="3" fill="#451a03" opacity="0.5"/>` +
  // woman
  `<circle cx="346" cy="346" r="12" fill="#fda4af"/>` +
  `<circle cx="346" cy="340" r="7" fill="#fecdd3"/>` +
  `<path d="M340 340 Q346 332 352 340 Q356 348 352 352" fill="#1e293b"/>` +
  `<circle cx="343" cy="342" r="1.5" fill="#1e293b"/>` +
  `<circle cx="349" cy="342" r="1.5" fill="#1e293b"/>` +
  `<path d="M343 348 Q346 350 349 348" stroke="#1e293b" stroke-width="1" fill="none"/>` +
  `<rect x="338" y="354" width="16" height="24" fill="#0ea5e9"/>` +
  `<rect x="336" y="378" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="350" y="378" width="6" height="14" fill="#1e293b"/>` +
  // child holding hand
  `<circle cx="372" cy="356" r="9" fill="#fde68a"/>` +
  `<circle cx="372" cy="352" r="5" fill="#fef3c7"/>` +
  `<rect x="367" y="362" width="11" height="18" fill="#a855f7"/>` +
  `<rect x="366" y="380" width="5" height="10" fill="#1e293b"/>` +
  `<rect x="374" y="380" width="5" height="10" fill="#1e293b"/>` +
  // hand-in-hand line
  `<line x1="354" y1="362" x2="367" y2="364" stroke="#fde68a" stroke-width="3"/>`,
  '#fef3c7'
)

const parcHero = wrap(
  `<defs>
    <linearGradient id="prh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0c4a6e"/>
      <stop offset="0.25" stop-color="#38bdf8"/>
      <stop offset="0.5" stop-color="#7dd3fc"/>
      <stop offset="0.8" stop-color="#bbf7d0"/>
      <stop offset="1" stop-color="#d9f99d"/>
    </linearGradient>
    <radialGradient id="prh-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fffbeb"/>
      <stop offset="0.4" stop-color="#fef3c7"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="prh-glow" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef9c3" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#fef9c3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="prh-ground" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#86efac"/>
      <stop offset="0.4" stop-color="#22c55e"/>
      <stop offset="1" stop-color="#14532d"/>
    </linearGradient>
    <linearGradient id="prh-path" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#d6a87a"/>
      <stop offset="1" stop-color="#92400e"/>
    </linearGradient>
    <radialGradient id="prh-pond" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="0.5" stop-color="#0ea5e9"/>
      <stop offset="1" stop-color="#1e3a8a"/>
    </radialGradient>
  </defs>` +
  // sky
  `<rect width="400" height="400" fill="url(#prh-sky)"/>` +
  // sun + glow
  `<circle cx="320" cy="80" r="120" fill="url(#prh-glow)"/>` +
  `<circle cx="320" cy="80" r="60" fill="url(#prh-sun)" opacity="0.7"/>` +
  `<circle cx="320" cy="80" r="34" fill="#fffbeb"/>` +
  `<circle cx="320" cy="80" r="26" fill="#fef3c7"/>` +
  // soft clouds
  `<ellipse cx="60" cy="60" rx="40" ry="10" fill="#fff" opacity="0.85"/>` +
  `<ellipse cx="70" cy="56" rx="22" ry="10" fill="#fff" opacity="0.7"/>` +
  `<ellipse cx="180" cy="40" rx="36" ry="8" fill="#fff" opacity="0.65"/>` +
  `<ellipse cx="200" cy="36" rx="20" ry="9" fill="#fff" opacity="0.55"/>` +
  `<ellipse cx="120" cy="110" rx="30" ry="6" fill="#fff" opacity="0.5"/>` +
  // birds
  `<path d="M120 70 q4 -6 8 0 q4 -6 8 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  `<path d="M150 90 q3 -5 6 0 q3 -5 6 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  `<path d="M250 50 q3 -5 6 0 q3 -5 6 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  // distant tree line
  `<path d="M0 240 L20 215 L40 240 L60 210 L80 240 L100 218 L120 240 L140 215 L160 240 L180 220 L200 240 L220 215 L240 240 L260 218 L280 240 L300 215 L320 240 L340 220 L360 240 L380 218 L400 240 L400 252 L0 252 Z" fill="#15803d" opacity="0.55"/>` +
  // treetops (a bit above the line for depth)
  `<circle cx="40" cy="226" r="12" fill="#16a34a" opacity="0.5"/>` +
  `<circle cx="120" cy="226" r="12" fill="#16a34a" opacity="0.5"/>` +
  `<circle cx="220" cy="226" r="14" fill="#16a34a" opacity="0.5"/>` +
  `<circle cx="300" cy="226" r="12" fill="#16a34a" opacity="0.5"/>` +
  `<circle cx="380" cy="228" r="10" fill="#16a34a" opacity="0.5"/>` +
  // rolling ground (gradient)
  `<path d="M0 240 L0 400 L400 400 L400 240 Q300 220 200 235 Q100 250 0 240 Z" fill="url(#prh-ground)"/>` +
  // soft grass detail
  `<g fill="#16a34a" opacity="0.7">` +
  `<path d="M30 280 l2 -8 l2 8 z"/>` +
  `<path d="M40 280 l2 -8 l2 8 z"/>` +
  `<path d="M50 280 l2 -8 l2 8 z"/>` +
  `<path d="M80 290 l2 -8 l2 8 z"/>` +
  `<path d="M90 290 l2 -8 l2 8 z"/>` +
  `<path d="M100 290 l2 -8 l2 8 z"/>` +
  `<path d="M350 285 l2 -8 l2 8 z"/>` +
  `<path d="M360 285 l2 -8 l2 8 z"/>` +
  `<path d="M370 285 l2 -8 l2 8 z"/>` +
  `</g>` +
  // daisies scattered
  `<g>` +
  `<circle cx="40" cy="360" r="3" fill="#fde68a"/>` +
  `<circle cx="40" cy="360" r="1.5" fill="#fde047"/>` +
  `<rect x="39" y="360" width="2" height="8" fill="#16a34a"/>` +
  `<circle cx="70" cy="345" r="3" fill="#fde68a"/>` +
  `<circle cx="70" cy="345" r="1.5" fill="#fde047"/>` +
  `<rect x="69" y="345" width="2" height="8" fill="#16a34a"/>` +
  `<circle cx="330" cy="350" r="3" fill="#fde68a"/>` +
  `<circle cx="330" cy="350" r="1.5" fill="#fde047"/>` +
  `<rect x="329" y="350" width="2" height="8" fill="#16a34a"/>` +
  `</g>` +
  // winding path (coblestone)
  `<path d="M180 400 Q160 350 200 320 Q250 290 220 250 Q190 230 200 200" stroke="#92400e" stroke-width="64" fill="none" stroke-linecap="round" opacity="0.5"/>` +
  `<path d="M180 400 Q160 350 200 320 Q250 290 220 250 Q190 230 200 200" stroke="url(#prh-path)" stroke-width="58" fill="none" stroke-linecap="round"/>` +
  // path stones
  `<g fill="#a16207" opacity="0.4">` +
  `<ellipse cx="195" cy="385" rx="10" ry="3"/>` +
  `<ellipse cx="190" cy="370" rx="10" ry="3"/>` +
  `<ellipse cx="200" cy="355" rx="10" ry="3"/>` +
  `<ellipse cx="210" cy="335" rx="10" ry="3"/>` +
  `<ellipse cx="218" cy="318" rx="9" ry="3"/>` +
  `<ellipse cx="225" cy="298" rx="9" ry="3"/>` +
  `<ellipse cx="220" cy="280" rx="8" ry="3"/>` +
  `<ellipse cx="212" cy="262" rx="8" ry="3"/>` +
  `<ellipse cx="200" cy="246" rx="7" ry="3"/>` +
  `<ellipse cx="196" cy="228" rx="7" ry="3"/>` +
  `<ellipse cx="200" cy="212" rx="7" ry="3"/>` +
  `</g>` +
  // ===== LEFT TREE (large) =====
  `<rect x="36" y="220" width="14" height="80" fill="#78350f"/>` +
  `<rect x="34" y="220" width="18" height="6" fill="#451a03"/>` +
  `<path d="M30 290 Q40 286 50 290" stroke="#451a03" stroke-width="2" fill="none"/>` +
  `<circle cx="44" cy="180" r="40" fill="#14532d"/>` +
  `<circle cx="44" cy="170" r="32" fill="#15803d"/>` +
  `<circle cx="28" cy="170" r="20" fill="#16a34a"/>` +
  `<circle cx="62" cy="170" r="20" fill="#16a34a"/>` +
  `<circle cx="44" cy="150" r="18" fill="#22c55e"/>` +
  `<circle cx="36" cy="158" r="10" fill="#4ade80" opacity="0.7"/>` +
  `<circle cx="56" cy="160" r="6" fill="#4ade80" opacity="0.6"/>` +
  // ===== RIGHT TREE (large) =====
  `<rect x="328" y="220" width="14" height="80" fill="#78350f"/>` +
  `<rect x="326" y="220" width="18" height="6" fill="#451a03"/>` +
  `<path d="M322 290 Q336 286 350 290" stroke="#451a03" stroke-width="2" fill="none"/>` +
  `<circle cx="336" cy="180" r="42" fill="#14532d"/>` +
  `<circle cx="336" cy="170" r="32" fill="#15803d"/>` +
  `<circle cx="316" cy="170" r="20" fill="#16a34a"/>` +
  `<circle cx="356" cy="170" r="20" fill="#16a34a"/>` +
  `<circle cx="336" cy="148" r="20" fill="#22c55e"/>` +
  `<circle cx="328" cy="160" r="10" fill="#4ade80" opacity="0.7"/>` +
  `<circle cx="348" cy="162" r="6" fill="#4ade80" opacity="0.6"/>` +
  // middle small tree (background)
  `<rect x="194" y="245" width="10" height="50" fill="#78350f"/>` +
  `<circle cx="200" cy="232" r="26" fill="#14532d"/>` +
  `<circle cx="200" cy="226" r="20" fill="#15803d"/>` +
  `<circle cx="188" cy="224" r="14" fill="#16a34a"/>` +
  `<circle cx="212" cy="224" r="14" fill="#16a34a"/>` +
  `<circle cx="200" cy="216" r="12" fill="#22c55e"/>` +
  // small bush
  `<ellipse cx="120" cy="320" rx="22" ry="12" fill="#16a34a"/>` +
  `<ellipse cx="120" cy="316" rx="16" ry="8" fill="#22c55e"/>` +
  `<ellipse cx="112" cy="312" rx="6" ry="4" fill="#4ade80" opacity="0.7"/>` +
  // pond (left)
  `<ellipse cx="80" cy="350" rx="44" ry="16" fill="url(#prh-pond)"/>` +
  `<ellipse cx="80" cy="350" rx="40" ry="13" fill="#0ea5e9" opacity="0.85"/>` +
  `<path d="M48 346 Q70 343 92 348" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.85"/>` +
  `<path d="M60 354 Q80 351 100 356" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.7"/>` +
  `<path d="M68 360 Q86 357 104 362" stroke="#bae6fd" stroke-width="1.2" fill="none" opacity="0.5"/>` +
  // lily pads
  `<ellipse cx="60" cy="348" rx="6" ry="3" fill="#16a34a"/>` +
  `<ellipse cx="60" cy="346" rx="4" ry="2" fill="#4ade80"/>` +
  `<path d="M60 348 L62 346" stroke="#15803d" stroke-width="1"/>` +
  `<ellipse cx="100" cy="354" rx="6" ry="3" fill="#16a34a"/>` +
  `<ellipse cx="100" cy="352" rx="4" ry="2" fill="#4ade80"/>` +
  `<path d="M100 354 L102 352" stroke="#15803d" stroke-width="1"/>` +
  // flower (lily)
  `<circle cx="60" cy="346" r="2" fill="#fb7185"/>` +
  // bench (right)
  `<ellipse cx="345" cy="346" rx="34" ry="4" fill="#15803d" opacity="0.45"/>` +
  `<rect x="316" y="320" width="58" height="6" fill="#92400e"/>` +
  `<rect x="318" y="318" width="54" height="3" fill="#a16207"/>` +
  `<rect x="320" y="308" width="50" height="12" fill="#a16207"/>` +
  `<rect x="320" y="308" width="50" height="3" fill="#d97706"/>` +
  // slats
  `<line x1="322" y1="312" x2="368" y2="312" stroke="#78350f" stroke-width="1"/>` +
  `<line x1="322" y1="316" x2="368" y2="316" stroke="#78350f" stroke-width="1"/>` +
  // legs
  `<rect x="316" y="326" width="4" height="20" fill="#78350f"/>` +
  `<rect x="370" y="326" width="4" height="20" fill="#78350f"/>` +
  // iron arm
  `<path d="M320 326 Q310 320 308 308" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<path d="M370 326 Q380 320 382 308" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  // ===== LAMP POST (left) =====
  `<rect x="124" y="240" width="4" height="86" fill="#0f172a"/>` +
  `<rect x="118" y="232" width="16" height="6" fill="#1e293b"/>` +
  `<rect x="118" y="240" width="16" height="3" fill="#0f172a"/>` +
  `<rect x="116" y="222" width="20" height="12" fill="#0f172a"/>` +
  `<rect x="120" y="218" width="12" height="6" fill="#0f172a"/>` +
  `<rect x="116" y="216" width="20" height="3" fill="#1e293b"/>` +
  `<path d="M122 222 Q126 230 130 222" stroke="#0f172a" stroke-width="1.5" fill="none"/>` +
  // lamp glow
  `<circle cx="126" cy="220" r="6" fill="#fef3c7"/>` +
  `<circle cx="126" cy="220" r="16" fill="#fde68a" opacity="0.4"/>` +
  `<circle cx="126" cy="220" r="26" fill="#fef9c3" opacity="0.18"/>` +
  // ===== LAMP POST (right, smaller) =====
  `<rect x="270" y="248" width="3" height="70" fill="#0f172a"/>` +
  `<rect x="265" y="244" width="13" height="3" fill="#1e293b"/>` +
  `<rect x="266" y="232" width="11" height="12" fill="#0f172a"/>` +
  `<rect x="269" y="228" width="6" height="4" fill="#0f172a"/>` +
  `<rect x="266" y="226" width="11" height="3" fill="#1e293b"/>` +
  `<circle cx="271" cy="234" r="4" fill="#fef3c7"/>` +
  `<circle cx="271" cy="234" r="12" fill="#fde68a" opacity="0.35"/>` +
  // ===== DOG (golden retriever) =====
  `<ellipse cx="222" cy="372" rx="18" ry="6" fill="#15803d" opacity="0.4"/>` +
  `<ellipse cx="224" cy="356" rx="14" ry="8" fill="#f59e0b"/>` +
  `<ellipse cx="222" cy="354" rx="14" ry="6" fill="#fbbf24"/>` +
  `<circle cx="212" cy="350" r="7" fill="#fbbf24"/>` +
  `<path d="M205 350 L200 340 M207 348 L202 338" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-linecap="round"/>` +
  // dog legs
  `<rect x="214" y="362" width="3" height="8" fill="#f59e0b"/>` +
  `<rect x="222" y="362" width="3" height="8" fill="#f59e0b"/>` +
  `<rect x="230" y="362" width="3" height="8" fill="#f59e0b"/>` +
  `<rect x="238" y="362" width="3" height="8" fill="#f59e0b"/>` +
  // dog tail
  `<path d="M238 354 Q246 350 244 342" stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  // dog face
  `<circle cx="208" cy="350" r="2" fill="#1e293b"/>` +
  `<ellipse cx="206" cy="354" rx="2" ry="1.5" fill="#1e293b"/>` +
  // ===== COUPLE silhouette with phone numbers =====
  // person 1 (man) — left
  `<ellipse cx="160" cy="384" rx="14" ry="4" fill="#15803d" opacity="0.4"/>` +
  `<circle cx="160" cy="320" r="14" fill="#fbbf24"/>` +
  `<circle cx="160" cy="314" r="9" fill="#fde68a"/>` +
  // hair
  `<path d="M152 308 Q160 304 168 308 L168 314 L152 314 Z" fill="#451a03"/>` +
  `<circle cx="158" cy="316" r="1.5" fill="#1e293b"/>` +
  `<circle cx="164" cy="316" r="1.5" fill="#1e293b"/>` +
  `<path d="M156 322 Q160 324 164 322" stroke="#1e293b" stroke-width="1" fill="none"/>` +
  // body (blue shirt)
  `<rect x="150" y="330" width="20" height="28" fill="#0ea5e9"/>` +
  // arm holding phone
  `<path d="M170 340 q12 0 16 14" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  // phone
  `<rect x="180" y="348" width="10" height="16" fill="#1e293b" rx="1"/>` +
  `<rect x="182" y="350" width="6" height="9" fill="#7dd3fc"/>` +
  // legs
  `<rect x="151" y="358" width="7" height="22" fill="#1e293b"/>` +
  `<rect x="162" y="358" width="7" height="22" fill="#1e293b"/>` +
  // person 2 (woman) — right
  `<ellipse cx="256" cy="384" rx="14" ry="4" fill="#15803d" opacity="0.4"/>` +
  `<circle cx="256" cy="320" r="13" fill="#fda4af"/>` +
  `<circle cx="256" cy="314" r="8" fill="#fecdd3"/>` +
  // long hair
  `<path d="M244 312 Q248 304 256 304 Q264 304 268 312 L268 326 L262 322 L250 322 L244 326 Z" fill="#451a03"/>` +
  `<path d="M244 322 L242 332 M268 322 L270 332" stroke="#451a03" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  `<circle cx="252" cy="316" r="1.5" fill="#1e293b"/>` +
  `<circle cx="260" cy="316" r="1.5" fill="#1e293b"/>` +
  `<path d="M252 322 Q256 324 260 322" stroke="#1e293b" stroke-width="1" fill="none"/>` +
  // body (red dress)
  `<path d="M246 330 L266 330 L268 358 L244 358 Z" fill="#dc2626"/>` +
  // arm with phone
  `<path d="M246 340 q-12 0 -16 14" stroke="#fecdd3" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<rect x="226" y="348" width="10" height="16" fill="#1e293b" rx="1"/>` +
  `<rect x="228" y="350" width="6" height="9" fill="#fda4af"/>` +
  // legs
  `<rect x="248" y="358" width="6" height="22" fill="#1e293b"/>` +
  `<rect x="258" y="358" width="6" height="22" fill="#1e293b"/>` +
  // ===== HEART between couple =====
  `<path d="M208 286 q-3 -5 -7 -2 q-3 2 0 5 q3 3 7 7 q4 -4 7 -7 q3 -3 0 -5 q-4 -3 -7 2 z" fill="#ec4899" opacity="0.95"/>` +
  `<circle cx="204" cy="285" r="1.5" fill="#fda4af" opacity="0.9"/>` +
  // ===== FLOWERS along path =====
  `<line x1="100" y1="370" x2="100" y2="386" stroke="#16a34a" stroke-width="1.5"/>` +
  `<circle cx="100" cy="368" r="5" fill="#ec4899"/>` +
  `<circle cx="100" cy="368" r="2" fill="#fda4af"/>` +
  `<line x1="115" y1="380" x2="115" y2="392" stroke="#16a34a" stroke-width="1.5"/>` +
  `<circle cx="115" cy="378" r="4" fill="#a855f7"/>` +
  `<circle cx="115" cy="378" r="1.5" fill="#d8b4fe"/>` +
  `<line x1="280" y1="370" x2="280" y2="386" stroke="#16a34a" stroke-width="1.5"/>` +
  `<circle cx="280" cy="368" r="5" fill="#fb7185"/>` +
  `<circle cx="280" cy="368" r="2" fill="#fecdd3"/>` +
  `<line x1="295" y1="378" x2="295" y2="392" stroke="#16a34a" stroke-width="1.5"/>` +
  `<circle cx="295" cy="376" r="4" fill="#fbbf24"/>` +
  `<circle cx="295" cy="376" r="1.5" fill="#fde68a"/>` +
  // ===== BUTTERFLY =====
  `<ellipse cx="280" cy="290" rx="2" ry="3" fill="#7c3aed"/>` +
  `<ellipse cx="275" cy="287" rx="4" ry="3" fill="#a78bfa" transform="rotate(-30 275 287)"/>` +
  `<ellipse cx="285" cy="287" rx="4" ry="3" fill="#c4b5fd" transform="rotate(30 285 287)"/>` +
  `<line x1="280" y1="291" x2="280" y2="296" stroke="#1e293b" stroke-width="1"/>` +
  // ===== SUN RAYS through trees =====
  `<path d="M280 130 L260 220 L300 220 Z" fill="#fde68a" opacity="0.15"/>`,
  '#d9f99d'
)

const pharmacieHero = wrap(
  `<defs>
    <linearGradient id="phh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#bae6fd"/>
      <stop offset="1" stop-color="#dbeafe"/>
    </linearGradient>
    <linearGradient id="phh-street" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#64748b"/>
      <stop offset="1" stop-color="#334155"/>
    </linearGradient>
    <radialGradient id="phh-cross" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#bbf7d0"/>
      <stop offset="0.7" stop-color="#22c55e"/>
      <stop offset="1" stop-color="#15803d"/>
    </radialGradient>
  </defs>` +
  // sky
  `<rect width="400" height="280" fill="url(#phh-sky)"/>` +
  // sun
  `<circle cx="80" cy="60" r="40" fill="#fef3c7" opacity="0.7"/>` +
  `<circle cx="80" cy="60" r="24" fill="#fde68a"/>` +
  // clouds
  `<ellipse cx="240" cy="60" rx="36" ry="8" fill="#fff" opacity="0.7"/>` +
  `<ellipse cx="250" cy="56" rx="20" ry="8" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="340" cy="100" rx="30" ry="6" fill="#fff" opacity="0.5"/>` +
  // building left (Haussmann-style)
  `<rect x="0" y="120" width="120" height="180" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>` +
  `<polygon points="-5,120 60,80 125,120" fill="#334155"/>` +
  `<rect x="-5" y="120" width="130" height="14" fill="#1e293b"/>` +
  // roof detail
  `<rect x="40" y="92" width="6" height="20" fill="#1e293b"/>` +
  `<rect x="78" y="92" width="6" height="20" fill="#1e293b"/>` +
  // windows with shutters (Haussmann style)
  `<g stroke="#1e293b" stroke-width="1.5">` +
  `<rect x="18" y="148" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="14" y="146" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="40" y="146" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="50" y="148" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="46" y="146" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="72" y="146" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="82" y="148" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="78" y="146" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="104" y="146" width="4" height="36" fill="#dc2626"/>` +
  // second row
  `<rect x="18" y="194" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="14" y="192" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="40" y="192" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="50" y="194" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="46" y="192" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="72" y="192" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="82" y="194" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="78" y="192" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="104" y="192" width="4" height="36" fill="#dc2626"/>` +
  // third row
  `<rect x="18" y="240" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="14" y="238" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="40" y="238" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="50" y="240" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="46" y="238" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="72" y="238" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="82" y="240" width="22" height="32" fill="#bae6fd"/>` +
  `<rect x="78" y="238" width="4" height="36" fill="#dc2626"/>` +
  `<rect x="104" y="238" width="4" height="36" fill="#dc2626"/>` +
  `</g>` +
  // pharmacy building
  `<rect x="180" y="100" width="220" height="200" fill="#fff" stroke="#1e293b" stroke-width="3"/>` +
  `<polygon points="180,100 290,60 400,100" fill="#fef3c7" stroke="#1e293b" stroke-width="2"/>` +
  // green cross sign (large, illuminated)
  `<rect x="270" y="40" width="80" height="70" fill="url(#phh-cross)" stroke="#15803d" stroke-width="2" rx="4"/>` +
  `<rect x="298" y="40" width="24" height="70" fill="#fff"/>` +
  `<rect x="270" y="62" width="80" height="24" fill="#fff"/>` +
  `<rect x="270" y="40" width="80" height="70" fill="none" stroke="#15803d" stroke-width="3" rx="4"/>` +
  // glow around cross
  `<rect x="266" y="36" width="88" height="78" fill="#86efac" opacity="0.3" rx="6"/>` +
  // pharmacy sign banner
  `<rect x="180" y="118" width="220" height="40" fill="#22c55e"/>` +
  `<rect x="180" y="118" width="220" height="6" fill="#15803d"/>` +
  `<rect x="180" y="152" width="220" height="6" fill="#15803d"/>` +
  `<text x="290" y="146" font-family="serif" font-size="18" font-weight="700" fill="#fff" text-anchor="middle" letter-spacing="2">PHARMACIE</text>` +
  // display windows
  `<rect x="200" y="170" width="80" height="80" fill="#dbeafe" stroke="#22c55e" stroke-width="2"/>` +
  `<rect x="300" y="170" width="80" height="80" fill="#dbeafe" stroke="#22c55e" stroke-width="2"/>` +
  // medicine boxes in windows
  `<rect x="210" y="195" width="20" height="30" fill="#dc2626"/>` +
  `<rect x="210" y="200" width="20" height="6" fill="#fff"/>` +
  `<rect x="234" y="195" width="20" height="30" fill="#0ea5e9"/>` +
  `<rect x="258" y="195" width="20" height="30" fill="#16a34a"/>` +
  `<rect x="210" y="230" width="20" height="20" fill="#facc15"/>` +
  `<rect x="234" y="230" width="20" height="20" fill="#a855f7"/>` +
  `<rect x="258" y="230" width="20" height="20" fill="#fb923c"/>` +
  // right window
  `<rect x="310" y="195" width="20" height="30" fill="#dc2626"/>` +
  `<rect x="334" y="195" width="20" height="30" fill="#0ea5e9"/>` +
  `<rect x="358" y="195" width="20" height="30" fill="#16a34a"/>` +
  `<rect x="310" y="230" width="20" height="20" fill="#facc15"/>` +
  `<rect x="334" y="230" width="20" height="20" fill="#a855f7"/>` +
  `<rect x="358" y="230" width="20" height="20" fill="#fb923c"/>` +
  // door (center)
  `<rect x="270" y="170" width="40" height="130" fill="#86efac" stroke="#15803d" stroke-width="2"/>` +
  `<rect x="270" y="170" width="40" height="6" fill="#15803d"/>` +
  `<rect x="278" y="180" width="24" height="50" fill="#dbeafe"/>` +
  `<rect x="278" y="240" width="24" height="50" fill="#dbeafe"/>` +
  `<circle cx="298" cy="240" r="2" fill="#1e293b"/>` +
  // hours sign
  `<rect x="200" y="260" width="180" height="22" fill="#dc2626"/>` +
  `<rect x="200" y="260" width="180" height="4" fill="#991b1b"/>` +
  `<text x="290" y="276" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">OUVERT 8h–20h · 7j/7</text>` +
  // moto / pharmacy logo
  `<rect x="220" y="290" width="14" height="14" fill="#22c55e"/>` +
  `<text x="227" y="300" font-family="sans-serif" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">Rx</text>` +
  `<text x="290" y="302" font-family="serif" font-size="11" font-style="italic" font-weight="700" fill="#15803d" text-anchor="middle">votre santé, notre priorité</text>` +
  `<rect x="350" y="290" width="14" height="14" fill="#22c55e"/>` +
  `<text x="357" y="300" font-family="sans-serif" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">+</text>` +
  // street
  `<rect y="300" width="400" height="100" fill="url(#phh-street)"/>` +
  `<rect y="300" width="400" height="6" fill="#1e293b"/>` +
  `<rect y="306" width="400" height="2" fill="#fbbf24" stroke-dasharray="20 20"/>` +
  // sidewalk
  `<rect y="300" width="400" height="6" fill="#cbd5e1"/>` +
  // person walking toward pharmacy (with medicine bag)
  `<ellipse cx="160" cy="395" rx="22" ry="5" fill="#0f172a" opacity="0.5"/>` +
  `<circle cx="160" cy="320" r="16" fill="#fbbf24"/>` +
  `<circle cx="160" cy="313" r="10" fill="#fde68a"/>` +
  `<path d="M148 312 q-8 -6 -10 -16" stroke="#92400e" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  // hair tuft
  `<path d="M154 304 q6 -6 12 0" stroke="#92400e" stroke-width="3" fill="none"/>` +
  `<circle cx="154" cy="312" r="2" fill="#1e293b"/>` +
  `<circle cx="166" cy="312" r="2" fill="#1e293b"/>` +
  `<path d="M154 320 Q160 316 166 320" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<rect x="148" y="328" width="24" height="40" fill="#dc2626"/>` +
  `<rect x="148" y="328" width="24" height="6" fill="#7f1d1d"/>` +
  `<rect x="140" y="368" width="8" height="22" fill="#1e293b"/>` +
  `<rect x="172" y="368" width="8" height="22" fill="#1e293b"/>` +
  // arm holding bag
  `<path d="M170 350 q14 0 16 12" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  // paper bag with medicine
  `<rect x="180" y="358" width="22" height="26" fill="#fef3c7" stroke="#92400e" stroke-width="1.5"/>` +
  `<path d="M180 358 L202 358 L196 350 L186 350 Z" fill="#a16207"/>` +
  `<rect x="184" y="362" width="14" height="8" fill="#dc2626"/>` +
  `<rect x="186" y="364" width="10" height="3" fill="#fff"/>` +
  // second person (passer-by)
  `<ellipse cx="60" cy="395" rx="18" ry="4" fill="#0f172a" opacity="0.5"/>` +
  `<circle cx="60" cy="340" r="14" fill="#fda4af"/>` +
  `<circle cx="60" cy="334" r="8" fill="#fecdd3"/>` +
  `<rect x="52" y="346" width="16" height="32" fill="#0ea5e9"/>` +
  `<rect x="46" y="378" width="6" height="18" fill="#1e293b"/>` +
  `<rect x="68" y="378" width="6" height="18" fill="#1e293b"/>` +
  // trash bin (right)
  `<rect x="370" y="324" width="22" height="36" fill="#1e293b" rx="2"/>` +
  `<rect x="370" y="320" width="22" height="6" fill="#475569"/>` +
  `<rect x="372" y="328" width="4" height="20" fill="#475569"/>` +
  `<rect x="386" y="328" width="4" height="20" fill="#475569"/>`,
  '#dbeafe'
)

/* ── Map of all scenes ── */
export const scenes = {
  airport, taxi, hotelReception, street, metro, eiffel, cafeTerrasse, hotelNight,
  marketEntrance, vegetables, cheese, bakery, olives, vendor, payment, basket,
  parkWalk, twoPeople, greeting, sun, handshake, phone, waving, calendar,
  sick, pharmacyDoor, pharmacyInterior, symptoms, medicine, dosage, leavingPharmacy,
  parisHero, marcheHero, parcHero, pharmacieHero
}

export default scenes