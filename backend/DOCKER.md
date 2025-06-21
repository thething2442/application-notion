# Docker Setup for Backend

This document explains how to run the NestJS backend using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Environment variables configured (see `env.example`)

## Quick Start

### Production Build

1. **Build and run the production container:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode:**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Development Build

1. **Build and run the development container with hot reload:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Run in detached mode:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d --build
   ```

## Manual Docker Commands

### Production

```bash
# Build the image
docker build -t backend .

# Run the container
docker run -p 4000:4000 --env-file .env backend
```

### Development

```bash
# Build the development image
docker build -f Dockerfile.dev -t backend-dev .

# Run the development container
docker run -p 4000:4000 -v $(pwd):/app --env-file .env backend-dev
```

## Environment Variables

Make sure to create a `.env` file based on `env.example` with your actual values:

```bash
# Database Configuration
DATABASE_URL=your_turso_database_url_here
DATABASE_TOKEN=your_turso_auth_token_here

# Server Configuration
PORT=4000
NODE_ENV=production

# Optional: JWT Secret for authentication
JWT_SECRET=your_jwt_secret_here
```

## Health Check

The production container includes a health check that will verify the application is running properly. You can check the health status with:

```bash
docker-compose ps
```

## Logs

View container logs:

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f backend
```

## Troubleshooting

### Port Already in Use
If port 4000 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "4001:4000"  # Maps host port 4001 to container port 4000
```

### Permission Issues
If you encounter permission issues, you can run Docker commands with sudo (on Linux/Mac) or run Docker Desktop as administrator (on Windows).

### Build Issues
If you encounter build issues, try:

```bash
# Clean up Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

## File Structure

```
backend/
├── Dockerfile              # Production Dockerfile
├── Dockerfile.dev          # Development Dockerfile
├── docker-compose.yml      # Production compose file
├── docker-compose.dev.yml  # Development compose file
├── .dockerignore           # Files to exclude from build
└── DOCKER.md              # This documentation
``` 