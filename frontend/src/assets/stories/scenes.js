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
      <stop offset="0" stop-color="#bae6fd"/>
      <stop offset="0.55" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fed7aa"/>
    </linearGradient>
    <linearGradient id="ph-river" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="1" stop-color="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="ph-tower" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#475569"/>
      <stop offset="1" stop-color="#1e293b"/>
    </linearGradient>
  </defs>` +
  `<rect width="400" height="400" fill="url(#ph-sky)"/>` +
  `<circle cx="60" cy="70" r="32" fill="#fef3c7"/>` +
  `<circle cx="60" cy="70" r="32" fill="#fde68a"/>` +
  `<ellipse cx="120" cy="90" rx="40" ry="10" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="280" cy="60" rx="50" ry="12" fill="#fff" opacity="0.5"/>` +
  `<rect y="240" width="400" height="160" fill="url(#ph-river)"/>` +
  `<rect x="0" y="235" width="400" height="10" fill="#0c4a6e"/>` +
  `<path d="M0 250 Q100 245 200 252 T400 248" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.6"/>` +
  `<path d="M0 280 Q150 275 280 282 T400 278" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.5"/>` +
  `<rect x="170" y="100" width="60" height="140" fill="url(#ph-tower)"/>` +
  `<polygon points="200,60 195,100 205,100" fill="url(#ph-tower)"/>` +
  `<line x1="200" y1="40" x2="200" y2="100" stroke="#fbbf24" stroke-width="2"/>` +
  `<circle cx="200" cy="40" r="3" fill="#fbbf24"/>` +
  `<rect x="178" y="115" width="44" height="6" fill="#64748b"/>` +
  `<rect x="178" y="135" width="44" height="6" fill="#64748b"/>` +
  `<rect x="178" y="165" width="44" height="6" fill="#64748b"/>` +
  `<rect x="178" y="200" width="44" height="6" fill="#64748b"/>` +
  `<rect x="172" y="115" width="6" height="125" fill="#64748b"/>` +
  `<rect x="222" y="115" width="6" height="125" fill="#64748b"/>` +
  `<path d="M170 240 L150 290 L250 290 L230 240 Z" fill="url(#ph-tower)"/>` +
  `<rect x="20" y="170" width="60" height="70" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="15,170 50,140 85,170" fill="#64748b"/>` +
  `<rect x="32" y="185" width="14" height="20" fill="#bfdbfe"/>` +
  `<rect x="52" y="185" width="14" height="20" fill="#bfdbfe"/>` +
  `<rect x="32" y="210" width="14" height="14" fill="#bfdbfe"/>` +
  `<rect x="52" y="210" width="14" height="14" fill="#bfdbfe"/>` +
  `<rect x="100" y="150" width="50" height="90" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="95,150 125,125 155,150" fill="#475569"/>` +
  `<rect x="108" y="165" width="12" height="16" fill="#fbbf24"/>` +
  `<rect x="130" y="165" width="12" height="16" fill="#fbbf24"/>` +
  `<rect x="108" y="190" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="130" y="190" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="108" y="212" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="130" y="212" width="12" height="14" fill="#fbbf24"/>` +
  `<rect x="280" y="160" width="60" height="80" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="275,160 310,130 345,160" fill="#64748b"/>` +
  `<rect x="290" y="175" width="14" height="18" fill="#bae6fd"/>` +
  `<rect x="316" y="175" width="14" height="18" fill="#bae6fd"/>` +
  `<rect x="290" y="200" width="14" height="14" fill="#bae6fd"/>` +
  `<rect x="316" y="200" width="14" height="14" fill="#bae6fd"/>` +
  `<rect x="350" y="180" width="40" height="60" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>` +
  `<polygon points="345,180 370,155 395,180" fill="#475569"/>` +
  `<rect x="358" y="195" width="10" height="14" fill="#fde68a"/>` +
  `<rect x="372" y="195" width="10" height="14" fill="#fde68a"/>` +
  `<rect x="358" y="215" width="10" height="12" fill="#fde68a"/>` +
  `<rect x="372" y="215" width="10" height="12" fill="#fde68a"/>` +
  `<ellipse cx="60" cy="280" rx="22" ry="6" fill="#16a34a" opacity="0.7"/>` +
  `<circle cx="60" cy="250" r="14" fill="#22c55e"/>` +
  `<circle cx="60" cy="245" r="9" fill="#86efac"/>` +
  `<circle cx="340" cy="280" rx="22" ry="6" fill="#16a34a" opacity="0.7"/>` +
  `<circle cx="340" cy="250" r="14" fill="#22c55e"/>` +
  `<circle cx="340" cy="245" r="9" fill="#86efac"/>` +
  `<circle cx="80" cy="320" r="20" fill="#fbbf24"/>` +
  `<circle cx="80" cy="312" r="10" fill="#fde68a"/>` +
  `<rect x="68" y="328" width="24" height="34" fill="#dc2626"/>` +
  `<rect x="60" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<rect x="90" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<circle cx="320" cy="320" r="20" fill="#fda4af"/>` +
  `<circle cx="320" cy="312" r="10" fill="#fecdd3"/>` +
  `<rect x="308" y="328" width="24" height="34" fill="#0ea5e9"/>` +
  `<rect x="300" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<rect x="330" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<ellipse cx="200" cy="310" rx="36" ry="8" fill="#fbbf24" opacity="0.7"/>` +
  `<rect x="172" y="298" width="56" height="14" rx="3" fill="#fbbf24"/>` +
  `<rect x="170" y="295" width="60" height="8" rx="2" fill="#1e293b"/>` +
  `<circle cx="180" cy="313" r="6" fill="#1e293b"/>` +
  `<circle cx="220" cy="313" r="6" fill="#1e293b"/>`,
  '#bae6fd'
)

