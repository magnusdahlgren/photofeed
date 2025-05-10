/** @type {import('next').NextConfig} */
const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;

if (!storageUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_STORAGE_URL in environment variables"
  );
}

const nextConfig = {
  images: {
    domains: [new URL(storageUrl).hostname],
  },
};

module.exports = nextConfig;
