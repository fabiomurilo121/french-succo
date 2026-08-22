<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { useFavoritesStore } from '@/stores/library'
import { useToastStore } from '@/stores/toast'
import { useSettingsStore } from '@/stores/settings'
import { getAudioUrl } from '@/services/audioCache'
import { APP_VERSION } from '@/version'

const favorites = useFavoritesStore()
const toast = useToastStore()
const settings = useSettingsStore()

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
  },
  {
    frText: 'Pouvez-vous m\'aider ?',
    ptText: 'Você pode me ajudar ?',
    phonetic: 'pu.ve vu mɛ.de',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Forma educada e direta de pedir ajuda a um estranho.'
  },
  {
    frText: 'Je ne sais pas',
    ptText: 'Eu não sei',
    phonetic: 'ʒə n(ə) sɛ pa',
    category: 'Conversa',
    difficulty: 1,
    tip: 'Resposta honesta quando não sabe algo — não tenha medo de usar!'
  },
  {
    frText: "Comment dit-on … en français ?",
    ptText: 'Como se diz … em francês ?',
    phonetic: 'kɔ.mɑ̃ di.tɔ̃ … ɑ̃ fʁɑ̃.sɛ',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Frase coringa para pedir a tradução de qualquer palavra.'
  },
  {
    frText: 'Que veut dire ce mot ?',
    ptText: 'O que quer dizer essa palavra ?',
    phonetic: 'kə vø diʁ sə mo',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Use quando vir uma palavra escrita e quiser entender.'
  },
  {
    frText: 'Je m\'appelle …',
    ptText: 'Eu me chamo …',
    phonetic: 'ʒə ma.pɛl …',
    category: 'Apresentação',
    difficulty: 1,
    tip: 'Forma universal de dizer seu nome.'
  },
  {
    frText: 'Enchanté de faire votre connaissance',
    ptText: 'Prazer em conhecê-lo',
    phonetic: 'ɑ̃.ʃɑ̃.te də fɛʁ vɔ.tʁə kɔ.nɛ.sɑ̃s',
    category: 'Apresentação',
    difficulty: 4,
    tip: 'Versão completa e formal — use em reuniões de trabalho.'
  },
  {
    frText: 'Comment vous appelez-vous ?',
    ptText: 'Como você se chama ? (formal)',
    phonetic: 'kɔ.mɑ̃ vu za.ple vu',
    category: 'Apresentação',
    difficulty: 3,
    tip: 'Pergunta educada para alguém mais velho ou desconhecido.'
  },
  {
    frText: 'Tu t\'appelles comment ?',
    ptText: 'Como você se chama ? (informal)',
    phonetic: 'ty ta.pɛl kɔ.mɑ̃',
    category: 'Apresentação',
    difficulty: 2,
    tip: 'Versão informal com "tu". Use com crianças e amigos.'
  },
  {
    frText: 'Voici, c\'est pour vous',
    ptText: 'Aqui está, é para você',
    phonetic: 'vwa.si, sɛ puʁ vu',
    category: 'Apresentação',
    difficulty: 3,
    tip: 'Ao entregar algo para alguém, sempre diga isto.'
  },
  {
    frText: 'Ravi de vous rencontrer',
    ptText: 'Prazer em conhecê-lo',
    phonetic: 'ʁa.vi də vu ʁɑ̃.kɔ̃.tʁe',
    category: 'Apresentação',
    difficulty: 4,
    tip: 'Outra forma elegante — "ravi" é masculino.'
  },
  {
    frText: 'Je viens du Brésil',
    ptText: 'Eu venho do Brasil',
    phonetic: 'ʒə vjɛ̃ dy bʁe.zil',
    category: 'Apresentação',
    difficulty: 2,
    tip: 'Frase-chave ao se apresentar — sempre gera curiosidade!'
  },
  {
    frText: 'Je suis étudiant',
    ptText: 'Eu sou estudante',
    phonetic: 'ʒə sɥi e.ty.djɑ̃',
    category: 'Apresentação',
    difficulty: 1,
    tip: '"étudiante" se você for mulher (pronúncia quase igual).'
  },
  {
    frText: 'Je parle un peu français',
    ptText: 'Eu falo um pouco de francês',
    phonetic: 'ʒə paʁl œ̃ pø fʁɑ̃.sɛ',
    category: 'Apresentação',
    difficulty: 2,
    tip: 'Frase honesta e útil para definir o nível do diálogo.'
  },
  {
    frText: 'Quel âge avez-vous ?',
    ptText: 'Quantos anos você tem ? (formal)',
    phonetic: 'kɛ.laːʒ a.ve vu',
    category: 'Apresentação',
    difficulty: 3,
    tip: 'Pergunta um pouco invasiva — só com pessoas próximas.'
  },
  {
    frText: 'Où habitez-vous ?',
    ptText: 'Onde você mora ?',
    phonetic: 'u a.bi.te vu',
    category: 'Apresentação',
    difficulty: 3,
    tip: 'Use em conversas para conhecer melhor alguém.'
  },
  {
    frText: 'Quel est votre métier ?',
    ptText: 'Qual é a sua profissão ?',
    phonetic: 'kɛ.lɛ vɔ.tʁə me.tje',
    category: 'Apresentação',
    difficulty: 4,
    tip: 'Forma educada de perguntar o trabalho de alguém.'
  },
  {
    frText: 'Je travaille dans …',
    ptText: 'Eu trabalho em …',
    phonetic: 'ʒə tʁa.vaj dɑ̃ …',
    category: 'Trabalho',
    difficulty: 3,
    tip: 'Resposta a "qual é seu trabalho" — complete com a área.'
  },
  {
    frText: 'Mon ami',
    ptText: 'Meu amigo',
    phonetic: 'mɔ̃ na.mi',
    category: 'Família',
    difficulty: 1,
    tip: 'Forma universal e carinhosa de chamar alguém próximo.'
  },
  {
    frText: 'Ma famille',
    ptText: 'Minha família',
    phonetic: 'ma fa.mij',
    category: 'Família',
    difficulty: 1,
    tip: 'Palavra frequente em apresentações pessoais.'
  },
  {
    frText: 'J\'ai deux frères',
    ptText: 'Eu tenho dois irmãos',
    phonetic: 'ʒe dø fʁɛʁ',
    category: 'Família',
    difficulty: 3,
    tip: 'Use para falar da família. "Sœurs" para irmãs.'
  },
  {
    frText: 'Je suis marié',
    ptText: 'Eu sou casado',
    phonetic: 'ʒə sɥi ma.ʁje',
    category: 'Família',
    difficulty: 3,
    tip: '"Mariée" para casada. "Célibataire" para solteiro(a).'
  },
  {
    frText: 'J\'ai un enfant',
    ptText: 'Eu tenho um filho',
    phonetic: 'ʒe œ̃.nɑ̃.fɑ̃',
    category: 'Família',
    difficulty: 2,
    tip: '"Enfants" no plural — pronunciado "ɑ̃fɑ̃".'
  },
  {
    frText: 'Ma femme / Mon mari',
    ptText: 'Minha esposa / Meu marido',
    phonetic: 'ma fam / mɔ̃ ma.ʁi',
    category: 'Família',
    difficulty: 2,
    tip: 'Termos clássicos para cônjuge.'
  },
  {
    frText: 'Mes parents',
    ptText: 'Meus pais',
    phonetic: 'me pa.ʁɑ̃',
    category: 'Família',
    difficulty: 2,
    tip: 'Significa "pais" no sentido familiar (não o verbo parir).'
  },
  {
    frText: 'Quel temps fait-il ?',
    ptText: 'Como está o tempo ?',
    phonetic: 'kɛl tɑ̃ fɛ.til',
    category: 'Tempo',
    difficulty: 3,
    tip: 'Pergunta padrão sobre o clima do dia.'
  },
  {
    frText: 'Il fait beau',
    ptText: 'Está fazendo sol / Está bom tempo',
    phonetic: 'il fɛ bo',
    category: 'Tempo',
    difficulty: 1,
    tip: 'Frase mais comum para descrever um dia bonito.'
  },
  {
    frText: 'Il pleut',
    ptText: 'Está chovendo',
    phonetic: 'il plø',
    category: 'Tempo',
    difficulty: 1,
    tip: 'Verbo "pleuvoir" conjugado na 3ª pessoa.'
  },
  {
    frText: 'Il fait froid',
    ptText: 'Está fazendo frio',
    phonetic: 'il fɛ fʁwa',
    category: 'Tempo',
    difficulty: 1,
    tip: 'Inverno francês — combinação muito frequente!'
  },
  {
    frText: 'Il fait chaud',
    ptText: 'Está fazendo calor',
    phonetic: 'il fɛ ʃo',
    category: 'Tempo',
    difficulty: 1,
    tip: 'Verão francês pode passar de 35°C — diga sempre!'
  },
  {
    frText: 'Il neige',
    ptText: 'Está nevando',
    phonetic: 'il nɛːʒ',
    category: 'Tempo',
    difficulty: 2,
    tip: 'Verbo irregular — memorize logo!'
  },
  {
    frText: 'Il y a du soleil',
    ptText: 'Tem sol',
    phonetic: 'i.lja dy sɔ.lɛj',
    category: 'Tempo',
    difficulty: 2,
    tip: 'Alternativa ao "il fait beau" para falar de sol.'
  },
  {
    frText: 'Le ciel est couvert',
    ptText: 'O céu está nublado',
    phonetic: 'lə sjɛ.l‿ɛ ku.vɛʁ',
    category: 'Tempo',
    difficulty: 4,
    tip: 'Para descrever um dia cinza e sem sol.'
  },
  {
    frText: 'Quelle est la température ?',
    ptText: 'Qual é a temperatura ?',
    phonetic: 'kɛ.l‿ɛ la tɑ̃.pe.ʁa.tyʁ',
    category: 'Tempo',
    difficulty: 4,
    tip: 'Pergunta técnica para saber graus Celsius.'
  },
  {
    frText: 'Où est la gare ?',
    ptText: 'Onde fica a estação ?',
    phonetic: 'u‿ɛ la gaʁ',
    category: 'Direções',
    difficulty: 2,
    tip: '"Gare" pode ser de trem, metrô ou ônibus.'
  },
  {
    frText: 'Où est l\'hôpital ?',
    ptText: 'Onde fica o hospital ?',
    phonetic: 'u‿ɛ lo.pi.tal',
    category: 'Direções',
    difficulty: 3,
    tip: 'Essencial em emergências — memorize!'
  },
  {
    frText: 'Où est la pharmacie ?',
    ptText: 'Onde fica a farmácia ?',
    phonetic: 'u‿ɛ la faʁ.ma.si',
    category: 'Direções',
    difficulty: 3,
    tip: 'Cruze o "s" final — fica mudo na pronúncia.'
  },
  {
    frText: 'Comment aller à … ?',
    ptText: 'Como chegar a … ?',
    phonetic: 'kɔ.mɑ̃ a.le a …',
    category: 'Direções',
    difficulty: 3,
    tip: 'Use com o nome do lugar: "à la Tour Eiffel", "à l\'hôtel".'
  },
  {
    frText: 'C\'est loin ?',
    ptText: 'É longe ?',
    phonetic: 'sɛ lwɛ̃',
    category: 'Direções',
    difficulty: 1,
    tip: 'Pergunta curta e essencial para avaliar o trajeto.'
  },
  {
    frText: 'C\'est à gauche',
    ptText: 'É à esquerda',
    phonetic: 'sɛ.ta goʃ',
    category: 'Direções',
    difficulty: 1,
    tip: 'Oposto de "droite" (direita).'
  },
  {
    frText: 'C\'est à droite',
    ptText: 'É à direita',
    phonetic: 'sɛ.ta dʁwat',
    category: 'Direções',
    difficulty: 1,
    tip: 'Direita em francês — fácil de confundir com "droite" em PT.'
  },
  {
    frText: 'Tout droit',
    ptText: 'Sempre em frente',
    phonetic: 'tu dʁwa',
    category: 'Direções',
    difficulty: 2,
    tip: 'Use quando não precisa dobrar.'
  },
  {
    frText: 'Tournez à gauche',
    ptText: 'Vire à esquerda',
    phonetic: 'tuʁ.ne a goʃ',
    category: 'Direções',
    difficulty: 3,
    tip: 'Imperativo — para pedir uma direção a alguém.'
  },
  {
    frText: 'Je suis perdu',
    ptText: 'Estou perdido',
    phonetic: 'ʒə sɥi pɛʁ.dy',
    category: 'Direções',
    difficulty: 2,
    tip: 'Frasesita útil quando se perde. "Perdue" para feminino.'
  },
  {
    frText: 'Pouvez-vous répéter ?',
    ptText: 'Você pode repetir ?',
    phonetic: 'pu.ve vu ʁe.pe.te',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Use quando não entendeu a primeira vez.'
  },
  {
    frText: 'Parlez plus lentement, s\'il vous plaît',
    ptText: 'Fale mais devagar, por favor',
    phonetic: 'paʁ.le ply lɑ̃t.mɑ̃, sil vu plɛ',
    category: 'Conversa',
    difficulty: 4,
    tip: 'Excelente pedido para melhorar a compreensão oral.'
  },
  {
    frText: 'Qu\'est-ce que vous avez dit ?',
    ptText: 'O que você disse ?',
    phonetic: 'kɛs.kə vu za.v‿di',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Outra forma educada de pedir repetição.'
  },
  {
    frText: 'Comment dit-on … en portugais ?',
    ptText: 'Como se diz … em português ?',
    phonetic: 'kɔ.mɑ̃ di.tɔ̃ … ɑ̃ pɔʁ.ty.gɛ',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Use com nativos franceses para aprender vocabulário novo.'
  },
  {
    frText: 'Je cherche un hôtel',
    ptText: 'Estou procurando um hotel',
    phonetic: 'ʒə ʃɛʁʃ œ̃.n‿o.tɛl',
    category: 'Hotel',
    difficulty: 3,
    tip: 'Frase útil em qualquer cidade turística.'
  },
  {
    frText: 'Avez-vous une chambre libre ?',
    ptText: 'Vocês têm um quarto disponível ?',
    phonetic: 'a.ve vu yn ʃɑ̃bʁ libʁ',
    category: 'Hotel',
    difficulty: 4,
    tip: 'Forma educada de perguntar disponibilidade.'
  },
  {
    frText: 'Je voudrais réserver une chambre',
    ptText: 'Eu gostaria de reservar um quarto',
    phonetic: 'ʒə vu.dʁɛ ʁe.zɛʁ.ve yn ʃɑ̃bʁ',
    category: 'Hotel',
    difficulty: 4,
    tip: 'Use ao ligar para um hotel. "Pour deux nuits" = por duas noites.'
  },
  {
    frText: 'Le petit-déjeuner est inclus ?',
    ptText: 'O café da manhã está incluído ?',
    phonetic: 'lə pə.ti.de.ʒɔ̃.nɛ ɛ.t‿ɛ̃.kly',
    category: 'Hotel',
    difficulty: 4,
    tip: 'Pergunta essencial — quase sempre muda o preço!'
  },
  {
    frText: 'À quelle heure est le check-out ?',
    ptText: 'A que horas é o check-out ?',
    phonetic: 'a kɛ.l‿œʁ ɛ lə tʃɛk.aut',
    category: 'Hotel',
    difficulty: 4,
    tip: 'Anglicismo absorvido pelo francês — todo mundo entende.'
  },
  {
    frText: 'Quel est le prix ?',
    ptText: 'Qual é o preço ?',
    phonetic: 'kɛ.l‿ɛ lə pʁi',
    category: 'Compras',
    difficulty: 1,
    tip: 'Frase universal — funciona em qualquer loja.'
  },
  {
    frText: 'C\'est trop cher',
    ptText: 'Está caro demais',
    phonetic: 'sɛ tʁo ʃɛʁ',
    category: 'Compras',
    difficulty: 2,
    tip: 'Diz com cuidado — pode parecer rude em algumas situações.'
  },
  {
    frText: 'Vous avez une autre taille ?',
    ptText: 'Vocês têm outro tamanho ?',
    phonetic: 'vu za.v‿y.n‿otʁ taj',
    category: 'Compras',
    difficulty: 4,
    tip: 'Use em lojas de roupa: S=P, M=M, L=L, XL=XL.'
  },
  {
    frText: 'Je peux essayer ?',
    ptText: 'Eu posso experimentar ?',
    phonetic: 'ʒə pø e.sɛ.je',
    category: 'Compras',
    difficulty: 3,
    tip: 'Pedir para provar roupa na loja.'
  },
  {
    frText: 'Je prends celui-ci',
    ptText: 'Eu levo este aqui',
    phonetic: 'ʒə pʁɑ̃ sə.lɥi.si',
    category: 'Compras',
    difficulty: 4,
    tip: 'Apontar e decidir — bem comum em feiras e lojas.'
  },
  {
    frText: 'Je paie par carte',
    ptText: 'Eu pago com cartão',
    phonetic: 'ʒə pɛ paʁ kaʁt',
    category: 'Compras',
    difficulty: 2,
    tip: 'Quase toda loja aceita cartão. "En espèces" = em dinheiro.'
  },
  {
    frText: 'Vous acceptez la carte ?',
    ptText: 'Vocês aceitam cartão ?',
    phonetic: 'vu zak.sɛ.pte la kaʁt',
    category: 'Compras',
    difficulty: 3,
    tip: 'Pergunta segura antes de sacar o cartão.'
  },
  {
    frText: 'Avez-vous un sac ?',
    ptText: 'Vocês têm uma sacola ?',
    phonetic: 'a.ve vu œ̃ sak',
    category: 'Compras',
    difficulty: 3,
    tip: 'Na França, sacolas plásticas raramente são grátis.'
  },
  {
    frText: 'La carte, s\'il vous plaît',
    ptText: 'O cardápio, por favor',
    phonetic: 'la kaʁt, sil vu plɛ',
    category: 'Restaurante',
    difficulty: 2,
    tip: '"Carte" em restaurante significa o menu, não cartão.'
  },
  {
    frText: 'Quel est le plat du jour ?',
    ptText: 'Qual é o prato do dia ?',
    phonetic: 'kɛ.l‿ɛ lə pla dy ʒuʁ',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Ótima forma de pedir recomendação ao garçom.'
  },
  {
    frText: 'Je suis végétarien',
    ptText: 'Eu sou vegetariano',
    phonetic: 'ʒə sɥi ve.ʒe.ta.ʁjɛ̃',
    category: 'Restaurante',
    difficulty: 3,
    tip: '"Végétarienne" para feminina. Informa restrições alimentares.'
  },
  {
    frText: 'Je suis allergique aux noix',
    ptText: 'Eu sou alérgico a nozes',
    phonetic: 'ʒə sɥi a.lɛʁ.ʒik o nwa',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Comunique alergias sempre antes de pedir!'
  },
  {
    frText: "C'est délicieux",
    ptText: 'Está delicioso',
    phonetic: 'sɛ de.li.sjø',
    category: 'Restaurante',
    difficulty: 2,
    tip: 'Elogio que todo chef adora ouvir. Use à vontade!'
  },
  {
    frText: 'Je n\'ai plus faim',
    ptText: 'Eu não tenho mais fome',
    phonetic: 'ʒə nɛ ply fɛ̃',
    category: 'Restaurante',
    difficulty: 2,
    tip: 'Use para recusar mais comida educadamente.'
  },
  {
    frText: 'Une carafe d\'eau, s\'il vous plaît',
    ptText: 'Uma jarra de água, por favor',
    phonetic: 'yn ka.ʁaf do, sil vu plɛ',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Em Paris, água da torneira é servida grátis se você pedir!'
  },
  {
    frText: 'Quel est le plat du jour ?',
    ptText: 'Qual é o prato do dia ?',
    phonetic: 'kɛ.l‿ɛ lə pla dy ʒuʁ',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Sempre há uma especialidade — peça recomendação!'
  },
  {
    frText: 'Quel est le meilleur restaurant du quartier ?',
    ptText: 'Qual é o melhor restaurante do bairro ?',
    phonetic: 'kɛ.l‿ɛ lə mɛ.jœʁ ʁɛs.to.ʁɑ̃ dy kaʁ.tje',
    category: 'Restaurante',
    difficulty: 4,
    tip: 'Pergunte a locais — eles sempre têm uma dica boa!'
  },
  {
    frText: 'Quel est le numéro d\'urgence ?',
    ptText: 'Qual é o número de emergência ?',
    phonetic: 'kɛ.l‿ɛ lə ny.me.ʁo dyʁ.ʒɑ̃s',
    category: 'Emergência',
    difficulty: 4,
    tip: 'SAMU = 15, Bombeiros = 18, Polícia = 17, Geral = 112.'
  },
  {
    frText: 'Appelez la police !',
    ptText: 'Chamem a polícia !',
    phonetic: 'a.p(ə).le la pɔ.lis',
    category: 'Emergência',
    difficulty: 2,
    tip: 'Em emergência grave — disque 17 ou 112.'
  },
  {
    frText: 'J\'ai besoin d\'aide',
    ptText: 'Eu preciso de ajuda',
    phonetic: 'ʒe bə.zwɛ̃ dɛd',
    category: 'Emergência',
    difficulty: 2,
    tip: 'Frase crítica — memorize com pronúncia clara.'
  },
  {
    frText: 'Où est l\'hôpital le plus proche ?',
    ptText: 'Onde fica o hospital mais próximo ?',
    phonetic: 'u‿ɛ lo.pi.tal lə ply pʁɔʃ',
    category: 'Emergência',
    difficulty: 4,
    tip: 'Use em caso de acidente ou mal-estar.'
  },
  {
    frText: 'Je me sens mal',
    ptText: 'Eu estou me sentindo mal',
    phonetic: 'ʒə mə sɑ̃ mal',
    category: 'Saúde',
    difficulty: 2,
    tip: 'Para descrever indisposição — use com um farmacêutico.'
  },
  {
    frText: "J'ai mal à la tête",
    ptText: 'Eu tenho dor de cabeça',
    phonetic: 'ʒe ma.la la tɛt',
    category: 'Saúde',
    difficulty: 3,
    tip: 'Frasesita mais comum em farmácias. "Mal au ventre" = barriga.'
  },
  {
    frText: 'Je tousse beaucoup',
    ptText: 'Eu tusso muito',
    phonetic: 'ʒə tus bo.ku',
    category: 'Saúde',
    difficulty: 3,
    tip: 'Informe sintomas com clareza — melhor atendimento!'
  },
  {
    frText: 'Avez-vous quelque chose contre la grippe ?',
    ptText: 'Você tem algo contra gripe ?',
    phonetic: 'a.ve vu kɛl.kə ʃoz kɔ̃.tʁə la gʁip',
    category: 'Saúde',
    difficulty: 4,
    tip: 'Pergunta direta ao farmacêutico — ele pode recomendar.'
  },
  {
    frText: 'Je voudrais prendre rendez-vous',
    ptText: 'Eu gostaria de marcar uma consulta',
    phonetic: 'ʒə vu.dʁɛ pʁɑ̃dʁ ʁɑ̃.de.vu',
    category: 'Saúde',
    difficulty: 4,
    tip: 'Para marcar com médico. Ligue cedo — agendas lotam!'
  },
  {
    frText: 'Je voudrais acheter un billet',
    ptText: 'Eu gostaria de comprar uma passagem',
    phonetic: 'ʒə vu.dʁɛ aʃ(ə).te œ̃ bi.jɛ',
    category: 'Transporte',
    difficulty: 4,
    tip: '"Billet" = passagem/bilhete. Funciona para trem, metrô, avião.'
  },
  {
    frText: 'Un billet aller-retour, s\'il vous plaît',
    ptText: 'Uma passagem de ida e volta, por favor',
    phonetic: 'œ̃ bi.jɛ a.le.ʁə.tuʁ, sil vu plɛ',
    category: 'Transporte',
    difficulty: 4,
    tip: '"Aller simple" = só ida. "Aller-retour" = ida e volta.'
  },
  {
    frText: 'Le train est à l\'heure ?',
    ptText: 'O trem está no horário ?',
    phonetic: 'lə tʁɛ̃ ɛ.ta.lœʁ',
    category: 'Transporte',
    difficulty: 4,
    tip: 'Na França, trens atrasam muito — sempre pergunte!'
  },
  {
    frText: 'À quelle heure part le train ?',
    ptText: 'A que horas parte o trem ?',
    phonetic: 'a kɛ.l‿œʁ paʁ lə tʁɛ̃',
    category: 'Transporte',
    difficulty: 4,
    tip: 'Essencial para não perder o trem na estação.'
  },
  {
    frText: 'Où est l\'arrêt de bus ?',
    ptText: 'Onde fica o ponto de ônibus ?',
    phonetic: 'u‿ɛ la.ʁɛ də bys',
    category: 'Transporte',
    difficulty: 4,
    tip: 'Em cidades pequenas, ônibus é a melhor opção!'
  },
  {
    frText: 'Pouvez-vous m\'emmener à … ?',
    ptText: 'Você pode me levar até … ?',
    phonetic: 'pu.ve vu mɑ̃.mə.ne a …',
    category: 'Transporte',
    difficulty: 4,
    tip: 'Frasesita de táxi. Complete com o endereço de destino.'
  },
  {
    frText: "J'étudie le français",
    ptText: 'Eu estudo francês',
    phonetic: 'ʒe.ty.di lə fʁɑ̃.sɛ',
    category: 'Estudo',
    difficulty: 1,
    tip: 'Frase que abre muitas conversas com nativos!'
  },
  {
    frText: 'J\'apprends le français depuis six mois',
    ptText: 'Eu estudo francês há seis meses',
    phonetic: 'ʒa.pʁɑ̃ lə fʁɑ̃.sɛ də.pɥi sis mwa',
    category: 'Estudo',
    difficulty: 4,
    tip: 'Excelente para descrever seu nível de aprendizado.'
  },
  {
    frText: 'J\'aime beaucoup la musique française',
    ptText: 'Eu gosto muito de música francesa',
    phonetic: 'ʒɛm bo.ku la my.zik fʁɑ̃.sɛz',
    category: 'Estudo',
    difficulty: 3,
    tip: 'Excelente para puxar papo sobre cultura francesa!'
  },
  {
    frText: 'Je voudrais devenir bilingue',
    ptText: 'Eu gostaria de me tornar bilíngue',
    phonetic: 'ʒə vu.dʁɛ də.və.niʁ bi.lɛ̃ɡ',
    category: 'Estudo',
    difficulty: 4,
    tip: 'Compartilhe seu objetivo — nativos adoram ajudar!'
  },
  {
    frText: 'Pouvez-vous parler plus lentement ?',
    ptText: 'Você pode falar mais devagar ?',
    phonetic: 'pu.ve vu paʁ.le ply lɑ̃t.mɑ̃',
    category: 'Estudo',
    difficulty: 4,
    tip: 'Seu melhor amigo quando ouvir francês rápido!'
  },
  {
    frText: "C'est très intéressant",
    ptText: 'É muito interessante',
    phonetic: 'sɛ tʁɛ ɛ̃.te.ʁe.sɑ̃',
    category: 'Conversa',
    difficulty: 2,
    tip: 'Reação educada e útil em qualquer conversa.'
  },
  {
    frText: 'Je ne suis pas d\'accord',
    ptText: 'Eu não concordo',
    phonetic: 'ʒə n(ə) sɥi pa da.kɔʁ',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Discordar educadamente — "je suis d\'accord" = concordo.'
  },
  {
    frText: 'Vous avez raison',
    ptText: 'Você tem razão',
    phonetic: 'vu za.v‿ʁɛ.zɔ̃',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Reconhecer um argumento válido do outro — elegante!'
  },
  {
    frText: 'Je suis désolé, j\'ai oublié',
    ptText: 'Desculpe, eu esqueci',
    phonetic: 'ʒə sɥi de.zɔ.le, ʒe u.bli.je',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Forma completa de pedir desculpas por esquecimento.'
  },
  {
    frText: 'On se voit demain ?',
    ptText: 'A gente se vê amanhã ?',
    phonetic: 'ɔ̃ sə vwa d(ə).mɛ̃',
    category: 'Conversa',
    difficulty: 3,
    tip: 'Combinação de "on" (a gente) + "se voir" (se ver).'
  },
  {
    frText: 'Bonne soirée',
    ptText: 'Boa noite (ao se despedir à noite)',
    phonetic: 'bɔn swa.ʁe',
    category: 'Cumprimentos',
    difficulty: 1,
    tip: 'Use só no fim do dia — depois do pôr do sol.'
  },
  {
    frText: 'Quel beau temps !',
    ptText: 'Que tempo bonito !',
    phonetic: 'kɛl bo tɑ̃',
    category: 'Tempo',
    difficulty: 3,
    tip: 'Exclamação comum em dias ensolarados.'
  },
  {
    frText: 'J\'habite à Paris',
    ptText: 'Eu moro em Paris',
    phonetic: 'ʒa.bit a pa.ʁi',
    category: 'Apresentação',
    difficulty: 1,
    tip: 'Use com qualquer cidade: "à Lyon", "à Marseille".'
  },
  {
    frText: 'Je suis en vacances',
    ptText: 'Eu estou de férias',
    phonetic: 'ʒə sɥi.ɑ̃ va.kɑ̃s',
    category: 'Apresentação',
    difficulty: 2,
    tip: 'Frase simpática — abre portas para dicas locais!'
  },
  {
    frText: 'J\'adore la cuisine française',
    ptText: 'Eu adoro a culinária francesa',
    phonetic: 'ʒa.dɔʁ la kɥi.zin fʁɑ̃.sɛz',
    category: 'Restaurante',
    difficulty: 3,
    tip: 'Sempre elogie a comida local — é regra universal!'
  },
  {
    frText: 'Quel est votre plat préféré ?',
    ptText: 'Qual é o seu prato preferido ?',
    phonetic: 'kɛ.l‿ɛ vɔ.tʁə pla pʁe.fe.ʁe',
    category: 'Conversa',
    difficulty: 4,
    tip: 'Pergunta clássica para puxar conversa em mesas.'
  }
]