const marcheHero = wrap(
  `<defs>
    <linearGradient id="mh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#fed7aa"/>
      <stop offset="1" stop-color="#fef3c7"/>
    </linearGradient>
  </defs>` +
  `<rect width="400" height="120" fill="url(#mh-sky)"/>` +
  `<circle cx="340" cy="50" r="28" fill="#fde68a"/>` +
  `<rect y="350" width="400" height="50" fill="#92400e"/>` +
  `<rect y="345" width="400" height="8" fill="#78350f"/>` +
  `<path d="M0 120 L60 80 L120 120 L180 80 L240 120 L300 80 L360 120 L400 100 L400 140 L0 140 Z" fill="#dc2626"/>` +
  `<path d="M0 120 L60 80 L120 120 L180 80 L240 120 L300 80 L360 120 L400 100" stroke="#fff" stroke-width="2" fill="none"/>` +
  `<rect x="20" y="140" width="120" height="80" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<polygon points="20,140 80,110 140,140" fill="#dc2626"/>` +
  `<rect x="20" y="140" width="120" height="14" fill="#dc2626"/>` +
  `<text x="80" y="152" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">LÉGUMES</text>` +
  `<circle cx="50" cy="190" r="16" fill="#dc2626"/>` +
  `<circle cx="50" cy="184" r="8" fill="#f87171"/>` +
  `<path d="M48 174 L50 168 L52 174" stroke="#16a34a" stroke-width="2" fill="none"/>` +
  `<circle cx="90" cy="195" r="14" fill="#fb923c"/>` +
  `<circle cx="90" cy="190" r="7" fill="#fed7aa"/>` +
  `<circle cx="120" cy="200" r="12" fill="#86efac"/>` +
  `<rect x="160" y="140" width="120" height="80" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<polygon points="160,140 220,110 280,140" fill="#16a34a"/>` +
  `<rect x="160" y="140" width="120" height="14" fill="#16a34a"/>` +
  `<text x="220" y="152" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">FROMAGE</text>` +
  `<ellipse cx="200" cy="195" rx="22" ry="10" fill="#fde047"/>` +
  `<ellipse cx="200" cy="190" rx="22" ry="10" fill="#fef08a"/>` +
  `<ellipse cx="245" cy="200" rx="18" ry="8" fill="#facc15"/>` +
  `<circle cx="240" cy="200" r="3" fill="#92400e"/>` +
  `<circle cx="250" cy="200" r="3" fill="#92400e"/>` +
  `<rect x="300" y="140" width="100" height="80" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<polygon points="300,140 350,110 400,140" fill="#a16207"/>` +
  `<rect x="300" y="140" width="100" height="14" fill="#a16207"/>` +
  `<text x="350" y="152" font-family="serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">PAIN</text>` +
  `<ellipse cx="335" cy="190" rx="20" ry="8" fill="#92400e"/>` +
  `<ellipse cx="335" cy="186" rx="20" ry="8" fill="#d97706"/>` +
  `<ellipse cx="370" cy="195" rx="18" ry="7" fill="#a16207"/>` +
  `<rect x="20" y="240" width="100" height="60" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="20" y="240" width="100" height="12" fill="#7c3aed"/>` +
  `<text x="70" y="250" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">OLIVES</text>` +
  `<ellipse cx="50" cy="275" rx="10" ry="6" fill="#65a30d"/>` +
  `<ellipse cx="75" cy="280" rx="10" ry="6" fill="#84cc16"/>` +
  `<ellipse cx="100" cy="275" rx="10" ry="6" fill="#451a03"/>` +
  `<rect x="140" y="240" width="100" height="60" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="140" y="240" width="100" height="12" fill="#dc2626"/>` +
  `<text x="190" y="250" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">FRUITS</text>` +
  `<circle cx="170" cy="280" r="14" fill="#dc2626"/>` +
  `<circle cx="170" cy="276" r="7" fill="#f87171"/>` +
  `<circle cx="200" cy="280" r="12" fill="#facc15"/>` +
  `<ellipse cx="220" cy="282" rx="10" ry="8" fill="#a3e635"/>` +
  `<rect x="260" y="240" width="120" height="60" fill="#fff" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="260" y="240" width="120" height="12" fill="#0284c7"/>` +
  `<text x="320" y="250" font-family="serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">POISSON</text>` +
  `<ellipse cx="310" cy="278" rx="14" ry="6" fill="#94a3b8"/>` +
  `<path d="M324 278 L334 274 L334 282 Z" fill="#94a3b8"/>` +
  `<circle cx="305" cy="278" r="2" fill="#1e293b"/>` +
  `<ellipse cx="350" cy="280" rx="14" ry="6" fill="#cbd5e1"/>` +
  `<path d="M364 280 L374 276 L374 284 Z" fill="#cbd5e1"/>` +
  `<circle cx="345" cy="280" r="2" fill="#1e293b"/>` +
  `<circle cx="100" cy="350" r="20" fill="#fbbf24"/>` +
  `<circle cx="100" cy="342" r="10" fill="#fde68a"/>` +
  `<rect x="88" y="358" width="24" height="32" fill="#dc2626"/>` +
  `<rect x="80" y="388" width="10" height="12" fill="#1e293b"/>` +
  `<rect x="110" y="388" width="10" height="12" fill="#1e293b"/>` +
  `<ellipse cx="120" y="380" rx="14" ry="5" fill="#92400e"/>` +
  `<path d="M106 380 Q120 372 134 380" stroke="#a16207" stroke-width="3" fill="none"/>` +
  `<circle cx="320" cy="350" r="22" fill="#fda4af"/>` +
  `<circle cx="320" cy="342" r="12" fill="#fecdd3"/>` +
  `<rect x="306" y="358" width="28" height="32" fill="#0ea5e9"/>` +
  `<rect x="298" y="388" width="10" height="12" fill="#1e293b"/>` +
  `<rect x="332" y="388" width="10" height="12" fill="#1e293b"/>`,
  '#fed7aa'
)

