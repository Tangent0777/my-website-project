# Deploy Frontend to Netlify - Your Setup

## Your Backend URL
```
https://my-website-project-ynpr.onrender.com
```

**Use this URL in all steps below!**

---

## Step 1: Go to Netlify and Connect GitHub

1. Go to https://netlify.com
2. Click **Sign up** (or **Log in** if you have account)
3. Choose **GitHub** as provider
4. Authorize Netlify (sign in with GitHub account Tangent0777)

---

## Step 2: Import Your Project

1. Click **Add new site** → **Import an existing project**
2. Choose **GitHub**
3. Search for: `my-website-project` (Tangent0777)
4. Click to select it
5. Click **Install and authorize**

---

## Step 3: Configure Build Settings

You'll see a form. Fill it exactly like this:

| Setting | Value |
|---------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |

---

## Step 4: Add Environment Variables

Before clicking Deploy, you MUST add the environment variable:

1. Click **Add environment variable** (or **Environment** section)
2. Add this ONE variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_STRAPI_URL` | `https://my-website-project-ynpr.onrender.com` |

⚠️ **IMPORTANT:** Paste the exact Render URL above (your backend URL)

---

## Step 5: Deploy

Click **Deploy my-website-project**

Wait 5-10 minutes for the build to complete. You'll see:
- "Building..." → "Building" (deploying)
- "Live" (when done!)

Netlify will give you a URL like: `https://your-site-name.netlify.app`

---

## Step 6: Test Your Site

1. Click the Netlify URL to visit your site
2. You should see:
   - ✅ Homepage loads
   - ✅ "Latest Articles" section
   - ✅ Blog posts appear (if you created any)
   - ✅ Images load correctly

3. Click on a blog post:
   - ✅ Detail page loads
   - ✅ Cover image appears

---

## If Build Fails

1. Check **Deploys** tab → Click the failed deploy
2. Scroll down to see **Build log**
3. Look for red error messages
4. Common fixes:
   - Verify `NEXT_PUBLIC_STRAPI_URL` is set correctly
   - Clear build cache: Deploy settings → Delete cache and redeploy
   - Check that backend is still running

---

## Success! 🎉

Once live, you can:

1. **Create blog posts** in Strapi:
   - Go to: `https://my-website-project-ynpr.onrender.com/admin`
   - Create new blog post with image
   - Publish

2. **Website updates automatically**
   - Changes appear within 60 seconds
   - No manual redeploy needed

3. **Your data is safe**:
   - PostgreSQL backups run daily
   - Images stored on Cloudinary
   - Nothing is lost if server restarts

---

**Done with frontend? Great!** 🎉

Your complete setup:
- 🌐 Frontend: https://your-netlify-url.netlify.app
- 🎛️ Backend: https://my-website-project-ynpr.onrender.com/admin
- 💾 Database: Neon (PostgreSQL with backups)
- 🖼️ Images: Cloudinary

Everything is live and protected!
