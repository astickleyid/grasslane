'use client';

import { useState } from 'react';
import { ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

const SERVICES = [
  'Lawn Mowing',
  'Fertilization',
  'Weed Control',
  'Aeration & Overseeding',
  'Landscape Services',
  'Spring/Fall Cleanup',
  'Other / Not Sure'
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (s: string) => {
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      address: String(fd.get('address') || '').trim(),
      services: selected,
      message: String(fd.get('message') || '').trim(),
      // Honeypot — bots will fill it
      website: String(fd.get('website') || '')
    };

    if (!data.name || !data.email || !data.phone) {
      setStatus('error');
      setErrorMsg('Please fill in your name, email, and phone.');
      return;
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Submission failed');
      }
      setStatus('success');
      (e.target as HTMLFormElement).reset();
      setSelected([]);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white border border-lime-dark/40 p-8 md:p-12 text-center">
        <CheckCircle2 size={48} className="text-lime-dark mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="headline text-ink text-3xl mb-3">REQUEST RECEIVED.</h3>
        <p className="text-ink/70 max-w-md mx-auto">
          Thanks for reaching out — we&apos;ll get back to you within one business day with a quote.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-lime-dark text-sm font-bold tracking-[0.1em] uppercase hover:text-ink transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-ink/10 p-6 md:p-10 space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Full Name" name="name" type="text" required placeholder="Your name" />
        <Field label="Phone" name="phone" type="tel" required placeholder="(419) 555-1234" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
        <Field label="Property Address" name="address" type="text" placeholder="Street, City" />
      </div>

      <div>
        <label className="text-ink text-[11px] tracking-[0.2em] font-bold uppercase mb-3 block">
          Services Interested In
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => {
            const active = selected.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleService(s)}
                className={`px-4 py-2 text-xs font-medium border transition-colors ${
                  active
                    ? 'bg-ink text-bone border-ink'
                    : 'bg-white text-ink border-ink/20 hover:border-ink'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-ink text-[11px] tracking-[0.2em] font-bold uppercase mb-2 block">
          Tell Us About Your Lawn
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Approximate yard size, current concerns, anything we should know..."
          className="w-full px-4 py-3 border border-ink/20 bg-bone/30 text-ink text-sm focus:outline-none focus:border-ink transition-colors resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 p-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-lime-dark text-bone font-bold text-sm tracking-[0.1em] uppercase hover:bg-ink transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Quote Request'}
        {status !== 'submitting' && (
          <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
        )}
      </button>

      <p className="text-ink/50 text-xs">
        We&apos;ll never share your info. By submitting, you agree to be contacted by Grass Lane Lawn Co. about your request.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-ink text-[11px] tracking-[0.2em] font-bold uppercase mb-2 block">
        {label} {required && <span className="text-lime-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-ink/20 bg-bone/30 text-ink text-sm focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
