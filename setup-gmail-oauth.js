#!/usr/bin/env node

/**
 * Gmail OAuth Setup Script
 * This script will help you get the OAuth credentials needed for Gmail API
 */

const { google } = require('googleapis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🔧 Gmail OAuth Setup for BFP Contact Form\n');
console.log('This script will help you get the OAuth credentials needed for Gmail API.\n');

console.log('📋 Prerequisites:');
console.log('1. Go to Google Cloud Console: https://console.cloud.google.com/');
console.log('2. Create a new project or select existing one');
console.log('3. Enable Gmail API');
console.log('4. Go to "APIs & Services" → "Credentials"');
console.log('5. Click "Create Credentials" → "OAuth 2.0 Client ID"');
console.log('6. Choose "Web application"');
console.log('7. Add authorized redirect URI: http://localhost:3000');
console.log('8. Download the credentials JSON file\n');

rl.question('Do you have your OAuth 2.0 credentials ready? (y/n): ', (answer) => {
  if (answer.toLowerCase() !== 'y') {
    console.log('\n📝 Please follow the steps above to get your OAuth credentials first.');
    console.log('Then run this script again.');
    rl.close();
    return;
  }

  console.log('\n🔑 Enter your OAuth 2.0 credentials:');
  
  rl.question('Client ID: ', (clientId) => {
    rl.question('Client Secret: ', (clientSecret) => {
      rl.question('Redirect URI (default: http://localhost:3000): ', (redirectUri) => {
        const redirect = redirectUri || 'http://localhost:3000';
        
        console.log('\n🔐 Setting up OAuth 2.0 client...');
        
        const oauth2Client = new google.auth.OAuth2(
          clientId,
          clientSecret,
          redirect
        );

        const scopes = ['https://www.googleapis.com/auth/gmail.send'];

        const authUrl = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes,
          prompt: 'consent' // Force consent screen to get refresh token
        });

        console.log('\n📧 Gmail API Authorization:');
        console.log('1. Make sure Gmail API is enabled in your Google Cloud Console');
        console.log('2. Visit this URL to authorize the application:');
        console.log(`\n${authUrl}\n`);
        
        rl.question('After authorization, enter the authorization code: ', async (code) => {
          try {
            console.log('\n🔄 Exchanging code for tokens...');
            const { tokens } = await oauth2Client.getToken(code);
            
            console.log('\n✅ Success! Here are your credentials:');
            console.log('\n📝 Add these to your .env.local file:');
            console.log('```');
            console.log('CONTACT_TO=bfp-core@bfpinvest.com');
            console.log(`GOOGLE_CLIENT_ID=${clientId}`);
            console.log(`GOOGLE_CLIENT_SECRET=${clientSecret}`);
            console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
            console.log('GOOGLE_FROM_EMAIL=noreply@bfpinvest.com');
            console.log('```');
            
            console.log('\n🧪 Test your setup:');
            console.log('npm run test-email');
            
            console.log('\n🚀 Start development server:');
            console.log('npm run dev');
            
          } catch (error) {
            console.error('\n❌ Error getting tokens:', error.message);
            if (error.message.includes('invalid_grant')) {
              console.log('\n💡 This usually means the authorization code expired or was used already.');
              console.log('   Please run the script again and get a fresh authorization code.');
            }
          }
          
          rl.close();
        });
      });
    });
  });
});
