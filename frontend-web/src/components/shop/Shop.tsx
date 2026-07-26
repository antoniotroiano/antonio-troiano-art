import Link from "next/link";
import { readImageKitFolder, type ImageKitCachedFile } from "@/lib/imagekitCache";

function getTitle(img: ImageKitCachedFile): string {
    const title = img.customMetadata?.title_art;
    if (typeof title === "string" && title.trim()) return title.trim();
    return img.name || "Produkt";
}

function getPriceOrStatus(img: ImageKitCachedFile): { label: string; sold: boolean } {
    const meta = (img.customMetadata ?? {}) as Record<string, unknown>;

    const sold = typeof meta.sold_art === "boolean" ? meta.sold_art : false;

    if (sold) return { label: "Verkauft", sold: true };

    const price = meta.price_art;
    if (typeof price === "string" && price.trim()) return { label: price.trim(), sold: false };
    if (typeof price === "number") return { label: String(price), sold: false };

    return { label: "Preis auf Anfrage", sold: false };
}

function pickRandom<T>(arr: T[], n: number): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export default async function Shop() {
    const data = await readImageKitFolder("shop");
    const items = pickRandom(data.items, 3);

    return (
        <section className="section">
            <h2 className="section-title section-title-light">Shop</h2>
            <div className="shop-grid">
                {items.map((img) => {
                    const title = getTitle(img);
                    const { label, sold } = getPriceOrStatus(img);
                    const optimizedUrl = `${img.url}&tr=w-600,h-600,c-fill,q-70,f-auto`;

                    return (
                        <div key={img.fileId} className="shop-item glass-shop-card">
                            <Link href={`/shop/${img.fileId}`}>
                                <img src={optimizedUrl} alt={`Produkt: ${title}`} />
                            </Link>
                            <h3>{title}</h3>
                            <div className="price">{label}</div>
                            {sold ? (
                                <span className="btn-chip btn-chip--shine sold">
                                    Verkauft
                                </span>
                            ) : (
                                <Link href={`/shop/${img.fileId}`} className="btn-chip btn-chip--shine">
                                    <span>Anfragen</span>
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="btn-center">
                <Link className="btn-chip btn-chip--shine" href="/shop">
                    <span>Zum kompletten Shop</span>
                </Link>
            </div>
        </section>
    );
}
