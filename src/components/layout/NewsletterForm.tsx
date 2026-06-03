'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@')) {
      alert('Please specify a valid subscription email address.');
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-xs text-[#B0F0D6] font-semibold pt-1">✓ Enrolled successfully!</p>
    );
  }

  return (
    <div className="flex gap-2 pt-1">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address..."
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-tertiary-container/60 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-tertiary-container text-primary font-bold px-4 py-2 rounded-lg text-xs hover:bg-amber-400"
      >
        Join
      </button>
    </div>
  );
}
