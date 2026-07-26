import { Metadata } from "next";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import ShopGrid from "@/components/shop/ShopGrid";
import SubpageScrollEffects from "@/components/SubpageScrollEffects";

export const metadata: Metadata = {
    title: "Shop – Abstrakte Kunst & Moderne Gemälde kaufen",
    description:
        "Kaufe originale abstrakte Kunstwerke von Antonio Troiano. Moderne Gemälde voller Ausdruck, Farbe und Emotion – direkt online entdecken.",
    alternates: {
        canonical: "https://antonio-troiano.de/shop",
    },
    openGraph: {
        title: "Shop – Abstrakte Kunst kaufen",
        description:
            "Originale moderne Gemälde und abstrakte Kunstwerke von Antonio Troiano online kaufen.",
        url: "https://antonio-troiano.de/shop",
        type: "website",
    },
};

export default function ShopPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                name: "Shop – Abstrakte Kunst kaufen",
                url: "https://antonio-troiano.de/shop",
                description:
                    "Online-Shop für originale abstrakte Kunstwerke von Antonio Troiano.",
                inLanguage: "de-DE",
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
                ],
            },
        ],
    };

    return (
        <div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <button id="scrollTopBtn" title="Nach oben">&#8679;</button>
            <MainNav initial />
            <main className="main-styles">
                <section className="section-padding">
                    <section className="section">
                        <h1 className="section-title-subpages">Shop</h1>
                        <p className="section-subtitle">
                            Originale abstrakte Kunstwerke und moderne Gemälde zum Kauf
                        </p>
                        <ShopGrid folder="shop" />
                    </section>
                </section>
            </main>
            <Footer />
            <SubpageScrollEffects />
        </div>
    );
}
