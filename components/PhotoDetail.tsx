import { formatDateTimeUK, getPhotoUrl } from "@/lib/photos";
import { Photo } from "@/types/photo";

interface PhotoDetailProps {
  photo: Photo;
}

export default function PhotoDetail({ photo }: Readonly<PhotoDetailProps>) {
  const taken_at = photo.taken_at ? formatDateTimeUK(photo.taken_at) : null;

  return (
    <div className="photo-wrapper">
      <div className="photo-container">
        <img src={getPhotoUrl(photo.id, "large")} alt="" className="fadeIn" />
        {taken_at && <p className="photo-date">{taken_at}</p>}
      </div>
    </div>
  );
}
