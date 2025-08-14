#!/usr/bin/env python3
"""
Simple HTTP server to preview the Keyword Alchemist landing page
Run: python3 launch.py
Then open: http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Set the directory to serve
os.chdir(Path(__file__).parent)

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"🚀 Keyword Alchemist Landing Page Server")
            print(f"📍 Serving at: http://localhost:{PORT}")
            print(f"📁 Directory: {os.getcwd()}")
            print(f"🌐 Opening browser...")
            print(f"🛑 Press Ctrl+C to stop")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n✅ Server stopped")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
