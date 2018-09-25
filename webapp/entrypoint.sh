#!/bin/bash
sed -i 's@{{API_URL}}@'$API_URL'@' build/static/js/main.*.js
exec serve -p 80 -s build
