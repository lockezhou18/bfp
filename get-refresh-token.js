#!/usr/bin/env node

/**
 * Quick script to get Gmail API refresh token
 */

const { google } = require('googleapis');

const CLIENT_ID = '79073027057-lf0kneh65ui3olb2qe96qqjtfeo5rj7u.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent'
});

console.log('🔐 Gmail API Authorization');
console.log('========================');
console.log('');
console.log('1. Make sure Gmail API is enabled in your Google Cloud Console');
console.log('2. Visit this URL to authorize:');
console.log('');
console.log(authUrl);
console.log('');
console.log('3. After authorization, you\'ll be redirected to:');
console.log('   http://localhost:3000/?code=AUTHORIZATION_CODE');
console.log('');
console.log('4. Copy the code from the URL and run:');
console.log('   node exchange-code.js YOUR_AUTHORIZATION_CODE');
console.log('');
console.log('5. This will give you the refresh token for your .env.local file');
