#!/usr/bin/env bash
set -e

if [ ! -f .env ]; then
  echo ".env file not found. Copying from .env.example..."
  cp .env.example .env
  echo "Please edit .env with your MINIMAX_API_KEY and run again."
  exit 1
fi

set -a
source .env
set +a

docker compose up -d --build

echo ""
echo "French Succo is starting up..."
echo ""
echo "  - App:     http://localhost:8080"
echo "  - API:     http://localhost:8080/api"
echo "  - Health:  http://localhost:8080/healthz"
echo ""
echo "Run 'docker compose logs -f' to follow the logs."