const parcHero = wrap(
  `<defs>
    <linearGradient id="prh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#7dd3fc"/>
      <stop offset="0.6" stop-color="#bae6fd"/>
      <stop offset="1" stop-color="#bbf7d0"/>
    </linearGradient>
    <radialGradient id="prh-sun" cx="0.5" cy="0.5">
      <stop offset="0" stop-color="#fef3c7"/>
      <stop offset="0.5" stop-color="#fde68a"/>
      <stop offset="1" stop-color="#fbbf24"/>
    </radialGradient>
  </defs>` +
  `<rect width="400" height="400" fill="url(#prh-sky)"/>` +
  `<circle cx="320" cy="80" r="40" fill="url(#prh-sun)"/>` +
  `<ellipse cx="100" cy="60" rx="40" ry="8" fill="#fff" opacity="0.6"/>` +
  `<ellipse cx="240" cy="100" rx="50" ry="10" fill="#fff" opacity="0.5"/>` +
  `<path d="M0 280 Q100 240 200 270 T400 260 L400 400 L0 400 Z" fill="#22c55e"/>` +
  `<path d="M0 320 Q120 290 240 310 T400 300 L400 400 L0 400 Z" fill="#16a34a"/>` +
  `<path d="M180 280 Q200 270 220 280 L260 400 L140 400 Z" fill="#a16207" opacity="0.6"/>` +
  `<path d="M80 250 L100 200 L120 250 Z" fill="#15803d"/>` +
  `<circle cx="100" cy="220" r="40" fill="#16a34a"/>` +
  `<circle cx="100" cy="210" r="28" fill="#22c55e"/>` +
  `<circle cx="80" cy="200" r="20" fill="#22c55e"/>` +
  `<circle cx="120" cy="200" r="20" fill="#22c55e"/>` +
  `<rect x="92" y="240" width="16" height="60" fill="#78350f"/>` +
  `<path d="M280 240 L310 170 L340 240 Z" fill="#15803d"/>` +
  `<circle cx="310" cy="200" r="50" fill="#16a34a"/>` +
  `<circle cx="310" cy="186" r="36" fill="#22c55e"/>` +
  `<circle cx="285" cy="178" r="24" fill="#22c55e"/>` +
  `<circle cx="335" cy="178" r="24" fill="#22c55e"/>` +
  `<rect x="302" y="240" width="16" height="70" fill="#78350f"/>` +
  `<path d="M40 350 Q60 320 80 340 Q100 320 120 350 L130 400 L30 400 Z" fill="#facc15" opacity="0.5"/>` +
  `<ellipse cx="80" cy="320" rx="20" ry="6" fill="#a16207"/>` +
  `<rect x="70" y="310" width="20" height="14" fill="#92400e"/>` +
  `<rect x="76" y="298" width="8" height="14" fill="#92400e"/>` +
  `<circle cx="80" cy="296" r="6" fill="#92400e"/>` +
  `<path d="M260 320 Q290 280 330 300 Q360 280 380 320 L390 400 L240 400 Z" fill="#7dd3fc" opacity="0.6"/>` +
  `<path d="M260 320 Q310 290 380 320" stroke="#bae6fd" stroke-width="2" fill="none" opacity="0.7"/>` +
  `<ellipse cx="320" cy="335" rx="14" ry="4" fill="#fff" opacity="0.8"/>` +
  `<path d="M170 290 Q190 270 210 280 L230 350 L150 350 Z" fill="#dc2626" opacity="0.85"/>` +
  `<ellipse cx="190" cy="285" rx="20" ry="8" fill="#fbbf24"/>` +
  `<rect x="180" y="280" width="20" height="10" fill="#dc2626"/>` +
  `<circle cx="190" cy="282" r="6" fill="#fff"/>` +
  `<circle cx="190" cy="282" r="3" fill="#1e293b"/>` +
  `<path d="M40 350 Q200 340 400 360 L400 400 L0 400 Z" fill="#a16207" opacity="0.3"/>` +
  `<circle cx="50" cy="380" r="4" fill="#fff"/>` +
  `<circle cx="70" cy="385" r="4" fill="#fff"/>` +
  `<circle cx="100" cy="378" r="4" fill="#fff"/>` +
  `<circle cx="60" cy="370" r="3" fill="#fff"/>` +
  `<circle cx="140" cy="370" r="20" fill="#fbbf24"/>` +
  `<circle cx="140" cy="362" r="10" fill="#fde68a"/>` +
  `<rect x="128" y="378" width="24" height="34" fill="#0ea5e9"/>` +
  `<rect x="120" y="410" width="10" height="14" fill="#1e293b"/>` +
  `<rect x="150" y="410" width="10" height="14" fill="#1e293b"/>` +
  `<circle cx="240" cy="370" r="20" fill="#fda4af"/>` +
  `<circle cx="240" cy="362" r="10" fill="#fecdd3"/>` +
  `<rect x="228" y="378" width="24" height="34" fill="#dc2626"/>` +
  `<rect x="220" y="410" width="10" height="14" fill="#1e293b"/>` +
  `<rect x="250" y="410" width="10" height="14" fill="#1e293b"/>` +
  `<path d="M168 360 L162 348 L172 354" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<path d="M212 360 L218 348 L208 354" stroke="#fecdd3" stroke-width="5" fill="none" stroke-linecap="round"/>` +
  `<path d="M180 350 Q200 340 220 350" stroke="#fff" stroke-width="2" fill="none" opacity="0.9"/>`,
  '#bbf7d0'
)

