# Docker Test (plus selenium)

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

- Build with: `docker buildx build --platform linux/amd64,linux/arm64 -t docker.io/scottgreenhalgh/docker-test:latest . --push`

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

- Build with: `docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/ScottGreenhalgh/docker-test:latest . --push`

- Run with: `docker run -p 3000:3000 ghcr.io/ScottGreenhalgh/docker-test:latest`

### Pulling Docker images

- Pulling a docker image (example): `docker pull docker.io/ScottGreenhalgh/docker-test:latest`

- Run the pulled image: `docker run -it --name <container-name> -p 3000:3000 docker.io/ScottGreenhalgh/docker-test:latest`

- Verify local pull: `docker images`

- Access the container: `docker exec -it <container-name> bash`

Note: Accessing the container only works if the container is running via the run command.

### Running the container

- Pull the image: `docker pull <TheUsernameOfTheImageOwnerHere> <ProjectNameHere>:<TagNameHere>`

- Start the environment: `docker compose up`

If another worker has made changes to the repo, do the following:

- Stop the active container: `docker compose down`

- Pull the repo: `git pull origin main`

- Pull the docker image: `docker compose pull`

- Restart the container: `docker compose up`

Note: Older version if docker hyphenate the commands (e.g. docker-compose instead of docker compose)

### Running a container with multiple services

This project contains an app service (for building the application) and the selenium service (TDD/BDD for testing). During containerised deverlopment, selenium is not needed, but it is also a listed dependancy. Therefore to run this container you will need:

`docker compose up --no-deps app`

With `app` being the service name and `--no-deps` ignoring the dependancies.

- To run selenium locally you can do: `docker compose up selenium`

- To stop a single running service: `docker compose stop <service name>`

### Running docker with VS Code dev container

The VS Code Dev Container extension can attach to the development environment. The `.devcontainer/devcontainer.json` file defines which services it will attach to during development. In this project, this is currently configure to specifically target app and not selenium. Therefore selenium will not run unlsess explicitly started.

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

## GitHub Actions

Actions checkout: https://github.com/actions/checkout/releases

Docker Login Action: https://github.com/docker/login-action/releases

Docker Buildkit (BuildX): https://github.com/moby/buildkit/releases

### Resource not accessible by integration error:

1. Go to repository "Settings".
2. After that it will show you a left pane where you will find "Actions"
3. Expand "Actions" tab
4. Click on "General" under options tab.
5. Now on new page scroll down and you will fine "Workflow Permissions"
6. Select "Read and Write" under "Workflow Permissions".

### Actions secrets

1. Go to repository "Settings".
2. After that it will show you a left pane where you will find "Secrets and variables"
3. Expand "Secrets and variables" tab
4. Click on "Actions"
5. Click "New repository secret"
6. Input Docker personal access token for usage in yaml

### Generate Docker Hub Personal access token

1. Login to docker hub (https://app.docker.com)
2. Click on your profile image and navigate to "Account settings"
3. Find the "Security" heading
4. Click "Personal access tokens"
5. Click "Generate new token"
6. Name it something sensible and give it "Read & Write"
7. Save the token somewhere safe (it only displays once)

## Selenium BDD/TDD (testing environment via python)

### Install dev dependencies

- Install node typescript dependency: `npm i ts-node @types/node --save-dev`

### tsconfig tweaks

```ts
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "esnext",
    "moduleResolution": "bundler", //next js preferes bundler
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["node"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Python file

Template test file is as follows:

```py
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# Define options for running ChromeDriver
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")

# Initialize a new Chrome driver instance
driver = webdriver.Chrome(options=chrome_options)

driver.get('https://www.example.com/')
header_text = driver.find_element(By.XPATH, '//h1').text

print("example.com Header text is:")
print(header_text)

driver.quit()
```

### Dockerfile.test

Our project uses two Dockerfile's for different services. The main Dockerfile is used to image the Next.js build. Dockerfile.test is designed to test this built application when running.

Selenium is installed via docker through the image at `selenium/standalone-chrome:latest` via the docker-compose.yml under the selenium service. This service runs the Dockerfile.test, which runs through Microsoft Playwright, an application specifically designed for browser testing and comes pre installed with all the necessary browsers. Tests can either be ran directly through this, or we can run our own test application (in this instance we're using selenium). Installing the python package and selenium python package we can utilise this to execute python tests.

## Chrome driver (not needed but useful for future)

- Chrome driver revisions: https://googlechromelabs.github.io/chrome-for-testing/latest-patch-versions-per-build.json

- Template URL for chrome driver: https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/{VERSION}/{PLATFORM}/chromedriver-{PLATFORM}.zip

- Browser Actions: https://github.com/browser-actions
