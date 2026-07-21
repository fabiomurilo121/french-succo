<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useToastStore } from '@/stores/toast'
import { scenes } from '@/assets/stories/scenes'

const toast = useToastStore()

/* ── Stories ── */
const stories = [
  {
    id: 'paris',
    title: 'Premier jour à Paris',
    subtitle: 'Primeiro dia em Paris',
    icon: 'map',
    cover: '🇫🇷',
    heroId: 'parisHero',
    phrases: [
      { fr: 'Nous arrivons à l\'aéroport de Roissy.', pt: 'Nós chegamos ao aeroporto de Roissy.', sceneId: 'airport' },
      { fr: 'Prenons un taxi pour aller à l\'hôtel.', pt: 'Vamos pegar um táxi para ir ao hotel.', sceneId: 'taxi' },
      { fr: 'Bonjour, j\'ai une réservation au nom de Martin.', pt: 'Olá, eu tenho uma reserva no nome de Martin.', sceneId: 'hotelReception' },
      { fr: 'Nous nous promenons dans les rues de Paris.', pt: 'Nós caminhamos pelas ruas de Paris.', sceneId: 'street' },
      { fr: 'Comment acheter un ticket de métro ?', pt: 'Como comprar um bilhete de metrô?', sceneId: 'metro' },
      { fr: 'Oh, regardez la tour Eiffel !', pt: 'Oh, olhem a Torre Eiffel!', sceneId: 'eiffel' },
      { fr: 'Asseyons-nous à la terrasse du café.', pt: 'Vamos sentar na varanda do café.', sceneId: 'cafeTerrasse' },
      { fr: 'Il est tard, rentrons à l\'hôtel.', pt: 'Está tarde, vamos voltar ao hotel.', sceneId: 'hotelNight' }
    ],
    narrative: "Nous arrivons à l'aéroport de Roissy ce matin. Il fait beau et le ciel est bleu. Nous prenons un taxi jaune pour aller à l'hôtel. Le chauffeur est très gentil et parle un peu anglais. Après vingt minutes, nous arrivons devant un petit hôtel près du centre. Je montre ma réservation au réceptionniste. Il nous donne les clés de notre chambre au troisième étage. La chambre est petite mais confortable. Nous sortons pour nous promener dans les rues de Paris. Les bâtiments sont anciens et beaux. Nous achetons des tickets de métro à la machine. Le métro est rapide et bondé. Au loin, nous voyons la tour Eiffel qui brille au soleil. Nous nous asseyons à la terrasse d'un café pour boire un café. Le serveur est très sympathique. Le soir, nous retournons à l'hôtel fatigués mais contents.",
    vocabulary: [
      { fr: 'aéroport', pt: 'aeroporto' },
      { fr: 'taxi', pt: 'táxi' },
      { fr: 'réservation', pt: 'reserva' },
      { fr: 'chambre', pt: 'quarto' },
      { fr: 'étage', pt: 'andar' },
      { fr: 'confortable', pt: 'confortável' },
      { fr: 'billet', pt: 'bilhete / passagem' },
      { fr: 'rapide', pt: 'rápido' },
      { fr: 'soleil', pt: 'sol' },
      { fr: 'terrasse', pt: 'varanda' },
      { fr: 'sympathique', pt: 'simpático' },
      { fr: 'fatigués', pt: 'cansados' }
    ]
  },
  {
    id: 'marche',
    title: 'Au marché de Provence',
    subtitle: 'No mercado da Provença',
    icon: 'cards',
    cover: '🧺',
    heroId: 'marcheHero',
    phrases: [
      { fr: 'Allons au marché ce matin.', pt: 'Vamos ao mercado esta manhã.', sceneId: 'marketEntrance' },
      { fr: 'Regardez ces belles tomates et ces courgettes !', pt: 'Olhem estes tomates bonitos e estas abobrinhas!', sceneId: 'vegetables' },
      { fr: 'Je voudrais acheter du fromage de chèvre.', pt: 'Eu gostaria de comprar queijo de cabra.', sceneId: 'cheese' },
      { fr: 'Une baguette fraîche, s\'il vous plaît.', pt: 'Uma baguete fresca, por favor.', sceneId: 'bakery' },
      { fr: 'Puis-je goûter les olives ?', pt: 'Posso provar as azeitonas?', sceneId: 'olives' },
      { fr: 'Cette vendeuse est très sympathique.', pt: 'Esta vendedora é muito simpática.', sceneId: 'vendor' },
      { fr: 'Je paie en espèces, c\'est combien ?', pt: 'Eu pago em dinheiro, quanto é?', sceneId: 'payment' },
      { fr: 'Quel beau panier plein de bonnes choses !', pt: 'Que cesta linda cheia de coisas boas!', sceneId: 'basket' }
    ],
    narrative: "Nous allons au marché de Provence tôt le matin. Le marché est coloré et plein de monde. Il y a beaucoup d'étals avec des légumes frais. Je vois de belles tomates rouges et des courgettes vertes. Je m'arrête au stand du fromager pour acheter du fromage de chèvre. Le fromager me fait goûter un morceau. C'est délicieux et un peu fort. Puis je vais chez le boulanger pour une baguette fraîche. La boulangère a un grand sourire. J'achète aussi des olives noires et vertes. La vendeuse d'olives est très sympathique. Je paie en espèces à la fin. Mon panier est plein de bonnes choses pour ce midi.",
    vocabulary: [
      { fr: 'marché', pt: 'mercado' },
      { fr: 'matin', pt: 'manhã' },
      { fr: 'légumes', pt: 'legumes' },
      { fr: 'frais', pt: 'fresco' },
      { fr: 'tomates', pt: 'tomates' },
      { fr: 'courgettes', pt: 'abobrinhas' },
      { fr: 'fromage', pt: 'queijo' },
      { fr: 'chèvre', pt: 'cabra' },
      { fr: 'goûter', pt: 'provar' },
      { fr: 'délicieux', pt: 'delicioso' },
      { fr: 'boulangère', pt: 'padeira' },
      { fr: 'baguette', pt: 'baguete' },
      { fr: 'olives', pt: 'azeitonas' },
      { fr: 'espèces', pt: 'dinheiro' },
      { fr: 'panier', pt: 'cesta' }
    ]
  },
  {
    id: 'parc',
    title: 'Une rencontre au parc',
    subtitle: 'Um encontro no parque',
    icon: 'user',
    cover: '🌳',
    heroId: 'parcHero',
    phrases: [
      { fr: 'Je me promène dans le parc ce matin.', pt: 'Eu estou caminhando no parque esta manhã.', sceneId: 'parkWalk' },
      { fr: 'Tiens, une personne approche.', pt: 'Ora, uma pessoa se aproxima.', sceneId: 'twoPeople' },
      { fr: 'Bonjour ! Comment allez-vous ?', pt: 'Olá! Como vai você?', sceneId: 'greeting' },
      { fr: 'Il fait beau aujourd\'hui, n\'est-ce pas ?', pt: 'Está bonito hoje, não é?', sceneId: 'sun' },
      { fr: 'Enchanté, je m\'appelle Claire.', pt: 'Prazer, eu me chamo Claire.', sceneId: 'handshake' },
      { fr: 'Voulez-vous échanger nos numéros ?', pt: 'Quer trocar nossos números?', sceneId: 'phone' },
      { fr: 'Au revoir et à bientôt !', pt: 'Tchau e até logo!', sceneId: 'waving' },
      { fr: 'On se voit samedi au café.', pt: 'Nos vemos sábado no café.', sceneId: 'calendar' }
    ],
    narrative: "Je me promène dans le parc ce samedi matin. Le soleil brille et les oiseaux chantent. Je vois une personne qui marche vers moi. Nous nous regardons et sourions. Je dis bonjour et elle répond poliment. Il fait vraiment beau aujourd'hui, dit-elle. Enchanté, je m'appelle Claire, dis-je. Et moi, c'est Antoine, répond-elle. Nous nous serrons la main avec plaisir. Nous parlons un peu de tout. Je lui demande si elle veut échanger nos numéros. Elle accepte avec un grand sourire. Avant de partir, nous nous disons au revoir. À bientôt, Antoine ! À samedi prochain au café, je propose.",
    vocabulary: [
      { fr: 'parc', pt: 'parque' },
      { fr: 'samedi', pt: 'sábado' },
      { fr: 'soleil', pt: 'sol' },
      { fr: 'brille', pt: 'brilha' },
      { fr: 'oiseaux', pt: 'pássaros' },
      { fr: 'chantent', pt: 'cantam' },
      { fr: 'personne', pt: 'pessoa' },
      { fr: 'marche', pt: 'caminha' },
      { fr: 'sourions', pt: 'sorrímos' },
      { fr: 'poliment', pt: 'educadamente' },
      { fr: 'serre la main', pt: 'aperta a mão' },
      { fr: 'plaisir', pt: 'prazer' },
      { fr: 'numéros', pt: 'números' },
      { fr: 'accepte', pt: 'aceita' },
      { fr: 'bientôt', pt: 'logo' }
    ]
  },
  {
    id: 'pharmacie',
    title: 'À la pharmacie',
    subtitle: 'Na farmácia',
    icon: 'shield',
    cover: '💊',
    heroId: 'pharmacieHero',
    phrases: [
      { fr: 'Je ne me sens pas bien ce matin.', pt: 'Eu não estou me sentindo bem esta manhã.', sceneId: 'sick' },
      { fr: 'Je vais à la pharmacie.', pt: 'Eu vou à farmácia.', sceneId: 'pharmacyDoor' },
      { fr: 'Bonjour, je cherche quelque chose contre le mal de tête.', pt: 'Olá, procuro algo contra dor de cabeça.', sceneId: 'pharmacyInterior' },
      { fr: 'J\'ai mal à la tête depuis deux jours.', pt: 'Estou com dor de cabeça há dois dias.', sceneId: 'symptoms' },
      { fr: 'Voilà du paracétamol, c\'est très efficace.', pt: 'Aqui está paracetamol, é muito eficaz.', sceneId: 'medicine' },
      { fr: 'Je dois en prendre combien de fois par jour ?', pt: 'Preciso tomar quantas vezes por dia?', sceneId: 'dosage' },
      { fr: 'C\'est huit euros, s\'il vous plaît.', pt: 'São oito euros, por favor.', sceneId: 'payment' },
      { fr: 'Merci beaucoup, je me sens mieux déjà.', pt: 'Muito obrigado, já estou me sentindo melhor.', sceneId: 'leavingPharmacy' }
    ],
    narrative: "Je ne me sens pas bien depuis deux jours. J'ai mal à la tête et un peu de fièvre. Je décide d'aller à la pharmacie du quartier. La pharmacienne m'accueille avec un sourire. Je lui explique mes symptômes en détail. Elle me recommande du paracétamol pour la douleur. Elle me donne aussi des conseils pour me reposer. Je dois prendre un comprimé trois fois par jour. La pharmacienne note les instructions sur la boîte. Je paie huit euros à la caisse. Avant de sortir, elle me souhaite une bonne guérison. Je rentre chez moi, soulagé et confiant.",
    vocabulary: [
      { fr: 'pharmacie', pt: 'farmácia' },
      { fr: 'fièvre', pt: 'febre' },
      { fr: 'mal de tête', pt: 'dor de cabeça' },
      { fr: 'pharmacienne', pt: 'farmacêutica' },
      { fr: 'accueille', pt: 'acolhe' },
      { fr: 'symptômes', pt: 'sintomas' },
      { fr: 'paracétamol', pt: 'paracetamol' },
      { fr: 'douleur', pt: 'dor' },
      { fr: 'reposer', pt: 'descansar' },
      { fr: 'comprimé', pt: 'comprimido' },
      { fr: 'fois', pt: 'vezes' },
      { fr: 'instructions', pt: 'instruções' },
      { fr: 'guérison', pt: 'cura' },
      { fr: 'soulagé', pt: 'aliviado' },
      { fr: 'confiant', pt: 'confiante' }
    ]
  }
]

