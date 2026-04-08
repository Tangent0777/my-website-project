# Quick Start - Deployment Checklists

## Pre-Deployment Checklist (Local Testing)

- [ ] Test blog card images display correctly
- [ ] Test blog detail page 
- [ ] Create a test blog post and verify it appears on frontend
- [ ] Clear cache and hard refresh browser (Cmd+Shift+R)
- [ ] Build backend: `cd backend && npm run build` (no errors)
- [ ] Build frontend: `cd frontend && npm run build` (no errors)
- [ ] Test with mock production variables locally

---

## Deployment Steps

### 1. Set Up PostgreSQL Database

**Choose one:**
- [Neon](https://neon.tech) - FREE, recommended
- [Railway](https://railway.app) - $5/month
- [Render](https://render.com) - Free tier available

Save your connection details: `postgresql://user:pass@host/dbname`

### 2. Set Up Cloudinary (Image Storage)

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (FREE)
3. Dashboard → Copy: Cloud Name, API Key, API Secret
4. Generate an upload URL signature for security

### 3. Deploy Backend (Strapi CMS)

**Choose platform:**

#### Railway (Easiest)
```bash
npm install -g railway
railway login
cd backend
railway up
```
- Railway automatically detects and deploys
- Copy your railway domain: `https://your-app-xxx.railway.app`

#### Render
1. Push to GitHub
2. Create new Web Service on render.com
3. Select backend folder
4. Add environment variables
5. Deploy

### 4. Deploy Frontend (Next.js)

**Choose platform:**

#### Vercel (Easiest + Fastest)
1. Push to GitHub
2. Go to vercel.com
3. Import project → Select frontend folder
4. Add environment: `NEXT_PUBLIC_STRAPI_URL=https://your-backend-url`
5. Deploy

#### Netlify
```bash
npm install -g netlify-cli
cd frontend
netlify deploy
```

### 5. Update CORS in Strapi

Edit `backend/config/middlewares.ts`:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: ['https://your-frontend-url.com'],
  },
},
```

Redeploy backend after this change.

---

## Verify Deployment

Visit `https://your-frontend-domain.com`:

1. ✅ Homepage loads
2. ✅ "Latest Articles" section shows blog posts with images
3. ✅ Click on a blog → detail page loads with cover image
4. ✅ Create new post in Strapi CMS → appears on frontend within 60 seconds

---

## Your Data is Now Safe! 

- ✅ PostgreSQL handles all database backups automatically
- ✅ Cloudinary stores all images (can never be lost)
- ✅ Server restart = no data loss
- ✅ CMS wipe = restore from database backup

---

## Common Issues & Solutions

### Images not showing
- Check Cloudinary is enabled in production
- Verify CLOUDINARY_NAME, CLOUDINARY_KEY are set
- Clear browser cache (Cmd+Shift+R)

### Blog posts not appearing
- Check NEXT_PUBLIC_STRAPI_URL is correct
- Verify Strapi API is running
- Check browser console for CORS errors

### Database connection failing
- Test connection: `psql postgresql://...` from terminal
- Verify DATABASE_HOST, DATABASE_PORT, credentials
- Check PostgreSQL firewall allows connections

---

## Monitoring

Check logs regularly:
- **Railway**: Dashboard → Logs tab
- **Vercel**: Deployments → Function logs
- **Netlify**: Deploys → Deploy log

---

Need help? See full guide: `DEPLOYMENT_GUIDE.md`
