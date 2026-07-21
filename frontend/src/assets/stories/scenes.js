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
      <stop offset="0" stop-color="#0c4a6e"/>
      <stop offset="0.25" stop-color="#7dd3fc"/>
      <stop offset="0.55" stop-color="#fde68a"/>
      <stop offset="0.85" stop-color="#fed7aa"/>
      <stop offset="1" stop-color="#fb923c"/>
    </linearGradient>
    <linearGradient id="ph-river" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#38bdf8"/>
      <stop offset="0.5" stop-color="#0ea5e9"/>
      <stop offset="1" stop-color="#075985"/>
    </linearGradient>
    <linearGradient id="ph-tower" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#64748b"/>
      <stop offset="0.4" stop-color="#475569"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="ph-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef9c3"/>
      <stop offset="0.5" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <filter id="ph-glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" />
    </filter>
  </defs>` +
  // sky gradient with sunset
  `<rect width="400" height="400" fill="url(#ph-sky)"/>` +
  // soft sun glow
  `<circle cx="80" cy="120" r="80" fill="url(#ph-sun)" opacity="0.7"/>` +
  `<circle cx="80" cy="120" r="36" fill="#fef3c7"/>` +
  `<circle cx="80" cy="120" r="36" fill="#fde68a"/>` +
  // birds
  `<path d="M220 70 q5 -8 10 0 q5 -8 10 0" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<path d="M260 90 q4 -6 8 0 q4 -6 8 0" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  // distant clouds
  `<ellipse cx="320" cy="80" rx="40" ry="8" fill="#fff" opacity="0.7"/>` +
  `<ellipse cx="330" cy="78" rx="22" ry="10" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="180" cy="50" rx="30" ry="6" fill="#fff" opacity="0.5"/>` +
  // Seine river
  `<rect y="260" width="400" height="140" fill="url(#ph-river)"/>` +
  `<rect x="0" y="258" width="400" height="4" fill="#0c4a6e"/>` +
  // river reflections
  `<path d="M0 270 Q100 268 200 272 T400 270" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.6"/>` +
  `<path d="M0 295 Q150 292 280 296 T400 294" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.5"/>` +
  `<path d="M0 320 Q120 318 240 322 T400 320" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.4"/>` +
  `<path d="M0 350 Q160 348 300 352 T400 350" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.3"/>` +
  // Eiffel Tower - detailed
  `<rect x="172" y="110" width="56" height="135" fill="url(#ph-tower)"/>` +
  `<polygon points="200,55 192,110 208,110" fill="url(#ph-tower)"/>` +
  `<line x1="200" y1="35" x2="200" y2="110" stroke="#fbbf24" stroke-width="2"/>` +
  `<circle cx="200" cy="35" r="3" fill="#fbbf24" filter="url(#ph-glow)"/>` +
  // tower arches/details
  `<path d="M180 145 Q200 130 220 145" stroke="#94a3b8" stroke-width="1.5" fill="none"/>` +
  `<path d="M180 175 Q200 160 220 175" stroke="#94a3b8" stroke-width="1.5" fill="none"/>` +
  `<path d="M180 205 Q200 190 220 205" stroke="#94a3b8" stroke-width="1.5" fill="none"/>` +
  // tower crossbeams
  `<rect x="174" y="120" width="52" height="3" fill="#1e293b"/>` +
  `<rect x="174" y="150" width="52" height="3" fill="#1e293b"/>` +
  `<rect x="174" y="185" width="52" height="3" fill="#1e293b"/>` +
  `<rect x="174" y="220" width="52" height="3" fill="#1e293b"/>` +
  `<rect x="174" y="115" width="4" height="130" fill="#1e293b"/>` +
  `<rect x="222" y="115" width="4" height="130" fill="#1e293b"/>` +
  // tower base
  `<path d="M168 245 L142 295 L258 295 L232 245 Z" fill="url(#ph-tower)"/>` +
  // distant building left (museum-style)
  `<rect x="20" y="160" width="60" height="100" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="14,160 50,128 86,160" fill="#475569"/>` +
  `<rect x="14" y="160" width="72" height="6" fill="#1e293b"/>` +
  `<rect x="32" y="178" width="14" height="22" fill="#fef3c7"/>` +
  `<rect x="52" y="178" width="14" height="22" fill="#fef3c7"/>` +
  `<rect x="32" y="208" width="14" height="20" fill="#fef3c7"/>` +
  `<rect x="52" y="208" width="14" height="20" fill="#fef3c7"/>` +
  `<rect x="32" y="234" width="14" height="20" fill="#fef3c7"/>` +
  `<rect x="52" y="234" width="14" height="20" fill="#fef3c7"/>` +
  // building center-left
  `<rect x="100" y="145" width="50" height="115" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="95,145 125,118 155,145" fill="#334155"/>` +
  `<rect x="95" y="145" width="60" height="5" fill="#1e293b"/>` +
  `<rect x="108" y="160" width="12" height="16" fill="#fbbf24"/>` +
  `<rect x="130" y="160" width="12" height="16" fill="#fbbf24"/>` +
  `<rect x="108" y="184" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="130" y="184" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="108" y="206" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="130" y="206" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="108" y="228" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="130" y="228" width="12" height="14" fill="#fbbf24"/>` +
  // building right (taller, classic)
  `<rect x="265" y="150" width="55" height="110" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="260,150 292,118 325,150" fill="#334155"/>` +
  `<rect x="260" y="150" width="65" height="5" fill="#1e293b"/>` +
  `<rect x="278" y="165" width="13" height="18" fill="#bae6fd"/>` +
  `<rect x="296" y="165" width="13" height="18" fill="#bae6fd"/>` +
  `<rect x="278" y="190" width="13" height="14" fill="#bae6fd"/>` +
  `<rect x="296" y="190" width="13" height="14" fill="#bae6fd"/>` +
  `<rect x="278" y="212" width="13" height="14" fill="#bae6fd"/>` +
  `<rect x="296" y="212" width="13" height="14" fill="#bae6fd"/>` +
  `<rect x="278" y="232" width="13" height="14" fill="#bae6fd"/>` +
  `<rect x="296" y="232" width="13" height="14" fill="#bae6fd"/>` +
  // far right building
  `<rect x="330" y="170" width="50" height="90" fill="#f1f5f9" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="325,170 355,148 385,170" fill="#475569"/>` +
  `<rect x="325" y="170" width="60" height="5" fill="#1e293b"/>` +
  `<rect x="340" y="185" width="12" height="16" fill="#fde68a"/>` +
  `<rect x="358" y="185" width="12" height="16" fill="#fde68a"/>` +
  `<rect x="340" y="208" width="12" height="14" fill="#fde68a"/>` +
  `<rect x="358" y="208" width="12" height="14" fill="#fde68a"/>` +
  `<rect x="340" y="230" width="12" height="14" fill="#fde68a"/>` +
  `<rect x="358" y="230" width="12" height="14" fill="#fde68a"/>` +
  // street lamps
  `<rect x="118" y="260" width="2" height="40" fill="#1e293b"/>` +
  `<circle cx="119" cy="258" r="4" fill="#fde68a"/>` +
  `<rect x="278" y="260" width="2" height="40" fill="#1e293b"/>` +
  `<circle cx="279" cy="258" r="4" fill="#fde68a"/>` +
  // foreground tree left
  `<ellipse cx="40" cy="305" rx="22" ry="6" fill="#16a34a" opacity="0.7"/>` +
  `<rect x="38" y="305" width="4" height="20" fill="#78350f"/>` +
  `<circle cx="40" cy="280" r="16" fill="#16a34a"/>` +
  `<circle cx="40" cy="275" r="11" fill="#22c55e"/>` +
  `<circle cx="32" cy="270" r="8" fill="#22c55e"/>` +
  `<circle cx="48" cy="270" r="8" fill="#22c55e"/>` +
  // foreground tree right
  `<ellipse cx="360" cy="305" rx="22" ry="6" fill="#16a34a" opacity="0.7"/>` +
  `<rect x="358" y="305" width="4" height="20" fill="#78350f"/>` +
  `<circle cx="360" cy="280" r="16" fill="#16a34a"/>` +
  `<circle cx="360" cy="275" r="11" fill="#22c55e"/>` +
  `<circle cx="352" cy="270" r="8" fill="#22c55e"/>` +
  `<circle cx="368" cy="270" r="8" fill="#22c55e"/>` +
  // pedestrian 1 (left)
  `<circle cx="80" cy="318" r="11" fill="#fbbf24"/>` +
  `<circle cx="80" cy="313" r="6" fill="#fde68a"/>` +
  `<rect x="72" y="324" width="16" height="24" fill="#dc2626"/>` +
  `<rect x="68" y="348" width="6" height="16" fill="#1e293b"/>` +
  `<rect x="86" y="348" width="6" height="16" fill="#1e293b"/>` +
  `<path d="M94 330 q8 -2 10 -10" stroke="#fde68a" stroke-width="3" fill="none" stroke-linecap="round"/>` +
  // pedestrian 2 (right)
  `<circle cx="320" cy="318" r="11" fill="#fda4af"/>` +
  `<circle cx="320" cy="313" r="6" fill="#fecdd3"/>` +
  `<rect x="312" y="324" width="16" height="24" fill="#0ea5e9"/>` +
  `<rect x="308" y="348" width="6" height="16" fill="#1e293b"/>` +
  `<rect x="326" y="348" width="6" height="16" fill="#1e293b"/>` +
  // yellow taxi (center)
  `<ellipse cx="200" cy="332" rx="40" ry="5" fill="#0c4a6e" opacity="0.4"/>` +
  `<rect x="160" y="304" width="80" height="22" rx="4" fill="#fbbf24"/>` +
  `<rect x="160" y="320" width="80" height="8" rx="2" fill="#1e293b"/>` +
  `<rect x="166" y="308" width="32" height="14" fill="#bae6fd" opacity="0.7"/>` +
  `<rect x="202" y="308" width="32" height="14" fill="#bae6fd" opacity="0.7"/>` +
  `<rect x="190" y="298" width="20" height="8" fill="#fbbf24"/>` +
  `<rect x="194" y="294" width="12" height="4" fill="#fbbf24"/>` +
  `<circle cx="174" cy="332" r="8" fill="#1e293b"/>` +
  `<circle cx="226" cy="332" r="8" fill="#1e293b"/>` +
  `<circle cx="174" cy="332" r="3" fill="#cbd5e1"/>` +
  `<circle cx="226" cy="332" r="3" fill="#cbd5e1"/>`,
  '#0c4a6e'
)

