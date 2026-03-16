#!/bin/bash

# Cloud Run Deployment Script
# Set these variables
PROJECT_ID="your-gcp-project-id"
SERVICE_NAME="emireq-startup-dashboard"
REGION="us-central1"
IMAGE_NAME="emireq-dashboard"

# Build the image
echo "🔨 Building Docker image..."
docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME:latest .

# Push to Google Container Registry
echo "📤 Pushing to GCR..."
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME:latest \
  --platform managed \
  --region $REGION \
  --memory 256Mi \
  --cpu 1 \
  --allow-unauthenticated \
  --timeout 60 \
  --max-instances 10

echo "✅ Deployment complete!"
echo "Service URL: https://$SERVICE_NAME-<hash>-$REGION.a.run.app"
