#!/bin/bash

# ENABLE_SSL=false
# EXPLORER_DOMAIN=localhost
# API_DOMAIN=localhost
# MONGO_DATA_DIR=./database
# API_PORT=8080
# EXTERNAL_API_PORT=

# Build Docker images
cd sync && docker build -t sync .; cd ..
cd http-api && ./build.sh; cd ..
cd webapp && docker build -t webapp .; cd ..

# Default values
ENABLE_SSL=${ENABLE_SSL:-false}
if $ENABLE_SSL; then SSL=s; fi
EXPLORER_DOMAIN=${EXPLORER_DOMAIN:-localhost}
API_DOMAIN=${API_DOMAIN:-localhost}
MONGO_DATA_DIR=${MONGO_DATA_DIR:-./database}
EXPLORER_PORT=${EXPLORER_PORT:-80}
API_PORT=${API_PORT:-8080}
EXTERNAL_API_PORT=${EXTERNAL_API_PORT:-}

sed 's@{{MONGO_DATA_DIR}}@'$MONGO_DATA_DIR'@' docker-compose.yaml.template > docker-compose.yaml
sed 's@{{EXPLORER_DOMAIN}}@'$EXPLORER_DOMAIN'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{EXPLORER_PORT}}@'$EXPLORER_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{API_DOMAIN}}@'$API_DOMAIN'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{API_PORT}}@'$API_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{EXTERNAL_API_PORT}}@'$EXTERNAL_API_PORT'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
sed 's@{{SSL}}@'$SSL'@' docker-compose.yaml > aux && mv aux docker-compose.yaml
docker-compose up -d
