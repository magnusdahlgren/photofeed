import CloseButton from "@/components/CloseButton";
import PhotoDetail from "@/components/PhotoDetail";
import {
  getNextPhotoIdByCreatedAt,
  getPhotoById,
  getPrevPhotoIdByCreatedAt,
} from "@/lib/photos";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhotoById(id);
  const { prevId } = await getPrevPhotoIdByCreatedAt(photo.created_at);
  const { nextId } = await getNextPhotoIdByCreatedAt(photo.created_at);

  return (
    <div className="photo-modal">
      <CloseButton />
      <PhotoDetail photo={photo} prevId={prevId} nextId={nextId} />
    </div>
  );
}
