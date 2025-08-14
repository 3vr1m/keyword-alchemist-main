#!/bin/bash

# Keyword Alchemist Deployment Script
# Usage: ./deploy.sh [server-ip]

SERVER_IP=${1:-"your-server-ip"}
PROJECT_NAME="keyword-alchemist"
REMOTE_PATH="/opt/$PROJECT_NAME"

echo "🚀 Starting deployment to $SERVER_IP..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if server IP is provided
if [ "$SERVER_IP" = "your-server-ip" ]; then
    print_error "Please provide your server IP address:"
    echo "Usage: ./deploy.sh your-server-ip"
    exit 1
fi

# Check if Docker is available
print_status "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed or not in PATH. Please install Docker first."
    exit 1
fi

print_status "Docker found!"

# Create deployment directory on server
print_status "Creating deployment directory on server..."
ssh root@$SERVER_IP "mkdir -p $REMOTE_PATH"

# Copy files to server
print_status "Copying files to server..."
rsync -avz --exclude 'node_modules' --exclude '.git' --exclude 'build' --exclude '.env*' . root@$SERVER_IP:$REMOTE_PATH/

# Build and run on server
print_status "Building and starting container on server..."
ssh root@$SERVER_IP << EOF
    cd $REMOTE_PATH
    
    # Check if production environment file exists
    if [ ! -f .env.production ]; then
        echo "⚠️  Creating .env.production template..."
        cp .env.production.example .env.production
        echo "❗ Please edit .env.production and add your API keys before continuing."
        echo "❗ Run: nano .env.production"
        exit 1
    fi
    
    # Load environment variables
    export \$(cat .env.production | grep -v '^#' | xargs)
    
    # Stop existing container if running
    docker compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Build and start the new container
    docker compose -f docker-compose.prod.yml up -d --build
    
    # Show container status
    docker compose -f docker-compose.prod.yml ps
    
    echo "✅ Deployment complete!"
    echo "🌐 Application should be available on port 3001"
    echo "📝 Don't forget to configure your reverse proxy/domain"
EOF

print_status "Deployment completed successfully!"
print_warning "Next steps:"
echo "1. Configure your reverse proxy (Nginx/Caddy) to point to port 3001"
echo "2. Set up SSL certificate for your domain"
echo "3. Update DNS records if needed"
