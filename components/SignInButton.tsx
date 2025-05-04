"use client";

interface SignInButtonProps {
  onClick: () => void;
}

export function SignInButton({ onClick }: Readonly<SignInButtonProps>) {
  return (
    <button className="sign-in-button" aria-label="Sign In" onClick={onClick}>
      Sign in
    </button>
  );
}
