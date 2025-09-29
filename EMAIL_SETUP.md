# Email Configuration Setup

This document explains how to configure the email functionality for the contact form using Gmail API.

## Overview

The contact form sends emails to `bfp-core@bfpinvest.com` when users submit the form. The system uses Gmail API for reliable email delivery, which works perfectly on Vercel.

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Email recipient (where contact form emails will be sent)
CONTACT_TO=bfp-core@bfpinvest.com

# Gmail API Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
GOOGLE_FROM_EMAIL=noreply@bfpinvest.com
```

## Google Cloud Console Setup

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select an existing one
- Enable the Gmail API for your project

### 2. Create OAuth 2.0 Credentials
- Go to "APIs & Services" → "Credentials"
- Click "Create Credentials" → "OAuth 2.0 Client ID"
- Choose "Web application" as the application type
- Add authorized redirect URIs (for local development, use `http://localhost:3000`)
- Download the credentials JSON file

### 3. Generate Refresh Token
You'll need to generate a refresh token for server-to-server authentication:

```bash
# Install the Google Auth CLI tool
npm install -g google-auth-library

# Run the OAuth flow to get refresh token
npx google-auth-library generate-refresh-token \
  --client-id=YOUR_CLIENT_ID \
  --client-secret=YOUR_CLIENT_SECRET \
  --scopes="https://www.googleapis.com/auth/gmail.send"
```

Or use this Node.js script:

```javascript
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost:3000' // redirect URI
);

const scopes = ['https://www.googleapis.com/auth/gmail.send'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', authUrl);

// After authorization, exchange the code for tokens
const { tokens } = await oauth2Client.getToken(code);
console.log('Refresh token:', tokens.refresh_token);
```

## Vercel Deployment

### 1. Set Environment Variables in Vercel
- Go to your Vercel project dashboard
- Navigate to "Settings" → "Environment Variables"
- Add all the required environment variables:
  - `CONTACT_TO`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_REFRESH_TOKEN`
  - `GOOGLE_FROM_EMAIL`

### 2. Deploy
- Push your changes to your Git repository
- Vercel will automatically deploy with the new Gmail API implementation

## Testing

1. **Local Development**:
   - Start the development server: `npm run dev`
   - Navigate to the contact form
   - Fill out and submit the form
   - Check that `bfp-core@bfpinvest.com` receives the email

2. **Production Testing**:
   - Deploy to Vercel
   - Test the contact form on your live site
   - Verify emails are received

## Advantages of Gmail API

- ✅ **Vercel Compatible**: Works perfectly with serverless functions
- ✅ **More Reliable**: Better than SMTP for cloud deployments
- ✅ **Better Error Handling**: Detailed error responses
- ✅ **Rate Limits**: Generous Gmail API quotas
- ✅ **Security**: OAuth 2.0 authentication
- ✅ **Scalable**: Handles high traffic well

## Troubleshooting

- **"Email service not configured"**: Check that all Gmail API environment variables are set
- **Authentication failed**: Verify your OAuth credentials and refresh token
- **"Insufficient Permission"**: Ensure Gmail API is enabled in Google Cloud Console
- **Emails not received**: Check spam folder and verify the recipient email address
- **Rate limit exceeded**: Gmail API has very high limits, but check your usage in Google Cloud Console
