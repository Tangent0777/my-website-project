# Image Upload Troubleshooting Guide

## If image upload fails in Strapi

### Quick Fix Steps:

1. **Redeploy backend on Render**
   - Go to https://dashboard.render.com/r/my-website-project
   - Click "Trigger deploy" → "Deploy latest"
   - Wait 5-10 minutes

2. **Clear browser cache**
   - Cmd+Shift+R (hard refresh Strapi admin)

3. **Try uploading again**
   - Go to blog post edit page
   - Click "Add assets"
   - Select image (JPG/PNG)
   - Wait for upload

### If Still Failing:

Check the Render logs for errors:
1. Dashboard → my-website-project
2. Click "Logs" tab
3. Look for any upload-related errors

### Workaround - Skip Image For Now:

You can create blog posts without images:
1. Fill in: Title, Slug, Content, Category, Excerpt
2. Leave Cover image blank
3. Publish
4. Blog will appear on website (with placeholder)
5. Add image later once upload works

### Image Storage:

During development, images stored:
- **Locally on Render server** (temporary)
- Once Cloudinary is configured, images move to CDN (permanent)

Images will persist as long as Render service keeps running.
