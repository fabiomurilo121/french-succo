/**
 * Dados de conjugação dos verbos franceses.
 * Cada verbo possui uma lista de tempos verbais, e cada tempo
 * traz a conjugação para os pronomes pessoais aplicáveis.
 *
 * Para verbos impessoais (ex.: falloir), apenas "il" tem conjugação.
 */

export const PRONOUNS = [
  { id: 'je',     label: 'je',     elides: true  },
  { id: 'tu',     label: 'tu',     elides: false },
  { id: 'il',     label: 'il/elle/on', elides: false },
  { id: 'nous',   label: 'nous',   elides: false },
  { id: 'vous',   label: 'vous',   elides: false },
  { id: 'ils',    label: 'ils/elles', elides: false }
]

const TENSES = [
  { id: 'present',          name: 'Présent',              description: 'Presente do indicativo' },
  { id: 'imparfait',        name: 'Imparfait',            description: 'Pretérito imperfeito' },
  { id: 'passe-compose',    name: 'Passé composé',        description: 'Pretérito composto' },
  { id: 'futur-simple',     name: 'Futur simple',         description: 'Futuro do presente' },
  { id: 'conditionnel',     name: 'Conditionnel présent', description: 'Condicional presente' },
  { id: 'subjonctif',       name: 'Subjonctif présent',   description: 'Presente do conjuntivo' },
  { id: 'plus-que-parfait', name: 'Plus-que-parfait',     description: 'Mais-que-perfeito' },
  { id: 'futur-anterieur',  name: 'Futur antérieur',      description: 'Futuro composto' }
]

function buildTenses(conj) {
  return TENSES.map((t) => ({ ...t, conjugations: conj[t.id] || {} }))
}

