import Link from "next/link";
import { getPhotoUrl } from "@/lib/photos";

interface PhotoDetailProps {
  id: string;
}

export default function PhotoDetail({ id }: Readonly<PhotoDetailProps>) {
  return (
    <>
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      <div className="photo-wrapper">
        <img src={getPhotoUrl(id, "large")} alt="" className="fadeIn" />
      </div>
    </>
  );
}
