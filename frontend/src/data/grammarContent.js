// Conteúdo de gramática francesa estruturado por nível CEFR.
// Cada seção tem: id, title, summary, rules (com exemplos e tradução PT-BR).

export const LEVEL_META = {
  A1: {
    color: '#22c55e',
    label: 'A1',
    title: 'Iniciante — fundamentos',
    desc: 'Presente, artigos, gênero, pronomes, negação simples, primeiras liaisons.',
    topics: [
      {
        id: 'a1-presente',
        title: 'O presente do indicativo',
        summary: 'O presente é usado para falar de hábitos, fatos e ações atuais.',
        rules: [
          {
            label: 'Verbos do 1ᵉʳ grupo (-er)',
            explanation: 'A maioria dos verbos segue o padrão: radical + terminação (-e, -es, -e, -ons, -ez, -ent).',
            examples: [
              { fr: 'Je parle français.',                  pt: 'Eu falo francês.' },
              { fr: 'Tu parles avec Marie.',              pt: 'Você fala com Marie.' },
              { fr: 'Il mange une pomme.',                pt: 'Ele come uma maçã.' },
              { fr: 'Nous habitons à Paris.',              pt: 'Nós moramos em Paris.' },
              { fr: 'Vous regardez un film.',             pt: 'Vocês assistem a um filme.' },
              { fr: 'Elles adorent le chocolat.',          pt: 'Elas adoram chocolate.' }
            ]
          },
          {
            label: 'Verbos do 2ᵉ groupe (-ir)',
            explanation: 'Terminação regular: -is, -is, -it, -issons, -issez, -issent.',
            examples: [
              { fr: 'Je finis mon travail.',              pt: 'Eu termino meu trabalho.' },
              { fr: 'Tu choisis une robe.',               pt: 'Você escolhe um vestido.' },
              { fr: 'Il grandit vite.',                   pt: 'Ele cresce rápido.' },
              { fr: 'Nous rougissons un peu.',             pt: 'Nós enrubesmos um pouco.' }
            ]
          },
          {
            label: 'Avoir, être, aller, faire',
            explanation: 'Os quatro verbos irregulares mais importantes do A1.',
            examples: [
              { fr: "J'ai deux enfants.",                  pt: 'Eu tenho dois filhos.' },
              { fr: 'Tu es étudiant.',                     pt: 'Você é estudante.' },
              { fr: 'Il va au marché.',                    pt: 'Ele vai ao mercado.' },
              { fr: 'Nous faisons la cuisine.',            pt: 'Nós cozinhamos.' },
              { fr: 'Vous êtes à l\'heure.',               pt: 'Vocês estão pontuais.' },
              { fr: 'Elles ont faim.',                     pt: 'Elas estão com fome.' }
            ]
          },
          {
            label: 'Pronomes pessoais',
            explanation: 'Sujeitos básicos — todos os verbos se flexionam pela pessoa.',
            examples: [
              { fr: 'Je / J\' (eu) — 1ª pessoa do singular' },
              { fr: 'Tu (você) — 2ª pessoa do singular' },
              { fr: 'Il / Elle / On (ele / ela / a gente)' },
              { fr: 'Nous (nós)' },
              { fr: 'Vous (vós / você, formal)' },
              { fr: 'Ils / Elles (eles / elas)' }
            ]
          },
          {
            label: 'Negação simples: ne … pas',
            explanation: 'Envolve o verbo com ne … pas.',
            examples: [
              { fr: 'Je ne parle pas espagnol.',          pt: 'Eu não falo espanhol.' },
              { fr: 'Il n\'a pas de voiture.',              pt: 'Ele não tem carro.' },
              { fr: 'Nous ne mangeons pas ici.',           pt: 'Nós não comemos aqui.' }
            ]
          }
        ]
      },
      {
        id: 'a1-artigos',
        title: 'Artigos definidos, indefinidos e partitivos',
        summary: 'Três sistemas de artigos se aplicam conforme a contagem e a noção do substantivo.',
        rules: [
          {
            label: 'Artigos definidos (le, la, les, l\')',
            explanation: 'Usamos para algo específico, conhecido ou geral. Concordam em gênero e número.',
            examples: [
              { fr: 'le livre (o livro, masculino singular)' },
              { fr: 'la table (a mesa, feminino singular)' },
              { fr: "l'enfant (a criança, antes de vogal/ h)" },
              { fr: 'les enfants (as crianças, plural)' },
              { fr: 'J\'aime le chocolat (Eu gosto de chocolate — em geral)' }
            ]
          },
          {
            label: 'Artigos indefinidos (un, une, des)',
            explanation: 'Para algo não específico, "um um", / "uma uma", / "uns uns", / "umas umas",.',
            examples: [
              { fr: 'un garçon (um menino)' },
              { fr: 'une fille (uma menina)' },
              { fr: 'des enfants (umas crianças)' },
              { fr: "J'ai un chat (Eu tenho um gato — não específico)" }
            ]
          },
          {
            label: 'Artigos partitivos (du, de la, de l\', des)',
            explanation: 'Para quantidades não contáveis — "um pouco de", "algum",.',
            examples: [
              { fr: 'du pain (um pouco de pão)' },
              { fr: 'de la viande (um pouco de carne)' },
              { fr: "de l'eau (um pouco de água)" },
              { fr: 'des carottes (algumas cenouras)' },
              { fr: 'Je veux du café (Eu quero café)' }
            ]
          },
          {
            label: 'Gênero dos substantivos',
            explanation: 'Não há regra 100% confiável. Terminações úteis:',
            examples: [
              { fr: 'Terminam em -e geralmente → feminino: la porte, la chaise, la maison' },
              { fr: 'Terminam em -tion / -sion → feminino: la nation, la passion' },
              { fr: 'Terminam em -ment → masculino: le moment, le gouvernement' },
              { fr: 'Terminam em -age → masculino: le village, le passage' }
            ]
          }
        ]
      },
      {
        id: 'a1-plural',
        title: 'Plural dos substantivos',
        summary: 'Regra geral: + s no final. Várias exceções importantes.',
        rules: [
          {
            label: 'Plural regular (+s)',
            explanation: 'Maioria dos substantivos ganha s. Não se pronuncia geralmente.',
            examples: [
              { fr: 'un chat → des chats' },
              { fr: 'une table → des tables' },
              { fr: 'un livre → des livres' }
            ]
          },
          {
            label: 'Plural em -x',
            explanation: 'Substantivos que já terminam em -au, -eau, -eu ganham x.',
            examples: [
              { fr: 'un cadeau → des cadeaux (presente)' },
              { fr: 'un jeu → des jeux (jogo)' },
              { fr: 'un château → des châteaux (castelo)' }
            ]
          },
          {
            label: 'Plural em -s (x)',
            explanation: 'Sete substantivos terminados em -ou ganham x: bijou, caillou, chou, genou, hibou, joujou, pou.',
            examples: [
              { fr: 'un genou → des genoux (joelho)' },
              { fr: 'un bijou → des bijoux (joia)' },
              { fr: 'un chou → des choux (repolho)' }
            ]
          },
          {
            label: 'Plural irregular',
            explanation: 'Substantivos aprendidos especialmente.',
            examples: [
              { fr: 'un œil → des yeux (olho)' },
              { fr: 'un monsieur → des messieurs (senhor)' },
              { fr: 'une femme → des femmes (mulher)' },
              { fr: 'un animal → des animaux (animal)' }
            ]
          }
        ]
      },
      {
        id: 'a1-adjetivos',
        title: 'Adjetivos básicos e concordância',
        summary: 'Concordam em gênero e número com o substantivo que modificam.',
        rules: [
          {
            label: 'Feminino (-e)',
            explanation: 'Maioria dos adjetivos femininos adiciona -e.',
            examples: [
              { fr: 'petit → petite (pequeno/a)' },
              { fr: 'grand → grande (grande)' },
              { fr: 'rouge → rouge (vermelho/a, igual)' }
            ]
          },
          {
            label: 'Femininos irregulares',
            explanation: 'Alguns terminam em -e no masculino e tiram o -e no feminino (ou ficam diferentes).',
            examples: [
              { fr: 'beau → belle (bonito / bonita)' },
              { fr: 'vieux → vieille (velho / velha)' },
              { fr: 'heureux → heureuse (feliz)' }
            ]
          },
          {
            label: 'Plural dos adjetivos',
            explanation: 'Igual ao plural dos substantivos: +s (regra geral), +x em -eau / -al.',
            examples: [
              { fr: 'petit → petits / petite → petites' },
              { fr: 'beau → beaux / belle → belles' },
              { fr: 'national → nationaux (nacional)' }
            ]
          },
          {
            label: 'Posição do adjetivo',
            explanation: 'A maioria vem DEPOIS do substantivo. Uns poucos comuns vêm antes.',
            examples: [
              { fr: 'un livre intéressant (um livro interessante)' },
              { fr: 'une voiture rouge (um carro vermelho)' },
              { fr: 'un petit garçon (um menino pequeno — exceção comum)' },
              { fr: 'un bon ami (um bom amigo — exceção)' },
              { fr: 'une belle maison (uma casa bonita — exceção)' }
            ]
          }
        ]
      },
      {
        id: 'a1-pronomes',
        title: 'Pronomes pessoais e COD/COI básicos',
        summary: 'Pronomes substituem nomes. COD responde "quem / o quê", COI responde "a quem".',
        rules: [
          {
            label: 'Pronomes sujeitos',
            explanation: 'Já vimos em Presente. Sempre antes do verbo.',
            examples: [
              { fr: 'Je parle / Tu parles / Il parle / Nous parlons / Vous parlez / Ils parlent' }
            ]
          },
          {
            label: 'Pronomes COD (acusativo)',
            explanation: 'Vou ao COD se a frase responde "quem / o quê?".',
            examples: [
              { fr: "J'ai vu Marie → Je l'ai vue (Eu a vi)" },
              { fr: "Je mange le gâteau → Je le mange (Eu o como)" },
              { fr: "Je vois les enfants → Je les vois (Eu os vejo)" }
            ]
          },
          {
            label: 'Pronomes COI (dativo)',
            explanation: 'Vou ao COI se responde "a quem / a quê?".',
            examples: [
              { fr: "Je parle à Marie → Je lui parle (Eu falo a ela)" },
              { fr: "Je donne le livre à Paul → Je lui donne le livre" },
              { fr: "Je téléphone aux parents → Je leur téléphone" }
            ]
          }
        ]
      },
      {
        id: 'a1-liaison',
        title: 'Liaisons obrigatórias no A1',
        summary: 'Algumas consoantes finais mudam de pronúncia quando a palavra seguinte começa com vogal.',
        rules: [
          {
            label: 'Plural + adjetivo/verbo começando com vogal',
            explanation: 'A consoante final -s, -d, -n soa como [z], [t], [n] quando ligada.',
            examples: [
              { fr: 'les → lez (les amis = lez-ami)' },
              { fr: 'des → dez (des enfants = dez-enfã)' },
              { fr: 'grand → grant (un grand homme = un grant-homme)' },
              { fr: 'bon → bon (un bon ami = un bo-nami)' }
            ]
          },
          {
            label: 'Artigos e preposições',
            explanation: 'Sempre com som ligado antes de vogal/h aspirado.',
            examples: [
              { fr: "les → lez (l'Europe = le-zurope)" },
              { fr: "des → dez (des amis = de-zami)" },
              { fr: "Nous → nuz (nous avons = nu-zavõ)" },
              { fr: "Ils → ilz (ils ont = il-zõ)" }
            ]
          }
        ]
      },
      {
        id: 'a1-possessifs',
        title: 'Adjetivos possessivos (mon, ma, mes...)',
        summary: 'Mostram a quem pertence algo. Concordam em gênero e número com o objeto possuído (exceto notre/votre/leur).',
        rules: [
          {
            label: 'Tabela dos possessivos',
            explanation: 'Singular masculino + vogal/h: mon/ton/son viram m\'/t\'/s\'. Singular feminino: ma/ta/sa. Plural: mes/tes/ses.',
            examples: [
              { fr: 'je → mon, ma, mes (meu, minha, meus/minhas)' },
              { fr: 'tu → ton, ta, tes (teu, tua, teus/tuas)' },
              { fr: 'il/elle/on → son, sa, ses (seu, sua, seus/suas)' },
              { fr: 'nous → notre, nos (nosso, nossos)' },
              { fr: 'vous → votre, vos (seu/sua de vocês, de vocês)' },
              { fr: 'ils/elles → leur, leurs (deles/delas)' }
            ]
          },
          {
            label: 'Elisão antes de vogal/h',
            explanation: 'mon, ton, son viram m\', t\', s\' antes de vogal ou h mudo.',
            examples: [
              { fr: 'mon → m\' : mon ami → m\'ami (masculino singular)' },
              { fr: 'ton → t\' : ton école → t\'école' },
              { fr: 'son → s\' : son histoire → s\'histoire' },
              { fr: "J'ai vu ton ami. (Vi teu amigo.)" },
              { fr: "Il a pris mon livre. (Ele pegou meu livro.)" },
              { fr: 'Sa maison est grande. (A casa dele/dela é grande.)' }
            ]
          },
          {
            label: 'Concordância com o objeto possuído (reger)',
            explanation: 'mon/ma/mes e ton/ta/tes concordam com a coisa possuída, NÃO com o dono.',
            examples: [
              { fr: 'Marie porte son sac. (Marie carrega a bolsa dela.) — sac é masc, "son" masc' },
              { fr: 'Marie porte sa robe. (Marie carrega o vestido dela.) — robe é fem, "sa" fem' },
              { fr: 'Paul aime ses parents. (Paul ama os pais dele.) — pais = plural' },
              { fr: "J'ai pris mes clés. (Peguei minhas chaves.)" }
            ]
          },
          {
            label: 'Exceção com partes do corpo e roupas',
            explanation: 'Partes do corpo, sentimentos e roupas geralmente usam "le / la / les" + possessivo, em vez de artigo definido.',
            examples: [
              { fr: "Je me lave les mains. (Eu lavo as mãos.) — partes do corpo" },
              { fr: 'Elle a mal à la tête. (Ela está com dor de cabeça.)' },
              { fr: 'Il met son manteau. (Ele coloca o casaco dele.) — roupas' }
            ]
          },
          {
            label: 'Notre / votre / leur: concordam com o dono',
            explanation: 'Singular: notre/votre/leur. Plural: nos/vos/leurs. Diferente de mon/son.',
            examples: [
              { fr: 'C\'est notre maison. (É nossa casa.) — casa = fem, mas "notre" é invariável' },
              { fr: 'Ce sont nos enfants. (São nossos filhos.) — plural' },
              { fr: 'Voici leur chien. (Aqui está o cão deles.)' },
              { fr: 'Vos clés sont sur la table. (As chaves de vocês estão na mesa.)' }
            ]
          }
        ]
      },
      {
        id: 'a1-numeros',
        title: 'Numerais cardinais e ordinais',
        summary: 'Números em francês, datas e preços.',
        rules: [
          {
            label: 'Cardinais de 0 a 100',
            explanation: '0 a 16 têm forma própria; 17-69 seguem padrão; 70-99 são especiais.',
            examples: [
              { fr: '0 zéro / 1 un / 2 deux / 3 trois / 4 quatre / 5 cinq', pt: '0-5' },
              { fr: '6 six / 7 sept / 8 huit / 9 neuf / 10 dix', pt: '6-10' },
              { fr: '11 onze / 12 douze / 13 treize / 14 quatorze / 15 quinze / 16 seize', pt: '11-16' },
              { fr: '17 dix-sept / 18 dix-huit / 19 dix-neuf', pt: '17-19' },
              { fr: '20 vingt / 21 vingt et un / 22 vingt-deux / 30 trente', pt: '20-30' },
              { fr: '40 quarante / 50 cinquante / 60 soixante', pt: '40-60' },
              { fr: '70 soixante-dix (60+10) / 80 quatre-vingts (4×20) / 90 quatre-vingt-dix (4×20+10)', pt: '70-90' },
              { fr: '100 cent', pt: '100' }
            ]
          },
          {
            label: 'Cardinais acima de 100',
            explanation: 'A partir de 70, a regra vira peculiar: 80 usa quatre-vingts.',
            examples: [
              { fr: '200 deux cents / 1000 mille / 1 000 000 un million', pt: '200 / mil / milhão' },
              { fr: '2000 deux mille / 100 cent / 21 vingt et un (sempre com "et")', pt: '2000 / 100 / 21' }
            ]
          },
          {
            label: 'Ordinais (1ᵒʳ a 10ᵉ)',
            explanation: 'Adiciona-se "-ième" ao cardinal, com exceções de "premier" e "cinquième".',
            examples: [
              { fr: '1ᵉʳ premier / 1ʳᵉ première (feminino)', pt: 'primeiro / primeira' },
              { fr: '2ᵉ deuxième / 3ᵉ troisième / 4ᵉ quatrième', pt: '2º, 3º, 4º' },
              { fr: '5ᵉ cinquième / 6ᵉ sixième / 7ᵉ septième', pt: '5º, 6º, 7º' },
              { fr: '8ᵉ huitième / 9ᵉ neuvième / 10ᵉ dixième', pt: '8º, 9º, 10º' },
              { fr: 'Le premier étage (primeiro andar)', pt: 'O primeiro andar' }
            ]
          },
          {
            label: 'Em expressões do cotidiano',
            explanation: 'Preços, telefone, idade, ano.',
            examples: [
              { fr: '12 €50 — douze euros cinquante', pt: '€12,50' },
              { fr: 'J\'ai 25 ans.', pt: 'Eu tenho 25 anos.' },
              { fr: 'En 2024 — en deux mille vingt-quatre', pt: 'Em 2024' },
              { fr: 'Le 14 juillet — le quatorze juillet', pt: '14 de julho' }
            ]
          }
        ]
      },
      {
        id: 'a1-tempo',
        title: 'Tempo: horas, dias, meses, estações, datas',
        summary: 'Vocabulário essencial do tempo em francês.',
        rules: [
          {
            label: 'Horas',
            explanation: 'Use "il est" + hora. "et" apenas em minutos múltiplos de 5.',
            examples: [
              { fr: 'Il est une heure. (É uma hora.)' },
              { fr: 'Il est trois heures. (São três horas.)' },
              { fr: 'Il est 10h10. — Il est dix heures dix.' },
              { fr: 'Il est 14h30. — Il est quatorze heures trente.' },
              { fr: 'Il est midi. / Il est minuit. (Meio-dia / meia-noite)' },
              { fr: 'À quelle heure ? (A que horas?)' }
            ]
          },
          {
            label: 'Dias da semana',
            explanation: 'Minúsculos em francês. "Le + dia" para data exata.',
            examples: [
              { fr: 'lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche', pt: 'seg, ter, qua, qui, sex, sáb, dom' },
              { fr: 'lundi → mardi → mercredi...', pt: 'dias em sequência' },
              { fr: 'Le lundi (na segunda)', pt: '(na segunda)' },
              { fr: 'Nous sommes lundi aujourd\'hui. (Hoje é segunda.)' }
            ]
          },
          {
            label: 'Meses e estações',
            explanation: 'Meses em minúsculo. Estações com "en".',
            examples: [
              { fr: 'janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre', pt: 'meses do ano' },
              { fr: 'En avril — Em abril', pt: '(preposição "en" para meses)' },
              { fr: 'le printemps, l\'été, l\'automne, l\'hiver', pt: 'primavera, verão, outono, inverno' },
              { fr: 'En été je vais à la plage. (No verão eu vou à praia.)' }
            ]
          },
          {
            label: 'Datas e expressões',
            explanation: 'Como falar datas, ontem, hoje, amanhã.',
            examples: [
              { fr: 'Quel jour sommes-nous ? (Que dia é hoje?)' },
              { fr: 'Nous sommes le 3 mai 2024. (Estamos em 3 de maio de 2024.)' },
              { fr: "Quelle est la date aujourd'hui ? (Qual a data de hoje?)" },
              { fr: "C'est aujourd'hui lundi. (Hoje é segunda.)" }
            ]
          }
        ]
      },
      {
        id: 'a1-preposicoes',
        title: 'Preposições de lugar e movimento',
        summary: 'Onde as coisas estão e para onde vão.',
        rules: [
          {
            label: 'à (em / a / para cidade)',
            explanation: 'Para cidades, países e lugares genéricos.',
            examples: [
              { fr: 'à Paris (em Paris)', pt: 'na cidade' },
              { fr: 'au Brésil (no Brasil)', pt: 'no país (masc.)' },
              { fr: 'à la maison (em casa)', pt: 'feminino' },
              { fr: 'à l\'école (na escola)', pt: 'antes de vogal' }
            ]
          },
          {
            label: 'en (em país feminino / meio de transporte)',
            explanation: 'Países femininos e meios de transporte.',
            examples: [
              { fr: 'en France (na França)', pt: 'país feminino' },
              { fr: 'en Italie (na Itália)', pt: '' },
              { fr: 'en voiture (de carro)', pt: 'transporte' },
              { fr: 'en bus, en train, en avion, en métro', pt: 'transportes' }
            ]
          },
          {
            label: 'dans (dentro de)',
            explanation: 'Espaço fechado, tempo aproximado.',
            examples: [
              { fr: 'dans la salle (na sala)', pt: 'lugar fechado' },
              { fr: 'dans la boîte (na caixa)', pt: '' },
              { fr: 'dans deux semaines (em duas semanas)', pt: 'tempo aproximado' }
            ]
          },
          {
            label: 'sur / sous (sobre / sob)',
            examples: [
              { fr: 'sur la table (sobre a mesa)', pt: '' },
              { fr: 'sous la table (sob a mesa)', pt: '' },
              { fr: 'sur le lit (sobre a cama)', pt: '' }
            ]
          },
          {
            label: 'devant / derrière / entre / à côté de',
            examples: [
              { fr: 'devant la maison (na frente da casa)', pt: '' },
              { fr: 'derrière l\'église (atrás da igreja)', pt: '' },
              { fr: 'entre les deux (entre os dois)', pt: '' },
              { fr: 'à côté de la porte (ao lado da porta)', pt: '' }
            ]
          },
          {
            label: 'Entre escola, trabalho e casa',
            examples: [
              { fr: 'Je vais à l\'école à pied. (Vou à escola a pé.)' },
              { fr: 'Il part au travail en métro. (Ele vai ao trabalho de metrô.)' },
              { fr: 'Elle rentre chez elle à 18h. (Ela chega em casa às 18h.)' }
            ]
          }
        ]
      }
    ]
  },

  A2: {
    color: '#3b82f6',
    label: 'A2',
    title: 'Elementar — situações cotidianas',
    desc: 'Passé composé, imparfait (intro), futuro próximo, conectivos básicos, pronomes y/en.',
    topics: [
      {
        id: 'a2-pc',
        title: 'Passé composé — formação e uso',
        summary: 'Tempo do passado narrativo para ações pontuais concluídas.',
        rules: [
          {
            label: 'Formação com avoir',
            explanation: 'Sujeito + avoir no presente + participio passado do verbo principal.',
            examples: [
              { fr: "J'ai mangé une pomme. (Eu comi uma maçã.)" },
              { fr: "Tu as parlé à Paul. (Você falou com Paulo.)" },
              { fr: "Nous avons fini le travail. (Nós terminamos o trabalho.)" },
              { fr: "Elles ont vendu la maison. (Elas venderam a casa.)" }
            ]
          },
          {
            label: 'Verbos que usam être',
            explanation: '17 verbos de movimento / mudança de estado formam com être. Todos no feminino plural ganham +es, no masculino plural +s.',
            examples: [
              { fr: 'être, aller, venir, arriver, partir, sortir, entrer, rester, monter, descendre, retourner, naître, mourir, devenir, tomber, passer, revenir' },
              { fr: "Je suis allé au cinéma. (Eu fui ao cinema.) — masculin" },
              { fr: "Elle est allée au cinéma. — feminin" },
              { fr: "Nous sommes partis hier. (Nós saímos ontem.)" },
              { fr: "Elles sont nées en 1990." }
            ]
          },
          {
            label: 'Participios irregulares comuns',
            explanation: 'Valem memorizar.',
            examples: [
              { fr: 'avoir → eu (tive)' },
              { fr: 'être → été (sido)' },
              { fr: 'faire → fait (feito)' },
              { fr: 'prendre → pris (tomado)' },
              { fr: 'mettre → mis (posto)' },
              { fr: 'dire → dit (dito)' },
              { fr: 'écrire → écrit (escrito)' },
              { fr: 'voir → vu (visto)' },
              { fr: 'pouvoir → pu (podido)' },
              { fr: 'vouloir → voulu (querido)' },
              { fr: 'savoir → su (sabido)' },
              { fr: 'voir → vu (visto)' },
              { fr: 'devoir → dû (devido)' },
              { fr: 'connaître → connu (conhecido)' },
              { fr: 'ouvrir → ouvert (aberto)' },
              { fr: 'boire → bu (bebido)' },
              { fr: 'prendre → pris (tomado)' },
              { fr: 'venir → venu (vindo)' },
              { fr: 'aller → allé (ido)' },
              { fr: 'venir → venu' },
              { fr: 'mourir → mort (morto)' },
              { fr: 'naître → né (nascido)' }
            ]
          },
          {
            label: 'Negação no passé composé',
            explanation: 'Envolve o auxiliar avoir/être, não o participio.',
            examples: [
              { fr: "Je n'ai pas mangé. (Eu não comi.)" },
              { fr: "Elle n'est pas venue. (Ela não veio.)" },
              { fr: "Nous n'avons pas vu le film. (Não vimos o filme.)" }
            ]
          }
        ]
      },
      {
        id: 'a2-imparfait',
        title: 'Imparfait — formação e primeiro uso',
        summary: 'Passado descritivo: hábitos, cenários, estados em andamento no passado.',
        rules: [
          {
            label: 'Formação',
            explanation: 'Para verbos do 1ᵉʳ grupo: radical da 1ª pessoa do plural (nous) + -ais, -ais, -ait, -ions, -iez, -aient. Para être: ét-, étais, était…',
            examples: [
              { fr: 'Je parlais (eu falava)' },
              { fr: 'Tu finissais (tu terminava)' },
              { fr: "Il prenait le train (Ele pegava o trem)" },
              { fr: "Nous étions à l'école (Nós estávamos na escola)" },
              { fr: 'Vous aviez un chien (Vocês tinham um cão)' },
              { fr: 'Ils faisaient du sport (Eles faziam esporte)' }
            ]
          },
          {
            label: 'Verbo être no imparfait (única irregular)',
            explanation: 'O único verbo realmente irregular.',
            examples: [
              { fr: 'j\'étais, tu étais, il/elle était' },
              { fr: 'nous étions, vous étiez, ils/elles étaient' }
            ]
          },
          {
            label: 'Uso: descrição / hábito',
            explanation: 'O imparfait pinta o cenário. Use quando há hábito, descrição, ou ação em andamento.',
            examples: [
              { fr: 'Quand j\'étais petit, je jouais au football. (Quando eu era pequeno, eu jogava futebol.)' },
              { fr: 'Il pleuvait beaucoup ce jour-là. (Chovia muito naquele dia.)' },
              { fr: 'Nous habitions à Lyon quand j\'étais enfant. (Morávamos em Lyon quando eu era criança.)' }
            ]
          }
        ]
      },
      {
        id: 'a2-pc-vs-imp',
        title: 'Passé composé vs Imparfait',
        summary: 'A regra de ouro: passé composé = evento, imparfait = cenário.',
        rules: [
          {
            label: 'Padrão francês clássico',
            explanation: 'O cenário (imparfait) interrompe por um evento (passé composé).',
            examples: [
              { fr: 'Il pleuvait (cenário) quand je suis sorti (evento). (Chovia quando eu saí.)' },
              { fr: 'Nous mangions (cenário) quand le téléphone a sonné (evento). (Comíamos quando o telefone tocou.)' },
              { fr: 'Je lisais (cenário) quand il est entré (evento). (Eu lia quando ele entrou.)' }
            ]
          },
          {
            label: 'Sinais que pedem imparfait',
            explanation: 'Habitualmente pedem descrição / hábito.',
            examples: [
              { fr: 'toujours (sempre)' },
              { fr: 'souvent (frequentemente)' },
              { fr: 'chaque jour (todo dia)' },
              { fr: 'd\'habitude (geralmente)' },
              { fr: 'avant (antes)' },
              { fr: 'pendant que (enquanto)' },
              { fr: 'à cette époque-là (naquela época)' }
            ]
          },
          {
            label: 'Sinais que pedem passé composé',
            explanation: 'Habitualmente pedem evento / ação pontual.',
            examples: [
              { fr: 'hier (ontem)' },
              { fr: 'la semaine dernière (semana passada)' },
              { fr: 'soudain (de repente)' },
              { fr: 'tout à coup (de repente)' },
              { fr: 'un jour (um dia)' },
              { fr: 'une fois (uma vez)' },
              { fr: 'd\'abord (primeiro)' },
              { fr: 'ensuite (depois)' },
              { fr: 'enfin (finalmente)' }
            ]
          }
        ]
      },
      {
        id: 'a2-futur',
        title: 'Futuro próximo e condicional básico',
        summary: 'Para falar do futuro de forma rápida e cortês.',
        rules: [
          {
            label: 'Futuro próximo (aller + infinitif)',
            explanation: 'Forma coloquial muito usada.',
            examples: [
              { fr: 'Je vais manger. (Eu vou comer.)' },
              { fr: 'Tu vas partir demain. (Você vai partir amanhã.)' },
              { fr: 'Nous allons visiter Paris. (Nós vamos visitar Paris.)' },
              { fr: 'On va essayer. (Vamos tentar.)' }
            ]
          },
          {
            label: 'Condicional presente (introdução)',
            explanation: 'radical do futuro simples + terminações do imperfeito (-ais, -ais, -ait, -ions, -iez, -aient).',
            examples: [
              { fr: "J'aimerais un café, s'il vous plaît. (Eu gostaria de um café, por favor.)" },
              { fr: 'Pourriez-vous m\'aider ? (Poderia me ajudar?)' },
              { fr: 'Je voudrais réserver une table. (Eu gostaria de reservar uma mesa.)' },
              { fr: 'On pourrait sortir ce soir. (Poderíamos sair hoje à noite.)' }
            ]
          },
          {
            label: 'Condicional para pedidos (politesse)',
            explanation: 'Forma padrão de pedidos educados.',
            examples: [
              { fr: "Je voudrais... (Eu gostaria de...)" },
              { fr: "Pourriez-vous...? (Poderia...?)" },
              { fr: "Auriez-vous... ? (Teria...?)" },
              { fr: "Ça serait possible de... ? (Seria possível...?)" }
            ]
          }
        ]
      },
      {
        id: 'a2-y-en',
        title: 'Pronomes y e en',
        summary: 'Substituem complementos introduzidos por "à" e "de".',
        rules: [
          {
            label: 'Y substitui "à + lugar/coisa"',
            explanation: 'Responde "aonde / a quê".',
            examples: [
              { fr: 'Je vais à Paris → J\'y vais. (Eu vou a Paris.)' },
              { fr: 'Tu penses à l\'examen ? → Tu y penses ? ? (Você pensa no exame?)' },
              { fr: 'Nous tenons à ce projet → Nous y tenons. (Nós nos importamos com este projeto.)' }
            ]
          },
          {
            label: 'En substitui "de + coisa/quantidade"',
            explanation: 'Responde "de quê / de quem / quantos".',
            examples: [
              { fr: 'Je viens de Paris → J\'en viens. (Eu venho de Paris.)' },
              { fr: 'Tu as trois enfants → Tu en as trois. (Você tem três.)' },
              { fr: 'Nous parlons de ce projet → Nous en parlons. (Falamos deste projeto.)' }
            ]
          },
          {
            label: 'Atenção: y e en com pessoas',
            explanation: 'Quando o complemento é uma pessoa, use pronomes indiretos (lui / leur), não y/en.',
            examples: [
              { fr: "Je pense à Marie → Je pense à elle. (Eu penso nela.)" },
              { fr: "Nous parlons de Paul → Nous parlons de lui." }
            ]
          }
        ]
      },
      {
        id: 'a2-conj',
        title: 'Conectivos básicos e estrutura do discurso',
        summary: 'Conectores para ligar ideias com lógica.',
        rules: [
          {
            label: 'Adição e alternativa',
            examples: [
              { fr: 'et (e)' },
              { fr: 'ou (ou)' },
              { fr: 'mais (mas)' },
              { fr: 'ni... ni (nem... nem)' }
            ]
          },
          {
            label: 'Causa',
            examples: [
              { fr: 'parce que (porque)' },
              { fr: 'puisque (já que / uma vez que)' },
              { fr: 'comme (como / já que)' },
              { fr: 'à cause de (por causa de) + nome' },
              { fr: 'grâce à (graças a) + nome' }
            ]
          },
          {
            label: 'Consequência',
            examples: [
              { fr: 'donc (logo / portanto)' },
              { fr: 'alors (então)' },
              { fr: "c'est pourquoi (é por isso que)" },
              { fr: 'par conséquent (por conseguinte)' }
            ]
          },
          {
            label: 'Oposição / concessão',
            examples: [
              { fr: 'mais (mas)' },
              { fr: 'cependant (entretanto)' },
              { fr: 'néanmoins (no entanto)' },
              { fr: 'pourtant (porém)' }
            ]
          },
          {
            label: 'Tempo (ordem cronológica)',
            examples: [
              { fr: 'd\'abord (primeiro)' },
              { fr: 'ensuite (em seguida)' },
              { fr: 'enfin (finalmente)' },
              { fr: 'puis (depois)' },
              { fr: "avant de + inf. (antes de + inf.)" },
              { fr: 'après + nom/inf. (depois de + nome/inf.)' }
            ]
          },
          {
            label: 'Finalidade',
            examples: [
              { fr: 'pour (para) + inf.' },
              { fr: 'afin de (a fim de) + inf.' },
              { fr: 'de peur de (por medo de) + inf.' },
              { fr: 'de manière à (de modo a) + inf.' }
            ]
          }
        ]
      },
      {
        id: 'a2-comp',
        title: 'Comparativos simples',
        summary: 'Comparar qualidades, quantidades e ações.',
        rules: [
          {
            label: 'Mais / moins / aussi / autant',
            explanation: 'A comparação vai antes do adjetivo ou do verbo.',
            examples: [
              { fr: 'Paul est plus grand que Marie. (Paulo é mais alto do que Marie.)' },
              { fr: 'Ce livre est moins cher. (l)' },
              { fr: 'Elle est aussi intelligente que lui. (Ela é tão inteligente quanto ele.)' },
              { fr: 'Nous travaillons autant qu\'eux. (Trabalhamos tanto quanto eles.)' }
            ]
          },
          {
            label: 'Bon / mauvais / bien / mieux',
            explanation: 'Irregulares: bon → meilleur; bien → mieux.',
            examples: [
              { fr: 'Ce gâteau est meilleur que l\'autre. (Este bolo é melhor que o outro.)' },
              { fr: 'Elle travaille mieux que son frère. (Ela trabalha melhor que o irmão.)' },
              { fr: 'C\'est le meilleur restaurant du quartier. (É o melhor restaurante do bairro.)' }
            ]
          },
          {
            label: 'Superlativo (-issime / le plus)',
            explanation: 'Adiciona "le / la / les" antes do comparativo.',
            examples: [
              { fr: "le plus grand (o maior)" },
              { fr: "la moins chère (a menos cara)" },
              { fr: 'lestrêmes plus importants (os mais importantes)' },
              { fr: 'le meilleur vin (o melhor vinho)' }
            ]
          }
        ]
      },
      {
        id: 'a2-adverbios',
        title: 'Advérbios de quantidade, frequência e modo',
        summary: 'Palavras que acompanham verbos e adjetivos para qualificar.',
        rules: [
          {
            label: 'Quantidade',
            explanation: 'Modificam verbos ou adjetivos. A maioria termina em -ment.',
            examples: [
              { fr: 'beaucoup (muito)', pt: '' },
              { fr: 'peu (pouco)', pt: '' },
              { fr: 'trop (demais)', pt: '' },
              { fr: 'assez (suficiente / bastante)', pt: '' },
              { fr: 'très (muito)', pt: '' },
              { fr: 'vraiment (verdadeiramente)', pt: '' },
              { fr: 'tellement (tão)', pt: '' },
              { fr: 'un peu (um pouco)', pt: '' }
            ]
          },
          {
            label: 'Frequência',
            examples: [
              { fr: 'souvent (frequentemente)', pt: '' },
              { fr: 'toujours (sempre)', pt: '' },
              { fr: 'parfois (às vezes)', pt: '' },
              { fr: 'rarement (raramente)', pt: '' },
              { fr: 'jamais (nunca)', pt: '' },
              { fr: 'd\'habitude (geralmente)', pt: '' },
              { fr: 'Tous les jours (todo dia)', pt: '' },
              { fr: 'Une fois par semaine (uma vez por semana)', pt: '' }
            ]
          },
          {
            label: 'Modo (geralmente -ment)',
            explanation: 'Adverbio de modo = adjetivo feminino + -ment. Algumas exceções.',
            examples: [
              { fr: 'lentement (lentamente) — de lent(e) → lentement' },
              { fr: 'vraiment (verdadeiramente) — vrai → vraiment' },
              { fr: 'heureusement (felizmente) — heureux → heureuse → heureusement' },
              { fr: 'gentiment (gentilmente) — gentil → gentille → gentiment' },
              { fr: 'finalement (finalmente)' },
              { fr: 'certainement (certamente)' },
              { fr: 'simplement (simplesmente)' },
              { fr: 'particulièrement (particularmente)' }
            ]
          },
          {
            label: 'Exceções importantes (formas irregulares)',
            explanation: 'Alguns advérbios comuns têm forma única, sem -ment.',
            examples: [
              { fr: 'bien (bem) — de "bon" não segue regra' },
              { fr: 'mal (mal) — oposto de bien' },
              { fr: 'vite (rápido)' },
              { fr: 'lentement (lentamente) vs vite (rapidamente)' },
              { fr: 'beaucoup (muito), pouco → peu' },
              { fr: 'peut-être (talvez)' },
              { fr: 'aujourd\'hui (hoje)' },
              { fr: 'demain (amanhã), hier (ontem)' },
              { fr: 'souvent (frequentemente)' },
              { fr: 'tard (tarde), tôt (cedo)' },
              { fr: 'toujours (sempre)' },
              { fr: 'déjà (já)' },
              { fr: 'encore (ainda)' }
            ]
          }
        ]
      },
      {
        id: 'a2-negacao',
        title: 'Negação expandida (ne... rien/personne/jamais/plus)',
        summary: 'Variações do "não" em francês.',
        rules: [
          {
            label: 'ne... rien (nada)',
            explanation: 'rien substitui um objeto direto/indireto. Posição: depois do verbo (em frases simples).',
            examples: [
              { fr: 'Je ne mange rien. (Eu não como nada.)' },
              { fr: 'Il n\'a rien dit. (Ele não disse nada.)' },
              { fr: 'Rien ne va. (Nada vai.) — atenção: ne ... rien também funciona inverso' },
              { fr: 'Il n\'y a rien ici. (Não há nada aqui.)' }
            ]
          },
          {
            label: 'ne... personne (ninguém)',
            explanation: 'personne = ninguém (sujeito ou objeto).',
            examples: [
              { fr: 'Personne ne parle. (Ninguém fala.) — ne vai para o verbo' },
              { fr: 'Je ne vois personne. (Eu não vejo ninguém.)' },
              { fr: 'Il n\'a vu personne. (Ele não viu ninguém.)' }
            ]
          },
          {
            label: 'ne... jamais (nunca)',
            explanation: 'jamais = nunca. Posição: depois do verbo.',
            examples: [
              { fr: 'Je ne fume jamais. (Eu nunca fumo.)' },
              { fr: 'Elle n\'est jamais venue. (Ela nunca veio.)' },
              { fr: 'Je ne suis jamais allé à Paris. (Nunca fui a Paris.)' }
            ]
          },
          {
            label: 'ne... plus (não mais)',
            explanation: 'plus = mais / não mais.',
            examples: [
              { fr: 'Je ne fume plus. (Não fumo mais.)' },
              { fr: 'Il n\'habite plus ici. (Ele não mora mais aqui.)' },
              { fr: 'Je n\'ai plus d\'argent. (Não tenho mais dinheiro.)' }
            ]
          },
          {
            label: 'ne... pas encore (ainda não)',
            explanation: 'encore = ainda. Combinado com pas.',
            examples: [
              { fr: 'Je ne suis pas encore prêt. (Ainda não estou pronto.)' },
              { fr: 'Il n\'a pas encore mangé. (Ele ainda não comeu.)' }
            ]
          },
          {
            label: 'Posição na frase (regra geral)',
            explanation: 'ne antes do verbo conjugado. A segunda parte (pas, jamais, rien...) envolve o verbo.',
            examples: [
              { fr: 'Je ne mange jamais de viande. (Nunca como carne.)' },
              { fr: 'Elle ne voit personne. (Ela não vê ninguém.)' },
              { fr: 'Nous ne parlons plus. (Não falamos mais.)' },
              { fr: 'Tu n\'as rien vu. (Tu não viste nada.)' }
            ]
          }
        ]
      },
      {
        id: 'a2-verbos-3grupo',
        title: 'Verbos irregulares do 3ᵉ groupe (essenciais)',
        summary: 'Os verbos mais comuns — vale memorizar.',
        rules: [
          {
            label: 'Lista dos 15 irregulares mais comuns',
            explanation: 'A maioria segue "padrão próprio". Vale decorar as formas no presente.',
            examples: [
              { fr: 'faire (fazer) → je fais, tu fais, il fait, nous faisons, vous faites, ils font', pt: '' },
              { fr: 'aller (ir) → je vais, tu vas, il va, nous allons, vous allez, ils vont', pt: '' },
              { fr: 'venir (vir) → je viens, tu viens, il vient, nous venons, vous venez, ils viennent', pt: '' },
              { fr: 'voir (ver) → je vois, tu vois, il voit, nous voyons, vous voyez, ils voient', pt: '' },
              { fr: 'prendre (pegar) → je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent', pt: '' },
              { fr: 'mettre (pôr) → je mets, tu mets, il met, nous mettons, vous mettez, ils mettent', pt: '' },
              { fr: 'dire (dizer) → je dis, tu dis, il dit, nous disons, vous dites, ils disent', pt: '' },
              { fr: 'écrire (escrever) → j\'écris, tu écris, il écrit, nous écrivons, vous écrivez, ils écrivent', pt: '' },
              { fr: 'lire (ler) → je lis, tu lis, il lit, nous lisons, vous lisez, ils lisent', pt: '' },
              { fr: 'ouvrir (abrir) → j\'ouvre, tu ouvres, il ouvre, nous ouvrons, vous ouvrez, ils ouvrent', pt: '' },
              { fr: 'connaître (conhecer) → je connais, tu connais, il connaît, nous connaissons', pt: '' },
              { fr: 'savoir (saber) → je sais, tu sais, il sait, nous savons, vous savez, ils savent', pt: '' },
              { fr: 'pouvoir (poder) → je peux, tu peux, il peut, nous pouvons, vous pouvez, ils peuvent', pt: '' },
              { fr: 'vouloir (querer) → je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent', pt: '' },
              { fr: 'devoir (dever) → je dois, tu dois, il doit, nous devons, vous devez, ils doivent', pt: '' }
            ]
          },
          {
            label: 'Passé composé dos 3ᵉ groupe — principais participios',
            explanation: 'Memorize os participios irregulares.',
            examples: [
              { fr: 'fait (faire), été (être), eu (avoir), pris (prendre), mis (mettre)' },
              { fr: 'dit (dire), écrit (écrire), lu (lire), vu (voir), pu (pouvoir)' },
              { fr: 'voulu (vouloir), su (savoir), dû (devoir), connu (connaître)' },
              { fr: 'ouvert (ouvrir), bu (boire), reçu (recevoir), suivi (suivre)' },
              { fr: 'mort (mourir), né (naître), venu (venir), tenu (tenir)' },
              { fr: 'appris (apprendre), compris (comprendre), surpris (surprendre)' },
              { fr: 'J\'ai fait, j\'ai pris, j\'ai mis, j\'ai vu, j\'ai pu, j\'ai voulu.' }
            ]
          },
          {
            label: 'Verbos que usam être no passé composé',
            explanation: '17 verbos de movimento / mudança de estado.',
            examples: [
              { fr: 'être, aller, venir, arriver, partir, sortir, entrer, rester' },
              { fr: 'monter, descendre, retourner, tomber, passer, devenir' },
              { fr: 'naître, mourir, revenir' }
            ]
          }
        ]
      },
      {
        id: 'a2-pronoms-possessifs',
        title: 'Pronomes possessivos (le mien, le tien...)',
        summary: 'Substituem um sintagma "adjetivo possessivo + nome" para evitar repetição. Concordam em gênero e número com a coisa possuída.',
        rules: [
          {
            label: 'Tabela completa com pronúncia (IPA)',
            explanation: 'Concordam em gênero e número com a COISA possuída. O circunflexo (ê) garante a vogal aberta [ɛ]. Cuidado com "leur": singular (pronome) ≠ deles (adjetivo).',
            examples: [
              { fr: 'le mien',     ipa: '[lə mjɛ̃]',  pt: 'o meu (masc. sing.)' },
              { fr: 'la mienne',   ipa: '[la mjɛn]',  pt: 'a minha (fem. sing.)' },
              { fr: 'les miens',   ipa: '[le mjɛ̃]',  pt: 'os meus (masc. pl.)' },
              { fr: 'les miennes', ipa: '[le mjɛn]',  pt: 'as minhas (fem. pl.)' },
              { fr: 'le tien',     ipa: '[lə tjɛ̃]',  pt: 'o teu (masc. sing.)' },
              { fr: 'la tienne',   ipa: '[la tjɛn]',  pt: 'a tua (fem. sing.)' },
              { fr: 'les tiens',   ipa: '[le tjɛ̃]',  pt: 'os teus (masc. pl.)' },
              { fr: 'les tiennes', ipa: '[le tjɛn]',  pt: 'as tuas (fem. pl.)' },
              { fr: 'le sien',     ipa: '[lə sjɛ̃]',  pt: 'o dele / o dela (masc. sing.)' },
              { fr: 'la sienne',   ipa: '[la sjɛn]',  pt: 'a dele / a dela (fem. sing.)' },
              { fr: 'les siens',   ipa: '[le sjɛ̃]',  pt: 'os dele / os dela (masc. pl.)' },
              { fr: 'les siennes', ipa: '[le sjɛn]',  pt: 'as dele / as dela (fem. pl.)' },
              { fr: 'le nôtre',    ipa: '[lə notʁ]', pt: 'o nosso (masc. sing.)' },
              { fr: 'la nôtre',    ipa: '[la notʁ]', pt: 'a nossa (fem. sing.)' },
              { fr: 'les nôtres',  ipa: '[le notʁ]', pt: 'os nossos / as nossas' },
              { fr: 'le vôtre',    ipa: '[lə votʁ]', pt: 'o seu de vocês (masc. sing.)' },
              { fr: 'la vôtre',    ipa: '[la votʁ]', pt: 'a sua de vocês (fem. sing.)' },
              { fr: 'les vôtres',  ipa: '[le votʁ]', pt: 'os seus / as suas de vocês' },
              { fr: 'le leur',     ipa: '[lə lœʁ]', pt: 'o dele / o dela (masc. sing.) — pronome' },
              { fr: 'la leur',     ipa: '[la lœʁ]', pt: 'a dele / a dela (fem. sing.) — pronome' },
              { fr: 'les leurs',   ipa: '[le lœʁ]', pt: 'os deles / as delas — pronome plural' }
            ]
          },
          {
            label: 'Quando usar',
            explanation: 'Substituem um sintagma "adjetivo possessivo + nome" para evitar repetição, ou quando o nome já foi mencionado.',
            examples: [
              { fr: "C'est mon livre, et c'est le tien. (É meu livro, e é o teu.)" },
              { fr: 'Notre maison est plus grande que la vôtre. (Nossa casa é maior que a de vocês.)' },
              { fr: 'Mes parents et les siens. (Meus pais e os dele / dela.)' },
              { fr: 'Ses idées sont meilleures que les nôtres. (As ideias dele/dela são melhores que as nossas.)' }
            ]
          },
          {
            label: 'Pronome vs adjetivo possessivo',
            explanation: 'Adjetivo possessivo (mon, ton, son...) ACOMPANHA o nome. Pronome possessivo (le mien) SUBSTITUI o sintagma "adj + nome".',
            examples: [
              { fr: "Voici mon stylo. (Aqui está minha caneta.) — adjetivo" },
              { fr: 'Le mien est sur la table. (A minha [caneta] está na mesa.) — pronome' },
              { fr: "Tu aimes tes chaussures. (Você gosta das tuas calças.) — adjetivo" },
              { fr: "Je préfère les tiennes. (Prefiro as tuas.) — pronome" }
            ]
          },
          {
            label: 'Com a preposição "à"',
            explanation: 'Forma muito comum no francês falado para dizer "este livro é meu / teu / dele".',
            examples: [
              { fr: 'Ce livre est à moi. (Este livro é meu.)' },
              { fr: "C'est à toi ? (É teu?)" },
              { fr: "Ce n'est pas à moi, c'est à lui. (Não é meu, é dele.)" },
              { fr: 'Une amie à moi. (Uma amiga minha.)' }
            ]
          },
          {
            label: 'Atenção: "leur" pronome (singular) × "leur" adjetivo (plural)',
            explanation: 'O pronome "le leur" está no singular mesmo quando se refere a várias coisas — a concordância é com o nome SUBSTITUÍDO, não com o número de donos.',
            examples: [
              { fr: "C'est leur livre. (É o livro deles.) — adjetivo, plural" },
              { fr: 'C\'est le leur. (É o deles.) — pronome, masc. sing.' },
              { fr: 'Ce sont leurs affaires. (São os assuntos deles.) — adjetivo' },
              { fr: 'Ce sont les leurs. (São os deles.) — pronome plural' }
            ]
          },
          {
            label: 'Pratique — complete com o pronome correto',
            explanation: 'Substitua o sintagma "adjetivo possessivo + nome" pelo pronome possessivo. Pense no GÊNERO e NÚMERO da coisa possuída (não do dono).',
            examples: [
              { fr: "C'est ma voiture, et c'est aussi la ___.",                         blank: 'tienne',  hint: 'tua (fem. sing., 2ª pes.)' },
              { fr: "J'ai mon livre. Et toi, tu as le ___?",                              blank: 'tien',    hint: 'teu (masc. sing., 2ª pes.)' },
              { fr: "Voici mon idée. Et ___ ?",                                          blank: 'la sienne', hint: 'a dele/dela (fem. sing., 3ª pes.)' },
              { fr: "Nous avons nos enfants, et ils ont ___.",                            blank: 'les leurs', hint: 'os deles (masc. pl., 3ª pes. pl.)' },
              { fr: "Ma maison est petite, mais ___ est grande.",                         blank: 'la nôtre', hint: 'a nossa (fem. sing., 1ª pes. pl.)' },
              { fr: "Tes gâteaux sont bons, mais ___ sont meilleurs.",                    blank: 'les miens', hint: 'os meus (masc. pl., 1ª pes. sing.)' },
              { fr: "Son sac est noir, et ___ est rouge.",                                blank: 'le sien',   hint: 'o dele/dela (masc. sing., 3ª pes.)' },
              { fr: "Mes clés sont perdues. Et les ___ ?",                                blank: 'tiennes',   hint: 'as tuas (fem. pl., 2ª pes.)' },
              { fr: "Ce livre est à ___ ?",                                               blank: 'toi',       hint: 'tu (forma com "à")' },
              { fr: "C'est votre voiture ? Non, ce n'est pas la ___.",                    blank: 'nôtre',     hint: 'nossa (fem. sing., 1ª pes. pl.)' }
            ]
          }
        ]
      }
    ]
  },

  B1: {
    color: '#f59e0b',
    label: 'B1',
    title: 'Intermediário — narrativa e opinião',
    desc: 'Plus-que-parfait, condicional passado, subjonctif (intro), discurso indireto, pronomes relativos.',
    topics: [
      {
        id: 'b1-pqp',
        title: 'Plus-que-parfait',
        summary: 'O "passado do passado". Ação anterior a outra ação passada.',
        rules: [
          {
            label: 'Formação com avoir e être',
            explanation: 'Mesmo padrão do passé composé, mas com o auxiliar no imperfeito.',
            examples: [
              { fr: "J'avais déjà mangé quand il est arrivé. (Eu já tinha comido quando ele chegou.)" },
              { fr: 'Elle était déjà partie quand j\'ai téléphoné. (Ela já tinha saído quando telefonei.)' },
              { fr: 'Nous avions vu ce film l\'année dernière. (Tínhamos visto este filme no ano passado.)' },
              { fr: 'Tu avais dit que tu viendrais. (Você tinha dito que viria.)' }
            ]
          },
          {
            label: 'Participios irregulares comuns (revisão)',
            explanation: 'Os mesmos do passé composé, valem para o plus-que-parfait.',
            examples: [
              { fr: 'eu, été, fait, pris, mis, dit, écrit, vu, pu, voulu, su, dû, connu, ouvert, bu, mort, né, allé, venu, parti' }
            ]
          },
          {
            label: 'Uso: "antes do que"',
            explanation: 'Use quando uma ação passada aconteceu antes de outra.',
            examples: [
              { fr: "Quand je suis arrivé, il était déjà parti. (Quando cheguei, ele já tinha saído.)" },
              { fr: "Si j'avais su, je t'aurais aidé. (Se eu tivesse sabido, teria te ajudado.)" }
            ]
          }
        ]
      },
      {
        id: 'b1-cond-passe',
        title: 'Condicional passado (formação)',
        summary: 'Para hipóteses irreais no passado e relatos indiretos.',
        rules: [
          {
            label: 'Formação',
            explanation: 'Auxiliar avoir/être no condicional presente + participio passado.',
            examples: [
              { fr: "J'aurais mangé (Eu teria comido)" },
              { fr: "Tu serais allé (Tu terias ido)" },
              { fr: 'Il aurait fini (Ele teria terminado)' },
              { fr: 'Nous serions partis (Nós teríamos saído)' },
              { fr: 'Elles auraient vu (Elas teriam visto)' }
            ]
          },
          {
            label: 'Uso 1: hipótese irreal no passado (si + plus-que-parfait)',
            explanation: 'Pluperfect + conditional passé = unreal past hypothesis.',
            examples: [
              { fr: "Si j'avais su, je t'aurais dit. (Se eu tivesse sabido, teria dito a você.)" },
              { fr: "Si tu avais étudié, tu aurais réussi. (Se tivesse estudado, teria passado.)" },
              { fr: "Si nous étions partis plus tôt, nous serions arrivés à l'heure. (Se tivéssemos saído mais cedo, teríamos chegado na hora.)" }
            ]
          },
          {
            label: 'Uso 2: discurso indireto no passado',
            explanation: 'Quando relatamos algo que alguém disse.',
            examples: [
              { fr: "Il a dit qu'il viendrait demain. (Ele disse que viria amanhã.)" },
              { fr: "Elle m'a dit qu'elle avait perdu ses clés. (Ela me disse que tinha perdido as chaves.)" },
              { fr: "Je savais qu'il pleuvrait. (Eu sabia que choveria.)" }
            ]
          }
        ]
      },
      {
        id: 'b1-subj',
        title: 'Subjonctif présent — primeiras impressões',
        summary: 'Modo para expressar dúvida, desejo, emoção e opinião pessoal.',
        rules: [
          {
            label: 'Quando usar',
            explanation: 'Após certas conjunções ou verbos de opinião, desejo, dúvida.',
            examples: [
              { fr: "Il faut que tu viennes. (É preciso que você venha.)" },
              { fr: 'Je veux que tu sois heureux. (Eu quero que você seja feliz.)' },
              { fr: "Je doute qu'il puisse venir. (Eu duvido que ele possa vir.)" },
              { fr: "Il est important que nous étudiions. (É importante que nós estudemos.)" }
            ]
          },
          {
            label: 'Conjunções comuns que pedem subjonctif',
            explanation: 'Após estas conjunções, o verbo no subjonctif é obrigatório.',
            examples: [
              { fr: 'bien que (embora)' },
              { fr: 'pour que (para que)' },
              { fr: 'afin que (a fim que) + subjonctif' },
              { fr: 'avant que (antes que) + subjonctif' },
              { fr: 'sans que (sem que) + subjonctif' },
              { fr: 'à moins que (a menos que) + subjonctif' },
              { fr: 'pourvu que (tomara que / contanto que) + subjonctif' },
              { fr: 'avant que (antes que)' }
            ]
          },
          {
            label: 'Verbos comuns que pedem subjonctif',
            explanation: 'Quando o sujeito é diferente.',
            examples: [
              { fr: 'vouloir que (querer que)' },
              { fr: 'désirer que (desejar que)' },
              { fr: "souhaiter que (desejar que)" },
              { fr: 'préférer que (preferir que)' },
              { fr: 'exiger que (exigir que)' },
              { fr: 'ordonner que (ordenar que)' },
              { fr: 'permettre que (permitir que) — só com sentido de "autorizar"' },
              { fr: 'interdire que (proibir que)' },
              { fr: 'douter que (duvidar que)' },
              { fr: 'il faut que (é preciso que)' },
              { fr: 'il est important que (é importante que)' },
              { fr: 'il est nécessaire que (é necessário que)' },
              { fr: 'il vaut mieux que (é melhor que)' }
            ]
          }
        ]
      },
      {
        id: 'b1-relatifs',
        title: 'Pronomes relativos simples (qui, que, où, dont)',
        summary: 'Conectam duas frases substituindo um nome repetido.',
        rules: [
          {
            label: 'Qui (sujeito)',
            explanation: 'Substitui o sujeito da segunda frase.',
            examples: [
              { fr: "J'ai un ami qui habite à Paris. (Eu tenho um amigo que mora em Paris.)" },
              { fr: "Elle cherche un livre qui parle d'histoire. (Ela procura um livro que fala de história.)" }
            ]
          },
          {
            label: 'Que (COD)',
            explanation: 'Substitui o COD da segunda frase.',
            examples: [
              { fr: "Le livre que je lis est passionnant. (O livro que leio é apaixonante.)" },
              { fr: "Les amis que j'ai invités sont là. (Os amigos que convidei estão aqui.)" }
            ]
          },
          {
            label: 'Où (lugar / tempo)',
            explanation: 'Substitui um lugar ou momento.',
            examples: [
              { fr: "La ville où j'habite est belle. (A cidade onde moro é bonita.)" },
              { fr: "Le jour où je suis arrivé, il pleuvait. (No dia em que cheguei, chovia.)" }
            ]
          },
          {
            label: 'Dont (de + coisa)',
            explanation: 'Substitui um complemento com "de".',
            examples: [
              { fr: "Le livre dont je parle est intéressant. (O livro do qual falo é interessante.)" },
              { fr: "La femme dont vous avez vu le fils est médecin. (A mulher cujo filho você viu é médica.)" }
            ]
          }
        ]
      },
{
        id: 'b1-disc-ind',
        title: 'Discurso indireto no presente',
        summary: 'Quando relatamos o que alguém disse.',
        rules: [
          {
            label: 'Verbos introdutores',
            explanation: 'dire que, répondre que, demander si, expliquer que, etc.',
            examples: [
              { fr: 'dire (dizer)' },
              { fr: 'répondre (responder)' },
              { fr: 'demander si (perguntar se)' },
              { fr: 'expliquer (explicar)' },
              { fr: 'penser que (achar que)' }
            ]
          },
          {
            label: 'Transformação dos tempos (presente → passado)',
            explanation: 'Verbos que indicam mudanças de tempo.',
            examples: [
              { fr: 'Présent → Imparfait (ação habitual): "Je mange" → "Il a dit qu\'il mangeait"' },
              { fr: 'Passé composé → Plus-que-parfait: "J\'ai mangé" → "Il a dit qu\'il avait mangé"' },
              { fr: 'Futur → Conditionnel présent: "Je mangerai" → "Il a dit qu\'il mangerait"' }
            ]
          }
        ]
      },
      {
        id: 'b1-passive',
        title: 'Voix passive — formação e usos',
        summary: 'Quando o sujeito sofre a ação em vez de praticá-la.',
        rules: [
          {
            label: 'Formação',
            explanation: 'Sujeito + verbo être no tempo desejado + participio passado.',
            examples: [
              { fr: 'Présent: Le gâteau est mangé par Paul. (O bolo é comido por Paulo.)' },
              { fr: 'Passé composé: La maison a été vendue. (A casa foi vendida.)' },
              { fr: 'Futur: Le livre sera publié demain. (O livro será publicado amanhã.)' }
            ]
          },
          {
            label: 'Quando usar',
            explanation: 'Quando o agente é óbvio, desconhecido ou irrelevante.',
            examples: [
              { fr: 'Ici, on parle français. (Aqui, fala-se francês.)' },
              { fr: 'Le pont a été construit en 1900. (A ponte foi construída em 1900.)' },
              { fr: 'Les voleurs ont été arrêtés. (Os ladrões foram presos.)' }
            ]
          }
        ]
      },
      {
        id: 'b1-verbos-pronominais',
        title: 'Verbos pronominais nos tempos compostos',
        summary: 'Verbos com "se" mantêm o pronome sempre.',
        rules: [
          {
            label: 'No passé composé com être',
            explanation: 'Verbos pronominais usam être + participio concorda em gênero/número com o sujeito.',
            examples: [
              { fr: "s'appeler (se chamar) → Je me suis appelé / appelée (chamou-se)", pt: 'eu me chamo' },
              { fr: 'se lever (se levantar) → Elle s\'est levée tôt. (Ela se levantou cedo.)' },
              { fr: 'se coucher (se deitar) → Nous nous sommes couchés. (Nós nos deitamos.)' },
              { fr: 'se réveiller (acordar-se) → Ils se sont réveillés. (Eles acordaram.)' },
              { fr: "s'habituer (habituar-se) → Je me suis habitué. (Eu me habituei.)" }
            ]
          },
          {
            label: 'Concordância do participio (passé composé)',
            explanation: 'Com être: o participio concorda com o sujeito (masc/fem, sing/plu).',
            examples: [
              { fr: 'Elle s\'est réveillée (feminino singular) — Elle s\'est réveillée' },
              { fr: 'Elles se sont parlé (verbo sem COD direto: invariável)' },
              { fr: 'Ils se sont téléphoné (verbo sem COD direto: invariável)' },
              { fr: 'Elle s\'est lavé les mains (COD = les mains, feminino plural: lavé → lavés)' },
              { fr: 'Ils se sont rencontrés (plural masculino) → Ils se sont rencontrés' }
            ]
          },
          {
            label: 'No condicional presente e passé',
            explanation: 'Verbo pronominal + condicional mantém "se".',
            examples: [
              { fr: 'Je voudrais me reposer. (Eu gostaria de descansar.)' },
              { fr: 'Elle se serait lavée les cheveux. (Ela teria lavado o cabelo.)' },
              { fr: 'Nous nous serions rencontrés plus tôt. (Teríamos nos encontrado mais cedo.)' }
            ]
          },
          {
            label: 'No subjonctif',
            explanation: 'Mesma regra — pronome antes do verbo.',
            examples: [
              { fr: 'Il faut que je me réveille tôt. (Preciso me acordar cedo.)' },
              { fr: "Je doute qu'elle s'habitue vite. (Eu duvido que ela se habitue rápido.)" }
            ]
          },
          {
            label: 'Lista dos pronominais mais comuns',
            explanation: 'Vale memorizar:',
            examples: [
              { fr: "s'appeler (chamar-se), se lever (levantar-se), se coucher (deitar-se)" },
              { fr: "se réveiller (acordarse), s'habiller (vestir-se), se déshabiller (despir-se)" },
              { fr: "se laver (lavar-se), se doucher (tomar banho), se brosser les dents (escovar os dentes)" },
              { fr: "se regarder (olhar-se), se parler (conversar — reciprocidade), se rencontrer (encontrar-se)" },
              { fr: "se connaître (conhecer-se), se comprendre (entender-se), s'entendre (entender-se / ouvir-se)" },
              { fr: "s'intéresser à (interessar-se por), s'occuper de (ocupar-se de), se souvenir de (lembrar-se de)" },
              { fr: "se tromper (enganar-se), se dépêcher (apressar-se), s'arrêter (parar)" },
              { fr: "se reposer (descansar), se marier (casar-se), se disputer (disputar)" },
              { fr: "se rencontrer (encontrar-se), se quitter (deixar-se), se perdre (perder-se)" }
            ]
          }
        ]
      },
      {
        id: 'b1-concordancia',
        title: 'Concordância dos tempos (résumé)',
        summary: 'Quando há duas ações, a relação temporal define o tempo da segunda.',
        rules: [
          {
            label: 'Presente + futuro (verdade geral / futuro)',
            explanation: 'Se a principal está no présent, a subordinada pode ir no futur simple.',
            examples: [
              { fr: 'Je sais qu\'il viendra demain. (Eu sei que ele virá amanhã.)' },
              { fr: 'Il dit qu\'il part à 18h. (Ele diz que parte às 18h.)' }
            ]
          },
          {
            label: 'Passé composé + plus-que-parfait (anterioridade)',
            explanation: 'Ação anterior à outra no passado.',
            examples: [
              { fr: 'Quand je suis arrivé, il était déjà parti. (Quando cheguei, ele já tinha saído.)' },
              { fr: 'J\'ai mangé après que tu avais terminé. (Comi depois que tinhas terminado.)' }
            ]
          },
          {
            label: 'Passé composé + imparfait (cenário + evento)',
            explanation: 'Cenário em andamento vs evento que interrompe.',
            examples: [
              { fr: 'Il pleuvait quand je suis sorti. (Chovia quando saí.)' },
              { fr: 'Nous mangions quand le téléphone a sonné. (Comíamos quando o telefone tocou.)' }
            ]
          },
          {
            label: 'Si + imparfait → présent (hipótese real)',
            explanation: 'Se ... condicional, descreve situações habituais ou reais.',
            examples: [
              { fr: 'Si j\'ai le temps, je viens. (Se tenho tempo, venho.)' },
              { fr: "S'il pleut, je prends un parapluie. (Se chove, levo guarda-chuva.)" }
            ]
          },
          {
            label: 'Si + plus-que-parfait → conditionnel passé (hipótese irreal)',
            explanation: 'Si + Pluperfect no si, condicional passé na principal.',
            examples: [
              { fr: 'Si j\'avais su, je t\'aurais dit. (Se tivesse sabido, teria dito a você.)' },
              { fr: 'Si tu avais étudié, tu aurais réussi. (Se tivesse estudado, teria passado.)' }
            ]
          },
          {
            label: 'Quand / dès que / aussitôt que + présent → futur',
            explanation: 'Expressões de tempo com présent pedem futur na subordinada.',
            examples: [
              { fr: 'Quand j\'arriverai, je t\'appellerai. (Quando chegar, te ligarei.)' },
              { fr: 'Dès qu\'il viendra, nous partirons. (Assim que ele vier, partiremos.)' },
              { fr: 'Aussitôt qu\'il aura fini, il partira. (Assim que terminar, partirá.)' }
            ]
          }
        ]
      }
    ]
  },

  B2: {
    color: '#ef4444',
    label: 'B2',
    title: 'Avançado — nuances e textos ricos',
    desc: 'Subjonctif completo, condicional passado avançado, relativas avançadas, conotações.',
    topics: [
      {
        id: 'b2-subj-complete',
        title: 'Subjonctif présent — formação completa',
        summary: 'O modo mais difícil, mas essencial para nuance.',
        rules: [
          {
            label: 'Formação regular',
            explanation: 'Para verbos do 1ᵉʳ (-er) e 2ᵉ (-ir) grupo: radical ils (3ª pessoa plural) + -e, -es, -e, -ions, -iez, -ent.',
            examples: [
              { fr: 'que je parle (que eu fale)' },
              { fr: 'que tu finisses (que tu termines)' },
              { fr: "qu'il vende (que ele venda)" },
              { fr: 'que nous parlions (que nós falemos)' },
              { fr: 'que vous finissiez (que vocês terminem)' },
              { fr: "qu'ils vendent (que eles vendam)" }
            ]
          },
          {
            label: 'Verbos irregulares comuns',
            explanation: 'Vale memorizar — eles são muito frequentes.',
            examples: [
              { fr: 'être → que je sois' },
              { fr: 'avoir → que j\'aie' },
              { fr: 'aller → que j\'aille' },
              { fr: 'faire → que je fasse' },
              { fr: 'pouvoir → que je puisse' },
              { fr: 'vouloir → que je veuille' },
              { fr: 'savoir → que je sache' },
              { fr: 'devoir → que je doive' },
              { fr: 'falloir → qu\'il faille' },
              { fr: 'valoir → que je vaille' },
              { fr: 'venir → que je vienne' },
              { fr: 'tenir → que je tienne' },
              { fr: 'prendre → que je prenne' },
              { fr: 'mettre → que je mette' },
              { fr: 'savoir → que je sache' },
              { fr: 'connaître → que je connaisse' },
              { fr: 'voir → que je voie' },
              { fr: 'devoir → que je doive' },
              { fr: 'savoir → que je sache' },
              { fr: 'croire → que je croie' },
              { fr: 'voir → que je voie' }
            ]
          },
          {
            label: 'Mais usos',
            explanation: 'Para exprimir sentimentos, opinião pessoal, julgamento.',
            examples: [
              { fr: "Bien que je sois fatigué, je continue. (Embora esteja cansado, continuo.)" },
              { fr: "Je suis ravi que tu puisses venir. (Fico feliz que possa vir.)" },
              { fr: "Il est dommage qu'il ne soit pas venu. (É uma pena que ele não tenha vindo.)" },
              { fr: "Quoi que vous fassiez, ne lâchez pas. (Faça o que fizer, não desista.)" }
            ]
          }
        ]
      },
      {
        id: 'b2-subj-passe',
        title: 'Subjonctif passé',
        summary: 'Para ações terminadas antes de outra no subjuntivo.',
        rules: [
          {
            label: 'Formação',
            explanation: 'Auxiliar avoir/être no subjonctif présent + participio passado.',
            examples: [
              { fr: "que j'aie fait (que eu tenha feito)" },
              { fr: "que tu sois allé (que tu tenhas ido)" },
              { fr: "qu'il ait fini (que ele tenha terminado)" },
              { fr: "que nous ayons vu (que nós tenhamos visto)" },
              { fr: "qu'elles soient parties (que elas tenham saído)" }
            ]
          },
          {
            label: 'Uso',
            explanation: 'Ações concluídas antes de outra, em contexto subjuntivo.',
            examples: [
              { fr: "Je doute qu'il ait menti. (Eu duvido que ele tenha mentido.)" },
              { fr: "C'est dommage que tu ne sois pas venu. (É uma pena que não tenhas vindo.)" },
              { fr: "Je suis content que vous ayez réussi. (Estou feliz que tenham passado.)" }
            ]
          }
        ]
      },
      {
        id: 'b2-relatif-avance',
        title: 'Pronomes relativos avançados',
        summary: 'Para retomar um antecedente com preposição ou indicar escolha.',
        rules: [
          {
            label: 'Lequel, laquelle, lesquels, lesquelles',
            explanation: 'Use com preposição ou para evitar ambiguidade.',
            examples: [
              { fr: "Le stylo avec lequel j'écris (A caneta com a qual eu escrevo)" },
              { fr: "La raison pour laquelle il est parti (A razão pela qual ele partiu)" },
              { fr: 'Les amis chez lesquels je suis allé (Os amigos em cuja casa eu fui)' }
            ]
          },
          {
            label: 'Auquel, duquel (com à ou de)',
            explanation: 'Formas contraídas de "à" + lequel / "de" + lequel.',
            examples: [
              { fr: 'Le projet auquel je pense (O projeto no qual penso)' },
              { fr: "L'outil dont il s'est servi (A ferramenta da qual se serviu) — vs" },
              { fr: "L'outil duquel il s'est servi (forma alternativa)" }
            ]
          },
          {
            label: 'Quoi (após preposição)',
            explanation: 'Em expressões fixas.',
            examples: [
              { fr: "Il n'y a rien à quoi s'accrocher. (Não há nada a que se agarrar.)" },
              { fr: 'Voici de quoi je parlais. (É disso que eu falava.)' },
              { fr: 'Ce en quoi je crois (Isso em que acredito)' }
            ]
          }
        ]
      },
      {
        id: 'b2-passe-simple',
        title: 'Passé simple — uso literário',
        summary: 'Tempo narrativo literário, raro na fala, comum em livros.',
        rules: [
          {
            label: 'Formação regular',
            explanation: 'Para verbos do 1ᵉʳ grupo: radical + -ai, -as, -a, -âmes, -âtes, -èrent.',
            examples: [
              { fr: 'Je parlai (Eu falei)' },
              { fr: 'Tu parlas' },
              { fr: 'Il parla' },
              { fr: 'Nous parlâmes' },
              { fr: 'Vous parlâtes' },
              { fr: 'Ils parlèrent' }
            ]
          },
          {
            label: 'Verbos irregulares comuns',
            explanation: 'Alguns dos mais usados.',
            examples: [
              { fr: 'être → je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent' },
              { fr: 'avoir → j\'eus, tu eus, il eut...' },
              { fr: 'aller → j\'allai, tu allas, il alla...' },
              { fr: 'faire → je fis, tu fis, il fit...' },
              { fr: 'venir → je vins, tu vins, il vint...' },
              { fr: 'tenir → je tins...' },
              { fr: 'prendre → je pris...' },
              { fr: 'mettre → je mis...' },
              { fr: 'voir → je vis...' },
              { fr: 'pouvoir → je pus...' },
              { fr: 'vouloir → je voulus...' },
              { fr: 'savoir → je sus...' },
              { fr: 'devoir → je dus...' },
              { fr: 'mourir → je mourus...' }
            ]
          }
        ]
      },
      {
        id: 'b2-conj-avanc',
        title: 'Conectores avançados',
        summary: 'Para textos argumentativos, ensaísticos, profissionais.',
        rules: [
          {
            label: 'Causa refinada',
            examples: [
              { fr: 'du fait de (por causa de)' },
              { fr: 'en raison de (em razão de)' },
              { fr: 'du fait que (pelo fato de que) + indicativo' },
              { fr: 'étant donné que (dado que) + indicativo' }
            ]
          },
          {
            label: 'Consequência forte',
            examples: [
              { fr: 'par conséquent (por conseguinte)' },
              { fr: 'en conséquence (em consequência)' },
              { fr: 'si bien que (de modo que) + indicativo' },
              { fr: 'tellement... que (tão... que)' },
              { fr: 'au point que (a ponto de)' }
            ]
          },
          {
            label: 'Concessão / oposição',
            examples: [
              { fr: 'bien que (embora) + subjonctif' },
              { fr: 'quoique (embora) + subjonctif' },
              { fr: 'même si (mesmo se) + indicativo' },
              { fr: 'alors que (enquanto que) + indicativo' },
              { fr: 'tandis que (enquanto que) + indicativo' },
              { fr: 'malgré (apesar de) + nome' },
              { fr: 'en dépit de (em dépit de) + nome' }
            ]
          },
          {
            label: 'Condição / hipótese',
            examples: [
              { fr: 'à condition que (sob a condição que) + subjonctif' },
              { fr: 'à moins que (a menos que) + subjonctif' },
              { fr: 'pourvu que (contanto que) + subjonctif' },
              { fr: 'en admettant que (admitindo que) + subjonctif' },
              { fr: 'au cas où (no caso de) + conditionnel' },
              { fr: 'à condition de + infinitif (sob a condição de)' }
            ]
          },
          {
            label: 'Finalidade avançada',
            examples: [
              { fr: 'afin que (a fim que) + subjonctif' },
              { fr: 'pour que (para que) + subjonctif' },
              { fr: 'de peur que (por medo que) + subjonctif' },
              { fr: 'de crainte que (por receio que) + subjonctif' },
              { fr: 'en vue de (a fim de) + infinitif / nome' }
            ]
          }
        ]
      },
      {
        id: 'b2-liaison-avanc',
        title: 'Liaisons obrigatórias e proibidas — visão completa',
        summary: 'Quando a consoante final é ligada (e pronúncia alterada) ou não.',
        rules: [
          {
            label: 'Liaisons obrigatórias',
            explanation: 'Sempre pronunciar entre palavras.',
            examples: [
              { fr: 'les, des → [z] antes de vogal: les amis = le-zami' },
              { fr: 'est, et → [t]: il est ici = ilè-tici' },
              { fr: 'nous, vous → [z]: nous avons = nu-zavõ' },
              { fr: 'ils, elles → [z]: ils ont = il-zõ' },
              { fr: 'un, on → [n]: un homme = œ-nom (ligado a h aspirado de palavra começando com h)' }
            ]
          },
          {
            label: 'Liaisons proibidas (em francês padrão)',
            explanation: 'Após singular masculino, depois de conjunção "et", depois de nasal, após pronome invertido.',
            examples: [
              { fr: 'un ami (sem ligação → œ-na-mi, NÃO un-nami)' },
              { fr: 'un homme (sem ligação com h aspirado → œ-nom)' },
              { fr: 'un haricot (h aspirado: œ-a-ri-co, NUNCA œ-na-ri-co)' },
              { fr: 'et Pierre, et Annie (sem ligação, pronunciado separado)' },
              { fr: 'mon ami (sem ligação → mõ-na-mi)' },
              { fr: 'son ami (sem ligação → sõ-na-mi)' },
              { fr: 'ton ami (sem ligação → tõ-na-mi)' },
              { fr: 'aimé et Annette (sem ligação: ai-mê-e-a-net, NUNCA ai-mê-ta-net)' },
              { fr: 'vingt ans [vẽ-tã] (NUNCA [vẽ-tã])' },
              { fr: 'comment allez-vous [ko-mã-ta-le-vu] (NUNCA ko-mã-ta-le-vu)' }
            ]
          },
          {
            label: 'Casos especiais',
            explanation: 'Onde a regra muda ou onde a pronúncia é diferente da escrita.',
            examples: [
              { fr: 'dix ans [di-zã] (sempre ligado quando plural — liaison obrigatória)' },
              { fr: 'vingt et un [vẽ-te-œ̃] (sem ligação)' },
              { fr: 'vingt-deux [vẽ-dø] (sem ligação)' },
              { fr: 'les deux [le-dø] (sem ligação)' },
              { fr: 'beaucoup de livres [bo-ku-dlivr] (sem ligação)' },
              { fr: 'beaucoup d\'amis [bo-ku-da-mi] (ligado)' },
              { fr: 'après tout [a-prɛ-tu] (sem ligação)' },
              { fr: 'tout à coup [tu-ta-ku] (sem ligação)' },
              { fr: 'tout homme [tu-tom] (sem ligação)' },
              { fr: 'tout petit [tu-pa-ti] (sem ligação)' },
              { fr: 'il est petit [i-lɛ-pa-ti] (ligado)' },
              { fr: 'pas encore [pa-zã-kɔr] (ligado)' },
              { fr: 'en haut [ã-o] (ligado)' },
              { fr: 'très élégant [trɛ-ze-le-gã] (ligado)' },
              { fr: 'beaucoup [bo-ku] (sem ligação)' }
            ]
          }
        ]
      },
      {
        id: 'b2-participio',
        title: 'Concordância do particípio passado',
        summary: 'Regras precisas para quando o particípio concorda com o sujeito / COD.',
        rules: [
          {
            label: 'Com avoir: concorda com o COD se anteposto',
            explanation: 'O COD (complemento de objeto direto) vem ANTES do verbo. Se vier depois, invariável.',
            examples: [
              { fr: 'Je les ai vus. (Eu os vi.) — COD "les" antes do verbo, particípio "vus" (plural)' },
              { fr: 'Je les ai vues. (Eu as vi.) — COD "les" antes, particípio "vues" (plural feminino)' },
              { fr: "J'ai vu les filles. (Vi as meninas.) — COD depois, particípio invariável" },
              { fr: 'Combien de pommes as-tu achetées ? (masc = achetés? Não — COD pommes (fem pl) = achetées)' },
              { fr: 'Les lettres que j\'ai écrites sont longues. (As cartas que escrevi são longas.) — COD antes = accord' }
            ]
          },
          {
            label: 'Com être: sempre concorda com o sujeito',
            explanation: 'Verbos conjugados com être (movimento, pronominais, voz passiva).',
            examples: [
              { fr: 'Elle est allée au marché. (Ela foi ao mercado.) — f. sing.' },
              { fr: 'Ils sont arrivés hier. (Eles chegaram ontem.) — m. pl.' },
              { fr: 'Elles sont devenues célèbres. (Elas se tornaram famosas.) — f. pl.' },
              { fr: 'La porte a été ouverte par le vent. (A porta foi aberta pelo vento.) — f. sing.' }
            ]
          },
          {
            label: 'Verbos sem COD direto (invariável)',
            explanation: 'Verbos intransitivos ou com COI (não COD) — sem alteração.',
            examples: [
              { fr: 'Ils se sont parlé au téléphone. (Eles conversaram por telefone.) — m. pl., "parlé" invariável' },
              { fr: 'Elles se sont téléphoné. (Elas se telefonaram.) — f. pl., "téléphoné" invariável' },
              { fr: 'Nous nous sommes plu dans cette ville. (Nós gostamos desta cidade.) — "plu" invariável (verbo plaisir, sem COD direto)' },
              { fr: 'Elle s\'est plu à lire. (Ela se deu bem lendo.) — invariável' }
            ]
          },
          {
            label: 'Falsos amigos (não concorda)',
            explanation: 'Verbos que parecem ter COD mas não.',
            examples: [
              { fr: 'plaire (agradar) → "Il m\'a plu" — "plu" invariável (verbo indireto)' },
              { fr: 'peser (pesar / pesar sobre) → "Les 3 kilos qu\'elle a pesé" — invariável se peso abstrato' },
              { fr: 'coûter (custar) → "Ces 10 euros que ça m\'a coûté" — invariável (verbo sem COD direto)' },
              { fr: 'vivre, mourir, partir, sortir, arriver — invariáveis com avoir/être' }
            ]
          }
        ]
      },
      {
        id: 'b2-conjugaison-avancee',
        title: 'Tempos e modos raros (literatura e estilo)',
        summary: 'Para leitura de clássicos e textos formais.',
        rules: [
          {
            label: 'Passé antérieur (literário)',
            explanation: 'Mesmo uso do passé composé, mas uma ação anterior a outra em narrativa formal.',
            examples: [
              { fr: 'Quand il eut fini, il sortit. (Quando ele terminou, saiu.) — literário' },
              { fr: 'Après qu\'il eut parlé, il se tut. (Depois que falou, calou-se.) — formal' }
            ]
          },
          {
            label: 'Futur antérieur (literário)',
            explanation: 'Futuro de uma ação anterior a outra futura.',
            examples: [
              { fr: "Quand j'aurai fini, je t'appellerai. (Quando eu terminar, te ligarei.)" },
              { fr: "Dès qu'il sera arrivé, nous dînerons. (Assim que ele chegar, jantaremos.)" }
            ]
          },
          {
            label: 'Plus-que-parfait du subjonctif (raro)',
            explanation: 'Ação passada dentro do subjuntivo.',
            examples: [
              { fr: "Il aurait fallu que tu eusses fini avant. (Teria sido preciso que tivesses terminado antes.)" },
              { fr: 'Je doutais qu\'il eût compris. (Eu duvidava que ele tivesse compreendido.) — arcaico' }
            ]
          },
          {
            label: 'Conditionnel passé 2ᵉ forme (literário)',
            explanation: 'Forma alternativa do condicional passado, em registros formais.',
            examples: [
              { fr: "J'eusse aimé (Eu teria gostado) — em vez de j'aurais aimé" },
              { fr: "Il eût fallu (Teria sido preciso) — em vez de il aurait fallu" },
              { fr: "S'il eût pu, il serait venu. (Se tivesse podido, teria vindo.)" }
            ]
          },
          {
            label: 'Formas em -ant (gerúndio / participio presente)',
            explanation: 'Formas raras em francês moderno, comuns em literatura.',
            examples: [
              { fr: "En arrivant (Chegando) — gérondif: en + participe présent" },
              { fr: 'Ayant fini (Tendo terminado) — participio presente absoluto' },
              { fr: 'Étant malade (Estando doente) — copulativo, evita "comme il est malade"' },
              { fr: 'Voyant cela, il partit. (Vendo isso, partiu.) — absoluto com sujeito diferente' }
            ]
          }
        ]
      },
      {
        id: 'b2-figures',
        title: 'Figuras de estilo e expressões idiomáticas',
        summary: 'Recursos para textos ricos e nuançados.',
        rules: [
          {
            label: 'Antítese',
            explanation: 'Oposição clara de ideias.',
            examples: [
              { fr: 'C\'est le meilleur et le pire moment. (É o melhor e o pior momento.)' },
              { fr: 'Il est riche mais malheureux. (Ele é rico mas infeliz.)' }
            ]
          },
          {
            label: 'Hipérbole',
            examples: [
              { fr: "Je meurs de faim ! (Estou morrendo de fome!)" },
              { fr: 'On a attendu pendant des heures ! (Esperamos durante horas!)' },
              { fr: "C'est le meilleur restaurant du monde ! (É o melhor restaurante do mundo!)" }
            ]
          },
          {
            label: 'Eufemismo',
            explanation: 'Suavizar uma ideia dura.',
            examples: [
              { fr: 'Il est parti (de son vivant). (Ele partiu — em vida, eufemismo para morreu.)' },
              { fr: 'Il nous a quittés. (Ele nos deixou — eufemismo para faleceu.)' },
              { fr: 'Il a des problèmes d\'argent. (Ele tem problemas de dinheiro — eufemismo para é pobre.)' }
            ]
          },
          {
            label: 'Metáfora e comparação',
            examples: [
              { fr: 'C\'est un lion. (Ele é um leão — é corajoso.)' },
              { fr: 'Elle est aussi douce qu\'un agneau. (Ela é tão doce quanto um cordeiro.)' },
              { fr: 'Cette ville est un four. (Esta cidade é um forno.) — calor' },
              { fr: 'Son cœur est de pierre. (O coração dele é de pedra.) — insensível' }
            ]
          },
          {
            label: 'Pleonasmo (ênfase por repetição)',
            examples: [
              { fr: 'Je l\'ai vu de mes propres yeux. (Vi com meus próprios olhos.)' },
              { fr: 'Elle est entrée dedans. (Ela entrou dentro.) — ênfase' }
            ]
          },
          {
            label: 'Ironia',
            explanation: 'Dizer o oposto do que se quer dizer.',
            examples: [
              { fr: 'Ah bravo, tu as vraiment réussi ! (Ah bravo, você realmente conseguiu! — sarcasmo)' },
              { fr: "Quel temps magnifique ! (Que tempo magnífico! — quando chove)" }
            ]
          }
        ]
      }
    ]
  }
}

// Top-level ordering
export const LEVELS = ['A1', 'A2', 'B1', 'B2']