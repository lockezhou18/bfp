#!/usr/bin/env node

/**
 * Simple test script to verify Gmail API implementation
 * Run this to test the email functionality locally
 */

const { google } = require('googleapis');

async function testGmailAPI() {
  console.log('🧪 Testing Gmail API Implementation\n');
  
  // Check if environment variables are set
  const requiredEnvVars = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET', 
    'GOOGLE_REFRESH_TOKEN',
    'CONTACT_TO'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    console.log('\n📝 Please set up your .env.local file with the required variables.');
    console.log('   See EMAIL_SETUP.md for detailed instructions.');
    return;
  }
  
  console.log('✅ All required environment variables are set');
  
  try {
    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    oauth2Client.setCredentials({ 
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN 
    });
    
    // Create Gmail API instance
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Test email content
    const testEmail = {
      from: process.env.GOOGLE_FROM_EMAIL || 'noreply@bfpinvest.com',
      to: process.env.CONTACT_TO,
      subject: 'Test Email from BFP Contact Form',
      message: 'This is a test email to verify Gmail API integration is working correctly.'
    };
    
    // Create email message
    const emailLines = [
      `From: ${testEmail.from}`,
      `To: ${testEmail.to}`,
      `Subject: ${testEmail.subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      testEmail.message
    ];
    
    const emailMessage = emailLines.join('\r\n');
    const encodedEmail = Buffer.from(emailMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    console.log('📧 Sending test email...');
    
    // Send test email
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail
      }
    });
    
    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${result.data.id}`);
    console.log(`   Thread ID: ${result.data.threadId}`);
    console.log(`   Recipient: ${testEmail.to}`);
    
  } catch (error) {
    console.error('❌ Error testing Gmail API:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n💡 This usually means your refresh token is invalid or expired.');
      console.log('   Run: npm run generate-token');
    } else if (error.message.includes('insufficient_scope')) {
      console.log('\n💡 This means the Gmail API is not enabled or the scope is incorrect.');
      console.log('   Check your Google Cloud Console settings.');
    }
  }
}

testGmailAPI().catch(console.error);
