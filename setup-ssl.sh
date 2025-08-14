#!/bin/bash

echo "🔒 Setting up SSL certificate for keywordalchemist.com..."

# Check if domain resolves to this server
echo "🧪 Checking DNS resolution..."
DOMAIN_IP=$(dig +short keywordalchemist.com)
SERVER_IP=$(curl -4 -s ifconfig.me)

if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
    echo "⚠️  Warning: Domain keywordalchemist.com resolves to $DOMAIN_IP but this server is $SERVER_IP"
    echo "Please ensure DNS records are properly configured and propagated."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Obtain SSL certificate
echo "📜 Obtaining SSL certificate..."
certbot --nginx -d keywordalchemist.com -d www.keywordalchemist.com --non-interactive --agree-tos --email admin@keywordalchemist.com

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate obtained successfully!"
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    
    echo ""
    echo "🎉 SSL setup complete!"
    echo "Your site is now available at: https://keywordalchemist.com"
    echo ""
    echo "SSL certificate will auto-renew. You can test renewal with:"
    echo "certbot renew --dry-run"
else
    echo "❌ Failed to obtain SSL certificate"
    echo "Please check:"
    echo "1. DNS records are correctly configured"
    echo "2. Domain resolves to this server"
    echo "3. Ports 80 and 443 are open"
    exit 1
fi
