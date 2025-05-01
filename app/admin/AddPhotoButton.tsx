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

    try {
      for (const size of imageSizes) {
        const maxDimension = getPhotoMaxSize(size);
        const filePath = getPhotoFileName(id, size);

        const compressedFile = await imageCompression(file, {
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
          console.error('Error uploading file:', uploadError);
          alert('Failed to upload photo');
        }
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
