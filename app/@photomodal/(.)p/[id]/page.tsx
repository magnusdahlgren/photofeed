"use client";

import { use } from "react";
import PhotoDetail from "@/components/PhotoDetail";
import { useRouter } from "next/navigation";

interface Params {
  readonly params: Promise<{ id: string }>;
}

export default function PhotoModalPage({ params }: Params) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <div className="photo-modal">
      <button
        onClick={() => router.back()}
        className="close-button"
        aria-label="Close modal"
      />
      <PhotoDetail id={id} />
    </div>
  );
}
