FROM golang:1.22-alpine AS builder 
#443.94 MB
WORKDIR /app
COPY main.go .
COPY go.mod .


RUN <<EOF
go mod tidy 
go build -o tiny-web
EOF

FROM ubuntu:20.04
#FROM ubuntu:24.10
#FROM scratch
#FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/tiny-web .

COPY public ./public 
CMD ["./tiny-web"]


