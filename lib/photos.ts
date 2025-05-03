import { supabase } from "@/lib/supabase";

export const imageSizes = ["small", "large"] as const;
export type ImageSize = (typeof imageSizes)[number];

export function getPhotoUrl(id: string, size: ImageSize = "large"): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${getPhotoFileName(id, size)}`;
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

export async function deletePhoto(id: string): Promise<void> {
  const { error } = await supabase.from("photos").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete photo ${id} from DB`);
}
