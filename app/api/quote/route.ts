import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

type QuoteBody = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  services?: string[];
  message?: string;
  website?: string; // honeypot
};

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: NextRequest) {
  let body: QuoteBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — silently succeed for bots
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 200);
  const phone = (body.phone || '').trim().slice(0, 50);
  const address = (body.address || '').trim().slice(0, 300);
  const message = (body.message || '').trim().slice(0, 2000);
  const services = Array.isArray(body.services) ? body.services.slice(0, 10).map((s) => String(s).slice(0, 80)) : [];

  if (!name || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const submission = {
    name,
    email,
    phone,
    address,
    services,
    message,
    submittedAt: new Date().toISOString(),
    ip: req.headers.get('x-forwarded-for') || 'unknown'
  };

  // If Upstash env vars are present, store the lead
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const key = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
      await fetch(`${url}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      // Also push to a list for quick browsing
      await fetch(`${url}/lpush/leads/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      // Don't fail the user submission if storage fails — just log
      console.error('Upstash store failed:', err);
    }
  } else {
    // Fallback: log to Vercel logs so Austin can see leads in the Vercel dashboard
    console.log('[QUOTE_LEAD]', JSON.stringify(submission));
  }

  return NextResponse.json({ ok: true });
}
