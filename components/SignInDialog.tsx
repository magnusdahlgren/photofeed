"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

interface SignInDialogProps {
  onClose: () => void;
}

export function SignInDialog({ onClose }: Readonly<SignInDialogProps>) {
  const SHAKE_DURATION_MS = 400;
  const EMAIL_DELAY_MS = 5000;
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [shake, setShake] = useState(false);

  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    }

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

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
        setTimeout(() => setShake(false), SHAKE_DURATION_MS);
      }, EMAIL_DELAY_MS);
    } else {
      setSuccess(true);
      setTimeout(() => setButtonDisabled(false), EMAIL_DELAY_MS);
    }
  }

  function getButtonText() {
    if (success && buttonDisabled) {
      return "Email sent";
    } else if (buttonDisabled) {
      return "Processing";
    } else if (success) {
      return "Re-send magic link";
    } else {
      return "Send magic link";
    }
  }

  return (
    <dialog
      ref={ref}
      className="alert-dialog sign-in-dialog"
      aria-labelledby="dialog-title"
      aria-modal="true"
    >
      <button
        className="dialog-close-button"
        onClick={() => ref.current?.close()}
        aria-label="Close"
      />

      <form className="login-form" onSubmit={handleMagicLink}>
        <div className="login-heading">
          <div
            className={`login-icon ${success ? "login-unlocked" : "login-locked"}`}
            aria-hidden="true"
          />
          <h1 id="dialog-title" className="sr-only">
            Admin Login
          </h1>
        </div>
        <input
          ref={inputRef}
          className={`email-input ${shake ? "shake" : ""}`}
          type="email"
          placeholder="Email"
          value={email}
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
            setSuccess(false);
          }}
          required
        />
        <button
          className="primary-button"
          disabled={buttonDisabled}
          type="submit"
        >
          {getButtonText()}
        </button>
      </form>
    </dialog>
  );
}
