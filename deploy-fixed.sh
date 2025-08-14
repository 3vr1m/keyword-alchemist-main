#!/bin/bash

echo "🚀 Deploying Keyword Alchemist with proper environment variables..."

# Load environment variables
if [ -f .env ]; then
    source .env
    echo "✅ Loaded environment variables from .env"
else
    echo "❌ .env file not found!"
    exit 1
fi

# Check required variables
if [ -z "$REACT_APP_GEMINI_API_KEY" ]; then
    echo "❌ REACT_APP_GEMINI_API_KEY not set!"
    exit 1
fi

if [ -z "$REACT_APP_API_URL" ]; then
    echo "❌ REACT_APP_API_URL not set!"
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker compose -f docker-compose.prod.yml down

# Build with environment variables
echo "🔨 Building with environment variables..."
REACT_APP_GEMINI_API_KEY="$REACT_APP_GEMINI_API_KEY" \
REACT_APP_API_URL="$REACT_APP_API_URL" \
STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
STRIPE_PUBLISHABLE_KEY="$STRIPE_PUBLISHABLE_KEY" \
STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" \
docker compose -f docker-compose.prod.yml build --no-cache

# Start containers
echo "🚀 Starting containers..."
REACT_APP_GEMINI_API_KEY="$REACT_APP_GEMINI_API_KEY" \
REACT_APP_API_URL="$REACT_APP_API_URL" \
STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
STRIPE_PUBLISHABLE_KEY="$STRIPE_PUBLISHABLE_KEY" \
STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" \
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "🔗 Your site: https://keywordalchemist.com"
echo "🏥 Health check: https://keywordalchemist.com/api/health"
echo ""
echo "📊 Container status:"
docker compose -f docker-compose.prod.yml ps
