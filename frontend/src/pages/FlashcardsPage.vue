<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useFavoritesStore } from '@/stores/library'
import { useToastStore } from '@/stores/toast'

const favorites = useFavoritesStore()
const toast = useToastStore()

const defaultDeck = [
  {
    frText: 'Bonjour',
    ptText: 'Olá / Bom dia',
    phonetic: 'bõ.ʒuʁ',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Sempre cumprimente ao entrar em qualquer estabelecimento na França.'
  },
  {
    frText: 'Oui',
    ptText: 'Sim',
    phonetic: 'wi',
    category: 'Básico',
    difficulty: 1,
    tip: '"Si" existe mas é raro. Use "oui" sempre.'
  },
  {
    frText: 'Non',
    ptText: 'Não',
    phonetic: 'nõ',
    category: 'Básico',
    difficulty: 1,
    tip: 'Pronuncie o "n" nasal final bem.'
  },
  {
    frText: 'Merci',
    ptText: 'Obrigado',
    phonetic: 'mɛʁ.si',
    category: 'Cortesia',
    difficulty: 1,
    tip: '"Merci beaucoup" soa mais forte. Com desconhecidos, use-o sempre.'
  },
  {
    frText: 'Au revoir',
    ptText: 'Até logo / Tchau',
    phonetic: 'o.ʁə.vwaʁ',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Use para despedida formal. Com amigos prefira "salut" ou "ciao".'
  },
  {
    frText: 'Oui / Non',
    ptText: 'Sim / Não',
    phonetic: 'wi / nõ',
    category: 'Básico',
    difficulty: 1,
    tip: 'Sempre honesto: não use "si".'
  },
  {
    frText: "S'il vous plaît",
    ptText: 'Por favor (formal)',
    phonetic: 'sil vu plɛ',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Use com desconhecidos. Com amigos e família, diga "s\'il te plaît".'
  },
  {
    frText: 'Excusez-moi',
    ptText: 'Com licença / Desculpe',
    phonetic: 'ɛks.ky.ze.mwa',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Use para chamar atenção, atravessar em uma mesa ou pedir ajuda.'
  },
  {
    frText: 'Enchanté',
    ptText: 'Prazer em conhecê-lo',
    phonetic: 'ɑ̃.ʃɑ̃.te',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Responda "Enchanté" (masculino) ou "Enchantée" (feminino).'
  },
  {
    frText: 'Comment ça va ?',
    ptText: 'Como vai ?',
    phonetic: 'kɔ.mɑ̃ sa va',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Responda com "ça va bien" (tudo bem) ou "ça va" (mais informal).'
  },
  {
    frText: 'Où sont les toilettes ?',
    ptText: 'Onde fica o banheiro ?',
    phonetic: 'u sõ lɛ twa.lɛt',
    category: 'Viagem',
    difficulty: 2,
    tip: 'Sempre perguntar, nunca ir direto — boas maneiras francesas.'
  },
  {
    frText: "C'est combien ?",
    ptText: 'Quanto é ?',
    phonetic: 'sɛ kɔ̃.bjɛ̃',
    category: 'Compras',
    difficulty: 2,
    tip: 'Universal: mercado, restaurante, loja.'
  },
  {
    frText: 'Je voudrais',
    ptText: 'Eu gostaria / Eu queria',
    phonetic: 'ʒə vu.dʁɛ',
    category: 'Restaurante',
    difficulty: 3,
    tip: 'Use para pedir educadamente em cafés e lojas.'
  },
  {
    frText: 'Je ne comprends pas',
    ptText: 'Eu não entendo',
    phonetic: 'ʒə n(ə) kɔ̃.pʁɑ̃ pa',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Sempre honesto e educado pedir para repetir.'
  },
  {
    frText: "L'addition, s'il vous plaît",
    ptText: 'A conta, por favor',
    phonetic: 'la.di.sjõ sil vu plɛ',
    category: 'Restaurante',
    difficulty: 3,
    tip: 'Forma educada para pedir a conta no restaurante.'
  },
  {
    frText: 'Comment allez-vous ?',
    ptText: 'Como vai você ? (formal)',
    phonetic: 'kɔ.mɑ̃ ta.le vu',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Forma educada; use "tu" só com amigos próximos.'
  },
  {
    frText: 'Je voudrais un café, s\'il vous plaît',
    ptText: 'Eu queria um café, por favor',
    phonetic: 'ʒə vu.dʁɛ œ̃ kafe sil vu plɛ',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Estrutura completa de pedido formal com substantivo.'
  },
  {
    frText: "Qu'est-ce que c'est ?",
    ptText: 'O que é isso ?',
    phonetic: 'kɛs.kə sɛ',
    category: 'Viagem',
    difficulty: 4,
    tip: 'Expressão-chave para apontar objetos desconhecidos.'
  },
  {
    frText: 'Je voudrais réserver une table pour deux',
    ptText: 'Eu gostaria de reservar uma mesa para dois',
    phonetic: 'ʒə vu.dʁɛ ʁe.zɛʁ.ve yn tabl puʁ dø',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Reservas em restaurante: nome + data + nº de pessoas.'
  },
  {
    frText: 'Salut !',
    ptText: 'Oi ! (informal)',
    phonetic: 'sa.ly',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Use com amigos. Equivalente a "oi" ou "e aí".'
  },
  {
    frText: 'Coucou !',
    ptText: 'Oi ! (entre amigos próximos)',
    phonetic: 'ku.ku',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Informal e carinhoso, só entre íntimos.'
  },
  {
    frText: 'À bientôt',
    ptText: 'Até logo',
    phonetic: 'a bjɛ̃.to',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Use quando não sabe se vai ver a pessoa em breve.'
  },
  {
    frText: 'À demain',
    ptText: 'Até amanhã',
    phonetic: 'a d(ə).mɛ̃',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Literalmente "até amanhã" — despedida formal ou amigável.'
  },
  {
    frText: 'Bonne nuit',
    ptText: 'Boa noite',
    phonetic: 'bɔn nɥi',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Use apenas para despedida à noite ou antes de dormir.'
  },
  {
    frText: 'Bonne journée',
    ptText: 'Tenha um bom dia',
    phonetic: 'bɔn ʒuʁ.ne',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Despedida durante o dia, equivale a "tenha um ótimo dia".'
  },
  {
    frText: 'Bienvenue',
    ptText: 'Bem-vindo(a)',
    phonetic: 'bɛ̃.və.ny',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Usado em hotéis, lojas, sites — equivalente a "seja bem-vindo".'
  },
  {
    frText: 'Félicitations',
    ptText: 'Parabéns',
    phonetic: 'fe.li.si.ta.sjɔ̃',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Use em aniversários, promoções, nascimentos.'
  },
  {
    frText: 'Bon anniversaire',
    ptText: 'Feliz aniversário',
    phonetic: 'bɔ̃ a.ni.vɛʁ.sɛʁ',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Canção universal francesa.'
  },
  {
    frText: 'Bonne chance',
    ptText: 'Boa sorte',
    phonetic: 'bɔn ʃɑ̃s',
    category: 'Cortesia',
    difficulty: 2,
    tip: '"Merde" é informal e muito comum, mas evite em contextos formais.'
  },
  {
    frText: 'De rien',
    ptText: 'De nada',
    phonetic: 'də ʁjɛ̃',
    category: 'Cortesia',
    difficulty: 1,
    tip: 'Resposta padrão a "merci".'
  },
  {
    frText: "Il n'y a pas de quoi",
    ptText: 'Não há de quê',
    phonetic: 'il nja pa d(ə) kwa',
    category: 'Cortesia',
    difficulty: 3,
    tip: 'Resposta educada e formal a "merci".'
  },
  {
    frText: 'Avec plaisir',
    ptText: 'Com prazer',
    phonetic: 'a.vɛk plɛ.ziʁ',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Resposta calorosa a "merci", equivale a "com todo prazer".'
  },
  {
    frText: 'Je vous en prie',
    ptText: 'Eu o(a) rogo (formal)',
    phonetic: 'ʒə vu zɑ̃ pʁi',
    category: 'Cortesia',
    difficulty: 3,
    tip: 'Resposta muito formal a "merci".'
  },
  {
    frText: 'Pardon',
    ptText: 'Desculpe',
    phonetic: 'paʁ.dɔ̃',
    category: 'Cortesia',
    difficulty: 1,
    tip: 'Para pedir desculpa por algo menor ou repetição.'
  },
  {
    frText: 'Je suis désolé',
    ptText: 'Eu estou desculpado',
    phonetic: 'ʒə sɥi de.zɔ.le',
    category: 'Cortesia',
    difficulty: 3,
    tip: 'Use para desculpas mais formais ou mais fortes.'
  },
  {
    frText: 'De rien, mon ami',
    ptText: 'De nada, meu amigo',
    phonetic: 'də ʁjɛ̃, mɔ̃ na.mi',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Tom amigável e caloroso — "mon ami" é usado com frequência.'
  },
  {
    frText: 'Madame, Monsieur',
    ptText: 'Senhora, Senhor',
    phonetic: 'ma.dam, mə.sjø',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Forma educada para iniciar conversa ou chamar alguém.'
  },
  {
    frText: 'Bonjour, ça va ?',
    ptText: 'Olá, tudo bem ?',
    phonetic: 'bɔ̃.ʒuʁ, sa va',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Saudação + pergunta pelo estado. Resposta típica: "ça va bien".'
  },
  {
    frText: 'Ça va bien, merci',
    ptText: 'Tudo bem, obrigado',
    phonetic: 'sa va bjɛ̃, mɛʁ.si',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Resposta padrão e educada a "ça va".'
  },
  {
    frText: 'Très bien, et toi ?',
    ptText: 'Muito bem, e você ?',
    phonetic: 'tʁe bjɛ̃, e twa',
    category: 'Conversa',
    difficulty: 3,
    tip: '"Toi" (você) só com pessoas íntimas. Use "vous" com estranhos.'
  },
  {
    frText: "Comment tu t'appelles ?",
    ptText: 'Como você se chama ?',
    phonetic: 'kɔ.mɑ̃ ty ta.pɛl',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Forma informal. Use "vous" com estranhos.'
  },
  {
    frText: 'Quel est ton nom ?',
    ptText: 'Qual é o seu nome ?',
    phonetic: 'kɛl e tɔ̃ nɔ̃',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Use quando precisar do nome completo de alguém.'
  },
  {
    frText: 'Enchanté, je suis...',
    ptText: 'Prazer, eu sou...',
    phonetic: 'ɑ̃.ʃɑ̃.te, ʒə sɥi',
    category: 'Apresentação',
    difficulty: 2,
    tip: 'Forma clássica de se apresentar formalmente.'
  },
  {
    frText: "Tu es d'où ?",
    ptText: 'De onde você é ?',
    phonetic: 'ty e du',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Informal. Pergunta comum ao conhecer alguém.'
  },
  {
    frText: "Qu'habitez-vous ?",
    ptText: 'Onde você mora ? (formal)',
    phonetic: 'a.bi.te vu',
    category: 'Conversa',
    difficulty: 4,
    tip: 'Forma formal e respeitosa. Com amigos use "tu habites où".'
  },
  {
    frText: 'Je comprends',
    ptText: 'Eu entendo',
    phonetic: 'ʒə kɔ̃.pʁɑ̃',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Use quando entender o que foi dito.'
  },
  {
    frText: 'Je ne sais pas',
    ptText: 'Eu não sei',
    phonetic: 'ʒə n(ə) sɛ pa',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Use quando não souber a resposta.'
  },
  {
    frText: 'Oui, bien sûr',
    ptText: 'Sim, claro',
    phonetic: 'wi, bjɛ̃ sɥʁ',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Forma educada de confirmar.'
  },
  {
    frText: 'Pas du tout',
    ptText: 'De nada / Nem um pouco',
    phonetic: 'pa dy tu',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Resposta educada a um pedido de desculpas ou a uma opinião negativa.'
  },
  {
    frText: 'Je suis perdu(e)',
    ptText: 'Eu estou perdido(a)',
    phonetic: 'ʒə sɥi pɛʁ.dy',
    category: 'Viagem',
    difficulty: 3,
    tip: 'Use para pedir ajuda quando estiver desorientado.'
  },
  {
    frText: "Pouvez-vous m'aider ?",
    ptText: 'Você pode me ajudar ?',
    phonetic: 'pu.ve vu mɛ.de',
    category: 'Viagem',
    difficulty: 3,
    tip: 'Forma educada de pedir ajuda a um desconhecido.'
  },
  {
    frText: "Où est l'hôpital ?",
    ptText: 'Onde fica o hospital ?',
    phonetic: 'u ɛ lɔ.pi.tal',
    category: 'Emergência',
    difficulty: 3,
    tip: 'Use em emergências médicas.'
  },
  {
    frText: 'Appelez une ambulance',
    ptText: 'Chame uma ambulância',
    phonetic: 'a.pə.le yn ɑ̃.by.lɑ̃s',
    category: 'Emergência',
    difficulty: 3,
    tip: 'Em emergências graves. Seja direto e claro.'
  },
  {
    frText: 'Au secours !',
    ptText: 'Socorro !',
    phonetic: 'o sə.kuʁ',
    category: 'Emergência',
    difficulty: 2,
    tip: 'Grito clássico de socorro. Use apenas em emergências reais.'
  },
  {
    frText: "Aidez-moi !",
    ptText: 'Me ajude !',
    phonetic: 'ɛ.de.mwa',
    category: 'Emergência',
    difficulty: 2,
    tip: 'Chamado universal de ajuda.'
  },
  {
    frText: 'Quel est le prix ?',
    ptText: 'Qual é o preço ?',
    phonetic: 'kɛl e lə pʁi',
    category: 'Compras',
    difficulty: 2,
    tip: 'Use em lojas, mercados, restaurantes.'
  },
  {
    frText: 'Je peux essayer ?',
    ptText: 'Posso experimentar ?',
    phonetic: 'ʒə pø e.sɛ.je',
    category: 'Compras',
    difficulty: 3,
    tip: 'Use em provadores de roupas.'
  },
  {
    frText: 'Je cherche...',
    ptText: 'Eu procuro / Estou procurando...',
    phonetic: 'ʒə ʃɛʁʃ',
    category: 'Compras',
    difficulty: 2,
    tip: 'Use em lojas: "Je cherche un pull" (procuro uma blusa).'
  },
  {
    frText: 'Où est le marché ?',
    ptText: 'Onde fica o mercado ?',
    phonetic: 'u ɛ lə maʁ.ʃe',
    category: 'Viagem',
    difficulty: 2,
    tip: 'Mercados de bairro são típicos e animados.'
  },
  {
    frText: "C'est ici",
    ptText: 'É aqui',
    phonetic: 'sɛ.t‿i.si',
    category: 'Viagem',
    difficulty: 2,
    tip: 'Resposta curta para "où est..." quando perto.'
  },
  {
    frText: "C'est loin ?",
    ptText: 'É longe ?',
    phonetic: 'sɛ lwɛ̃',
    category: 'Viagem',
    difficulty: 2,
    tip: 'Use para perguntar distância antes de ir a pé.'
  },
  {
    frText: "C'est tout près",
    ptText: 'É bem perto',
    phonetic: 'sɛ tu pʁɛ',
    category: 'Viagem',
    difficulty: 3,
    tip: 'Resposta curta para "c\'est loin?" — andando em 5 min.'
  },
  {
    frText: 'Merci quand même',
    ptText: 'Obrigado mesmo assim',
    phonetic: 'mɛʁ.si kɑ̃.t‿ɛm',
    category: 'Cortesia',
    difficulty: 3,
    tip: 'Use quando alguém tentou ajudar mas não conseguiu.'
  },
  {
    frText: 'Ça ne fait rien',
    ptText: 'Não tem problema',
    phonetic: 'sa n(ə) fɛ ʁjɛ̃',
    category: 'Cortesia',
    difficulty: 3,
    tip: 'Use quando algo deu errado mas não é grave.'
  },
  {
    frText: 'Bon appétit',
    ptText: 'Bom apetite',
    phonetic: 'bɔ.na.pe.ti',
    category: 'Restaurante',
    difficulty: 2,
    tip: 'Diz-se antes ou durante uma refeição.'
  },
  {
    frText: "L'eau, s'il vous plaît",
    ptText: 'A água, por favor',
    phonetic: 'lo, sil vu plɛ',
    category: 'Restaurante',
    difficulty: 2,
    tip: 'Em restaurantes, água = "une carafe d\'eau" (grátis).'
  },
  {
    frText: "Je n'ai pas faim",
    ptText: 'Eu não tenho fome',
    phonetic: 'ʒə nɛ pa fɛ̃',
    category: 'Restaurante',
    difficulty: 3,
    tip: 'Use para recusar comer em algum momento.'
  },
  {
    frText: "J'ai faim",
    ptText: 'Estou com fome',
    phonetic: 'ʒɛ fɛ̃',
    category: 'Sentimentos',
    difficulty: 1,
    tip: 'Expressão básica para dizer fome.'
  },
  {
    frText: "J'ai soif",
    ptText: 'Estou com sede',
    phonetic: 'ʒɛ swaf',
    category: 'Sentimentos',
    difficulty: 2,
    tip: 'Use para pedir água ou bebida.'
  },
  {
    frText: 'Je suis fatigué',
    ptText: 'Estou cansado',
    phonetic: 'ʒə sɥi fa.ti.ʒe',
    category: 'Sentimentos',
    difficulty: 3,
    tip: 'Use após um dia longo. Com amigos use "fati­gué".'
  },
  {
    frText: 'Je suis content',
    ptText: 'Estou feliz',
    phonetic: 'ʒə sɥi kɔ̃.tɑ̃',
    category: 'Sentimentos',
    difficulty: 3,
    tip: 'Expressão básica. "Très content" = muito feliz.'
  },
  {
    frText: 'Ça me fait plaisir',
    ptText: 'Isso me dá prazer',
    phonetic: 'sa mə fɛ plɛ.ziʁ',
    category: 'Sentimentos',
    difficulty: 3,
    tip: 'Resposta calorosa a um elogio ou gentileza.'
  },
  {
    frText: 'Quelle heure est-il ?',
    ptText: 'Que horas são ?',
    phonetic: 'kɛ.l‿œʁ ɛ.til',
    category: 'Tempo',
    difficulty: 3,
    tip: 'Use para perguntar as horas. Resposta: "Il est [hora]".'
  },
  {
    frText: 'Quel jour sommes-nous ?',
    ptText: 'Que dia é hoje ?',
    phonetic: 'kɛl ʒuʁ sɔm.nu',
    category: 'Tempo',
    difficulty: 4,
    tip: 'Pergunta formal para confirmar a data.'
  },
  {
    frText: 'Quel temps fait-il ?',
    ptText: 'Como está o tempo ?',
    phonetic: 'kɛl tɑ̃ fɛ.til',
    category: 'Tempo',
    difficulty: 3,
    tip: 'Pergunta padrão sobre o clima. Resposta: "Il fait beau/froid/chaud".'
  },
  {
    frText: 'Il fait beau',
    ptText: 'Está fazendo bom tempo',
    phonetic: 'il fɛ bo',
    category: 'Tempo',
    difficulty: 2,
    tip: 'Sobre clima: sol, sem chuva. "Beau temps".'
  },
  {
    frText: 'Il pleut',
    ptText: 'Está chovendo',
    phonetic: 'il plø',
    category: 'Tempo',
    difficulty: 2,
    tip: 'Verbo "pleuvoir" conjugado em "il".'
  },
  {
    frText: 'Ma famille',
    ptText: 'Minha família',
    phonetic: 'ma fa.mij',
    category: 'Família',
    difficulty: 2,
    tip: 'Apresentar a família: "ma mère" (mãe), "mon père" (pai), "mon fils" (filho).'
  },
  {
    frText: 'Je suis marié',
    ptText: 'Eu sou casado',
    phonetic: 'ʒə sɥi ma.ʁje',
    category: 'Família',
    difficulty: 3,
    tip: 'Adicione "(e)" para forma feminina: "je suis mariée".'
  },
  {
    frText: "J'ai des enfants",
    ptText: 'Eu tenho filhos',
    phonetic: 'ʒe de.z‿ɑ̃.fɑ̃',
    category: 'Família',
    difficulty: 3,
    tip: 'Use com estado civil. Alternativa: "J\'ai deux enfants" (Eu tenho dois filhos).'
  },
  {
    frText: 'Où travaillez-vous ?',
    ptText: 'Onde você trabalha ?',
    phonetic: 'u tʁa.va.je vu',
    category: 'Trabalho',
    difficulty: 4,
    tip: 'Pergunta comum em entrevistas ou em pequenos-talks.'
  },
  {
    frText: 'Je travaille dans...',
    ptText: 'Eu trabalho em...',
    phonetic: 'ʒə tʁa.vaj dɑ̃',
    category: 'Trabalho',
    difficulty: 3,
    tip: 'Use para descrever seu trabalho: "Je travaille dans la tech".'
  },
  {
    frText: 'Quel est votre métier ?',
    ptText: 'Qual é a sua profissão ?',
    phonetic: 'kɛl e vɔ.tʁə me.tje',
    category: 'Trabalho',
    difficulty: 4,
    tip: 'Formal e educado. Com amigos: "Tu fais quoi comme boulot?".'
  },
  {
    frText: "Je cherche un emploi",
    ptText: 'Estou procurando emprego',
    phonetic: 'ʒə ʃɛʁʃ œ̃.n‿ɑ̃.plwa',
    category: 'Trabalho',
    difficulty: 4,
    tip: 'Use em entrevistas ou fóruns de emprego em francês.'
  },
  {
    frText: 'Bon voyage',
    ptText: 'Boa viagem',
    phonetic: 'bɔ̃ vwa.jaʒ',
    category: 'Viagem',
    difficulty: 1,
    tip: 'Adeus caloroso a quem vai viajar.'
  },
  {
    frText: 'Bonne route',
    ptText: 'Boa estrada',
    phonetic: 'bɔn ʁut',
    category: 'Viagem',
    difficulty: 2,
    tip: 'Adeus a quem vai dirigir ou pegar uma estrada.'
  },
  {
    frText: 'Bon courage',
    ptText: 'Boa coragem / Coragem !',
    phonetic: 'bɔ̃ ku.ʁaʒ',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Use para confortar alguém em situação difícil.'
  },
  {
    frText: 'Bon week-end',
    ptText: 'Bom fim de semana',
    phonetic: 'bɔ̃ wi.kɛnd',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Saudação comum na sexta à tarde.'
  },
  {
    frText: 'Bon rétablissement',
    ptText: 'Boa recuperação',
    phonetic: 'bɔ̃ ʁe.ta.bli.sə.mɑ̃',
    category: 'Cumprimentos',
    difficulty: 4,
    tip: 'Desejo de melhoras após uma doença ou cirurgia.'
  },
  {
    frText: 'Joyeux Noël',
    ptText: 'Feliz Natal',
    phonetic: 'ʒwa.jø nɔ.ɛl',
    category: 'Cumprimentos',
    difficulty: 3,
    tip: 'Dizemos "Joyeux Noël" na França — diferente de Portugal/Brasil.'
  },
  {
    frText: 'Bonne année',
    ptText: 'Feliz Ano Novo',
    phonetic: 'bɔ.na.ne',
    category: 'Cumprimentos',
    difficulty: 2,
    tip: 'Felicitação de ano novo, antes de 31 de dezembro.'
  },
  {
    frText: 'Joyeuse Saint-Valentin',
    ptText: 'Feliz Dia dos Namorados',
    phonetic: 'ʒwa.jøz sɛ̃ va.lɑ̃.tɛ̃',
    category: 'Cumprimentos',
    difficulty: 4,
    tip: 'Dia 14 de fevereiro na França. Use feminina para presente.'
  },
  {
    frText: 'À table !',
    ptText: 'À mesa !',
    phonetic: 'a tabl',
    category: 'Restaurante',
    difficulty: 2,
    tip: 'Convite familiar para sentar e comer.'
  },
  {
    frText: 'Santé !',
    ptText: 'Saúde ! (brinde)',
    phonetic: 'sɑ̃.te',
    category: 'Cortesia',
    difficulty: 1,
    tip: 'O brinde universal francês — equivalente a "tim-tim".'
  },
  {
    frText: 'À ta santé !',
    ptText: 'À sua saúde ! (informal)',
    phonetic: 'a ta sɑ̃.te',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Resposta ao brinde em ambiente informal.'
  },
  {
    frText: 'À votre santé !',
    ptText: 'À sua saúde ! (formal)',
    phonetic: 'a vɔ.tʁə sɑ̃.te',
    category: 'Cortesia',
    difficulty: 2,
    tip: 'Versão formal do brinde, com "você" (vous).'
  }
]

