# Casper-Kelvin

## Environment variables

### .env backend

```env
GOOGLE_APPLICATION_CREDENTIALS="/path/to/GOOGLE_APPLICATION_CREDENTIALS.json" #only in dev, production
URL_FRONTEND="http://localhost:5173/"
DB_HOST="localhost"
DB_PORT="27031"
DB_NAME="api-thebarber"

NODE_ENV="development"

```

## Seeding

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
