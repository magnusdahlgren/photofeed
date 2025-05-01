'use client';

import { supabase } from '@/lib/supabase';
import { Photo } from '@/types/photo';
import { randomPhotoId, getPhotoFileName, getPhotoMaxSize, imageSizes } from '@/lib/photos';
import imageCompression from 'browser-image-compression';

interface AddPhotoButtonProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export function AddPhotoButton({ setPhotos, setAlertMessage }: Readonly<AddPhotoButtonProps>) {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setAlertMessage('Test!');
      const file = e.target.files?.[0];

      if (!file) {
        throw new Error('No file selected');
      }

      const id = randomPhotoId(7);

      for (const size of imageSizes) {
        const maxDimension = getPhotoMaxSize(size);
        const filePath = getPhotoFileName(id, size);
        let compressedFile: File;

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
          throw new Error(`Error uploading file ${filePath}`);
        }
      }

      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert([{ id }])
        .select();

      if (dbError) {
        throw new Error(`Failed to add photo ${id} to DB`);
      }

      const newPhoto = dbData?.[0];
      if (newPhoto) {
        setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
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
