# Cause-I Server

## Prerequisites

- [NodeJS](https://nodejs.org/en) v20.11.1
- [Pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/engine/install/)

## Installation

```bash
pnpm install
```

### Setting up the Database

Use docker to install and use postgres if you don't have postgres locally already

Spin up the docker container

```bash
docker compose up -d
```

Create a DB named `cause-i`

Run migration and seed to populate the DB.

```bash
pnpm run migration:all

pnpm run seed
```

### Running the app

```bash
mv .env.example .env
```

```bash
pnpm install
```

```bash
# watch mode
pnpm run dev

# build for production
pnpm run build

# production mode
pnpm run start
```

### Code Contributors

1. Souvik Mandal - [Github](https://github.com/simpleindian)
