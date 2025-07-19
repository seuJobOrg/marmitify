#!/bin/sh

# Esperar o PostgreSQL estar disponível
until nc -z postgres 5432; do
  echo "Aguardando PostgreSQL..."
  sleep 2
done

echo "PostgreSQL está pronto!"

# Iniciar backend
cd /app/backend && node dist/main.js &
BACKEND_PID=$!

# Iniciar frontend
cd /app/frontend && npm start &
FRONTEND_PID=$!

# Tratamento de sinais para parar ambos
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" TERM INT

wait
