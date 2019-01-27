#!/bin/bash
source env.sh
QUORUM_ENDPOINTS=${QUORUM_ENDPOINTS:-"http://localhost:22000"}
ENABLE_SSL=${ENABLE_SSL:-false}
if $ENABLE_SSL; then SSL=s; fi
API_DOMAIN=${API_DOMAIN:-localhost}
MONGO_DATA_DIR=${MONGO_DATA_DIR:-./database}
EXPLORER_PORT=${EXPLORER_PORT:-80}
API_PORT=${API_PORT:-8080}
EXTERNAL_API_PORT=${EXTERNAL_API_PORT:-8080}
WEBAPP_VERSION=${WEBAPP_VERSION:-cbx}

sed 's@{{QUORUM_ENDPOINTS}}@'$QUORUM_ENDPOINTS'@' docker-compose-local-node.yaml.template > docker-compose.yaml
sed 's@{{MONGO_DATA_DIR}}@'$MONGO_DATA_DIR'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{EXPLORER_PORT}}@'$EXPLORER_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{API_DOMAIN}}@'$API_DOMAIN'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{API_PORT}}@'$API_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{EXTERNAL_API_PORT}}@'$EXTERNAL_API_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{SSL}}@'$SSL'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{WEBAPP_VERSION}}@'$WEBAPP_VERSION'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
docker-compose up -d
