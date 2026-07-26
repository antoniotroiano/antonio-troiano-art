import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredText } from "react-datocms";
import { getBlogPostBySlug } from "@/lib/datocms";
import type { Metadata } from "next";

function formatGermanDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const description =
    post.excerpt ??
    post.subtitle ??
    "Artikel aus dem Atelier von Antonio Troiano.";

  return {
    title: `${post.title} | Blog`,
    description,
    alternates: {
      canonical: `https://antonio-troiano.de/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description,
      url: `https://antonio-troiano.de/blog/${post.slug}`,
      type: "article",
      images: post.heroimagefileid
        ? [
          {
            url: post.heroimagefileid,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
        : undefined,
    },
  };
}

export default async function ShopDetailsBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const dateLabel = post.publishedat
    ? `Veröffentlicht am ${formatGermanDate(post.publishedat)}`
    : "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description:
          post.excerpt ??
          post.subtitle ??
          undefined,
        image: post.heroimagefileid ?? undefined,
        datePublished: post.publishedat ?? undefined,
        author: {
          "@type": "Person",
          name: post.author ?? "Antonio Troiano",
        },
        publisher: {
          "@type": "Organization",
          name: "Antonio Troiano",
          logo: {
            "@type": "ImageObject",
            url: "https://ik.imagekit.io/atart/titel-og.webp",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://antonio-troiano.de/blog/${post.slug}`,
        },
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
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://antonio-troiano.de/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link id="goBackBtn" href="/blog">
        &#x2190;
      </Link>
      <MainNav initial />
      <main className="main-detail">
        <article className="section">
          <header className="article-header">
            <h1>{post.title}</h1>
            <p className="meta">
              {post.author ? `Von ${post.author}` : null}
              {post.author && dateLabel ? " | " : null}
              {dateLabel}
            </p>
          </header>
          {post.heroimagefileid ? (
            <img src={`${post.heroimagefileid}&tr=w-2400,h-1000,c-fill,q-60,f-avif`} alt={post.title} className="article-hero-image" loading="lazy" />
          ) : null}
          <div className="article-content">
            {post.body?.value ? (
              <StructuredText data={post.body.value as any} />
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
      <SubpageScrollEffects />
    </div>
  );
}