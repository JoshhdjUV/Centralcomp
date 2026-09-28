#!/usr/bin/env node

/**
 * Build script to inject environment variables into scoreboard.html
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file if it exists
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([^#][^=]+?)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        const value = match[2] || '';
        process.env[key] = value;
      }
    });
  }
}

loadEnv();

// Get environment variables
const API_KEY = process.env.SCOREBOARD_API_KEY || '';
const API_URL = process.env.SCOREBOARD_API_URL || '/api/public/competition/scoreboard';

if (!API_KEY) {
  console.warn('⚠️  Warning: SCOREBOARD_API_KEY not set. The scoreboard will not work without an API key.');
  console.warn('   Set it in .env file or as an environment variable.');
}

// Read the template
const templatePath = path.join(__dirname, 'client', 'public', 'scoreboard.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Inject the configuration
const configured = template.replace(
  /const API_KEY = window\.SCOREBOARD_API_KEY \|\| '';/,
  `const API_KEY = window.SCOREBOARD_API_KEY || '${API_KEY}';`
).replace(
  /const API_URL = window\.SCOREBOARD_API_URL \|\| '\/api\/public\/competition\/scoreboard';/,
  `const API_URL = window.SCOREBOARD_API_URL || '${API_URL}';`
);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Write the configured file
const outputPath = path.join(distDir, 'index.html');
fs.writeFileSync(outputPath, configured, 'utf8');

console.log('✅ Build successful!');
console.log(`   Output: ${outputPath}`);
console.log(`   API URL: ${API_URL}`);
console.log(`   API Key: ${API_KEY ? '***' + API_KEY.slice(-4) : 'NOT SET'}`);
