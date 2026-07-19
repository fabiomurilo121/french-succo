# French Succo

Aplicativo web para aprendizado de francês com tradução, correção gramatical,
transcrição fonética e pronúncia nativa. UI baseada nos 4 telas propostas
(dashboard, histórico, favoritos, configurações).

## Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│  Browser  (http://localhost:8080)                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  nginx  (reverse proxy)                                     │
│  - /api/*  → backend:8080                                   │
│  - /       → frontend:80 (Vue SPA)                          │
└─────────────────────────────────────────────────────────────┘
        │                               │
        ▼                               ▼
┌────────────────────┐         ┌──────────────────────────────┐
│ frontend (Vue 3)   │         │ backend (ASP.NET 8 + EF Core) │
│ nginx + vite build │         │ Controllers, Services         │
│ dist estático      │         │ Integração MiniMax API        │
└────────────────────┘         └──────────────────────────────┘
                                          │
                                          ▼
                                ┌──────────────────────────────┐
                                │ postgres:16 (volume pgdata)  │
                                └──────────────────────────────┘
```

## Stack

| Camada    | Tecnologia                              |
|-----------|-----------------------------------------|
| Frontend  | Vue 3, Vite, Vue Router 4, Pinia        |
| Proxy     | Nginx 1.27                              |
| Backend   | ASP.NET Core 8 Web API, EF Core, C#     |
| IA        | MiniMax (Chat Completions + TTS)        |
| Banco     | PostgreSQL 16                           |
| Orquestração | Docker, Docker Compose               |

## Estrutura

```
french-succo/
├── frontend/              Vue 3 SPA
│   ├── src/
│   │   ├── components/    AppSidebar, AppTopbar, AppIcon
│   │   ├── pages/         Dashboard, Histórico, Favoritos, Configurações
│   │   ├── router/
│   │   ├── stores/        Pinia (settings, history, favorites)
│   │   ├── services/      api.js (fetch wrapper)
│   │   └── assets/styles/
│   ├── Dockerfile
│   └── package.json
├── backend/               ASP.NET Core 8 Web API
│   └── FrenchSucco.Api/
│       ├── Controllers/   Translate, Correct, Audio, History, Favorites, Settings, Stats
│       ├── Services/      MiniMax, Translation, Grammar, Phonetic, TTS, Stats
│       ├── Models/        TranslationItem, FavoriteItem, UserSettings
│       ├── Data/          AppDbContext (EF Core)
│       ├── Dtos/
│       ├── Program.cs
│       ├── appsettings.json
│       └── Dockerfile
├── nginx/
│   └── nginx.conf         reverse proxy
├── docker-compose.yml
├── .env.example
└── scripts/
    └── start.sh
```

## Pré-requisitos

- Docker 24+
- Docker Compose v2
- Chave de API da MiniMax (variável `MINIMAX_API_KEY` no `.env`)

## Subir o ambiente

```bash
cp .env.example .env
# Editar .env com sua MINIMAX_API_KEY
./scripts/start.sh
```

Ou manualmente:

```bash
docker compose up -d --build
```

A aplicação sobe em **http://localhost:8080**.

| Endpoint        | URL                              |
|-----------------|----------------------------------|
| App (SPA)       | http://localhost:8080            |
| Swagger (dev)   | http://localhost:8080/swagger    |
| Health API      | http://localhost:8080/healthz    |
| Tradução        | POST http://localhost:8080/api/translate |
| Correção        | POST http://localhost:8080/api/correct   |
| Áudio TTS       | GET  http://localhost:8080/api/audio?text=...&voice=female&speed=1&region=fr |
| Histórico       | GET  http://localhost:8080/api/history    |
| Favoritos       | GET  http://localhost:8080/api/favorites  |
| Configurações   | GET/PUT http://localhost:8080/api/settings |
| Estatísticas    | GET  http://localhost:8080/api/stats      |

## Telas

### 1. Dashboard (`/dashboard`)
- Cabeçalho de boas-vindas "BIENVENUE!"
- Switcher PT ⇄ FR com seletor de modo (Traduzir / Corrigir Gramática)
- Textarea com contador (max 500), detector automático de idioma
- Cartão de resultado com:
  - Frase em francês
  - Bloco de pronúncia com áudio (Lento / Normal)
  - Dica cultural
  - Correções detalhadas (no modo gramática)
- Sugestões de estudo (chips)
- Stats: palavras aprendidas, ofensiva atual, precisão

### 2. Histórico (`/historico`)
- Lista cronológica de todas as traduções
- Filtro por categoria (Comum, Viagem, Estudo)
- Busca full-text em PT/FR
- Botão "Limpar Tudo" e "Filtrar Data"
- Ícone de favoritar em cada item

### 3. Favoritos (`/favoritos`)
- Tabela com checkbox para remover
- Tag de categoria por item
- Busca e filtros
- Banner CTA "Pratique seus favoritos"

### 4. Configurações (`/configuracoes`)
- **Preferências de Áudio:** voz (feminina/masculina), velocidade (0.5x–2x), região (França/Québec/Bélgica)
- **Interface e Estudo:** reprodução automática, mostrar fonética, destaque de verbos, ocultar explicações
- **Notificações:** lembrete diário + horário
- **Conta e Segurança:** perfil de estudante, privacidade
- Botões "Restaurar Padrões" e "Salvar Alterações"

## Endpoints REST

### POST /api/translate
```json
{
  "text": "Olá, como você está hoje?",
  "sourceLang": "pt",
  "targetLang": "fr",
  "region": "fr"
}
```
Resposta:
```json
{
  "sourceLang": "pt",
  "frText": "Bonjour, comment allez-vous aujourd'hui ?",
  "phonetic": "bõ-jur kõ-mã ta-le vu o-zhur-düi",
  "translation": "Olá, como você está hoje?",
  "culturalTip": "...",
  "category": "Comum"
}
```

### POST /api/correct
```json
{ "text": "Je veut commander un café au lait, si vous plait.", "region": "fr" }
```
Resposta inclui `corrected`, `phonetic`, `corrections[]` (from/to/reason) e `culturalTip`.

### GET /api/audio
```
/api/audio?text=Bonjour&voice=female&speed=1.0&region=fr
```
Retorna `audio/mpeg` (MP3 sintetizado pela MiniMax).

## Camada de dados

Tabelas criadas automaticamente via `EnsureCreated` na inicialização:

- `history` — todas as traduções
- `favorites` — frases salvas
- `user_settings` — configurações por usuário (chave `user_id`)

## Desenvolvimento local sem Docker

```bash
# 1) Frontend
cd frontend
npm install
npm run dev   # http://localhost:5173

# 2) Backend
cd ../backend/FrenchSucco.Api
dotnet run    # http://localhost:8080
```

A variável `POSTGRES_CONNECTION` deve apontar para um PostgreSQL local.

## Variáveis de ambiente

| Variável               | Descrição                                  | Padrão                              |
|------------------------|--------------------------------------------|--------------------------------------|
| `MINIMAX_API_KEY`      | Chave de API MiniMax                       | — (obrigatória para tradução/TTS)    |
| `MINIMAX_BASE_URL`     | Endpoint da MiniMax API                    | `https://api.minimax.io/v1`          |
| `MINIMAX_MODEL`        | Modelo de chat (texto)                     | `MiniMax-Text-01`                    |
| `MINIMAX_VOICE`        | Voz TTS default                             | `audio_default`                      |
| `POSTGRES_DB`          | Nome do banco                              | `french_succo`                       |
| `POSTGRES_USER`        | Usuário do banco                           | `succo`                              |
| `POSTGRES_PASSWORD`    | Senha do banco                             | `succo_secret`                       |

## Comandos úteis

```bash
docker compose ps                 # status dos containers
docker compose logs -f backend    # acompanhar logs
docker compose down -v            # parar e remover volumes
docker compose up -d --build      # rebuildar e subir
docker compose exec postgres psql -U succo -d french_succo  # acessar o banco
```

## Notas

- O frontend usa **localStorage** como fallback para histórico/favoritos/configurações
  antes do primeiro request à API. Quando o backend responde, os dados do servidor
  prevalecem.
- A correção gramatical no dashboard (`mode = 'grammar'`) retorna tanto a versão
  com erros quanto a versão corrigida, e uma lista de `GrammarCorrection`
  com `from`, `to` e `reason`.
- O TTS usa o endpoint `/audio/speech` da MiniMax. Se a chamada falhar, o backend
  retorna `502 Bad Gateway`.
- Os prompts enviados ao MiniMax forçam saída em JSON (`response_format: json_object`)
  para parsing determinístico no backend.
