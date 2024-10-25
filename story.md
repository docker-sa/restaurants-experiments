# The Story

## Reset everything

## 🟥 SHOW DOCKER LEARNING PATHS IN DD

## 🐳AI📝 

What is the difference between host adapter and bridged adapter drivers?


## Present the application

Show the `archi.draw.io` file

## Run everything manually with containers

### Redis

#### Start the Redis Server

I need a Redis Database to store the data of the application. I will use the official image of Redis from Docker Hub.

```bash
cd db

docker run -d --rm \
--name redis-server \
-p 6379:6379 \
-e REDIS_ARGS="--save 30 1" \
-v ./data:/data \
redis:7.2.4
```

- I created a volume to store the data of the Redis Database.

#### I need a Redis Client to interact with the Redis Server

```bash
docker run -d --rm \
  --name redis-cli \
  --link redis-server:redis-server \
  -v ./scripts:/scripts \
  redis:7.2.4
```

- I linked the Redis Client to the Redis Server.
- I created a volume to store the scripts that I will use to interact with the Redis Server.

#### Go to the DD GUI

- Show the 2 running containers
- Go into the client container 
  - ✋ and show the **file system**
  - ✋✋ run the scripts

### LET'S TALK ABOUT THE API

#### Show the 🐳 Dockerfile

✋

#### Build the image

```bash
cd api
docker build -t paris-restaurants-api .
```

#### Run the container

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

**Explain**:
- I linked the API to the Redis Server.
- I used the environment variables to pass the message and the title to the API.
- I used the environment variable `REDIS_URL` to pass the URL of the Redis Server to the API.
- I exposed the port 8080 of the container to the port 9090 of the host.

**Test the API**:
```bash
curl http://localhost:9090/api/restaurants
```

### LET'S TALK ABOUT The Web Application

#### Show the Dockerfile

✋

#### Build the image

```bash
docker build -t paris-restaurants-web .
```

#### Run the container

```bash
docker run -d --rm \
  --name restaurants-web \
  -p 7070:8080 \
  -e API_URL="http://localhost:9090" \
  paris-restaurants-web
```

- I used the environment variable `API_URL` to pass the URL of the API to the Web Application.

Let's see if the application is running correctly. Go to the DD GUI and reach http://localhost:7070/

👋 Of course I need to start all these containers manually and in this order, otherwise the application will not work.

If I want to automate this process, I can use Docker Compose.


## Docker Compose

### First
```bash
docker stop restaurants-web restaurants-api redis-cli redis-server
```

### Show the compose file and explain it

> use `compose.01.yaml`

### Run the application with Docker Compose

```bash
docker compose up
```
- show the logs

- Go to DD GUI and show everything is running.
- Got to http://localhost:7070/ and show the application is running.

### Compose watch

> Stop the application and start compose watch

```bash
#docker compose down
docker compose watch
```
- show the logs into Docker Desktop GUI

- Do some change in the API project and see the changes are automatically applied.
- Do some change in the Web project and see the changes are automatically applied.

### ✋ Show Docker Scout View

- no critical vulnerability, do nothing
- But **we can do better with the size**
- ✋✋✋ Use the scratch image **FOR BOTH**
<!--TODO:
FROM scratch
FROM ubuntu:24.10
speak about distroless
-->

"Distroless" images are a type of Docker image that are designed to contain only the application and its runtime dependencies. They do not contain package managers, shells.

The scratch image is typically used to create minimal images containing only just what an application needs. It's also useful for creating images of static binaries.


- Rebuild the image with the Scratch image
- **Show** the images sizes
- Try to go to the **Exec** panel

### Debug mode

- Activate the debug mode: do a change with `info.txt`

### Network isolation

✋ Show `docs/network.drawio.png` (panel 01)

<!-- 
Now, let’s talk about networking:

A Compose project (or Compose Stack) has its own network and this network is shared between the services of the stack

Each service has a DNS entry corresponding to its name
So, for example, when I want to connect to redis with the redis CLI, I can use the DNS `redis-server`

All of this, makes it super easy to connect containers together!
-->

Let's try something

✋ return to Docker Desktop

- go to the `restaurants-restaurants-web` container
- activate the `debug` mode

```bash
install redis
```

```bash
restaurant_data=$(redis-cli -h redis-server -p 6379 HGETALL "restaurant:1")
echo $restaurant_data
```

😡 I can access from the front directly to the redis database
Usally, the front should not have access to the database.
only the API should have access to the database.

<!--
But let see how networking can help to solve my former isolation problem (the one of the demo)
-->

- Stop the application
- Add the **networks** to the compose file
- Add the **networks** section at the bottom of the compose file
- Run the application again
> use `compose.02.yaml`

<!--
You can build more sophisticated networks to control what containers can talk to each other

In my example,I separated the network into two networks: backend and frontend

If you want to “talk” to the Redis-server service, you can only use the backend network
It’s the same principle with the webapp service, this service can only use the frontend network, 

That means, the webapp service cannot “talk” directly with the Redis-server service

The only way is to use the API service which is allowed to use the both networks

So Let’s check if it works

-->


- go **again** to the `restaurants-restaurants-web` container
- activate the `debug` mode

```bash
install redis
```

```bash
restaurant_data=$(redis-cli -h redis-server -p 6379 HGETALL "restaurant:1")
echo $restaurant_data
```

😃 I cannot anymore access from the front directly to the redis database 🎉

### Load data

```yaml
  redis-data-loader:
    image: redis:7.2.4
    depends_on:
      - redis-server
    volumes:
      - ./db/scripts:/scripts  
    entrypoint: ["/scripts/load.dev.sh"]
    networks:
      - backend
```

👋👋👋 > Use directly `compose.04.yaml``

### Profiles

```yaml
  redis-data-loader-dev:
    profiles: [dev]
    image: redis:7.2.4
    depends_on:
      - redis-server
    volumes:
      - ./db/scripts:/scripts  
    entrypoint: ["/scripts/load.dev.sh"]
    networks:
      - backend

  redis-data-loader-prod:
    profiles: [prod]
    image: redis:7.2.4
    depends_on:
      - redis-server
    volumes:
      - ./db/scripts:/scripts  
    entrypoint: ["/scripts/load.prod.sh"]
    networks:
      - backend

```

✋ Show the bash scripts

```bash
docker compose --profile prod up

docker compose --profile dev up
``` 

A last thing now:

### It's the Includes

Make the demo
```
docker compose up
```

## Second Demo: I use often Compose with Dev Containers

Dev Containers is not a Docker product but if you use it with compose it's very useful.

The dev container feature defines the workspace setup inside a Docker container and you can use it with compose too

I'm not a Python developper, and I'm always strugling with the setup of Python. 
But my Boss ask me to start doing demo with Python and Ollama.

Then I started a simple project for that.










