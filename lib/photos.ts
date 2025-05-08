import imageCompression from "browser-image-compression";
import { supabase } from "@/lib/supabase";
import { Photo } from "@/types/photo";

export const imageSizes = ["small", "large"] as const;
export type ImageSize = (typeof imageSizes)[number];
const bucket = process.env.NEXT_PUBLIC_SUPABASE_PHOTO_BUCKET!;

export function getPhotoUrl(id: string, size: ImageSize = "large"): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${bucket}/${getPhotoFileName(id, size)}`;
}

export function getPhotoFileName(
  id: string,
  size: ImageSize = "large"
): string {
  return `${id}_${size}.jpg`;
}

export function getPhotoMaxSize(size: ImageSize = "large") {
  const sizes = {
    small: 400,
    large: 1080,
  } as const;

  return sizes[size] ?? sizes.large;
}

export function formatDateUK(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const year = date.getFullYear() % 100; // Get last two digits

  return `${day}/${month}/${year}`;
}

export function randomPhotoId(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array); // browser API, not node:crypto

  return Array.from(array)
    .map((n) => characters[n % characters.length])
    .join("");
}

export async function addPhoto(file: File): Promise<Photo> {
  if (!file) {
    throw new Error("No file selected");
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
      .from(bucket)
      .upload(filePath, compressedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Error uploading file ${filePath}`);
    }
  }

  const { data: dbData, error: dbError } = await supabase
    .from("photos")
    .insert([{ id }])
    .select();

  if (dbError) {
    throw new Error(`Failed to add photo ${id} to DB`);
  }

  return dbData?.[0];
}

export async function deletePhoto(id: string): Promise<void> {
  const { error: dbError } = await supabase
    .from("photos")
    .delete()
    .eq("id", id);
  if (dbError) throw new Error(`Failed to delete photo ${id} from DB`);

  const filePaths = imageSizes.map((size) => getPhotoFileName(id, size));
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove(filePaths);
  if (storageError) throw new Error(`Failed to delete photo files for ${id}`);
}
