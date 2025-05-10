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
          width={1080}
          height={720}
          className="fadeIn"
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: "100%", height: "auto" }}
        />
        {taken_at && <p className="photo-date">{taken_at}</p>}
      </div>
    </div>
  );
}
