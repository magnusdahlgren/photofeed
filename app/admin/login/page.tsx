'use client';

import '@/styles/admin.css';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/`,
      },
    });

    if (error) {
      console.error('Magic link error:', error);
      setError('Failed to send magic link.');
    } else {
      setSuccess(true);
      setMessage('Check your email for the magic link!');
    }
  }

  return (
    <main className="login-main">
      <form className="login-form" onSubmit={handleMagicLink}>
        <div className="login-heading">
          <div
            className={`login-icon ${success ? 'login-unlocked' : 'login-locked'}`}
            aria-hidden="true"
          />
          <h1 className="sr-only">Admin Login</h1>
        </div>

        <input
          className="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="message error">{error}</p>}
        {message && <p className="message success">{message}</p>}

        <button className="primary-button" type="submit">
          Send Magic Link
        </button>
      </form>
    </main>
  );
}