/* ── French → Portuguese word dictionary ── */
const wordDict = {
  'bonjour': 'olá / bom dia',
  'bonsoir': 'boa noite',
  'merci': 'obrigado',
  'beaucoup': 'muito',
  'oui': 'sim',
  'non': 'não',
  'pardon': 'com licença',
  's\'il': 'se',
  'vous': 'você',
  'plaît': 'por favor',
  'je': 'eu',
  'j\'ai': 'eu tenho',
  'tu': 'você',
  'il': 'ele',
  'elle': 'ela',
  'on': 'a gente',
  'nous': 'nós',
  'ils': 'eles',
  'elles': 'elas',
  'et': 'e',
  'ou': 'ou',
  'mais': 'mas',
  'donc': 'portanto',
  'alors': 'então',
  'bien': 'bem',
  'très': 'muito',
  'peu': 'pouco',
  'trop': 'demais',
  'plus': 'mais',
  'moins': 'menos',
  'avec': 'com',
  'sans': 'sem',
  'pour': 'para',
  'dans': 'em',
  'sur': 'sobre',
  'sous': 'sob',
  'de': 'de',
  'du': 'do',
  'des': 'dos / das',
  'à': 'a / para',
  'au': 'ao / no',
  'aux': 'aos / nos',
  'le': 'o',
  'la': 'a',
  'les': 'os / as',
  'un': 'um',
  'une': 'uma',
  'mon': 'meu',
  'ma': 'minha',
  'mes': 'meus',
  'ton': 'teu',
  'ta': 'tua',
  'son': 'dele',
  'sa': 'dela',
  'ses': 'dele / dela',
  'notre': 'nosso',
  'votre': 'seu',
  'leur': 'deles',
  'ce': 'este',
  'c\'est': 'é',
  'ça': 'isso',
  'cela': 'isso',
  'voilà': 'aí está',
  'autre': 'outro',
  'chose': 'coisa',
  'choses': 'coisas',
  'femme': 'mulher',
  'homme': 'homem',
  'fille': 'menina',
  'garçon': 'garoto',
  'monsieur': 'senhor',
  'madame': 'senhora',
  'cher': 'caro',
  'chère': 'cara',
  'enfant': 'criança',
  'ami': 'amigo',
  'amie': 'amiga',
  'comment': 'como',
  'quoi': 'o quê',
  'qui': 'quem',
  'que': 'que',
  'quel': 'qual',
  'où': 'onde',
  'quand': 'quando',
  'combien': 'quanto',
  'pourquoi': 'por que',
  'parce': 'porque',
  'voudrais': 'queria',
  'veux': 'quer',
  'veut': 'quer',
  'vouloir': 'querer',
  'pouvoir': 'poder',
  'puis': 'posso',
  'peux': 'pode',
  'peut': 'pode',
  'savoir': 'saber',
  'sais': 'sei',
  'connais': 'conheço',
  'faire': 'fazer',
  'fait': 'faz',
  'faites': 'façam',
  'aller': 'ir',
  'vais': 'vou',
  'vas': 'vais',
  'va': 'vai',
  'venir': 'vir',
  'viens': 'venho',
  'voir': 'ver',
  'regardez': 'olhem',
  'regardons': 'olhamos',
  'vendre': 'vender',
  'vend': 'vende',
  'acheter': 'comprar',
  'achète': 'compra',
  'manger': 'comer',
  'boire': 'beber',
  'parler': 'falar',
  'parle': 'fala',
  'habiter': 'morar',
  'réserver': 'reservar',
  'ai': 'tenho',
  'as': 'tens',
  'a': 'tem',
  'avons': 'temos',
  'avez': 'tem',
  'ont': 'têm',
  'suis': 'sou',
  'es': 'és',
  'est': 'é',
  'sommes': 'somos',
  'êtes': 'é',
  'sont': 'são',
  'demain': 'amanhã',
  'aujourd\'hui': 'hoje',
  'hier': 'ontem',
  'matin': 'manhã',
  'soir': 'noite',
  'nuit': 'noite',
  'midi': 'meio-dia',
  'heure': 'hora',
  'heures': 'horas',
  'jour': 'dia',
  'jours': 'dias',
  'semaine': 'semana',
  'mois': 'mês',
  'an': 'ano',
  'année': 'ano',
  'fois': 'vez',
  'temps': 'tempo',
  'toujours': 'sempre',
  'jamais': 'nunca',
  'souvent': 'frequentemente',
  'parfois': 'às vezes',
  'maintenant': 'agora',
  'après': 'depois',
  'avant': 'antes',
  'pendant': 'durante',
  'depuis': 'desde / há',
  'ici': 'aqui',
  'là': 'lá',
  'haut': 'alto',
  'bas': 'baixo',
  'gauche': 'esquerda',
  'droite': 'direita',
  'fond': 'fundo',
  'devant': 'frente',
  'derrière': 'atrás',
  'réservation': 'reserva',
  'chambre': 'quarto',
  'étage': 'andar',
  'déjeuner': 'almoço',
  'dîner': 'jantar',
  'café': 'café',
  'thé': 'chá',
  'eau': 'água',
  'vin': 'vinho',
  'bière': 'cerveja',
  'pain': 'pão',
  'fromage': 'queijo',
  'pomme': 'maçã',
  'pommes': 'maçãs',
  'fruit': 'fruta',
  'lait': 'leite',
  'sucre': 'açúcar',
  'sel': 'sal',
  'poivre': 'pimenta',
  'expresso': 'expresso',
  'kilo': 'quilo',
  'euro': 'euro',
  'euros': 'euros',
  'prix': 'preço',
  'billet': 'bilhete',
  'ticket': 'bilhete',
  'train': 'trem',
  'gare': 'estação',
  'métro': 'metrô',
  'taxi': 'táxi',
  'bus': 'ônibus',
  'avion': 'avião',
  'aéroport': 'aeroporto',
  'promenade': 'passeio',
  'rues': 'ruas',
  'rue': 'rua',
  'tour': 'torre',
  'eiffel': 'Eiffel',
  'terrasse': 'varanda',
  'marché': 'mercado',
  'matin': 'manhã',
  'matinale': 'matinal',
  'matin': 'manhã',
  'monde': 'mundo / pessoas',
  'étals': 'barracas',
  'légumes': 'legumes',
  'légume': 'legume',
  'frais': 'fresco',
  'fraîche': 'fresco (fem.)',
  'belles': 'lindas',
  'belle': 'linda',
  'tomates': 'tomates',
  'rouges': 'vermelhos',
  'rouge': 'vermelho',
  'vertes': 'verdes',
  'verte': 'verde',
  'vert': 'verde',
  'courgettes': 'abobrinhas',
  'stand': 'barraca',
  'fromager': 'queijeiro',
  'chèvre': 'cabra',
  'goûter': 'provar',
  'morceau': 'pedaço',
  'délicieux': 'delicioso',
  'fort': 'forte',
  'puis': 'depois',
  'boulanger': 'padeiro',
  'boulangère': 'padeira',
  'grand': 'grande',
  'sourire': 'sorriso',
  'achète': 'compro',
  'noires': 'pretas',
  'noire': 'preta',
  'noir': 'preto',
  'vendeuse': 'vendedora',
  'sympathique': 'simpático',
  'paie': 'pago',
  'paye': 'pago',
  'espèces': 'dinheiro (espèces)',
  'fin': 'fim',
  'plein': 'cheio',
  'bonnes': 'boas',
  'parc': 'parque',
  'samedi': 'sábado',
  'soleil': 'sol',
  'brille': 'brilha',
  'oiseaux': 'pássaros',
  'oiseau': 'pássaro',
  'chantent': 'cantam',
  'personne': 'pessoa',
  'marche': 'caminha',
  'vers': 'para',
  'regardons': 'olhamos',
  'sourions': 'sorrímos',
  'dis': 'digo',
  'répond': 'responde',
  'poliment': 'educadamente',
  'vraiment': 'realmente',
  'dit': 'diz',
  'elle': 'ela',
  'enchanté': 'prazer',
  'enchantée': 'prazer (fem.)',
  'm\'appelle': 'me chamo',
  's\'appelle': 'se chama',
  'antoine': 'Antoine',
  'claire': 'Claire',
  'serre': 'aperta',
  'serre la main': 'apertar a mão',
  'plaisir': 'prazer',
  'parlons': 'falamos',
  'tout': 'tudo',
  'lui': 'lhe',
  'demande': 'pergunto',
  'échangez': 'trocar',
  'échangeons': 'trocamos',
  'numéros': 'números',
  'numéro': 'número',
  'accepte': 'aceita',
  'avant': 'antes',
  'partir': 'partir',
  'revoir': 'rever',
  'bientôt': 'logo',
  'prochain': 'próximo',
  'propose': 'proponho',
  'pharmacie': 'farmácia',
  'depuis': 'desde / há',
  'fièvre': 'febre',
  'tête': 'cabeça',
  'décide': 'decido',
  'quartier': 'bairro',
  'pharmacienne': 'farmacêutica',
  'accueille': 'acolhe',
  'explique': 'explico',
  'symptômes': 'sintomas',
  'détail': 'detalhe',
  'recommande': 'recomenda',
  'paracétamol': 'paracetamol',
  'douleur': 'dor',
  'conseils': 'conselhos',
  'conseil': 'conselho',
  'reposer': 'descansar',
  'dois': 'devo',
  'comprimé': 'comprimido',
  'trois': 'três',
  'note': 'anota',
  'instructions': 'instruções',
  'boîte': 'caixa',
  'paie': 'pago',
  'huit': 'oito',
  'caisse': 'caixa',
  'sortir': 'sair',
  'souhaite': 'deseja',
  'bonne': 'boa',
  'guérison': 'cura',
  'rentre': 'volto',
  'chez': 'em casa de',
  'moi': 'eu',
  'soulagé': 'aliviado',
  'confiant': 'confiante',
  'décide': 'decido',
  'aller': 'ir',
  'avion': 'avião',
  'arrivons': 'chegamos',
  'allons': 'vamos',
  'prenons': 'pegamos',
  'montrer': 'mostrar',
  'montrer': 'mostrar',
  'donne': 'dá',
  'clés': 'chaves',
  'clé': 'chave',
  'notre': 'nosso',
  'petite': 'pequena',
  'petit': 'pequeno',
  'confortable': 'confortável',
  'sortons': 'saímos',
  'promener': 'passear',
  'bâtiments': 'prédios',
  'bâtiment': 'prédio',
  'anciens': 'antigos',
  'ancien': 'antigo',
  'beaux': 'belos',
  'beau': 'belo',
  'achetons': 'compramos',
  'rapide': 'rápido',
  'bondé': 'lotado',
  'loin': 'longe',
  'voyons': 'vemos',
  'brille': 'brilha',
  'asseyons-nous': 'sentamos',
  'boire': 'beber',
  'serveur': 'garçom',
  'tard': 'tarde',
  'retournons': 'voltamos',
  'fatigués': 'cansados',
  'contents': 'contentes',
  'content': 'contente',
  'allerons': 'iremos',
  'tôt': 'cedo',
  'coloré': 'colorido',
  'beaucoup': 'muito',
  'boulangère': 'padeira',
  'mer': 'mar',
  'souhaite': 'deseja'
}

