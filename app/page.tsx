import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { getPhotoUrl } from "@/lib/photos";
import { Photo } from "@/types/photo";

export default async function Home() {
  const { data: photos, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main>
      <header>
        <h1>Magnus D</h1>
      </header>

      {error ? (
        <p className="error">Something went wrong loading the photo feed.</p>
      ) : !photos || photos.length === 0 ? (
        <p className="error">No photos available.</p>
      ) : (
        <ul className="photo-feed">
          {photos.map((photo) => (
            <li key={photo.id}>
              <Link href={`/p/${photo.id}`}>
                <img
                  src={getPhotoUrl(photo.id)}
                  alt=""
                  className="fadeIn"
                  loading="lazy"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
