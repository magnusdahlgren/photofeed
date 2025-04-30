'use client';

import { useRef } from 'react';
import { getPhotoUrl } from '@/lib/photos';

interface PhotoModalProps {
  id: string;
  onClose: () => void;
}

export function PhotoModal({ id, onClose }: Readonly<PhotoModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open the dialog when the component mounts
  if (typeof window !== 'undefined' && dialogRef.current && !dialogRef.current.open) {
    dialogRef.current.showModal();
  }

  return (
    <dialog ref={dialogRef} className="photo-dialog" onClose={onClose}>
      <button className="close-button" onClick={() => dialogRef.current?.close()}>
        ×
      </button>
      <img src={getPhotoUrl(id)} alt="" className="modal-photo" />
    </dialog>
  );
}