const marcheHero = wrap(
  `<defs>
    <linearGradient id="mh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#f97316"/>
      <stop offset="0.3" stop-color="#fbbf24"/>
      <stop offset="0.7" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fef3c7"/>
    </linearGradient>
    <linearGradient id="mh-ground" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#a16207"/>
      <stop offset="1" stop-color="#78350f"/>
    </linearGradient>
    <radialGradient id="mh-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef9c3"/>
      <stop offset="0.5" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
  </defs>` +
  // warm morning sky
  `<rect width="400" height="400" fill="url(#mh-sky)"/>` +
  // sun
  `<circle cx="80" cy="70" r="80" fill="url(#mh-sun)" opacity="0.6"/>` +
  `<circle cx="80" cy="70" r="32" fill="#fef3c7"/>` +
  `<circle cx="80" cy="70" r="32" fill="#fde68a"/>` +
  // distant hills
  `<path d="M0 130 Q60 110 120 125 Q180 105 240 120 Q300 100 360 118 Q400 110 400 130 L400 140 L0 140 Z" fill="#a16207" opacity="0.4"/>` +
  // distant building silhouettes
  `<rect x="20" y="115" width="40" height="25" fill="#92400e" opacity="0.4"/>` +
  `<polygon points="20,115 40,100 60,115" fill="#78350f" opacity="0.5"/>` +
  `<rect x="300" y="110" width="60" height="30" fill="#92400e" opacity="0.4"/>` +
  `<polygon points="300,110 330,90 360,110" fill="#78350f" opacity="0.5"/>` +
  // ground
  `<rect y="350" width="400" height="50" fill="url(#mh-ground)"/>` +
  `<rect y="345" width="400" height="8" fill="#451a03"/>` +
  // cobblestone pattern
  `<ellipse cx="40" cy="370" rx="8" ry="3" fill="#451a03" opacity="0.3"/>` +
  `<ellipse cx="120" cy="365" rx="8" ry="3" fill="#451a03" opacity="0.3"/>` +
  `<ellipse cx="200" cy="372" rx="8" ry="3" fill="#451a03" opacity="0.3"/>` +
  `<ellipse cx="280" cy="368" rx="8" ry="3" fill="#451a03" opacity="0.3"/>` +
  `<ellipse cx="360" cy="370" rx="8" ry="3" fill="#451a03" opacity="0.3"/>` +
  // market awnings (scalloped stripes)
  `<path d="M0 140 L40 105 L80 140 L120 105 L160 140 L200 105 L240 140 L280 105 L320 140 L360 105 L400 140 L400 165 L0 165 Z" fill="#dc2626"/>` +
  `<path d="M0 140 L40 105 L80 140 L120 105 L160 140 L200 105 L240 140 L280 105 L320 140 L360 105 L400 140" stroke="#fff" stroke-width="2" fill="none"/>` +
  // striped pattern on awning
  `<path d="M40 105 L80 140 M120 105 L160 140 M200 105 L240 140 M280 105 L320 140 M360 105 L400 140" stroke="#fef3c7" stroke-width="1.5" opacity="0.6"/>` +
  // shadow under awning
  `<rect y="160" width="400" height="6" fill="#7f1d1d" opacity="0.5"/>` +
  // stall 1 - Légumes
  `<rect x="14" y="166" width="100" height="90" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="14" y="166" width="100" height="14" fill="#16a34a"/>` +
  `<rect x="14" y="166" width="100" height="3" fill="#15803d"/>` +
  `<text x="64" y="178" font-family="serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">LÉGUMES</text>` +
  // vegetables in stall 1
  `<circle cx="36" cy="210" r="14" fill="#dc2626"/>` +
  `<circle cx="36" cy="204" r="7" fill="#f87171"/>` +
  `<path d="M34 195 L36 190 L38 195" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<circle cx="64" cy="218" r="12" fill="#fb923c"/>` +
  `<circle cx="64" cy="213" r="6" fill="#fed7aa"/>` +
  `<path d="M62 206 L64 201 L66 206" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<ellipse cx="92" cy="218" rx="10" ry="14" fill="#7c3aed"/>` +
  `<ellipse cx="92" cy="216" rx="6" ry="10" fill="#a78bfa"/>` +
  `<path d="M89 204 L92 199 L95 204" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<ellipse cx="36" cy="244" rx="14" ry="6" fill="#86efac"/>` +
  `<ellipse cx="64" cy="248" rx="12" ry="5" fill="#84cc16"/>` +
  `<ellipse cx="92" cy="244" rx="14" ry="5" fill="#facc15"/>` +
  // stall 2 - Fromage
  `<rect x="124" y="166" width="100" height="90" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="124" y="166" width="100" height="14" fill="#ca8a04"/>` +
  `<rect x="124" y="166" width="100" height="3" fill="#92400e"/>` +
  `<text x="174" y="178" font-family="serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">FROMAGE</text>` +
  `<ellipse cx="150" cy="210" rx="22" ry="10" fill="#fde047"/>` +
  `<ellipse cx="150" cy="205" rx="22" ry="10" fill="#fef08a"/>` +
  `<ellipse cx="150" cy="205" rx="10" ry="4" fill="#fbbf24"/>` +
  `<ellipse cx="200" cy="218" rx="18" ry="8" fill="#facc15"/>` +
  `<ellipse cx="200" cy="214" rx="18" ry="8" fill="#fef08a"/>` +
  `<circle cx="194" cy="214" r="2" fill="#92400e"/>` +
  `<circle cx="200" cy="213" r="2" fill="#92400e"/>` +
  `<circle cx="206" cy="214" r="2" fill="#92400e"/>` +
  `<ellipse cx="160" cy="246" rx="16" ry="7" fill="#facc15"/>` +
  `<ellipse cx="190" cy="248" rx="14" ry="6" fill="#fde047"/>` +
  // stall 3 - Pain
  `<rect x="234" y="166" width="100" height="90" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="234" y="166" width="100" height="14" fill="#a16207"/>` +
  `<rect x="234" y="166" width="100" height="3" fill="#78350f"/>` +
  `<text x="284" y="178" font-family="serif" font-size="10" font-weight="700" fill="#fff" text-anchor="middle">PAIN</text>` +
  `<ellipse cx="260" cy="208" rx="20" ry="8" fill="#92400e"/>` +
  `<ellipse cx="260" cy="203" rx="20" ry="8" fill="#d97706"/>` +
  `<line x1="246" y1="203" x2="274" y2="203" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="250" y1="201" x2="250" y2="207" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="260" y1="201" x2="260" y2="207" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="270" y1="201" x2="270" y2="207" stroke="#92400e" stroke-width="1"/>` +
  `<ellipse cx="310" cy="220" rx="22" ry="9" fill="#a16207"/>` +
  `<ellipse cx="310" cy="215" rx="22" ry="9" fill="#d97706"/>` +
  `<line x1="296" y1="215" x2="324" y2="215" stroke="#92400e" stroke-width="1.5"/>` +
  `<line x1="302" y1="213" x2="302" y2="219" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="312" y1="213" x2="312" y2="219" stroke="#92400e" stroke-width="1"/>` +
  `<line x1="322" y1="213" x2="322" y2="219" stroke="#92400e" stroke-width="1"/>` +
  `<ellipse cx="270" cy="244" rx="18" ry="6" fill="#92400e"/>` +
  `<ellipse cx="305" cy="246" rx="16" ry="5" fill="#a16207"/>` +
  // stall 4 - Olives
  `<rect x="14" y="266" width="86" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="14" y="266" width="86" height="12" fill="#7c3aed"/>` +
  `<text x="57" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">OLIVES</text>` +
  `<ellipse cx="34" cy="296" rx="10" ry="6" fill="#65a30d"/>` +
  `<ellipse cx="58" cy="300" rx="10" ry="6" fill="#84cc16"/>` +
  `<ellipse cx="82" cy="296" rx="10" ry="6" fill="#451a03"/>` +
  `<ellipse cx="34" cy="316" rx="10" ry="6" fill="#a3e635"/>` +
  `<ellipse cx="58" cy="320" rx="10" ry="6" fill="#7c2d12"/>` +
  `<ellipse cx="82" cy="316" rx="10" ry="6" fill="#65a30d"/>` +
  // stall 5 - Fruits
  `<rect x="110" y="266" width="86" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="110" y="266" width="86" height="12" fill="#dc2626"/>` +
  `<text x="153" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">FRUITS</text>` +
  `<circle cx="132" cy="298" r="11" fill="#dc2626"/>` +
  `<circle cx="132" cy="294" r="6" fill="#f87171"/>` +
  `<path d="M130 287 L132 283 L134 287" stroke="#15803d" stroke-width="2" fill="none"/>` +
  `<circle cx="160" cy="300" r="10" fill="#facc15"/>` +
  `<circle cx="160" cy="296" r="5" fill="#fde68a"/>` +
  `<ellipse cx="184" cy="302" rx="10" ry="8" fill="#a3e635"/>` +
  `<circle cx="132" cy="320" r="9" fill="#f97316"/>` +
  `<circle cx="160" cy="322" r="8" fill="#dc2626"/>` +
  `<ellipse cx="184" cy="320" rx="8" ry="6" fill="#a3e635"/>` +
  // stall 6 - Poisson
  `<rect x="206" y="266" width="100" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="206" y="266" width="100" height="12" fill="#0284c7"/>` +
  `<text x="256" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">POISSON</text>` +
  `<ellipse cx="232" cy="298" rx="14" ry="6" fill="#94a3b8"/>` +
  `<path d="M246 298 L256 294 L256 302 Z" fill="#94a3b8"/>` +
  `<circle cx="227" cy="298" r="2" fill="#1e293b"/>` +
  `<ellipse cx="278" cy="300" rx="14" ry="6" fill="#cbd5e1"/>` +
  `<path d="M292 300 L302 296 L302 304 Z" fill="#cbd5e1"/>` +
  `<circle cx="273" cy="300" r="2" fill="#1e293b"/>` +
  `<ellipse cx="232" cy="320" rx="12" ry="5" fill="#7dd3fc"/>` +
  `<path d="M244 320 L252 317 L252 323 Z" fill="#7dd3fc"/>` +
  `<ellipse cx="278" cy="322" rx="12" ry="5" fill="#fb923c"/>` +
  `<path d="M290 322 L298 319 L298 325 Z" fill="#fb923c"/>` +
  // stall 7 - Fleurs
  `<rect x="316" y="266" width="68" height="68" fill="#fff" stroke="#451a03" stroke-width="2"/>` +
  `<rect x="316" y="266" width="68" height="12" fill="#ec4899"/>` +
  `<text x="350" y="276" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">FLEURS</text>` +
  `<circle cx="336" cy="300" r="8" fill="#fb7185"/>` +
  `<circle cx="336" cy="298" r="4" fill="#fda4af"/>` +
  `<circle cx="362" cy="302" r="8" fill="#a855f7"/>` +
  `<circle cx="362" cy="300" r="4" fill="#c084fc"/>` +
  `<circle cx="336" cy="320" r="7" fill="#facc15"/>` +
  `<circle cx="336" cy="318" r="3" fill="#fde68a"/>` +
  `<circle cx="362" cy="322" r="7" fill="#fb7185"/>` +
  // customer 1 (left, with basket)
  `<ellipse cx="40" cy="370" rx="14" ry="4" fill="#451a03" opacity="0.4"/>` +
  `<circle cx="40" cy="320" r="14" fill="#fbbf24"/>` +
  `<circle cx="40" cy="313" r="8" fill="#fde68a"/>` +
  `<rect x="32" y="328" width="16" height="26" fill="#dc2626"/>` +
  `<rect x="26" y="354" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="48" y="354" width="6" height="14" fill="#1e293b"/>` +
  // basket
  `<path d="M50 348 L70 348 L66 372 L54 372 Z" fill="#92400e"/>` +
  `<path d="M50 348 Q60 340 70 348" stroke="#451a03" stroke-width="2" fill="none"/>` +
  // customer 2 (right)
  `<ellipse cx="320" cy="370" rx="14" ry="4" fill="#451a03" opacity="0.4"/>` +
  `<circle cx="320" cy="320" r="14" fill="#fda4af"/>` +
  `<circle cx="320" cy="313" r="8" fill="#fecdd3"/>` +
  `<rect x="312" y="328" width="16" height="26" fill="#0ea5e9"/>` +
  `<rect x="306" y="354" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="328" y="354" width="6" height="14" fill="#1e293b"/>` +
  // vendor (center, behind counter)
  `<circle cx="280" cy="318" r="12" fill="#fde68a"/>` +
  `<circle cx="280" cy="312" r="7" fill="#fef3c7"/>` +
  `<rect x="274" y="324" width="12" height="20" fill="#16a34a"/>` +
  // vendor's apron
  `<rect x="272" y="332" width="16" height="14" fill="#fef3c7"/>`,
  '#fde68a'
)

