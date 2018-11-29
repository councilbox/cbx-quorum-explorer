#!/bin/bash
source ../env.sh
cp -f package.json.template package.json
sed -i "s/{{WEBAPP_VERSION}}/$WEBAPP_VERSION/g" package.json
npm start
