import {BlogCard} from "@/components/BlogCard";
import {fetchPosts} from "@/lib/api/fetchPosts";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export const metadata = {
    title: "Blog – Antonio Troiano Art",
    description: "Explore art insights, creative thoughts, and exhibition updates from Antonio Troiano. Discover stories behind the works.",
    keywords: [
        "Antonio Troiano",
        "Art Blog",
        "Contemporary Art Insights",
        "Modern Art Commentary",
        "Art Exhibitions",
        "Painting Blog",
        "Abstract Art Articles"
    ],
    alternates: {
        canonical: "https://www.antonio-troiano.de/blog",
    },
    openGraph: {
        title: "Blog – Antonio Troiano Art",
        description: "Explore art insights, creative thoughts, and exhibition updates from Antonio Troiano.",
        url: "https://www.antonio-troiano.de/blog",
        siteName: "Antonio Troiano Art",
        type: "website",
        locale: "de_DE",
        images: [
            {
                url: "https://www.antonio-troiano.de/images/blogpost1.webp",
                width: 1200,
                height: 630,
                alt: "Blog cover image with abstract artworks",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog – Antonio Troiano Art",
        description: "Explore creative thoughts and art stories from Antonio Troiano.",
        images: ["https://www.antonio-troiano.de/images/blogpost1.webp"],
    },
};

export default async function Blog() {
    const posts = await fetchPosts();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Antonio Troiano Art Blog",
        url: "https://www.antonio-troiano.de/blog",
        description: "Explore art insights, creative thoughts, and exhibition updates from Antonio Troiano.",
        creator: {
            "@type": "Person",
            name: "Antonio Troiano",
            sameAs: [
                "https://www.instagram.com/antonio.troiano.art",
                "https://www.antonio-troiano.de"
            ],
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-45 justify-center items-center">
                <div className="flex flex-col w-full xl:max-w-7xl max-w-5xl mb-30 px-13">
                    <div
                        className="mx-auto grid md:max-w-3xl grid-cols-1 gap-10  lg:mx-0 lg:max-w-none lg:grid-cols-2 md:grid-cols-2">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
