# Casper-Kelvin

## Environment variables

### .env / .env.production.local backend

Use firebase > Project settings > Service Accounts > Generate new private key

```env
GOOGLE_APPLICATION_CREDENTIALS="/path/to/GOOGLE_APPLICATION_CREDENTIALS.json" #only in dev, production
URL_FRONTEND=""
DB_HOST=""
DB_PORT=""
DB_NAME=""

NODE_ENV=""

```

### .env / .env.production.local frontend

```env
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
```

## Seeding

(seeding is based on existing uid's from firebase, if you start with a new firebase authentication you can't use the hairdresser seeding, user seeding and point seeding)

### Step 1

#### Delete routes

If you have a clean project go to step 2

#### 1. Delete Services

```console
seed:database:services:reset
```

#### 2. Delete Extra's

```console
seed:database:extras:reset
```

#### 3. Delete Hairdressers

```console
seed:database:hairdressers:reset
```

#### 4. Delete Vacations

```console
seed:database:vacations:reset
```

#### 5. Delete Points

```console
seed:database:points:reset
```

#### 6. Delete Users

```console
seed:database:users:reset
```

### Step 2

#### 1. Add Services

```console
seed:database:services
```

#### 2. Add Extra's

```console
seed:database:extras
```

#### 3. Add Hairdressers

```console
seed:database:hairdressers
```

#### 4. Add Vacations

```console
seed:database:vacations
```

#### 5. Add Points

```console
seed:database:points
```

#### 6. Add Users

```console
seed:database:users
```
