import CloseButton from "@/components/CloseButton";
import PhotoDetail from "@/components/PhotoDetail";
import { getPhotoById } from "@/lib/photos";

interface Params {
  params: {
    id: string;
  };
}

export default async function PhotoModalPage({ params }: Params) {
  const photo = await getPhotoById(params.id);

  return (
    <div className="photo-modal">
      <CloseButton />
      <PhotoDetail photo={photo} />
    </div>
  );
}
