#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  French Succo – load-images.sh
#  Carrega todos os .tar gerados por build-images.sh no Docker daemon local.
#
#  Uso:
#    ./scripts/load-images.sh                      # carrega todos os dist-images/*.tar
#    ./scripts/load-images.sh --remote user@host   # carrega via SSH no host do Portainer
#    ./scripts/load-images.sh --prune              # remove tags antigas 1.0.x antes
#
#  Pré-requisitos:
#    - Docker rodando localmente (ou acessível via SSH com o comando informado)
#    - dist-images/*.tar já gerados
# ─────────────────────────────────────────────────────────────────────────────

set -Eeuo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${REPO_ROOT}/dist-images"

REMOTE_HOST=""
PRUNE_OLD=0

for arg in "$@"; do
  case "$arg" in
    --remote) REMOTE_HOST="${2:-}"; shift 2 ;;
    --prune)  PRUNE_OLD=1; shift ;;
    -h|--help)
      sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "Argumento desconhecido: $arg" >&2; exit 1 ;;
  esac
done

C_RED=$'\033[0;31m'; C_GREEN=$'\033[0;32m'; C_YELLOW=$'\033[0;33m'
C_BLUE=$'\033[0;34m'; C_BOLD=$'\033[1m';    C_RESET=$'\033[0m'

log()  { printf '%s==>%s %s\n' "${C_BLUE}"  "${C_RESET}" "$*"; }
ok()   { printf '%s ✓ %s%s\n' "${C_GREEN}" "$*" "${C_RESET}"; }
warn() { printf '%s ! %s%s\n' "${C_YELLOW}" "$*" "${C_RESET}"; }
die()  { printf '%s ✗ %s%s\n' "${C_RED}"   "$*" "${C_RESET}" >&2; exit 1; }

shopt -s nullglob
TARS=( "${OUT_DIR}"/*.tar )
[[ ${#TARS[@]} -gt 0 ]] || die "Nenhum .tar em ${OUT_DIR} — rode ./scripts/build-images.sh primeiro"

DOCKER_CMD="docker"
if [[ -n "${REMOTE_HOST}" ]]; then
  log "Modo remoto: ${REMOTE_HOST}"
  DOCKER_CMD="ssh ${REMOTE_HOST} docker"
fi

# ── opcional: limpa tags antigas para liberar espaço ────────────────────────
if [[ "${PRUNE_OLD}" -eq 1 ]]; then
  log "Removendo tags antigas french-succo-*:1.0.*-amd64"
  ${DOCKER_CMD} images --format '{{.Repository}}:{{.Tag}} {{.ID}}' \
    | awk '/^french-succo-.*:1\.0\.[0-9]+-amd64 / {print $2}' \
    | sort -u \
    | xargs -r -n1 ${DOCKER_CMD} rmi || warn "Falha ao remover tags antigas (não-crítico)"
fi

# ── carrega cada .tar ───────────────────────────────────────────────────────
for TAR in "${TARS[@]}"; do
  NAME="$(basename "${TAR}")"
  log "load   ${NAME}"
  ${DOCKER_CMD} load -i "${TAR}"
  ok "carregado  ${NAME}"
done

echo
log "Imagens french-succo-* presentes no daemon:"
${DOCKER_CMD} images --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}' \
  | grep -E '^(french-succo-|REPOSITORY)' || true

echo
ok "Pronto. Agora é só fazer Deploy da stack no Portainer."