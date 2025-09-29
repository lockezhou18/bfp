#!/usr/bin/env node

/**
 * Exchange authorization code for refresh token
 */

const { google } = require('googleapis');

const CLIENT_ID = '79073027057-lf0kneh65ui3olb2qe96qqjtfeo5rj7u.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000';

async function exchangeCode() {
  const code = process.argv[2];
  
  if (!code) {
    console.log('❌ Please provide the authorization code');
    console.log('Usage: node exchange-code.js YOUR_AUTHORIZATION_CODE');
    process.exit(1);
  }

  const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  try {
    console.log('🔄 Exchanging authorization code for tokens...');
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('✅ Success! Here are your credentials:');
    console.log('');
    console.log('📝 Add these to your .env.local file:');
    console.log('```');
    console.log('CONTACT_TO=bfp-core@bfpinvest.com');
    console.log(`GOOGLE_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('GOOGLE_FROM_EMAIL=noreply@bfpinvest.com');
    console.log('```');
    console.log('');
    console.log('🧪 Test your setup:');
    console.log('npm run test-email');
    
  } catch (error) {
    console.error('❌ Error exchanging code:', error.message);
    if (error.message.includes('invalid_grant')) {
      console.log('\n💡 This usually means the authorization code expired or was used already.');
      console.log('   Please get a fresh authorization code and try again.');
    }
  }
}

exchangeCode();