const sessionDeck = ref([])
const deck = computed(() => sessionDeck.value)
const currentDifficulty = ref(2) // 1-4 (fácil → expert)
const direction = ref(0) // -2..+2 (bias para baixo = mais fácil, +2 = mais difícil)
const catalogVisible = ref(false)
const selectedLevel = ref(null) // 1, 2, 3 (Fácil, Médio, Difícil) ou null = tela de seleção

const LEVEL_INFO = {
  1: { id: 1, name: 'Fácil', icon: 'sparkles', color: '#22c55e',
       description: 'Palavras curtas, cumprimentos e expressões do dia a dia',
       meta: ['12 cartas / sessão', 'Adaptação automática'] },
  2: { id: 2, name: 'Médio', icon: 'flask', color: '#3b82f6',
       description: 'Frases úteis para viagens, restaurantes e conversas',
       meta: ['12 cartas / sessão', 'Adaptação automática'] },
  3: { id: 3, name: 'Difícil', icon: 'gauge', color: '#f97316',
       description: 'Frases completas e vocabulário avançado',
       meta: ['12 cartas / sessão', 'Adaptação automática'] }
}

// Mapeia os 3 níveis de seleção para os buckets de difficulty internos (1-4):
// Fácil  -> difficulty in {1, 2}
// Médio  -> difficulty in {3}
// Difícil -> difficulty in {4}
const LEVEL_TO_INTERNAL = {
  1: [1, 2],
  2: [3],
  3: [4]
}

