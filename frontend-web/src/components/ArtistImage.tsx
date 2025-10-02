"use client"

import Image from "next/image";

export function ArtistImage({src, alt}: { src: string; alt: string }) {
    return (
        <Image src={src} alt={alt} title="Antonio Troiano" width={582} height={776} loading="lazy"
               sizes="(max-width: 582px) 100vw, 50vw" className="rounded-xl shadow-lg w-full max-w-md select-none"
               onContextMenu={(e) => e.preventDefault()}/>
    );
}
