# French Succo

> Aplicativo web para aprendizado de francês com tradução automática,
> correção gramatical, transcrição fonética e pronúncia nativa via TTS.
> UI baseada em 4 telas (Dashboard, Histórico, Favoritos, Configurações)
> fielmente reproduzidas dos mockups.

## ✨ Funcionalidades

| Frente | Descrição |
|--------|-----------|
| **Tradução PT/EN → FR** | Detecção automática de idioma + tradução contextual usando `MiniMax-Text-01` |
| **Correção gramatical FR** | Mostra frase original, versão corrigida e lista de correções (`from` → `to` + explicação) |
| **Fonética** | Transcrição fonética em PT-BR (ex: `bõ-jur kõ-mã ta-le`) |
| **Dica cultural** | Curta observação sobre etiqueta/francês falado sempre que o modelo retorna |
| **Áudio (TTS)** | Síntese em MP3 via MiniMax T2A com voz masculina/feminina, velocidade e região configuráveis |
| **Histórico** | Lista cronológica com busca, filtro por categoria, favoritar inline |
| **Favoritos** | Tabela com tags de categoria, remoção por checkbox, prática dedicada |
| **Configurações** | Voz, velocidade, região (FR/QC/BÉ), toggles de UI, lembrete diário, conta |

---

## 🏗 Arquitetura

```
┌──────────────────────────────────────────────────────────────────┐
│  Browser (http://localhost:8080)                                │
└──────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│  nginx (reverse proxy, porta 8080)                              │
│   • /api/*  ─► backend:8080  (C# ASP.NET)                       │
│   • /       ─► frontend:80   (nginx + dist/ Vue)                │
│   • /healthz ─► backend/healthz                                  │
└──────────────────────────────────────────────────────────────────┘
        │                                          │
        ▼                                          ▼
┌────────────────────────┐                ┌────────────────────────┐
│  FRONTEND              │                │  BACKEND               │
│  Vue 3 + Vite          │                │  ASP.NET 8 + EF Core 8 │
│  Pinia (estado local)  │   HTTP/JSON    │  Npgsql ─► PostgreSQL │
│  Vue Router (SPA)      │ ─────────────► │  HttpClient ─► MiniMax│
└────────────────────────┘                └────────────────────────┘
                                                       │
                                                       ▼
                                              ┌────────────────┐
                                              │ PostgreSQL 16  │
                                              │ (volume pgdata)│
                                              └────────────────┘
```

### Containers

| Serviço        | Imagem                  | Função                                        | Porta interna |
|----------------|-------------------------|-----------------------------------------------|---------------|
| `postgres`     | `postgres:16-alpine`    | Banco relacional (history, favorites, settings)| 5432         |
| `backend`      | `french-succo-backend`  | API REST + integração MiniMax                 | 8080         |
| `frontend`     | `french-succo-frontend` | SPA estática servida por nginx (com cache)    | 80           |
| `nginx`        | `nginx:1.27-alpine`     | Reverse proxy público                          | 80 → 8080    |

Healthchecks em todos os serviços (`pg_isready`, `wget /healthz`).

---

## 📁 Estrutura de pastas

```
french-succo/
├── frontend/                       Vue 3 SPA
│   ├── src/
│   │   ├── components/             AppSidebar, AppTopbar, AppIcon
│   │   ├── pages/                  DashboardPage, HistoricoPage,
│   │   │                            FavoritosPage, ConfiguracoesPage
│   │   ├── router/index.js         Vue Router (history mode)
│   │   ├── stores/                 Pinia: settings, library (history+favs)
│   │   ├── services/api.js         fetch wrapper para /api/*
│   │   ├── assets/styles/main.css  tema + tokens de cor
│   │   ├── App.vue
│   │   └── main.js
│   ├── Dockerfile                  multi-stage node → nginx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── backend/                        ASP.NET Core 8 Web API
│   └── FrenchSucco.Api/
│       ├── Controllers/
│       │   ├── TranslationControllers.cs   POST /api/translate, /correct, GET /audio
│       │   └── LibraryControllers.cs      /history, /favorites, /settings, /stats
│       ├── Services/
│       │   ├── MiniMaxService.cs           cliente HTTP MiniMax
│       │   ├── TranslationService.cs       prompt + parser p/ tradução
│       │   ├── GrammarService.cs           prompt + parser p/ correção
│       │   ├── PhoneticService.cs          dicionário PT-BR
│       │   ├── TtsService.cs               wrapper de síntese
│       │   └── StatsService.cs             palavras / streak / precisão
│       ├── Data/AppDbContext.cs            EF Core → PostgreSQL
│       ├── Models/Entities.cs              TranslationItem, FavoriteItem, UserSettings
│       ├── Dtos/Dtos.cs                    records imutáveis p/ request/response
│       ├── Program.cs                      bootstrapping + DI + healthcheck
│       ├── appsettings.json                config default
│       └── Dockerfile                      multi-stage sdk → aspnet
│
├── nginx/
│   └── nginx.conf                 reverse-proxy (proxy_pass /api e /)
│
├── docker-compose.yml             orquestra os 4 serviços
├── .env.example                   template de variáveis
├── .gitignore
├── scripts/start.sh               helper: cp .env.example + up -d
└── README.md
```

