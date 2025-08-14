#!/bin/bash

echo "🌐 Setting up custom domain for Keyword Alchemist..."

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    apt-get update
    apt-get install -y nginx
fi

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot for SSL..."
    apt-get install -y certbot python3-certbot-nginx
fi

# Copy nginx configuration
echo "📋 Setting up Nginx configuration..."
cp /opt/keyword-alchemist/nginx-domain.conf /etc/nginx/sites-available/keywordalchemist.com

# Enable the site
echo "🔗 Enabling site..."
ln -sf /etc/nginx/sites-available/keywordalchemist.com /etc/nginx/sites-enabled/

# Remove default nginx site if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "🗑️  Removing default Nginx site..."
    rm /etc/nginx/sites-enabled/default
fi

# Test nginx configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    systemctl reload nginx
    systemctl enable nginx
    echo "🔄 Nginx reloaded and enabled"
else
    echo "❌ Nginx configuration error!"
    exit 1
fi

# Check if containers are running
echo "🐳 Checking Docker containers..."
if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Containers are running"
else
    echo "⚠️  Starting containers..."
    docker compose -f docker-compose.prod.yml up -d
fi

echo ""
echo "🎉 Domain setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure DNS records at your domain registrar:"
echo "   A record: keywordalchemist.com → 23.88.106.121"
echo "   A record: www.keywordalchemist.com → 23.88.106.121"
echo "   AAAA record: keywordalchemist.com → 2a01:4f8:1c1c:fe08::1"
echo "   AAAA record: www.keywordalchemist.com → 2a01:4f8:1c1c:fe08::1"
echo ""
echo "2. Wait for DNS propagation (can take up to 24 hours)"
echo ""
echo "3. Test your domain: http://keywordalchemist.com"
echo ""
echo "4. Set up SSL certificate (run after DNS propagation):"
echo "   ./setup-ssl.sh"
echo ""
