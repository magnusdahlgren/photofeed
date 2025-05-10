"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";
import Image from "next/image";
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
      columnClassName="photo-feed-grid-column"
    >
      {photos.map((photo) => (
        <div key={photo.id}>
          <Link href={`/p/${photo.id}`}>
            <Image
              src={getPhotoUrl(photo.id)}
              alt=""
              width={400}
              height={400}
              className="fadeIn"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
              }}
            />{" "}
          </Link>
        </div>
      ))}
    </Masonry>
  );
}
