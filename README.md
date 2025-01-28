# Docker

Blank next.js project featuring docker. Docker cheatsheet:

### Installing Docker

Remove any pre-installed packages: `for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done`

Install using apt:

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install Docker: `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin`

Verify Install: `sudo docker run hello-world`

### Enable docker-container driver

This is needed for multi-platform builds (x86 and arm).

- Run: `docker buildx create --name mybuilder --use`

- Verify install: `docker buildx inspect mybuilder --bootstrap`

Look for the following output: _Driver: docker-container_

### Login to Docker Hub

- Visit https://hub.docker.com/ and sign up.

Note: When building an image, the following format should be used: `<username>/<image-name>:<tag>`. For example, `ScottGreenhalgh/docker-test:latest`.

- Login to docker with: `docker login`

### Building a Docker image for Docker Hub

- Add `output: 'standalone',` to the next.config.ts/next.config.mjs file.

- Build with: `docker buildx build --platform linux/amd64,linux/arm64 -t docker.io/scottgreenhalgh/docker-test . --push`

Note: If testing locally (not sharing) use `--load` or if sharing use `--push`.

Note: Using `--target` (before --platform) can end the build process at a specific stage. Each stage can be assigned in the Dockerfile with `AS` followed by a keyword. Our current file has base, deps, builder and runner. To stop the build after deps simply use `--target deps`.

### Building locally

- Build with: `docker build -t docker-test .`

- Run with: `docker run -p 3000:3000 docker-test`

Note: Images are stored locally under `/var/lib/docker` on Linux.

### Build for GitHub Container Registry (Docker Hub Alternative):

- Visit https://github.com/settings/tokens and generate a classic token with the write:packages, read:packages and delete:packages permissions.

- Login with: `docker login ghcr.io`

- Usernaming being GitHub username. Password being the access token.

- Build with: `docker buildx build --platform linux/amd64 -t ghcr.io/ScottGreenhalgh/docker-test:latest . --push`

- Run with: `docker run -p 3000:3000 ghcr.io/ScottGreenhalgh/docker-test:latest`

### Pulling Docker images

- Pulling a docker image (example): `docker pull docker.io/ScottGreenhalgh/docker-test:latest`

- Run the pulled image: `docker run -it --name <container-name> -p 3000:3000 docker.io/ScottGreenhalgh/docker-test:latest`

- Verify local pull: `docker images`

- Access the container: `docker exec -it <container-name> bash`

Note: Accessing the container only works if the container is running via the run command.

## Misc Docker Commands

### Docker Image Commands

- List images: `docker image`

- Delete image: `docker rmi <image-id>`

- Force delete image: `docker rmi -f <image-id>`

- Delete unused images: `docker image prune`

- Delete all images (best not to use): ` docker rmi $(docker images -q)`

### Docker Container Commands

- List running containers: `docker ps`

- List all containers (inc not running): `docker ps -a`

- Stop running containers: `docker stop <container-id>`

- Start a stopped container: `docker start <container-id>`

- Access a running container: `docker exec -it <container-id> /bin/bash`

- Delete container: `docker rm <container-id>`

- Force delete container: `docker rm -f <container-id>`

- Delete all stopped containers: `docker container prune`

- View logs of a container: `docker logs <container-id>`

### Docker Volumes Commands

- List all volumes: `docker volume ls`

- Delete unused volumes: `docker volume prune`

- Delete specific volume: `docker volume rm <volume-name>`

- Inspect volume details: `docked volume inspect <volume-name>`

### Docker System Maintenance Commands

- Free up space (unused data): `docker system prune`

- Remove all unused images (including tagged): `docker system prune --all`

- Show disk usage: `docker system df`

### Docker debugging

- Inspect container/image: `docker inspect <container-id/image-id>`

- Live resource monitor: `docker stats`

- Check processes running in container: `docker top <container-id>`

### Docker Networking

- List all docker networks: `docker network ls`

- Create a custom network: `docker network create <network-name>`

- Connect container to network: `docker network connect <network-name> <container-id>`

- Inspect a network: `docker network inspect <network-name>`

### Other useful commands

- Run a container with auto clean up on exit: `docker run --rm -it <image-name> /bin/bash`

- Rename container: `docker rename <old-container-name> <new-container-name>`

- Export container as tar file: `docker export <container-id> > container.tar`

- Import tar container: `docker import < container.tar`

- Get IDs for all resources (e.g container/image): `docker <resource> ls -q`, e.g `docker ps -q` for all containers.

Useful source: https://github.com/vercel/next.js/tree/canary/examples/with-docker