function bucketForLevel(level) {
  return LEVEL_TO_INTERNAL[level] || [2]
}

function levelItemsCount(level) {
  const internals = bucketForLevel(level)
  return defaultDeck.filter((c) => internals.includes(c.difficulty || 2)).length
}

function toggleCatalog() {
  catalogVisible.value = !catalogVisible.value
}

function pickLevel(level) {
  selectedLevel.value = level
  direction.value = 0
  currentDifficulty.value = LEVEL_TO_INTERNAL[level][0]
  stats.value = { again: 0, hard: 0, good: 0, easy: 0 }
  cardIndex.value = 0
  flipped.value = false
  done.value = false
  buildDeck()
}

function changeLevel() {
  selectedLevel.value = null
  sessionDeck.value = []
  stats.value = { again: 0, hard: 0, good: 0, easy: 0 }
  cardIndex.value = 0
  flipped.value = false
  done.value = false
  direction.value = 0
  currentDifficulty.value = 2
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

  // Quando o usuário escolheu um nível, o baralho vem só daquele bucket
  // (sem adaptação automática — o nível fica fixo na sessão).
  if (selectedLevel.value !== null) {
    const internals = bucketForLevel(selectedLevel.value)
    const filtered = pool.filter((c) =>
      internals.includes(Math.max(1, Math.min(4, c.difficulty || 2)))
    )
    const target = internals[0]
    sessionDeck.value = adaptiveDeck(
      filtered.length ? filtered : pool,
      target
    )
    currentDifficulty.value = target
    direction.value = 0
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
  // Quando o usuário escolheu um nível fixo, não alteramos a dificuldade.
  if (selectedLevel.value !== null) return

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

const audioEl = ref(null)
const isPlayingAudio = ref(false)

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
  if (selectedLevel.value !== null) {
    const lvl = LEVEL_INFO[selectedLevel.value]
    return `Nível ${lvl.name} · ${favorites.items.length >= 3 ? 'favoritos + essenciais' : 'baralho essencial'}`
  }
  if (favorites.items.length >= 3) return 'Seus favoritos + frases essenciais'
  return 'Baralho essencial'
})

