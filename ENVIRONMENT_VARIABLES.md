# Environment Variables Reference

This document explains all environment variables needed for production deployment.

## Backend Environment Variables

### Core Server Config
- **NODE_ENV**: Set to `production` for production deployments
- **HOST**: Server host (default: `0.0.0.0`)
- **PORT**: Server port (default: `1337`)

### Security Keys (MUST be generated randomly)
```bash
# Generate keys with:
openssl rand -base64 32
```

- **APP_KEYS**: Comma-separated list of keys for session encryption (minimum 2)
- **JWT_SECRET**: Secret for JWT token signing
- **JWT_EXPIRES_IN**: JWT token expiration (default: `7d`)
- **ADMIN_JWT_SECRET**: Secret for admin JWT tokens

### Database (PostgreSQL)
When running with PostgreSQL in production:
- **DATABASE_HOST**: PostgreSQL server hostname
- **DATABASE_PORT**: PostgreSQL server port (default: `5432`)
- **DATABASE_NAME**: Database name (e.g., `strapi`)
- **DATABASE_USERNAME**: Database user
- **DATABASE_PASSWORD**: Database password

Or use connection string:
- **DATABASE_URL**: Full PostgreSQL connection string

### Image Storage (Cloudinary)
For production image uploads:
- **CLOUDINARY_NAME**: Your Cloudinary cloud name
- **CLOUDINARY_KEY**: Cloudinary API key
- **CLOUDINARY_SECRET**: Cloudinary API secret (KEEP PRIVATE!)

### CORS Configuration
- **ALLOWED_ORIGINS**: Comma-separated list of allowed frontend domains
  Example: `https://example.com,https://www.example.com`

### Optional
- **STRAPI_API_TOKEN**: API token for programmatic access

## Frontend Environment Variables

### Required
- **NEXT_PUBLIC_STRAPI_URL**: URL to your Strapi backend
  - Development: `http://localhost:1337`
  - Production: `https://your-strapi-domain.com`

### Optional
- **NEXT_PUBLIC_GA_ID**: Google Analytics tracking ID
- **STRAPI_API_TOKEN**: If you need authenticated API requests

## Example Production .env

```env
# Server
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Security (generate with: openssl rand -base64 32)
APP_KEYS=YOUR_GENERATED_KEY_1,YOUR_GENERATED_KEY_2,YOUR_GENERATED_KEY_3
JWT_SECRET=YOUR_GENERATED_JWT_SECRET
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=YOUR_GENERATED_ADMIN_SECRET

# Database - PostgreSQL (from Neon, Railway, or Render)
DATABASE_HOST=ep-something.us-east-1.neon.tech
DATABASE_PORT=5432
DATABASE_NAME=neondb
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=your_secure_password

# Image Storage - Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# CORS
ALLOWED_ORIGINS=https://example.com,https://www.example.com
```

## Deployment-Specific Variables

### Railway
Use Railway environment variables directly in dashboard - they are automatically injected.

### Render
Set as Config Variables in render.com dashboard.

### Vercel (Frontend)
Set in Project Settings → Environment Variables.

## Security Best Practices

⚠️ **NEVER**:
- Commit `.env` files to Git
- Share API keys or secrets in messages
- Use same keys across development and production
- Generate secrets manually (always use `openssl rand -base64 32`)

✅ **DO**:
- Use platform-specific secret management (Railway, Vercel, etc.)
- Rotate secrets every 3 months
- Use different keys for development vs production
- Store backups of security keys in secure location
- Use HTTPS for all production URLs

## Verifying Configuration

```bash
# Test database connection
psql postgresql://username:password@host/database

# Test Strapi API
curl https://your-strapi-domain.com/api/blogs

# Test frontend
curl https://your-frontend-domain.com
```
