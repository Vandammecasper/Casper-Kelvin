<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Seeding

```console
npx nestjs-command seed:...
```

### 1. Delete Services (if needed)

```console
seed:database:services:reset
```

### 2. Add Services

```console
seed:database:services
```

### 3. Delete Hairdressers (if needed)

```console
seed:database:hairdressers:reset
```

### 4. Add Hairdressers

```console
seed:database:hairdressers
```

### 5. Delete Vacations (if needed)

```console
seed:database:vacations:reset
```

### 6. Add Vacations

```console
seed:database:vacations
```

### 7. Delete Points (if needed)

```console
seed:database:points:reset
```

### 8. Add Points

```console
seed:database:points
```

### 9. Delete Users (if needed)

```console
seed:database:users:reset
```

### 9. Add Users

```console
seed:database:users
```

## Services

### Find All

```js
query {
  services {
    id
    name
    description
    price
    duration
    utilities
  }
}
```

### Find One

```js
query {
  service(id: "651ade81c0c9672741b5dcf6") {
    id
    name
    description
    price
    duration
    utilities
  }
}
```

### Create

```js
mutation {
  createService(createServiceInput: { name: "Clean Shave", description: "a full clean cut and shave", price:30, duration:30, utilities:["schaar", "borstel", "scheermems"] }) {
    id
    name
    description
    duration
    price
    utilities
  }
}
```

## Hairdressers

### Find All

```js
query {
  hairdressers {
    id
    uid
    name
    services {
      id
      name
      description
      price
      duration
      utilities
    }
  }
}

```

### Find One (by uid)

```js
query {
  hairdresser(uid: "pVbEmkBDAFUU4ChPbVYQeGMMITl2") {
    id
    uid
    name
    services {
      id
      name
      description
      price
      duration
      utilities
    }
  }
}

```

### Create

```js
mutation {
  createHairdresser(
    createHairdresserInput: {
      uid: "s2VrPmmg5EUr9cVf04TNgGLNMPH3"
      name: "Kapper2"
      servicesId: ["651abda7478cc36470532172"]
    }
  ) {
    uid
    name
    services {
      id
      name
    }
  }
}

```
