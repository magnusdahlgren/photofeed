'use client';

import '@/styles/admin.css';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setButtonDisabled(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/`,
      },
    });

    if (!error) {
      setSuccess(true);
    }

    setTimeout(() => {
      setButtonDisabled(false);
      if (!success) {
        setShake(true);
        setTimeout(() => setShake(false), 400); // match the animation duration
      }
    }, 5000);
  }

  let buttonText = 'Send magic link';
  if (success && buttonDisabled) {
    buttonText = 'Email sent';
  } else if (buttonDisabled) {
    buttonText = 'Processing';
  } else if (success) {
    buttonText = 'Re-send magic link';
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
        {error && <p className="message error">{error}</p>}
        {message && <p className="message success">{message}</p>}
        <button className="primary-button" disabled={buttonDisabled} type="submit">
          {buttonText}
        </button>
      </form>
    </main>
  );
}
