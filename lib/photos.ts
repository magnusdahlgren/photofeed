import { revalidateHomePage } from "@/app/actions/revalidate";
import { supabase } from "@/lib/supabase";
import { Photo } from "@/types/photo";
import ExifReader from "exifreader";

const bucket = process.env.NEXT_PUBLIC_SUPABASE_PHOTO_BUCKET!;
const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
if (!bucket) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_PHOTO_BUCKET");
}
if (!storageUrl) {
  throw new Error("Missing env var: NEXT_PUBLIC_SUPABASE_STORAGE_URL");
}

export function getPhotoUrl(id: string): string {
  return `${storageUrl}/${bucket}/${getPhotoFileName(id)}`;
}

export function getPhotoFileName(id: string): string {
  return `${id}.jpg`;
}

export function formatDateUK(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const year = date.getFullYear() % 100; // Get last two digits

  return `${day}/${month}/${year}`;
}

export function formatDateTimeUK(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // 0-indexed
  const year = date.getFullYear() % 100; // two-digit year
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
}

export function randomPhotoId(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array); // browser API, not node:crypto

  return Array.from(array)
    .map((n) => characters[n % characters.length])
    .join("");
}

export async function getPhotoById(id: string): Promise<Photo> {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Failed to get photo ${id} from DB`);

  return data;
}

export async function addPhoto(file: File): Promise<Photo> {
  if (!file) {
    throw new Error("No file selected");
  }

  const id = randomPhotoId(7);
  const taken_at = await extractTakenAt(file);
  const filePath = getPhotoFileName(id);

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error(`Error uploading file ${filePath}:`, uploadError);
    throw new Error(`Error uploading file ${filePath}`);
  }

  const { data: dbData, error: dbError } = await supabase
    .from("photos")
    .insert([{ id, taken_at }])
    .select();

  if (dbError) {
    throw new Error(`Failed to add photo ${id} to database`);
  }

  await revalidateHomePage();
  return dbData?.[0];
}

export async function deletePhoto(id: string): Promise<void> {
  const { error: dbError } = await supabase
    .from("photos")
    .delete()
    .eq("id", id);
  if (dbError) throw new Error(`Failed to delete photo ${id} from DB`);

  const filePath = getPhotoFileName(id);
  const { error: storageError } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  if (storageError) throw new Error(`Failed to delete photo file for ${id}`);

  await revalidateHomePage();
}

export async function extractTakenAt(file: File): Promise<string | null> {
  const arrayBuffer = await file.arrayBuffer();

  try {
    const tags = ExifReader.load(arrayBuffer);

    const dateTimeOriginal = tags["DateTimeOriginal"]?.description;

    if (!dateTimeOriginal) {
      return null;
    }

    // Format: "2023:08:16 14:23:01" → "2023-08-16T14:23:01"
    const [date, time] = dateTimeOriginal.split(" ");
    const formatted = date.replace(/:/g, "-") + "T" + time;

    const iso = new Date(formatted).toISOString(); // For storing in DB
    return iso;
  } catch (err) {
    console.error("Failed to extract EXIF data:", err);
    return null;
  }
}
