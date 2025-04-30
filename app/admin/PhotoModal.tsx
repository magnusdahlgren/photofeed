import { getPhotoUrl } from '@/lib/photos';
import Link from 'next/link';

interface PhotoModalProps {
  id: string;
}

export function PhotoModal({ id }: Readonly<PhotoModalProps>) {
  return (
    <div className="photo-modal">
      <Link href="/" className="back-button" aria-label="Go back"></Link>
      <div className="photo-wrapper">
        <img src={getPhotoUrl(id)} alt="" className="fadeIn" />
      </div>
    </div>
  );
}
