import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "adam@getsomeass.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Adam's Software Services <onboarding@resend.dev>";

function isValidEmail(email: string) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/i.test(email);
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const name = clean(body.name);
  const email = clean(body.email).toLowerCase();
  const company = clean(body.company);
  const service = clean(body.service);
  const message = clean(body.message);

  if (!name || !email || !service || !message) {
    return NextResponse.json({ error: "Name, email, project type, and message are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long. Please shorten it and try again." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Contact form is not configured yet. Email adam@getsomeass.com directly." }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const submittedAt = new Date().toISOString();

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New getsomeass.com inquiry from ${name}`,
    text: `New inquiry from getsomeass.com\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nNeed: ${service}\nSubmitted: ${submittedAt}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("Contact form send failed", error);
    return NextResponse.json({ error: "Could not send your message. Email adam@getsomeass.com directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
