'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getPhotoUrl, formatDateUK } from '@/lib/photos';
import { AddPhotoButton } from './AddPhotoButton';
import { SignOutButton } from './SignOutButton';
import { DeletePhotoButton } from './DeletePhotoButton';

interface Photo {
  id: string;
  created_at: string;
}

export default function AdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
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
        setPhotos(data || []);
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
            <div className="thumbnail-container">
              <img src={getPhotoUrl(photo.id)} alt="" className="thumbnail" />
              <div className="thumbnail-overlay" />
            </div>
            <div className="photo-id">{photo.id}</div>
            <div className="photo-date">{formatDateUK(photo.created_at)}</div>
            <DeletePhotoButton id={photo.id} setPhotos={setPhotos} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <main>
      <nav>
        <SignOutButton />
      </nav>
      <AddPhotoButton setPhotos={setPhotos} />
      {content}
    </main>
  );
}
