#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
#  French Succo – build-images.sh
#  Gera as imagens customizadas (backend, frontend, proxy) para linux/amd64
#  usando docker buildx, salva .tar em dist-images/ pronto para o Portainer.
#
#  Uso:
#    ./scripts/build-images.sh                  # PLATFORM=linux/amd64  (default)
#    PLATFORM=linux/arm64 ./scripts/build-images.sh
#    VERSION=1.0.3 ./scripts/build-images.sh    # muda a tag sufixo
#
#  Pré-requisitos:
#    - Docker 24+ com buildx e QEMU (docker run --privileged --rm tonistiigi/binfmt --install all)
#    - Docker Desktop já em execução
# ─────────────────────────────────────────────────────────────────────────────

set -Eeuo pipefail

# ── config ───────────────────────────────────────────────────────────────────
PLATFORM="${PLATFORM:-linux/amd64}"
VERSION="${VERSION:-1.0.2}"
SUFFIX="$(echo "$PLATFORM" | awk -F/ '{print $2}')"   # amd64 | arm64
TAG="${VERSION}-${SUFFIX}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${REPO_ROOT}/dist-images"
BUILDER_NAME="french-succo-builder"

# ── imagens a gerar ─────────────────────────────────────────────────────────
#   nome_local                          contexto                              dockerfile
IMAGES=(
  "french-succo-backend|backend/FrenchSucco.Api|backend/FrenchSucco.Api/Dockerfile"
  "french-succo-frontend|frontend|frontend/Dockerfile"
  "french-succo-proxy|nginx|nginx/Dockerfile"
)

# ── helpers ─────────────────────────────────────────────────────────────────
C_RED=$'\033[0;31m'; C_GREEN=$'\033[0;32m'; C_YELLOW=$'\033[0;33m'
C_BLUE=$'\033[0;34m'; C_BOLD=$'\033[1m';    C_RESET=$'\033[0m'

log()   { printf '%s==>%s %s\n' "${C_BLUE}"   "${C_RESET}" "$*"; }
ok()    { printf '%s ✓ %s%s\n'  "${C_GREEN}"  "$*" "${C_RESET}"; }
warn()  { printf '%s ! %s%s\n'  "${C_YELLOW}" "$*" "${C_RESET}"; }
die()   { printf '%s ✗ %s%s\n'  "${C_RED}"    "$*" "${C_RESET}" >&2; exit 1; }

cleanup_on_error() {
  local rc=$?
  printf '%s ✗ build-images.sh falhou (exit %d)%s\n' "${C_RED}" "$rc" "${C_RESET}" >&2
  exit "$rc"
}
trap cleanup_on_error ERR

# ── pre-flight ──────────────────────────────────────────────────────────────
command -v docker >/dev/null     || die "docker não encontrado no PATH"
docker info >/dev/null 2>&1      || die "Docker daemon não está rodando (abra o Docker Desktop)"
docker buildx version >/dev/null 2>&1 || die "docker buildx não disponível"

mkdir -p "${OUT_DIR}"

log "PLATFORM=${PLATFORM}  TAG=${TAG}  OUT=${OUT_DIR}"

# ── garante um builder isolado (cria se não existir) ────────────────────────
if ! docker buildx inspect "${BUILDER_NAME}" >/dev/null 2>&1; then
  log "Criando buildx builder '${BUILDER_NAME}' (driver docker-container)…"
  docker buildx create \
    --name "${BUILDER_NAME}" \
    --driver docker-container \
    --bootstrap >/dev/null
fi
docker buildx use "${BUILDER_NAME}"

# ── loop: build + tag + save + valida ──────────────────────────────────────
pushd "${REPO_ROOT}" >/dev/null

for entry in "${IMAGES[@]}"; do
  IFS='|' read -r NAME CTX DOCKERFILE <<<"$entry"
  IMAGE="${NAME}:${TAG}"
  TAR="${OUT_DIR}/${NAME}-${TAG}.tar"

  log "build  ${IMAGE}  (${CTX})"
  docker buildx build \
    --platform "${PLATFORM}" \
    --file "${DOCKERFILE}" \
    --tag  "${IMAGE}" \
    --load \
    --progress=plain \
    "${CTX}"

  # ── valida arquitetura real ───────────────────────────────────────────────
  REAL_ARCH="$(docker image inspect "${IMAGE}" --format '{{.Architecture}}' 2>/dev/null || true)"
  EXPECTED_ARCH="${SUFFIX}"   # amd64 | arm64
  if [[ -z "${REAL_ARCH}" || "${REAL_ARCH}" != "${EXPECTED_ARCH}" ]]; then
    die "Arquitetura incorreta em ${IMAGE}: esperada=${EXPECTED_ARCH} obtida=${REAL_ARCH:-<vazia>}"
  fi
  ok "arquitetura OK  (${REAL_ARCH})"

  # ── exporta .tar ──────────────────────────────────────────────────────────
  log "save   ${TAR}"
  docker save -o "${TAR}" "${IMAGE}"
  SIZE="$(du -h "${TAR}" | awk '{print $1}')"
  ok "salvo  ${TAR}  (${SIZE})"
done

popd >/dev/null

echo
ok "Imagens geradas em ${OUT_DIR}:"
ls -lh "${OUT_DIR}"/*.tar