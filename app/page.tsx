import { supabase } from "@/lib/supabase";
import { UserMenuWithSignIn } from "@/components/UserMenuWithSignIn";
import type { Photo } from "@/types/photo";
import ErrorMessage from "@/components/ErrorMessage";
import PhotoFeed from "@/components/PhotoFeed";
import Image from "next/image";

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
        <Image
          src="/images/magnus.png"
          alt="Magnus logo"
          className="logo"
          width={150}
          height={225}
          priority
        />
        <h1>Magnus×365</h1>
        <UserMenuWithSignIn />
      </header>
      {error ? (
        <ErrorMessage message="Something went wrong loading the photo feed." />
      ) : (
        <PhotoFeed photos={photos} />
      )}
    </main>
  );
}
