import Link from "next/link";
import PhotoDetail from "@/components/PhotoDetail";

interface Params {
  params: {
    id: string;
  };
}

export default function PhotoPage({ params }: Readonly<Params>) {
  return (
    <main>
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      <PhotoDetail id={params.id} />
    </main>
  );
}