const sessionDeck = ref([])
const deck = computed(() => sessionDeck.value)
const currentDifficulty = ref(2) // 1-4 (fácil → expert)
const direction = ref(0) // -2..+2 (bias para baixo = mais fácil, +2 = mais difícil)
const catalogVisible = ref(false)

function toggleCatalog() {
  catalogVisible.value = !catalogVisible.value
}

function formatPhoneticBR(ipa) {
  if (!ipa) return []
  const map = {
    'ɑ̃': 'AN',
    'ã': 'AN',
    'ɛ̃': 'EN',
    'ẽ': 'EN',
    'ɔ̃': 'ON',
    'õ': 'ON',
    'œ̃': 'UN',
    'ũ': 'UN',
    'ĩ': 'IN',
    'ɥ': 'ü',
    'ŋ': 'NG',
    'ɲ': 'NH',
    'ʒ': 'J',
    'ʃ': 'CH',
    'ʁ': 'R',
    'ø': 'ö',
    'œ': 'ö',
    'ɔ': 'ó',
    'ɛ': 'é',
    'ə': 'e',
    'ː': '',
    'ˈ': '',
    'ˌ': '',
    '‿': '',
    '̃': ''
  }
  let s = ipa
  for (const [k, v] of Object.entries(map)) {
    s = s.split(k).join(v)
  }
  return s
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => ({
      syllables: word.split(/[\.\-·]+/).filter(Boolean)
    }))
    .filter((w) => w.syllables.length)
}

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Bias adaptativo:
// - taxa de acerto ≥ 75% → dificuldade sobe (cards mais difíceis)
// - taxa de acerto ≤ 40% → dificuldade desce (cards mais fáceis)
// - no meio → fica na média
function calculateBias() {
  const a = stats.value.again || 0
  const h = stats.value.hard || 0
  const g = stats.value.good || 0
  const e = stats.value.easy || 0
  const total = a + h + g + e
  if (total < 3) return 0

  const successRate = (g + e) / total
  if (successRate >= 0.85) return 2
  if (successRate >= 0.7) return 1
  if (successRate <= 0.35) return -2
  if (successRate <= 0.5) return -1
  return 0
}

