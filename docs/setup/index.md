## Local Development Setup

### Prerequisites

Before proceeding with setup, ensure you have the following installed:

- **Git** (for version control)
- **Node.js** (LTS recommended)
- **npm** or **bun** (package manager)
- **PostgreSQL** (if running locally)
- **Kafka** (if running locally)
- **Docker** (if using Docker)

---

#### Setup Rrepository

- Clone the repository

```bash
git clone https://github.com/DSB2004/zupple_labs_assignment.git

cd /zupple_labs_assignment
```

#### Setup Postgres and Kafka

- If you have postgres and kafka locally running on your system, skip this part

**Setting up with Docker**

- Using the docker-compose.dev.yaml file run all 3 services

#### Setup Kafka Topics

- Please check the `/scripts` folder for the topics creation scripts
- After starting your Kafka service, you need to create the required topics for the application.

**Linux / macOS (Bash)**

- Run the bash script included in the repository:

```bash
# Make the script executable
chmod +x scripts/topics.bash

# Run the script
./scripts/topics.bash

```

**Window (Powershell)**

- Run the bash script included in the repository:

```powershell
# Run the script
./scripts/topics.ps1

```

- Or if you want to create one on your own, make sure the topic name is correct and kafka is running

```bash
  docker exec -i kafka_instance /opt/kafka/bin/kafka-topics.sh \
  --create \
  --topic kafka.cred.issued \
  --bootstrap-server localhost:9092 \
  --partitions 1 \
  --replication-factor 1
```

**Setting up with Docker**

- Using the docker-compose.dev.yaml file run all 3 services

#### Setting Up Env

- Create a .env file in the root of the each backend service.

- Use the .env.example file provided in the repository as a reference.

```bash
# .env
DATABASE_URL="postgres://postgres:12345678@localhost:5432/<DATABASE_NAME>"
NODE_ENV="development"
PORT="<PORT>"
KAFKA_BROKER="localhost:9092"
```

- Same for client side, create a .env file in the root of the client service.

```bash
# .env
VITE_APP_ISSUANCE_SERVICE_URL=http://localhost:8000/issuance
VITE_APP_VERIFICATION_SERVICE_URL=http://localhost:8001/verify
```

### Starting Development Server

#### To install dependencies

- In the root of project, run

```bash
# npm
npm install

# bun
bun i
```

#### To generate Prisma client

- For each backend service, run

```bash
cd ./apps/verification_service

# npm
npm prisma generate

# bun
bun prisma generate
```

#### To migrate database

```bash

cd ./apps/verification_service

# npm
npm prisma db push

# bun
bun prisma db push
```

#### To build

- In root of project, run

```bash
# npm
npm run build

#bun
bun run build

```

#### To start the development server

- `Supports auto reload`

```bash
# npm
npm run dev

# bun
bun run dev
```

#### To start the prod server

- `First build the application`

```bash
# npm
npm run start

#bun
bun run start

```
