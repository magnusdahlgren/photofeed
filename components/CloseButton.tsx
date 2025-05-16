"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  return (
    <Link
      href="/"
      scroll={false}
      className="close-button"
      aria-label="Close modal"
    />
  );
}
