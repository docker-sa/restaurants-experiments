#!/bin/bash

docker run -d --rm \
--name redis-server \
-p 6379:6379 \
-e REDIS_ARGS="--save 30 1" \
-v ./data:/data \
redis:7.2.4