/* ── State ── */
const viewMode = ref('narrative') // 'narrative' | 'phrases'
const activeStoryId = ref(stories[0].id)
const activePhraseIndex = ref(0)
const selectedWord = ref(null)
const popoverAnchor = ref(null)
const popoverPosition = ref({ top: 0, left: 0 })

const activeStory = computed(
  () => stories.find((s) => s.id === activeStoryId.value) || stories[0]
)
const activePhrase = computed(
  () => activeStory.value.phrases[activePhraseIndex.value]
)

const currentIllustration = computed(() => {
  const id = activePhrase.value?.sceneId
  return id && scenes[id] ? scenes[id] : null
})

const heroIllustration = computed(() => {
  const id = activeStory.value?.heroId
  return id && scenes[id] ? scenes[id] : null
})

const totalPhrases = computed(() => activeStory.value.phrases.length)
const narrativeWordCount = computed(() =>
  activeStory.value.narrative.split(/\s+/).length
)

/* ── Tokenize ── */
function tokenize(text) {
  return text.split(/(\s+)/).filter((t) => t.trim().length > 0)
}

function normalizeWord(raw) {
  return raw.replace(/^[^\p{L}']+|[^\p{L}']+$/gu, '').toLowerCase()
}

function lookupWord(raw) {
  const lower = raw.toLowerCase()
  if (wordDict[lower]) return wordDict[lower]
  const norm = normalizeWord(raw)
  if (wordDict[norm]) return wordDict[norm]
  if (norm.includes('\'')) {
    const parts = norm.split('\'')
    if (parts.length === 2) {
      const joined = parts[0] + '\'' + parts[1]
      if (wordDict[joined]) return wordDict[joined]
      const merged = parts[0] + parts[1]
      if (wordDict[merged]) return wordDict[merged]
    }
  }
  return null
}

