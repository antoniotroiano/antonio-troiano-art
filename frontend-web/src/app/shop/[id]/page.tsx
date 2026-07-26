import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { readImageKitFolder, type ImageKitCachedFile } from "@/lib/imagekitCache";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";
import Link from "next/link";
import type { Metadata } from "next";
import ArtworkShare from "@/components/ArtworkShare";

function getTitle(img: ImageKitCachedFile): string {
  const title = img.customMetadata?.title_art;
  if (typeof title === "string" && title.trim().length > 0) return title.trim();
  return img.name || "Kunstwerk";
}

function text(v: unknown): string | null {
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : null;
}

function numOrText(v: unknown): string | null {
  if (typeof v === "number") return String(v);
  return text(v);
}

function bool(v: unknown): boolean | null {
  return typeof v === "boolean" ? v : null;
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await readImageKitFolder("shop");
  const item = data.items.find((x) => x.fileId === id);
  if (!item) return {};

  const title = getTitle(item);
  const meta = (item.customMetadata ?? {}) as Record<string, unknown>;
  const description =
    text(meta.description_art) ??
    `Originales abstraktes Kunstwerk "${title}" von Antonio Troiano.`;

  return {
    title: `${title} – Abstraktes Originalgemälde`,
    description,
    alternates: {
      canonical: `https://antonio-troiano.de/shop/${item.fileId}`,
    },
    openGraph: {
      title,
      description,
      url: `https://antonio-troiano.de/shop/${item.fileId}`,
      images: [
        {
          url: item.url,
          width: 1200,
          height: 1200,
          alt: `Kunstwerk ${title}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = await readImageKitFolder("shop");
  const item = data.items.find((x) => x.fileId === id);

  if (!item) notFound();

  const title = getTitle(item);
  const meta = (item.customMetadata ?? {}) as Record<string, unknown>;
  const description = text(meta.description_art);
  const sub_description = text(meta.sub_description_art);
  const technique = text(meta.technique_art);
  const size = text(meta.size_art);
  const year = numOrText(meta.year_art);
  const price = numOrText(meta.price_art);
  const sold = bool(meta.sold_art);
  const status = sold === null ? text(meta.status_art) : (sold ? "Verkauft" : "Verfügbar");
  const youtube = text(meta.youtube_art);

  const qs = new URLSearchParams({
    title,
    year: year ?? "",
    id: item.fileId,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VisualArtwork",
        name: title,
        image: item.url,
        description: description ?? undefined,
        artMedium: technique ?? undefined,
        artform: "Malerei",
        dateCreated: year ?? undefined,
        creator: {
          "@type": "Person",
          name: "Antonio Troiano",
        },
        offers: price
          ? {
            "@type": "Offer",
            price: price.replace(/[^\d.,]/g, "").replace(",", "."),
            priceCurrency: "EUR",
            availability:
              status === "Verkauft"
                ? "https://schema.org/SoldOut"
                : "https://schema.org/InStock",
            url: `https://antonio-troiano.de/shop/${item.fileId}`,
          }
          : undefined,
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
            name: "Shop",
            item: "https://antonio-troiano.de/shop",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `https://antonio-troiano.de/shop/${item.fileId}`,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link id="goBackBtn" href="/shop" className="go-back">
        &#x2190;
      </Link>
      <MainNav initial />
      <main className="main-detail">
        <section className="product-detail-section">
          <div className="product-image">
            <img src={`${item.url}&w-1200,c-at_max,q-90,f-avif`} alt={title} loading="lazy" />
          </div>
          <div className="product-info">
            <h1>{title}</h1>
            {price && <p className="price">{price}</p>}
            {description && <p className="description">{description}</p>}
            {sub_description && <p className="description">{sub_description}</p>}
            <ul className="product-specs">
              {technique && <li><strong>Technik:</strong> {technique}</li>}
              {size && <li><strong>Größe:</strong> {size}</li>}
              {year && <li><strong>Jahr:</strong> {year}</li>}
              {status && (
                <li>
                  <strong>Status:</strong>{" "}
                  <span className={sold ? "product-status product-status--sold" : "product-status"}>
                    {status}
                  </span>
                </li>
              )}
            </ul>
            {youtube && (
              <div className="product-media">
                <ArtworkShare youtubeUrl={youtube} artworkUrl={`https://antonio-troiano.de/shop/${item.fileId}`} imageUrl={item.url} />
              </div>
            )}
            {sold ? (
              <span className="btn-chip btn-chip--disabled">
                <span>Bereits verkauft</span>
              </span>
            ) : (
              <Link href={`/#kontakt?${qs.toString()}`} className="btn-chip btn-chip--on-light btn-chip--shine">
                <span>Kunstwerk anfragen</span>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <SubpageScrollEffects />
    </div>
  );
}
