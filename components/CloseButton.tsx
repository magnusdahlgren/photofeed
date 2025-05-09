"use client";

import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="close-button"
      aria-label="Close modal"
    />
  );
}
