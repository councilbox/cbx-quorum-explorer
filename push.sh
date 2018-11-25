#!/bin/bash
source env.sh
docker push councilbox/quorum-explorer-syncer
docker push councilbox/quorum-explorer-http-api
docker push councilbox/quorum-explorer-webapp:$WEBAPP_VERSION
