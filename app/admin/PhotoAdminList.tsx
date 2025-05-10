import Image from 'next/image';
import { getPhotoUrl, formatDateUK } from '@/lib/photos';
import { DeletePhotoButton } from './DeletePhotoButton';
import type { Photo } from '@/types/photo';
import { useRouter } from 'next/navigation';

interface Props {
  photos: Photo[];
  onRequestDelete: (id: string) => void;
}

export function PhotoAdminList({ photos, onRequestDelete }: Readonly<Props>) {
  const router = useRouter();

  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-row">
          <button
            className="thumbnail-container"
            onClick={() => router.push(`/p/${photo.id}?from=admin`)}
            aria-label="Preview photo"
          >
            <Image
              src={getPhotoUrl(photo.id)}
              alt=""
              fill
              className="thumbnail object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
              priority={false}
            />
            <div className="thumbnail-overlay" />
          </button>
          <div className="photo-id">{photo.id}</div>
          {photo.taken_at ? (
            <div className="photo-date-taken-at">{formatDateUK(photo.taken_at)}</div>
          ) : (
            <div className="photo-date-uploaded-on">{formatDateUK(photo.created_at)}</div>
          )}
          <DeletePhotoButton id={photo.id} onRequestDelete={onRequestDelete} />
        </div>
      ))}
    </div>
  );
}
