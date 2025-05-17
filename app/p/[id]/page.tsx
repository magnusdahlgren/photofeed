import Link from "next/link";
import PhotoDetail from "@/components/PhotoDetail";
import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { Metadata } from "next";
import {
  getPhotoById,
  getPrevPhotoIdByCreatedAt,
  getNextPhotoIdByCreatedAt,
} from "@/lib/photos";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const photo = await getPhotoById(id);

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

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const photo = await getPhotoById(id);
    const { prevId } = await getPrevPhotoIdByCreatedAt(photo.created_at);
    const { nextId } = await getNextPhotoIdByCreatedAt(photo.created_at);

    if (!photo) {
      notFound();
    }

    return (
      <main>
        <Link href="/" className="back-button" aria-label="Go back" />
        <PhotoDetail photo={photo} prevId={prevId} nextId={nextId} />
      </main>
    );
  } catch (error: any) {
    if (error.message.includes("Failed to get photo")) {
      notFound();
    }

    return (
      <main>
        <Link href="/" className="back-button" aria-label="Go back" />
        <ErrorMessage message="There was an error loading the photo." />
      </main>
    );
  }
}
