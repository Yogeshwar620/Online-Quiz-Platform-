#!/bin/bash

# Quiz by Yogesh - Installation Script
# Created by Yogeshwar Yadav for IT Developer Company

echo "🧠 Quiz by Yogesh - Installation"
echo "================================"
echo ""
echo "Created by: Yogeshwar Yadav"
echo "Company: IT Developer"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies!"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "⚙️ Creating environment configuration..."
    cp .env.example .env
    echo "✅ Created .env file (you can edit it if needed)"
fi

echo ""
echo "🎉 Installation Complete!"
echo "========================"
echo ""
echo "To start the server:"
echo "  npm start        # Production mode"
echo "  npm run dev      # Development mode"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Default admin login:"
echo "  Email: admin@quiz.com"
echo "  Password: admin123"
echo ""
echo "Happy coding! 🚀"
echo ""
echo "Created with ❤️ by Yogeshwar Yadav"
echo "IT Developer Company - Internship Project"