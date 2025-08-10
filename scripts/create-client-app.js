#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Please provide a project name:');
  console.log('   npm run create-client -- my-project-name');
  console.log('   pnpm create-client my-project-name');
  process.exit(1);
}

const isValidProjectName = /^[a-z0-9-]+$/.test(projectName);
if (!isValidProjectName) {
  console.error('❌ Project name must contain only lowercase letters, numbers, and hyphens');
  process.exit(1);
}

const appsDir = path.join(__dirname, '..', 'apps');
const templateDir = path.join(appsDir, 'template-app');
const targetDir = path.join(appsDir, projectName);

if (fs.existsSync(targetDir)) {
  console.error(`❌ Project "${projectName}" already exists in apps/${projectName}`);
  process.exit(1);
}

if (!fs.existsSync(templateDir)) {
  console.error('❌ Template app not found. Please ensure template-app exists in apps/');
  process.exit(1);
}

console.log(`🚀 Creating new client app: ${projectName}`);
console.log(`📁 Copying from template-app...`);

try {
  // Copy template app
  execSync(`cp -r "${templateDir}" "${targetDir}"`, { stdio: 'inherit' });
  
  // Remove node_modules and lock files
  execSync(`rm -rf "${targetDir}/node_modules"`, { stdio: 'inherit' });
  execSync(`rm -f "${targetDir}/package-lock.json"`, { stdio: 'inherit' });
  execSync(`rm -f "${targetDir}/pnpm-lock.yaml"`, { stdio: 'inherit' });
  
  // Update package.json name
  const packageJsonPath = path.join(targetDir, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Create .env from example
  const envExamplePath = path.join(targetDir, '.env.example');
  const envPath = path.join(targetDir, '.env');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
  }
  
  console.log(`✅ Client app "${projectName}" created successfully!`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. cd apps/${projectName}`);
  console.log(`   2. Configure your .env file`);
  console.log(`   3. Set up your database for Payload CMS`);
  console.log(`   4. Customize branding and content`);
  console.log(`   5. pnpm dev (run from root to start development)`);
  console.log(`\n🎯 Your new app is ready for client customization!`);
  
} catch (error) {
  console.error('❌ Error creating client app:', error.message);
  process.exit(1);
}