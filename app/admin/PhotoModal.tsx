'use client';

import { useRef, useEffect } from 'react';
import { getPhotoUrl } from '@/lib/photos';

interface PhotoModalProps {
  id: string;
  onClose: () => void;
}

export function PhotoModal({ id, onClose }: Readonly<PhotoModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }

    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className="photo-dialog" onClose={onClose}>
      <button
        className="close-button"
        aria-label="Close preview"
        onClick={() => dialogRef.current?.close()}
      />
      <img src={getPhotoUrl(id)} alt="" className="modal-photo" />
    </dialog>
  );
}
