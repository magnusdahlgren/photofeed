'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { deletePhoto } from '@/lib/photos';
import { AddPhotoButton } from './AddPhotoButton';
import { AlertDialog } from '@/components/AlertDialog';
import { UserMenuWithSignIn } from '@/components/UserMenuWithSignIn';
import { HomeButton } from './HomeButton';
import { LoadingScreen } from '@/components/LoadingScreen';
import type { Photo } from '@/types/photo';
import ErrorMessage from '@/components/ErrorMessage';
import { useRedirectIfSignedOut } from './useRedirectIfSignedOut';
import { PhotoAdminList } from './PhotoAdminList';

export default function AdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  useRedirectIfSignedOut();

  useEffect(() => {
    async function fetchPhotos() {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setPhotos(data ?? []);
      } else {
        setError(true);
      }
      setLoading(false);
    }

    fetchPhotos();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  let content;

  if (error) {
    content = <ErrorMessage message="Something went wrong loading the photo feed." />;
  } else if (photos.length === 0) {
    content = <ErrorMessage message="No photos found." />;
  } else {
    content = <PhotoAdminList photos={photos} onRequestDelete={setPhotoToDelete} />;
  }

  async function handleConfirmDelete(photoId: string) {
    try {
      await deletePhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      console.error('Error deleting photo:', err);
      setAlertMessage('Failed to delete photo');
    } finally {
      setPhotoToDelete(null);
    }
  }

  return (
    <main>
      <UserMenuWithSignIn />
      <HomeButton />
      <AddPhotoButton setPhotos={setPhotos} setAlertMessage={setAlertMessage} />
      {content}
      {alertMessage && <AlertDialog message={alertMessage} onClose={() => setAlertMessage(null)} />}
      {photoToDelete && (
        <AlertDialog
          message="Are you sure you want to delete this photo?"
          onClose={() => setPhotoToDelete(null)}
          onConfirm={async () => handleConfirmDelete(photoToDelete)}
        />
      )}
    </main>
  );
}