function getSourcePool() {
  const pool = []
  if (favorites.items.length >= 3) {
    for (const f of favorites.items) {
      pool.push({
        frText: f.frText,
        ptText: f.ptText || '',
        phonetic: f.phonetic || '',
        category: f.category || 'Favorito',
        difficulty: f.difficulty || 2
      })
    }
  }
  for (const d of defaultDeck) {
    if (!pool.find((p) => p.frText.toLowerCase() === d.frText.toLowerCase())) {
      pool.push({ ...d })
    }
  }
  return pool
}

function adaptiveDeck(pool, target) {
  const buckets = { 1: [], 2: [], 3: [], 4: [] }
  for (const card of pool) {
    const d = Math.max(1, Math.min(4, card.difficulty || 2))
    buckets[d].push(card)
  }

  // ordem preferencial: target, ±1, ±2 (para variação)
  const result = []
  while (result.length < 12) {
    let picked = null
    for (const offset of [0, -1, 1, -2, 2]) {
      const tryDiff = target + offset
      if (tryDiff < 1 || tryDiff > 4) continue
      const bucket = buckets[tryDiff]
      if (bucket && bucket.length) {
        const idx = Math.floor(Math.random() * bucket.length)
        picked = bucket.splice(idx, 1)[0]
        break
      }
    }
    if (!picked) {
      // fallback: pega qualquer carta restante
      const remaining = Object.values(buckets).flat()
      if (!remaining.length) break
      picked = remaining.splice(
        Math.floor(Math.random() * remaining.length),
        1
      )[0]
    }
    if (!picked) break
    result.push(picked)
  }

  // Shuffle final para não vir em ordem de dificuldade
  return shuffleArray(result)
}