/* ── Click handlers ── */
function selectWord(event, token) {
  const translation = lookupWord(token)
  selectedWord.value = {
    token,
    translation,
    phraseFr: activePhrase ? activePhrase.fr : activeStory.value.narrative,
    phrasePt: activePhrase ? activePhrase.pt : null
  }
  const rect = event.currentTarget.getBoundingClientRect()
  const popW = 280
  const popH = 150
  let left = rect.left + rect.width / 2 - popW / 2 + window.scrollX
  let top = rect.top - popH - 10 + window.scrollY
  if (left < 8) left = 8
  if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8
  if (top < 8) top = rect.bottom + 10 + window.scrollY
  popoverPosition.value = { top, left }
}

function closeWord() {
  selectedWord.value = null
}

/* ── Navigation ── */
function pickStory(id) {
  activeStoryId.value = id
  activePhraseIndex.value = 0
  closeWord()
}

function nextPhrase() {
  if (activePhraseIndex.value < activeStory.value.phrases.length - 1) {
    activePhraseIndex.value++
    closeWord()
  }
}

function prevPhrase() {
  if (activePhraseIndex.value > 0) {
    activePhraseIndex.value--
    closeWord()
  }
}

function setMode(mode) {
  viewMode.value = mode
  closeWord()
}

function onDocClick(e) {
  if (!selectedWord.value) return
  if (popoverAnchor.value && popoverAnchor.value.contains(e.target)) return
  closeWord()
}
function onDocKey(e) {
  if (e.key === 'Escape') closeWord()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onDocKey)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onDocKey)
})
</script>