export const VERBS = [
  {
    id: 'etre',
    infinitive: 'être',
    translation: 'ser / estar',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'suis',      tu: 'es',          il: 'est',       nous: 'sommes',    vous: 'êtes',    ils: 'sont'    },
      imparfait:        { je: 'étais',     tu: 'étais',       il: 'était',     nous: 'étions',    vous: 'étiez',   ils: 'étaient' },
      "passe-compose":     { je: 'ai été',    tu: 'as été',      il: 'a été',     nous: 'avons été', vous: 'avez été',ils: 'ont été'  },
      "futur-simple":      { je: 'serai',     tu: 'seras',       il: 'sera',      nous: 'serons',    vous: 'serez',   ils: 'seront'  },
      conditionnel:     { je: 'serais',    tu: 'serais',      il: 'serait',    nous: 'serions',   vous: 'seriez',  ils: 'seraient'},
      subjonctif:       { je: 'sois',      tu: 'sois',        il: 'soit',      nous: 'soyons',    vous: 'soyez',   ils: 'soient'  },
      "plus-que-parfait":   { je: 'avais été', tu: 'avais été',   il: 'avait été', nous: 'avions été',vous: 'aviez été',ils:'avaient été'},
      "futur-anterieur":   { je: 'aurai été', tu: 'auras été',   il: 'aura été',  nous: 'aurons été',vous: 'aurez été',ils:'auront été'}
    })
  },
  {
    id: 'avoir',
    infinitive: 'avoir',
    translation: 'ter',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'ai',        tu: 'as',          il: 'a',         nous: 'avons',     vous: 'avez',    ils: 'ont'     },
      imparfait:        { je: 'avais',     tu: 'avais',       il: 'avait',     nous: 'avions',    vous: 'aviez',   ils: 'avaient' },
      "passe-compose":     { je: 'ai eu',     tu: 'as eu',       il: 'a eu',      nous: 'avons eu',  vous: 'avez eu', ils: 'ont eu'  },
      "futur-simple":      { je: 'aurai',     tu: 'auras',       il: 'aura',      nous: 'aurons',    vous: 'aurez',   ils: 'auront'  },
      conditionnel:     { je: 'aurais',    tu: 'aurais',      il: 'aurait',    nous: 'aurions',   vous: 'auriez',  ils: 'auraient'},
      subjonctif:       { je: 'aie',       tu: 'aies',        il: 'ait',       nous: 'ayons',     vous: 'ayez',    ils: 'aient'   },
      "plus-que-parfait":   { je: 'avais eu',  tu: 'avais eu',    il: 'avait eu',  nous: 'avions eu', vous: 'aviez eu',ils: 'avaient eu'},
      "futur-anterieur":   { je: 'aurai eu',  tu: 'auras eu',    il: 'aura eu',   nous: 'aurons eu', vous: 'aurez eu',ils: 'auront eu'}
    })
  },
  {
    id: 'faire',
    infinitive: 'faire',
    translation: 'fazer',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'fais',      tu: 'fais',        il: 'fait',      nous: 'faisons',   vous: 'faites',  ils: 'font'    },
      imparfait:        { je: 'faisais',   tu: 'faisais',     il: 'faisait',   nous: 'faisions',  vous: 'faisiez', ils: 'faisaient'},
      "passe-compose":     { je: 'ai fait',   tu: 'as fait',     il: 'a fait',    nous: 'avons fait',vous: 'avez fait',ils:'ont fait' },
      "futur-simple":      { je: 'ferai',     tu: 'feras',       il: 'fera',      nous: 'ferons',    vous: 'ferez',   ils: 'feront'  },
      conditionnel:     { je: 'ferais',    tu: 'ferais',      il: 'ferait',    nous: 'ferions',   vous: 'feriez',  ils: 'feraient'},
      subjonctif:       { je: 'fasse',     tu: 'fasses',      il: 'fasse',     nous: 'fassions',  vous: 'fassiez', ils: 'fassent' },
      "plus-que-parfait":   { je: 'avais fait',tu: 'avais fait',  il: 'avait fait',nous: 'avions fait',vous:'aviez fait',ils:'avaient fait'},
      "futur-anterieur":   { je: 'aurai fait',tu: 'auras fait',  il: 'aura fait', nous: 'aurons fait',vous:'aurez fait',ils:'auront fait'}
    })
  },
  {
    id: 'aller',
    infinitive: 'aller',
    translation: 'ir',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'vais',      tu: 'vas',         il: 'va',        nous: 'allons',    vous: 'allez',   ils: 'vont'    },
      imparfait:        { je: 'allais',    tu: 'allais',      il: 'allait',    nous: 'allions',   vous: 'alliez',  ils: 'allaient'},
      "passe-compose":     { je: 'suis allé', tu: 'es allé',     il: 'est allé',  nous: 'sommes allés',vous:'êtes allés',ils:'sont allés'},
      "futur-simple":      { je: 'irai',      tu: 'iras',        il: 'ira',       nous: 'irons',     vous: 'irez',    ils: 'iront'   },
      conditionnel:     { je: 'irais',     tu: 'irais',       il: 'irait',     nous: 'irions',    vous: 'iriez',   ils: 'iraient' },
      subjonctif:       { je: 'aille',     tu: 'ailles',      il: 'aille',     nous: 'allions',   vous: 'alliez',  ils: 'aillent' },
      "plus-que-parfait":   { je: 'étais allé',tu: 'étais allé',  il: 'était allé',nous: 'étions allés',vous:'étiez allés',ils:'étaient allés'},
      "futur-anterieur":   { je: 'serai allé',tu: 'seras allé',  il: 'sera allé', nous: 'serons allés',vous:'serez allés',ils:'seront allés'}
    })
  },
  {
    id: 'sortir',
    infinitive: 'sortir',
    translation: 'sair',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'sors',      tu: 'sors',        il: 'sort',      nous: 'sortons',   vous: 'sortez',  ils: 'sortent' },
      imparfait:        { je: 'sortais',   tu: 'sortais',     il: 'sortait',   nous: 'sortions',  vous: 'sortiez', ils: 'sortaient'},
      "passe-compose":     { je: 'suis sorti',tu: 'es sorti',    il: 'est sorti', nous: 'sommes sortis',vous:'êtes sortis',ils:'sont sortis'},
      "futur-simple":      { je: 'sortirai',  tu: 'sortiras',    il: 'sortira',   nous: 'sortirons', vous: 'sortirez',ils: 'sortiront'},
      conditionnel:     { je: 'sortirais', tu: 'sortirais',   il: 'sortirait', nous: 'sortirions',vous:'sortiriez',ils:'sortiraient'},
      subjonctif:       { je: 'sorte',     tu: 'sortes',      il: 'sorte',     nous: 'sortions',  vous: 'sortiez', ils: 'sortent' },
      "plus-que-parfait":   { je: 'étais sorti',tu:'étais sorti', il: 'était sorti',nous: 'étions sortis',vous:'étiez sortis',ils:'étaient sortis'},
      "futur-anterieur":   { je: 'serai sorti',tu:'seras sorti', il: 'sera sorti',nous: 'serons sortis',vous:'serez sortis',ils:'seront sortis'}
    })
  },
  {
    id: 'venir',
    infinitive: 'venir',
    translation: 'vir',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'viens',     tu: 'viens',       il: 'vient',     nous: 'venons',    vous: 'venez',   ils: 'viennent'},
      imparfait:        { je: 'venais',    tu: 'venais',      il: 'venait',    nous: 'venions',   vous: 'veniez',  ils: 'venaient'},
      "passe-compose":     { je: 'suis venu', tu: 'es venu',     il: 'est venu',  nous: 'sommes venus',vous:'êtes venus',ils:'sont venus'},
      "futur-simple":      { je: 'viendrai',  tu: 'viendras',    il: 'viendra',   nous: 'viendrons', vous: 'viendrez',ils: 'viendront'},
      conditionnel:     { je: 'viendrais', tu: 'viendrais',   il: 'viendrait', nous: 'viendrions',vous:'viendriez',ils:'viendraient'},
      subjonctif:       { je: 'vienne',    tu: 'viennes',     il: 'vienne',    nous: 'venions',   vous: 'veniez',  ils: 'viennent'},
      "plus-que-parfait":   { je: 'étais venu',tu: 'étais venu',  il: 'était venu',nous: 'étions venus',vous:'étiez venus',ils:'étaient venus'},
      "futur-anterieur":   { je: 'serai venu',tu: 'seras venu',  il: 'sera venu', nous: 'serons venus',vous:'serez venus',ils:'seront venus'}
    })
  },
  {
    id: 'prendre',
    infinitive: 'prendre',
    translation: 'pegar / tomar',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'prends',    tu: 'prends',      il: 'prend',     nous: 'prenons',   vous: 'prenez',  ils: 'prennent'},
      imparfait:        { je: 'prenais',   tu: 'prenais',     il: 'prenait',   nous: 'prenions',  vous: 'preniez', ils: 'prenaient'},
      "passe-compose":     { je: 'ai pris',   tu: 'as pris',     il: 'a pris',    nous: 'avons pris',vous:'avez pris',ils:'ont pris' },
      "futur-simple":      { je: 'prendrai',  tu: 'prendras',    il: 'prendra',   nous: 'prendrons', vous: 'prendrez',ils: 'prendront'},
      conditionnel:     { je: 'prendrais', tu: 'prendrais',   il: 'prendrait', nous: 'prendrions',vous:'prendriez',ils:'prendraient'},
      subjonctif:       { je: 'prenne',    tu: 'prennes',     il: 'prenne',    nous: 'prenions',  vous: 'preniez', ils: 'prennent'},
      "plus-que-parfait":   { je: 'avais pris',tu: 'avais pris',  il: 'avait pris',nous: 'avions pris',vous:'aviez pris',ils:'avaient pris'},
      "futur-anterieur":   { je: 'aurai pris',tu: 'auras pris',  il: 'aura pris', nous: 'aurons pris',vous:'aurez pris',ils:'auront pris'}
    })
  },
  {
    id: 'mettre',
    infinitive: 'mettre',
    translation: 'pôr / colocar',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'mets',      tu: 'mets',        il: 'met',       nous: 'mettons',   vous: 'mettez',  ils: 'mettent' },
      imparfait:        { je: 'mettais',   tu: 'mettais',     il: 'mettait',   nous: 'mettions',  vous: 'mettiez', ils: 'mettaient'},
      "passe-compose":     { je: 'ai mis',    tu: 'as mis',      il: 'a mis',     nous: 'avons mis', vous: 'avez mis',ils: 'ont mis' },
      "futur-simple":      { je: 'mettrai',   tu: 'mettras',     il: 'mettra',    nous: 'mettrons',  vous: 'mettrez', ils: 'mettront'},
      conditionnel:     { je: 'mettrais',  tu: 'mettrais',    il: 'mettrait',  nous: 'mettrions', vous: 'mettriez',ils: 'mettraient'},
      subjonctif:       { je: 'mette',     tu: 'mettes',      il: 'mette',     nous: 'mettions',  vous: 'mettiez', ils: 'mettent' },
      "plus-que-parfait":   { je: 'avais mis', tu: 'avais mis',   il: 'avait mis', nous: 'avions mis',vous:'aviez mis',ils:'avaient mis'},
      "futur-anterieur":   { je: 'aurai mis', tu: 'auras mis',   il: 'aura mis',  nous: 'aurons mis',vous:'aurez mis',ils:'auront mis'}
    })
  },
  {
    id: 'arriver',
    infinitive: 'arriver',
    translation: 'chegar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'arrive',    tu: 'arrives',     il: 'arrive',    nous: 'arrivons',  vous: 'arrivez', ils: 'arrivent'},
      imparfait:        { je: 'arrivais',  tu: 'arrivais',    il: 'arrivait',  nous: 'arrivions', vous: 'arriviez',ils: 'arrivaient'},
      "passe-compose":     { je: 'suis arrivé',tu:'es arrivé',   il: 'est arrivé',nous: 'sommes arrivés',vous:'êtes arrivés',ils:'sont arrivés'},
      "futur-simple":      { je: 'arriverai', tu: 'arriveras',   il: 'arrivera',  nous: 'arriverons',vous: 'arriverez',ils:'arriveront'},
      conditionnel:     { je: 'arriverais',tu: 'arriverais',  il: 'arriverait',nous: 'arriverions',vous:'arriveriez',ils:'arriveraient'},
      subjonctif:       { je: 'arrive',    tu: 'arrives',     il: 'arrive',    nous: 'arrivions', vous: 'arriviez',ils: 'arrivent'},
      "plus-que-parfait":   { je: 'étais arrivé',tu:'étais arrivé',il: 'était arrivé',nous:'étions arrivés',vous:'étiez arrivés',ils:'étaient arrivés'},
      "futur-anterieur":   { je: 'serai arrivé',tu:'seras arrivé',il: 'sera arrivé',nous:'serons arrivés',vous:'serez arrivés',ils:'seront arrivés'}
    })
  },
  {
    id: 'trouver',
    infinitive: 'trouver',
    translation: 'encontrar / achar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'trouve',    tu: 'trouves',     il: 'trouve',    nous: 'trouvons',  vous: 'trouvez', ils: 'trouvent'},
      imparfait:        { je: 'trouvais',  tu: 'trouvais',    il: 'trouvait',  nous: 'trouvions', vous: 'trouviez',ils: 'trouvaient'},
      "passe-compose":     { je: 'ai trouvé', tu: 'as trouvé',   il: 'a trouvé',  nous: 'avons trouvé',vous:'avez trouvé',ils:'ont trouvé'},
      "futur-simple":      { je: 'trouverai', tu: 'trouveras',   il: 'trouvera',  nous: 'trouverons',vous: 'trouverez',ils:'trouveront'},
      conditionnel:     { je: 'trouverais',tu: 'trouverais',  il: 'trouverait',nous: 'trouverions',vous:'trouveriez',ils:'trouveraient'},
      subjonctif:       { je: 'trouve',    tu: 'trouves',     il: 'trouve',    nous: 'trouvions', vous: 'trouviez',ils: 'trouvent'},
      "plus-que-parfait":   { je: 'avais trouvé',tu:'avais trouvé',il: 'avait trouvé',nous:'avions trouvé',vous:'aviez trouvé',ils:'avaient trouvé'},
      "futur-anterieur":   { je: 'aurai trouvé',tu:'auras trouvé',il: 'aura trouvé',nous:'aurons trouvé',vous:'aurez trouvé',ils:'auront trouvé'}
    })
  },
  {
    id: 'tenir',
    infinitive: 'tenir',
    translation: 'segurar / manter',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'tiens',     tu: 'tiens',       il: 'tient',     nous: 'tenons',    vous: 'tenez',   ils: 'tiennent'},
      imparfait:        { je: 'tenais',    tu: 'tenais',      il: 'tenait',    nous: 'tenions',   vous: 'teniez',  ils: 'tenaient'},
      "passe-compose":     { je: 'ai tenu',   tu: 'as tenu',     il: 'a tenu',    nous: 'avons tenu',vous: 'avez tenu',ils:'ont tenu' },
      "futur-simple":      { je: 'tiendrai',  tu: 'tiendras',    il: 'tiendra',   nous: 'tiendrons', vous: 'tiendrez',ils: 'tiendront'},
      conditionnel:     { je: 'tiendrais', tu: 'tiendrais',   il: 'tiendrait', nous: 'tiendrions',vous:'tiendriez',ils:'tiendraient'},
      subjonctif:       { je: 'tienne',    tu: 'tiennes',     il: 'tienne',    nous: 'tenions',   vous: 'teniez',  ils: 'tiennent'},
      "plus-que-parfait":   { je: 'avais tenu',tu: 'avais tenu',  il: 'avait tenu',nous: 'avions tenu',vous:'aviez tenu',ils:'avaient tenu'},
      "futur-anterieur":   { je: 'aurai tenu',tu: 'auras tenu',  il: 'aura tenu', nous: 'aurons tenu',vous:'aurez tenu',ils:'auront tenu'}
    })
  },
  {
    id: 'rendre',
    infinitive: 'rendre',
    translation: 'devolver / entregar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'rends',     tu: 'rends',       il: 'rend',      nous: 'rendons',   vous: 'rendez',  ils: 'rendent' },
      imparfait:        { je: 'rendais',   tu: 'rendais',     il: 'rendait',   nous: 'rendions',  vous: 'rendiez', ils: 'rendaient'},
      "passe-compose":     { je: 'ai rendu',  tu: 'as rendu',    il: 'a rendu',   nous: 'avons rendu',vous:'avez rendu',ils:'ont rendu'},
      "futur-simple":      { je: 'rendrai',   tu: 'rendras',     il: 'rendra',    nous: 'rendrons',  vous: 'rendrez', ils: 'rendront'},
      conditionnel:     { je: 'rendrais',  tu: 'rendrais',    il: 'rendrait',  nous: 'rendrions', vous: 'rendriez',ils: 'rendraient'},
      subjonctif:       { je: 'rende',     tu: 'rendes',      il: 'rende',     nous: 'rendions',  vous: 'rendiez', ils: 'rendent' },
      "plus-que-parfait":   { je: 'avais rendu',tu:'avais rendu', il: 'avait rendu',nous:'avions rendu',vous:'aviez rendu',ils:'avaient rendu'},
      "futur-anterieur":   { je: 'aurai rendu',tu:'auras rendu', il: 'aura rendu',nous:'aurons rendu',vous:'aurez rendu',ils:'auront rendu'}
    })
  },
  {
    id: 'dire',
    infinitive: 'dire',
    translation: 'dizer',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'dis',       tu: 'dis',         il: 'dit',       nous: 'disons',    vous: 'dites',   ils: 'disent'  },
      imparfait:        { je: 'disais',    tu: 'disais',      il: 'disait',    nous: 'disions',   vous: 'disiez',  ils: 'disaient'},
      "passe-compose":     { je: 'ai dit',    tu: 'as dit',      il: 'a dit',     nous: 'avons dit', vous: 'avez dit',ils: 'ont dit' },
      "futur-simple":      { je: 'dirai',     tu: 'diras',       il: 'dira',      nous: 'dirons',    vous: 'direz',   ils: 'diront'  },
      conditionnel:     { je: 'dirais',    tu: 'dirais',      il: 'dirait',    nous: 'dirions',   vous: 'diriez',  ils: 'diraient'},
      subjonctif:       { je: 'dise',      tu: 'dises',       il: 'dise',      nous: 'disions',   vous: 'disiez',  ils: 'disent'  },
      "plus-que-parfait":   { je: 'avais dit', tu: 'avais dit',   il: 'avait dit', nous: 'avions dit',vous:'aviez dit',ils:'avaient dit'},
      "futur-anterieur":   { je: 'aurai dit', tu: 'auras dit',   il: 'aura dit',  nous: 'aurons dit',vous:'aurez dit',ils:'auront dit'}
    })
  },
  {
    id: 'parler',
    infinitive: 'parler',
    translation: 'falar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'parle',     tu: 'parles',      il: 'parle',     nous: 'parlons',   vous: 'parlez',  ils: 'parlent' },
      imparfait:        { je: 'parlais',   tu: 'parlais',     il: 'parlait',   nous: 'parlions',  vous: 'parliez', ils: 'parlaient'},
      "passe-compose":     { je: 'ai parlé',  tu: 'as parlé',    il: 'a parlé',   nous: 'avons parlé',vous:'avez parlé',ils:'ont parlé'},
      "futur-simple":      { je: 'parlerai',  tu: 'parleras',    il: 'parlera',   nous: 'parlerons', vous: 'parlerez',ils: 'parleront'},
      conditionnel:     { je: 'parlerais', tu: 'parlerais',   il: 'parlerait', nous: 'parlerions',vous:'parleriez',ils:'parleraient'},
      subjonctif:       { je: 'parle',     tu: 'parles',      il: 'parle',     nous: 'parlions',  vous: 'parliez', ils: 'parlent' },
      "plus-que-parfait":   { je: 'avais parlé',tu:'avais parlé', il: 'avait parlé',nous:'avions parlé',vous:'aviez parlé',ils:'avaient parlé'},
      "futur-anterieur":   { je: 'aurai parlé',tu:'auras parlé', il: 'aura parlé',nous:'aurons parlé',vous:'aurez parlé',ils:'auront parlé'}
    })
  },
  {
    id: 'savoir',
    infinitive: 'savoir',
    translation: 'saber',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'sais',      tu: 'sais',        il: 'sait',      nous: 'savons',    vous: 'savez',   ils: 'savent'  },
      imparfait:        { je: 'savais',    tu: 'savais',      il: 'savait',    nous: 'savions',   vous: 'saviez',  ils: 'savaient'},
      "passe-compose":     { je: 'ai su',     tu: 'as su',       il: 'a su',      nous: 'avons su',  vous: 'avez su', ils: 'ont su'  },
      "futur-simple":      { je: 'saurai',    tu: 'sauras',      il: 'saura',     nous: 'saurons',   vous: 'saurez',  ils: 'sauront' },
      conditionnel:     { je: 'saurais',   tu: 'saurais',     il: 'saurait',   nous: 'saurions',  vous: 'sauriez', ils: 'sauraient'},
      subjonctif:       { je: 'sache',     tu: 'saches',      il: 'sache',     nous: 'sachions',  vous: 'sachiez', ils: 'sachent' },
      "plus-que-parfait":   { je: 'avais su',  tu: 'avais su',    il: 'avait su',  nous: 'avions su', vous: 'aviez su',ils: 'avaient su'},
      "futur-anterieur":   { je: 'aurai su',  tu: 'auras su',    il: 'aura su',   nous: 'aurons su', vous: 'aurez su',ils: 'auront su'}
    })
  },
  {
    id: 'croire',
    infinitive: 'croire',
    translation: 'acreditar',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'crois',     tu: 'crois',       il: 'croit',     nous: 'croyons',   vous: 'croyez',  ils: 'croient' },
      imparfait:        { je: 'croyais',   tu: 'croyais',     il: 'croyait',   nous: 'croyions',  vous: 'croyiez', ils: 'croyaient'},
      "passe-compose":     { je: 'ai cru',    tu: 'as cru',      il: 'a cru',     nous: 'avons cru', vous: 'avez cru',ils: 'ont cru' },
      "futur-simple":      { je: 'croirai',   tu: 'croiras',     il: 'croira',    nous: 'croirons',  vous: 'croirez', ils: 'croiront'},
      conditionnel:     { je: 'croirais',  tu: 'croirais',    il: 'croirait',  nous: 'croirions', vous: 'croiriez',ils: 'croiraient'},
      subjonctif:       { je: 'croie',     tu: 'croies',      il: 'croie',     nous: 'croyions',  vous: 'croyiez', ils: 'croient' },
      "plus-que-parfait":   { je: 'avais cru', tu: 'avais cru',   il: 'avait cru', nous: 'avions cru',vous:'aviez cru',ils:'avaient cru'},
      "futur-anterieur":   { je: 'aurai cru', tu: 'auras cru',   il: 'aura cru',  nous: 'aurons cru',vous:'aurez cru',ils:'auront cru'}
    })
  },
  {
    id: 'demander',
    infinitive: 'demander',
    translation: 'pedir / perguntar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'demande',   tu: 'demandes',    il: 'demande',   nous: 'demandons', vous: 'demandez',ils: 'demandent'},
      imparfait:        { je: 'demandais', tu: 'demandais',   il: 'demandait', nous: 'demandions',vous:'demandiez',ils: 'demandaient'},
      "passe-compose":     { je: 'ai demandé',tu: 'as demandé',  il: 'a demandé', nous: 'avons demandé',vous:'avez demandé',ils:'ont demandé'},
      "futur-simple":      { je: 'demanderai',tu: 'demanderas',  il: 'demandera', nous: 'demanderons',vous:'demanderez',ils:'demanderont'},
      conditionnel:     { je: 'demanderais',tu:'demanderais', il: 'demanderait',nous:'demanderions',vous:'demanderiez',ils:'demanderaient'},
      subjonctif:       { je: 'demande',   tu: 'demandes',    il: 'demande',   nous: 'demandions',vous:'demandiez',ils: 'demandent'},
      "plus-que-parfait":   { je: 'avais demandé',tu:'avais demandé',il:'avait demandé',nous:'avions demandé',vous:'aviez demandé',ils:'avaient demandé'},
      "futur-anterieur":   { je: 'aurai demandé',tu:'auras demandé',il:'aura demandé',nous:'aurons demandé',vous:'aurez demandé',ils:'auront demandé'}
    })
  },
  {
    id: 'comprendre',
    infinitive: 'comprendre',
    translation: 'entender / compreender',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'comprends', tu: 'comprends',   il: 'comprend',  nous: 'comprenons',vous: 'comprenez',ils: 'comprennent'},
      imparfait:        { je: 'comprenais',tu: 'comprenais',  il: 'comprenait',nous: 'comprenions',vous:'compreniez',ils: 'comprenaient'},
      "passe-compose":     { je: 'ai compris',tu: 'as compris',  il: 'a compris', nous: 'avons compris',vous:'avez compris',ils:'ont compris'},
      "futur-simple":      { je: 'comprendrai',tu:'comprendras', il: 'comprendra',nous: 'comprendrons',vous:'comprendrez',ils:'comprendront'},
      conditionnel:     { je: 'comprendrais',tu:'comprendrais',il:'comprendrait',nous:'comprendrions',vous:'comprendriez',ils:'comprendraient'},
      subjonctif:       { je: 'comprenne', tu: 'comprennes',  il: 'comprenne', nous: 'comprenions',vous:'compreniez',ils: 'comprennent'},
      "plus-que-parfait":   { je: 'avais compris',tu:'avais compris',il:'avait compris',nous:'avions compris',vous:'aviez compris',ils:'avaient compris'},
      "futur-anterieur":   { je: 'aurai compris',tu:'auras compris',il:'aura compris',nous:'aurons compris',vous:'aurez compris',ils:'auront compris'}
    })
  },
  {
    id: 'entendre',
    infinitive: 'entendre',
    translation: 'ouvir',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'entends',   tu: 'entends',     il: 'entend',    nous: 'entendons', vous: 'entendez',ils: 'entendent'},
      imparfait:        { je: 'entendais', tu: 'entendais',   il: 'entendait', nous: 'entendions',vous:'entendiez',ils: 'entendaient'},
      "passe-compose":     { je: 'ai entendu',tu: 'as entendu',  il: 'a entendu', nous: 'avons entendu',vous:'avez entendu',ils:'ont entendu'},
      "futur-simple":      { je: 'entendrai', tu: 'entendras',   il: 'entendra',  nous: 'entendrons',vous: 'entendrez',ils: 'entendront'},
      conditionnel:     { je: 'entendrais',tu: 'entendrais',  il: 'entendrait',nous: 'entendrions',vous:'entendriez',ils:'entendraient'},
      subjonctif:       { je: 'entende',   tu: 'entendes',    il: 'entende',   nous: 'entendions',vous:'entendiez',ils: 'entendent'},
      "plus-que-parfait":   { je: 'avais entendu',tu:'avais entendu',il:'avait entendu',nous:'avions entendu',vous:'aviez entendu',ils:'avaient entendu'},
      "futur-anterieur":   { je: 'aurai entendu',tu:'auras entendu',il:'aura entendu',nous:'aurons entendu',vous:'aurez entendu',ils:'auront entendu'}
    })
  },
  {
    id: 'regarder',
    infinitive: 'regarder',
    translation: 'assistir / olhar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'regarde',   tu: 'regardes',    il: 'regarde',   nous: 'regardons', vous: 'regardez',ils: 'regardent'},
      imparfait:        { je: 'regardais', tu: 'regardais',   il: 'regardait', nous: 'regardions',vous:'regardiez',ils: 'regardaient'},
      "passe-compose":     { je: 'ai regardé',tu: 'as regardé',  il: 'a regardé', nous: 'avons regardé',vous:'avez regardé',ils:'ont regardé'},
      "futur-simple":      { je: 'regarderai',tu: 'regarderas',  il: 'regardera', nous: 'regarderons',vous:'regarderez',ils:'regarderont'},
      conditionnel:     { je: 'regarderais',tu:'regarderais', il: 'regarderait',nous:'regarderions',vous:'regarderiez',ils:'regarderaient'},
      subjonctif:       { je: 'regarde',   tu: 'regardes',    il: 'regarde',   nous: 'regardions',vous:'regardiez',ils: 'regardent'},
      "plus-que-parfait":   { je: 'avais regardé',tu:'avais regardé',il:'avait regardé',nous:'avions regardé',vous:'aviez regardé',ils:'avaient regardé'},
      "futur-anterieur":   { je: 'aurai regardé',tu:'auras regardé',il:'aura regardé',nous:'aurons regardé',vous:'aurez regardé',ils:'auront regardé'}
    })
  },
  {
    id: 'sentir',
    infinitive: 'sentir',
    translation: 'sentir',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'sens',      tu: 'sens',        il: 'sent',      nous: 'sentons',   vous: 'sentez',   ils: 'sentent' },
      imparfait:        { je: 'sentais',   tu: 'sentais',     il: 'sentait',   nous: 'sentions',  vous: 'sentiez',  ils: 'sentaient'},
      "passe-compose":     { je: 'ai senti',  tu: 'as senti',    il: 'a senti',   nous: 'avons senti',vous:'avez senti',ils:'ont senti'},
      "futur-simple":      { je: 'sentirai',  tu: 'sentiras',    il: 'sentira',   nous: 'sentirons', vous: 'sentirez',ils: 'sentiront'},
      conditionnel:     { je: 'sentirais', tu: 'sentirais',   il: 'sentirait', nous: 'sentirions',vous:'sentiriez',ils:'sentiraient'},
      subjonctif:       { je: 'sente',     tu: 'sentes',      il: 'sente',     nous: 'sentions',  vous: 'sentiez',  ils: 'sentent' },
      "plus-que-parfait":   { je: 'avais senti',tu:'avais senti', il: 'avait senti',nous:'avions senti',vous:'aviez senti',ils:'avaient senti'},
      "futur-anterieur":   { je: 'aurai senti',tu:'auras senti', il: 'aura senti',nous:'aurons senti',vous:'aurez senti',ils:'auront senti'}
    })
  },
  {
    id: 'vouloir',
    infinitive: 'vouloir',
    translation: 'querer',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'veux',      tu: 'veux',        il: 'veut',      nous: 'voulons',   vous: 'voulez',   ils: 'veulent' },
      imparfait:        { je: 'voulais',   tu: 'voulais',     il: 'voulait',   nous: 'voulions',  vous: 'vouliez',  ils: 'voulaient'},
      "passe-compose":     { je: 'ai voulu',  tu: 'as voulu',    il: 'a voulu',   nous: 'avons voulu',vous:'avez voulu',ils:'ont voulu'},
      "futur-simple":      { je: 'voudrai',   tu: 'voudras',     il: 'voudra',    nous: 'voudrons',  vous: 'voudrez',  ils: 'voudront'},
      conditionnel:     { je: 'voudrais',  tu: 'voudrais',    il: 'voudrait',  nous: 'voudrions', vous: 'voudriez', ils: 'voudraient'},
      subjonctif:       { je: 'veuille',   tu: 'veuilles',    il: 'veuille',   nous: 'voulions',  vous: 'vouliez',  ils: 'veuillent'},
      "plus-que-parfait":   { je: 'avais voulu',tu:'avais voulu', il: 'avait voulu',nous:'avions voulu',vous:'aviez voulu',ils:'avaient voulu'},
      "futur-anterieur":   { je: 'aurai voulu',tu:'auras voulu', il: 'aura voulu',nous:'aurons voulu',vous:'aurez voulu',ils:'auront voulu'}
    })
  },
  {
    id: 'pouvoir',
    infinitive: 'pouvoir',
    translation: 'poder',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'peux',      tu: 'peux',        il: 'peut',      nous: 'pouvons',   vous: 'pouvez',   ils: 'peuvent' },
      imparfait:        { je: 'pouvais',   tu: 'pouvais',     il: 'pouvait',   nous: 'pouvions',  vous: 'pouviez',  ils: 'pouvaient'},
      "passe-compose":     { je: 'ai pu',     tu: 'as pu',       il: 'a pu',      nous: 'avons pu',  vous: 'avez pu',  ils: 'ont pu'  },
      "futur-simple":      { je: 'pourrai',   tu: 'pourras',     il: 'pourra',    nous: 'pourrons',  vous: 'pourrez',  ils: 'pourront'},
      conditionnel:     { je: 'pourrais',  tu: 'pourrais',    il: 'pourrait',  nous: 'pourrions', vous: 'pourriez', ils: 'pourraient'},
      subjonctif:       { je: 'puisse',    tu: 'puisses',     il: 'puisse',    nous: 'puissions', vous: 'puissiez', ils: 'puissent'},
      "plus-que-parfait":   { je: 'avais pu',  tu: 'avais pu',    il: 'avait pu',  nous: 'avions pu', vous: 'aviez pu', ils: 'avaient pu'},
      "futur-anterieur":   { je: 'aurai pu',  tu: 'auras pu',    il: 'aura pu',   nous: 'aurons pu', vous: 'aurez pu', ils: 'auront pu'}
    })
  },
  {
    id: 'devoir',
    infinitive: 'devoir',
    translation: 'dever',
    regular: false,
    tenses: buildTenses({
      present:          { je: 'dois',      tu: 'dois',        il: 'doit',      nous: 'devons',    vous: 'devez',    ils: 'doivent' },
      imparfait:        { je: 'devais',    tu: 'devais',      il: 'devait',    nous: 'devions',   vous: 'deviez',   ils: 'devaient'},
      "passe-compose":     { je: 'ai dû',     tu: 'as dû',       il: 'a dû',      nous: 'avons dû',  vous: 'avez dû',  ils: 'ont dû'  },
      "futur-simple":      { je: 'devrai',    tu: 'devras',      il: 'devra',     nous: 'devrons',   vous: 'devrez',   ils: 'devront'},
      conditionnel:     { je: 'devrais',   tu: 'devrais',     il: 'devrait',   nous: 'devrions',  vous: 'devriez',  ils: 'devraient'},
      subjonctif:       { je: 'doive',     tu: 'doives',      il: 'doive',     nous: 'devions',   vous: 'deviez',   ils: 'doivent' },
      "plus-que-parfait":   { je: 'avais dû',  tu: 'avais dû',    il: 'avait dû',  nous: 'avions dû', vous: 'aviez dû', ils: 'avaient dû'},
      "futur-anterieur":   { je: 'aurai dû',  tu: 'auras dû',    il: 'aura dû',   nous: 'aurons dû', vous: 'aurez dû', ils: 'auront dû'}
    })
  },
  {
    id: 'aimer',
    infinitive: 'aimer',
    translation: 'amar / gostar',
    regular: true,
    tenses: buildTenses({
      present:          { je: 'aime',      tu: 'aimes',       il: 'aime',      nous: 'aimons',    vous: 'aimez',    ils: 'aiment'  },
      imparfait:        { je: 'aimais',    tu: 'aimais',      il: 'aimait',    nous: 'aimions',   vous: 'aimiez',   ils: 'aimaient'},
      "passe-compose":     { je: 'ai aimé',   tu: 'as aimé',     il: 'a aimé',    nous: 'avons aimé',vous: 'avez aimé',ils: 'ont aimé'},
      "futur-simple":      { je: 'aimerai',   tu: 'aimeras',     il: 'aimera',    nous: 'aimerons',  vous: 'aimerez',  ils: 'aimeront'},
      conditionnel:     { je: 'aimerais',  tu: 'aimerais',    il: 'aimerait',  nous: 'aimerions', vous: 'aimeriez', ils: 'aimeraient'},
      subjonctif:       { je: 'aime',      tu: 'aimes',       il: 'aime',      nous: 'aimions',   vous: 'aimiez',   ils: 'aiment'  },
      "plus-que-parfait":   { je: 'avais aimé',tu: 'avais aimé',  il: 'avait aimé',nous: 'avions aimé',vous:'aviez aimé',ils:'avaient aimé'},
      "futur-anterieur":   { je: 'aurai aimé',tu: 'auras aimé',  il: 'aura aimé', nous: 'aurons aimé',vous:'aurez aimé',ils:'auront aimé'}
    })
  },
  {
    id: 'falloir',
    infinitive: 'falloir',
    translation: 'ser necessário (impessoal)',
    impersonal: true,
    regular: false,
    tenses: buildTenses({
      present:          { il: 'faut'       },
      imparfait:        { il: 'fallait'    },
      "passe-compose":     { il: 'a fallu'    },
      "futur-simple":      { il: 'faudra'     },
      conditionnel:     { il: 'faudrait'   },
      subjonctif:       { il: 'faille'     },
      "plus-que-parfait":   { il: 'avait fallu'},
      "futur-anterieur":   { il: 'aura fallu' }
    })
  }
]

export function getVerb(id) {
  return VERBS.find((v) => v.id === id) || null
}

/**
 * Retorna os pronomes aplicáveis a um verbo.
 * Para verbos impessoais (ex.: falloir), retorna apenas "il".
 */
export function getPronounsFor(verb) {
  if (!verb) return PRONOUNS
  if (verb.impersonal) {
    const il = PRONOUNS.find((p) => p.id === 'il')
    return il ? [il] : []
  }
  return PRONOUNS
}

/**
 * Normaliza uma resposta para comparação:
 * - remove espaços extras
 * - ignora diferenças de maiúsculas/minúsculas
 * - remove acentos
 * - remove o "j'" / "je " (pronomes elididos)
 * - remove o "qu'" / "que " (para subjuntivo)
 */
export function normalizeAnswer(text) {
  return (text || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(je|j)[\s']+/, '')
    .replace(/^(que|qu)[\s']+/, '')
}
