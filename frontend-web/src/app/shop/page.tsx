import {fetchShop} from '@/lib/api/fetchShop';
import ShopGallery from '@/components/shop/ShopGallery';
import {Metadata} from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 86400;

export const generateMetadata = async (): Promise<Metadata> => {
    const shopImages = await fetchShop();

    const defaultImage = {
        url: 'https://ik.imagekit.io/atart/titel-og.webp',
        width: 1200,
        height: 630,
        alt: 'Shop Teaser Image',
    };

    const firstImage = shopImages.length > 0
        ? {
            url: shopImages[0].shopImageUrls[0],
            width: 1200,
            height: 630,
            alt: shopImages[0].title,
        }
        : defaultImage;

    return {
        title: 'Shop – Unique Artworks',
        description: 'Browse and purchase original abstract acrylic artworks by Antonio Troiano. Each piece is one-of-a-kind, expressive, and handmade on canvas – perfect for collectors, art lovers, and interiors.',
        alternates: {
            canonical: 'https://antonio-troiano.de/shop',
        },
        openGraph: {
            title: 'Shop – Unique Artworks',
            description: 'Browse all available artworks in the shop. Each piece is handcrafted and unique.',
            url: 'https://antonio-troiano.de/shop',
            siteName: 'Antonio Troiano Art',
            images: [firstImage],
            locale: 'de_DE',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Shop – Unique Artworks',
            description: 'Browse all available artworks in the shop.',
            images: [firstImage.url],
        },
    };
};

export default async function Shop() {
    const shopImages = await fetchShop();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Art Shop',
        description: 'A collection of unique handcrafted artworks.',
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: shopImages.map((img, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `https://antonio-troiano.de/shop/${img.id}`,
                item: {
                    '@type': 'Product',
                    name: img.title,
                    image: Array.isArray(img.shopImageUrls) ? img.shopImageUrls : [img.shopImageUrls],
                },
            })),
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <ShopGallery shopImages={shopImages}/>
        </>
    );
}
