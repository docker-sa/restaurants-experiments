## Web applicqtion

## Build the image

```bash
docker build -t paris-restaurants-web .
```

## Run the container

```bash
docker run -d --rm \
  --name restaurants-web \
  -p 7070:8080 \
  -e API_URL="http://localhost:9090" \
  paris-restaurants-web
```

>  *not used* `--link restaurants-api:restaurants-api \`



- http://localhost:7070
- http://localhost:7070/api/url