function buildDeck() {
  const pool = getSourcePool()
  if (pool.length === 0) {
    sessionDeck.value = []
    return
  }

  direction.value = calculateBias()
  currentDifficulty.value = Math.max(1, Math.min(4, 2 + direction.value))
  sessionDeck.value = adaptiveDeck(pool, currentDifficulty.value)
}

function pickNextAdaptiveCard() {
  if (deck.value.length === 0) return null
  // pega o próximo do deck atual (já vem pré-ordenado)
  return deck.value[cardIndex.value]
}

function adjustDifficultyAfterRate(level) {
  // ajuste contínuo: cada rate empurra o bias
  const a = stats.value.again || 0
  const h = stats.value.hard || 0
  const g = stats.value.good || 0
  const e = stats.value.easy || 0
  const total = a + h + g + e
  if (total < 4) return // acumula dados suficientes primeiro

  const successRate = (g + e) / total
  // recalcula bias, e se a dificuldade atual não bate, realinha o deck restante
  const newBias =
    successRate >= 0.85 ? 2 :
    successRate >= 0.7 ? 1 :
    successRate <= 0.35 ? -2 :
    successRate <= 0.5 ? -1 :
    0

  const newTarget = Math.max(1, Math.min(4, 2 + newBias))
  if (
    newTarget !== currentDifficulty.value &&
    cardIndex.value + 1 < deck.value.length
  ) {
    // reordena cartas restantes para a nova dificuldade alvo
    const remaining = deck.value.slice(cardIndex.value + 1)
    const sorted = adaptiveDeck(remaining, newTarget)
    sessionDeck.value = [
      ...deck.value.slice(0, cardIndex.value + 1),
      ...sorted
    ]
    currentDifficulty.value = newTarget
    direction.value = newBias
  } else {
    currentDifficulty.value = newTarget
    direction.value = newBias
  }
}

