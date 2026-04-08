# Docker Deployment Guide

For users who prefer Docker containerization, this project includes Docker support.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL will be automatically set up in a container
- Cloudinary account for production image uploads

## Local Development with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Backend: http://localhost:1337
- Frontend: http://localhost:3000
- Database: postgres://localhost:5432

## Production Docker Deployment

1. **Set environment variables** in `.env` file:
```env
APP_KEYS=your_generated_key_1,your_generated_key_2
JWT_SECRET=your_generated_key
ADMIN_JWT_SECRET=your_generated_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

2. **Build images for production**:
```bash
docker-compose -f docker-compose.yml build
```

3. **Deploy to your server** (AWS, DigitalOcean, Linode, etc.):
```bash
# Copy docker-compose.yml and .env to your server
scp docker-compose.yml user@server:/path/to/project/
scp .env user@server:/path/to/project/

# SSH into server
ssh user@server

# Navigate to project directory
cd /path/to/project

# Start services
docker-compose up -d
```

## Database Backups with Docker

```bash
# Backup database
docker-compose exec postgres pg_dump -U strapi strapi > backup.sql

# Restore from backup
cat backup.sql | docker-compose exec -T postgres psql -U strapi strapi
```

## Monitoring Docker Containers

```bash
# View container status
docker-compose ps

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

## Cleanup

```bash
# Stop and remove all containers and volumes
docker-compose down -v

# Remove images
docker-compose down --rmi all
```

See main `DEPLOYMENT_GUIDE.md` for detailed production setup instructions.
