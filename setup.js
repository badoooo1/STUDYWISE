#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 StudyWise Setup Script');
console.log('========================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
        console.log('📝 Creating .env file from template...');
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ .env file created successfully!');
        console.log('⚠️  Please edit .env and add your GEMINI_API_KEY');
        console.log('   Get your API key from: https://makersuite.google.com/app/apikey\n');
    } else {
        console.log('❌ env.example file not found');
        console.log('   Please create a .env file manually with your GEMINI_API_KEY\n');
    }
} else {
    console.log('✅ .env file already exists');
}

// Check if uploads directory exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    console.log('📁 Creating uploads directory...');
    fs.mkdirSync(uploadsPath);
    console.log('✅ uploads directory created successfully!\n');
} else {
    console.log('✅ uploads directory already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('📦 Installing dependencies...');
    console.log('   Run: npm install\n');
} else {
    console.log('✅ Dependencies are installed\n');
}

console.log('🎯 Next Steps:');
console.log('1. Edit .env file and add your GEMINI_API_KEY');
console.log('2. Run: npm run dev:full (to start both frontend and backend)');
console.log('3. Or run separately:');
console.log('   - Backend: npm run server:dev');
console.log('   - Frontend: npm run dev');
console.log('\n📚 For more information, see README.md');
