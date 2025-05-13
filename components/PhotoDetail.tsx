import Image from "next/image";
import { formatDateTimeUK, getPhotoUrl } from "@/lib/photos";
import { Photo } from "@/types/photo";

interface PhotoDetailProps {
  photo: Photo;
}

export default function PhotoDetail({ photo }: Readonly<PhotoDetailProps>) {
  const src = getPhotoUrl(photo.id);
  const taken_at = photo.taken_at ? formatDateTimeUK(photo.taken_at) : null;

  return (
    <div className="photo-wrapper">
      <div className="photo-container">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
          className="fadeIn"
        />
        <div className="photo-info">
          {taken_at && <p className="photo-date">{taken_at}</p>}
          <div className="photo-info-icon" />
        </div>
      </div>
    </div>
  );
}
