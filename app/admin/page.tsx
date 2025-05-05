'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getPhotoUrl, formatDateUK, deletePhoto } from '@/lib/photos';
import { AddPhotoButton } from './AddPhotoButton';
import { DeletePhotoButton } from './DeletePhotoButton';
import { PhotoModal } from './PhotoModal';
import { AlertDialog } from '@/components/AlertDialog';
import { UserMenuWithSignIn } from '@/components/UserMenuWithSignIn';
import { HomeButton } from './HomeButton';

interface Photo {
  id: string;
  created_at: string;
}

export default function AdminPage() {
  const [previewPhotoId, setPreviewPhotoId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/');
      }
    }

    checkUser();
  }, []);

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
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  let content;

  if (error) {
    content = <p className="error">Something went wrong loading the photo feed.</p>;
  } else if (!photos || photos.length === 0) {
    content = <p className="error">No photos available.</p>;
  } else {
    content = (
      <div className="photo-list">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-row">
            <button
              className="thumbnail-container"
              onClick={() => setPreviewPhotoId(photo.id)}
              aria-label="Preview photo"
            >
              <img src={getPhotoUrl(photo.id, 'small')} alt="" className="thumbnail" />
              <div className="thumbnail-overlay" />
            </button>

            <div className="photo-id">{photo.id}</div>
            <div className="photo-date">{formatDateUK(photo.created_at)}</div>
            <DeletePhotoButton id={photo.id} onRequestDelete={(id) => setPhotoToDelete(id)} />
          </div>
        ))}
      </div>
    );
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
      {previewPhotoId && <PhotoModal id={previewPhotoId} onClose={() => setPreviewPhotoId(null)} />}
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
