#!/bin/bash

# Build and Test Script
# Run before deployment to catch issues early

set -e

echo "🔍 Pre-deployment checks..."
echo ""

# Check Node version
NODE_VERSION=$(node -v)
echo "✓ Node version: $NODE_VERSION"

# Check if we're in project root
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "✗ Error: Run this from project root"
    exit 1
fi

# Build backend
echo ""
echo "🔨 Building backend..."
cd backend
npm install --production=false
npm run build
cd ..
echo "✓ Backend build successful"

# Build frontend
echo ""
echo "🔨 Building frontend..."
cd frontend
npm install --production=false
npm run build
echo "✓ Frontend build successful"

echo ""
echo "✅ All checks passed! Ready to deploy."
echo ""
echo "Next steps:"
echo "1. Set up PostgreSQL database (see QUICK_DEPLOY.md)"
echo "2. Set up Cloudinary for images"
echo "3. Deploy backend to Railway/Render"
echo "4. Deploy frontend to Vercel/Netlify"
