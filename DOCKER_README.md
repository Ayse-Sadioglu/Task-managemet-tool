# Docker Setup for Task Management Tool

This project is now containerized with Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background (detached mode)
docker-compose up -d --build
```

### 2. Access the Application

- **Spring Boot Application**: http://localhost:8080
- **pgAdmin (Database Management)**: http://localhost:5050
  - Email: admin@taskmanagement.com
  - Password: admin

### 3. Stop the Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Services Included

1. **taskmanagementtool**: Spring Boot application
2. **postgres**: PostgreSQL database
3. **pgadmin**: Web-based PostgreSQL administration tool

## Database Configuration

- **Database Name**: taskmanagement
- **Username**: taskuser
- **Password**: taskpass
- **Port**: 5432

## Development Commands

### Build only the application
```bash
docker build -t taskmanagementtool .
```

### Run only the database
```bash
docker-compose up postgres
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs taskmanagementtool
```

### Access application container
```bash
docker-compose exec taskmanagementtool sh
```

### Access database container
```bash
docker-compose exec postgres psql -U taskuser -d taskmanagement
```

## Environment Variables

You can customize the configuration by modifying the `docker-compose.yml` file or creating a `.env` file with:

```env
POSTGRES_DB=taskmanagement
POSTGRES_USER=taskuser
POSTGRES_PASSWORD=taskpass
SPRING_PROFILES_ACTIVE=docker
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 8080, 5432, and 5050 are not in use
2. **Database connection issues**: Wait for PostgreSQL to fully start before the application
3. **Build issues**: Try `docker-compose down` and `docker-compose up --build --force-recreate`