const pharmacieHero = wrap(
  `<defs>
    <linearGradient id="phh-sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#bae6fd"/>
      <stop offset="1" stop-color="#dbeafe"/>
    </linearGradient>
  </defs>` +
  `<rect width="400" height="280" fill="url(#phh-sky)"/>` +
  `<rect y="280" width="400" height="120" fill="#64748b"/>` +
  `<rect y="280" width="400" height="6" fill="#334155"/>` +
  `<rect y="286" width="400" height="3" fill="#fbbf24" stroke-dasharray="14 14"/>` +
  `<rect x="0" y="120" width="120" height="180" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>` +
  `<rect x="0" y="120" width="120" height="20" fill="#475569"/>` +
  `<rect x="20" y="160" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="50" y="160" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="80" y="160" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="20" y="200" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="50" y="200" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="80" y="200" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="20" y="240" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="50" y="240" width="20" height="30" fill="#bae6fd"/>` +
  `<rect x="80" y="240" width="20" height="30" fill="#bae6fd"/>` +
  `<polygon points="0,120 60,90 120,120" fill="#334155"/>` +
  `<rect x="240" y="100" width="160" height="200" fill="#fff" stroke="#1e293b" stroke-width="3"/>` +
  `<rect x="240" y="100" width="160" height="30" fill="#22c55e"/>` +
  `<text x="320" y="120" font-family="serif" font-size="14" font-weight="700" fill="#fff" text-anchor="middle">PHARMACIE</text>` +
  `<rect x="310" y="60" width="60" height="50" fill="#22c55e"/>` +
  `<rect x="332" y="60" width="16" height="50" fill="#fff"/>` +
  `<rect x="310" y="78" width="60" height="14" fill="#fff"/>` +
  `<text x="340" y="91" font-family="sans-serif" font-size="20" font-weight="900" fill="#22c55e" text-anchor="middle">+</text>` +
  `<rect x="260" y="145" width="55" height="80" fill="#bae6fd" stroke="#22c55e" stroke-width="2"/>` +
  `<rect x="325" y="145" width="55" height="80" fill="#bae6fd" stroke="#22c55e" stroke-width="2"/>` +
  `<rect x="260" y="235" width="120" height="50" fill="#dc2626"/>` +
  `<text x="320" y="265" font-family="sans-serif" font-size="11" font-weight="700" fill="#fff" text-anchor="middle">OUVERT 8h-20h</text>` +
  `<rect x="260" y="295" width="120" height="5" fill="#22c55e"/>` +
  `<text x="320" y="335" font-family="serif" font-size="13" font-style="italic" font-weight="700" fill="#22c55e" text-anchor="middle">de la santé</text>` +
  `<circle cx="120" cy="320" r="22" fill="#fbbf24"/>` +
  `<circle cx="120" cy="312" r="12" fill="#fde68a"/>` +
  `<rect x="106" y="328" width="28" height="36" fill="#dc2626"/>` +
  `<rect x="98" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<rect x="132" y="362" width="10" height="22" fill="#1e293b"/>` +
  `<path d="M100 308 Q90 296 100 288" stroke="#fde68a" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<circle cx="114" cy="312" r="2" fill="#1e293b"/>` +
  `<circle cx="126" cy="312" r="2" fill="#1e293b"/>` +
  `<path d="M114 320 Q120 318 126 320" stroke="#1e293b" stroke-width="2" fill="none"/>` +
  `<rect x="150" y="320" width="36" height="32" rx="4" fill="#fff" stroke="#dc2626" stroke-width="2"/>` +
  `<rect x="156" y="316" width="24" height="6" fill="#dc2626"/>` +
  `<path d="M154 330 L182 330 M154 336 L172 336 M154 342 L178 342" stroke="#dc2626" stroke-width="2"/>` +
  `<circle cx="380" cy="320" r="6" fill="#fbbf24"/>` +
  `<circle cx="370" cy="280" r="5" fill="#fbbf24"/>` +
  `<circle cx="385" cy="240" r="4" fill="#fbbf24"/>` +
  `<circle cx="350" cy="260" r="4" fill="#fbbf24"/>` +
  `<circle cx="395" cy="180" r="3" fill="#fbbf24"/>`,
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