const cardIndex = ref(0)
const flipped = ref(false)
const done = ref(false)
const transitioning = ref(false)

const stats = ref({ again: 0, hard: 0, good: 0, easy: 0 })

const currentCard = computed(() => deck.value[cardIndex.value] || {})

const cardPhoneticWords = computed(() => {
  return formatPhoneticBR(currentCard.value?.phonetic || '')
})

const cardPhoneticFlow = computed(() => {
  return cardPhoneticWords.value.map((w) => w.syllables.join('-')).join(' · ')
})
const progress = computed(() => {
  if (deck.value.length === 0) return 0
  return Math.round(((cardIndex.value + 1) / deck.value.length) * 100)
})
const totalDone = computed(() => stats.value.again + stats.value.hard + stats.value.good + stats.value.easy)

const sourceLabel = computed(() => {
  if (favorites.items.length >= 3) return 'Seus favoritos + frases essenciais'
  return 'Baralho essencial'
})

const difficultyLabel = computed(() => {
  const labels = { 1: 'Iniciante', 2: 'Básico', 3: 'Intermediário', 4: 'Avançado' }
  return labels[currentDifficulty.value] || 'Básico'
})

const trendInfo = computed(() => {
  if (totalDone.value < 3) return { icon: '•', text: 'Calibrando…', color: '#94a3b8' }
  if (direction.value >= 1)
    return { icon: '↗', text: 'Subindo dificuldade', color: '#3b82f6' }
  if (direction.value <= -1)
    return { icon: '↘', text: 'Facilitando', color: '#f97315' }
  return { icon: '→', text: 'Dificuldade estável', color: '#10b981' }
})

const difficultyDots = computed(() => {
  // mostra 4 bolinhas: a atual preenchida
  return [1, 2, 3, 4].map((d) => ({
    level: d,
    active: d === currentDifficulty.value,
    reached: d <= currentDifficulty.value && direction.value >= 0
  }))
})

const defaultCardCount = computed(() => defaultDeck.length)
const defaultByLevel = computed(() => {
  const acc = { 1: 0, 2: 0, 3: 0, 4: 0 }
  for (const c of defaultDeck) {
    const d = Math.max(1, Math.min(4, c.difficulty || 2))
    acc[d] = (acc[d] || 0) + 1
  }
  return acc
})
const defaultByCategory = computed(() => {
  const acc = {}
  for (const c of defaultDeck) {
    const cat = c.category || 'Outros'
    acc[cat] = (acc[cat] || 0) + 1
  }
  return Object.entries(acc)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
})
const myFavoritesCount = computed(() => favorites.items.length)
const totalAccessible = computed(
  () => defaultCardCount.value + myFavoritesCount.value
)

function flipCard() {
  if (transitioning.value || done.value) return
  flipped.value = !flipped.value
}

function rate(level) {
  if (transitioning.value) return
  stats.value[level] = (stats.value[level] || 0) + 1
  transitioning.value = true
  flipped.value = false
  setTimeout(() => {
    if (cardIndex.value + 1 >= deck.value.length) {
      done.value = true
    } else {
      cardIndex.value++
      adjustDifficultyAfterRate(level)
    }
    transitioning.value = false
  }, 220)
}

function restart() {
  stats.value = { again: 0, hard: 0, good: 0, easy: 0 }
  cardIndex.value = 0
  flipped.value = false
  done.value = false
  buildDeck()
  toast.info('Novo baralho embaralhado e adaptado', { duration: 1500 })
}

onMounted(() => {
  buildDeck()
})
</script>

