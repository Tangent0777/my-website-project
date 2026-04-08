#!/bin/bash

# Database Backup Script for PostgreSQL
# Run this weekly via cron: 0 2 * * 0 /path/to/backend/backup.sh
# This keeps your data safe and recoverable

set -e

# Configuration
BACKUP_DIR="./backups"
RETENTION_DAYS=30
DATE=$(date +%Y%m%d_%H%M%S)

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Get database connection string from environment
if [ -z "$DATABASE_URL" ] && [ -z "$DATABASE_HOST" ]; then
    echo "Error: DATABASE_URL or DATABASE_HOST environment variable not set"
    exit 1
fi

# Build connection string if using individual variables
if [ -n "$DATABASE_HOST" ]; then
    DB_URL="postgresql://$DATABASE_USERNAME:$DATABASE_PASSWORD@$DATABASE_HOST:${DATABASE_PORT:-5432}/$DATABASE_NAME?sslmode=require"
else
    DB_URL=$DATABASE_URL
fi

BACKUP_FILE="$BACKUP_DIR/backup_${DATE}.sql"

echo "Starting database backup at $(date)"
echo "Backup file: $BACKUP_FILE"

# Create backup
if pg_dump "$DB_URL" > "$BACKUP_FILE"; then
    echo "✓ Backup completed successfully"
    
    # Compress backup
    gzip "$BACKUP_FILE"
    echo "✓ Backup compressed: ${BACKUP_FILE}.gz"
    
    # Count current backups
    BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/backup_*.sql.gz 2>/dev/null | wc -l)
    echo "Current backups: $BACKUP_COUNT"
    
    # Optional: Upload to cloud storage (AWS S3, Google Cloud, etc.)
    # aws s3 cp "${BACKUP_FILE}.gz" s3://your-bucket/backups/
    
else
    echo "✗ Backup failed!"
    exit 1
fi

echo "Backup completed at $(date)"
