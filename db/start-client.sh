#!/bin/bash

docker run -d --rm \
  --name redis-cli \
  --link redis-server:redis-server \
  -v ./scripts:/scripts \
  redis:7.2.4
  