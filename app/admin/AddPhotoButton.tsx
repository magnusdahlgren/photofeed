'use client';

import { supabase } from '@/lib/supabase';
import { Photo } from '@/types/photo';
import { randomPhotoId, getPhotoFileName, getPhotoMaxSize, imageSizes } from '@/lib/photos';
import imageCompression from 'browser-image-compression';

interface AddPhotoButtonProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
}

export function AddPhotoButton({ setPhotos }: Readonly<AddPhotoButtonProps>) {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      alert('No file selected');
      return;
    }

    const id = randomPhotoId(7);
    let errorMessage: string | null = null;

    for (const size of imageSizes) {
      const maxDimension = getPhotoMaxSize(size);
      const filePath = getPhotoFileName(id, size);
      let compressedFile: File;

      try {
        compressedFile = await imageCompression(file, {
          maxWidthOrHeight: maxDimension,
          maxSizeMB: 0.2,
          initialQuality: 0.8,
          useWebWorker: true,
        });

        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(filePath, compressedFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          errorMessage = `Error uploading file ${filePath}`;
          break;
        }
      } catch {
        errorMessage = `Error compressing image ${id} (${size})`;
        break;
      }
    }

    if (!errorMessage) {
      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert([{ id }])
        .select();

      if (dbError) {
        errorMessage = `Failed to add photo ${id} to DB`;
      } else {
        const newPhoto = dbData?.[0];
        if (newPhoto) {
          setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
        }
      }
    }
    if (errorMessage) {
      alert(errorMessage);
    }
  }

  return (
    <label className="primary-button add-photo-button">
      <span>+ Add photo</span>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </label>
  );
}