<template>
  <div class="st">
    <header class="st__head">
      <div class="st__title-block">
        <span class="st__eyebrow">HISTÓRIAS EM FRASES</span>
        <h1 class="st__title">Aprenda francês com pequenas histórias</h1>
        <p class="st__sub">
          Leia a história completa em parágrafos ou explore frase por frase.
          Clique em qualquer palavra para ver sua tradução dentro do contexto.
        </p>
      </div>
      <div class="st__mode" role="tablist" aria-label="Modo de leitura">
        <button
          type="button"
          role="tab"
          class="st__mode-btn"
          :class="{ 'is-active': viewMode === 'narrative' }"
          :aria-selected="viewMode === 'narrative'"
          @click="setMode('narrative')"
        >
          <AppIcon name="book" :size="14" />
          História completa
        </button>
        <button
          type="button"
          role="tab"
          class="st__mode-btn"
          :class="{ 'is-active': viewMode === 'phrases' }"
          :aria-selected="viewMode === 'phrases'"
          @click="setMode('phrases')"
        >
          <AppIcon name="layers" :size="14" />
          Frase por frase
        </button>
      </div>
    </header>

    <nav class="st__stories" aria-label="Histórias disponíveis">
      <button
        v-for="s in stories"
        :key="s.id"
        type="button"
        class="st__story-chip"
        :class="{ 'is-active': activeStoryId === s.id }"
        @click="pickStory(s.id)"
      >
        <span class="st__story-cover" aria-hidden="true">{{ s.cover }}</span>
        <span class="st__story-text">
          <strong>{{ s.title }}</strong>
          <small>{{ s.subtitle }} · {{ s.phrases.length }} cenas</small>
        </span>
      </button>
    </nav>

    <!-- ─── NARRATIVE MODE ─── -->
    <section v-if="viewMode === 'narrative'" class="st__narrative card">
      <div class="st__narrative-hero" v-html="heroIllustration" aria-hidden="true"></div>

      <div class="st__narrative-body">
        <div class="st__narrative-meta">
          <span class="st__narrative-eyebrow">{{ activeStory.subtitle }}</span>
          <h2 class="st__narrative-title">{{ activeStory.title }}</h2>
          <span class="st__narrative-stats">
            <AppIcon name="book" :size="11" />
            {{ narrativeWordCount }} palavras · parágrafo único
          </span>
        </div>

        <p class="st__narrative-text">
          <template v-for="(token, ti) in tokenize(activeStory.narrative)" :key="ti">
            <button
              v-if="token.trim().length > 0"
              type="button"
              class="st__word st__word--inline"
              :class="{ 'is-selected': selectedWord && selectedWord.token === token }"
              @click.stop="selectWord($event, token)"
            >{{ token }}</button>
            <span v-else class="st__word-space">{{ token }}</span>
          </template>
        </p>

        <div class="st__vocab">
          <h3 class="st__vocab-title">
            <AppIcon name="sparkles" :size="14" />
            Vocabulário-chave
          </h3>
          <div class="st__vocab-grid">
            <button
              v-for="(v, vi) in activeStory.vocabulary"
              :key="vi"
              type="button"
              class="st__vocab-card"
              @click.stop="selectWord($event, v.fr)"
              :title="`${v.fr} — ${v.pt}`"
            >
              <strong>{{ v.fr }}</strong>
              <small>{{ v.pt }}</small>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── PHRASE-BY-PHRASE MODE ─── -->
    <section v-else class="st__scene card">
      <div class="st__scene-illu" aria-hidden="true" v-html="currentIllustration"></div>

      <div class="st__scene-body">
        <div class="st__scene-meta">
          <span class="st__scene-title">{{ activeStory.title }}</span>
          <span class="st__scene-counter">
            {{ activePhraseIndex + 1 }} / {{ totalPhrases }}
          </span>
        </div>
        <p class="st__scene-context">Cena {{ activePhraseIndex + 1 }}</p>

        <div class="st__frase">
          <button
            v-for="(token, ti) in tokenize(activePhrase.fr)"
            :key="ti"
            type="button"
            class="st__word"
            :class="{ 'is-selected': selectedWord && selectedWord.token === token }"
            @click.stop="selectWord($event, token)"
          >
            {{ token }}
          </button>
        </div>

        <p class="st__scene-translation">
          <AppIcon name="info" :size="13" />
          <span>{{ activePhrase.pt }}</span>
        </p>

        <div class="st__scene-nav">
          <button
            type="button"
            class="st__nav-btn"
            :disabled="activePhraseIndex === 0"
            @click="prevPhrase"
          >
            <AppIcon name="arrow" :size="14" style="transform: rotate(180deg)" />
            Anterior
          </button>
          <button
            type="button"
            class="st__nav-btn st__nav-btn--primary"
            :disabled="activePhraseIndex === totalPhrases - 1"
            @click="nextPhrase"
          >
            Próxima
            <AppIcon name="arrow" :size="14" />
          </button>
        </div>
      </div>
    </section>

    <div v-if="viewMode === 'phrases'" class="st__progress">
      <div
        v-for="(_, idx) in activeStory.phrases"
        :key="idx"
        class="st__progress-dot"
        :class="{
          'is-current': idx === activePhraseIndex,
          'is-done': idx < activePhraseIndex
        }"
        @click="activePhraseIndex = idx; closeWord()"
        role="button"
        :aria-label="`Ir para cena ${idx + 1}`"
      ></div>
    </div>

    <Transition name="st-pop">
      <div
        v-if="selectedWord"
        ref="popoverAnchor"
        class="st__popover"
        :style="{
          top: popoverPosition.top + 'px',
          left: popoverPosition.left + 'px'
        }"
        @click.stop
      >
        <header class="st__popover-head">
          <strong class="st__popover-word">{{ selectedWord.token }}</strong>
          <button
            type="button"
            class="st__popover-close"
            aria-label="Fechar"
            @click="closeWord"
          >
            <AppIcon name="cross" :size="12" />
          </button>
        </header>
        <p v-if="selectedWord.translation" class="st__popover-translation">
          {{ selectedWord.translation }}
        </p>
        <p v-else class="st__popover-translation st__popover-translation--missing">
          Tradução não cadastrada — tente outra palavra.
        </p>
        <p v-if="selectedWord.phrasePt" class="st__popover-pt">
          <small>Frase completa:</small>
          {{ selectedWord.phrasePt }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.st {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-body);
}

