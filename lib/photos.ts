export function getPhotoUrl(id: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${id}.jpg`;
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
