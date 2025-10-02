import {fetchInstagramPosts} from "@/lib/api/fetchInstagram";
import Image from 'next/image';

export default async function InstagramFeed() {
    const instagramPosts = await fetchInstagramPosts();

    if (!instagramPosts.length) {
        return <div className="text-center py-20">Loading Instagram…</div>;
    }

    return (
        <>
            <h2 className="text-3xl font-bold mb-10 text-center tracking-wide">
                Instagram Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {instagramPosts.map((post) => (
                    <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                       className="start-artwork-card rounded-xl overflow-hidden border border-white/30 bg-white/20 backdrop-blur-lg shadow-md hover:shadow-xl transition-shadow"
                       title={post.caption}>
                        <Image src={post.media_url} alt={post.caption || "Instagram post"} title={post.caption}
                               width={600} height={600} loading="lazy" className="object-cover w-full aspect-square"
                               sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"/>
                    </a>
                ))}
            </div>
        </>
    );
}
