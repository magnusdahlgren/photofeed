'use client';

import { Photo } from '@/types/photo';
import { addPhoto } from '@/lib/photos';
import { useState, useRef } from 'react';
import { SpinnerIcon } from '@/components/SpinnerIcon';

interface AddPhotoButtonProps {
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export function AddPhotoButton({ setPhotos, setAlertMessage }: Readonly<AddPhotoButtonProps>) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isUploading) return;

    try {
      const file = e.target.files?.[0];

      if (file) {
        setIsUploading(true);
        const newPhoto = await addPhoto(file);
        if (newPhoto) {
          setPhotos((prevPhotos) => [newPhoto, ...prevPhotos]);
          setAlertMessage(null);
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setAlertMessage(message);
    } finally {
      setIsUploading(false);
    }
  }

  function triggerFileInputClick() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <button
        className={`primary-button add-photo-button ${isUploading ? 'disabled' : ''}`}
        aria-busy={isUploading}
        disabled={isUploading}
        onClick={triggerFileInputClick}
      >
        <span>
          {isUploading ? (
            <>
              <SpinnerIcon /> Uploading...
            </>
          ) : (
            '+ Add photo'
          )}
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        aria-label="Upload a photo"
      />
    </>
  );
}