<template>
  <div class="fc">
    <header class="fc__head">
      <div>
        <span class="fc__eyebrow">FLASHCARDS</span>
        <h1 class="fc__title">Domine o Francês</h1>
        <p class="fc__sub">
          Toque para revelar a resposta. Avalie sua memória para escolher o próximo intervalo.
        </p>
      </div>
      <div class="fc__progress-card">
        <div class="fc__progress-meta">
          <strong>{{ cardIndex + 1 }}<span>/{{ deck.length }}</span></strong>
          <span class="fc__progress-source">{{ sourceLabel }}</span>
        </div>
        <div class="fc__bar">
          <span class="fc__bar-fill" :style="{ width: progress + '%' }"></span>
        </div>
        <div class="fc__adaptive">
          <div class="fc__adaptive-row">
            <span class="fc__adaptive-label" :style="{ color: trendInfo.color }">
              {{ trendInfo.icon }} {{ trendInfo.text }}
            </span>
            <div class="fc__diff-dots" :title="`Nível: ${difficultyLabel}`">
              <span
                v-for="dot in difficultyDots"
                :key="dot.level"
                class="fc__diff-dot"
                :class="{
                  'is-active': dot.active,
                  'is-reached': dot.reached
                }"
              />
            </div>
          </div>
          <span class="fc__diff-name">{{ difficultyLabel }}</span>
        </div>
      </div>
    </header>

    <!-- Toggle do catálogo -->
    <div class="fc__catalog-toggle-row">
      <button
        type="button"
        class="fc__catalog-toggle"
        @click="toggleCatalog"
        :aria-expanded="catalogVisible"
      >
        <AppIcon :name="catalogVisible ? 'cross' : 'book'" :size="14" />
        {{ catalogVisible ? 'Ocultar catálogo' : 'Mostrar catálogo' }}
        <span class="fc__catalog-toggle-badge">{{ defaultCardCount }}</span>
      </button>
      <small class="muted">Toque para ver quantas palavras estão no sistema.</small>
    </div>

    <!-- Catálogo do sistema -->
    <Transition name="fc-cat">
      <section v-if="catalogVisible" class="fc__catalog">
        <div class="fc__catalog-main">
          <div class="fc__catalog-icon">
            <AppIcon name="book" :size="22" />
          </div>
          <div class="fc__catalog-info">
            <span class="fc__catalog-eyebrow">CATÁLOGO DO SISTEMA</span>
            <div class="fc__catalog-stats">
              <strong class="fc__catalog-number">{{ defaultCardCount }}</strong>
              <span class="fc__catalog-label">
                palavras/frases prontas para estudar
                <span v-if="myFavoritesCount > 0" class="fc__catalog-extra">
                  + {{ myFavoritesCount }} dos seus favoritos
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="fc__catalog-levels">
          <div
            v-for="(count, lvl) in defaultByLevel"
            :key="lvl"
            class="fc__catalog-level"
            :class="`fc__catalog-level--${lvl}`"
          >
            <span class="fc__catalog-level-n">{{ count }}</span>
            <span class="fc__catalog-level-l">N{{ lvl }}</span>
          </div>
        </div>

        <div class="fc__catalog-categories">
          <span
            v-for="[cat, count] in defaultByCategory"
            :key="cat"
            class="fc__catalog-chip"
          >
            {{ cat }}<span>{{ count }}</span>
          </span>
        </div>
      </section>
    </Transition>

    <!-- Card -->
    <section class="fc__stage" v-if="!done && currentCard.frText">
      <button
        type="button"
        class="fc__card"
        :class="{ 'is-flipped': flipped, 'is-loading': transitioning }"
        @click="flipCard"
        :aria-label="flipped ? 'Mostrar pergunta' : 'Mostrar resposta'"
      >
        <span class="fc__card-face fc__card-face--front">
          <span class="fc__card-eyebrow">
            FRANÇAIS
            <span
              v-if="currentCard.difficulty"
              class="fc__diff-badge"
              :class="`fc__diff-badge--${currentCard.difficulty}`"
              :title="`Nível ${currentCard.difficulty}/4`"
            >N{{ currentCard.difficulty }}</span>
          </span>
          <h2 class="fc__fr">{{ currentCard.frText }}</h2>
          <span v-if="currentCard.category" class="fc__tag">
            {{ currentCard.category }}
          </span>
          <span class="fc__tap-hint">
            <AppIcon name="info" :size="14" />
            toque para revelar
          </span>
        </span>

        <span class="fc__card-face fc__card-face--back">
          <span class="fc__card-eyebrow fc__card-eyebrow--alt">
            RESPOSTA
            <span
              v-if="currentCard.difficulty"
              class="fc__diff-badge"
              :class="`fc__diff-badge--${currentCard.difficulty}`"
            >N{{ currentCard.difficulty }}</span>
          </span>
          <div class="fc__back-fr">
            <span class="fc__lang-tag">FR</span>
            <strong>{{ currentCard.frText }}</strong>
          </div>
          <div v-if="currentCard.phonetic" class="fc__phonetic-block">
            <div class="fc__phonetic-head">
              <span class="fc__phonetic-label">🇧🇷 PRONÚNCIA</span>
              <span class="fc__phonetic-hint">tônicas em destaque</span>
            </div>
            <div class="fc__phonetic-syllables">
              <span
                v-for="(word, wi) in cardPhoneticWords"
                :key="wi"
                class="fc__phonetic-word"
              >
                <span
                  v-for="(syl, si) in word.syllables"
                  :key="si"
                  :class="[
                    'fc__syl',
                    { 'is-stressed': si === word.syllables.length - 1 }
                  ]"
                >{{ syl }}</span>
              </span>
            </div>
            <p v-if="cardPhoneticFlow" class="fc__phonetic-flow">
              <span class="fc__phonetic-flow-label">leitura:</span>
              {{ cardPhoneticFlow }}
            </p>
          </div>
          <hr class="fc__back-hr" />
          <div class="fc__back-pt">
            <span class="fc__lang-tag fc__lang-tag--pt">PT</span>
            <span>{{ currentCard.ptText }}</span>
          </div>
          <p v-if="currentCard.tip" class="fc__back-tip">
            <AppIcon name="info" :size="13" />
            {{ currentCard.tip }}
          </p>
        </span>
      </button>
    </section>

    <!-- Done screen -->
    <section class="fc__done" v-else>
      <div class="fc__done-icon">
        <AppIcon name="check" :size="48" />
      </div>
      <h2>Sessão concluída!</h2>
      <p>Você revisou {{ totalDone }} carta(s) do seu baralho.</p>

      <div class="fc__done-stats">
        <div class="fc__done-stat fc__done-stat--again">
          <span>{{ stats.again }}</span>
          <small>De novo</small>
        </div>
        <div class="fc__done-stat fc__done-stat--hard">
          <span>{{ stats.hard }}</span>
          <small>Difícil</small>
        </div>
        <div class="fc__done-stat fc__done-stat--good">
          <span>{{ stats.good }}</span>
          <small>Bom</small>
        </div>
        <div class="fc__done-stat fc__done-stat--easy">
          <span>{{ stats.easy }}</span>
          <small>Fácil</small>
        </div>
      </div>

      <button class="btn btn-primary btn--lg" @click="restart">
        <AppIcon name="refresh" :size="16" />
        Embaralhar e recomeçar
      </button>
    </section>

    <!-- Controls: reveal -->
    <div v-if="!done && !flipped" class="fc__controls">
      <button
        class="btn btn-primary btn--lg fc__reveal"
        type="button"
        @click="flipCard"
      >
        <AppIcon name="info" :size="16" />
        Revelar resposta
      </button>
    </div>

    <!-- Controls: rate -->
    <div v-if="!done && flipped" class="fc__controls fc__controls--rate">
      <button class="fc__rate fc__rate--again" type="button" @click="rate('again')">
        <span class="fc__rate-emoji">😣</span>
        <span class="fc__rate-name">De novo</span>
        <span class="fc__rate-hint">em instantes</span>
      </button>
      <button class="fc__rate fc__rate--hard" type="button" @click="rate('hard')">
        <span class="fc__rate-emoji">😐</span>
        <span class="fc__rate-name">Difícil</span>
        <span class="fc__rate-hint">em breve</span>
      </button>
      <button class="fc__rate fc__rate--good" type="button" @click="rate('good')">
        <span class="fc__rate-emoji">🙂</span>
        <span class="fc__rate-name">Bom</span>
        <span class="fc__rate-hint">em 1 dia</span>
      </button>
      <button class="fc__rate fc__rate--easy" type="button" @click="rate('easy')">
        <span class="fc__rate-emoji">😎</span>
        <span class="fc__rate-name">Fácil</span>
        <span class="fc__rate-hint">em 4 dias</span>
      </button>
    </div>

    <!-- Live session stats -->
    <div v-if="!done && totalDone > 0" class="fc__stats">
      <div class="fc__stat fc__stat--again">
        <span>{{ stats.again }}</span>De novo
      </div>
      <div class="fc__stat fc__stat--hard">
        <span>{{ stats.hard }}</span>Difícil
      </div>
      <div class="fc__stat fc__stat--good">
        <span>{{ stats.good }}</span>Bom
      </div>
      <div class="fc__stat fc__stat--easy">
        <span>{{ stats.easy }}</span>Fácil
      </div>
    </div>

    <footer class="fc__footer">
      <span>© 2026 French Succo — Aprenda um card por vez.</span>
      <span class="fc__footer-version">
        v{{ '1.0.0' }}
        <small>· flashcards</small>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.fc {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  max-width: 720px;
  margin: 0 auto;
}