// Mapeia difficulty interno (1-4) -> nível de seleção (1, 2 ou 3)
const currentLevelFromDifficulty = computed(() => {
  const d = currentDifficulty.value
  if (d <= 2) return 1
  if (d === 3) return 2
  return 3
})

const difficultyLabel = computed(() => {
  return LEVEL_INFO[currentLevelFromDifficulty.value]?.name || 'Fácil'
})

const trendInfo = computed(() => {
  if (selectedLevel.value !== null) {
    return { icon: '→', text: 'Nível fixo', color: '#10b981' }
  }
  if (totalDone.value < 3) return { icon: '•', text: 'Calibrando…', color: '#94a3b8' }
  if (direction.value >= 1)
    return { icon: '↗', text: 'Subindo dificuldade', color: '#3b82f6' }
  if (direction.value <= -1)
    return { icon: '↘', text: 'Facilitando', color: '#f97315' }
  return { icon: '→', text: 'Dificuldade estável', color: '#10b981' }
})

// Mostra 3 bolinhas (uma por nível de seleção)
const difficultyDots = computed(() => {
  const activeLevel = currentLevelFromDifficulty.value
  return [1, 2, 3].map((l) => ({
    level: l,
    active: l === activeLevel,
    reached: l <= activeLevel
  }))
})

