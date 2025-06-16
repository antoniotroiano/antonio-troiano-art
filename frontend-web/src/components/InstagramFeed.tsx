import {fetchInstagramPosts} from "@/lib/api/fetchInstagram";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {instagramPosts.map((post) => (
                    <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer"
                       className="rounded-xl overflow-hidden border border-white/30 bg-white/20 backdrop-blur-lg shadow-md hover:shadow-xl transition-shadow"
                       title={post.caption}>
                        <img src={post.media_url} alt={post.caption?.toString()} width={600} height={600}
                             className="object-cover w-full h-full aspect-square"/>
                    </a>
                ))}
            </div>
        </>
    );
}
