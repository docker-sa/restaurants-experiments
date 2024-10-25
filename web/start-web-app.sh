#!/bin/bash

docker run -d --rm \
  --name restaurants-web \
  -p 7070:8080 \
  -e API_URL="http://localhost:9090" \
  paris-restaurants-web

  