const defaultCardCount = computed(() => defaultDeck.length)
const defaultByLevel = computed(() => {
  // buckets: 1 = Fácil (1,2), 2 = Médio (3), 3 = Difícil (4)
  const acc = { 1: 0, 2: 0, 3: 0 }
  for (const c of defaultDeck) {
    const d = Math.max(1, Math.min(4, c.difficulty || 2))
    const bucket = d <= 2 ? 1 : d === 3 ? 2 : 3
    acc[bucket] = (acc[bucket] || 0) + 1
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

function voiceOptions() {
  return {
    voice: settings.voice === 'male' ? 'male' : 'female',
    region: settings.region || 'fr',
    speed: settings.speed ?? 1.0
  }
}

function stopCardAudio() {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.currentTime = 0
  }
  isPlayingAudio.value = false
}

function playCardAudio(text) {
  const phrase = (text ?? currentCard.value?.frText ?? '').trim()
  if (!phrase || !audioEl.value) return
  if (isPlayingAudio.value) {
    stopCardAudio()
    return
  }
  try {
    const { url } = getAudioUrl(phrase, voiceOptions())
    audioEl.value.src = url
    audioEl.value.load()
    isPlayingAudio.value = true
    const p = audioEl.value.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        isPlayingAudio.value = false
      })
    }
  } catch (e) {
    isPlayingAudio.value = false
  }
}

