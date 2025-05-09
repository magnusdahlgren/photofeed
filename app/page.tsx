import { supabase } from "@/lib/supabase";
import { UserMenuWithSignIn } from "@/components/UserMenuWithSignIn";
import type { Photo } from "@/types/photo";
import ErrorMessage from "@/components/ErrorMessage";
import PhotoFeed from "@/components/PhotoFeed";

export default async function Home() {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  const photos = (data ?? []) as Photo[];

  let content;

  return (
    <main>
      <header>
        <img
          src="/images/magnus.png"
          className="logo"
          alt="AI line art drawing of Magnus"
        />
        <h1>Magnus×365</h1>
        <UserMenuWithSignIn />
      </header>
      <main>
        <header>...</header>
        {error ? (
          <ErrorMessage message="Something went wrong loading the photo feed." />
        ) : (
          <PhotoFeed photos={photos ?? []} />
        )}
      </main>
    </main>
  );
}
