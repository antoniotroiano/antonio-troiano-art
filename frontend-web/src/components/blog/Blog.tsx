import Link from "next/link";
import { getRandomBlogPosts } from "@/lib/datocms";

export default async function Blog() {
    const posts = await getRandomBlogPosts(3);

    return (
        <section className="section">
            <h2 className="section-title">Aktuelles aus dem Atelier</h2>
            <div className="blog-grid">
                {posts.map((post) => (
                    <div key={post.id} className="blog-card">
                        <Link href={`/blog/${post.slug}`}>
                            {post.heroimagefileid ? (
                                <img src={`${post.heroimagefileid}&tr=w-600,h-600,c-fill,q-70,f-auto`} alt={post.title} loading="lazy" />
                            ) : null}
                            <div className="blog-card-content">
                                <h3>{post.title}</h3>
                                <p>{post.excerpt ?? post.subtitle ?? ""}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="btn-center">
                <Link href="/blog" className="btn-chip btn-chip--on-light btn-chip--shine">
                    <span>Alle Beiträge lesen</span>
                </Link>
            </div>
        </section>
    );
}
