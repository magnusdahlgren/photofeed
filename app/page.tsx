import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getPhotoUrl } from "@/lib/photos";
import { UserMenuWithSignIn } from "@/components/UserMenuWithSignIn";

export default async function Home() {
  const { data: photos, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  let content;

  if (error) {
    content = (
      <p className="error">Something went wrong loading the photo feed.</p>
    );
  } else if (!photos || photos.length === 0) {
    content = <p className="error">No photos available.</p>;
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
