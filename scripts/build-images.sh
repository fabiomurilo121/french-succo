#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

VERSION="${VERSION:-1.0.1}"
PLATFORM="${PLATFORM:-linux/amd64}"
OUT_DIR="${OUT_DIR:-dist-images}"

declare -A IMAGES=(
  [backend]="backend/FrenchSucco.Api"
  [frontend]="frontend"
  [proxy]="nginx"
)

declare -A TAGS=(
  [backend]="french-succo-backend"
  [frontend]="french-succo-frontend"
  [proxy]="french-succo-proxy"
)

mkdir -p "$OUT_DIR"

echo ">> Using builder: $(docker buildx version 2>/dev/null || echo 'docker buildx')"
docker buildx use default >/dev/null 2>&1 || true

for name in backend frontend proxy; do
  tag="${TAGS[$name]}:${VERSION}-amd64"
  context="${IMAGES[$name]}"
  tar="${OUT_DIR}/${TAGS[$name]}-${VERSION}-amd64.tar"

  echo ""
  echo ">> Building ${tag} (${PLATFORM}) from ${context}"
  docker buildx build --platform "$PLATFORM" -t "$tag" --load "$context"

  echo ">> Saving ${tag} -> ${tar}"
  docker save "$tag" | gzip > "$tar"
done

echo ""
echo ">> Done. Artifacts:"
ls -lh "$OUT_DIR"
echo ""
echo ">> Verify architecture:"
for name in backend frontend proxy; do
  tag="${TAGS[$name]}:${VERSION}-amd64"
  arch=$(docker inspect --format '{{.Architecture}}' "$tag")
  echo "  $tag -> $arch"
done
