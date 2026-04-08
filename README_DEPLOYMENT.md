# 📖 Blog Website Project - Deployment & Data Protection

This project includes **complete protection against data loss** with automated backups and persistent storage.

## What's Included

### Frontend (Next.js)
- Responsive blog website
- SEO optimized
- Image optimization

### Backend (Strapi CMS)
- Headless CMS for blog management
- User-friendly admin panel
- Image upload support via Cloudinary

### Data Protection
✅ **Persistent PostgreSQL Database** - Your content survives server restarts  
✅ **Automated Daily Backups** - Never lose blog posts  
✅ **Cloudinary CDN** - Images stored securely off-server  
✅ **Git Version Control** - Content schemas backed up in code  

---

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js 20+ installed
- npm or yarn

### Run Locally

```bash
# Terminal 1: Start Backend
cd backend
npm install
npm run develop
# Strapi runs at http://localhost:1337

# Terminal 2: Start Frontend (in new terminal)
cd frontend
npm install
npm run dev
# Website runs at http://localhost:3000
```

### Create Test Content
1. Visit http://localhost:1337 → Strapi admin
2. Create blog post with title, content, and cover image
3. Visit http://localhost:3000 → See blog post on website

---

## 📦 Deployment Documentation

### For Quick Deployment (10 minutes)
👉 Read: [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

**Includes:**
- 3-step deployment process
- Database setup options
- Image storage setup
- Data protection explanation
- Troubleshooting guide

### For Detailed Setup
👉 Read: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**Includes:**
- PostgreSQL setup (Neon, Railway, Render)
- Cloudinary configuration
- Platform-specific instructions
- CORS setup
- Backup strategies

### For Step-by-Step Checklist
👉 Read: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

**Includes:**
- Pre-deployment checklist
- Deployment steps
- Verification procedures

### For Docker Deployment
👉 Read: [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

**Includes:**
- Docker setup
- Docker Compose configuration
- Container deployment options

### Environment Variables Reference
👉 Read: [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)

**Includes:**
- All variable explanations
- Example production .env
- Security best practices

---

## 📋 Pre-Deployment Checklist

- [ ] Test blog card image displays correctly in local dev
- [ ] Create test blog post and verify it appears on homepage
- [ ] Test blog detail page loads with images
- [ ] Run `npm run build` in both folders - no errors
- [ ] Have PostgreSQL credentials ready (from Neon/Railway/Render)
- [ ] Have Cloudinary credentials ready
- [ ] Have GitHub account (for deployment platforms)

---

## 🛡️ Data Safety Guarantee

### Your Data is Protected Because:

1. **Persistent Database**
   - PostgreSQL stores all blog content
   - Survives server restarts
   - Data persists across deployments

2. **Automated Backups**
   - Daily backups (7-30 day retention)
   - Neon: Free backups included
   - Can restore any backup in minutes

3. **Image Storage**
   - Cloudinary CDN keeps all images
   - Not on server → can't be lost with server
   - Unlimited free tier for testing

4. **Code Backups**
   - Content schemas in Git
   - Can always recreate structure
   - Track changes to content types

### If Something Goes Wrong

| Scenario | Solution | Data Lost? |
|----------|----------|-----------|
| Server crashes | Restart → data intact | ❌ NO |
| You delete blog post | Restore from backup | ❌ NO |
| Cloudinary account issue | Switch to local storage | ❌ NO |
| Database corrupted | Restore from backup | ❌ NO |

---

## 📞 Getting Help

1. **Stuck on deployment?**
   - Read [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) first
   - Check [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) troubleshooting

2. **Need detailed instructions?**
   - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

3. **Database connection issues?**
   - Check [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
   - Test connection locally first

4. **Network or CORS errors?**
   - Verify CORS configured in `backend/config/middlewares.ts`
   - Check `NEXT_PUBLIC_STRAPI_URL` in frontend

---

## 📂 Project Structure

```
.
├── backend/                    # Strapi CMS
│   ├── config/                # Configuration files
│   ├── src/                   # Blog API & admin customization
│   ├── public/uploads/        # Local image uploads (dev)
│   ├── .env.example          # Example environment variables
│   ├── Dockerfile            # Docker image
│   └── backup.sh             # Backup script
│
├── frontend/                   # Next.js Website
│   ├── app/                  # Pages & layouts
│   ├── components/           # React components
│   ├── lib/                  # API utilities
│   ├── .env.example         # Example environment variables
│   └── Dockerfile           # Docker image
│
├── PRODUCTION_DEPLOYMENT.md   # 📍 START HERE
├── DEPLOYMENT_GUIDE.md        # Detailed setup
├── QUICK_DEPLOY.md           # Checklist & tutorial
├── DOCKER_DEPLOYMENT.md      # Docker setup
├── ENVIRONMENT_VARIABLES.md  # All variables explained
├── docker-compose.yml        # Docker Compose config
├── .dockerignore             # Docker ignore file
└── README.md                 # This file
```

---

## 🎯 Deployment Timeline

### First Time Deployment: ~30 minutes
1. Set up PostgreSQL (5 min)
2. Configure Cloudinary (3 min)
3. Deploy backend (10 min)
4. Deploy frontend (10 min)
5. Verify everything works (2 min)

### Subsequent Deployments: ~5 minutes
- Push to main branch
- Automation handles deployment

---

## ✨ Features

- ✅ Headless CMS with Strapi
- ✅ Next.js frontend with SSG/SSR
- ✅ Responsive design (mobile-friendly)
- ✅ SEO optimized
- ✅ Image optimization
- ✅ Production-ready authentication
- ✅ PostgreSQL database
- ✅ Cloudinary image CDN
- ✅ HTTPS/SSL support
- ✅ Automated backups
- ✅ Docker support

---

## 🔐 Security

- Environment variables for secrets
- CORS protection enabled
- JWT authentication
- HTTPS enforced in production
- Database backups encrypted
- Cloudinary API key management

---

## 📊 Deployment Platforms Recommended

### Backend
- **Railway.app** ⭐ Easiest
- Render.com
- Heroku (legacy)

### Frontend
- **Vercel.com** ⭐ Recommended
- Netlify
- Railway

### Database
- **neon.tech** ⭐ FREE with backups
- Railway
- Render

### Images
- **Cloudinary** ⭐ FREE tier generous
- AWS S3
- Google Cloud Storage

---

## 📞 Support Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)

---

## 🎉 Next Steps

1. **Read** [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) (10 min)
2. **Follow** the 3 deployment steps (20 min)
3. **Verify** your site is live and working (5 min)
4. **Create** blog content in Strapi CMS
5. **Celebrate** your live blog! 🎉

---

**Your blog is now production-ready with complete data protection!**

Questions? Check the relevant documentation above.
