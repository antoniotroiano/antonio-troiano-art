import {fetchPortfolioImages} from '@/lib/api/fetchPortfolio';
import PortfolioGallery from '@/components/PortfolioGallery';
import {Metadata} from 'next';

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export const generateMetadata = async (): Promise<Metadata> => {
    const portfolio = await fetchPortfolioImages();

    const defaultImage = {
        url: "https://www.antonio-troiano.de/images/titel.webp",
        width: 1200,
        height: 630,
        alt: "Default Portfolio Image",
    };

    const firstImage = portfolio.length > 0 ? {
        url: portfolio[0].imageUrls[0],
        width: 1200,
        height: 630,
        alt: portfolio[0].title,
    } : defaultImage;

    return {
        title: "Portfolio – Unique Artworks",
        description: "Browse all artworks in the portfolio. Each piece is handcrafted and unique.",
        alternates: {
            canonical: "https://www.antonio-troiano.de/portfolio",
        },
        openGraph: {
            title: "Portfolio – Unique Artworks",
            description: "Browse all artworks in the portfolio. Each piece is handcrafted and unique.",
            url: "https://www.antonio-troiano.de/portfolio",
            siteName: "Antonio Troiano Art",
            images: [firstImage],
            locale: "de_DE",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Portfolio – Unique Artworks",
            description: "Browse all artworks in the portfolio.",
            images: "https://ik.imagekit.io/atart" + [firstImage.url],
        },
    };
};

export default async function PortfolioPage() {
    const portfolio = await fetchPortfolioImages();

    const availableYears = Array.from(new Set(portfolio.map(w => w.year))).sort();
    const availableTags = Array.from(new Set(portfolio.flatMap(w => w.tags))).sort();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Portfolio – Unique Artworks",
        description: "A curated collection of unique artworks by Antonio Troiano.",
        image: portfolio.map(img => img.imageUrls[0]),
        creator: {
            "@type": "Person",
            name: "Antonio Troiano",
        },
        hasPart: portfolio.map((img, index) => ({
            "@type": "ImageObject",
            name: img.title,
            contentUrl: img.imageUrls[0],
            position: index + 1,
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <PortfolioGallery portfolio={portfolio} availableYears={availableYears} availableTags={availableTags}/>
        </>
    );
}