/* ─── Header ─── */
.fc__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  flex-wrap: wrap;
}

.fc__eyebrow {
  display: inline-block;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  padding: 5px 12px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.fc__title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.fc__sub {
  font-size: 14px;
  color: var(--text-muted);
  margin: 0;
  max-width: 380px;
}

.fc__progress-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  min-width: 220px;
  box-shadow: var(--shadow-xs);
}

.fc__progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.fc__progress-meta strong {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--text-primary);
}
.fc__progress-meta strong span {
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 400;
  margin-left: 2px;
}

.fc__progress-source {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.fc__bar {
  height: 6px;
  border-radius: 999px;
  background: var(--surface-sunken);
  overflow: hidden;
}

.fc__bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 999px;
  transition: width 0.4s var(--ease-out);
}

/* ─── Adaptive indicator ─── */
.fc__adaptive {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-soft);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fc__adaptive-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.fc__adaptive-label {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color var(--motion-base);
}

.fc__diff-dots {
  display: inline-flex;
  gap: 4px;
}

.fc__diff-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  transition: background var(--motion-base), transform var(--motion-base);
}

.fc__diff-dot.is-reached {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.fc__diff-dot.is-active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  transform: scale(1.35);
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.18);
}

.fc__diff-name {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  align-self: flex-start;
}

/* Difficulty badges inside cards */
.fc__diff-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.06em;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  margin-left: 8px;
  vertical-align: middle;
}

.fc__diff-badge--1 { background: rgba(34, 197, 94, 0.85); }
.fc__diff-badge--2 { background: rgba(59, 130, 246, 0.85); }
.fc__diff-badge--3 { background: rgba(249, 115, 22, 0.9); }
.fc__diff-badge--4 { background: rgba(220, 38, 38, 0.9); }

.fc__card-eyebrow--alt .fc__diff-badge {
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
}

/* ─── Card ─── */
.fc__stage {
  perspective: 1400px;
  width: 100%;
  height: 380px;
  display: flex;
}

.fc__card {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: transparent;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.fc__card.is-flipped {
  transform: rotateY(180deg);
}

.fc__card.is-loading {
  opacity: 0.85;
  transition: transform 0.4s, opacity 0.2s;
}

.fc__card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px;
  border-radius: 24px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-lg);
  gap: 14px;
}

.fc__card-face--front {
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-deep) 100%);
  color: #fff;
  border-color: transparent;
}

.fc__card-face--back {
  transform: rotateY(180deg);
  text-align: left;
  align-items: stretch;
  justify-content: flex-start;
  background: var(--surface-card);
}

.fc__card-eyebrow {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  padding: 4px 12px;
  border-radius: 999px;
}

.fc__card-eyebrow--alt {
  background: var(--color-primary-softer);
  color: var(--color-primary-deep);
  align-self: flex-start;
}

.fc__fr {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  line-height: 1.1;
  letter-spacing: -0.02em;
  word-break: break-word;
}

.fc__tag {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
}

.fc__tap-hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 0.04em;
  margin-top: 12px;
}

/* ─── Back face ─── */
.fc__back-fr,
.fc__back-pt {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fc__back-fr strong,
.fc__back-pt span:last-child {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.fc__lang-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.fc__lang-tag--pt {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.fc__back-phonetic {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 15px;
  font-style: italic;
  color: var(--text-muted);
  padding: 6px 12px;
  background: var(--surface-sunken);
  border-radius: 8px;
  border: 1px dashed var(--border-soft);
  display: inline-block;
  width: max-content;
}

.fc__back-hr {
  border: none;
  border-top: 1px solid var(--border-soft);
  margin: 4px 0;
}

.fc__back-tip {
  margin: 0;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 12px 14px;
  background: var(--color-tip-bg);
  border: 1px solid var(--color-tip-border);
  border-radius: var(--radius-md);
  font-size: 12px;
  color: var(--color-tip-text);
  line-height: 1.5;
}

.fc__back-tip :deep(svg) {
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ─── Reveal button ─── */
.fc__reveal {
  align-self: center;
}

/* ─── Catalog toggle row ─── */
.fc__catalog-toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.fc__catalog-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
}

.fc__catalog-toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.fc__catalog-toggle-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-size: 11px;
  font-weight: 700;
}

.fc__catalog-toggle:hover .fc__catalog-toggle-badge {
  background: var(--color-primary);
  color: #fff;
}

/* ─── Phonetic block (Brazilian-friendly) ─── */
.fc__phonetic-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  width: 100%;
}

.fc__phonetic-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.fc__phonetic-label {
  color: var(--color-primary);
}

.fc__phonetic-hint {
  color: var(--text-muted);
  text-transform: none;
  letter-spacing: 0;
  font-weight: 500;
  font-size: 10px;
}

.fc__phonetic-syllables {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  max-width: 100%;
}

.fc__phonetic-word {
  display: inline-flex;
  gap: 3px;
}

.fc__syl {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 8px;
  background: var(--surface-sunken);
  color: var(--text-primary);
  font-family: var(--font-nav);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  border: 1px solid var(--border-soft);
}

.fc__syl.is-stressed {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  font-weight: 700;
}

.fc__phonetic-flow {
  margin: 4px 0 0;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.04);
  font-family: var(--font-body);
  font-size: 12px;
  font-style: italic;
  color: var(--text-secondary);
  text-align: center;
  letter-spacing: 0.02em;
}

