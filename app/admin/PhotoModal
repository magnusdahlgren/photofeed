'use client';

import { useRouter } from 'next/navigation';
import PhotoDetail from '@/components/PhotoDetail';

interface PhotoModalProps {
  id: string;
}

export default function PhotoModal({ id }: Readonly<PhotoModalProps>) {
  const router = useRouter();

  return (
    <div className="photo-modal">
      <button onClick={() => router.back()} className="close-button" aria-label="Close modal" />
      <PhotoDetail id={id} />
    </div>
  );
}
