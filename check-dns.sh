#!/bin/bash

echo "🔍 Checking DNS propagation for keywordalchemist.com"
echo "================================================="

# Check A record
echo "🌐 A Record (IPv4):"
A_RECORD=$(dig +short keywordalchemist.com A)
if [ "$A_RECORD" = "23.88.106.121" ]; then
    echo "✅ keywordalchemist.com → $A_RECORD (correct)"
else
    echo "❌ keywordalchemist.com → $A_RECORD (should be 23.88.106.121)"
fi

# Check WWW A record
WWW_A_RECORD=$(dig +short www.keywordalchemist.com A)
if [ "$WWW_A_RECORD" = "23.88.106.121" ]; then
    echo "✅ www.keywordalchemist.com → $WWW_A_RECORD (correct)"
else
    echo "❌ www.keywordalchemist.com → $WWW_A_RECORD (should be 23.88.106.121)"
fi

# Check AAAA record (IPv6)
echo ""
echo "🌐 AAAA Record (IPv6):"
AAAA_RECORD=$(dig +short keywordalchemist.com AAAA)
if [ "$AAAA_RECORD" = "2a01:4f8:1c1c:fe08::1" ]; then
    echo "✅ keywordalchemist.com → $AAAA_RECORD (correct)"
else
    echo "⚠️  keywordalchemist.com → $AAAA_RECORD (should be 2a01:4f8:1c1c:fe08::1)"
fi

echo ""
echo "🔗 Test URLs:"
echo "http://keywordalchemist.com"
echo "http://www.keywordalchemist.com"
echo ""

if [ "$A_RECORD" = "23.88.106.121" ] && [ "$WWW_A_RECORD" = "23.88.106.121" ]; then
    echo "✅ DNS is properly configured! You can now set up SSL:"
    echo "   ./setup-ssl.sh"
else
    echo "⏳ DNS is not fully propagated yet. Please wait and try again later."
fi