---

## 🚀 Setup

### Pré-requisitos

- Docker 24+ com Compose v2
- Chave de API MiniMax (https://platform.minimax.io/user-center/basic-information/interface-key)

### Subir o ambiente

```bash
# 1) Clonar e entrar
cd french-succo

# 2) Copiar envs
cp .env.example .env

# 3) Editar e colocar a chave real
nano .env
#   MINIMAX_API_KEY=eyJ...

# 4) Subir tudo (build + containers + health checks)
./scripts/start.sh
# ou manualmente: docker compose up -d --build

# 5) Acessar
open http://localhost:8080
```

A primeira vez demora ~3 min (download imagens + build do .NET + npm install do frontend).
Subidas subsequentes são instantâneas.

### Verificar saúde

```bash
docker compose ps           # status + healthcheck
docker compose logs -f      # acompanhar logs
curl http://localhost:8080/healthz
# {"status":"ok","service":"french-succo-api"}
```

### Parar / limpar

```bash
docker compose down              # para containers, mantém volumes
docker compose down -v           # para + APAGA o banco (volume pgdata)
```

---

## ⚙️ Variáveis de ambiente

Carregadas a partir de `.env`. Espelhadas no `docker-compose.yml`:

| Variável               | Onde            | Descrição                                     | Padrão                       |
|------------------------|-----------------|-----------------------------------------------|------------------------------|
| `MINIMAX_API_KEY`      | backend         | **obrigatória** — bearer token                | —                            |
| `MINIMAX_BASE_URL`     | backend         | Base URL MiniMax                              | `https://api.minimax.io/v1`  |
| `MINIMAX_MODEL`        | backend         | Modelo de chat                                 | `MiniMax-Text-01`            |
| `MINIMAX_VOICE`        | backend         | Voice ID default (override por usuário)       | `audio_default`              |
| `POSTGRES_DB`          | postgres        | nome do banco                                 | `french_succo`               |
| `POSTGRES_USER`        | postgres        | usuário do banco                              | `succo`                      |
| `POSTGRES_PASSWORD`    | postgres        | senha do banco                                | `succo_secret`               |

As variáveis do backend são expostas ao container como
`MiniMax__ApiKey`, `MiniMax__BaseUrl`, etc. (double-underscore = seção no
`appsettings.json`).

---

## 🔌 Endpoints REST

Backend em `http://localhost:8080/api`. Respostas em JSON.

### `POST /api/translate`
```jsonc
// request
{ "text": "Onde fica o banheiro?", "sourceLang": "pt", "targetLang": "fr", "region": "fr" }

// response
{
  "sourceLang": "pt",
  "frText": "Où se trouve les toilettes ?",
  "phonetic": "u sã-truv le twa-let?",
  "translation": "Onde fica o banheiro?",
  "culturalTip": "Na França, banheiros públicos estão em estações e aeroportos.",
  "category": "Viagem"
}
```

### `POST /api/correct`
```jsonc
// request
{ "text": "Je veut commander un café, si vous plait", "region": "fr" }

// response
{
  "original": "Je veut commander un café, si vous plait",
  "corrected": "Je veux commander un café, s'il vous plaît",
  "phonetic": "je vø komãde um kafe sil vu plɛ",
  "corrections": [
    { "from": "veut",  "to": "veux",            "reason": "..." },
    { "from": "si vous plait", "to": "s'il vous plaît", "reason": "..." }
  ],
  "culturalTip": "Após receber algo, diga 'merci'."
}
```

### `GET /api/audio?text=...&voice=...&speed=...&region=...`
Retorna `audio/mpeg` (MP3). Vozes suportadas (map. via `MiniMaxService.MapVoice`):

| Voice param | FR (default)   | QC           | BE          |
|-------------|----------------|--------------|-------------|
| `female`    | `French_MovieLeadFemale` | `French_Female_News Anchor` | `French_FemaleAnchor` |
| `male`      | `French_MaleNarrator`    | `French_CasualMan`          | `French_Male_Speech_New` |

Velocidade: `0.5`–`2.0` (clamp aplicado).

```bash
curl -o audio.mp3 \
  "http://localhost:8080/api/audio?text=Bonjour&voice=female&speed=1.0&region=fr"
```

### `GET /api/history` · `POST /api/history` · `DELETE /api/history/{id}` · `DELETE /api/history`
Lista (max 100) / cria / remove item / limpa tudo. Ordena por `created_at DESC`.

### `GET /api/favorites` · `POST /api/favorites` · `DELETE /api/favorites/{id}`
Não permite duplicatas (mesmo `frText`). Retorna `409` se já favoritado.

### `GET /api/settings` · `PUT /api/settings`
Lê/grava `user_settings` (chave do user é `default` no MVP).

### `GET /api/stats`
```json
{ "wordsLearned": 4960, "streakDays": 15, "accuracy": 92 }
```

---

## 🧠 Como a integração MiniMax funciona

### Chat completions (`/v1/chat/completions`)

A `MiniMaxService` chama este endpoint com:
- **Modelo**: `MiniMax-Text-01` (configurável via `MINIMAX_MODEL`).
- **Body**: `{ model, messages: [{role:"system",...},{role:"user",...}], temperature: 0.3 }`.
- **Sem `response_format: json_object`** — esse parâmetro é OpenAI-only; o MiniMax
  retorna erro `2013 invalid params`. Aqui forçamos o JSON via system prompt
  e usamos `ExtractJson()` para limpar fences ` ```json ... ``` ` se o modelo
  os produzir.

Os serviços `TranslationService` e `GrammarService` constroem prompts pedindo
um JSON com um schema específico, depois desserializam em C#. Se falhar, há
**fallback** com resposta padrão (não quebra a UX).

### TTS — `/v1/t2a_v2` (NÃO `/audio/speech`!)

```http
POST https://api.minimax.io/v1/t2a_v2
Authorization: Bearer <API_KEY>
Content-Type: application/json

{
  "model": "speech-2.8-hd",
  "text": "Bonjour",
  "stream": false,
  "language_boost": "French",
  "output_format": "hex",
  "voice_setting": { "voice_id": "French_MovieLeadFemale", "speed": 1.0, "vol": 1, "pitch": 0 },
  "audio_setting": { "sample_rate": 32000, "bitrate": 128000, "format": "mp3", "channel": 1 }
}
```

Resposta:
```jsonc
{
  "data": { "audio": "49443304...<hex mp3>...", "status": 2 },
  "extra_info": { "audio_length": 11124, "audio_size": ..., "audio_format": "mp3" },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}
```

O backend decodifica o hex para bytes brutos e devolve `audio/mpeg`.

#### ⚠️ Pegadinhas descobertas durante integração

1. **`/audio/speech` é OpenAI-only**, retorna 404 no MiniMax.
2. **Vozes neurais Azure** (`fr-FR-DeniseNeural`) **não existem** no MiniMax.
   Vozes reais vêm do endpoint `/v1/get_voice` e seguem o padrão
   `French_<Nome>`.
3. **BaseAddress precisa terminar com `/`**. Sem isso, o `HttpClient`
   trata paths relativos como absolutos (`/t2a_v2` substitui `/v1/` do base).
4. **`response_format: json_object` é rejeitado** com erro 2013.
5. **Resposta TTS vem em hex**, não binário direto.

Tudo isso está documentado no `MiniMaxService.cs` e foi corrigido.

---

## 🎨 Frontend — como cada página funciona

### `/dashboard` — DashboardPage.vue

Componentes:
- **Hero gradiente azul** com botão "Começar Lição".
- **Switcher PT ⇄ FR** troca entre modo `translate` e `grammar`.
- **Textarea + contador** (max 500). Watcher heurístico detecta o idioma
  (`frMarkers`, `ptMarkers`) para mostrar "Detectado: PT/FR".
- **Botão "Traduzir agora" / "Corrigir Gramática"** chama `processText()`,
  que faz `POST /api/translate` ou `POST /api/correct`.
- **Botão "Ouvir Lento / Ouvir Normal"** chama `playAudio(speed)`,
  que seta `<audio>.src = /api/audio?...` e dá `.play()`.
- **Auto-play** dispara 350ms após o resultado se `settings.autoPlay = true`.
- **Stats** (palavras aprendidas / ofensiva / precisão) populados por
  `GET /api/stats`.
- **Erros** de API caem em `errorMsg` e renderizam em vermelho abaixo do textarea.

Estados do `result-card` (v-if chain):
```
v-if="!result && !loading"        → estado vazio inicial
v-else-if="loading"               → loader animado (3 pontinhos)
v-else-if="result"                → cartão com fonética, áudio, dica cultural
```

### `/historico` — HistoricoPage.vue

- Lê do **store Pinia** (`useHistoryStore.fetchAll`), que hidrata do
  localStorage como fallback offline.
- Filtros: `search` (substring em `frText`/`sourceText`) + `category` (Comum/Viagem/Estudo).
- Cada item tem botão de favoritar (estreia laranja se já favoritado) +
  menu kebab (`more`).
- "Limpar Tudo" remove tudo do store + localStorage + backend
  (`DELETE /api/history`).

### `/favoritos` — FavoritosPage.vue

- Tabela com checkbox circular azul (mesmo estilo do Figma).
- Remoção: checkbox ou pelo menu — chama `DELETE /api/favorites/{id}`.
- Banner CTA inferior aponta para "Começar Prática" (futuro módulo spaced-repetition).

### `/configuracoes` — ConfiguracoesPage.vue

- **Áudio:** voz (select), velocidade (slider 0.5x–2x com botões de tick),
  região (radio pills — França/Québec/Bélgica).
- **Interface:** 4 toggles (autoPlay, showPhonetic, highlightVerbs, hideExplanations).
- **Notificações:** lembrete diário + horário.
- **Conta:** cards para perfil e privacidade.
- Tudo persiste em `localStorage` + sincroniza com backend
  (`PUT /api/settings`) automaticamente via watcher.

### Persistência

| Dado              | Onde persiste                                |
|-------------------|-----------------------------------------------|
| Settings          | localStorage + `user_settings` no Postgres    |
| History           | localStorage (cliente) + `history` no Postgres |
| Favorites         | localStorage + `favorites` no Postgres        |

O backend cria o schema via `EnsureCreated()` no startup (sem migrations
no MVP). Para usar migrations depois: `dotnet ef migrations add Initial`.

---

## ⚡ Cache e CDN no nginx

O nginx do container `frontend` serve os assets com:

```nginx
location ~* \.(?:js|css|woff2?|ttf|svg|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
    try_files $uri =404;
}
location / {
    add_header Cache-Control "no-cache";
    try_files $uri $uri/ /index.html;
}
```

Como os assets Vue têm hash no nome (`index-Ts8XB4gr.js`), basta o
`<a href="/">` apontar para o índice novo (gerado a cada build) que o browser
busca automaticamente a nova versão. O usuário pode precisar dar **hard refresh**
(Ctrl/Cmd + Shift + R) na primeira vez após mudanças.

---

## 🛠 Stack

| Camada        | Tecnologia                                |
|---------------|--------------------------------------------|
| Frontend      | Vue 3, Vite, Vue Router 4, Pinia           |
| Áudio frontend| HTML5 `<audio>` element                   |
| Proxy / CDN   | nginx 1.27                                 |
| Backend       | C# 12, ASP.NET Core 8, EF Core 8          |
| DB driver     | Npgsql.EntityFrameworkCore.PostgreSQL     |
| IA texto      | MiniMax `/v1/chat/completions`             |
| IA voz        | MiniMax `/v1/t2a_v2`                      |
| Banco         | PostgreSQL 16                              |
| Orquestração  | Docker 24+, Compose v2                     |

---

## 📝 Desenvolvimento local sem Docker

```bash
# Backend
cd backend/FrenchSucco.Api
dotnet run                 # http://localhost:8080
# (precisa de Postgres rodando; export POSTGRES_CONNECTION=...)

# Frontend
cd frontend
npm install
npm run dev                # http://localhost:5173 (proxy de /api via vite.config.js)
```

---

## 🐛 Troubleshooting

**TTS retorna 502 imediatamente**
> Conferir logs: `docker compose logs backend | grep "MiniMax"`. Causas comuns:
> - `MINIMAX_API_KEY` vazia → preencha o `.env`.
> - Endpoint errado no source → use `/v1/t2a_v2`, nunca `/audio/speech`.

**Tradução sempre devolve a mesma frase (fallback)**
> Verifique a chave MiniMax com:
> ```bash
> curl -X POST https://api.minimax.io/v1/chat/completions \
>      -H "Authorization: Bearer $MINIMAX_API_KEY" \
>      -H "Content-Type: application/json" \
>      -d '{"model":"MiniMax-Text-01","messages":[{"role":"user","content":"ping"}]}'
> ```
> Resposta 200 → MiniMax ok. Resposta 401 → chave inválida.

**Página em branco após deploy**
> Cache do navegador segurando o `index.html` antigo. Hard refresh
> (Ctrl/Cmd+Shift+R) ou abrir em aba anônima.

**Container backend reiniciando em loop**
> Veja `docker compose logs backend`. Geralmente é falha ao conectar no
> Postgres (espere o healthcheck) ou `MINIMAX_API_KEY` faltando.

**Resetar banco (limpar histórico e favoritos)**
> ```bash
> docker compose down -v   # apaga o volume pgdata
> docker compose up -d
> ```

---

## 📄 Licença

MIT — uso livre para fins pessoais e comerciais.
