#!/bin/bash

PORTS=(3000 3001 3002 3003 3004 3005)
SELECTED_PORT=""

check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

for port in "${PORTS[@]}"; do
    if ! check_port $port; then
        SELECTED_PORT=$port
        echo "Porta $SELECTED_PORT disponível"
        break
    else
        echo "Porta $port em uso, tentando próxima..."
    fi
done

if [ -z "$SELECTED_PORT" ]; then
    echo "Erro: Todas as portas (3000-3005) estão em uso"
    exit 1
fi

export PORT=$SELECTED_PORT

if [ ! -f .env ]; then
    echo "Criando arquivo .env..."
    cat > .env << EOF
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/barbearia"
NEXTAUTH_URL="http://localhost:${SELECTED_PORT}"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
EOF
fi

docker-compose down 2>/dev/null

echo "Iniciando containers na porta $SELECTED_PORT..."
PORT=$SELECTED_PORT docker-compose up -d

sleep 5

echo "Executando migrações..."
docker exec barbearia_app npx prisma migrate deploy

echo ""
echo "Aplicação rodando em: http://localhost:$SELECTED_PORT"
echo "Banco de dados PostgreSQL: localhost:5432"
echo ""
echo "Para parar os containers: docker-compose down"