.st__head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.st__eyebrow { display: inline-block; font-family: var(--font-nav); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--color-primary); text-transform: uppercase; margin-bottom: 6px; }
.st__title { font-family: var(--font-display); font-size: 26px; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 6px; color: var(--text-primary); }
.st__sub { margin: 0; font-size: 13px; color: var(--text-muted); max-width: 560px; line-height: 1.5; }

.st__mode {
  display: inline-flex;
  padding: 4px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  border-radius: 999px;
  gap: 2px;
  flex-shrink: 0;
}
.st__mode-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  background: transparent;
  transition: background var(--motion-fast), color var(--motion-fast), box-shadow var(--motion-fast);
  cursor: pointer;
}
.st__mode-btn:hover:not(.is-active) { color: var(--text-primary); }
.st__mode-btn.is-active {
  background: var(--surface-card);
  color: var(--color-primary);
  box-shadow: var(--shadow-xs);
}

.st__stories { display: flex; gap: 10px; flex-wrap: wrap; }

.st__story-chip {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 14px 8px 8px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast), transform var(--motion-fast);
}
.st__story-chip:hover { background: var(--color-primary-softer); border-color: var(--color-primary-soft); }
.st__story-chip.is-active { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
.st__story-chip.is-active small { color: rgba(255, 255, 255, 0.85); }

.st__story-cover {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-primary-softer);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
}
.st__story-chip.is-active .st__story-cover { background: rgba(255, 255, 255, 0.2); }

