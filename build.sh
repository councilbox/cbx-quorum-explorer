#!/bin/bash
cd syncer && ./build.sh; cd ..
cd http-api && ./build.sh; cd ..
cd webapp && ./build.sh; cd ..
cd metrics && ./build.sh; cd ..