function rate(level) {
  if (transitioning.value) return
  stats.value[level] = (stats.value[level] || 0) + 1
  transitioning.value = true
  flipped.value = false
  stopCardAudio()
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
  if (selectedLevel.value !== null) buildDeck()
})

onUnmounted(() => {
  stopCardAudio()
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
          <div class="fc__adaptive-foot">
            <span
              v-if="selectedLevel !== null"
              class="fc__level-badge"
              :style="{
                background: LEVEL_INFO[selectedLevel].color + '22',
                color: LEVEL_INFO[selectedLevel].color,
                borderColor: LEVEL_INFO[selectedLevel].color + '55'
              }"
            >
              <AppIcon :name="LEVEL_INFO[selectedLevel].icon" :size="12" />
              {{ LEVEL_INFO[selectedLevel].name }}
            </span>
            <span v-else class="fc__diff-name">{{ difficultyLabel }}</span>
            <button
              v-if="selectedLevel !== null"
              type="button"
              class="fc__change-level fc__change-level--inline"
              @click="changeLevel"
              :title="`Trocar de ${LEVEL_INFO[selectedLevel].name}`"
            >
              <AppIcon name="refresh" :size="12" />
              Trocar
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Seleção de nível (mesmo padrão da tela inicial do "Completar Frases") -->
    <section v-if="selectedLevel === null" class="fc__levels">
      <div
        v-for="level in [1, 2, 3]"
        :key="level"
        class="fc__level-card card"
        :style="{ '--level-color': LEVEL_INFO[level].color }"
        @click="pickLevel(level)"
      >
        <div class="fc__level-icon">
          <AppIcon :name="LEVEL_INFO[level].icon" :size="32" />
        </div>
        <div class="fc__level-body">
          <div class="fc__level-head">
            <h2 class="fc__level-name">{{ LEVEL_INFO[level].name }}</h2>
            <span class="fc__level-count">
              {{ levelItemsCount(level) }} {{ levelItemsCount(level) === 1 ? 'carta' : 'cartas' }}
            </span>
          </div>
          <p class="fc__level-desc">{{ LEVEL_INFO[level].description }}</p>
          <div class="fc__level-meta">
            <span
              v-for="tag in LEVEL_INFO[level].meta"
              :key="tag"
              class="fc__level-tag"
            >
              {{ tag }}
            </span>
          </div>
          <div class="fc__level-cta">
            <AppIcon name="play" :size="14" />
            <span>Começar</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Conteúdo do jogo (só aparece após escolher nível) -->
    <template v-else>
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
            :style="{ '--lvl-color': LEVEL_INFO[lvl].color }"
          >
            <span class="fc__catalog-level-n">{{ count }}</span>
            <span class="fc__catalog-level-l">
              <AppIcon :name="LEVEL_INFO[lvl].icon" :size="9" />
              {{ LEVEL_INFO[lvl].name }}
            </span>
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
          <div class="fc__front-foot">
            <span v-if="currentCard.category" class="fc__tag">
              {{ currentCard.category }}
            </span>
            <button
              type="button"
              class="fc__speak"
              :class="{ 'is-playing': isPlayingAudio }"
              :aria-label="isPlayingAudio ? 'Parar pronúncia' : 'Ouvir pronúncia'"
              :title="isPlayingAudio ? 'Parar pronúncia' : 'Ouvir pronúncia'"
              @click.stop="playCardAudio()"
            >
              <AppIcon :name="isPlayingAudio ? 'pause' : 'speaker'" :size="16" />
              <span>{{ isPlayingAudio ? 'Parar' : 'Ouvir' }}</span>
            </button>
          </div>
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
            <button
              type="button"
              class="fc__speak fc__speak--inline"
              :class="{ 'is-playing': isPlayingAudio }"
              :aria-label="isPlayingAudio ? 'Parar pronúncia' : 'Ouvir pronúncia'"
              :title="isPlayingAudio ? 'Parar pronúncia' : 'Ouvir pronúncia'"
              @click.stop="playCardAudio()"
            >
              <AppIcon :name="isPlayingAudio ? 'pause' : 'speaker'" :size="14" />
            </button>
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
      <p>
        Você revisou {{ totalDone }} carta(s) do nível
        <strong
          v-if="selectedLevel !== null"
          :style="{ color: LEVEL_INFO[selectedLevel].color }"
        >{{ LEVEL_INFO[selectedLevel].name }}</strong>
        <span v-else>atual</span>.
      </p>

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

      <div class="fc__done-actions">
        <button class="btn btn-primary btn--lg" @click="restart">
          <AppIcon name="refresh" :size="16" />
          Embaralhar e recomeçar
        </button>
        <button class="btn btn-secondary" @click="changeLevel">
          <AppIcon name="layers" :size="16" />
          Trocar nível
        </button>
      </div>
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
    </template>

    <footer class="fc__footer">
      <span>© 2026 French Succo — Aprenda um card por vez.</span>
      <button
        v-if="selectedLevel !== null"
        type="button"
        class="fc__change-level"
        @click="changeLevel"
      >
        <AppIcon name="refresh" :size="13" />
        Trocar nível
      </button>
      <span class="fc__footer-version">
        v{{ APP_VERSION }}
        <small>· flashcards</small>
      </span>
    </footer>

    <audio
      ref="audioEl"
      hidden
      @ended="isPlayingAudio = false"
      @error="isPlayingAudio = false"
      @pause="isPlayingAudio = false"
    ></audio>
  </div>
</template>

<style scoped>
.fc {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--font-body);
  max-width: 960px;
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

@media (max-width: 720px) {
  .fc__head {
    align-items: stretch;
  }
  .fc__progress-card {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
  }
  .fc__sub {
    max-width: none;
  }
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

/* ─── Level selector (mesmo padrão da CompletePage) ─── */
.fc__levels {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-top: 4px;
}

@media (min-width: 600px) {
  .fc__levels {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .fc__levels {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .fc__level-card {
    padding: 18px 20px;
    gap: 12px;
  }
  .fc__level-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
  .fc__level-name {
    font-size: 18px;
  }
  .fc__level-count {
    font-size: 10px;
    padding: 2px 8px;
  }
  .fc__level-cta {
    font-size: 11px;
  }
}

.fc__level-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 24px;
  background: var(--surface-card);
  border: 2px solid var(--border-default);
  border-left: 6px solid var(--level-color);
  border-radius: var(--radius-xl);
  cursor: pointer;
  box-shadow: var(--shadow-xs);
  transition: border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out),
    box-shadow var(--motion-base) var(--ease-out);
  text-align: left;
  --level-color: var(--color-primary);
}

.fc__level-card:hover {
  border-color: var(--level-color);
  transform: translateY(-2px);
  box-shadow: 0 14px 32px -10px color-mix(in srgb, var(--level-color) 30%, transparent);
}

.fc__level-card:active {
  transform: translateY(0);
}

.fc__level-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform var(--motion-base) var(--ease-out);
}

.fc__level-card:hover .fc__level-icon {
  transform: scale(1.06) rotate(-4deg);
}

.fc__level-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fc__level-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.fc__level-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.fc__level-count {
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  color: var(--level-color);
  background: color-mix(in srgb, var(--level-color) 12%, transparent);
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.fc__level-desc {
  margin: 0;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

.fc__level-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

.fc__level-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--level-color) 14%, transparent);
  color: var(--level-color);
}

