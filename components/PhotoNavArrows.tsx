"use client";
import { useRouter } from "next/navigation";

export function PhotoNavArrows({
  prevId,
  nextId,
}: Readonly<{
  prevId?: string | null;
  nextId?: string | null;
}>) {
  const router = useRouter();

  return (
    <>
      {prevId && (
        <button
          className="nav-arrow prev"
          aria-label="Previous photo"
          onClick={() => router.replace(`/p/${prevId}`)}
        />
      )}
      {nextId && (
        <button
          className="nav-arrow next"
          aria-label="Next photo"
          onClick={() => router.replace(`/p/${nextId}`)}
        />
      )}
    </>
  );
}
