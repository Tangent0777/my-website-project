# Deploy to Render (Backend - Strapi CMS)

## Step 1: Create New Web Service on Render

1. Go to https://render.com
2. Sign in with GitHub (use Tangent0777 account)
3. Click **New +** → **Web Service**
4. Select your repository: `my-website-project`
5. Click **Connect**

## Step 2: Configure Deployment Settings

Fill in these values:

| Field | Value |
|-------|-------|
| **Name** | my-website-backend |
| **Environment** | Node |
| **Build Command** | `cd backend && npm install && npm run build` |
| **Start Command** | `cd backend && npm start` |
| **Publish directory** | (leave empty) |

## Step 3: Add Environment Variables

Click **Add Environment Variable** and add these ONE BY ONE:

```
NODE_ENV = production
DATABASE_HOST = ep-falling-smoke-a45qbdbp.us-east-1.aws.neon.tech
DATABASE_PORT = 5432
DATABASE_NAME = neondb
DATABASE_USERNAME = neondb_owner
DATABASE_PASSWORD = npg_hNeU4ME0zZwf
APP_KEYS = Hmm8EuxhKgajSV6iT4L8LVtZPyBpRIxQKF1JNTTlAWc=,ikEP633x231a8dQyfamIyZuXR1Ol9UGSR5UGX8v/SU0=
JWT_SECRET = dTA6dJUhUBTqsCZIUQolkRcEgQJgFf1zUEOi846zGqc=
ADMIN_JWT_SECRET = dTA6dJUhUBTqsCZIUQolkRcEgQJgFf1zUEOi846zGqc=
API_TOKEN_SALT = dTA6dJUhUBTqsCZIUQolkRcEgQJgFf1zUEOi846zGqc=
TRANSFER_TOKEN_SALT = dTA6dJUhUBTqsCZIUQolkRcEgQJgFf1zUEOi846zGqc=
ENCRYPTION_KEY = Hmm8EuxhKgajSV6iT4L8LVtZPyBpRIxQKF1JNTTlAWc=
CLOUDINARY_NAME = Untitled
CLOUDINARY_KEY = 276162965681167
CLOUDINARY_SECRET = 4sFQSXqoiYqRHIjLUBXiUP9z_Io
ALLOWED_ORIGINS = *
HOST = 0.0.0.0
PORT = 1337
```

## Step 4: Deploy

Click **Create Web Service**

Render will:
- Build your backend
- Deploy to production
- Give you a URL (looks like: `https://my-website-backend.onrender.com`)

**Copy this URL** - you'll need it for frontend deployment!

## Step 5: Verify Backend is Running

Wait 5-10 minutes for deployment to complete, then:

1. Go to your backend URL: `https://my-website-backend.onrender.com/admin`
2. You should see Strapi login page
3. Try to access API: `https://my-website-backend.onrender.com/api/blogs`

If you see JSON response, backend is working! ✅

---

## Next: Deploy Frontend to Netlify

After backend is deployed, follow: `DEPLOY_NETLIFY.md`
