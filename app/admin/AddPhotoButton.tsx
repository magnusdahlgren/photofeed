'use client';

import { supabase } from '@/lib/supabase';
import { randomPhotoId } from '@/lib/photos';
import { Photo } from '@/types/photo';
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
    const filePath = `${id}.jpg`;

    try {
      const compressedFile = await imageCompression(file, {
        maxWidthOrHeight: 1080,
        maxSizeMB: 0.2,
        initialQuality: 0.8,
        useWebWorker: true,
      });

      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false, // Do not overwrite if already exists
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        alert('Failed to upload photo');
      }

      const { data: dbData, error: dbError } = await supabase
        .from('photos')
        .insert([{ id }])
        .select();

      if (dbError) {
        console.error('Error adding photo:', dbError);
        alert('Failed to add photo');
      } else {
        const newPhoto = dbData?.[0];
        if (newPhoto) {
          setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
        }
      }
    } catch (err) {
      console.error('Compression failed:', err);
      alert('Failed to process photo');
    }
  }

  return (
    <label className="primary-button add-photo-button">
      <span>+ Add photo</span>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </label>
  );
}
