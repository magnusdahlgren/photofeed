'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out.');
    } else {
      router.push('/admin/login');
    }
  }

  return (
    <button className="sign-out-button" aria-label="Sign Out" onClick={handleSignOut}>
      Sign out
    </button>
  );
}
