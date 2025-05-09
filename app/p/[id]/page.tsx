import Link from "next/link";
import PhotoDetail from "@/components/PhotoDetail";
import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { Metadata } from "next";
import { getPhotoById } from "@/lib/photos";

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const photo = await getPhotoById(params.id);

    const takenAt = photo?.taken_at
      ? new Date(photo.taken_at).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

    return {
      title: takenAt ? `Magnus×365 – ${takenAt}` : "Photo – Magnus×365",
    };
  } catch {
    return {
      title: "Photo – Magnus×365",
    };
  }
}

export default async function PhotoPage({ params }: Readonly<Params>) {
  let content;

  try {
    const photo = await getPhotoById(params.id);
    content = <PhotoDetail photo={photo} />;
  } catch (error: any) {
    if (error.message.includes("Failed to get photo")) {
      notFound();
    } else {
      content = (
        <ErrorMessage message="There was an error loading the photo." />
      );
    }
  }

  return (
    <main>
      <Link href="/" className="back-button" aria-label="Go back" />
      {content}
    </main>
  );
}
