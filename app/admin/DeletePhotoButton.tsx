'use client';

import { supabase } from '@/lib/supabase';
import { Photo } from '@/types/photo';

interface DeletePhotoButtonProps {
  id: string;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

export function DeletePhotoButton({ id, setPhotos }: Readonly<DeletePhotoButtonProps>) {
  async function handleDeletePhoto() {
    const confirmed = window.confirm(`Are you sure you want to delete photo ${id}?`);
    if (!confirmed) {
      return;
    }

    const { error } = await supabase.from('photos').delete().eq('id', id);

    if (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    } else {
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== id));
    }
  }

  return (
    <button className="delete-photo-button" aria-label="Delete photo" onClick={handleDeletePhoto} />
  );
}