.fc__level-cta {
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-nav);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--level-color);
}

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

.fc__level-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid;
}

.fc__adaptive-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.fc__adaptive-foot .fc__diff-name {
  align-self: auto;
  font-size: 12px;
}

.fc__change-level {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 999px;
  background: var(--surface-sunken);
  border: 1px solid var(--border-soft);
  color: var(--text-muted);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast),
    border-color var(--motion-fast);
}

.fc__change-level:hover {
  background: var(--color-primary-softer);
  color: var(--color-primary);
  border-color: var(--color-primary-soft);
}

.fc__change-level--inline {
  padding: 3px 8px;
  font-size: 10px;
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

.fc__front-foot {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.fc__speak {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-family: var(--font-nav);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background var(--motion-fast), border-color var(--motion-fast), transform var(--motion-fast);
}
.fc__speak:hover {
  background: rgba(255, 255, 255, 0.32);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-1px);
}
.fc__speak.is-playing {
  background: #fff;
  color: var(--color-primary-deep);
  border-color: #fff;
  animation: fc-speak-pulse 1.2s ease-in-out infinite;
}
.fc__speak--inline {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  padding: 6px 10px;
  margin-left: auto;
  flex-shrink: 0;
}
.fc__speak--inline:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}
.fc__speak--inline.is-playing {
  background: var(--color-accent, #f97316);
  color: #fff;
  border-color: var(--color-accent, #f97316);
}
@keyframes fc-speak-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5); }
  50%      { box-shadow: 0 0 0 8px rgba(255, 255, 255, 0); }
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

.fc__back-fr { flex-wrap: wrap; }

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

@media (max-width: 720px) {
  .fc__stats {
    grid-template-columns: repeat(2, 1fr);
  }
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

.fc__done-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
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
  .fc__progress-card {
    flex: 1;
    min-width: 0;
  }
}
</style>
