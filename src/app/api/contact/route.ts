import { NextResponse } from "next/server";
import { google } from "googleapis";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactBody;
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const message = (body.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO || "bfp-core@bfpinvest.com";
    
    // Gmail API configuration
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const fromEmail = process.env.GOOGLE_FROM_EMAIL || "noreply@bfpinvest.com";

    if (!clientId || !clientSecret || !refreshToken) {
      console.error("Missing Gmail API credentials");
      return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
    }

    // Create OAuth2 client
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    // Create Gmail API instance
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email message
    const emailLines = [
      `From: ${fromEmail}`,
      `To: ${to}`,
      `Reply-To: ${email}`,
      `Subject: New contact from ${name}`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      `From: ${name} <${email}>`,
      ``,
      message
    ];

    const emailMessage = emailLines.join('\r\n');
    const encodedEmail = Buffer.from(emailMessage).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    // Send email via Gmail API
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail
      }
    });

    return NextResponse.json({ 
      ok: true, 
      messageId: result.data.id,
      threadId: result.data.threadId 
    });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


