import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from "rehype-raw";
import CommentThread from "@/components/comment/CommentThread";
import {fetchSinglePost} from "@/lib/api/fetchPosts";
import type {Metadata} from "next";
import {Image} from "@imagekit/next";
import {withImageKitTransform} from "@/lib/utils/imagekitUrl";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params;
    const post = await fetchSinglePost(id);

    if (!post) {
        return {
            title: "Blog post not found – Antonio Troiano Art",
            description: "This blog post does not exist or has been removed.",
            alternates: {
                canonical: `https://antonio-troiano.de/blog/${id}`,
            },
            openGraph: {
                title: "Blog post not found – Antonio Troiano Art",
                description: "This blog post does not exist or has been removed.",
                url: `https://antonio-troiano.de/blog/${id}`,
                siteName: "Antonio Troiano Art",
                type: "article",
                locale: "de_DE",
                images: [
                    {
                        url: "https://antonio-troiano.de/images/blogpost1.webp",
                        width: 1200,
                        height: 630,
                        alt: "Blog post not found image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: "Blog post not found – Antonio Troiano Art",
                description: "This blog post does not exist or has been removed.",
                images: ["https://antonio-troiano.de/images/blogpost1.webp"],
            },
        };
    }

    const canonicalUrl = `https://antonio-troiano.de/blog/${id}`;
    const imageUrl = post.cover
        ? `https://ik.imagekit.io/atart${post.cover}`
        : "https://antonio-troiano.de/images/blogpost1.webp";

    return {
        title: `${post.title} – Antonio Troiano Art`,
        description: post.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${post.title} – Antonio Troiano Art`,
            description: post.description,
            url: canonicalUrl,
            siteName: "Antonio Troiano Art",
            type: "article",
            locale: "de_DE",
            publishedTime: post.date,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `Cover image for ${post.title}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} – Antonio Troiano Art`,
            description: post.description,
            images: [imageUrl],
        },
    };
}

export default async function BlogPost({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const blogPost = await fetchSinglePost(id);

    if (!id || id === "null" || !blogPost) {
        throw new Error("Invalid blog post id: " + id);
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogPost.title,
        description: blogPost.description,
        author: {
            "@type": "Person",
            name: "Antonio Troiano",
        },
        datePublished: blogPost.date,
        url: `https://antonio-troiano.de/blog/${blogPost.id}`,
        image: blogPost.cover ? `https://ik.imagekit.io/atart${blogPost.cover}` : undefined,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://antonio-troiano.de/blog/${blogPost.id}`,
        },
        publisher: {
            "@type": "Organization",
            name: "Antonio Troiano Art",
            logo: {
                "@type": "ImageObject",
                url: "https://antonio-troiano.de/logo512.png",
                width: 512,
                height: 512,
            },
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-40 md:pt-45 px-7 pb-30 justify-center items-center">
                <div className="flex flex-col w-full xl:max-w-7xl max-w-5xl mb-12">
                    <div
                        className="relative w-screen left-1/2 -translate-x-1/2 h-[30vh] md:h-[50vh] mb-12 overflow-hidden">
                        {blogPost.cover && (
                            <Image urlEndpoint="https://ik.imagekit.io/atart"
                                   src={withImageKitTransform(blogPost.cover, "w-1820")}
                                   alt={`Cover image for ${blogPost.title}`} title={blogPost.title} width={1920}
                                   height={1080} sizes="100vw"
                                   className="absolute inset-0 w-full h-full object-cover brightness-75"/>
                        )}
                        <div className="absolute inset-0 bg-black/10 z-10"/>
                        <div
                            className="relative z-20 px-8 flex items-center justify-center h-full text-white">
                            <p className="text-2xl md:text-4xl font-light italic drop-shadow-md max-w-2xl fade-in-delay">
                                "{blogPost.description}"
                            </p>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        {blogPost.title}
                    </h1>
                    <div className="text-xl font-medium mb-8 text-gray-700">by {blogPost.author}</div>
                    <div className="text-lg mb-10 text-gray-500">
                        {new Date(blogPost.date).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                    <div
                        className="prose max-w-2xl mx-auto mb-16 text-base text-gray-700 leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkBreaks]} rehypePlugins={[rehypeRaw as any]}>
                            {blogPost.content}
                        </ReactMarkdown>
                    </div>
                </div>
                <CommentThread postId={blogPost.id}/>
            </div>
        </>
    );
}
