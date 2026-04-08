# Deploy to Netlify (Frontend - Next.js Website)

**⚠️ Important:** Deploy backend to Render first! See `DEPLOY_RENDER.md`

## Step 1: Create Netlify Account & Connect GitHub

1. Go to https://netlify.com
2. Click **Sign up**
3. Choose **GitHub** as provider
4. Authorize Netlify to access your GitHub (Tangent0777)

## Step 2: Create New Site from Git

1. Click **Add new site** → **Import an existing project**
2. Select **GitHub**
3. Search for and select: `my-website-project`
4. Click **Install and Authorize**

## Step 3: Configure Build Settings

Fill in these values:

| Field | Value |
|-------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

## Step 4: Add Environment Variables

1. Click **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add these variables:

```
NEXT_PUBLIC_STRAPI_URL = https://your-backend-url.onrender.com
```

(Replace `your-backend-url` with actual URL from Render deployment)

## Step 5: Deploy

Click **Deploy**

Netlify will:
- Pull from GitHub
- Build Next.js frontend
- Deploy to production
- Give you a URL (looks like: `https://your-site-name.netlify.app`)

## Step 6: Verify Frontend is Working

1. Visit your Netlify URL
2. Homepage should load with "Latest Articles"
3. Click on a blog post → detail page should load
4. Check that images load correctly

If everything appears correct, you're done! ✅

---

## Troubleshooting

### Images not showing?
- Check `NEXT_PUBLIC_STRAPI_URL` environment variable
- Verify Render backend is running at that URL
- Clear browser cache (Cmd+Shift+R)

### Blog posts not appearing?
- Make sure you created blog posts in Strapi CMS
- Check that Render backend URL is correct
- Check browser console for CORS errors

### Build fails?
- Check Netlify build logs for errors
- Verify `NEXT_PUBLIC_STRAPI_URL` is set
- Try rebuilding: Site settings → Deploys → Trigger deploy

---

## Success! 🎉

Your website is now live with:
✅ Frontend deployed to Netlify
✅ Backend deployed to Render
✅ Database on Neon (PostgreSQL)
✅ Images on Cloudinary
✅ Automatic daily backups

You can now:
1. Create/edit blog posts in Strapi CMS (`https://your-backend-url.onrender.com/admin`)
2. Website automatically updates when you create content
3. Images are stored safely in Cloudinary
4. Database backups happen automatically on Neon
