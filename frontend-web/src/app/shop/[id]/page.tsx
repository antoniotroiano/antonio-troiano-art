import {ShopDetailCard} from "@/components/shop/ShopDetailCard";
import {fetchSingleImageShop, fetchShop} from "@/lib/api/fetchShop";
import type {ShopImageDetail} from "@/types/shopImages";
import type {Metadata} from "next";

export const dynamic = "force-dynamic";
export const revalidate = 86400;

export async function generateStaticParams() {
    try {
        const images = await fetchShop();
        return images.map((image) => ({
            id: image.id.toString(),
        }));
    } catch (error) {
        console.warn("generateStaticParams failed:", error);
        return [];
    }
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params;
    try {
        const shopImage = await fetchSingleImageShop(id);

        if (!shopImage) {
            return {
                title: "Artwork not found – Antonio Troiano Art",
                description: "This artwork does not exist or has been removed.",
            };
        }

        return {
            title: `${shopImage.title} – Antonio Troiano Art`,
            description: `Artwork: ${shopImage.title}. Price: ${shopImage.price ? shopImage.price + " €" : "Preis auf Anfrage"}`,
            openGraph: {
                title: `${shopImage.title} – Antonio Troiano Art`,
                description: `Artwork: ${shopImage.title}. Price: ${shopImage.price ? shopImage.price + " €" : "Preis auf Anfrage"}`,
                url: `https://antonio-troiano.de/shop/${id}`,
                siteName: "Antonio Troiano Art",
                type: "website",
                images: [
                    {
                        url: shopImage.shopImageUrls[0],
                        alt: shopImage.title,
                        width: 1200,
                        height: 630,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: `${shopImage.title} – Antonio Troiano Art`,
                description: `Artwork: ${shopImage.title}.`,
                images: [shopImage.shopImageUrls[0]],
            },
        };
    } catch (error) {
        console.warn("generateMetadata failed:", error);
        return {
            title: "Artwork – Antonio Troiano Art",
            description: "Artwork by Antonio Troiano.",
        };
    }
}

export default async function ShopImageDetailPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    let shopImageDetail: ShopImageDetail | null = null;

    try {
        shopImageDetail = await fetchSingleImageShop(id);
    } catch (error) {
        console.warn("Image shop detail page fetch failed:", error);
    }

    if (!shopImageDetail) {
        return <p className="text-center mt-20 text-lg">Artwork not found.</p>;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: shopImageDetail.title,
        image: shopImageDetail.shopImageUrls,
        description:
            shopImageDetail.description ||
            `Artwork by Antonio Troiano, created in ${shopImageDetail.year} using ${shopImageDetail.technique}. Size: ${shopImageDetail.size}.`,
        offers: {
            "@type": "Offer",
            price: shopImageDetail.price,
            priceCurrency: "EUR",
            availability: shopImageDetail.sold ? "http://schema.org/OutOfStock" : "http://schema.org/InStock",
            url: `https://antonio-troiano.de/shop/${shopImageDetail.id}`,
        },
        url: `https://antonio-troiano.de/shop/${shopImageDetail.id}`,
        creator: {
            "@type": "Person",
            name: "Antonio Troiano",
        },
    };

    function clean(obj: any) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] === undefined || obj[key] === null) delete obj[key];
            else if (typeof obj[key] === "object") clean(obj[key]);
        });
    }

    clean(jsonLd);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}/>
            <div className="flex flex-col pt-45 justify-center items-center">
                <div className="grid grid-cols-1 gap-8 max-w-6xl mb-30 xl:px-0 px-13 w-full">
                    <ShopDetailCard shopImageDetail={shopImageDetail}/>
                </div>
            </div>
        </>
    );
}
