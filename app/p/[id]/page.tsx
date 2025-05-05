import PhotoDetail from "@/components/PhotoDetail";
import Link from "next/link";

interface Params {
  readonly params: { readonly id: string };
}

export default function PhotoPage({ params }: Params) {
  return (
    <main>
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      <PhotoDetail id={params.id} />
    </main>
  );
}
