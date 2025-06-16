import {ShopImageDetail, ShopImage, ShopImageType} from "@/types/shopImages";
import {getBaseUrl} from "./baseUrl";

export async function fetchShop(): Promise<ShopImage[]> {
    console.debug("Fetch images for shop");
    const res = await fetch(`${getBaseUrl()}/api/shop`, {
        next: {revalidate: 86400}
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch images for shop. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch images for shop. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchSingleImageShop(id: unknown): Promise<ShopImageDetail> {
    console.debug("Fetch details image. ImageId= ", id);
    const res = await fetch(`${getBaseUrl()}/api/shop/${id}`, {
        next: {revalidate: 86400},
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch single image for shop. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch single image for shop. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchRandomShopImages(count: number = 3): Promise<ShopImageType[]> {
    try {
        const res = await fetch(`${getBaseUrl()}/api/shop`, {
            next: { revalidate: 86400 },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Failed to fetch random images from shop. Error ${res.status}: ${errorText}`);
            throw new Error(`Failed to fetch random images from shop. Error ${res.status}`);
        }

        const data: ShopImageType[] = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            console.warn("fetchRandomShopImages: API returned empty or invalid data");
            return [];
        }

        console.log(`fetchRandomShopImages: Got ${data.length} images`);

        if (data.length <= count) return data;

        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    } catch (err) {
        console.error("Error in fetchRandomShopImages:", err);
        return [];
    }
}

