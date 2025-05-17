import CloseButton from "@/components/CloseButton";
import PhotoDetail from "@/components/PhotoDetail";
import {
  getNextPhotoIdByCreatedAt,
  getPhotoById,
  getPrevPhotoIdByCreatedAt,
} from "@/lib/photos";
import { Photo } from "@/types/photo";

async function fetchPhotoData(id: string) {
  const photo: Photo = await getPhotoById(id);
  const [prevId, nextId] = await Promise.all([
    getPrevPhotoIdByCreatedAt(photo.created_at).then((res) => res.prevId),
    getNextPhotoIdByCreatedAt(photo.created_at).then((res) => res.nextId),
  ]);
  return { photo, prevId, nextId };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { photo, prevId, nextId } = await fetchPhotoData(id);

  return (
    <div className="photo-modal">
      <CloseButton />
      <PhotoDetail
        photo={photo}
        prevId={prevId}
        nextId={nextId}
        showArrows={true}
      />
    </div>
  );
}
