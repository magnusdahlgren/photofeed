'use client';

interface DeletePhotoButtonProps {
  id: string;
  onRequestDelete: (id: string) => void;
}

export function DeletePhotoButton({ id, onRequestDelete }: Readonly<DeletePhotoButtonProps>) {
  return (
    <button
      className="delete-photo-button"
      aria-label="Delete photo"
      onClick={() => onRequestDelete(id)}
    />
  );
}