const parcHero = wrap(
  `<defs>
    <linearGradient id="prh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#0ea5e9"/>
      <stop offset="0.3" stop-color="#7dd3fc"/>
      <stop offset="0.6" stop-color="#bae6fd"/>
      <stop offset="1" stop-color="#d9f99d"/>
    </linearGradient>
    <radialGradient id="prh-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef9c3"/>
      <stop offset="0.5" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="prh-ground" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#22c55e"/>
      <stop offset="0.5" stop-color="#16a34a"/>
      <stop offset="1" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="prh-path" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#a16207"/>
      <stop offset="1" stop-color="#78350f"/>
    </linearGradient>
  </defs>` +
  // sky
  `<rect width="400" height="400" fill="url(#prh-sky)"/>` +
  // sun
  `<circle cx="320" cy="80" r="60" fill="url(#prh-sun)" opacity="0.6"/>` +
  `<circle cx="320" cy="80" r="32" fill="#fef3c7"/>` +
  `<circle cx="320" cy="80" r="32" fill="#fde68a"/>` +
  // clouds
  `<ellipse cx="60" cy="80" rx="40" ry="10" fill="#fff" opacity="0.7"/>` +
  `<ellipse cx="70" cy="76" rx="22" ry="10" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="200" cy="50" rx="36" ry="8" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="220" cy="46" rx="20" ry="9" fill="#fff" opacity="0.5"/>` +
  `<ellipse cx="180" cy="120" rx="30" ry="6" fill="#fff" opacity="0.5"/>` +
  // birds
  `<path d="M100 60 q3 -5 6 0 q3 -5 6 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  `<path d="M130 70 q2 -4 4 0 q2 -4 4 0" stroke="#1e293b" stroke-width="1.5" fill="none"/>` +
  // distant tree line
  `<path d="M0 240 L20 215 L40 240 L60 210 L80 240 L100 218 L120 240 L140 215 L160 240 L180 220 L200 240 L220 215 L240 240 L260 218 L280 240 L300 215 L320 240 L340 220 L360 240 L380 218 L400 240 L400 250 L0 250 Z" fill="#15803d" opacity="0.5"/>` +
  // ground / grass
  `<path d="M0 240 L0 400 L400 400 L400 240 Q300 220 200 235 Q100 250 0 240 Z" fill="url(#prh-ground)"/>` +
  // grass blades detail
  `<path d="M30 280 l3 -10 l3 10 z" fill="#16a34a" opacity="0.6"/>` +
  `<path d="M80 290 l3 -8 l3 8 z" fill="#16a34a" opacity="0.6"/>` +
  `<path d="M350 285 l3 -10 l3 10 z" fill="#16a34a" opacity="0.6"/>` +
  // winding path
  `<path d="M180 400 Q160 350 200 320 Q250 290 220 250 Q190 230 200 200" stroke="url(#prh-path)" stroke-width="60" fill="none" stroke-linecap="round" opacity="0.85"/>` +
  `<path d="M180 400 Q160 350 200 320 Q250 290 220 250 Q190 230 200 200" stroke="#92400e" stroke-width="62" fill="none" stroke-linecap="round" opacity="0.4"/>` +
  // left tree (large)
  `<rect x="36" y="220" width="14" height="80" fill="#78350f"/>` +
  `<rect x="34" y="220" width="18" height="6" fill="#451a03"/>` +
  `<circle cx="44" cy="180" r="36" fill="#15803d"/>` +
  `<circle cx="44" cy="172" r="26" fill="#16a34a"/>` +
  `<circle cx="28" cy="172" r="18" fill="#22c55e"/>` +
  `<circle cx="62" cy="172" r="18" fill="#22c55e"/>` +
  `<circle cx="44" cy="156" r="16" fill="#22c55e"/>` +
  // highlight on tree
  `<circle cx="36" cy="168" r="8" fill="#4ade80" opacity="0.6"/>` +
  // right tree (large)
  `<rect x="328" y="220" width="14" height="80" fill="#78350f"/>` +
  `<rect x="326" y="220" width="18" height="6" fill="#451a03"/>` +
  `<circle cx="336" cy="180" r="38" fill="#15803d"/>` +
  `<circle cx="336" cy="170" r="28" fill="#16a34a"/>` +
  `<circle cx="316" cy="170" r="20" fill="#22c55e"/>` +
  `<circle cx="354" cy="170" r="20" fill="#22c55e"/>` +
  `<circle cx="336" cy="152" r="18" fill="#22c55e"/>` +
  `<circle cx="328" cy="166" r="8" fill="#4ade80" opacity="0.6"/>` +
  // middle tree (smaller, distant)
  `<rect x="194" y="245" width="10" height="50" fill="#78350f"/>` +
  `<circle cx="200" cy="232" r="24" fill="#15803d"/>` +
  `<circle cx="200" cy="226" r="18" fill="#16a34a"/>` +
  `<circle cx="190" cy="226" r="12" fill="#22c55e"/>` +
  `<circle cx="210" cy="226" r="12" fill="#22c55e"/>` +
  // flowers along path
  `<circle cx="120" cy="380" r="4" fill="#ec4899"/>` +
  `<circle cx="116" cy="376" r="2" fill="#fda4af"/>` +
  `<rect x="119" y="380" width="2" height="6" fill="#16a34a"/>` +
  `<circle cx="100" cy="370" r="3" fill="#fbbf24"/>` +
  `<rect x="99" y="370" width="2" height="6" fill="#16a34a"/>` +
  `<circle cx="270" cy="370" r="4" fill="#a855f7"/>` +
  `<circle cx="266" cy="366" r="2" fill="#c084fc"/>` +
  `<rect x="269" y="370" width="2" height="6" fill="#16a34a"/>` +
  `<circle cx="290" cy="385" r="3" fill="#fb7185"/>` +
  `<rect x="289" y="385" width="2" height="6" fill="#16a34a"/>` +
  // pond (left)
  `<ellipse cx="80" cy="350" rx="40" ry="14" fill="#7dd3fc"/>` +
  `<ellipse cx="80" cy="350" rx="36" ry="11" fill="#0ea5e9" opacity="0.7"/>` +
  `<path d="M50 348 Q70 345 90 350" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.8"/>` +
  `<path d="M60 354 Q80 352 100 356" stroke="#bae6fd" stroke-width="1.5" fill="none" opacity="0.6"/>` +
  // bench (right)
  `<rect x="320" y="320" width="50" height="6" fill="#92400e"/>` +
  `<rect x="324" y="312" width="42" height="10" fill="#a16207"/>` +
  `<rect x="320" y="326" width="4" height="14" fill="#78350f"/>` +
  `<rect x="366" y="326" width="4" height="14" fill="#78350f"/>` +
  `<rect x="324" y="312" width="4" height="10" fill="#78350f"/>` +
  `<rect x="362" y="312" width="4" height="10" fill="#78350f"/>` +
  // shadow under bench
  `<ellipse cx="345" cy="342" rx="28" ry="3" fill="#15803d" opacity="0.4"/>` +
  // lamp post (left)
  `<rect x="124" y="240" width="3" height="80" fill="#1e293b"/>` +
  `<rect x="118" y="234" width="14" height="6" fill="#1e293b"/>` +
  `<circle cx="125" cy="232" r="5" fill="#fde68a"/>` +
  `<rect x="123" y="237" width="4" height="3" fill="#fde68a"/>` +
  // lamp glow
  `<circle cx="125" cy="232" r="14" fill="#fde68a" opacity="0.3"/>` +
  // dog (between the two people)
  `<ellipse cx="200" cy="346" rx="12" ry="6" fill="#a16207"/>` +
  `<circle cx="186" cy="342" r="6" fill="#92400e"/>` +
  `<path d="M180 340 L176 332" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>` +
  `<rect x="194" y="350" width="3" height="8" fill="#92400e"/>` +
  `<rect x="200" y="350" width="3" height="8" fill="#92400e"/>` +
  `<rect x="206" y="350" width="3" height="8" fill="#92400e"/>` +
  `<rect x="212" y="350" width="3" height="8" fill="#92400e"/>` +
  `<path d="M212 340 q4 -2 5 -6" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round"/>` +
  // person 1 (left)
  `<ellipse cx="140" cy="370" rx="14" ry="4" fill="#15803d" opacity="0.3"/>` +
  `<circle cx="140" cy="320" r="14" fill="#fbbf24"/>` +
  `<circle cx="140" cy="314" r="9" fill="#fde68a"/>` +
  `<rect x="130" y="328" width="20" height="28" fill="#0ea5e9"/>` +
  `<rect x="124" y="356" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="150" y="356" width="6" height="14" fill="#1e293b"/>` +
  `<path d="M158 332 q8 0 12 -8" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  // person 2 (right)
  `<ellipse cx="240" cy="370" rx="14" ry="4" fill="#15803d" opacity="0.3"/>` +
  `<circle cx="240" cy="320" r="14" fill="#fda4af"/>` +
  `<circle cx="240" cy="314" r="9" fill="#fecdd3"/>` +
  `<rect x="230" y="328" width="20" height="28" fill="#dc2626"/>` +
  `<rect x="224" y="356" width="6" height="14" fill="#1e293b"/>` +
  `<rect x="250" y="356" width="6" height="14" fill="#1e293b"/>` +
  `<path d="M222 332 q-8 0 -12 -8" stroke="#fecdd3" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  // balloons above (between people)
  `<line x1="190" y1="285" x2="190" y2="265" stroke="#1e293b" stroke-width="1"/>` +
  `<ellipse cx="190" cy="260" rx="9" ry="11" fill="#ec4899"/>` +
  `<ellipse cx="190" cy="258" rx="4" ry="5" fill="#fda4af" opacity="0.7"/>` +
  `<polygon points="190,271 187,275 193,275" fill="#ec4899"/>` +
  // butterfly
  `<ellipse cx="280" cy="280" rx="4" ry="6" fill="#a855f7"/>` +
  `<ellipse cx="276" cy="276" rx="5" ry="4" fill="#c084fc" transform="rotate(-30 276 276)"/>` +
  `<ellipse cx="284" cy="276" rx="5" ry="4" fill="#c084fc" transform="rotate(30 284 276)"/>` +
  `<line x1="280" y1="282" x2="280" y2="288" stroke="#1e293b" stroke-width="1"/>`,
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