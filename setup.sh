#!/bin/bash

echo "🚀 Setting up Market Daily Report Project"

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo "⚠️  Please fill in your credentials in .env file"
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your Telegram and Email credentials"
echo "2. Run 'npm start' to test locally"
echo "3. Push to GitHub and add secrets for GitHub Actions"
echo ""
echo "Secrets to add on GitHub:"
echo "  - TELEGRAM_TOKEN"
echo "  - TELEGRAM_CHAT_ID"
echo "  - EMAIL_USER"
echo "  - EMAIL_PASSWORD"
echo "  - EMAIL_RECIPIENT"
