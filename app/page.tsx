import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getPhotoUrl } from "@/lib/photos";
import { UserMenuWithSignIn } from "@/components/UserMenuWithSignIn";
import type { Photo } from "@/types/photo";
import ErrorMessage from "@/components/ErrorMessage";

export default async function Home() {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  const photos = data as Photo[] | null;

  let content;

  if (error) {
    content = (
      <ErrorMessage message="Something went wrong loading the photo feed." />
    );
  } else if (!photos?.length) {
    content = <ErrorMessage message="No photos found." />;
  } else {
    content = (
      <ul className="photo-feed">
        {photos.map((photo) => (
          <li key={photo.id}>
            <Link href={`/p/${photo.id}`}>
              <img
                src={getPhotoUrl(photo.id, "small")}
                alt=""
                className="fadeIn"
                loading="lazy"
              />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <header>
        <img
          src="/images/magnus.png"
          className="logo"
          alt="AI line art drawing of Magnus"
        />
        <h1>Magnus D</h1>
        <UserMenuWithSignIn />
      </header>
      {content}
    </main>
  );
}
