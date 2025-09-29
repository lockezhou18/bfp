#!/usr/bin/env node

/**
 * Helper script to generate a Gmail API refresh token
 * Run this script to get the refresh token needed for server-to-server authentication
 */

const { google } = require('googleapis');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function generateRefreshToken() {
  console.log('🔧 Gmail API Refresh Token Generator\n');
  
  rl.question('Enter your Google Client ID: ', (clientId) => {
    rl.question('Enter your Google Client Secret: ', (clientSecret) => {
      rl.question('Enter your redirect URI (default: http://localhost:3000): ', (redirectUri) => {
        const redirect = redirectUri || 'http://localhost:3000';
        
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

        console.log('\n📧 Gmail API Setup Instructions:');
        console.log('1. Make sure Gmail API is enabled in your Google Cloud Console');
        console.log('2. Visit this URL to authorize the application:');
        console.log(`\n${authUrl}\n`);
        
        rl.question('After authorization, enter the authorization code: ', async (code) => {
          try {
            const { tokens } = await oauth2Client.getToken(code);
            console.log('\n✅ Success! Here are your tokens:');
            console.log(`\nRefresh Token: ${tokens.refresh_token}`);
            console.log(`\nAdd this to your .env.local file:`);
            console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
            console.log(`\nAlso add these environment variables:`);
            console.log(`GOOGLE_CLIENT_ID=${clientId}`);
            console.log(`GOOGLE_CLIENT_SECRET=${clientSecret}`);
            console.log(`GOOGLE_FROM_EMAIL=noreply@bfpinvest.com`);
            console.log(`CONTACT_TO=bfp-core@bfpinvest.com`);
          } catch (error) {
            console.error('\n❌ Error generating tokens:', error.message);
          }
          
          rl.close();
        });
      });
    });
  });
}

generateRefreshToken().catch(console.error);
