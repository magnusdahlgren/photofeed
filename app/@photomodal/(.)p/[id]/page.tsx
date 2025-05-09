import CloseButton from "@/components/CloseButton";
import PhotoDetail from "@/components/PhotoDetail";
import { getPhotoById } from "@/lib/photos";

interface Params {
  readonly params: Promise<{ id: string }>;
}

export default async function PhotoModalPage({ params }: Params) {
  const { id } = await params;
  const photo = await getPhotoById(id);

  return (
    <div className="photo-modal">
      <CloseButton />
      <PhotoDetail photo={photo} />
    </div>
  );
}
