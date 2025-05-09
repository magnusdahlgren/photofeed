"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";
import { getPhotoUrl } from "@/lib/photos";
import { Photo } from "@/types/photo";
import ErrorMessage from "./ErrorMessage";

interface PhotoFeedProps {
  photos: Photo[];
}

export default function PhotoFeed({ photos }: Readonly<PhotoFeedProps>) {
  if (!photos?.length) {
    return <ErrorMessage message="No photos found." />;
  }

  const breakpointColumnsObj = {
    default: 4,
    900: 3,
    600: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="photo-feed-grid"
      columnClassName="photo-feed-grid_column"
    >
      {photos.map((photo) => (
        <div key={photo.id}>
          <Link href={`/p/${photo.id}`}>
            <img
              src={getPhotoUrl(photo.id, "small")}
              alt=""
              className="fadeIn"
              loading="lazy"
            />
          </Link>
        </div>
      ))}
    </Masonry>
  );
}
