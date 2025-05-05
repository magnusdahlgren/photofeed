import PhotoDetail from "@/components/PhotoDetail";
import Link from "next/link";

interface Params {
  readonly params: { readonly id: string };
}

export default function PhotoPage({ params }: Params) {
  return (
    <div className="photo-modal">
      <Link href="/" className="close-button" aria-label="Go back" />
      <PhotoDetail id={params.id} />
    </div>
  );
}
