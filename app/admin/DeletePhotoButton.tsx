'use client';

interface DeletePhotoButtonProps {
  id: string;
  onRequestDelete: (id: string) => void;
}

export function DeletePhotoButton({ id, onRequestDelete }: Readonly<DeletePhotoButtonProps>) {
  const handleDelete = () => {
    onRequestDelete(id);
  };

  return (
    <button
      className="delete-photo-button"
      aria-label="Delete photo"
      title="Delete photo"
      onClick={handleDelete}
    />
  );
}
