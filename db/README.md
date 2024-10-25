# Redis

```bash
cd db

docker run -d --rm \
--name redis-server \
-p 6379:6379 \
-e REDIS_ARGS="--save 30 1" \
-v ./data:/data \
redis:7.2.4
```
> explanation


```bash
docker run -d --rm \
  --name redis-cli \
  --link redis-server:redis-server \
  -v ./scripts:/scripts \
  redis:7.2.4
```
> explanation
