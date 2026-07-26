import { Metadata } from "next";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/datocms";

export const metadata: Metadata = {
  title: "Blog – Aus dem Atelier | Abstrakte Kunst & Einblicke",
  description:
    "Im Blog von Antonio Troiano findest du Einblicke in abstrakte Kunst, kreative Prozesse und Gedanken aus dem Atelier.",
  alternates: {
    canonical: "https://antonio-troiano.de/blog",
  },
  openGraph: {
    title: "Blog – Aus dem Atelier",
    description:
      "Einblicke in abstrakte Kunst, kreative Prozesse und Gedanken aus dem Atelier von Antonio Troiano.",
    url: "https://antonio-troiano.de/blog",
    type: "website",
  },
};

function formatGermanDate(isoDate: string) {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function Page() {
  const posts = await getAllBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Blog – Aus dem Atelier",
        url: "https://antonio-troiano.de/blog",
        description:
          "Blog mit Artikeln über abstrakte Kunst, kreative Prozesse und Atelier-Einblicke.",
        inLanguage: "de-DE",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: "https://antonio-troiano.de",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://antonio-troiano.de/blog",
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <button id="scrollTopBtn" title="Nach oben">
        &#8679;
      </button>
      <MainNav initial />
      <main className="main-styles">
        <section className="section-padding">
          <section className="section">
            <h1 className="section-title-subpages">Aus dem Atelier</h1>
            <p className="section-subtitle">
              Gedanken, Prozesse und Einblicke in meine abstrakte Kunst
            </p>

            {posts.length === 0 ? (
              <p className="meta">Noch keine Beiträge vorhanden.</p>
            ) : (
              <div className="blog-list">
                {posts.map((post) => {
                  const href = `/blog/${post.slug}`;
                  const dateLabel = post.publishedat
                    ? `Veröffentlicht am ${formatGermanDate(post.publishedat)}`
                    : "";

                  return (
                    <Link key={post.id} href={href} className="blog-post-summary">
                      {post.heroimagefileid ? (
                        <img src={`${post.heroimagefileid}&tr=w-600,h-600,c-fill,q-70,f-auto`} alt={post.title} loading="lazy" />
                      ) : (
                        <div className="blog-media" />
                      )}
                      <div className="blog-post-content">
                        <h2>{post.title}</h2>
                        {dateLabel ? (
                          <p className="meta">{dateLabel}</p>
                        ) : null}
                        {post.author ? (
                          <p className="meta">Von {post.author}</p>
                        ) : null}
                        {post.subtitle ? (
                          <p className="excerpt">{post.subtitle}</p>
                        ) : post.excerpt ? (
                          <p className="excerpt">{post.excerpt}</p>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
      <SubpageScrollEffects />
    </div>
  );
}
