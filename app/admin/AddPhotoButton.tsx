'use client';

import { Photo } from '@/types/photo';
import { addPhoto } from '@/lib/photos';

interface AddPhotoButtonProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export function AddPhotoButton({ setPhotos, setAlertMessage }: Readonly<AddPhotoButtonProps>) {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];

      if (file) {
        const newPhoto = await addPhoto(file);
        if (newPhoto) {
          setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
          setAlertMessage(null);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setAlertMessage(message);
    }
  }

  return (
    <label className="primary-button add-photo-button">
      <span>+ Add photo</span>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </label>
  );
}
