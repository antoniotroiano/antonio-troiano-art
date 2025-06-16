import {fetchShop} from "@/lib/api/fetchShop";
import {ShopCard} from "@/components/shop/ShopCard";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export const metadata = {
    title: "Shop – Unique Artworks",
    description: "Browse all available artworks in the shop. Each piece is handcrafted and unique.",
    openGraph: {
        title: "Shop – Unique Artworks",
        description: "Browse all available artworks in the shop. Each piece is handcrafted and unique.",
        url: "https://antonio-troiano.de/shop",
        siteName: "Antonio Troiano Art",
        images: [
            {
                url: "https://www.antonio-troiano.de/images/titel.webp",
                width: 1200,
                height: 630,
                alt: "Shop Teaser Image",
            },
        ],
        locale: "de_DE",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shop – Unique Artworks",
        description: "Browse all available artworks in the shop.",
        images: ["https://www.antonio-troiano.de/images/titel.webp"],
    },
};

export default async function Shop() {
    const shopImages = await fetchShop();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Art Shop",
        "description": "A collection of unique handcrafted artworks.",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": shopImages.map((img, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://antonio-troiano.de/shop/${img.id}`,
                "item": {
                    "@type": "Product",
                    "name": img.title,
                    "image": img.shopImageUrls[0],
                },
            })),
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-45 pb-20 justify-center items-center">
                <div className="w-full max-w-7xl px-13">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {shopImages.map((shopImages) => (
                            <ShopCard key={shopImages.id} shopImage={shopImages}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
