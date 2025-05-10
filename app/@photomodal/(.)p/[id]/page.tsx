import CloseButton from "@/components/CloseButton";
import PhotoDetail from "@/components/PhotoDetail";
import { getPhotoById } from "@/lib/photos";

export default async function PhotoModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const photo = await getPhotoById(id);

  return (
    <div className="photo-modal">
      <CloseButton />
      <PhotoDetail photo={photo} />
    </div>
  );
}
