import {BlogCard} from '@/components/BlogCard';
import {fetchPosts} from '@/lib/api/fetchPosts';
import {Metadata} from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export const generateMetadata = async (): Promise<Metadata> => {
    const posts = await fetchPosts();

    const defaultImage = {
        url: 'https://ik.imagekit.io/atart/titel-og.webp',
        width: 1200,
        height: 630,
        alt: 'Blog cover image with abstract artworks',
    };

    const firstImage = posts.length > 0 && posts[0].cover
        ? {
            url: posts[0].cover,
            width: 1200,
            height: 630,
            alt: posts[0].title,
        }
        : defaultImage;

    return {
        title: 'Blog – Antonio Troiano Art',
        description: 'Get insights into Antonio Troiano’s artistic process, creative inspirations, and behind-the-scenes stories. Thoughts on abstract painting and visual storytelling.',
        keywords: [
            'Antonio Troiano',
            'Art Blog',
            'Contemporary Art Insights',
            'Modern Art Commentary',
            'Art Exhibitions',
            'Painting Blog',
            'Abstract Art Articles',
        ],
        alternates: {
            canonical: 'https://antonio-troiano.de/blog',
        },
        openGraph: {
            title: 'Blog – Antonio Troiano Art',
            description: 'Explore art insights, creative thoughts, and exhibition updates from Antonio Troiano.',
            url: 'https://antonio-troiano.de/blog',
            siteName: 'Antonio Troiano Art',
            type: 'website',
            locale: 'de_DE',
            images: [firstImage],
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog – Antonio Troiano Art',
            description: 'Explore creative thoughts and art stories from Antonio Troiano.',
            images: [firstImage.url],
        },
    };
};

export default async function Blog() {
    const posts = await fetchPosts();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Antonio Troiano Art Blog',
        url: 'https://antonio-troiano.de/blog',
        description: 'Explore art insights, creative thoughts, and exhibition updates from Antonio Troiano.',
        creator: {
            '@type': 'Person',
            name: 'Antonio Troiano',
            sameAs: [
                'https://www.instagram.com/antonio.troiano.art',
                'https://antonio-troiano.de',
            ],
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-35 px-7 pb-30 items-center">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 text-center">All about my art</h1>
                <blockquote
                    className="glassmorphism-bg-infobox p-5 text-center italic max-w-2xl mx-auto mb-15 text-lg text-gray-800">
                    "Discover the stories behind my work – dive into the inspirations, techniques, and thoughts that
                    shape each piece."
                </blockquote>
                <div className="w-full max-w-7xl">
                    <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