:root[data-theme='dark'] .fc__phonetic-flow {
  background: rgba(255, 255, 255, 0.05);
}

.fc__phonetic-flow-label {
  font-family: var(--font-nav);
  font-style: normal;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  margin-right: 6px;
}

/* Catalog transition */
.fc-cat-enter-active,
.fc-cat-leave-active {
  transition: opacity 0.22s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fc-cat-enter-from,
.fc-cat-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

/* ─── System catalog card ─── */
.fc__catalog {
  background: linear-gradient(135deg, var(--color-primary-softer) 0%, var(--surface-card) 100%);
  border: 1px solid var(--color-primary-soft);
  border-radius: var(--radius-xl);
  padding: 18px 22px;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  gap: 14px;
  align-items: center;
  box-shadow: var(--shadow-xs);
}

.fc__catalog-main {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.fc__catalog-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-deep));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  flex-shrink: 0;
}

.fc__catalog-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.fc__catalog-eyebrow {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--color-primary);
}

.fc__catalog-stats {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.fc__catalog-number {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  line-height: 1;
}

.fc__catalog-label {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.4;
}

.fc__catalog-extra {
  display: inline-block;
  margin-left: 4px;
  padding: 2px 8px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  font-family: var(--font-nav);
  font-weight: 700;
  font-size: 11px;
  border-radius: 999px;
}

.fc__catalog-levels {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  gap: 8px;
  align-items: center;
}

.fc__catalog-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  border-radius: var(--radius-md);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  min-width: 52px;
}

.fc__catalog-level-n {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.fc__catalog-level-l {
  font-family: var(--font-nav);
  font-size: 9px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.fc__catalog-level--1 {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.25);
}
.fc__catalog-level--1 .fc__catalog-level-n {
  color: #16a34a;
}

.fc__catalog-level--2 {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.25);
}
.fc__catalog-level--2 .fc__catalog-level-n {
  color: var(--color-primary);
}

.fc__catalog-level--3 {
  background: rgba(249, 115, 22, 0.1);
  border-color: rgba(249, 115, 22, 0.25);
}
.fc__catalog-level--3 .fc__catalog-level-n {
  color: var(--color-accent);
}

.fc__catalog-level--4 {
  background: rgba(220, 38, 38, 0.1);
  border-color: rgba(220, 38, 38, 0.25);
}
.fc__catalog-level--4 .fc__catalog-level-n {
  color: #dc2626;
}

.fc__catalog-categories {
  grid-column: 1 / -1;
  grid-row: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-soft);
}

.fc__catalog-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-secondary);
}

.fc__catalog-chip span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary-deep);
  font-size: 10px;
}

@media (max-width: 640px) {
  .fc__catalog {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  .fc__catalog-levels {
    grid-column: 1;
    grid-row: 2;
    justify-content: flex-start;
  }
  .fc__catalog-categories {
    grid-row: 3;
  }
  .fc__catalog-number {
    font-size: 30px;
  }
}

/* ─── Rating buttons (Ankidroid-style) ─── */
.fc__controls {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.fc__controls--rate {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

@media (max-width: 600px) {
  .fc__controls--rate {
    grid-template-columns: repeat(2, 1fr);
  }
}

.fc__rate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 8px;
  border-radius: var(--radius-md);
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  font-family: var(--font-nav);
  font-weight: 700;
  color: var(--text-primary);
  cursor: pointer;
  transition: transform var(--motion-fast), box-shadow var(--motion-fast),
    background var(--motion-fast), border-color var(--motion-fast);
  min-height: 92px;
}

.fc__rate-emoji {
  font-size: 26px;
  line-height: 1;
}

.fc__rate-name {
  font-size: 13px;
  color: var(--text-primary);
}

.fc__rate-hint {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.fc__rate:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.fc__rate--again {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}
.fc__rate--again:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}
.fc__rate--again:hover .fc__rate-name,
.fc__rate--again:hover .fc__rate-hint {
  color: #fff;
}

.fc__rate--hard {
  border-color: rgba(249, 115, 22, 0.3);
  background: rgba(249, 115, 22, 0.05);
}
.fc__rate--hard:hover {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}
.fc__rate--hard:hover .fc__rate-name,
.fc__rate--hard:hover .fc__rate-hint {
  color: #fff;
}

.fc__rate--good {
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.06);
}
.fc__rate--good:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}
.fc__rate--good:hover .fc__rate-name,
.fc__rate--good:hover .fc__rate-hint {
  color: #fff;
}

.fc__rate--easy {
  border-color: rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.06);
}
.fc__rate--easy:hover {
  background: var(--color-success);
  color: #fff;
  border-color: var(--color-success);
}
.fc__rate--easy:hover .fc__rate-name,
.fc__rate--easy:hover .fc__rate-hint {
  color: #fff;
}

/* ─── Live session stats ─── */
.fc__stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.fc__stat {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
}

.fc__stat span {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text-primary);
}

.fc__stat--again { border-left: 3px solid #ef4444; }
.fc__stat--hard { border-left: 3px solid var(--color-accent); }
.fc__stat--good { border-left: 3px solid var(--color-primary); }
.fc__stat--easy { border-left: 3px solid var(--color-success); }

/* ─── Done screen ─── */
.fc__done {
  text-align: center;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
}

.fc__done-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--color-success-soft);
  color: var(--color-success-text);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.fc__done h2 {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 0;
  color: var(--text-primary);
}

.fc__done p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}

.fc__done-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  max-width: 480px;
  margin: 12px 0;
}

.fc__done-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 12px 6px;
  border-radius: var(--radius-md);
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
}

.fc__done-stat span {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}
.fc__done-stat small {
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.fc__done-stat--again span { color: #ef4444; }
.fc__done-stat--hard span { color: var(--color-accent); }
.fc__done-stat--good span { color: var(--color-primary); }
.fc__done-stat--easy span { color: var(--color-success); }

/* ─── Footer ─── */
.fc__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 11px;
  color: var(--text-muted);
  padding: 16px 0;
}

.fc__footer-version {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: 999px;
  font-family: var(--font-nav);
  font-weight: 700;
  color: var(--text-primary);
}
.fc__footer-version small {
  font-weight: 600;
  color: var(--text-muted);
}

/* ─── Responsive ─── */
@media (max-width: 540px) {
  .fc {
    gap: 18px;
  }
  .fc__title {
    font-size: 24px;
  }
  .fc__stage {
    height: 320px;
  }
  .fc__fr {
    font-size: 32px;
  }
  .fc__back-fr strong,
  .fc__back-pt span:last-child {
    font-size: 18px;
  }
  .fc__stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .fc__progress-card {
    flex: 1;
    min-width: 0;
  }
}
</style>
