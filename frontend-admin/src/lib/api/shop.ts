import {getBaseUrl} from "@/lib/api/baseUrl";
import {ShopImageDetail, ShopImage, UpdateShopImageDto} from "@/types/shop";

export async function fetchImagesShop(): Promise<ShopImage[]> {
    console.info("Fetch shop images");
    const res = await fetch(`${getBaseUrl()}/api/shop`, {
        next: {revalidate: 3600}
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch shop images. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch shop images. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function fetchSingleImageShop(id: unknown): Promise<ShopImageDetail> {
    console.info("Fetch single shop image with Id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/shop/${id}`, {
        next: {revalidate: 3600},
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to fetch single shop image. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to fetch single shop image. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export async function createImageShop(createData: any) {
    console.info("Create new shop image");
    const res = await fetch(`${getBaseUrl()}/api/admin/shop`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(createData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to create shop image. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to create shop image. Error ${res.status}: ${errorText}`);
    }

    return res.json();
};

export async function updateImageShop(id: string, updatedData: UpdateShopImageDto) {
    console.info("Update image with Id= " + id);
    const res = await fetch(`${getBaseUrl()}/api/admin/shop/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Failed to update shop image. Error ${res.status}: ${errorText}`);
        throw new Error(`Failed to update shop image. Error ${res.status}: ${errorText}`);
    }

    return res.json();
}

export const deleteImageShop = async (id: number) => {
    console.info("Delete image with Id= " + id);
    const response = await fetch(`${getBaseUrl()}/api/admin/shop/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to delete image. Error ${response.status}: ${errorText}`);
        throw new Error(`Failed to delete image. Error ${response.status}: ${errorText}`);
    }
};
