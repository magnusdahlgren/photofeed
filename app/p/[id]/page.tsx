import Link from "next/link";
import PhotoDetail from "@/components/PhotoDetail";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface Params {
  params: {
    id: string;
  };
}

export default async function PhotoPage({ params }: Readonly<Params>) {
  let content;

  const { error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error && error.code === "PGRST116") {
    notFound();
  } else if (error) {
    content = (
      <p className="error">Something went wrong loading the photo photo.</p>
    );
  } else {
    content = <PhotoDetail id={params.id} />;
  }

  return (
    <main>
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      {content}
    </main>
  );
}
