import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function useRedirectIfSignedOut(): { isLoading: boolean } {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function check() {
      setIsLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/');
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    }

    check();
  }, [router]);

  return { isLoading };
}
