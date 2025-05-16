import Image from "next/image";
import {
  formatDateTimeUK,
  getNextPhotoIdByCreatedAt,
  getPhotoById,
  getPhotoUrl,
  getPrevPhotoIdByCreatedAt,
} from "@/lib/photos";
import { Photo } from "@/types/photo";
import Link from "next/link";

interface PhotoDetailProps {
  photo: Photo;
  prevId?: string | null;
  nextId?: string | null;
}

export default function PhotoDetail({
  photo,
  prevId,
  nextId,
}: Readonly<PhotoDetailProps>) {
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
      {prevId && <Link href={`/p/${prevId}`} className="nav-arrow prev" />}
      {nextId && <Link href={`/p/${nextId}`} className="nav-arrow next" />}
    </div>
  );
}
