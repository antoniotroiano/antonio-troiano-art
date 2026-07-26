import Link from "next/link";
import { readImageKitFolder, type ImageKitCachedFile } from "@/lib/imagekitCache";

function getTitle(img: ImageKitCachedFile): string {
    const title = img.customMetadata?.title_art;
    if (typeof title === "string" && title.trim().length > 0) return title.trim();
    return img.name || "Kunstwerk";
}

function getPrice(img: ImageKitCachedFile): string | null {
    const price = img.customMetadata?.price_art;
    if (typeof price === "string" && price.trim().length > 0) return price.trim();
    if (typeof price === "number") return String(price);
    return null;
}

type Props = {
    folder: "shop";
    limit?: number;
};

export default async function ShopGrid({ folder, limit }: Props) {
    const data = await readImageKitFolder(folder);
    const items = [...data.items];
    const visible = typeof limit === "number" ? items.slice(0, limit) : items;

    return (
        <div className="shop-grid">
            {visible.map((img) => {
                const title = getTitle(img);
                const price = getPrice(img);

                return (
                    <Link key={img.fileId} href={`/shop/${img.fileId}`} className="product-card">
                        <img src={`${img.url}&tr=w-600,h-600,c-fill,q-70,f-auto`} alt={title} loading="lazy" />
                        <div className="product-card-info">
                            <h3>{title}</h3>
                            {price ? <p className="price">{price}</p> : null}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
