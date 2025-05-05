import { getPhotoUrl } from "@/lib/photos";

interface PhotoDetailProps {
  id: string;
}

export default function PhotoDetail({ id }: Readonly<PhotoDetailProps>) {
  return (
    <div className="photo-wrapper">
      <img src={getPhotoUrl(id, "large")} alt="" className="fadeIn" />
    </div>
  );
}
