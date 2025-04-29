import Link from "next/link";
import { getPhotoUrl } from "@/lib/photos";

interface Params {
  params: { id: string };
}

export default function PhotoPage({ params }: Params) {
  const { id } = params;

  return (
    <main>
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      <div className="photo-wrapper">
        <img src={getPhotoUrl(id)} alt="" className="fadeIn" />
      </div>
    </main>
  );
}
