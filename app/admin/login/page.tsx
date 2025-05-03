'use client';

import '@/styles/admin.css';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setButtonDisabled(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/`,
      },
    });

    if (error) {
      setTimeout(() => {
        setButtonDisabled(false);
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }, 5000);
    } else {
      setSuccess(true);
      setTimeout(() => setButtonDisabled(false), 5000);
    }
  }

  function getButtonText() {
    if (success && buttonDisabled) {
      return 'Email sent';
    } else if (buttonDisabled) {
      return 'Processing';
    } else if (success) {
      return 'Re-send magic link';
    } else {
      return 'Send magic link';
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
          className={`email-input ${shake ? 'shake' : ''}`}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setSuccess(false);
          }}
          required
        />
        <button className="primary-button" disabled={buttonDisabled} type="submit">
          {getButtonText()}
        </button>
      </form>
    </main>
  );
}
