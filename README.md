# ![Node/Express/Prisma Example App](project-logo.png)

[![Build Status](https://travis-ci.org/anishkny/node-express-realworld-example-app.svg?branch=master)](https://travis-ci.org/anishkny/node-express-realworld-example-app)

> ### Example Node (Express + Prisma) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) API spec.

<a href="https://thinkster.io/tutorials/node-json-api" target="_blank"><img width="454" src="https://raw.githubusercontent.com/gothinkster/realworld/master/media/learn-btn-hr.png" /></a>

## Getting Started

### Prerequisites

Run the following command to install dependencies:

```shell
npm install
```

### Environment variables

This project depends on some environment variables.
If you are running this project locally, create a `.env` file at the root for these variables.
Your host provider should included a feature to set them there directly to avoid exposing them.

Here are the required ones:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=conduit
DB_SCHEMA=public
JWT_SECRET=
NODE_ENV=development
PORT=3000
```

`DATABASE_URL` is built at runtime from the `DB_*` variables.
For Prisma CLI commands, use the npm scripts so the URL is generated the same way:

```shell
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Generate your Prisma client

Run the following command to generate the Prisma Client which will include types based on your database schema:

```shell
npm run prisma:generate
```

### Apply any SQL migration script

Run the following command to create/update your database based on existing sql migration scripts:

```shell
npm run prisma:migrate
```

### Run the project

Run the following command to run the project:

```shell
npx nx serve api
```

### Seed the database

The project includes a seed script to populate the database:

```shell
npm run prisma:seed
```

## Deploy on a remote server

Run the following command to:
- install dependencies
- generate the Prisma client
- build the app into `dist/`
- apply any new migration sql scripts
- run the server

```shell
npm ci && npm run prisma:generate && npm run build && npm run prisma:migrate && node dist/api/main.js
```
