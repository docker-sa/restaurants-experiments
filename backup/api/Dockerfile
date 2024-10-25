FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
COPY go.mod .

RUN <<EOF
go mod tidy 
go build -o tiny-service
EOF

FROM ubuntu:20.04
#FROM scratch
#FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/tiny-service .

COPY info.txt . 

CMD ["./tiny-service"]