.st__story-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.2; }
.st__story-text strong { font-size: 13px; font-weight: 700; }
.st__story-text small { font-size: 11px; font-weight: 500; color: var(--text-muted); }

/* ── Narrative mode ── */
.st__narrative {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 0;
  padding: 0;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.st__narrative-hero {
  position: relative;
  background: var(--color-primary-softer);
  min-height: 280px;
}
.st__narrative-hero :deep(svg) {
  width: 100%; height: 100%; display: block;
}

.st__narrative-body {
  padding: 28px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.st__narrative-meta { display: flex; flex-direction: column; gap: 4px; }
.st__narrative-eyebrow {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
  text-transform: uppercase;
}
.st__narrative-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
  color: var(--text-primary);
}
.st__narrative-stats {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  margin-top: 4px;
}

.st__narrative-text {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.85;
  color: var(--text-primary);
  letter-spacing: -0.005em;
  padding: 20px 22px;
  background: var(--surface-sunken);
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
  text-align: justify;
  hyphens: auto;
}

.st__word-space { white-space: pre; }

.st__vocab {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 6px;
  border-top: 1px dashed var(--border-soft);
}
.st__vocab-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin: 0;
}
.st__vocab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
}
.st__vocab-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 10px 12px;
  background: var(--color-primary-softer);
  border: 1px solid var(--color-primary-soft);
  border-radius: 10px;
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast), transform var(--motion-fast), border-color var(--motion-fast);
}
.st__vocab-card:hover {
  background: var(--color-primary-soft);
  transform: translateY(-1px);
  border-color: var(--color-primary);
}
.st__vocab-card strong {
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}
.st__vocab-card small {
  font-size: 11px;
  color: var(--text-muted);
  line-height: 1.3;
}

