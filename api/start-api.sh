#!/bin/bash

docker run -d --rm \
  --name restaurants-api \
  -p 9090:8080 \
  -e MESSAGE="🎉 Hello from Docker 👋" \
  -e TITLE="My favorite restaurants" \
  -e REDIS_URL="redis-server:6379" \
  --link redis-server:redis-server \
  paris-restaurants-api
  