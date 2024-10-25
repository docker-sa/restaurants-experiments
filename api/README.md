# Restaurant API

## Dockerfile

```Dockerfile
# ✋ BUILDPLATFORM is a build argument that specifies the platform where the image is built.
FROM --platform=$BUILDPLATFORM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
COPY go.mod .

# ✋ TARGETOS and TARGETARCH are passed as build arguments.
ARG TARGETOS
ARG TARGETARCH

RUN <<EOF
go mod tidy 
# ✋ GOOS and GOARCH are set to the build arguments, so the binary is built for the target platform.
GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o tiny-service
EOF

FROM scratch
WORKDIR /app
COPY --from=builder /app/tiny-service .

COPY info.txt . 

CMD ["./tiny-service"]
```

## Build the image

```bash
docker build -t paris-restaurants-api .
```

## Run the container

```bash
docker run -d --rm \
  --name restaurants-api \
  -p 9090:8080 \
  -e MESSAGE="🎉 Hello from Docker 👋" \
  -e TITLE="My favorite restaurants" \
  -e REDIS_URL="redis-server:6379" \
  --link redis-server:redis-server \
  paris-restaurants-api
```

- http://localhost:9090/api/variables
- http://localhost:9090/api/info
- http://localhost:9090/api/restaurants