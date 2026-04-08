# Deployment Guide - Data Persistence & Production Setup

This guide ensures your blog content is **never lost** even if the server restarts or gets reset.

## Overview

- **Backend (Strapi CMS)**: SQLite (dev) → PostgreSQL (production) - persistent database
- **Frontend (Next.js)**: Deployed with automatic image optimization
- **Image Storage**: Local uploads (dev) → Cloudinary CDN (production)
- **Database Backups**: Automated PostgreSQL backups

---

## 1. Production Database Setup (PostgreSQL)

### Option A: Using Neon (Recommended - Free Tier Available)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project → Copy the connection string
3. Your connection details will look like:
   ```
   postgresql://user:password@ep-xxx.us-east-1.neon.tech/dbname?sslmode=require
   ```

### Option B: Using Railway or Render

- [Railway.app](https://railway.app) - $5/month PostgreSQL
- [Render.com](https://render.com) - Free tier with limitations

---

## 2. Backend Deployment (Strapi)

### Step 1: Update Backend Environment Variables

Create `.env` file in `backend/` with production settings:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate these with: openssl rand -base64 32
APP_KEYS=YOUR_GENERATED_KEY_1,YOUR_GENERATED_KEY_2
JWT_SECRET=YOUR_GENERATED_KEY
JWT_EXPIRES_IN=7d
ADMIN_JWT_SECRET=YOUR_GENERATED_KEY

# PostgreSQL Database (from Neon/Railway/Render)
DATABASE_HOST=your-host.neon.tech
DATABASE_PORT=5432
DATABASE_NAME=neondb
DATABASE_USERNAME=neondb_owner
DATABASE_PASSWORD=your-password

# Cloudinary for image storage
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### Step 2: Generate Security Keys

```bash
# Generate APP_KEYS (create 2)
openssl rand -base64 32

# Generate JWT_SECRET
openssl rand -base64 32

# Generate ADMIN_JWT_SECRET
openssl rand -base64 32
```

### Step 3: Set Up Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. In Dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret (keep this private!)
3. Add to your `.env` file

### Step 4: Deploy Backend

Choose one of these platforms:

#### Option A: Railway.app (Recommended)

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Deploy
cd backend
railway up
```

#### Option B: Render.com

1. Push your code to GitHub
2. Connect repository to Render
3. Create new Web Service → Select `backend` directory
4. Set environment variables in Render dashboard
5. Deploy

#### Option C: Heroku (Legacy but simple)

```bash
# Install Heroku CLI
npm install -g heroku

# Login & create app
heroku login
heroku create your-app-name

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set APP_KEYS=YOUR_GENERATED_KEY_1,YOUR_GENERATED_KEY_2
# ... (set all variables from .env)

# Deploy
git push heroku main
```

---

## 3. Frontend Deployment (Next.js)

### Deploy to Vercel (Recommended)

1. Push your frontend code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository
5. Set environment variables:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-deployed-strapi-url.com
   ```
6. Click "Deploy"

### Deploy to Netlify

```bash
npm install -g netlify-cli

cd frontend
netlify deploy
```

When prompted:
- Build command: `npm run build`
- Publish directory: `.next`
- Set environment variables in Netlify dashboard

### Deploy to Railway

```bash
railway link    # Connect to your project
railway up      # Deploy frontend
```

---

## 4. Database Backups (Critical for Data Persistence)

### Automated Backups with Neon

1. In Neon dashboard → Project settings → Backups
2. Enable automated daily backups (free tier: 7-day retention)
3. You can restore from backups anytime

### Manual Backup (PostgreSQL)

```bash
# Backup your database
pg_dump postgresql://user:password@host/dbname > backup.sql

# Restore from backup
psql postgresql://user:password@host/dbname < backup.sql
```

### Backup Script

Create `backend/backup.sh`:

```bash
#!/bin/bash

# Set your database connection
DB_URL="postgresql://user:password@host/dbname"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Create backup
pg_dump $DB_URL > $BACKUP_DIR/backup_$DATE.sql

# Keep last 7 backups only
ls -t $BACKUP_DIR/backup_*.sql | tail -n +8 | xargs rm -f

echo "Backup created: $BACKUP_DIR/backup_$DATE.sql"
```

Run weekly: `0 2 * * 0 /path/to/backend/backup.sh` (cron job)

---

## 5. Configuration Checklist

- [ ] PostgreSQL database created & accessible
- [ ] Cloudinary account set up
- [ ] All environment variables generated and stored securely
- [ ] Backend built locally: `cd backend && npm run build`
- [ ] Frontend tested with production Strapi URL
- [ ] Backup strategy configured
- [ ] HTTPS enabled on both services
- [ ] CORS configured in Strapi for frontend domain

---

## 6. Strapi CORS Configuration

Edit `backend/config/middlewares.ts`:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  // ... rest of middlewares
];
```

---

## 7. Verification Checklist

After deployment:

1. ✅ Visit `https://your-frontend-domain.com` → should load homepage
2. ✅ Visit blog page → should display blog posts from Strapi
3. ✅ Images should load from Cloudinary
4. ✅ Create new blog post in Strapi CMS → should appear on frontend
5. ✅ Verify database backups are running
6. ✅ Check server logs for any errors

---

## 8. Data Safety & Recovery

### Your data is safe because:

✅ **PostgreSQL Database** - Persistent, survives server restarts  
✅ **Automated Backups** - Daily backups with Neon (7-day retention)  
✅ **Cloudinary Images** - Images stored in CDN, not on server  
✅ **Version Control** - Content type schemas in Git  

### If data is accidentally deleted:

1. Restore from PostgreSQL backup (Neon dashboard → Backups)
2. No need to redeploy - database will be restored
3. All images remain safe in Cloudinary

---

## 9. Monitoring & Maintenance

- Check application logs weekly
- Test restore from backup monthly
- Review Cloudinary storage usage
- Monitor database query performance
- Update dependencies monthly: `npm update`

---

## Support & Resources

- [Strapi Deployment Docs](https://docs.strapi.io/dev-docs/deployment)
- [Next.js Production Deployment](https://nextjs.org/learn/production)
- [PostgreSQL Backups](https://www.postgresql.org/docs/current/backup.html)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

