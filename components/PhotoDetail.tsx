import { getPhotoUrl } from "@/lib/photos";
import { Photo } from "@/types/photo";

interface PhotoDetailProps {
  photo: Photo;
}

export default function PhotoDetail({ photo }: Readonly<PhotoDetailProps>) {
  return (
    <div className="photo-wrapper">
      <div className="photo-container">
        <img src={getPhotoUrl(photo.id, "large")} alt="" className="fadeIn" />
        {photo.taken_at && <p className="photo-date">{photo.taken_at}</p>}
      </div>
    </div>
  );
}
