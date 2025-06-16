import Image from "next/image";

export function ArtistImage({src, alt}: { src: string; alt: string }) {
    return (
        <Image width={300} height={300} alt={alt} src={src}
               className="rounded-lg shadow-lg w-full sm:w-1/2 md:w-3/4 xl:w-3/4"/>
    );
}
