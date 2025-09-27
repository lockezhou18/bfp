import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const to = process.env.CONTACT_TO || "bfp@bfpinvest.com";
    let transporter: nodemailer.Transporter;
    let from: string;

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = (process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;
    const envConfigured = Boolean(host && user && pass);

    if (envConfigured) {
      from = process.env.SMTP_FROM || `Contact Form <${user || "no-reply@bfpinvest.com"}>`;
      transporter = nodemailer.createTransport({ host, port, secure, auth: { user: user!, pass: pass! } });
    } else {
      const test = await nodemailer.createTestAccount();
      from = `Contact Form <${test.user}>`;
      transporter = nodemailer.createTransport({
        host: test.smtp.host,
        port: test.smtp.port,
        secure: test.smtp.secure,
        auth: { user: test.user, pass: test.pass },
      });
    }

    const info = await transporter.sendMail({
      from,
      to,
      subject: `New contact from ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    const previewUrl = nodemailer.getTestMessageUrl?.(info) || undefined;
    return NextResponse.json({ ok: true, previewUrl });
  } catch (err) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}