/* ── Phrase-by-phrase mode ── */
.st__scene {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  padding: 24px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}

.st__scene-illu {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-primary-softer);
  box-shadow: var(--shadow-sm);
}
.st__scene-illu :deep(svg) { width: 100%; height: 100%; display: block; }

.st__scene-body { display: flex; flex-direction: column; gap: 14px; min-width: 0; }

.st__scene-meta { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.st__scene-title { font-family: var(--font-nav); font-size: 14px; font-weight: 700; color: var(--color-primary); letter-spacing: 0.04em; text-transform: uppercase; }
.st__scene-counter { font-family: var(--font-nav); font-size: 12px; font-weight: 700; color: var(--text-muted); background: var(--surface-sunken); padding: 3px 10px; border-radius: 999px; }
.st__scene-context { margin: 0; font-size: 13px; color: var(--text-secondary); font-style: italic; line-height: 1.5; }

.st__frase {
  display: flex; flex-wrap: wrap; gap: 4px 6px;
  padding: 16px 18px;
  background: var(--surface-sunken);
  border: 1px dashed var(--border-default);
  border-radius: var(--radius-md);
  line-height: 1.7;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
}

.st__word {
  font-family: inherit; font-size: inherit; font-weight: inherit;
  color: var(--text-primary);
  padding: 2px 6px;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast);
  line-height: 1.4;
  display: inline;
}
.st__word:hover { background: var(--color-primary-soft); color: var(--color-primary-deep); }
.st__word.is-selected { background: var(--color-primary); color: #fff; }
.st__word--inline { display: inline-block; }

.st__scene-translation {
  display: flex; gap: 8px; align-items: flex-start;
  margin: 0;
  padding: 12px 14px;
  background: var(--color-primary-softer);
  border: 1px dashed var(--color-primary-soft);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.st__scene-translation :deep(svg) { margin-top: 2px; flex-shrink: 0; color: var(--color-primary); }

.st__scene-nav { display: flex; justify-content: space-between; gap: 10px; margin-top: 4px; }

.st__nav-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 700;
  background: var(--surface-sunken);
  color: var(--text-secondary);
  transition: background var(--motion-fast), color var(--motion-fast), transform var(--motion-fast);
}
.st__nav-btn:not(:disabled):hover { background: var(--color-primary-soft); color: var(--color-primary-deep); }
.st__nav-btn--primary { background: var(--color-primary); color: #fff; }
.st__nav-btn--primary:not(:disabled):hover { background: var(--color-primary-hover, #2566eb); transform: translateY(-1px); }

.st__progress { display: flex; gap: 6px; align-self: center; }
.st__progress-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--border-default);
  transition: background var(--motion-fast), transform var(--motion-fast);
  cursor: pointer;
}
.st__progress-dot.is-done { background: var(--color-primary); }
.st__progress-dot.is-current { background: var(--color-primary); transform: scale(1.4); box-shadow: 0 0 0 4px var(--color-primary-soft); }

.st__popover {
  position: absolute;
  width: 280px;
  max-width: calc(100vw - 16px);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 12px 14px;
  z-index: 80;
  font-size: 13px;
}
.st__popover::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-top-color: var(--surface-card);
  margin-top: -1px;
  filter: drop-shadow(0 4px 2px rgba(15, 23, 42, 0.06));
}

.st__popover-head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 6px; }
.st__popover-word { font-family: var(--font-nav); font-size: 14px; font-weight: 700; color: var(--color-primary); }
.st__popover-close {
  width: 22px; height: 22px;
  border-radius: 6px;
  background: transparent;
  color: var(--text-faint);
  display: inline-flex; align-items: center; justify-content: center;
}
.st__popover-close:hover { background: var(--color-primary-soft); color: var(--color-primary); }

.st__popover-translation { margin: 0 0 6px; color: var(--text-primary); font-weight: 600; }
.st__popover-translation--missing { font-style: italic; font-weight: 500; color: var(--text-muted); }
.st__popover-pt { margin: 0; padding-top: 6px; border-top: 1px dashed var(--border-soft); font-size: 12px; color: var(--text-secondary); line-height: 1.5; }
.st__popover-pt small { display: block; font-family: var(--font-nav); font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 2px; }

.st-pop-enter-active, .st-pop-leave-active { transition: opacity 0.16s ease, transform 0.16s cubic-bezier(0.16, 1, 0.3, 1); }
.st-pop-enter-from, .st-pop-leave-to { opacity: 0; transform: translateY(6px) scale(0.96); }

@media (max-width: 880px) {
  .st__narrative { grid-template-columns: 1fr; }
  .st__narrative-hero { aspect-ratio: 16/9; }
  .st__narrative-text { font-size: 16px; }
}
@media (max-width: 720px) {
  .st__scene { grid-template-columns: 1fr; }
  .st__scene-illu { max-width: 280px; }
  .st__frase { font-size: 16px; }
}
</style>